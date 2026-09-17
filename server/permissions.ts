// RBAC Permissions and Role Mappings for Codeology AI

export type Role =
  | 'super_admin'
  | 'admin'
  | 'hr_manager'
  | 'recruiter'
  | 'hiring_manager'
  | 'candidate';

export const ALL_ROLES: Role[] = [
  'super_admin',
  'admin',
  'hr_manager',
  'recruiter',
  'hiring_manager',
  'candidate',
];

export enum Permission {
  // Users & Staff
  USER_READ = 'USER_READ',
  USER_CREATE = 'USER_CREATE',
  USER_UPDATE = 'USER_UPDATE',
  USER_DISABLE = 'USER_DISABLE',
  USER_ROLE_ASSIGN = 'USER_ROLE_ASSIGN',

  // Jobs
  JOB_READ = 'JOB_READ',
  JOB_CREATE = 'JOB_CREATE',
  JOB_UPDATE = 'JOB_UPDATE',
  JOB_DELETE = 'JOB_DELETE',
  JOB_PUBLISH = 'JOB_PUBLISH',
  JOB_ARCHIVE = 'JOB_ARCHIVE',

  // Candidates & Profiles
  CANDIDATE_READ = 'CANDIDATE_READ',
  CANDIDATE_UPDATE = 'CANDIDATE_UPDATE',
  CANDIDATE_DOCUMENT_READ = 'CANDIDATE_DOCUMENT_READ',

  // Applications
  APPLICATION_READ = 'APPLICATION_READ',
  APPLICATION_UPDATE = 'APPLICATION_UPDATE',
  APPLICATION_STATUS_CHANGE = 'APPLICATION_STATUS_CHANGE',
  APPLICATION_NOTE_ADD = 'APPLICATION_NOTE_ADD',

  // Interviews
  INTERVIEW_READ = 'INTERVIEW_READ',
  INTERVIEW_CREATE = 'INTERVIEW_CREATE',
  INTERVIEW_UPDATE = 'INTERVIEW_UPDATE',
  INTERVIEW_CANCEL = 'INTERVIEW_CANCEL',
  INTERVIEW_FEEDBACK_CREATE = 'INTERVIEW_FEEDBACK_CREATE',
  INTERVIEW_FEEDBACK_SUBMIT = 'INTERVIEW_FEEDBACK_SUBMIT',

  // Analytics & Intelligence
  ANALYTICS_READ = 'ANALYTICS_READ',

  // CMS Content
  BLOG_READ = 'BLOG_READ',
  BLOG_CREATE = 'BLOG_CREATE',
  BLOG_UPDATE = 'BLOG_UPDATE',
  BLOG_PUBLISH = 'BLOG_PUBLISH',
  BLOG_DELETE = 'BLOG_DELETE',

  CASE_STUDY_READ = 'CASE_STUDY_READ',
  CASE_STUDY_CREATE = 'CASE_STUDY_CREATE',
  CASE_STUDY_UPDATE = 'CASE_STUDY_UPDATE',
  CASE_STUDY_PUBLISH = 'CASE_STUDY_PUBLISH',

  // Leads & CRM
  LEAD_READ = 'LEAD_READ',
  LEAD_CREATE = 'LEAD_CREATE',
  LEAD_UPDATE = 'LEAD_UPDATE',
  LEAD_ASSIGN = 'LEAD_ASSIGN',

  // System & Compliance
  SYSTEM_SETTINGS_READ = 'SYSTEM_SETTINGS_READ',
  SYSTEM_SETTINGS_UPDATE = 'SYSTEM_SETTINGS_UPDATE',
  AUDIT_LOG_READ = 'AUDIT_LOG_READ',
}

// Granular Role to Permission Mapping
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    // Full system administration without restrictions
    Permission.USER_READ,
    Permission.USER_CREATE,
    Permission.USER_UPDATE,
    Permission.USER_DISABLE,
    Permission.USER_ROLE_ASSIGN,
    Permission.JOB_READ,
    Permission.JOB_CREATE,
    Permission.JOB_UPDATE,
    Permission.JOB_DELETE,
    Permission.JOB_PUBLISH,
    Permission.JOB_ARCHIVE,
    Permission.CANDIDATE_READ,
    Permission.CANDIDATE_UPDATE,
    Permission.CANDIDATE_DOCUMENT_READ,
    Permission.APPLICATION_READ,
    Permission.APPLICATION_UPDATE,
    Permission.APPLICATION_STATUS_CHANGE,
    Permission.APPLICATION_NOTE_ADD,
    Permission.INTERVIEW_READ,
    Permission.INTERVIEW_CREATE,
    Permission.INTERVIEW_UPDATE,
    Permission.INTERVIEW_CANCEL,
    Permission.INTERVIEW_FEEDBACK_CREATE,
    Permission.INTERVIEW_FEEDBACK_SUBMIT,
    Permission.ANALYTICS_READ,
    Permission.BLOG_READ,
    Permission.BLOG_CREATE,
    Permission.BLOG_UPDATE,
    Permission.BLOG_PUBLISH,
    Permission.BLOG_DELETE,
    Permission.CASE_STUDY_READ,
    Permission.CASE_STUDY_CREATE,
    Permission.CASE_STUDY_UPDATE,
    Permission.CASE_STUDY_PUBLISH,
    Permission.LEAD_READ,
    Permission.LEAD_CREATE,
    Permission.LEAD_UPDATE,
    Permission.LEAD_ASSIGN,
    Permission.SYSTEM_SETTINGS_READ,
    Permission.SYSTEM_SETTINGS_UPDATE,
    Permission.AUDIT_LOG_READ,
  ],

  admin: [
    // Standard platform administration (cannot grant super_admin or alter core secrets)
    Permission.USER_READ,
    Permission.USER_CREATE,
    Permission.USER_UPDATE,
    Permission.USER_DISABLE,
    Permission.USER_ROLE_ASSIGN,
    Permission.JOB_READ,
    Permission.JOB_CREATE,
    Permission.JOB_UPDATE,
    Permission.JOB_PUBLISH,
    Permission.JOB_ARCHIVE,
    Permission.CANDIDATE_READ,
    Permission.CANDIDATE_UPDATE,
    Permission.CANDIDATE_DOCUMENT_READ,
    Permission.APPLICATION_READ,
    Permission.APPLICATION_UPDATE,
    Permission.APPLICATION_STATUS_CHANGE,
    Permission.APPLICATION_NOTE_ADD,
    Permission.INTERVIEW_READ,
    Permission.INTERVIEW_CREATE,
    Permission.INTERVIEW_UPDATE,
    Permission.INTERVIEW_FEEDBACK_CREATE,
    Permission.INTERVIEW_FEEDBACK_SUBMIT,
    Permission.ANALYTICS_READ,
    Permission.BLOG_READ,
    Permission.BLOG_CREATE,
    Permission.BLOG_UPDATE,
    Permission.BLOG_PUBLISH,
    Permission.CASE_STUDY_READ,
    Permission.CASE_STUDY_CREATE,
    Permission.CASE_STUDY_UPDATE,
    Permission.CASE_STUDY_PUBLISH,
    Permission.LEAD_READ,
    Permission.LEAD_CREATE,
    Permission.LEAD_UPDATE,
    Permission.LEAD_ASSIGN,
    Permission.SYSTEM_SETTINGS_READ,
    Permission.AUDIT_LOG_READ,
  ],

  hr_manager: [
    // Human resources & talent operations
    Permission.USER_READ,
    Permission.JOB_READ,
    Permission.JOB_CREATE,
    Permission.JOB_UPDATE,
    Permission.JOB_PUBLISH,
    Permission.JOB_ARCHIVE,
    Permission.CANDIDATE_READ,
    Permission.CANDIDATE_UPDATE,
    Permission.CANDIDATE_DOCUMENT_READ,
    Permission.APPLICATION_READ,
    Permission.APPLICATION_UPDATE,
    Permission.APPLICATION_STATUS_CHANGE,
    Permission.APPLICATION_NOTE_ADD,
    Permission.INTERVIEW_READ,
    Permission.INTERVIEW_CREATE,
    Permission.INTERVIEW_UPDATE,
    Permission.INTERVIEW_CANCEL,
    Permission.INTERVIEW_FEEDBACK_CREATE,
    Permission.INTERVIEW_FEEDBACK_SUBMIT,
    Permission.ANALYTICS_READ,
    Permission.LEAD_READ,
    Permission.AUDIT_LOG_READ,
  ],

  recruiter: [
    // Active talent acquisition pipeline
    Permission.JOB_READ,
    Permission.JOB_CREATE,
    Permission.JOB_UPDATE,
    Permission.JOB_PUBLISH,
    Permission.CANDIDATE_READ,
    Permission.CANDIDATE_UPDATE,
    Permission.CANDIDATE_DOCUMENT_READ,
    Permission.APPLICATION_READ,
    Permission.APPLICATION_UPDATE,
    Permission.APPLICATION_STATUS_CHANGE,
    Permission.APPLICATION_NOTE_ADD,
    Permission.INTERVIEW_READ,
    Permission.INTERVIEW_CREATE,
    Permission.INTERVIEW_UPDATE,
    Permission.INTERVIEW_FEEDBACK_CREATE,
    Permission.INTERVIEW_FEEDBACK_SUBMIT,
    Permission.ANALYTICS_READ,
    Permission.LEAD_READ,
  ],

  hiring_manager: [
    // Department hiring manager workflows & interview feedback
    Permission.JOB_READ,
    Permission.CANDIDATE_READ,
    Permission.CANDIDATE_DOCUMENT_READ,
    Permission.APPLICATION_READ,
    Permission.INTERVIEW_READ,
    Permission.INTERVIEW_FEEDBACK_CREATE,
    Permission.INTERVIEW_FEEDBACK_SUBMIT,
  ],

  candidate: [
    // Candidate self-service
    Permission.JOB_READ,
    Permission.BLOG_READ,
    Permission.CASE_STUDY_READ,
    Permission.LEAD_CREATE,
  ],
};

export function hasPermission(role: string, permission: Permission): boolean {
  const normalizedRole = (role || '').toLowerCase() as Role;
  const permissions = ROLE_PERMISSIONS[normalizedRole];
  if (!permissions) return false;
  return permissions.includes(permission);
}

export function hasAllPermissions(role: string, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

export function hasAnyPermission(role: string, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}
