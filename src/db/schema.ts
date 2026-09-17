import { pgTable, text, timestamp, integer, boolean, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Users
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  uid: text('uid').unique(), // Firebase UID or local ID
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  name: text('name').notNull(),
  role: text('role').notNull().default('candidate'), // super_admin, admin, hr_manager, recruiter, hiring_manager, candidate
  status: text('status').notNull().default('ACTIVE'), // 'ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED', 'DISABLED'
  title: text('title'),
  department: text('department'),
  phone: text('phone'),
  avatarUrl: text('avatar_url'),
  isEmailVerified: boolean('is_email_verified').default(true),
  failedLoginAttempts: integer('failed_login_attempts').default(0),
  lockedUntil: timestamp('locked_until'),
  lastLoginAt: timestamp('last_login_at'),
  lastLoginIp: text('last_login_ip'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 1b. Sessions
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(), // secure random session token / ID
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  isRevoked: boolean('is_revoked').default(false),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 1c. Verification Tokens
export const verificationTokens = pgTable('verification_tokens', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  isUsed: boolean('is_used').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// 1d. Password Reset Tokens
export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  isUsed: boolean('is_used').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// 1e. Rate Limits Store
export const rateLimits = pgTable('rate_limits', {
  key: text('key').primaryKey(),
  points: integer('points').notNull().default(1),
  resetAt: timestamp('reset_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Candidate Profiles
export const candidateProfiles = pgTable('candidate_profiles', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  headline: text('headline'),
  summary: text('summary'),
  location: text('location'),
  phone: text('phone'),
  linkedinUrl: text('linkedin_url'),
  githubUrl: text('github_url'),
  portfolioUrl: text('portfolio_url'),
  yearsOfExperience: integer('years_of_experience').default(0),
  highestEducation: text('highest_education'),
  expectedSalary: text('expected_salary'),
  noticePeriod: text('notice_period'),
  availabilityStatus: text('availability_status').default('Actively Looking'),
  resumeFileName: text('resume_file_name'),
  resumeStorageKey: text('resume_storage_key'),
  resumeText: text('resume_text'),
  skills: text('skills').default('[]'), // JSON string of skills
  completenessScore: integer('completeness_score').default(50),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 3. Candidate Experiences
export const candidateExperiences = pgTable('candidate_experiences', {
  id: text('id').primaryKey(),
  profileId: text('profile_id')
    .notNull()
    .references(() => candidateProfiles.id, { onDelete: 'cascade' }),
  company: text('company').notNull(),
  title: text('title').notNull(),
  location: text('location'),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  isCurrent: boolean('is_current').default(false),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 4. Candidate Educations
export const candidateEducations = pgTable('candidate_educations', {
  id: text('id').primaryKey(),
  profileId: text('profile_id')
    .notNull()
    .references(() => candidateProfiles.id, { onDelete: 'cascade' }),
  institution: text('institution').notNull(),
  degree: text('degree').notNull(),
  fieldOfStudy: text('field_of_study').notNull(),
  startYear: text('start_year'),
  endYear: text('end_year'),
  gpa: text('gpa'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 5. Candidate Documents
export const candidateDocuments = pgTable('candidate_documents', {
  id: text('id').primaryKey(),
  candidateId: text('candidate_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  fileName: text('file_name').notNull(),
  storageKey: text('storage_key').notNull(),
  mimeType: text('mime_type').notNull(),
  fileSize: integer('file_size').notNull(),
  documentType: text('document_type').notNull(), // 'resume', 'portfolio', 'certification'
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. Jobs
export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  department: text('department').notNull(),
  location: text('location').notNull(),
  type: text('type').notNull().default('Full-time'),
  experienceLevel: text('experience_level').notNull(),
  salaryMin: integer('salary_min').notNull(),
  salaryMax: integer('salary_max').notNull(),
  currency: text('currency').default('USD'),
  summary: text('summary').notNull(),
  description: text('description').notNull(),
  responsibilities: text('responsibilities').notNull(), // JSON string
  requirements: text('requirements').notNull(), // JSON string
  benefits: text('benefits').notNull(), // JSON string
  skills: text('skills').notNull(), // JSON string
  status: text('status').notNull().default('published'), // 'draft', 'published', 'archived'
  recruiterId: text('recruiter_id').references(() => users.id),
  recruiterName: text('recruiter_name'),
  hiringManagerName: text('hiring_manager_name'),
  viewsCount: integer('views_count').default(0),
  applicantsCount: integer('applicants_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 7. Applications
export const applications = pgTable('applications', {
  id: text('id').primaryKey(),
  jobId: text('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'cascade' }),
  candidateId: text('candidate_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  candidateName: text('candidate_name').notNull(),
  candidateEmail: text('candidate_email').notNull(),
  candidatePhone: text('candidate_phone'),
  candidateLocation: text('candidate_location'),
  status: text('status').notNull().default('Applied'), // 'Applied', 'Under Review', 'Shortlisted', 'Assessment', 'Interview', 'Final Review', 'Offer', 'Hired', 'Rejected'
  coverNote: text('cover_note'),
  resumeFileName: text('resume_file_name'),
  resumeStorageKey: text('resume_storage_key'),
  resumeText: text('resume_text'),
  aiMatchScore: integer('ai_match_score'),
  aiMatchRationale: text('ai_match_rationale'),
  aiKeyStrengths: text('ai_key_strengths'), // JSON string
  aiIdentifiedGaps: text('ai_identified_gaps'), // JSON string
  recruiterNotes: text('recruiter_notes').default('[]'), // JSON string array
  appliedAt: timestamp('applied_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 8. Application Status History
export const applicationStatusHistory = pgTable('application_status_history', {
  id: text('id').primaryKey(),
  applicationId: text('application_id')
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  fromStatus: text('from_status'),
  toStatus: text('to_status').notNull(),
  changedBy: text('changed_by').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 9. Saved Jobs
export const savedJobs = pgTable('saved_jobs', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  jobId: text('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'cascade' }),
  savedAt: timestamp('saved_at').defaultNow(),
});

// 10. Interviews
export const interviews = pgTable('interviews', {
  id: text('id').primaryKey(),
  applicationId: text('application_id')
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  jobId: text('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'cascade' }),
  candidateId: text('candidate_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  candidateName: text('candidate_name').notNull(),
  candidateEmail: text('candidate_email').notNull(),
  interviewerName: text('interviewer_name').notNull(),
  interviewerEmail: text('interviewer_email'),
  scheduledAt: timestamp('scheduled_at').notNull(),
  durationMinutes: integer('duration_minutes').default(45),
  mode: text('mode').default('Video'),
  meetingLink: text('meeting_link'),
  notes: text('notes'),
  status: text('status').notNull().default('scheduled'), // 'scheduled', 'completed', 'cancelled', 'rescheduled'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 11. Interview Feedback
export const interviewFeedbacks = pgTable('interview_feedbacks', {
  id: text('id').primaryKey(),
  interviewId: text('interview_id')
    .notNull()
    .references(() => interviews.id, { onDelete: 'cascade' }),
  interviewerId: text('interviewer_id').notNull(),
  interviewerName: text('interviewer_name').notNull(),
  technicalRating: integer('technical_rating').default(4),
  communicationRating: integer('communication_rating').default(4),
  problemSolvingRating: integer('problem_solving_rating').default(4),
  culturalFitRating: integer('cultural_fit_rating').default(4),
  overallRecommendation: text('overall_recommendation').notNull(), // 'Strong Yes', 'Yes', 'Neutral', 'No', 'Strong No'
  strengths: text('strengths'),
  areasOfConcern: text('areas_of_concern'),
  detailedComments: text('detailed_comments'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 12. In-App Notifications
export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').notNull().default('info'), // 'info', 'success', 'warning', 'interview'
  link: text('link'),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// 13. CRM Leads
export const leads = pgTable('leads', {
  id: text('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company').notNull(),
  companySize: text('company_size'),
  serviceInterest: text('service_interest').notNull(),
  budgetRange: text('budget_range'),
  message: text('message').notNull(),
  stage: text('stage').notNull().default('New'), // 'New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'
  assignedToName: text('assigned_to_name'),
  followUpDate: text('follow_up_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 14. Lead Notes
export const leadNotes = pgTable('lead_notes', {
  id: text('id').primaryKey(),
  leadId: text('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  authorName: text('author_name').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 15. Lead Status History
export const leadStatusHistory = pgTable('lead_status_history', {
  id: text('id').primaryKey(),
  leadId: text('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  fromStage: text('from_stage'),
  toStage: text('to_stage').notNull(),
  changedBy: text('changed_by').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 16. Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  userEmail: text('user_email').notNull(),
  userName: text('user_name').notNull(),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  details: text('details').notNull(),
  ipAddress: text('ip_address'),
  timestamp: timestamp('timestamp').defaultNow(),
});

// 17. Services CMS
export const servicesCms = pgTable('services_cms', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  tagline: text('tagline'),
  heroHeadline: text('hero_headline'),
  shortDescription: text('short_description').notNull(),
  capabilities: text('capabilities').notNull(), // JSON string
  deliverables: text('deliverables').notNull(), // JSON string
  techStack: text('tech_stack').notNull(), // JSON string
  businessOutcomes: text('business_outcomes').notNull(), // JSON string
  complianceStandards: text('compliance_standards').notNull(), // JSON string
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 18. Industries CMS
export const industriesCms = pgTable('industries_cms', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  headline: text('headline'),
  overview: text('overview').notNull(),
  challengesSolved: text('challenges_solved').notNull(), // JSON string
  architectures: text('architectures').notNull(), // JSON string
  representativeWork: text('representative_work').notNull(),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 19. Case Studies CMS
export const caseStudiesCms = pgTable('case_studies_cms', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  client: text('client').notNull(),
  industry: text('industry').notNull(),
  services: text('services').notNull(), // JSON string
  summary: text('summary').notNull(),
  challenge: text('challenge').notNull(),
  solution: text('solution').notNull(),
  results: text('results').notNull(), // JSON string
  metrics: text('metrics').notNull(), // JSON string
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 20. Blogs CMS
export const blogsCms = pgTable('blogs_cms', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  readingTime: text('reading_time').notNull(),
  badge: text('badge').notNull(),
  date: text('date').notNull(),
  authorName: text('author_name').notNull(),
  authorRole: text('author_role').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 21. System Settings
export const systemSettings = pgTable('system_settings', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  description: text('description'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 22. External Integrations
export const externalIntegrations = pgTable('external_integrations', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  type: text('type').notNull(), // 'oauth', 'email', 'storage', 'ai', 'database'
  status: text('status').notNull().default('NOT_CONFIGURED'), // 'CONFIGURED', 'NOT_CONFIGURED', 'ERROR'
  isEnabled: boolean('is_enabled').default(false),
  lastTestedAt: timestamp('last_tested_at'),
  details: text('details'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ one, many }) => ({
  candidateProfile: one(candidateProfiles, {
    fields: [users.id],
    references: [candidateProfiles.userId],
  }),
  documents: many(candidateDocuments),
  applications: many(applications),
  savedJobs: many(savedJobs),
  notifications: many(notifications),
}));

export const candidateProfilesRelations = relations(candidateProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [candidateProfiles.userId],
    references: [users.id],
  }),
  experiences: many(candidateExperiences),
  educations: many(candidateEducations),
}));

export const candidateExperiencesRelations = relations(candidateExperiences, ({ one }) => ({
  profile: one(candidateProfiles, {
    fields: [candidateExperiences.profileId],
    references: [candidateProfiles.id],
  }),
}));

export const candidateEducationsRelations = relations(candidateEducations, ({ one }) => ({
  profile: one(candidateProfiles, {
    fields: [candidateEducations.profileId],
    references: [candidateProfiles.id],
  }),
}));

export const jobsRelations = relations(jobs, ({ many }) => ({
  applications: many(applications),
  savedBy: many(savedJobs),
}));

export const applicationsRelations = relations(applications, ({ one, many }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  candidate: one(users, {
    fields: [applications.candidateId],
    references: [users.id],
  }),
  statusHistory: many(applicationStatusHistory),
  interviews: many(interviews),
}));

export const interviewsRelations = relations(interviews, ({ one, many }) => ({
  application: one(applications, {
    fields: [interviews.applicationId],
    references: [applications.id],
  }),
  feedbacks: many(interviewFeedbacks),
}));

export const leadsRelations = relations(leads, ({ many }) => ({
  notes: many(leadNotes),
  statusHistory: many(leadStatusHistory),
}));
