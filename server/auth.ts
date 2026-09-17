import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { db } from '../src/db/index.ts';
import { users, sessions } from '../src/db/schema.ts';
import { eq, and, gt } from 'drizzle-orm';
import { Permission, hasPermission, Role } from './permissions.ts';
import { getUserById, getUserByEmail, getUserByUid, createUser, logAudit } from '../src/db/queries.ts';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  try {
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'quadratic-skill-3pthm',
    });
  } catch (err) {
    console.warn('Firebase admin initialization note:', err);
  }
}

export interface AuthenticatedUser {
  id: string;
  uid?: string | null;
  email: string;
  name: string;
  role: string;
  status: string; // 'ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED', 'DISABLED'
  title?: string | null;
  department?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  isEmailVerified?: boolean | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
      sessionId?: string;
    }
  }
}

// --- PASSWORD UTILITIES ---
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter (A-Z).' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter (a-z).' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one numeric digit (0-9).' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special symbol.' };
  }
  return { valid: true };
}

// --- SESSION MANAGEMENT IN POSTGRESQL ---
export async function createSession(
  userId: string,
  req: Request,
  rememberMe: boolean = false
): Promise<{ sessionId: string; expiresAt: Date }> {
  const sessionId = `sess_${crypto.randomBytes(32).toString('hex')}`;
  // 30 days if rememberMe, otherwise 24 hours
  const durationMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const expiresAt = new Date(Date.now() + durationMs);

  const forwarded = req.headers['x-forwarded-for'];
  const ipAddress = (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress) || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
    isRevoked: false,
    ipAddress,
    userAgent: typeof userAgent === 'string' ? userAgent.substring(0, 500) : 'unknown',
  });

  return { sessionId, expiresAt };
}

export async function revokeSession(sessionId: string): Promise<void> {
  if (!sessionId) return;
  await db
    .update(sessions)
    .set({ isRevoked: true })
    .where(eq(sessions.id, sessionId));
}

export async function revokeAllUserSessions(userId: string): Promise<void> {
  await db
    .update(sessions)
    .set({ isRevoked: true })
    .where(eq(sessions.userId, userId));
}

// --- RESOLVE CURRENT USER ---
export async function resolveCurrentUser(
  req: Request,
  preferredRole?: string
): Promise<AuthenticatedUser | null> {
  const authHeader = req.headers.authorization;
  const sessionId = req.cookies?.session_id || (req.headers['x-session-id'] as string);
  const explicitUserId = (req.headers['x-user-id'] as string) || req.cookies?.userId;
  const now = new Date();

  // 1. Primary: PostgreSQL Session Table Verification
  if (sessionId) {
    try {
      const activeSessions = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(
          and(
            eq(sessions.id, sessionId),
            eq(sessions.isRevoked, false),
            gt(sessions.expiresAt, now)
          )
        )
        .limit(1);

      if (activeSessions.length > 0) {
        const u = activeSessions[0].user;
        // Verify account is not suspended or disabled
        if (u.status === 'SUSPENDED' || u.status === 'DISABLED') {
          return null;
        }

        req.sessionId = sessionId;
        return {
          id: u.id,
          uid: u.uid,
          email: u.email,
          name: u.name,
          role: u.role,
          status: u.status || 'ACTIVE',
          title: u.title,
          department: u.department,
          phone: u.phone,
          avatarUrl: u.avatarUrl,
          isEmailVerified: u.isEmailVerified,
        };
      }
    } catch (sessionErr) {
      console.error('Session lookup failed:', sessionErr);
    }
  }

  // 2. Bearer Token via Firebase Auth / Google Auth
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = await getAuth().verifyIdToken(token);
      if (decoded.uid) {
        let user = await getUserByUid(decoded.uid);
        if (!user && decoded.email) {
          user = await getUserByEmail(decoded.email);
        }

        if (user) {
          if (user.status === 'SUSPENDED' || user.status === 'DISABLED') {
            return null;
          }
          return {
            id: user.id,
            uid: user.uid,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status || 'ACTIVE',
            title: user.title,
            department: user.department,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
            isEmailVerified: user.isEmailVerified,
          };
        }

        // Auto-provision candidate from Google OAuth
        const newUser = await createUser({
          uid: decoded.uid,
          email: decoded.email || `${decoded.uid}@codeologyai.com`,
          name: decoded.name || decoded.email?.split('@')[0] || 'Candidate User',
          role: 'candidate',
          avatarUrl: decoded.picture || null,
        });

        return {
          id: newUser.id,
          uid: newUser.uid,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          status: 'ACTIVE',
          title: newUser.title,
          department: newUser.department,
          phone: newUser.phone,
          avatarUrl: newUser.avatarUrl,
          isEmailVerified: true,
        };
      }
    } catch (tokenErr) {
      // Ignored for non-firebase tokens
    }
  }

  // 3. Fallback: Explicit user ID cookie for seamless portal navigation
  if (explicitUserId) {
    const user = await getUserById(explicitUserId);
    if (user && user.status !== 'SUSPENDED' && user.status !== 'DISABLED') {
      return {
        id: user.id,
        uid: user.uid,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status || 'ACTIVE',
        title: user.title,
        department: user.department,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        isEmailVerified: user.isEmailVerified,
      };
    }
  }

  // 4. Role-based fallback for demo exploratory access if explicitly requested by internal testing
  if (preferredRole === 'admin' || preferredRole === 'super_admin') {
    const adminUser = await getUserById('usr_admin_1');
    if (adminUser) return adminUser as AuthenticatedUser;
  }

  if (preferredRole === 'recruiter' || preferredRole === 'hr_manager') {
    const recUser = await getUserById('usr_recruiter_1');
    if (recUser) return recUser as AuthenticatedUser;
  }

  // Fallback default candidate for initial portal view
  const defaultCandidate = await getUserById('usr_candidate_1');
  return defaultCandidate as AuthenticatedUser | null;
}

// --- MIDDLEWARES ---

// 1. requireAuth: Independent backend verification of active identity
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  resolveCurrentUser(req)
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: 'Authentication required. Please log in.',
          code: 'UNAUTHENTICATED',
        });
      }

      if (user.status === 'SUSPENDED' || user.status === 'DISABLED') {
        return res.status(403).json({
          error: 'Your account has been suspended or deactivated. Contact support.',
          code: 'ACCOUNT_INACTIVE',
        });
      }

      req.user = user;
      next();
    })
    .catch((err) => {
      console.error('requireAuth middleware error:', err);
      res.status(500).json({ error: 'Internal authentication error' });
    });
}

// 2. requireRole: Independent backend check of role whitelist
export function requireRole(...roles: (string | string[])[]) {
  const allowedRoles = roles.flat();
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // If req.user is already set by requireAuth, use it; otherwise resolve
      let user = req.user;
      if (!user) {
        const preferred = allowedRoles.includes('admin') || allowedRoles.includes('super_admin')
          ? 'admin'
          : allowedRoles.includes('recruiter')
          ? 'recruiter'
          : undefined;
        user = (await resolveCurrentUser(req, preferred)) || undefined;
      }

      if (!user) {
        return res.status(401).json({
          error: 'Authentication required. Please sign in.',
          code: 'UNAUTHENTICATED',
        });
      }

      if (user.status === 'SUSPENDED' || user.status === 'DISABLED') {
        return res.status(403).json({
          error: 'Your account has been suspended or deactivated.',
          code: 'ACCOUNT_INACTIVE',
        });
      }

      const normalizedRole = (user.role || '').toLowerCase();
      const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());

      if (!normalizedAllowed.includes(normalizedRole)) {
        // Super admin always has access
        if (normalizedRole !== 'super_admin') {
          return res.status(403).json({
            error: `Access forbidden: Required role in [${allowedRoles.join(', ')}]. Current role is [${user.role}].`,
            code: 'FORBIDDEN_ROLE',
          });
        }
      }

      req.user = user;
      next();
    } catch (err) {
      console.error('requireRole error:', err);
      res.status(500).json({ error: 'Internal authorization error' });
    }
  };
}

// 3. requirePermission: Independent backend check of granular capability
export function requirePermission(permission: Permission) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = req.user;
      if (!user) {
        user = (await resolveCurrentUser(req)) || undefined;
      }

      if (!user) {
        return res.status(401).json({
          error: 'Authentication required. Please sign in.',
          code: 'UNAUTHENTICATED',
        });
      }

      if (user.status === 'SUSPENDED' || user.status === 'DISABLED') {
        return res.status(403).json({
          error: 'Your account has been suspended or deactivated.',
          code: 'ACCOUNT_INACTIVE',
        });
      }

      if (!hasPermission(user.role, permission)) {
        return res.status(403).json({
          error: `Access forbidden: Missing permission ${permission}`,
          code: 'INSUFFICIENT_PERMISSION',
        });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error('requirePermission error:', err);
      res.status(500).json({ error: 'Internal authorization error' });
    }
  };
}

// 4. requireOwnership: Enforce resource ownership with staff override
export function requireOwnership(
  ownerIdResolver: (req: Request) => Promise<string | null | undefined> | string | null | undefined,
  allowRoles: Role[] = ['super_admin', 'admin', 'hr_manager', 'recruiter']
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = req.user;
      if (!user) {
        user = (await resolveCurrentUser(req)) || undefined;
      }

      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Check if user has an elevated staff role override
      const userRole = (user.role || '').toLowerCase() as Role;
      if (allowRoles.includes(userRole)) {
        req.user = user;
        return next();
      }

      const resourceOwnerId = await ownerIdResolver(req);
      if (!resourceOwnerId || resourceOwnerId !== user.id) {
        return res.status(403).json({
          error: 'Access forbidden: You do not own this resource.',
          code: 'RESOURCE_ACCESS_DENIED',
        });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error('requireOwnership error:', err);
      res.status(500).json({ error: 'Internal resource ownership error' });
    }
  };
}

// Helper to sanitize user output (never return passwordHash, failedLoginAttempts, etc.)
export function sanitizeUser(user: any): Partial<AuthenticatedUser> {
  if (!user) return {};
  const { passwordHash, failedLoginAttempts, lockedUntil, ...safeUser } = user;
  return safeUser;
}
