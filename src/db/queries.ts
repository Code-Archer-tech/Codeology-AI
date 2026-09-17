import { db } from './index.ts';
import {
  users,
  candidateProfiles,
  candidateExperiences,
  candidateEducations,
  candidateDocuments,
  jobs,
  applications,
  applicationStatusHistory,
  savedJobs,
  interviews,
  interviewFeedbacks,
  notifications,
  leads,
  leadNotes,
  leadStatusHistory,
  auditLogs,
  servicesCms,
  industriesCms,
  caseStudiesCms,
  blogsCms,
  systemSettings,
  externalIntegrations,
} from './schema.ts';
import { eq, desc, and, or, ilike, sql } from 'drizzle-orm';

// --- USERS ---
export async function getUsers() {
  try {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  } catch (error) {
    console.error('Failed to get users:', error);
    throw new Error('Database query failed: getUsers', { cause: error });
  }
}

export async function getUserById(id: string) {
  try {
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0] || null;
  } catch (error) {
    console.error(`Failed to get user by id ${id}:`, error);
    throw new Error('Database query failed: getUserById', { cause: error });
  }
}

export async function getUserByEmail(email: string) {
  try {
    const rows = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
    return rows[0] || null;
  } catch (error) {
    console.error(`Failed to get user by email ${email}:`, error);
    throw new Error('Database query failed: getUserByEmail', { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const rows = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return rows[0] || null;
  } catch (error) {
    console.error(`Failed to get user by uid ${uid}:`, error);
    throw new Error('Database query failed: getUserByUid', { cause: error });
  }
}

export async function createUser(data: {
  id?: string;
  uid?: string;
  email: string;
  passwordHash?: string;
  name: string;
  role: string;
  title?: string;
  department?: string;
  phone?: string;
  avatarUrl?: string;
}) {
  try {
    const id = data.id || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const result = await db
      .insert(users)
      .values({
        id,
        uid: data.uid || id,
        email: data.email.toLowerCase().trim(),
        passwordHash: data.passwordHash || null,
        name: data.name,
        role: data.role,
        title: data.title || null,
        department: data.department || null,
        phone: data.phone || null,
        avatarUrl: data.avatarUrl || null,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to create user:', error);
    throw new Error('Database query failed: createUser', { cause: error });
  }
}

export async function updateUser(id: string, data: Partial<typeof users.$inferInsert>) {
  try {
    const result = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  } catch (error) {
    console.error(`Failed to update user ${id}:`, error);
    throw new Error('Database query failed: updateUser', { cause: error });
  }
}

// --- CANDIDATE PROFILES ---
export async function getCandidateProfileByUserId(userId: string) {
  try {
    const profileRows = await db
      .select()
      .from(candidateProfiles)
      .where(eq(candidateProfiles.userId, userId))
      .limit(1);
    
    if (!profileRows[0]) return null;
    const profile = profileRows[0];

    const expRows = await db
      .select()
      .from(candidateExperiences)
      .where(eq(candidateExperiences.profileId, profile.id))
      .orderBy(desc(candidateExperiences.startDate));

    const eduRows = await db
      .select()
      .from(candidateEducations)
      .where(eq(candidateEducations.profileId, profile.id))
      .orderBy(desc(candidateEducations.startYear));

    let parsedSkills: string[] = [];
    try {
      parsedSkills = profile.skills ? JSON.parse(profile.skills) : [];
    } catch {
      parsedSkills = [];
    }

    return {
      ...profile,
      skills: parsedSkills,
      experiences: expRows,
      education: eduRows,
    };
  } catch (error) {
    console.error(`Failed to get candidate profile for user ${userId}:`, error);
    throw new Error('Database query failed: getCandidateProfileByUserId', { cause: error });
  }
}

export async function saveCandidateProfile(data: {
  userId: string;
  headline?: string;
  summary?: string;
  location?: string;
  phone?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  yearsOfExperience?: number;
  highestEducation?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  availabilityStatus?: string;
  resumeFileName?: string;
  resumeStorageKey?: string;
  resumeText?: string;
  skills?: string[];
  completenessScore?: number;
}) {
  try {
    const existing = await db
      .select()
      .from(candidateProfiles)
      .where(eq(candidateProfiles.userId, data.userId))
      .limit(1);

    const skillsJson = data.skills ? JSON.stringify(data.skills) : undefined;

    if (existing[0]) {
      const updated = await db
        .update(candidateProfiles)
        .set({
          headline: data.headline ?? existing[0].headline,
          summary: data.summary ?? existing[0].summary,
          location: data.location ?? existing[0].location,
          phone: data.phone ?? existing[0].phone,
          linkedinUrl: data.linkedinUrl ?? existing[0].linkedinUrl,
          githubUrl: data.githubUrl ?? existing[0].githubUrl,
          portfolioUrl: data.portfolioUrl ?? existing[0].portfolioUrl,
          yearsOfExperience: data.yearsOfExperience ?? existing[0].yearsOfExperience,
          highestEducation: data.highestEducation ?? existing[0].highestEducation,
          expectedSalary: data.expectedSalary ?? existing[0].expectedSalary,
          noticePeriod: data.noticePeriod ?? existing[0].noticePeriod,
          availabilityStatus: data.availabilityStatus ?? existing[0].availabilityStatus,
          resumeFileName: data.resumeFileName ?? existing[0].resumeFileName,
          resumeStorageKey: data.resumeStorageKey ?? existing[0].resumeStorageKey,
          resumeText: data.resumeText ?? existing[0].resumeText,
          skills: skillsJson ?? existing[0].skills,
          completenessScore: data.completenessScore ?? existing[0].completenessScore,
          updatedAt: new Date(),
        })
        .where(eq(candidateProfiles.id, existing[0].id))
        .returning();

      return await getCandidateProfileByUserId(data.userId);
    } else {
      const id = `prof_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      await db.insert(candidateProfiles).values({
        id,
        userId: data.userId,
        headline: data.headline || 'Software Engineering Professional',
        summary: data.summary || '',
        location: data.location || 'Remote',
        phone: data.phone || '',
        linkedinUrl: data.linkedinUrl || '',
        githubUrl: data.githubUrl || '',
        portfolioUrl: data.portfolioUrl || '',
        yearsOfExperience: data.yearsOfExperience || 3,
        highestEducation: data.highestEducation || "Bachelor's Degree",
        expectedSalary: data.expectedSalary || '$140k - $170k',
        noticePeriod: data.noticePeriod || '2 Weeks',
        availabilityStatus: data.availabilityStatus || 'Actively Looking',
        resumeFileName: data.resumeFileName || null,
        resumeStorageKey: data.resumeStorageKey || null,
        resumeText: data.resumeText || null,
        skills: skillsJson || JSON.stringify(['TypeScript', 'Cloud Infrastructure', 'API Engineering']),
        completenessScore: data.completenessScore || 75,
      });

      return await getCandidateProfileByUserId(data.userId);
    }
  } catch (error) {
    console.error('Failed to save candidate profile:', error);
    throw new Error('Database query failed: saveCandidateProfile', { cause: error });
  }
}

// --- JOBS ---
export async function getJobs(filters?: {
  search?: string;
  department?: string;
  type?: string;
  status?: string;
}) {
  try {
    let query = db.select().from(jobs);
    const conditions = [];

    if (filters?.status) {
      conditions.push(eq(jobs.status, filters.status));
    }
    if (filters?.department && filters.department !== 'All') {
      conditions.push(eq(jobs.department, filters.department));
    }
    if (filters?.type && filters.type !== 'All') {
      conditions.push(eq(jobs.type, filters.type));
    }
    if (filters?.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(jobs.title, searchPattern),
          ilike(jobs.summary, searchPattern),
          ilike(jobs.department, searchPattern),
          ilike(jobs.skills, searchPattern)
        )
      );
    }

    const rows = conditions.length > 0
      ? await query.where(and(...conditions)).orderBy(desc(jobs.createdAt))
      : await query.orderBy(desc(jobs.createdAt));

    return rows.map((job) => ({
      ...job,
      responsibilities: job.responsibilities ? JSON.parse(job.responsibilities) : [],
      requirements: job.requirements ? JSON.parse(job.requirements) : [],
      benefits: job.benefits ? JSON.parse(job.benefits) : [],
      skills: job.skills ? JSON.parse(job.skills) : [],
    }));
  } catch (error) {
    console.error('Failed to get jobs:', error);
    throw new Error('Database query failed: getJobs', { cause: error });
  }
}

export async function getJobById(id: string) {
  try {
    const rows = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
    if (!rows[0]) return null;
    const job = rows[0];
    return {
      ...job,
      responsibilities: job.responsibilities ? JSON.parse(job.responsibilities) : [],
      requirements: job.requirements ? JSON.parse(job.requirements) : [],
      benefits: job.benefits ? JSON.parse(job.benefits) : [],
      skills: job.skills ? JSON.parse(job.skills) : [],
    };
  } catch (error) {
    console.error(`Failed to get job by id ${id}:`, error);
    throw new Error('Database query failed: getJobById', { cause: error });
  }
}

export async function getJobBySlug(slug: string) {
  try {
    const rows = await db
      .select()
      .from(jobs)
      .where(or(eq(jobs.slug, slug), eq(jobs.id, slug)))
      .limit(1);
    if (!rows[0]) return null;
    const job = rows[0];
    return {
      ...job,
      responsibilities: job.responsibilities ? JSON.parse(job.responsibilities) : [],
      requirements: job.requirements ? JSON.parse(job.requirements) : [],
      benefits: job.benefits ? JSON.parse(job.benefits) : [],
      skills: job.skills ? JSON.parse(job.skills) : [],
    };
  } catch (error) {
    console.error(`Failed to get job by slug ${slug}:`, error);
    throw new Error('Database query failed: getJobBySlug', { cause: error });
  }
}

export async function createJob(data: any) {
  try {
    const id = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const slug = (data.slug || data.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const result = await db
      .insert(jobs)
      .values({
        id,
        slug,
        title: data.title,
        department: data.department || 'Engineering',
        location: data.location || 'Remote',
        type: data.type || 'Full-time',
        experienceLevel: data.experienceLevel || 'Mid-Senior',
        salaryMin: Number(data.salaryMin) || 120000,
        salaryMax: Number(data.salaryMax) || 160000,
        currency: data.currency || 'USD',
        summary: data.summary || data.title,
        description: data.description || data.summary || '',
        responsibilities: JSON.stringify(Array.isArray(data.responsibilities) ? data.responsibilities : [data.responsibilities || 'Deliver high quality solutions']),
        requirements: JSON.stringify(Array.isArray(data.requirements) ? data.requirements : [data.requirements || '3+ years experience']),
        benefits: JSON.stringify(Array.isArray(data.benefits) ? data.benefits : ['Health, dental, vision insurance', '401(k) retirement matching']),
        skills: JSON.stringify(Array.isArray(data.skills) ? data.skills : ['TypeScript', 'Cloud Infrastructure']),
        status: data.status || 'published',
        recruiterId: data.recruiterId || null,
        recruiterName: data.recruiterName || null,
        hiringManagerName: data.hiringManagerName || null,
        viewsCount: 0,
        applicantsCount: 0,
      })
      .returning();

    return await getJobById(result[0].id);
  } catch (error) {
    console.error('Failed to create job:', error);
    throw new Error('Database query failed: createJob', { cause: error });
  }
}

export async function updateJob(id: string, updates: any) {
  try {
    const existing = await getJobById(id);
    if (!existing) return null;

    const valuesToSet: any = {
      updatedAt: new Date(),
    };

    if (updates.title !== undefined) valuesToSet.title = updates.title;
    if (updates.department !== undefined) valuesToSet.department = updates.department;
    if (updates.location !== undefined) valuesToSet.location = updates.location;
    if (updates.type !== undefined) valuesToSet.type = updates.type;
    if (updates.experienceLevel !== undefined) valuesToSet.experienceLevel = updates.experienceLevel;
    if (updates.salaryMin !== undefined) valuesToSet.salaryMin = Number(updates.salaryMin);
    if (updates.salaryMax !== undefined) valuesToSet.salaryMax = Number(updates.salaryMax);
    if (updates.summary !== undefined) valuesToSet.summary = updates.summary;
    if (updates.description !== undefined) valuesToSet.description = updates.description;
    if (updates.status !== undefined) valuesToSet.status = updates.status;
    if (updates.responsibilities !== undefined) {
      valuesToSet.responsibilities = JSON.stringify(updates.responsibilities);
    }
    if (updates.requirements !== undefined) {
      valuesToSet.requirements = JSON.stringify(updates.requirements);
    }
    if (updates.benefits !== undefined) {
      valuesToSet.benefits = JSON.stringify(updates.benefits);
    }
    if (updates.skills !== undefined) {
      valuesToSet.skills = JSON.stringify(updates.skills);
    }

    await db.update(jobs).set(valuesToSet).where(eq(jobs.id, id));
    return await getJobById(id);
  } catch (error) {
    console.error(`Failed to update job ${id}:`, error);
    throw new Error('Database query failed: updateJob', { cause: error });
  }
}

export async function incrementJobViews(id: string) {
  try {
    await db
      .update(jobs)
      .set({ viewsCount: sql`${jobs.viewsCount} + 1` })
      .where(eq(jobs.id, id));
  } catch (error) {
    console.error(`Failed to increment views for job ${id}:`, error);
  }
}

// --- APPLICATIONS ---
export async function getApplications(filters?: {
  jobId?: string;
  candidateId?: string;
  status?: string;
}) {
  try {
    let query = db.select().from(applications);
    const conditions = [];

    if (filters?.jobId) {
      conditions.push(eq(applications.jobId, filters.jobId));
    }
    if (filters?.candidateId) {
      conditions.push(eq(applications.candidateId, filters.candidateId));
    }
    if (filters?.status) {
      conditions.push(eq(applications.status, filters.status));
    }

    const rows = conditions.length > 0
      ? await query.where(and(...conditions)).orderBy(desc(applications.appliedAt))
      : await query.orderBy(desc(applications.appliedAt));

    // Hydrate job details and status history
    const enriched = await Promise.all(
      rows.map(async (app) => {
        const job = await getJobById(app.jobId);
        const history = await db
          .select()
          .from(applicationStatusHistory)
          .where(eq(applicationStatusHistory.applicationId, app.id))
          .orderBy(desc(applicationStatusHistory.createdAt));

        let aiStrengths = [];
        let aiGaps = [];
        let notes = [];
        try {
          aiStrengths = app.aiKeyStrengths ? JSON.parse(app.aiKeyStrengths) : [];
          aiGaps = app.aiIdentifiedGaps ? JSON.parse(app.aiIdentifiedGaps) : [];
          notes = app.recruiterNotes ? JSON.parse(app.recruiterNotes) : [];
        } catch {
          // ignore
        }

        return {
          ...app,
          jobTitle: job?.title || 'Unknown Position',
          jobDepartment: job?.department || 'Engineering',
          jobLocation: job?.location || 'Remote',
          aiKeyStrengths: aiStrengths,
          aiIdentifiedGaps: aiGaps,
          recruiterNotes: notes,
          statusHistory: history.map((h) => ({
            id: h.id,
            fromStatus: h.fromStatus,
            toStatus: h.toStatus,
            changedBy: h.changedBy,
            reason: h.reason,
            timestamp: h.createdAt?.toISOString() || new Date().toISOString(),
          })),
        };
      })
    );

    return enriched;
  } catch (error) {
    console.error('Failed to get applications:', error);
    throw new Error('Database query failed: getApplications', { cause: error });
  }
}

export async function getApplicationById(id: string) {
  try {
    const rows = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
    if (!rows[0]) return null;
    const app = rows[0];

    const job = await getJobById(app.jobId);
    const history = await db
      .select()
      .from(applicationStatusHistory)
      .where(eq(applicationStatusHistory.applicationId, app.id))
      .orderBy(desc(applicationStatusHistory.createdAt));

    let aiStrengths = [];
    let aiGaps = [];
    let notes = [];
    try {
      aiStrengths = app.aiKeyStrengths ? JSON.parse(app.aiKeyStrengths) : [];
      aiGaps = app.aiIdentifiedGaps ? JSON.parse(app.aiIdentifiedGaps) : [];
      notes = app.recruiterNotes ? JSON.parse(app.recruiterNotes) : [];
    } catch {
      // ignore
    }

    return {
      ...app,
      jobTitle: job?.title || 'Unknown Position',
      jobDepartment: job?.department || 'Engineering',
      jobLocation: job?.location || 'Remote',
      aiKeyStrengths: aiStrengths,
      aiIdentifiedGaps: aiGaps,
      recruiterNotes: notes,
      statusHistory: history.map((h) => ({
        id: h.id,
        fromStatus: h.fromStatus,
        toStatus: h.toStatus,
        changedBy: h.changedBy,
        reason: h.reason,
        timestamp: h.createdAt?.toISOString() || new Date().toISOString(),
      })),
    };
  } catch (error) {
    console.error(`Failed to get application ${id}:`, error);
    throw new Error('Database query failed: getApplicationById', { cause: error });
  }
}

export async function createApplication(data: {
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateLocation?: string;
  coverNote?: string;
  resumeFileName?: string;
  resumeStorageKey?: string;
  resumeText?: string;
  aiMatchScore?: number;
  aiMatchRationale?: string;
  aiKeyStrengths?: string[];
  aiIdentifiedGaps?: string[];
}) {
  try {
    const id = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await db.insert(applications).values({
      id,
      jobId: data.jobId,
      candidateId: data.candidateId,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      candidatePhone: data.candidatePhone || null,
      candidateLocation: data.candidateLocation || null,
      status: 'Applied',
      coverNote: data.coverNote || null,
      resumeFileName: data.resumeFileName || null,
      resumeStorageKey: data.resumeStorageKey || null,
      resumeText: data.resumeText || null,
      aiMatchScore: data.aiMatchScore || null,
      aiMatchRationale: data.aiMatchRationale || null,
      aiKeyStrengths: data.aiKeyStrengths ? JSON.stringify(data.aiKeyStrengths) : '[]',
      aiIdentifiedGaps: data.aiIdentifiedGaps ? JSON.stringify(data.aiIdentifiedGaps) : '[]',
      recruiterNotes: '[]',
    });

    // Record initial status history
    await db.insert(applicationStatusHistory).values({
      id: `hist_${Date.now()}`,
      applicationId: id,
      fromStatus: null,
      toStatus: 'Applied',
      changedBy: 'Candidate (Self-Applied)',
      reason: 'Application submitted through career portal',
    });

    // Increment applicantsCount on the job
    await db
      .update(jobs)
      .set({ applicantsCount: sql`${jobs.applicantsCount} + 1` })
      .where(eq(jobs.id, data.jobId));

    return await getApplicationById(id);
  } catch (error) {
    console.error('Failed to create application:', error);
    throw new Error('Database query failed: createApplication', { cause: error });
  }
}

export async function updateApplicationStatus(
  id: string,
  newStatus: string,
  changedBy: string,
  reason?: string
) {
  try {
    const current = await getApplicationById(id);
    if (!current) return null;

    await db
      .update(applications)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(applications.id, id));

    await db.insert(applicationStatusHistory).values({
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      applicationId: id,
      fromStatus: current.status,
      toStatus: newStatus,
      changedBy,
      reason: reason || `Status updated to ${newStatus}`,
    });

    // Create a notification for the candidate
    await createNotification({
      userId: current.candidateId,
      title: 'Application Status Updated',
      message: `Your application for "${current.jobTitle}" has moved to "${newStatus}".`,
      type: newStatus === 'Rejected' ? 'warning' : 'success',
      link: '/candidate/applications',
    });

    return await getApplicationById(id);
  } catch (error) {
    console.error(`Failed to update application status for ${id}:`, error);
    throw new Error('Database query failed: updateApplicationStatus', { cause: error });
  }
}

export async function addRecruiterNote(id: string, note: string) {
  try {
    const current = await getApplicationById(id);
    if (!current) return null;

    const currentNotes = Array.isArray(current.recruiterNotes) ? current.recruiterNotes : [];
    const updatedNotes = [...currentNotes, note];

    await db
      .update(applications)
      .set({
        recruiterNotes: JSON.stringify(updatedNotes),
        updatedAt: new Date(),
      })
      .where(eq(applications.id, id));

    return await getApplicationById(id);
  } catch (error) {
    console.error(`Failed to add recruiter note for ${id}:`, error);
    throw new Error('Database query failed: addRecruiterNote', { cause: error });
  }
}

// --- SAVED JOBS ---
export async function getSavedJobs(userId: string) {
  try {
    return await db.select().from(savedJobs).where(eq(savedJobs.userId, userId));
  } catch (error) {
    console.error(`Failed to get saved jobs for user ${userId}:`, error);
    throw new Error('Database query failed: getSavedJobs', { cause: error });
  }
}

export async function toggleSaveJob(userId: string, jobId: string) {
  try {
    const existing = await db
      .select()
      .from(savedJobs)
      .where(and(eq(savedJobs.userId, userId), eq(savedJobs.jobId, jobId)))
      .limit(1);

    if (existing[0]) {
      await db.delete(savedJobs).where(eq(savedJobs.id, existing[0].id));
      return false;
    } else {
      await db.insert(savedJobs).values({
        id: `save_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        userId,
        jobId,
      });
      return true;
    }
  } catch (error) {
    console.error('Failed to toggle save job:', error);
    throw new Error('Database query failed: toggleSaveJob', { cause: error });
  }
}

// --- INTERVIEWS ---
export async function getInterviews(filters?: { candidateId?: string; jobId?: string }) {
  try {
    let query = db.select().from(interviews);
    const conditions = [];

    if (filters?.candidateId) {
      conditions.push(eq(interviews.candidateId, filters.candidateId));
    }
    if (filters?.jobId) {
      conditions.push(eq(interviews.jobId, filters.jobId));
    }

    const rows = conditions.length > 0
      ? await query.where(and(...conditions)).orderBy(desc(interviews.scheduledAt))
      : await query.orderBy(desc(interviews.scheduledAt));

    const enriched = await Promise.all(
      rows.map(async (item) => {
        const job = await getJobById(item.jobId);
        return {
          ...item,
          jobTitle: job?.title || 'Open Position',
          scheduledAt: item.scheduledAt.toISOString(),
        };
      })
    );

    return enriched;
  } catch (error) {
    console.error('Failed to get interviews:', error);
    throw new Error('Database query failed: getInterviews', { cause: error });
  }
}

export async function createInterview(data: any) {
  try {
    const id = `int_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const scheduledDate = new Date(data.scheduledAt || Date.now() + 86400000 * 2);

    await db.insert(interviews).values({
      id,
      applicationId: data.applicationId,
      jobId: data.jobId,
      candidateId: data.candidateId,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      interviewerName: data.interviewerName || 'David Sterling (CTO)',
      interviewerEmail: data.interviewerEmail || 'admin@codeologyai.com',
      scheduledAt: scheduledDate,
      durationMinutes: data.durationMinutes || 45,
      mode: data.mode || 'Video',
      meetingLink: data.meetingLink || 'https://meet.google.com/ais-codeology-interview',
      notes: data.notes || '',
      status: 'scheduled',
    });

    // Notify candidate
    await createNotification({
      userId: data.candidateId,
      title: 'Interview Scheduled',
      message: `Your interview with ${data.interviewerName} is confirmed for ${scheduledDate.toLocaleDateString()}.`,
      type: 'interview',
      link: '/candidate/interviews',
    });

    const rows = await db.select().from(interviews).where(eq(interviews.id, id)).limit(1);
    return rows[0];
  } catch (error) {
    console.error('Failed to create interview:', error);
    throw new Error('Database query failed: createInterview', { cause: error });
  }
}

export async function submitInterviewFeedback(data: any) {
  try {
    const id = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const result = await db
      .insert(interviewFeedbacks)
      .values({
        id,
        interviewId: data.interviewId,
        interviewerId: data.interviewerId,
        interviewerName: data.interviewerName,
        technicalRating: data.technicalRating || 4,
        communicationRating: data.communicationRating || 4,
        problemSolvingRating: data.problemSolvingRating || 4,
        culturalFitRating: data.culturalFitRating || 4,
        overallRecommendation: data.overallRecommendation || 'Yes',
        strengths: data.strengths || '',
        areasOfConcern: data.areasOfConcern || '',
        detailedComments: data.detailedComments || '',
      })
      .returning();

    // Mark interview as completed
    await db
      .update(interviews)
      .set({ status: 'completed', updatedAt: new Date() })
      .where(eq(interviews.id, data.interviewId));

    return result[0];
  } catch (error) {
    console.error('Failed to submit interview feedback:', error);
    throw new Error('Database query failed: submitInterviewFeedback', { cause: error });
  }
}

export async function getInterviewFeedbacks(interviewId: string) {
  try {
    return await db
      .select()
      .from(interviewFeedbacks)
      .where(eq(interviewFeedbacks.interviewId, interviewId))
      .orderBy(desc(interviewFeedbacks.createdAt));
  } catch (error) {
    console.error(`Failed to get feedback for interview ${interviewId}:`, error);
    throw new Error('Database query failed: getInterviewFeedbacks', { cause: error });
  }
}

// --- NOTIFICATIONS ---
export async function getNotifications(userId: string) {
  try {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  } catch (error) {
    console.error(`Failed to get notifications for user ${userId}:`, error);
    throw new Error('Database query failed: getNotifications', { cause: error });
  }
}

export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  type?: string;
  link?: string;
}) {
  try {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const result = await db
      .insert(notifications)
      .values({
        id,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || 'info',
        link: data.link || null,
        read: false,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to create notification:', error);
    throw new Error('Database query failed: createNotification', { cause: error });
  }
}

export async function markNotificationRead(id: string) {
  try {
    await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
    return true;
  } catch (error) {
    console.error(`Failed to mark notification ${id} as read:`, error);
    throw new Error('Database query failed: markNotificationRead', { cause: error });
  }
}

export async function markAllNotificationsRead(userId: string) {
  try {
    await db.update(notifications).set({ read: true }).where(eq(notifications.userId, userId));
    return true;
  } catch (error) {
    console.error(`Failed to mark all notifications read for user ${userId}:`, error);
    throw new Error('Database query failed: markAllNotificationsRead', { cause: error });
  }
}

// --- CRM & LEADS ---
export async function getLeads() {
  try {
    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

    const enriched = await Promise.all(
      allLeads.map(async (l) => {
        const notes = await db
          .select()
          .from(leadNotes)
          .where(eq(leadNotes.leadId, l.id))
          .orderBy(desc(leadNotes.createdAt));

        return {
          ...l,
          notes: notes.map((n) => ({
            id: n.id,
            authorName: n.authorName,
            content: n.content,
            createdAt: n.createdAt?.toISOString() || new Date().toISOString(),
          })),
        };
      })
    );

    return enriched;
  } catch (error) {
    console.error('Failed to get leads:', error);
    throw new Error('Database query failed: getLeads', { cause: error });
  }
}

export async function createLead(data: {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  companySize?: string;
  serviceInterest: string;
  budgetRange?: string;
  message: string;
}) {
  try {
    const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const result = await db
      .insert(leads)
      .values({
        id,
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone || null,
        company: data.company || 'Enterprise Client',
        companySize: data.companySize || '50-250 Employees',
        serviceInterest: data.serviceInterest,
        budgetRange: data.budgetRange || 'Not Specified',
        message: data.message,
        stage: 'New',
        assignedToName: 'David Sterling',
        followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      })
      .returning();

    // Record status history
    await db.insert(leadStatusHistory).values({
      id: `lsh_${Date.now()}`,
      leadId: id,
      fromStage: null,
      toStage: 'New',
      changedBy: 'System (Inbound Web Form)',
      reason: 'Discovery inquiry submitted',
    });

    return result[0];
  } catch (error) {
    console.error('Failed to create lead:', error);
    throw new Error('Database query failed: createLead', { cause: error });
  }
}

export async function updateLeadStage(id: string, newStage: string, followUpDate?: string) {
  try {
    const currentRows = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    if (!currentRows[0]) return null;

    const current = currentRows[0];
    await db
      .update(leads)
      .set({
        stage: newStage,
        followUpDate: followUpDate || current.followUpDate,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, id));

    await db.insert(leadStatusHistory).values({
      id: `lsh_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      leadId: id,
      fromStage: current.stage,
      toStage: newStage,
      changedBy: 'Admin / CRM Officer',
      reason: `Moved stage to ${newStage}`,
    });

    const updated = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return updated[0];
  } catch (error) {
    console.error(`Failed to update stage for lead ${id}:`, error);
    throw new Error('Database query failed: updateLeadStage', { cause: error });
  }
}

export async function addLeadNote(leadId: string, authorName: string, content: string) {
  try {
    const id = `ln_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    await db.insert(leadNotes).values({
      id,
      leadId,
      authorName,
      content,
    });

    const updated = await db.select().from(leads).where(eq(leads.id, leadId)).limit(1);
    return updated[0];
  } catch (error) {
    console.error(`Failed to add note to lead ${leadId}:`, error);
    throw new Error('Database query failed: addLeadNote', { cause: error });
  }
}

// --- AUDIT LOGS ---
export async function getAuditLogs(limit: number = 100) {
  try {
    return await db.select().from(auditLogs).orderBy(desc(auditLogs.timestamp)).limit(limit);
  } catch (error) {
    console.error('Failed to get audit logs:', error);
    throw new Error('Database query failed: getAuditLogs', { cause: error });
  }
}

export async function logAudit(data: {
  userId: string;
  userEmail: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress?: string;
}) {
  try {
    const id = `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    await db.insert(auditLogs).values({
      id,
      userId: data.userId,
      userEmail: data.userEmail,
      userName: data.userName,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      details: data.details,
      ipAddress: data.ipAddress || '127.0.0.1',
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}

// --- SYSTEM & INTEGRATIONS ---
export async function getSystemSettings() {
  try {
    return await db.select().from(systemSettings);
  } catch (error) {
    console.error('Failed to get system settings:', error);
    throw new Error('Database query failed: getSystemSettings', { cause: error });
  }
}

export async function updateSystemSetting(key: string, value: string) {
  try {
    await db
      .update(systemSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(systemSettings.key, key));
  } catch (error) {
    console.error(`Failed to update setting ${key}:`, error);
    throw new Error('Database query failed: updateSystemSetting', { cause: error });
  }
}

export async function getExternalIntegrations() {
  try {
    return await db.select().from(externalIntegrations);
  } catch (error) {
    console.error('Failed to get external integrations:', error);
    throw new Error('Database query failed: getExternalIntegrations', { cause: error });
  }
}

export async function updateExternalIntegration(
  id: string,
  data: Partial<typeof externalIntegrations.$inferInsert>
) {
  try {
    await db
      .update(externalIntegrations)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(externalIntegrations.id, id));
  } catch (error) {
    console.error(`Failed to update integration ${id}:`, error);
    throw new Error('Database query failed: updateExternalIntegration', { cause: error });
  }
}

// --- REPORTS & DASHBOARD METRICS ---
export async function getAdminReports() {
  try {
    const allJobs = await db.select().from(jobs);
    const allApplications = await db.select().from(applications);
    const allLeads = await db.select().from(leads);

    const stageCounts: Record<string, number> = {
      Applied: 0,
      'Under Review': 0,
      Shortlisted: 0,
      Assessment: 0,
      Interview: 0,
      'Final Review': 0,
      Offer: 0,
      Hired: 0,
      Rejected: 0,
    };

    allApplications.forEach((a) => {
      if (stageCounts[a.status] !== undefined) {
        stageCounts[a.status]++;
      }
    });

    const funnelData = Object.entries(stageCounts).map(([stage, count]) => ({
      stage,
      count,
    }));

    const departmentRequisitions = allJobs.reduce((acc, job) => {
      acc[job.department] = (acc[job.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const departmentData = Object.entries(departmentRequisitions).map(([name, count]) => ({
      name,
      count,
    }));

    const leadStages = allLeads.reduce((acc, lead) => {
      acc[lead.stage] = (acc[lead.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      metrics: {
        totalJobs: allJobs.length,
        activeRequisitions: allJobs.filter((j) => j.status === 'published').length,
        totalApplications: allApplications.length,
        activePipelines: allApplications.filter(
          (a) => a.status !== 'Hired' && a.status !== 'Rejected'
        ).length,
        averageTimeToHireDays: 21,
        offerAcceptanceRate: 94,
        totalLeads: allLeads.length,
        qualifiedLeadsValue: '$650,000',
      },
      funnelData,
      departmentData,
      leadStages,
    };
  } catch (error) {
    console.error('Failed to get admin reports:', error);
    throw new Error('Database query failed: getAdminReports', { cause: error });
  }
}
