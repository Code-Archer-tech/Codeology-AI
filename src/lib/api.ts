import {
  User,
  Job,
  Application,
  SavedJob,
  Interview,
  InterviewFeedback,
  AppNotification,
  Lead,
  AuditLog,
  ServiceDetail,
  IndustryDetail,
  CaseStudy,
  BlogPost,
  CandidateProfile,
  ApplicationStatus,
} from '../types/index';

const DEFAULT_USER_ID = 'usr_candidate_1';

export function getActiveUserId(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('codeology_user_id') || DEFAULT_USER_ID;
  }
  return DEFAULT_USER_ID;
}

export function setActiveUserId(id: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('codeology_user_id', id);
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const currentUserId = getActiveUserId();
  const res = await fetch(url, {
    ...options,
    credentials: 'include', // Ensures session_id cookies are sent
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // CSRF defense header
      'x-user-id': currentUserId,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let errorMsg = `HTTP Error ${res.status}`;
    let errorCode: string | undefined;
    try {
      const errorData = await res.json();
      if (errorData?.error) {
        errorMsg = errorData.error;
      }
      if (errorData?.code) {
        errorCode = errorData.code;
      }
    } catch {
      // Non-json response, fallback to status
    }
    const err: any = new Error(errorMsg);
    err.status = res.status;
    err.code = errorCode;
    throw err;
  }

  return res.json();
}

export const api = {
  // Auth
  async getMe(): Promise<{ user: User | null; permissions?: string[]; isAuthenticated?: boolean }> {
    return request('/api/auth/me');
  },
  async login(
    email: string,
    password?: string,
    rememberMe?: boolean
  ): Promise<{ user: User; redirectUrl?: string; message?: string }> {
    const res = await request<{ user: User; redirectUrl?: string; message?: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, rememberMe }),
    });
    if (res.user?.id) {
      setActiveUserId(res.user.id);
    }
    return res;
  },
  async register(data: {
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    phone?: string;
    headline?: string;
  }): Promise<{ user: User; redirectUrl?: string; verificationEmailSent?: boolean; verificationPreview?: any }> {
    const res = await request<{ user: User; redirectUrl?: string; verificationEmailSent?: boolean; verificationPreview?: any }>(
      '/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    if (res.user?.id) {
      setActiveUserId(res.user.id);
    }
    return res;
  },
  async forgotPassword(email: string): Promise<{ success: boolean; message: string; devInfo?: any }> {
    return request('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  async resetPassword(token: string, password: string, confirmPassword: string): Promise<{ success: boolean; message: string }> {
    return request('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password, confirmPassword }),
    });
  },
  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    return request('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
  async getGoogleAuthStatus(): Promise<{ isConfigured: boolean; status: string; message: string; clientId: string | null }> {
    return request('/api/auth/google/status');
  },
  async getEmailProviderStatus(): Promise<{ provider: string; status: string; isAvailable: boolean }> {
    return request('/api/auth/email/status');
  },
  async switchPersona(userId: string): Promise<{ user: User; redirectUrl?: string }> {
    setActiveUserId(userId);
    return request('/api/auth/switch-role', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },
  async logout(): Promise<{ success: boolean }> {
    return request('/api/auth/logout', { method: 'POST' });
  },

  // Jobs
  async getJobs(params?: { search?: string; department?: string; type?: string; status?: string }): Promise<{ jobs: Job[] }> {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.department) query.set('department', params.department);
    if (params?.type) query.set('type', params.type);
    if (params?.status) query.set('status', params.status);
    return request(`/api/jobs?${query.toString()}`);
  },
  async getJob(slug: string): Promise<{ job: Job }> {
    return request(`/api/jobs/${slug}`);
  },
  async createJob(jobData: Partial<Job>): Promise<{ job: Job }> {
    return request('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },
  async updateJob(id: string, updates: Partial<Job>): Promise<{ job: Job }> {
    return request(`/api/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
  async toggleSaveJob(jobId: string): Promise<{ isSaved: boolean }> {
    return request(`/api/jobs/${jobId}/toggle-save`, { method: 'POST' });
  },
  async getSavedJobs(): Promise<{ savedJobs: SavedJob[]; jobs: Job[] }> {
    return request('/api/candidate/saved-jobs');
  },

  // Candidate Profile
  async getCandidateProfile(): Promise<{ profile: CandidateProfile }> {
    return request('/api/candidate/profile');
  },
  async updateCandidateProfile(profile: Partial<CandidateProfile>): Promise<{ profile: CandidateProfile }> {
    return request('/api/candidate/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  },
  async uploadResumeText(fileName: string, fileContent: string): Promise<{
    profile: CandidateProfile;
    aiAnalysis: {
      extractedSkills: string[];
      suggestedHeadline: string;
      professionalSummary: string;
      completenessFeedback: string[];
      recommendedImprovements: string[];
    };
  }> {
    return request('/api/candidate/resume-upload', {
      method: 'POST',
      body: JSON.stringify({ fileName, fileContent }),
    });
  },

  // Applications
  async getApplications(params?: { jobId?: string; status?: string }): Promise<{ applications: Application[] }> {
    const query = new URLSearchParams();
    if (params?.jobId) query.set('jobId', params.jobId);
    if (params?.status) query.set('status', params.status);
    return request(`/api/applications?${query.toString()}`);
  },
  async getApplication(id: string): Promise<{ application: Application }> {
    return request(`/api/applications/${id}`);
  },
  async applyForJob(data: {
    jobId: string;
    coverNote?: string;
    resumeFileName?: string;
    resumeText?: string;
  }): Promise<{ application: Application }> {
    return request('/api/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
    reason?: string
  ): Promise<{ application: Application }> {
    return request(`/api/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reason }),
    });
  },
  async addRecruiterNote(id: string, note: string): Promise<{ application: Application }> {
    return request(`/api/applications/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
  },

  // Interviews
  async getInterviews(): Promise<{ interviews: Interview[] }> {
    return request('/api/interviews');
  },
  async scheduleInterview(data: Partial<Interview>): Promise<{ interview: Interview }> {
    return request('/api/interviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async submitInterviewFeedback(
    interviewId: string,
    feedback: Partial<InterviewFeedback>
  ): Promise<{ feedback: InterviewFeedback }> {
    return request(`/api/interviews/${interviewId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  },
  async getInterviewFeedbacks(interviewId: string): Promise<{ feedbacks: InterviewFeedback[] }> {
    return request(`/api/interviews/${interviewId}/feedback`);
  },

  // Notifications
  async getNotifications(): Promise<{ notifications: AppNotification[] }> {
    return request('/api/notifications');
  },
  async markNotificationRead(id: string): Promise<{ success: boolean }> {
    return request(`/api/notifications/${id}/read`, { method: 'PATCH' });
  },
  async markAllNotificationsRead(): Promise<{ success: boolean }> {
    return request('/api/notifications/read-all', { method: 'POST' });
  },

  // CRM / Leads
  async getLeads(): Promise<{ leads: Lead[] }> {
    return request('/api/leads');
  },
  async submitLead(data: {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    companySize?: string;
    serviceInterest?: string;
    budgetRange?: string;
    message: string;
  }): Promise<{ success: boolean; lead: Lead }> {
    return request('/api/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateLeadStage(id: string, stage: Lead['stage'], followUpDate?: string): Promise<{ lead: Lead }> {
    return request(`/api/leads/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ stage, followUpDate }),
    });
  },
  async updateLeadStatus(id: string, status: Lead['stage'], note?: string): Promise<{ lead: Lead }> {
    return request(`/api/leads/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ stage: status, note }),
    });
  },
  async addLeadNote(id: string, content: string): Promise<{ lead: Lead }> {
    return request(`/api/leads/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },

  // AI Assistance
  async analyzeResumeWithAi(resumeText: string): Promise<{ result: any }> {
    return request('/api/ai/resume-assistant', {
      method: 'POST',
      body: JSON.stringify({ resumeText }),
    });
  },
  async matchCandidateWithAi(
    jobDescription: string,
    candidateText: string,
    skills: string[]
  ): Promise<{ result: any }> {
    return request('/api/ai/candidate-match', {
      method: 'POST',
      body: JSON.stringify({ jobDescription, candidateText, skills }),
    });
  },

  // Admin Reports & Audits
  async getAuditLogs(): Promise<{ logs: AuditLog[] }> {
    return request('/api/admin/audit-logs');
  },
  async getAdminUsers(): Promise<{ users: User[] }> {
    return request('/api/admin/users');
  },
  async getAdminReports(): Promise<any> {
    return request('/api/admin/reports');
  },

  // CMS Content
  async getServices(): Promise<{ services: ServiceDetail[] }> {
    return request('/api/cms/services');
  },
  async getService(slug: string): Promise<{ service: ServiceDetail }> {
    return request(`/api/cms/services/${slug}`);
  },
  async getIndustries(): Promise<{ industries: IndustryDetail[] }> {
    return request('/api/cms/industries');
  },
  async getCaseStudies(): Promise<{ caseStudies: CaseStudy[] }> {
    return request('/api/cms/case-studies');
  },
  async getCaseStudy(slug: string): Promise<{ caseStudy: CaseStudy }> {
    return request(`/api/cms/case-studies/${slug}`);
  },
  async getBlogs(): Promise<{ blogs: BlogPost[] }> {
    return request('/api/cms/blogs');
  },
  async getBlog(slug: string): Promise<{ blog: BlogPost }> {
    return request(`/api/cms/blogs/${slug}`);
  },
};
