import crypto from 'crypto';
import { db } from '../src/db/index.ts';
import { verificationTokens, passwordResetTokens, users } from '../src/db/schema.ts';
import { eq, and, gt } from 'drizzle-orm';

export function generateSecureToken(): { rawToken: string; tokenHash: string } {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  return { rawToken, tokenHash };
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token.trim()).digest('hex');
}

export async function createVerificationToken(userId: string, hoursValid = 24): Promise<string> {
  const { rawToken, tokenHash } = generateSecureToken();
  const expiresAt = new Date(Date.now() + hoursValid * 60 * 60 * 1000);

  // Invalidate any previous unused tokens for this user
  await db
    .update(verificationTokens)
    .set({ isUsed: true })
    .where(eq(verificationTokens.userId, userId));

  await db.insert(verificationTokens).values({
    id: `vtok_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    userId,
    tokenHash,
    expiresAt,
    isUsed: false,
  });

  return rawToken;
}

export async function consumeVerificationToken(
  rawToken: string
): Promise<{ success: boolean; userId?: string; error?: string }> {
  if (!rawToken || rawToken.trim().length < 10) {
    return { success: false, error: 'Invalid verification token format' };
  }

  const tokenHash = hashToken(rawToken);
  const now = new Date();

  const matchingTokens = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.tokenHash, tokenHash),
        eq(verificationTokens.isUsed, false),
        gt(verificationTokens.expiresAt, now)
      )
    )
    .limit(1);

  if (!matchingTokens.length) {
    return { success: false, error: 'Verification token is invalid, already used, or expired' };
  }

  const tokenRecord = matchingTokens[0];

  // Mark token as used
  await db
    .update(verificationTokens)
    .set({ isUsed: true })
    .where(eq(verificationTokens.id, tokenRecord.id));

  // Mark user as email verified and ACTIVE
  await db
    .update(users)
    .set({
      isEmailVerified: true,
      status: 'ACTIVE',
      updatedAt: new Date(),
    })
    .where(eq(users.id, tokenRecord.userId));

  return { success: true, userId: tokenRecord.userId };
}

export async function createPasswordResetToken(userId: string, hoursValid = 1): Promise<string> {
  const { rawToken, tokenHash } = generateSecureToken();
  const expiresAt = new Date(Date.now() + hoursValid * 60 * 60 * 1000);

  // Invalidate previous tokens
  await db
    .update(passwordResetTokens)
    .set({ isUsed: true })
    .where(eq(passwordResetTokens.userId, userId));

  await db.insert(passwordResetTokens).values({
    id: `prtok_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    userId,
    tokenHash,
    expiresAt,
    isUsed: false,
  });

  return rawToken;
}

export async function validatePasswordResetToken(
  rawToken: string
): Promise<{ valid: boolean; userId?: string; error?: string }> {
  if (!rawToken || rawToken.trim().length < 10) {
    return { valid: false, error: 'Invalid reset token format' };
  }

  const tokenHash = hashToken(rawToken);
  const now = new Date();

  const matchingTokens = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.tokenHash, tokenHash),
        eq(passwordResetTokens.isUsed, false),
        gt(passwordResetTokens.expiresAt, now)
      )
    )
    .limit(1);

  if (!matchingTokens.length) {
    return { valid: false, error: 'Password reset token is invalid, expired, or already used' };
  }

  return { valid: true, userId: matchingTokens[0].userId };
}

export async function consumePasswordResetToken(rawToken: string): Promise<boolean> {
  const tokenHash = hashToken(rawToken);
  const res = await db
    .update(passwordResetTokens)
    .set({ isUsed: true })
    .where(eq(passwordResetTokens.tokenHash, tokenHash));
  return true;
}
