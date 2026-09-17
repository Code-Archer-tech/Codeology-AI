import { Request, Response, NextFunction } from 'express';
import { db } from '../src/db/index.ts';
import { rateLimits, users } from '../src/db/schema.ts';
import { eq } from 'drizzle-orm';

interface RateLimitOptions {
  windowMs: number; // e.g. 15 * 60 * 1000 (15 min)
  max: number; // max hits within windowMs
  keyGenerator?: (req: Request) => string;
  message?: string;
  statusCode?: number;
}

// In-memory fallback / fast layer
const memoryStore = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(options: RateLimitOptions) {
  const {
    windowMs,
    max,
    keyGenerator = (req) => {
      const forwarded = req.headers['x-forwarded-for'];
      const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress) || 'unknown_ip';
      return `${req.path}:${ip.trim()}`;
    },
    message = 'Too many requests from this IP. Please try again later.',
    statusCode = 429,
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();

    // 1. Check in-memory fast tier
    const cached = memoryStore.get(key);
    if (cached) {
      if (now < cached.resetTime) {
        if (cached.count >= max) {
          const retryAfterSeconds = Math.ceil((cached.resetTime - now) / 1000);
          res.setHeader('Retry-After', retryAfterSeconds);
          return res.status(statusCode).json({
            error: message,
            retryAfterSeconds,
          });
        }
        cached.count += 1;
      } else {
        // Window expired, reset
        cached.count = 1;
        cached.resetTime = now + windowMs;
      }
    } else {
      memoryStore.set(key, { count: 1, resetTime: now + windowMs });
    }

    // 2. Persist to PostgreSQL rateLimits table asynchronously
    try {
      const resetDate = new Date(now + windowMs);
      const existing = await db.select().from(rateLimits).where(eq(rateLimits.key, key)).limit(1);

      if (existing.length === 0) {
        await db.insert(rateLimits).values({
          key,
          points: 1,
          resetAt: resetDate,
        });
      } else {
        const item = existing[0];
        if (new Date(item.resetAt).getTime() < now) {
          await db.update(rateLimits).set({ points: 1, resetAt: resetDate }).where(eq(rateLimits.key, key));
        } else {
          await db.update(rateLimits).set({ points: item.points + 1 }).where(eq(rateLimits.key, key));
        }
      }
    } catch (err) {
      // Non-blocking fallback to memory store
    }

    next();
  };
}

// Specific rate limiters
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per IP per 15 min
  message: 'Too many authentication attempts. For security reasons, please wait 15 minutes before trying again.',
});

export const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // 15 registrations per IP per hour
  message: 'Registration rate limit exceeded. Please try again in an hour.',
});

export const forgotPasswordRateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 5, // 5 requests per IP
  message: 'Password reset request limit reached. Please wait before requesting another reset link.',
});

export const generalApiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120, // 120 requests per minute
  message: 'API rate limit reached. Please throttle your requests.',
});

// Failed login attempt tracker with progressive lockouts (per user email)
export async function trackFailedLogin(email: string): Promise<{ isLocked: boolean; lockExpiresAt?: Date }> {
  const normEmail = email.trim().toLowerCase();
  const existingUsers = await db.select().from(users).where(eq(users.email, normEmail)).limit(1);

  if (existingUsers.length === 0) {
    return { isLocked: false };
  }

  const user = existingUsers[0];
  const newAttempts = (user.failedLoginAttempts || 0) + 1;
  let lockedUntil: Date | null = user.lockedUntil || null;

  // Lock account after 5 consecutive failures for 15 minutes
  if (newAttempts >= 5) {
    lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
  }

  await db
    .update(users)
    .set({
      failedLoginAttempts: newAttempts,
      lockedUntil,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));

  return {
    isLocked: !!lockedUntil && lockedUntil.getTime() > Date.now(),
    lockExpiresAt: lockedUntil || undefined,
  };
}

export async function resetFailedLoginAttempts(userId: string): Promise<void> {
  await db
    .update(users)
    .set({
      failedLoginAttempts: 0,
      lockedUntil: null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}
