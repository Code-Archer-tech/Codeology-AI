export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'hr_manager'
  | 'recruiter'
  | 'hiring_manager'
  | 'candidate';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  title?: string;
  department?: string;
  createdAt: string;
}

export interface CandidateExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface CandidateEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  gpa?: string;
}

export interface CandidateSkill {
  id: string;
  name: string;
  category: 'Cloud' | 'DevOps' | 'Security' | 'Engineering' | 'Data' | 'Management';
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years: number;
}

export interface CandidateProfile {
  id: string;
  userId: string;
  headline: string;
  summary: string;
  location: string;
  phone: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  yearsOfExperience: number;
  highestEducation: string;
  expectedSalary: string;
  noticePeriod: string;
  availabilityStatus: 'Actively Looking' | 'Open to Offers' | 'Employed';
  resumeFileName?: string;
  resumeUrl?: string;
  resumeText?: string;
  skills: string[];
  experiences: CandidateExperience[];
  education: CandidateEducation[];
  completenessScore: number;
  updatedAt: string;
}

export type JobType = 'Full-time' | 'Contract' | 'Remote' | 'Hybrid' | 'On-site';
export type JobDepartment =
  | 'Cloud Infrastructure'
  | 'Cybersecurity'
  | 'Software Engineering'
  | 'Data & AI'
  | 'Managed Services'
  | 'Technical Recruitment'
  | 'Product & UX';

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: JobDepartment;
  location: string;
  type: JobType;
  workplaceType?: string;
  salaryRange?: string;
  experienceLevel: 'Entry-Level' | 'Mid-Senior' | 'Senior' | 'Lead / Architect' | 'Executive';
  salaryMin: number;
  salaryMax: number;
  currency: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  status: 'published' | 'draft' | 'closed';
  recruiterId: string;
  recruiterName: string;
  hiringManagerName: string;
  viewsCount: number;
  applicantsCount: number;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus =
  | 'Applied'
  | 'Under Review'
  | 'Shortlisted'
  | 'Assessment'
  | 'Interview'
  | 'Final Review'
  | 'Offer'
  | 'Hired'
  | 'Rejected';

export interface ApplicationStatusHistoryItem {
  id: string;
  fromStatus?: ApplicationStatus;
  toStatus: ApplicationStatus;
  changedBy: string;
  reason?: string;
  timestamp: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  jobDepartment: string;
  jobLocation: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateLocation?: string;
  status: ApplicationStatus;
  coverNote?: string;
  resumeFileName?: string;
  resumeUrl?: string;
  resumeText?: string;
  aiMatchScore?: number;
  aiMatchRationale?: string;
  aiKeyStrengths?: string[];
  aiIdentifiedGaps?: string[];
  statusHistory: ApplicationStatusHistoryItem[];
  recruiterNotes?: string[];
  appliedAt: string;
  updatedAt: string;
}

export interface SavedJob {
  id: string;
  candidateId: string;
  jobId: string;
  savedAt: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  interviewerName: string;
  interviewerEmail: string;
  scheduledAt: string;
  durationMinutes: number;
  mode: 'Video' | 'In-Person' | 'Phone';
  meetingLink?: string;
  location?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  interviewerId: string;
  interviewerName: string;
  technicalRating: number; // 1 to 5
  communicationRating: number; // 1 to 5
  problemSolvingRating: number; // 1 to 5
  culturalFitRating: number; // 1 to 5
  overallRecommendation: 'Strong Yes' | 'Yes' | 'Neutral' | 'No' | 'Strong No';
  strengths: string;
  areasOfConcern: string;
  detailedComments: string;
  submittedAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'interview';
  read: boolean;
  link?: string;
  createdAt: string;
}

export type LeadStage =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export type LeadStatus = LeadStage;

export interface LeadNote {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company: string;
  companySize?: string;
  serviceInterest: string;
  budgetRange?: string;
  message: string;
  stage: LeadStage;
  assignedToName: string;
  followUpDate?: string;
  notes: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  action: string;
  entityType: 'Job' | 'Application' | 'Candidate' | 'Lead' | 'Interview' | 'CMS' | 'Auth';
  entityId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  heroHeadline: string;
  tagline: string;
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  techStack: string[];
  businessOutcomes: { metric: string; label: string; detail: string }[];
  complianceStandards: string[];
}

export interface IndustryDetail {
  slug: string;
  name: string;
  headline: string;
  overview: string;
  challengesSolved: string[];
  architectures: string[];
  representativeWork: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  clientIndustry: string;
  clientType: string;
  title: string;
  summary: string;
  problemStatement: string;
  architecturalSolution: string;
  keyOutcomes: { value: string; label: string }[];
  technologiesUsed: string[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Cloud Engineering' | 'Cybersecurity' | 'Talent & Hiring' | 'Digital Strategy';
  authorName: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  summary: string;
  content: string;
  tags: string[];
}
