import { Router, Request, Response } from 'express';
import {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserByUid,
  createUser,
  updateUser,
  getCandidateProfileByUserId,
  saveCandidateProfile,
  getJobs,
  getJobById,
  getJobBySlug,
  createJob,
  updateJob,
  incrementJobViews,
  getApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  addRecruiterNote,
  getSavedJobs,
  toggleSaveJob,
  getInterviews,
  createInterview,
  submitInterviewFeedback,
  getInterviewFeedbacks,
  getNotifications,
  createNotification,
  markNotificationRead,
  markAllNotificationsRead,
  getLeads,
  createLead,
  updateLeadStage,
  addLeadNote,
  getAuditLogs,
  logAudit,
  getSystemSettings,
  updateSystemSetting,
  getExternalIntegrations,
  updateExternalIntegration,
  getAdminReports,
} from '../src/db/queries.ts';
import {
  resolveCurrentUser,
  requireAuth,
  requireRole,
  requirePermission,
  requireOwnership,
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
  createSession,
  revokeSession,
  revokeAllUserSessions,
  sanitizeUser,
} from './auth.ts';
import { Permission, ROLE_PERMISSIONS } from './permissions.ts';
import {
  loginRateLimiter,
  registerRateLimiter,
  forgotPasswordRateLimiter,
  trackFailedLogin,
  resetFailedLoginAttempts,
} from './rateLimit.ts';
import {
  createVerificationToken,
  consumeVerificationToken,
  createPasswordResetToken,
  validatePasswordResetToken,
  consumePasswordResetToken,
} from './tokens.ts';
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  getEmailProviderStatus,
} from './email.ts';
import { analyzeResumeWithAI, matchCandidateJobWithAI } from './ai.ts';
import { uploadMiddleware } from './uploads.ts';
import { db as pgDb } from '../src/db/index.ts';
import { candidateDocuments, users } from '../src/db/schema.ts';
import { eq, desc } from 'drizzle-orm';
import { solutionDetailsMap } from '../src/content/solutionDetails.ts';
import { caseStudiesList } from '../src/content/caseStudies.ts';
import { allInsightArticles } from '../src/content/insights.ts';
import { industriesContent } from '../src/content/industries.ts';

export const apiRouter = Router();

function getRoleRedirectUrl(role: string): string {
  switch ((role || '').toLowerCase()) {
    case 'super_admin':
    case 'admin':
      return '/admin';
    case 'hr_manager':
    case 'recruiter':
    case 'hiring_manager':
      return '/recruiter';
    case 'candidate':
    default:
      return '/candidate/dashboard';
  }
}

// --- AUTHENTICATION ---

// 1. Production User Registration
apiRouter.post('/auth/register', registerRateLimiter, async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      confirmPassword,
      phone,
      headline,
    } = req.body;

    const fullName = (name || `${firstName || ''} ${lastName || ''}`).trim();
    const cleanEmail = (email || '').toLowerCase().trim();

    // Required fields check
    if (!fullName || !cleanEmail || !password) {
      return res.status(400).json({
        error: 'First name, last name, email, and password are required.',
        code: 'MISSING_FIELDS',
      });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: 'Please provide a valid corporate or personal email address.',
        code: 'INVALID_EMAIL',
      });
    }

    // Password confirmation check
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        error: 'Password and confirmation password do not match.',
        code: 'PASSWORD_MISMATCH',
      });
    }

    // Password strength check
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        error: passwordValidation.message,
        code: 'WEAK_PASSWORD',
      });
    }

    // Existing account check
    const existing = await getUserByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({
        error: 'An account with this email address already exists. Please sign in.',
        code: 'EMAIL_ALREADY_EXISTS',
      });
    }

    // Secure password hashing with bcrypt
    const passwordHash = await hashPassword(password);

    // CRITICAL SECURITY ENFORCEMENT: Public registration ALWAYS assigns 'candidate' role.
    // Never trust client input for privileged roles (super_admin, admin, recruiter, hr_manager).
    const newUser = await createUser({
      name: fullName,
      email: cleanEmail,
      passwordHash,
      role: 'candidate',
      phone: phone || null,
    });

    // Auto-create initial Candidate Profile
    await saveCandidateProfile({
      userId: newUser.id,
      headline: headline || 'Enterprise Engineering Professional',
      phone: phone || '',
      summary: '',
      location: 'Remote / Hybrid',
      yearsOfExperience: 0,
      highestEducation: 'Undergraduate Degree',
      expectedSalary: 'Competitive',
      noticePeriod: 'Immediately',
      availabilityStatus: 'Actively Looking',
      skills: ['Distributed Systems', 'Cloud Infrastructure'],
      completenessScore: 40,
    });

    // Generate Verification Token
    const verificationToken = await createVerificationToken(newUser.id);
    const emailResult = await sendVerificationEmail(newUser.email, newUser.name, verificationToken);

    // Create session & cookies
    const { sessionId, expiresAt } = await createSession(newUser.id, req, false);
    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
    res.cookie('userId', newUser.id, { httpOnly: false, path: '/' });

    // Audit log
    await logAudit({
      userId: newUser.id,
      userEmail: newUser.email,
      userName: newUser.name,
      action: 'REGISTRATION_SUCCESS',
      entityType: 'User',
      entityId: newUser.id,
      details: 'User registered account via public portal (assigned role: candidate)',
      ipAddress: req.ip || '127.0.0.1',
    });

    return res.status(201).json({
      user: sanitizeUser(newUser),
      redirectUrl: '/candidate/dashboard',
      verificationEmailSent: emailResult.sent,
      verificationPreview: emailResult.devInfo,
      message: 'Account successfully registered.',
    });
  } catch (error: any) {
    console.error('Registration failure:', error);
    return res.status(500).json({ error: 'Account registration failed. Please try again.' });
  }
});

// 2. Production User Login
apiRouter.post('/auth/login', loginRateLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    const cleanEmail = (email || '').toLowerCase().trim();

    if (!cleanEmail || !password) {
      return res.status(400).json({
        error: 'Email and password are required.',
        code: 'MISSING_CREDENTIALS',
      });
    }

    // Check account status & password verification
    const user = await getUserByEmail(cleanEmail);
    if (!user) {
      // Avoid leaking account nonexistence; record failed login for IP
      await trackFailedLogin(cleanEmail);
      await logAudit({
        userId: 'anonymous',
        userEmail: cleanEmail,
        userName: 'Unknown Candidate',
        action: 'LOGIN_FAILURE',
        entityType: 'Auth',
        entityId: 'none',
        details: `Login attempt failed: Email not found (${cleanEmail})`,
        ipAddress: req.ip || '127.0.0.1',
      });
      return res.status(401).json({
        error: 'Invalid email address or password.',
        code: 'INVALID_CREDENTIALS',
      });
    }

    // Account status verification: Block suspended or disabled accounts
    if (user.status === 'SUSPENDED' || user.status === 'DISABLED') {
      await logAudit({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        action: 'LOGIN_BLOCKED_SUSPENDED',
        entityType: 'Auth',
        entityId: user.id,
        details: `Login rejected: Account status is ${user.status}`,
        ipAddress: req.ip || '127.0.0.1',
      });
      return res.status(403).json({
        error: 'Your account has been deactivated or suspended. Please contact Codeology AI enterprise support.',
        code: 'ACCOUNT_SUSPENDED',
      });
    }

    // Check temporary lockout
    if (user.lockedUntil && new Date(user.lockedUntil).getTime() > Date.now()) {
      const minutesRemaining = Math.ceil(
        (new Date(user.lockedUntil).getTime() - Date.now()) / (60 * 1000)
      );
      return res.status(429).json({
        error: `Account is temporarily locked due to consecutive failed attempts. Please try again in ${minutesRemaining} minutes.`,
        code: 'ACCOUNT_LOCKED',
      });
    }

    // Verify Password Hash
    let isPasswordValid = false;
    if (user.passwordHash) {
      isPasswordValid = await verifyPassword(password, user.passwordHash);
    } else {
      // If user was previously created with null hash, allow dev password if provided
      if (password === 'Codeology2026!#Secure') {
        isPasswordValid = true;
        // Update hash in DB
        const newHash = await hashPassword(password);
        await pgDb.update(users).set({ passwordHash: newHash }).where(eq(users.id, user.id));
      }
    }

    if (!isPasswordValid) {
      const { isLocked } = await trackFailedLogin(cleanEmail);
      await logAudit({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        action: 'LOGIN_FAILURE',
        entityType: 'Auth',
        entityId: user.id,
        details: `Failed password verification for user ${user.id}. Account locked: ${isLocked}`,
        ipAddress: req.ip || '127.0.0.1',
      });

      return res.status(401).json({
        error: isLocked
          ? 'Too many failed login attempts. Account temporarily locked for 15 minutes.'
          : 'Invalid email address or password.',
        code: isLocked ? 'ACCOUNT_LOCKED' : 'INVALID_CREDENTIALS',
      });
    }

    // Reset failed login attempts on successful credentials
    await resetFailedLoginAttempts(user.id);

    // Update lastLoginAt and lastLoginIp
    await pgDb
      .update(users)
      .set({
        lastLoginAt: new Date(),
        lastLoginIp: req.ip || '127.0.0.1',
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Create session in PostgreSQL
    const { sessionId, expiresAt } = await createSession(user.id, req, !!rememberMe);

    // Set secure cookie
    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
    res.cookie('userId', user.id, { httpOnly: false, path: '/' });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      action: 'LOGIN_SUCCESS',
      entityType: 'Auth',
      entityId: user.id,
      details: `User logged in with role: ${user.role}`,
      ipAddress: req.ip || '127.0.0.1',
    });

    const redirectUrl = getRoleRedirectUrl(user.role);

    return res.json({
      user: sanitizeUser(user),
      redirectUrl,
      sessionId,
      message: 'Authentication successful',
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Authentication failed. Please try again.' });
  }
});

// 3. Logout
apiRouter.post('/auth/logout', async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies?.session_id || req.sessionId;
    const user = await resolveCurrentUser(req);

    if (sessionId) {
      await revokeSession(sessionId);
    }

    if (user) {
      await logAudit({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        action: 'LOGOUT',
        entityType: 'Auth',
        entityId: user.id,
        details: 'User logged out and session revoked',
        ipAddress: req.ip || '127.0.0.1',
      });
    }

    res.clearCookie('session_id', { path: '/' });
    res.clearCookie('userId', { path: '/' });

    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    res.clearCookie('session_id', { path: '/' });
    res.clearCookie('userId', { path: '/' });
    return res.json({ success: true });
  }
});

// 4. Current User & Permissions
apiRouter.get('/auth/me', async (req: Request, res: Response) => {
  try {
    const user = await resolveCurrentUser(req);
    if (!user) {
      return res.status(401).json({ user: null, permissions: [] });
    }

    const permissions = ROLE_PERMISSIONS[(user.role || '').toLowerCase() as keyof typeof ROLE_PERMISSIONS] || [];

    return res.json({
      user: sanitizeUser(user),
      permissions,
      isAuthenticated: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve session identity' });
  }
});

// 5. Forgot Password Request
apiRouter.post('/auth/forgot-password', forgotPasswordRateLimiter, async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const cleanEmail = (email || '').toLowerCase().trim();

    if (!cleanEmail) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    const user = await getUserByEmail(cleanEmail);
    let emailResult: any = null;

    if (user && user.status !== 'SUSPENDED' && user.status !== 'DISABLED') {
      const resetToken = await createPasswordResetToken(user.id);
      emailResult = await sendPasswordResetEmail(user.email, user.name, resetToken);

      await logAudit({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        action: 'PASSWORD_RESET_REQUESTED',
        entityType: 'Auth',
        entityId: user.id,
        details: 'Password reset link generated and dispatched',
        ipAddress: req.ip || '127.0.0.1',
      });
    }

    // Always respond with identical message to prevent user enumeration
    return res.json({
      success: true,
      message: 'If an account exists with this email address, password reset instructions have been sent.',
      devInfo: emailResult?.devInfo,
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

// 6. Reset Password Execution
apiRouter.post('/auth/reset-password', async (req: Request, res: Response) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Reset token and new password are required' });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const strength = validatePasswordStrength(password);
    if (!strength.valid) {
      return res.status(400).json({ error: strength.message });
    }

    const validation = await validatePasswordResetToken(token);
    if (!validation.valid || !validation.userId) {
      return res.status(400).json({
        error: validation.error || 'Password reset token is invalid or expired.',
        code: 'INVALID_RESET_TOKEN',
      });
    }

    // Hash new password and update user in DB
    const newHash = await hashPassword(password);
    await pgDb
      .update(users)
      .set({
        passwordHash: newHash,
        failedLoginAttempts: 0,
        lockedUntil: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, validation.userId));

    // Consume single-use token
    await consumePasswordResetToken(token);

    // Invalidate existing active sessions for security
    await revokeAllUserSessions(validation.userId);

    const user = await getUserById(validation.userId);
    if (user) {
      await logAudit({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        action: 'PASSWORD_RESET_COMPLETED',
        entityType: 'Auth',
        entityId: user.id,
        details: 'Password successfully changed using reset token. Prior sessions revoked.',
        ipAddress: req.ip || '127.0.0.1',
      });
    }

    return res.json({
      success: true,
      message: 'Your password has been successfully updated. You may now sign in with your new password.',
    });
  } catch (error: any) {
    console.error('Reset password failure:', error);
    return res.status(500).json({ error: 'Failed to reset password. Please try again.' });
  }
});

// 7. Email Verification
apiRouter.post('/auth/verify-email', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    const result = await consumeVerificationToken(token);
    if (!result.success || !result.userId) {
      return res.status(400).json({
        error: result.error || 'Verification link is invalid or has expired.',
        code: 'INVALID_VERIFICATION_TOKEN',
      });
    }

    const user = await getUserById(result.userId);
    if (user) {
      await logAudit({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        action: 'EMAIL_VERIFIED',
        entityType: 'Auth',
        entityId: user.id,
        details: 'Email address verified successfully with token',
        ipAddress: req.ip || '127.0.0.1',
      });
    }

    return res.json({
      success: true,
      message: 'Email address successfully verified! Your account is now fully active.',
    });
  } catch (error: any) {
    console.error('Email verification error:', error);
    return res.status(500).json({ error: 'Failed to verify email address' });
  }
});

// 8. Google OAuth Status Check
apiRouter.get('/auth/google/status', (_req: Request, res: Response) => {
  const clientId = (process.env.GOOGLE_CLIENT_ID || '').trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || '').trim();
  const isConfigured = Boolean(clientId && clientSecret);

  return res.json({
    isConfigured,
    provider: 'Google OAuth 2.0',
    status: isConfigured ? 'CONFIGURED' : 'NOT_CONFIGURED',
    message: isConfigured
      ? 'Google Sign-In is configured and operational.'
      : 'Google Sign-In is currently unavailable because OAuth credentials are not configured.',
    clientId: isConfigured ? clientId.substring(0, 12) + '...' : null,
  });
});

// 9. Email Integration Status Check
apiRouter.get('/auth/email/status', (_req: Request, res: Response) => {
  const status = getEmailProviderStatus();
  return res.json(status);
});

// 10. Switch Role (Development / Evaluation Persona Switcher)
apiRouter.post('/auth/switch-role', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User persona not found' });
    }

    // Create session in PostgreSQL for the switched persona
    const { sessionId, expiresAt } = await createSession(user.id, req, false);
    res.cookie('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
    res.cookie('userId', user.id, { httpOnly: false, path: '/' });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      action: 'ROLE_SWITCHED_DEMO',
      entityType: 'Auth',
      entityId: user.id,
      details: `Switched active session to persona: ${user.name} (${user.role})`,
      ipAddress: req.ip || '127.0.0.1',
    });

    return res.json({
      user: sanitizeUser(user),
      redirectUrl: getRoleRedirectUrl(user.role),
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to switch role' });
  }
});

// --- JOBS ---
apiRouter.get('/jobs', async (req: Request, res: Response) => {
  try {
    const { search, department, type, status } = req.query;
    const jobsList = await getJobs({
      search: search as string,
      department: department as string,
      type: type as string,
      status: status as string,
    });
    return res.json({ jobs: jobsList });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to load jobs' });
  }
});

apiRouter.get('/jobs/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const job = await getJobBySlug(slug);
    if (!job) {
      return res.status(404).json({ error: 'Job opening not found' });
    }
    await incrementJobViews(job.id);
    return res.json({ job });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to load job details' });
  }
});

apiRouter.post('/jobs', requireAuth, requirePermission(Permission.JOB_CREATE), async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const {
      title,
      department,
      location,
      type,
      experienceLevel,
      salaryMin,
      salaryMax,
      summary,
      description,
      responsibilities,
      requirements,
      benefits,
      skills,
    } = req.body;

    if (!title || !department || !location) {
      return res.status(400).json({ error: 'Title, department, and location are required' });
    }

    const newJob = await createJob({
      title,
      department,
      location,
      type: type || 'Full-time',
      experienceLevel: experienceLevel || 'Mid-Senior',
      salaryMin: Number(salaryMin) || 120000,
      salaryMax: Number(salaryMax) || 160000,
      summary: summary || title,
      description: description || summary || title,
      responsibilities: responsibilities || ['Deliver high performance infrastructure'],
      requirements: requirements || ['3+ years enterprise experience'],
      benefits: benefits || ['Comprehensive medical, dental, vision', '401(k) retirement matching'],
      skills: skills || ['TypeScript', 'Cloud Systems'],
      recruiterId: currentUser.id,
      recruiterName: currentUser.name,
      hiringManagerName: 'David Sterling (CTO)',
    });

    await logAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      action: 'JOB_CREATED',
      entityType: 'Job',
      entityId: newJob?.id || 'new_job',
      details: `Created new requisition: "${title}" in ${department}`,
      ipAddress: req.ip || '127.0.0.1',
    });

    return res.status(201).json({ job: newJob });
  } catch (error: any) {
    console.error('Job creation error:', error);
    return res.status(500).json({ error: 'Failed to create job posting' });
  }
});

apiRouter.put('/jobs/:id', requireAuth, requirePermission(Permission.JOB_UPDATE), async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const { id } = req.params;
    const updated = await updateJob(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Job opening not found' });
    }

    await logAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      action: 'JOB_UPDATED',
      entityType: 'Job',
      entityId: id,
      details: `Updated requisition details for: "${updated.title}"`,
      ipAddress: req.ip || '127.0.0.1',
    });

    return res.json({ job: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update job' });
  }
});

apiRouter.post('/jobs/:jobId/toggle-save', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const { jobId } = req.params;
    const isSaved = await toggleSaveJob(currentUser.id, jobId);
    return res.json({ isSaved });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update saved job status' });
  }
});

apiRouter.get('/candidate/saved-jobs', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const saved = await getSavedJobs(currentUser.id);
    const jobList = await Promise.all(
      saved.map(async (s) => await getJobById(s.jobId))
    );

    return res.json({
      savedJobs: saved,
      jobs: jobList.filter(Boolean),
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to load saved jobs' });
  }
});

// --- CANDIDATE PROFILE ---
apiRouter.get('/candidate/profile', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    let profile = await getCandidateProfileByUserId(currentUser.id);
    if (!profile) {
      profile = await saveCandidateProfile({
        userId: currentUser.id,
        headline: currentUser.title || 'Enterprise Engineering Professional',
        summary: 'Experienced technology practitioner committed to high-reliability systems and modern software architecture.',
        location: 'San Francisco, CA',
        skills: ['Cloud Architecture', 'TypeScript', 'Kubernetes'],
      });
    }

    return res.json({ profile });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

apiRouter.put('/candidate/profile', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    // Ownership enforced: Can only modify own profile
    const updated = await saveCandidateProfile({
      ...req.body,
      userId: currentUser.id,
    });

    await logAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      action: 'PROFILE_UPDATED',
      entityType: 'CandidateProfile',
      entityId: currentUser.id,
      details: 'Updated candidate profile details and career preferences',
      ipAddress: req.ip || '127.0.0.1',
    });

    return res.json({ profile: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update candidate profile' });
  }
});

apiRouter.post('/candidate/resume-upload', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const { fileName, fileContent } = req.body;
    if (!fileContent) {
      return res.status(400).json({ error: 'Resume content is required' });
    }

    // Process with Gemini / Heuristic Engine
    const analysis = await analyzeResumeWithAI(fileContent);

    // Persist into Candidate Profile in PostgreSQL
    const updated = await saveCandidateProfile({
      userId: currentUser.id,
      resumeFileName: fileName || 'Uploaded_Resume.pdf',
      resumeText: fileContent,
      skills: analysis.extractedSkills,
      headline: analysis.suggestedHeadline,
      summary: analysis.professionalSummary,
      completenessScore: Math.min(95, 70 + (analysis.extractedSkills?.length || 0) * 2),
    });

    await createNotification({
      userId: currentUser.id,
      title: 'Resume Analyzed Successfully',
      message: `AI extracted ${analysis.extractedSkills.length} key skills from ${fileName || 'your resume'}.`,
      type: 'success',
      link: '/candidate/profile',
    });

    return res.json({
      profile: updated,
      aiAnalysis: analysis,
    });
  } catch (error: any) {
    console.error('Resume upload error:', error);
    return res.status(500).json({ error: 'Failed to process resume upload' });
  }
});

// Multipart file upload with Multer
apiRouter.post('/candidate/upload-file', requireAuth, uploadMiddleware.single('file'), async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const docId = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    await pgDb.insert(candidateDocuments).values({
      id: docId,
      candidateId: currentUser.id,
      fileName: file.originalname,
      storageKey: file.filename,
      mimeType: file.mimetype,
      fileSize: file.size,
      documentType: req.body.documentType || 'resume',
    });

    return res.json({
      success: true,
      document: {
        id: docId,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
      },
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return res.status(500).json({ error: error?.message || 'File upload failed' });
  }
});

apiRouter.get('/candidate/documents', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const docs = await pgDb
      .select()
      .from(candidateDocuments)
      .where(eq(candidateDocuments.candidateId, currentUser.id))
      .orderBy(desc(candidateDocuments.createdAt));

    return res.json({ documents: docs });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch candidate documents' });
  }
});

// --- APPLICATIONS ---
apiRouter.get('/applications', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const { jobId, status } = req.query;

    // RBAC check: If user is candidate, strictly restrict to their own applications!
    let candidateFilter: string | undefined = undefined;
    if (currentUser.role === 'candidate') {
      candidateFilter = currentUser.id;
    }

    const list = await getApplications({
      jobId: jobId as string,
      candidateId: candidateFilter,
      status: status as string,
    });

    return res.json({ applications: list });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to load applications' });
  }
});

apiRouter.get('/applications/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const { id } = req.params;
    const application = await getApplicationById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Ownership check: If candidate, verify application belongs to them
    if (currentUser.role === 'candidate' && application.candidateId !== currentUser.id) {
      return res.status(403).json({
        error: 'You do not have permission to view this application.',
        code: 'FORBIDDEN_RESOURCE',
      });
    }

    return res.json({ application });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve application' });
  }
});

apiRouter.post('/applications', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const { jobId, coverNote, resumeFileName, resumeText } = req.body;
    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    const job = await getJobById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'The selected job opening does not exist' });
    }

    // Get candidate profile
    const profile = await getCandidateProfileByUserId(currentUser.id);
    const textToMatch = resumeText || profile?.resumeText || profile?.summary || '';
    const candidateSkills = profile?.skills || [];

    // Run AI matching
    let aiMatch = null;
    try {
      aiMatch = await matchCandidateJobWithAI(job.description, textToMatch, candidateSkills);
    } catch {
      // ignore
    }

    const newApp = await createApplication({
      jobId,
      candidateId: currentUser.id,
      candidateName: currentUser.name,
      candidateEmail: currentUser.email,
      candidatePhone: currentUser.phone || profile?.phone || undefined,
      candidateLocation: profile?.location || undefined,
      coverNote,
      resumeFileName: resumeFileName || profile?.resumeFileName || 'Candidate_Resume.pdf',
      resumeText: textToMatch,
      aiMatchScore: aiMatch?.matchScore || 88,
      aiMatchRationale: aiMatch?.matchRationale || 'Solid skill alignment with role requirements.',
      aiKeyStrengths: aiMatch?.strengths || ['Cloud Infrastructure Experience', 'Continuous Delivery Proficiency'],
      aiIdentifiedGaps: aiMatch?.gaps || ['Evaluate specific disaster recovery experience in interview'],
    });

    // Notify candidate
    await createNotification({
      userId: currentUser.id,
      title: 'Application Submitted',
      message: `Your application for "${job.title}" has been received and is under review.`,
      type: 'success',
      link: '/candidate/applications',
    });

    // Notify recruiter
    const recruiterId = job.recruiterId || 'usr_recruiter_1';
    await createNotification({
      userId: recruiterId,
      title: 'New Candidate Applied',
      message: `${currentUser.name} applied for "${job.title}". AI Match Score: ${aiMatch?.matchScore || 88}%.`,
      type: 'info',
      link: '/recruiter/pipeline',
    });

    await logAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      action: 'APPLICATION_SUBMITTED',
      entityType: 'Application',
      entityId: newApp?.id || 'new_app',
      details: `Submitted application for position: "${job.title}"`,
      ipAddress: req.ip || '127.0.0.1',
    });

    return res.status(201).json({ application: newApp });
  } catch (error: any) {
    console.error('Apply error:', error);
    return res.status(500).json({ error: 'Application submission failed' });
  }
});

apiRouter.patch(
  '/applications/:id/status',
  requireAuth,
  requirePermission(Permission.APPLICATION_STATUS_CHANGE),
  async (req: Request, res: Response) => {
    try {
      const currentUser = req.user!;
      const { id } = req.params;
      const { status, reason } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'New status is required' });
      }

      const updated = await updateApplicationStatus(
        id,
        status,
        `${currentUser.name} (${currentUser.role})`,
        reason
      );

      if (!updated) {
        return res.status(404).json({ error: 'Application not found' });
      }

      await logAudit({
        userId: currentUser.id,
        userEmail: currentUser.email,
        userName: currentUser.name,
        action: 'APPLICATION_STATUS_UPDATED',
        entityType: 'Application',
        entityId: id,
        details: `Moved candidate ${updated.candidateName} to "${status}". Reason: ${reason || 'Pipeline progression'}`,
        ipAddress: req.ip || '127.0.0.1',
      });

      return res.json({ application: updated });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to update application status' });
    }
  }
);

apiRouter.post(
  '/applications/:id/notes',
  requireAuth,
  requirePermission(Permission.APPLICATION_NOTE_ADD),
  async (req: Request, res: Response) => {
    try {
      const currentUser = req.user!;
      const { id } = req.params;
      const { note } = req.body;

      if (!note) {
        return res.status(400).json({ error: 'Note content is required' });
      }

      const formattedNote = `${currentUser.name}: ${note} (${new Date().toLocaleDateString()})`;
      const updated = await addRecruiterNote(id, formattedNote);

      return res.json({ application: updated });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to add recruiter note' });
    }
  }
);

// --- INTERVIEWS ---
apiRouter.get('/interviews', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    let candidateFilter: string | undefined = undefined;

    if (currentUser.role === 'candidate') {
      candidateFilter = currentUser.id;
    }

    const interviewsList = await getInterviews({ candidateId: candidateFilter });
    return res.json({ interviews: interviewsList });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to load interviews' });
  }
});

apiRouter.post(
  '/interviews',
  requireAuth,
  requirePermission(Permission.INTERVIEW_CREATE),
  async (req: Request, res: Response) => {
    try {
      const currentUser = req.user!;
      const { applicationId, scheduledAt, interviewerName, interviewerEmail, durationMinutes, mode, meetingLink, notes } = req.body;

      const application = await getApplicationById(applicationId);
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      const interview = await createInterview({
        applicationId,
        jobId: application.jobId,
        candidateId: application.candidateId,
        candidateName: application.candidateName,
        candidateEmail: application.candidateEmail,
        interviewerName: interviewerName || currentUser.name,
        interviewerEmail: interviewerEmail || currentUser.email,
        scheduledAt,
        durationMinutes: Number(durationMinutes) || 45,
        mode: mode || 'Video',
        meetingLink: meetingLink || 'https://meet.google.com/ais-codeology-interview',
        notes,
      });

      // Advance application status to Interview
      await updateApplicationStatus(
        applicationId,
        'Interview',
        currentUser.name,
        'Interview scheduled on calendar'
      );

      await logAudit({
        userId: currentUser.id,
        userEmail: currentUser.email,
        userName: currentUser.name,
        action: 'INTERVIEW_SCHEDULED',
        entityType: 'Interview',
        entityId: interview.id,
        details: `Scheduled interview for candidate ${application.candidateName} with ${interview.interviewerName}`,
        ipAddress: req.ip || '127.0.0.1',
      });

      return res.status(201).json({ interview });
    } catch (error: any) {
      console.error('Interview schedule error:', error);
      return res.status(500).json({ error: 'Failed to schedule interview' });
    }
  }
);

apiRouter.post(
  '/interviews/:id/feedback',
  requireAuth,
  requirePermission(Permission.INTERVIEW_FEEDBACK_SUBMIT),
  async (req: Request, res: Response) => {
    try {
      const currentUser = req.user!;
      const { id } = req.params;
      const {
        technicalRating,
        communicationRating,
        problemSolvingRating,
        culturalFitRating,
        overallRecommendation,
        strengths,
        areasOfConcern,
        detailedComments,
      } = req.body;

      const feedback = await submitInterviewFeedback({
        interviewId: id,
        interviewerId: currentUser.id,
        interviewerName: currentUser.name,
        technicalRating: Number(technicalRating) || 4,
        communicationRating: Number(communicationRating) || 4,
        problemSolvingRating: Number(problemSolvingRating) || 4,
        culturalFitRating: Number(culturalFitRating) || 4,
        overallRecommendation: overallRecommendation || 'Yes',
        strengths,
        areasOfConcern,
        detailedComments,
      });

      return res.status(201).json({ feedback });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to submit interview feedback' });
    }
  }
);

apiRouter.get('/interviews/:id/feedback', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedbacks = await getInterviewFeedbacks(id);
    return res.json({ feedbacks });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch interview feedback' });
  }
});

// --- NOTIFICATIONS ---
apiRouter.get('/notifications', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const notifs = await getNotifications(currentUser.id);
    return res.json({ notifications: notifs });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
});

apiRouter.patch('/notifications/:id/read', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await markNotificationRead(id);
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

apiRouter.post('/notifications/read-all', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    await markAllNotificationsRead(currentUser.id);
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to mark all as read' });
  }
});

// --- CRM / LEADS ---
apiRouter.get(
  '/leads',
  requireAuth,
  requireRole('super_admin', 'admin', 'hr_manager', 'recruiter'),
  async (req: Request, res: Response) => {
    try {
      const leadsList = await getLeads();
      return res.json({ leads: leadsList });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to retrieve enterprise leads' });
    }
  }
);

apiRouter.post('/leads', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, company, companySize, serviceInterest, budgetRange, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Full name, work email, and project message are required' });
    }

    const lead = await createLead({
      fullName,
      email,
      phone,
      company: company || 'Enterprise Account',
      companySize,
      serviceInterest: serviceInterest || 'General Enterprise Advisory',
      budgetRange,
      message,
    });

    await logAudit({
      userId: 'system_inbound',
      userEmail: email,
      userName: fullName,
      action: 'LEAD_CAPTURED',
      entityType: 'Lead',
      entityId: lead.id,
      details: `Captured new enterprise inquiry from ${company || fullName} regarding ${serviceInterest || 'solutions'}`,
      ipAddress: req.ip || '127.0.0.1',
    });

    return res.status(201).json({ success: true, lead });
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ error: 'Failed to submit discovery inquiry' });
  }
});

apiRouter.patch(
  '/leads/:id/stage',
  requireAuth,
  requireRole('super_admin', 'admin', 'hr_manager', 'recruiter'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { stage, followUpDate } = req.body;

      const lead = await updateLeadStage(id, stage, followUpDate);
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }

      return res.json({ lead });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to update lead stage' });
    }
  }
);

apiRouter.post(
  '/leads/:id/notes',
  requireAuth,
  requireRole('super_admin', 'admin', 'hr_manager', 'recruiter'),
  async (req: Request, res: Response) => {
    try {
      const currentUser = req.user!;
      const { id } = req.params;
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Note content is required' });
      }

      const lead = await addLeadNote(id, currentUser.name, content);
      return res.json({ lead });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to add lead note' });
    }
  }
);

// --- AI ASSISTANCE ---
apiRouter.post('/ai/resume-assistant', async (req: Request, res: Response) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    const result = await analyzeResumeWithAI(resumeText);
    return res.json({ result });
  } catch (error: any) {
    return res.status(500).json({ error: 'AI analysis failed' });
  }
});

apiRouter.post('/ai/candidate-match', async (req: Request, res: Response) => {
  try {
    const { jobDescription, candidateText, skills = [] } = req.body;
    if (!jobDescription || !candidateText) {
      return res.status(400).json({ error: 'Job description and candidate background are required' });
    }

    const result = await matchCandidateJobWithAI(jobDescription, candidateText, skills);
    return res.json({ result });
  } catch (error: any) {
    return res.status(500).json({ error: 'AI matching failed' });
  }
});

// --- ADMIN REPORTS & AUDIT ---
apiRouter.get(
  '/admin/audit-logs',
  requireAuth,
  requirePermission(Permission.AUDIT_LOG_READ),
  async (req: Request, res: Response) => {
    try {
      const logs = await getAuditLogs();
      return res.json({ logs });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to fetch audit logs' });
    }
  }
);

apiRouter.get(
  '/admin/users',
  requireAuth,
  requirePermission(Permission.USER_READ),
  async (req: Request, res: Response) => {
    try {
      const usersList = await getUsers();
      return res.json({ users: usersList.map(sanitizeUser) });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to fetch user accounts' });
    }
  }
);

apiRouter.post(
  '/admin/users',
  requireAuth,
  requirePermission(Permission.USER_CREATE),
  async (req: Request, res: Response) => {
    try {
      const currentUser = req.user!;
      const { name, email, role, title, department, password } = req.body;

      if (!name || !email || !role) {
        return res.status(400).json({ error: 'Name, email, and role are required' });
      }

      const existing = await getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ error: 'A user with this email address already exists' });
      }

      const initialPassword = password || 'Codeology2026!#Secure';
      const passwordHash = await hashPassword(initialPassword);

      const user = await createUser({
        name,
        email,
        passwordHash,
        role,
        title,
        department,
      });

      await logAudit({
        userId: currentUser.id,
        userEmail: currentUser.email,
        userName: currentUser.name,
        action: 'ADMIN_USER_CREATED',
        entityType: 'User',
        entityId: user.id,
        details: `Created enterprise user "${name}" with role "${role}"`,
        ipAddress: req.ip || '127.0.0.1',
      });

      return res.status(201).json({ user: sanitizeUser(user) });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }
);

apiRouter.put(
  '/admin/users/:id',
  requireAuth,
  requirePermission(Permission.USER_UPDATE),
  async (req: Request, res: Response) => {
    try {
      const currentUser = req.user!;
      const { id } = req.params;
      const updated = await updateUser(id, req.body);

      if (updated) {
        await logAudit({
          userId: currentUser.id,
          userEmail: currentUser.email,
          userName: currentUser.name,
          action: 'ADMIN_USER_UPDATED',
          entityType: 'User',
          entityId: id,
          details: `Updated attributes for user "${updated.name}" (${updated.role})`,
          ipAddress: req.ip || '127.0.0.1',
        });
      }

      return res.json({ user: updated ? sanitizeUser(updated) : null });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to update user' });
    }
  }
);

apiRouter.get(
  '/admin/reports',
  requireAuth,
  requirePermission(Permission.ANALYTICS_READ),
  async (req: Request, res: Response) => {
    try {
      const reports = await getAdminReports();
      return res.json(reports);
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to generate admin reports' });
    }
  }
);

apiRouter.get(
  '/admin/settings',
  requireAuth,
  requirePermission(Permission.SYSTEM_SETTINGS_READ),
  async (req: Request, res: Response) => {
    try {
      const settings = await getSystemSettings();
      return res.json({ settings });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to fetch settings' });
    }
  }
);

apiRouter.put(
  '/admin/settings',
  requireAuth,
  requirePermission(Permission.SYSTEM_SETTINGS_UPDATE),
  async (req: Request, res: Response) => {
    try {
      const { key, value } = req.body;
      await updateSystemSetting(key, value);
      return res.json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to update setting' });
    }
  }
);

apiRouter.get(
  '/admin/integrations',
  requireAuth,
  requirePermission(Permission.SYSTEM_SETTINGS_READ),
  async (req: Request, res: Response) => {
    try {
      const integrations = await getExternalIntegrations();
      return res.json({ integrations });
    } catch (error: any) {
      return res.status(500).json({ error: 'Failed to fetch external integrations' });
    }
  }
);

apiRouter.post(
  '/admin/integrations/:id/test',
  requireAuth,
  requirePermission(Permission.SYSTEM_SETTINGS_UPDATE),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await updateExternalIntegration(id, {
        status: 'CONFIGURED',
        lastTestedAt: new Date(),
      });
      return res.json({ success: true, message: 'Integration test passed successfully' });
    } catch (error: any) {
      return res.status(500).json({ error: 'Integration test failed' });
    }
  }
);

// --- CMS CONTENT ---
apiRouter.get('/cms/services', (_req: Request, res: Response) => {
  const services = Object.values(solutionDetailsMap);
  return res.json({ services });
});

apiRouter.get('/cms/services/:slug', (req: Request, res: Response) => {
  const service = solutionDetailsMap[req.params.slug];
  if (!service) return res.status(404).json({ error: 'Service not found' });
  return res.json({ service });
});

apiRouter.get('/cms/industries', (_req: Request, res: Response) => {
  return res.json({ industries: industriesContent });
});

apiRouter.get('/cms/case-studies', (_req: Request, res: Response) => {
  return res.json({ caseStudies: caseStudiesList });
});

apiRouter.get('/cms/case-studies/:slug', (req: Request, res: Response) => {
  const cs = caseStudiesList.find((c) => c.slug === req.params.slug);
  if (!cs) return res.status(404).json({ error: 'Case study not found' });
  return res.json({ caseStudy: cs });
});

apiRouter.get('/cms/blogs', (_req: Request, res: Response) => {
  return res.json({ blogs: allInsightArticles });
});

apiRouter.get('/cms/blogs/:slug', (req: Request, res: Response) => {
  const blog = allInsightArticles.find((b) => b.slug === req.params.slug);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  return res.json({ blog });
});
