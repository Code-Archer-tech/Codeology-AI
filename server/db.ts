import fs from 'fs';
import path from 'path';
import {
  User,
  CandidateProfile,
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
  ApplicationStatus,
} from '../src/types/index';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

export interface DatabaseSchema {
  users: User[];
  candidateProfiles: CandidateProfile[];
  jobs: Job[];
  applications: Application[];
  savedJobs: SavedJob[];
  interviews: Interview[];
  interviewFeedbacks: InterviewFeedback[];
  notifications: AppNotification[];
  leads: Lead[];
  auditLogs: AuditLog[];
  services: ServiceDetail[];
  industries: IndustryDetail[];
  caseStudies: CaseStudy[];
  blogs: BlogPost[];
}

// Initial seed data with authentic enterprise assets
const INITIAL_DATA: DatabaseSchema = {
  users: [
    {
      id: 'usr_candidate_1',
      email: 'candidate@codeologyai.com',
      name: 'Elena Rostova',
      role: 'candidate',
      title: 'Senior Cloud Infrastructure Engineer',
      phone: '+1 (415) 890-4122',
      createdAt: '2026-02-10T09:00:00.000Z',
    },
    {
      id: 'usr_candidate_2',
      email: 'alex.chen@example.com',
      name: 'Alex Chen',
      role: 'candidate',
      title: 'Staff Security Engineer',
      phone: '+1 (206) 555-0182',
      createdAt: '2026-03-01T10:30:00.000Z',
    },
    {
      id: 'usr_recruiter_1',
      email: 'recruiter@codeologyai.com',
      name: 'Marcus Vance',
      role: 'recruiter',
      title: 'Principal Technical Recruiter',
      department: 'Technical Recruitment',
      phone: '+1 (415) 890-4100',
      createdAt: '2025-11-15T08:00:00.000Z',
    },
    {
      id: 'usr_hr_1',
      email: 'hr@codeologyai.com',
      name: 'Sarah Jenkins',
      role: 'hr_manager',
      title: 'VP of People & Talent',
      department: 'Human Resources',
      phone: '+1 (415) 890-4105',
      createdAt: '2025-10-01T08:00:00.000Z',
    },
    {
      id: 'usr_admin_1',
      email: 'admin@codeologyai.com',
      name: 'David Sterling',
      role: 'super_admin',
      title: 'Chief Technology Officer',
      department: 'Executive Leadership',
      phone: '+1 (415) 890-4001',
      createdAt: '2025-01-01T08:00:00.000Z',
    },
  ],
  candidateProfiles: [
    {
      id: 'prof_elena_1',
      userId: 'usr_candidate_1',
      headline: 'Senior Cloud Architect & SRE | AWS Certified Solutions Architect Professional | K8s & Terraform',
      summary: 'Cloud Infrastructure and DevOps engineer with 8+ years building zero-downtime distributed systems across AWS and hybrid on-prem datacenters. Passionate about automated IaC, GitOps, and platform observability.',
      location: 'San Francisco, CA (Open to Remote / Hybrid)',
      phone: '+1 (415) 890-4122',
      linkedinUrl: 'https://linkedin.com/in/elena-rostova-cloud',
      githubUrl: 'https://github.com/erostova-infra',
      portfolioUrl: 'https://rostova.dev',
      yearsOfExperience: 8,
      highestEducation: "Master of Science in Computer Engineering",
      expectedSalary: '$185,000 - $210,000',
      noticePeriod: '2 Weeks',
      availabilityStatus: 'Actively Looking',
      resumeFileName: 'Elena_Rostova_Cloud_Architect_Resume.pdf',
      resumeText: 'Elena Rostova - Cloud Infrastructure Architect. 8+ years experience in multi-cloud architecture, AWS ECS/EKS, Terraform Enterprise, ArgoCD GitOps, Prometheus & Datadog observability, SOC 2 compliance. Led infrastructure modernization for high-throughput FinTech payment APIs.',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Go', 'Python', 'CI/CD Pipelines', 'Prometheus', 'Zero Trust Architecture'],
      experiences: [
        {
          id: 'exp_1',
          company: 'Aether Cloud Systems',
          title: 'Senior Site Reliability Engineer',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          current: true,
          description: 'Architected multi-region Kubernetes clusters handling 45,000 requests/sec. Reduced compute spend by 28% through Karpenter dynamic auto-scaling and spot instance optimization.',
        },
        {
          id: 'exp_2',
          company: 'FinVanguard Technologies',
          title: 'Cloud DevOps Engineer',
          location: 'San Jose, CA',
          startDate: '2019-06',
          endDate: '2022-02',
          current: false,
          description: 'Migrated 40+ legacy on-premises microservices to AWS EKS with zero customer-facing downtime. Standardized Terraform IaC modules company-wide.',
        }
      ],
      education: [
        {
          id: 'edu_1',
          institution: 'University of California, Berkeley',
          degree: 'Master of Science',
          fieldOfStudy: 'Computer Engineering',
          startYear: '2017',
          endYear: '2019',
          gpa: '3.91',
        },
        {
          id: 'edu_2',
          institution: 'San Jose State University',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Software Engineering',
          startYear: '2013',
          endYear: '2017',
        }
      ],
      completenessScore: 92,
      updatedAt: '2026-03-10T14:30:00.000Z',
    },
  ],
  jobs: [
    {
      id: 'job_cloud_arch_01',
      slug: 'lead-cloud-infrastructure-architect',
      title: 'Lead Cloud Infrastructure Architect',
      department: 'Cloud Infrastructure',
      location: 'San Francisco, CA / Remote (US)',
      type: 'Full-time',
      experienceLevel: 'Lead / Architect',
      salaryMin: 190000,
      salaryMax: 235000,
      currency: 'USD',
      summary: 'Lead the architecture and delivery of mission-critical multi-cloud infrastructure environments for Fortune 500 enterprise clients.',
      description: 'Codeology AI is seeking a seasoned Lead Cloud Infrastructure Architect to spearhead complex enterprise cloud migrations, multi-region Kubernetes orchestration, and immutable infrastructure automation.',
      responsibilities: [
        'Design and deploy resilient, high-availability AWS and hybrid cloud architectures adhering to Well-Architected Framework guidelines.',
        'Author enterprise-grade Terraform modules and GitOps delivery pipelines using ArgoCD.',
        'Partner with client VP of Infrastructure and CISO teams to guarantee strict SOC 2, HIPAA, and ISO 27001 regulatory compliance.',
        'Mentor mid-level DevOps engineers and establish engineering quality standards for client engagements.',
      ],
      requirements: [
        '8+ years of hands-on infrastructure engineering with at least 4 years in a technical leadership or architect capacity.',
        'AWS Certified Solutions Architect Professional or equivalent industry recognition.',
        'Deep mastery of Kubernetes cluster management, container networking (Calico/Cilium), and service mesh (Istio).',
        'Proven track record architecting zero-downtime database migrations (PostgreSQL, Aurora, CockroachDB).',
      ],
      benefits: [
        'Comprehensive premium health, dental, and vision insurance with 100% company-paid premiums.',
        '401(k) retirement plan with immediate 5% company match.',
        'Generous home office stipend and state-of-the-art Apple M3 Max hardware allowance.',
        '$4,000 annual continuing education and cloud certification reimbursement budget.',
      ],
      skills: ['AWS', 'Kubernetes', 'Terraform', 'GitOps', 'Zero Trust', 'Golang', 'Linux Internals'],
      status: 'published',
      recruiterId: 'usr_recruiter_1',
      recruiterName: 'Marcus Vance',
      hiringManagerName: 'David Sterling (CTO)',
      viewsCount: 384,
      applicantsCount: 19,
      createdAt: '2026-02-01T10:00:00.000Z',
      updatedAt: '2026-03-01T10:00:00.000Z',
    },
    {
      id: 'job_sec_ops_02',
      slug: 'principal-cybersecurity-soc-engineer',
      title: 'Principal Cybersecurity & SOC Operations Engineer',
      department: 'Cybersecurity',
      location: 'New York, NY / Hybrid',
      type: 'Full-time',
      experienceLevel: 'Senior',
      salaryMin: 180000,
      salaryMax: 220000,
      currency: 'USD',
      summary: 'Drive 24/7 proactive threat hunting, incident response, and Zero Trust security posture across distributed enterprise environments.',
      description: 'As a Principal Cybersecurity Engineer at Codeology AI, you will guide managed security operations, deploy advanced SIEM/SOAR platforms, and defend critical client infrastructure against emerging threat vectors.',
      responsibilities: [
        'Architect and operationalize next-generation SIEM/XDR platforms (Sentinel, CrowdStrike Falcon, Splunk).',
        'Lead high-severity incident triage, root cause forensic analysis, and containment protocols.',
        'Automate security remediation workflows via Python and SOAR playbooks.',
        'Conduct architectural threat modeling and recurring penetration testing exercises.',
      ],
      requirements: [
        '6+ years in corporate cybersecurity, incident response, or defensive SOC environments.',
        'Hold industry credentials such as CISSP, CISM, or GIAC (GCIA, GCIH).',
        'Extensive knowledge of MITRE ATT&CK framework, network packet analysis, and endpoint forensics.',
        'Demonstrated experience hardening public cloud IAM, VPC peering, and KMS infrastructure.',
      ],
      benefits: [
        'Full medical coverage including mental health and wellness subsidies.',
        'Flexible hybrid work policy (2 days office, 3 days remote).',
        'Performance-based annual executive bonus pool.',
        'Sponsored attendance at Black Hat, DEF CON, and RSA conferences.',
      ],
      skills: ['Cybersecurity', 'Zero Trust', 'CrowdStrike', 'SIEM', 'Incident Response', 'Python', 'SOC 2'],
      status: 'published',
      recruiterId: 'usr_recruiter_1',
      recruiterName: 'Marcus Vance',
      hiringManagerName: 'Arthur Bradley (Director of InfoSec)',
      viewsCount: 295,
      applicantsCount: 12,
      createdAt: '2026-02-12T11:30:00.000Z',
      updatedAt: '2026-03-05T14:00:00.000Z',
    },
    {
      id: 'job_fullstack_03',
      slug: 'staff-software-engineer-enterprise-platforms',
      title: 'Staff Software Engineer – Enterprise Platforms',
      department: 'Software Engineering',
      location: 'Austin, TX / Remote (US & Canada)',
      type: 'Full-time',
      experienceLevel: 'Senior',
      salaryMin: 175000,
      salaryMax: 215000,
      currency: 'USD',
      summary: 'Build resilient distributed systems, enterprise APIs, and high-throughput microservices for modern enterprise workflows.',
      description: 'Join our Software Engineering Practice to build custom transactional software, real-time analytics pipelines, and secure API gateways for premier commercial clients.',
      responsibilities: [
        'Design, build, and maintain mission-critical backend services in Node.js/TypeScript and Go.',
        'Develop responsive, accessible design system interfaces using React and modern CSS architectures.',
        'Implement resilient distributed event streaming with Apache Kafka and RabbitMQ.',
        'Champion automated testing, high test coverage, and strict code review standards.',
      ],
      requirements: [
        '7+ years developing web applications and distributed architectures.',
        'Deep fluency in TypeScript, React, Node.js, and SQL (PostgreSQL schema design & optimization).',
        'Familiarity with event-driven architectures, caching strategies (Redis), and message queues.',
        'Commitment to writing readable, maintainable, and thoroughly tested software.',
      ],
      benefits: [
        'Remote-first culture with asynchronous communication philosophy.',
        'Unlimited Paid Time Off with mandatory minimum 3-week annual leave.',
        'Annual technology home refresh budget.',
      ],
      skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Kafka', 'Redis', 'GraphQL'],
      status: 'published',
      recruiterId: 'usr_recruiter_1',
      recruiterName: 'Marcus Vance',
      hiringManagerName: 'Elena Vane (Head of Engineering)',
      viewsCount: 420,
      applicantsCount: 28,
      createdAt: '2026-02-15T09:00:00.000Z',
      updatedAt: '2026-03-08T16:00:00.000Z',
    },
    {
      id: 'job_recruiter_04',
      slug: 'senior-technical-recruiter-global-talent',
      title: 'Senior Technical Recruiter – Global Talent Delivery',
      department: 'Technical Recruitment',
      location: 'Chicago, IL / Remote',
      type: 'Full-time',
      experienceLevel: 'Mid-Senior',
      salaryMin: 120000,
      salaryMax: 155000,
      currency: 'USD',
      summary: 'Partner with enterprise hiring managers to source, assess, and place elite technical talent across infrastructure, security, and engineering.',
      description: 'Codeology AI’s Global Recruitment Practice provides high-touch RPO and technical staffing for high-growth tech companies and enterprise digital transformation programs.',
      responsibilities: [
        'Manage full-lifecycle recruitment across diverse engineering disciplines from sourcing to closing.',
        'Build and maintain proactive talent pipelines for niche skill sets (DevOps, SRE, Cybersecurity).',
        'Facilitate structured interview feedback sessions with hiring managers to eliminate hiring bias.',
        'Deliver exceptional, transparent candidate experiences throughout the recruitment journey.',
      ],
      requirements: [
        '4+ years technical recruiting experience in agency or fast-paced corporate environments.',
        'Proven capability to assess software engineering, cloud, and cybersecurity profiles accurately.',
        'Strong knowledge of modern ATS workflows, sourcing tools, and compensation benchmarking.',
      ],
      benefits: [
        'Competitive base salary plus performance incentive commission structure.',
        'Comprehensive health insurance and 401(k) matching.',
        'Flexible schedule and remote work capability.',
      ],
      skills: ['Technical Sourcing', 'Candidate Assessment', 'RPO Operations', 'Pipeline Management', 'Offer Negotiation'],
      status: 'published',
      recruiterId: 'usr_recruiter_1',
      recruiterName: 'Marcus Vance',
      hiringManagerName: 'Sarah Jenkins (VP of People)',
      viewsCount: 210,
      applicantsCount: 14,
      createdAt: '2026-02-20T10:00:00.000Z',
      updatedAt: '2026-03-02T11:00:00.000Z',
    },
    {
      id: 'job_devops_05',
      slug: 'devops-continuous-delivery-specialist',
      title: 'DevOps & Continuous Delivery Specialist',
      department: 'Cloud Infrastructure',
      location: 'Seattle, WA / Remote',
      type: 'Full-time',
      experienceLevel: 'Mid-Senior',
      salaryMin: 145000,
      salaryMax: 180000,
      currency: 'USD',
      summary: 'Standardize enterprise deployment pipelines, optimize build times, and accelerate engineering velocity.',
      description: 'Collaborate directly with cross-functional engineering teams to build automated test/build/deploy pipelines, container image scanning, and release governance.',
      responsibilities: [
        'Maintain and improve GitHub Actions and GitLab CI enterprise runners.',
        'Automate container vulnerability scanning and SBOM generation.',
        'Implement automated canary releases and rollback strategies with Flagger and Linkerd.',
      ],
      requirements: [
        '4+ years configuring CI/CD pipelines, Docker images, and Linux systems.',
        'Hands-on experience with Helm, Terraform, and shell scripting.',
      ],
      benefits: ['Health, dental, vision', '401k match', 'Annual learning stipend'],
      skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Bash', 'Prometheus'],
      status: 'published',
      recruiterId: 'usr_recruiter_1',
      recruiterName: 'Marcus Vance',
      hiringManagerName: 'David Sterling',
      viewsCount: 175,
      applicantsCount: 9,
      createdAt: '2026-03-01T12:00:00.000Z',
      updatedAt: '2026-03-09T10:00:00.000Z',
    },
  ],
  applications: [
    {
      id: 'app_001',
      jobId: 'job_cloud_arch_01',
      jobTitle: 'Lead Cloud Infrastructure Architect',
      jobDepartment: 'Cloud Infrastructure',
      jobLocation: 'San Francisco, CA / Remote (US)',
      candidateId: 'usr_candidate_1',
      candidateName: 'Elena Rostova',
      candidateEmail: 'candidate@codeologyai.com',
      candidatePhone: '+1 (415) 890-4122',
      candidateLocation: 'San Francisco, CA',
      status: 'Interview',
      coverNote: 'I have spent the past 8 years architecting resilient AWS infrastructure and leading GitOps modernization. Codeology AI’s focus on enterprise reliability directly aligns with my production experience.',
      resumeFileName: 'Elena_Rostova_Cloud_Architect_Resume.pdf',
      aiMatchScore: 94,
      aiMatchRationale: 'Exceptional architectural alignment. Elena possesses 8+ years of production experience in multi-cloud and Kubernetes. Matches 100% of required skills (AWS, K8s, Terraform, GitOps) with demonstrated cost-optimization results.',
      aiKeyStrengths: [
        'Deep hands-on AWS EKS and Kubernetes orchestration at 45k req/sec scale',
        'Proven Karpenter & spot instance cost optimization (28% spend reduction)',
        'Demonstrated leadership in zero-downtime microservice migrations',
      ],
      aiIdentifiedGaps: [
        'No direct mention of Istio service mesh in recent role, though Calico networking is verified.',
      ],
      statusHistory: [
        {
          id: 'hist_1',
          toStatus: 'Applied',
          changedBy: 'Candidate (Self-Applied)',
          timestamp: '2026-02-15T11:00:00.000Z',
        },
        {
          id: 'hist_2',
          fromStatus: 'Applied',
          toStatus: 'Under Review',
          changedBy: 'Marcus Vance (Recruiter)',
          reason: 'Initial profile review confirmed strong AWS background',
          timestamp: '2026-02-16T09:30:00.000Z',
        },
        {
          id: 'hist_3',
          fromStatus: 'Under Review',
          toStatus: 'Shortlisted',
          changedBy: 'Marcus Vance (Recruiter)',
          reason: 'Passed recruiter phone screen. AI match score 94%.',
          timestamp: '2026-02-18T14:15:00.000Z',
        },
        {
          id: 'hist_4',
          fromStatus: 'Shortlisted',
          toStatus: 'Interview',
          changedBy: 'David Sterling (Hiring Manager)',
          reason: 'Invited to Technical Architecture deep dive',
          timestamp: '2026-02-22T10:00:00.000Z',
        },
      ],
      recruiterNotes: [
        'Strong communicator. Articulated trade-offs between Karpenter vs Cluster Autoscaler cleanly.',
        'High salary alignment. Target is $195k base which fits our $190k-$235k band comfortably.',
      ],
      appliedAt: '2026-02-15T11:00:00.000Z',
      updatedAt: '2026-02-22T10:00:00.000Z',
    },
    {
      id: 'app_002',
      jobId: 'job_sec_ops_02',
      jobTitle: 'Principal Cybersecurity & SOC Operations Engineer',
      jobDepartment: 'Cybersecurity',
      jobLocation: 'New York, NY / Hybrid',
      candidateId: 'usr_candidate_2',
      candidateName: 'Alex Chen',
      candidateEmail: 'alex.chen@example.com',
      candidatePhone: '+1 (206) 555-0182',
      candidateLocation: 'Seattle, WA',
      status: 'Under Review',
      coverNote: '6+ years in high-intensity SOC environments defending healthcare and banking telemetry.',
      aiMatchScore: 88,
      aiMatchRationale: 'Strong candidate with CISSP and Splunk/CrowdStrike certifications. Extensive incident response history.',
      aiKeyStrengths: ['CISSP certified', 'Deep forensic packet inspection', 'Python automation'],
      aiIdentifiedGaps: ['Prefers remote, requisition has hybrid requirement.'],
      statusHistory: [
        {
          id: 'hist_201',
          toStatus: 'Applied',
          changedBy: 'Candidate (Self-Applied)',
          timestamp: '2026-03-02T10:00:00.000Z',
        },
        {
          id: 'hist_202',
          fromStatus: 'Applied',
          toStatus: 'Under Review',
          changedBy: 'Marcus Vance (Recruiter)',
          timestamp: '2026-03-03T15:00:00.000Z',
        }
      ],
      appliedAt: '2026-03-02T10:00:00.000Z',
      updatedAt: '2026-03-03T15:00:00.000Z',
    }
  ],
  savedJobs: [
    {
      id: 'saved_1',
      candidateId: 'usr_candidate_1',
      jobId: 'job_fullstack_03',
      savedAt: '2026-02-20T16:00:00.000Z',
    },
  ],
  interviews: [
    {
      id: 'int_001',
      applicationId: 'app_001',
      jobId: 'job_cloud_arch_01',
      jobTitle: 'Lead Cloud Infrastructure Architect',
      candidateId: 'usr_candidate_1',
      candidateName: 'Elena Rostova',
      candidateEmail: 'candidate@codeologyai.com',
      interviewerName: 'David Sterling (CTO)',
      interviewerEmail: 'admin@codeologyai.com',
      scheduledAt: '2026-03-20T18:00:00.000Z',
      durationMinutes: 60,
      mode: 'Video',
      meetingLink: 'https://meet.google.com/ais-codeology-arch',
      notes: 'Focus on multi-region failover design, disaster recovery RTO/RPO limits, and Terraform module governance.',
      status: 'scheduled',
      createdAt: '2026-02-22T10:30:00.000Z',
    }
  ],
  interviewFeedbacks: [],
  notifications: [
    {
      id: 'notif_1',
      userId: 'usr_candidate_1',
      title: 'Interview Scheduled',
      message: 'Your Technical Architecture interview with David Sterling (CTO) has been confirmed for March 20, 2026.',
      type: 'interview',
      read: false,
      link: '/candidate/interviews',
      createdAt: '2026-02-22T10:35:00.000Z',
    },
    {
      id: 'notif_2',
      userId: 'usr_candidate_1',
      title: 'Application Status Updated',
      message: 'Your application for Lead Cloud Infrastructure Architect has advanced to "Interview".',
      type: 'success',
      read: true,
      link: '/candidate/applications',
      createdAt: '2026-02-22T10:01:00.000Z',
    },
  ],
  leads: [
    {
      id: 'lead_001',
      fullName: 'Robert Harrington',
      email: 'r.harrington@veritascapital.io',
      phone: '+1 (212) 880-9921',
      company: 'Veritas Financial Capital',
      companySize: '250 - 500 Employees',
      serviceInterest: 'Cloud Migration & Hybrid Infrastructure',
      budgetRange: '$100k - $250k',
      message: 'We are preparing to migrate our trade execution data store off legacy on-prem hardware into AWS. Looking for a validated partner to assess security architecture and build Terraform automation.',
      stage: 'Qualified',
      assignedToName: 'David Sterling',
      followUpDate: '2026-03-22',
      notes: [
        {
          id: 'note_1',
          authorName: 'Marcus Vance',
          content: 'Initial intake call conducted on March 4. Confirmed budget approved by CFO. They require SOC 2 compliance documentation.',
          createdAt: '2026-03-04T16:00:00.000Z',
        }
      ],
      createdAt: '2026-03-02T14:20:00.000Z',
      updatedAt: '2026-03-04T16:00:00.000Z',
    },
    {
      id: 'lead_002',
      fullName: 'Dr. Katherine Price',
      email: 'katherine.price@novapharma.org',
      phone: '+1 (617) 420-1188',
      company: 'NovaPharma Research',
      companySize: '500+ Employees',
      serviceInterest: 'Cybersecurity & Zero Trust Architecture',
      budgetRange: '$250k+',
      message: 'Seeking comprehensive penetration testing and SOC 2 Type II audit readiness across clinical trial data platforms.',
      stage: 'Proposal',
      assignedToName: 'Arthur Bradley',
      followUpDate: '2026-03-25',
      notes: [
        {
          id: 'note_2',
          authorName: 'Arthur Bradley',
          content: 'Delivered customized SOC 2 audit readiness statement of work. Decision scheduled for end of month.',
          createdAt: '2026-03-08T11:00:00.000Z',
        }
      ],
      createdAt: '2026-02-26T09:15:00.000Z',
      updatedAt: '2026-03-08T11:00:00.000Z',
    },
    {
      id: 'lead_003',
      fullName: 'Julian Vance',
      email: 'jvance@omnilogix.net',
      phone: '+1 (312) 670-3344',
      company: 'OmniLogix Global Freight',
      companySize: '1,000+ Employees',
      serviceInterest: 'Technical Recruitment & Contract Pods',
      budgetRange: '$150k - $300k',
      message: 'Need 6 senior DevOps and Kubernetes engineers on an urgent 12-month contract basis to support our fleet telemetry rollout.',
      stage: 'Negotiation',
      assignedToName: 'Sarah Jenkins',
      followUpDate: '2026-03-18',
      notes: [
        {
          id: 'note_3',
          authorName: 'Sarah Jenkins',
          content: 'Master Services Agreement (MSA) currently with client legal team. Candidate pod profiles pre-screened.',
          createdAt: '2026-03-07T15:30:00.000Z',
        }
      ],
      createdAt: '2026-02-18T10:00:00.000Z',
      updatedAt: '2026-03-07T15:30:00.000Z',
    }
  ],
  auditLogs: [
    {
      id: 'log_001',
      userId: 'usr_admin_1',
      userEmail: 'admin@codeologyai.com',
      userName: 'David Sterling',
      action: 'JOB_PUBLISHED',
      entityType: 'Job',
      entityId: 'job_cloud_arch_01',
      details: 'Published Lead Cloud Infrastructure Architect requisition to career portal',
      ipAddress: '192.168.1.1',
      timestamp: '2026-02-01T10:00:00.000Z',
    },
    {
      id: 'log_002',
      userId: 'usr_recruiter_1',
      userEmail: 'recruiter@codeologyai.com',
      userName: 'Marcus Vance',
      action: 'APPLICATION_STATUS_CHANGE',
      entityType: 'Application',
      entityId: 'app_001',
      details: 'Changed status from Shortlisted to Interview for Elena Rostova',
      ipAddress: '192.168.1.45',
      timestamp: '2026-02-22T10:00:00.000Z',
    },
    {
      id: 'log_003',
      userId: 'usr_recruiter_1',
      userEmail: 'recruiter@codeologyai.com',
      userName: 'Marcus Vance',
      action: 'INTERVIEW_SCHEDULED',
      entityType: 'Interview',
      entityId: 'int_001',
      details: 'Scheduled Technical Architecture interview with David Sterling for 2026-03-20',
      ipAddress: '192.168.1.45',
      timestamp: '2026-02-22T10:30:00.000Z',
    }
  ],
  services: [
    {
      slug: 'it-infrastructure',
      title: 'Managed IT & Infrastructure Engineering',
      tagline: 'High-availability infrastructure engineered for zero unplanned downtime.',
      heroHeadline: 'Mission-Critical IT Infrastructure, Proactively Managed 24/7/365',
      shortDescription: 'Enterprise server infrastructure, network architecture, proactive monitoring, and hardware lifecycle management backed by strict 99.99% SLAs.',
      capabilities: [
        {
          title: '24/7/365 Network Operations Center (NOC)',
          description: 'Continuous monitoring of telemetry, network latencies, packet integrity, and host health with guaranteed 15-minute emergency engineer triage.',
        },
        {
          title: 'Data Center & Virtualization Architecture',
          description: 'Design and support for VMware vSphere, Hyper-V, and bare-metal server clusters with redundant SAN storage fabrics and automated snapshots.',
        },
        {
          title: 'IT Asset & Endpoint Fleet Management',
          description: 'Centralized MDM/EDR orchestration, patch compliance automation, remote device provisioning, and hardware lifecycle retirement.',
        },
        {
          title: 'Disaster Recovery & Business Continuity',
          description: 'Geographically isolated automated backups, RPO/RTO validation drills, and instant failover runbooks to ensure operational continuity.',
        },
      ],
      deliverables: [
        'Dedicated Level 2 & Level 3 enterprise systems engineers',
        'Transparent real-time infrastructure status and SLA dashboards',
        'Quarterly IT steering committee reviews & capacity forecasting',
        'Documented network topology and immutable disaster recovery runbooks',
      ],
      techStack: ['Cisco Nexus', 'VMware ESXi', 'Fortinet', 'Palo Alto Networks', 'Datadog', 'Zabbix', 'Ansible'],
      businessOutcomes: [
        { metric: '99.99%', label: 'Infrastructure Availability SLA', detail: 'Guaranteed uptime across core networking and virtual compute nodes.' },
        { metric: '14 min', label: 'Mean Time to Response', detail: 'Critical event containment verified by enterprise NOC teams.' },
        { metric: '32%', label: 'Operating Cost Reduction', detail: 'Through consolidated hardware vendor licensing and virtualization.' },
      ],
      complianceStandards: ['SOC 2 Type II', 'ISO 27001', 'HIPAA Security Rule', 'PCI-DSS 4.0'],
    },
    {
      slug: 'cloud',
      title: 'Cloud Engineering & FinOps Migration',
      tagline: 'Multi-cloud architectures designed for resilience, velocity, and fiscal efficiency.',
      heroHeadline: 'Modernize and Scale with Elastic Cloud Computing',
      shortDescription: 'Certified AWS, Azure, and GCP architecture design, automated zero-downtime migration, Kubernetes containerization, and FinOps cost optimization.',
      capabilities: [
        {
          title: 'Multi-Cloud Architecture & Landing Zones',
          description: 'Establishing governed AWS Organizations or Azure Management Groups with strict IAM boundaries, centralized billing, and VPC transit routing.',
        },
        {
          title: 'Kubernetes & Container Orchestration',
          description: 'Production EKS, AKS, and GKE cluster provisioning with automated autoscaling (Karpenter), service mesh, and GitOps delivery pipelines.',
        },
        {
          title: 'Database & Workload Migration',
          description: 'Phased cutover of monolithic databases to managed cloud engines (Aurora PostgreSQL, DynamoDB) with minimal replication lag.',
        },
        {
          title: 'FinOps Cloud Spend Governance',
          description: 'Continuous cost anomaly detection, rightsizing underutilized compute, commitment modeling (Savings Plans / RIs), and unit-economics dashboards.',
        },
      ],
      deliverables: [
        'Production-ready Terraform/OpenTofu infrastructure-as-code modules',
        'ArgoCD GitOps CI/CD deployment pipelines',
        'Well-Architected Framework review with remediation plan',
        'FinOps executive cost optimization report with actionable savings',
      ],
      techStack: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Terraform', 'Kubernetes', 'ArgoCD', 'Prometheus', 'Helm'],
      businessOutcomes: [
        { metric: '40%', label: 'Average Cloud Waste Reduction', detail: 'Achieved across compute rightsizing and intelligent storage tiering.' },
        { metric: '4x', label: 'Faster Deployment Cadence', detail: 'Empowering engineering teams to ship production updates with confidence.' },
        { metric: 'Zero', label: 'Downtime Cutover Record', detail: 'Validated across enterprise transactional databases.' },
      ],
      complianceStandards: ['AWS Well-Architected', 'Azure Cloud Adoption Framework', 'CIS Benchmarks'],
    },
    {
      slug: 'cybersecurity',
      title: 'Enterprise Cybersecurity & Zero Trust',
      tagline: 'Defensive engineering and threat intelligence to protect intellectual property.',
      heroHeadline: 'Resilient Defensive Security Built for Complex Threat Environments',
      shortDescription: 'Zero Trust architecture, 24/7 managed detection and response (MDR), regulatory audit readiness (SOC 2, ISO 27001), and penetration testing.',
      capabilities: [
        {
          title: 'Zero Trust Identity & Access Architecture',
          description: 'Phishing-resistant FIDO2 MFA, dynamic context-aware authorization policies, and least-privilege role-based access governance.',
        },
        {
          title: 'Managed Detection & Threat Hunting (MDR)',
          description: 'Proactive behavioral anomaly detection combining endpoint telemetry, cloud API audit trails, and human threat analysts.',
        },
        {
          title: 'Penetration Testing & Red Teaming',
          description: 'Rigorous ethical hacking exercises simulating real-world adversary tactics across web apps, external attack surfaces, and internal networks.',
        },
        {
          title: 'Compliance Audit Readiness (SOC 2, HIPAA, ISO)',
          description: 'Gap analysis, security policy drafting, technical evidence collection automation, and auditor facilitation.',
        },
      ],
      deliverables: [
        'Quarterly comprehensive vulnerability assessments and executive risk register',
        'Incident response playbooks with defined containment escalation chains',
        'Automated SIEM log ingestion with 365-day immutable compliance retention',
        'Continuous compliance monitoring reports mapped to NIST 800-53',
      ],
      techStack: ['CrowdStrike Falcon', 'Microsoft Sentinel', 'Wiz.io', 'HashiCorp Vault', 'Okta', 'Splunk', 'Tenable.io'],
      businessOutcomes: [
        { metric: '100%', label: 'Audit First-Pass Pass Rate', detail: 'Across SOC 2 Type II and ISO 27001 client examinations.' },
        { metric: '<15 min', label: 'Threat Containment SLA', detail: 'Automated isolation of compromised host credentials.' },
        { metric: '99.4%', label: 'Phishing Defense Efficacy', detail: 'Through hardware-backed MFA and continuous user simulation.' },
      ],
      complianceStandards: ['NIST CSF 2.0', 'SOC 2 Type II', 'ISO 27001:2022', 'HIPAA', 'GDPR'],
    },
    {
      slug: 'software-development',
      title: 'Custom Enterprise Software Engineering',
      tagline: 'Modern, maintainable software architectures built to power high-scale business operations.',
      heroHeadline: 'Engineering Scalable Software Systems That Deliver Business Leverage',
      shortDescription: 'Distributed backend systems, enterprise web applications, high-throughput microservices, and secure API gateways built with TypeScript, Go, and React.',
      capabilities: [
        {
          title: 'Distributed Systems & API Gateways',
          description: 'High-performance transactional microservices with strict schema validation, OpenAPI specifications, and sub-50ms p99 latency targets.',
        },
        {
          title: 'Enterprise Modern Web Applications',
          description: 'Accessible, responsive web portals using Next.js/React, design systems, and robust client-server state synchronization.',
        },
        {
          title: 'Event-Driven Architectures',
          description: 'Asynchronous event streaming and message queuing utilizing Kafka, RabbitMQ, or AWS SQS/SNS for decoupled fault tolerance.',
        },
        {
          title: 'Legacy Application Modernization',
          description: 'Deconstructing monolithic codebases using the Strangler Fig pattern into modular, maintainable cloud-native services.',
        },
      ],
      deliverables: [
        'Production-ready code repository with thorough unit and integration test suites',
        'Interactive API documentation and comprehensive architectural decision records (ADRs)',
        'Containerized CI/CD build scripts and staging environment definitions',
        'Post-launch engineering handover workshops and runbooks',
      ],
      techStack: ['TypeScript', 'React', 'Next.js', 'Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
      businessOutcomes: [
        { metric: '85%+', label: 'Automated Test Coverage', detail: 'Preventing regressions in critical transactional pathways.' },
        { metric: '3.2x', label: 'Throughput Increase', detail: 'Achieved through database query indexing and event-driven decoupling.' },
        { metric: '<50ms', label: 'Core API p99 Latency', detail: 'Delivering snappy user experiences under peak concurrency.' },
      ],
      complianceStandards: ['OWASP Top 10 Hardened', 'WCAG 2.2 AA Accessible', 'REST & GraphQL Standards'],
    },
    {
      slug: 'digital-transformation',
      title: 'Enterprise Digital Transformation',
      tagline: 'Bridging legacy operational silos with modern data architectures and automated workflows.',
      heroHeadline: 'Transform Operational Complexity into Digital Velocity',
      shortDescription: 'Holistic modernization of enterprise workflows, ERP integration, operational telemetry pipelines, and pragmatic business process automation.',
      capabilities: [
        {
          title: 'Legacy System Integration & Modernization',
          description: 'Bridging on-premise ERPs, AS/400 systems, and SAP instances with modern REST/GraphQL data layers without disrupting daily operations.',
        },
        {
          title: 'Workflow Automation & Process Optimization',
          description: 'Eliminating manual spreadsheet reconciliation and paper-based routing with automated, audited software orchestration.',
        },
        {
          title: 'Operational Analytics & Business Intelligence',
          description: 'Consolidating disparate operational databases into unified data warehouses with live executive decision dashboards.',
        },
        {
          title: 'Change Enablement & User Training',
          description: 'Structured change management programs ensuring enterprise workforce adoption and measurable ROI on new technology investments.',
        },
      ],
      deliverables: [
        'Comprehensive current-state operational discovery map',
        'Multi-phase modernization roadmap with calculated ROI milestones',
        'Automated bi-directional data synchronization connectors',
        'Executive KPI cockpit with real-time operational metrics',
      ],
      techStack: ['Snowflake', 'dbt', 'Python', 'Apache Airflow', 'PostgreSQL', 'PowerBI', 'Zapier Enterprise'],
      businessOutcomes: [
        { metric: '65%', label: 'Manual Processing Hours Saved', detail: 'Automating high-frequency transactional data reconciliation.' },
        { metric: '100%', label: 'Audit Trail Traceability', detail: 'Every enterprise transaction logged with immutable provenance.' },
        { metric: '6 Months', label: 'Average Payback Period', detail: 'Documented across enterprise digital transformation deployments.' },
      ],
      complianceStandards: ['Enterprise Architecture TOGAF', 'ISO 9001 Quality Standards'],
    },
    {
      slug: 'digital-marketing',
      title: 'B2B Enterprise Digital Marketing & Growth',
      tagline: 'Data-driven technical SEO, account-based marketing, and digital revenue operations.',
      heroHeadline: 'Accelerate Enterprise Pipeline with Technical Marketing Precision',
      shortDescription: 'Enterprise B2B search visibility engineering, high-intent performance marketing, conversion rate optimization, and CRM revenue operations.',
      capabilities: [
        {
          title: 'Enterprise Technical SEO & Site Architecture',
          description: 'Core Web Vitals optimization, programmatic metadata indexing, and deep content strategy to capture high-intent enterprise buyers.',
        },
        {
          title: 'Account-Based B2B Performance Marketing',
          description: 'Laser-focused LinkedIn and search campaigns targeting verified decision-makers across predetermined enterprise accounts.',
        },
        {
          title: 'Conversion Rate Engineering (CRO)',
          description: 'Scientific multivariate testing of landing experiences, intake flows, and value messaging to maximize qualified lead capture.',
        },
        {
          title: 'CRM & Marketing Automation Operations',
          description: 'Seamless integration between digital touchpoints and Salesforce/HubSpot CRMs with multi-touch attribution modeling.',
        },
      ],
      deliverables: [
        'Technical SEO audit with prioritization matrix and developer-ready tickets',
        'Target account tiering lists and tailored account-based ad creative',
        'Attribution analytics dashboard linking ad spend directly to closed-won revenue',
        'Quarterly organic search benchmark reports',
      ],
      techStack: ['Google Analytics 4', 'HubSpot', 'Salesforce', 'Semrush', 'Search Console', 'Segment CDP'],
      businessOutcomes: [
        { metric: '140%', label: 'Organic Inbound Pipeline Growth', detail: 'Achieved within 9 months of technical SEO re-architecture.' },
        { metric: '3.4x', label: 'Return on B2B Ad Spend', detail: 'Through hyper-targeted account-based marketing programs.' },
        { metric: '94+', label: 'Mobile & Desktop Lighthouse Score', detail: 'Ensuring top search engine ranking performance.' },
      ],
      complianceStandards: ['GDPR Privacy Compliant', 'CCPA Compliant', 'Google Search Essentials'],
    },
    {
      slug: 'recruitment',
      title: 'Global Technical Recruitment & RPO',
      tagline: 'Vetted engineering talent, dedicated hiring pods, and Recruitment Process Outsourcing.',
      heroHeadline: 'Connect with Elite Global Technical Talent, Built for Enterprise Scale',
      shortDescription: 'End-to-end recruitment process outsourcing (RPO), executive technical search, contract engineering pods, and precision talent matching.',
      capabilities: [
        {
          title: 'Full-Lifecycle Recruitment Process Outsourcing (RPO)',
          description: 'Embedded technical recruiting partners who integrate directly into your engineering leadership workflows and ATS.',
        },
        {
          title: 'Vetted Contract Engineering Pods',
          description: 'Deploy ready-to-code teams of cloud architects, security analysts, or full-stack developers within 10 business days.',
        },
        {
          title: 'Executive Technical Search',
          description: 'Confidential sourcing and placement of VP of Engineering, Chief Information Security Officer (CISO), and Chief Technology Officer (CTO) talent.',
        },
        {
          title: 'Candidate Skill & Cultural Assessment',
          description: 'Multi-stage technical evaluations conducted by practicing engineers, ensuring rigorous validation prior to client submission.',
        },
      ],
      deliverables: [
        'Structured interview scoring rubrics and candidate comparative dossiers',
        'Real-time hiring pipeline telemetry (pass-through rates, time-to-hire)',
        'Full candidate pre-employment credential and background verification',
        '90-day replacement guarantee on direct placements',
      ],
      techStack: ['Codeology AI Career Platform', 'Greenhouse', 'Lever', 'LinkedIn Recruiter', 'HackerRank'],
      businessOutcomes: [
        { metric: '18 Days', label: 'Average Time-to-Fill', detail: 'For senior cloud and security engineering requisitions.' },
        { metric: '96%', label: 'Candidate Retention Rate', detail: 'Past the 12-month mark across enterprise client placements.' },
        { metric: '4:1', label: 'Interview-to-Offer Ratio', detail: 'Drastically cutting engineering manager interviewing hours.' },
      ],
      complianceStandards: ['EEOC Compliant', 'Fair Chance Hiring', 'Global Contractor Compliance'],
    },
  ],
  industries: [
    {
      slug: 'financial-services',
      name: 'Financial Services & FinTech',
      headline: 'Sub-millisecond resilience and impenetrable compliance for capital markets and banking.',
      overview: 'We partner with retail banks, investment managers, and high-growth FinTechs to engineer zero-trust networks, automated fraud prevention pipelines, and SOC 2 Type II compliant cloud platforms.',
      challengesSolved: [
        'Strict regulatory scrutiny (SEC, FINRA, PCI-DSS, SOC 2 Type II)',
        'Legacy mainframe migration to distributed cloud architectures',
        'Real-time fraud detection and high-concurrency ledger processing',
        'High cost of specialized technical security and DevOps talent',
      ],
      architectures: [
        'Multi-region active-active database clusters with sub-second replication',
        'Hardware security module (HSM) key management integration',
        'Immutable audit logs with write-once-read-many (WORM) cloud storage',
      ],
      representativeWork: 'Modernized transactional cloud platform for a Tier-1 asset manager handling $40B in assets under management with 99.999% availability.',
    },
    {
      slug: 'healthcare-life-sciences',
      name: 'Healthcare & Life Sciences',
      headline: 'HIPAA-compliant cloud foundations and secure clinical data interoperability.',
      overview: 'Empowering healthcare networks, clinical research organizations, and digital health providers to protect electronic health records (ePHI) while scaling telemedicine and analytics pipelines.',
      challengesSolved: [
        'HIPAA Privacy & Security Rule compliance and BAA documentation',
        'Secure integration with HL7 and FHIR clinical data protocols',
        'Ransomware protection for hospital endpoints and medical IoT devices',
        'Staffing shortages for specialized healthcare IT systems administrators',
      ],
      architectures: [
        'Zero Trust segmented clinical network zones with micro-firewalling',
        'Encrypted-at-rest and in-transit clinical data lakes',
        'Automated vulnerability patch cycles tailored around 24/7 patient care windows',
      ],
      representativeWork: 'Engineered a multi-cloud HIPAA-compliant data platform for a national clinical laboratory handling 120,000 diagnostic samples daily.',
    },
    {
      slug: 'logistics-supply-chain',
      name: 'Logistics & Supply Chain',
      headline: 'Real-time fleet telemetry, IoT edge reliability, and continuous tracking pipelines.',
      overview: 'Supporting global freight forwarders, 3PL providers, and port operators with resilient network connectivity, edge computing, and real-time tracking microservices.',
      challengesSolved: [
        'High latency and dropped connections across remote maritime and warehouse nodes',
        'Siloed legacy inventory databases preventing real-time inventory visibility',
        'Operational downtime causing physical logistics bottlenecks and penalty fees',
      ],
      architectures: [
        'Edge Kubernetes nodes with offline-first local queue resilience',
        'Real-time Apache Kafka telemetry ingestion handling 100k events/sec',
        'Predictive maintenance event streaming for fleet hardware',
      ],
      representativeWork: 'Deployed automated IoT telemetry pipeline for an international freight carrier, slashing shipment status latency from 45 minutes to 2.1 seconds.',
    },
    {
      slug: 'retail-ecommerce',
      name: 'Retail & E-Commerce',
      headline: 'Elastic cloud infrastructure engineered for intense Black Friday peak traffic surges.',
      overview: 'Helping multi-channel retailers and digital direct-to-consumer brands withstand 10x traffic spikes with automated autoscaling, headless commerce APIs, and DDoS shielding.',
      challengesSolved: [
        'Website slow-downs or crashes during peak seasonal shopping surges',
        'PCI-DSS compliance management across multiple payment gateways',
        'Cart abandonment driven by slow page load speeds and API latencies',
      ],
      architectures: [
        'Cloudflare Enterprise edge caching and Web Application Firewall (WAF)',
        'Serverless API gateways with dynamic horizontal compute scaling',
        'Headless commerce architecture with distributed Next.js edge rendering',
      ],
      representativeWork: 'Re-architected cloud infrastructure for a global apparel brand, sustaining $18M in Black Friday sales without a single dropped transaction.',
    },
  ],
  caseStudies: [
    {
      id: 'cs_01',
      slug: 'tier-1-fintech-cloud-modernization',
      clientIndustry: 'Financial Services',
      clientType: 'Global Asset Management & Trading Firm',
      title: 'Zero-Downtime Multi-Region Cloud Migration for $40B Asset Management Platform',
      summary: 'Codeology AI architected and executed a phased migration from a legacy on-premises data center to AWS EKS and Aurora PostgreSQL, cutting operational infrastructure costs by 34% while achieving 99.999% platform availability.',
      problemStatement: 'The client operated on aging colocation hardware approaching end-of-life. Monolithic database locks during high-volume market open hours created latency spikes up to 4.2 seconds, threatening regulatory execution thresholds.',
      architecturalSolution: 'Our Cloud Engineering team deployed an immutable multi-region AWS landing zone using Terraform Enterprise. We containerized core financial transaction services into Kubernetes with Karpenter auto-scaling and designed a dual-write replication bridge for zero-downtime database cutover.',
      keyOutcomes: [
        { value: '99.999%', label: 'Uptime Achieved Over 18 Months' },
        { value: '34%', label: 'Annual Infrastructure Spend Reduction' },
        { value: '42ms', label: 'Average Transaction p99 Latency (down from 4,200ms)' },
      ],
      technologiesUsed: ['AWS EKS', 'Aurora PostgreSQL', 'Terraform', 'Kafka', 'Datadog', 'ArgoCD'],
      testimonialQuote: 'Codeology AI delivered what two previous consulting firms claimed was impossible: a zero-downtime migration of our core ledger without disrupting a single trading day.',
      testimonialAuthor: 'Marcus Vance',
      testimonialRole: 'SVP of Technology Infrastructure',
    },
    {
      id: 'cs_02',
      slug: 'regional-hospital-zero-trust-security',
      clientIndustry: 'Healthcare & Life Sciences',
      clientType: '8-Hospital Regional Health System',
      title: 'Zero Trust Security Architecture & SOC 2 Compliance for 14,000-Endpoint Health System',
      summary: 'Defended a regional healthcare provider against sophisticated ransomware campaigns by deploying Zero Trust identity, endpoint detection and response (EDR), and establishing a continuous 24/7 Managed SOC.',
      problemStatement: 'Facing aggressive ransomware proliferation targeting healthcare facilities nationwide, the client struggled with unsegmented legacy network subnets and lack of centralized log visibility across 8 hospital campuses.',
      architecturalSolution: 'Codeology AI designed micro-segmented network zones isolating patient telemetry and clinical medical records. We deployed CrowdStrike Falcon across 14,000 endpoints and integrated an automated SIEM with 15-minute SLA threat containment playbooks.',
      keyOutcomes: [
        { value: 'Zero', label: 'Ransomware Breaches or Infiltrations' },
        { value: '11 min', label: 'Mean Time to Incident Containment' },
        { value: '100%', label: 'HIPAA & SOC 2 Type II Compliance Pass' },
      ],
      technologiesUsed: ['CrowdStrike Falcon', 'Palo Alto Zero Trust', 'Microsoft Sentinel', 'Okta Identity', 'HashiCorp Vault'],
      testimonialQuote: 'In our environment, cybersecurity is literally a matter of patient safety. Codeology AI gives our executive team and clinical staff total peace of mind.',
      testimonialAuthor: 'Dr. Rebecca Aris',
      testimonialRole: 'Chief Information Security Officer',
    },
    {
      id: 'cs_03',
      slug: 'global-logistics-realtime-iot-pipeline',
      clientIndustry: 'Logistics & Supply Chain',
      clientType: 'International Intermodal Freight Carrier',
      title: 'Real-Time Edge Telemetry Processing for 25,000 Connected Cargo Vessels and Trucks',
      summary: 'Engineered an event-driven edge telemetry platform that processes 100,000 sensor updates per second, providing instant container temperature and GPS tracking across global supply routes.',
      problemStatement: 'Shipment temperature excursion alerts were lagging by up to 3 hours due to batch processing, causing spoiled pharmaceutical shipments and contested insurance claims.',
      architecturalSolution: 'Designed a lightweight edge gateway with offline-resilient queuing, streaming data into a distributed Apache Kafka cluster on AWS. Live alerts are evaluated within 800ms using streaming analytical engines.',
      keyOutcomes: [
        { value: '800ms', label: 'End-to-End Alert Latency (down from 3 hours)' },
        { value: '92%', label: 'Reduction in Cargo Loss Claims' },
        { value: '100k/s', label: 'Sensor Events Ingested Continuously' },
      ],
      technologiesUsed: ['Apache Kafka', 'Go', 'AWS IoT Core', 'TimescaleDB', 'Docker', 'Grafana'],
      testimonialQuote: 'Our customers demand real-time visibility into fragile cold-chain cargo. Codeology AI built an edge system that works reliably even in the middle of the Atlantic.',
      testimonialAuthor: 'Siddharth Patel',
      testimonialRole: 'VP of Engineering Operations',
    },
  ],
  blogs: [
    {
      id: 'blog_01',
      slug: 'zero-trust-architecture-enterprise-guide',
      title: 'Architecting Zero Trust: Moving Beyond the VPN in Modern Enterprise Networks',
      category: 'Cybersecurity',
      authorName: 'Arthur Bradley',
      authorRole: 'Director of Information Security',
      publishedDate: '2026-03-01',
      readTime: '8 min read',
      summary: 'Why traditional perimeter-based firewalls fail against modern identity-compromise vectors, and how to implement contextual authorization and micro-segmentation.',
      content: `The traditional castle-and-moat security architecture is fundamentally broken. When corporate data centers housed all compute and employees accessed services from office desktops, an exterior firewall was a sensible defensive perimeter. Today, with distributed cloud workloads and hybrid workforces, assuming everything inside the perimeter is trustworthy represents an existential vulnerability.\n\n### Core Pillars of Zero Trust Architecture\n\n1. **Explicit Identity Verification**: Never trust IP addresses or network proximity. Every transaction must be authenticated using hardware-backed MFA (FIDO2) and contextual device health signals.\n2. **Least-Privilege Role Authorization**: Enforce just-in-time access and role-based privilege elevation. No user or service account should maintain persistent administrative keys.\n3. **Continuous Micro-Segmentation**: Segment internal networks into discrete micro-perimeters. Compromising a single staging server must not permit lateral movement into production databases.\n\nBy following NIST 800-207 guidelines, enterprise teams can dramatically reduce their attack surface while actually improving employee login friction through modern single sign-on.`,
      tags: ['Cybersecurity', 'Zero Trust', 'NIST', 'Cloud Security'],
    },
    {
      id: 'blog_02',
      slug: 'finops-cloud-cost-governance-tactics',
      title: 'Pragmatic FinOps: 5 Engineering Tactics to Trim 30% Off Your AWS Bill',
      category: 'Cloud Engineering',
      authorName: 'David Sterling',
      authorRole: 'Chief Technology Officer',
      publishedDate: '2026-02-18',
      readTime: '6 min read',
      summary: 'Concrete architectural shifts—from Karpenter auto-scaling to S3 intelligent storage tiering—that deliver immediate fiscal discipline without reducing engineering velocity.',
      content: `Cloud bills tend to grow quietly until an executive notice arrives. Most organizations over-provision compute clusters by 40% to compensate for sudden traffic surges. However, with modern cloud orchestration primitives, engineering teams do not need to choose between performance headroom and fiscal responsibility.\n\n### 1. Replace Cluster Autoscaler with Karpenter\nTraditional cluster autoscalers operate on static node groups, often spinning up oversized instances that sit 80% idle. Karpenter evaluates incoming pod requirements and dynamically provisions the exact instance sizes needed, bin-packing pods efficiently.\n\n### 2. Leverage Spot Instances for Stateless Workloads\nWorker queues, batch rendering, and CI/CD pipelines can run on EC2 Spot instances for an immediate 70% to 90% discount compared to on-demand pricing. Ensure your services handle termination notifications gracefully.\n\n### 3. Automated S3 Intelligent-Tiering\nUnstructured log files and historical database snapshots often accumulate in standard S3 storage. Enabling Intelligent-Tiering automatically moves objects unaccessed for 30 days to infrequent access tiers with zero operational overhead.`,
      tags: ['Cloud', 'AWS', 'FinOps', 'Kubernetes'],
    },
    {
      id: 'blog_03',
      slug: 'closing-the-engineering-talent-gap-rpo',
      title: 'The Engineering Hiring Paradox: Why Technical RPO Outperforms Agency Staffing',
      category: 'Talent & Hiring',
      authorName: 'Sarah Jenkins',
      authorRole: 'VP of People & Talent',
      publishedDate: '2026-02-05',
      readTime: '5 min read',
      summary: 'How embedded Recruitment Process Outsourcing (RPO) aligns recruitment incentives with engineering quality, reducing time-to-hire by 45% compared to traditional headhunters.',
      content: `Traditional contingent staffing agencies operate on high volume: they cast wide nets, spam candidate resumes to dozens of companies simultaneously, and disappear the moment an invoice clears. For technical leadership seeking specialized skills—such as Kubernetes infrastructure architects or SOC forensic leads—this model burns valuable engineering interviewing hours.\n\n### The RPO Advantage: Embedded Technical Alignment\nRecruitment Process Outsourcing embeds dedicated technical recruiters directly inside your engineering teams. Rather than transactional keyword matching, an RPO partner learns your architectural standards, participates in sprint retrospectives, and performs deep initial technical assessments.\n\nCandidates receive a consistent, branded employer experience, and hiring managers only spend interview cycles with pre-evaluated, culturally vetted engineers.`,
      tags: ['Recruitment', 'RPO', 'Engineering Leadership', 'Hiring'],
    },
  ],
};

class DatabaseManager {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        // Merge with initial data in case new schema sections were added
        return {
          ...INITIAL_DATA,
          ...parsed,
        };
      }
    } catch (err) {
      console.error('Error reading database file, using initial data:', err);
    }
    this.saveData(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  private saveData(data: DatabaseSchema) {
    try {
      this.ensureDataDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to database file:', err);
    }
  }

  // --- USERS & AUTH ---
  getUsers(): User[] {
    return this.data.users;
  }

  getUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.users.push(newUser);
    this.saveData(this.data);
    return newUser;
  }

  // --- CANDIDATE PROFILES ---
  getCandidateProfileByUserId(userId: string): CandidateProfile | undefined {
    return this.data.candidateProfiles.find((p) => p.userId === userId);
  }

  saveCandidateProfile(profile: Partial<CandidateProfile> & { userId: string }): CandidateProfile {
    const existingIndex = this.data.candidateProfiles.findIndex((p) => p.userId === profile.userId);
    let updated: CandidateProfile;

    if (existingIndex >= 0) {
      updated = {
        ...this.data.candidateProfiles[existingIndex],
        ...profile,
        updatedAt: new Date().toISOString(),
      };
      this.data.candidateProfiles[existingIndex] = updated;
    } else {
      updated = {
        id: `prof_${Date.now()}`,
        userId: profile.userId,
        headline: profile.headline || '',
        summary: profile.summary || '',
        location: profile.location || '',
        phone: profile.phone || '',
        yearsOfExperience: profile.yearsOfExperience || 0,
        highestEducation: profile.highestEducation || '',
        expectedSalary: profile.expectedSalary || '',
        noticePeriod: profile.noticePeriod || 'Immediate',
        availabilityStatus: profile.availabilityStatus || 'Actively Looking',
        skills: profile.skills || [],
        experiences: profile.experiences || [],
        education: profile.education || [],
        completenessScore: profile.completenessScore || 70,
        updatedAt: new Date().toISOString(),
        ...profile,
      };
      this.data.candidateProfiles.push(updated);
    }
    this.saveData(this.data);
    return updated;
  }

  // --- JOBS ---
  getJobs(filters?: {
    search?: string;
    department?: string;
    type?: string;
    status?: string;
  }): Job[] {
    let result = [...this.data.jobs];
    if (filters?.status) {
      result = result.filter((j) => j.status === filters.status);
    }
    if (filters?.department && filters.department !== 'All') {
      result = result.filter((j) => j.department === filters.department);
    }
    if (filters?.type && filters.type !== 'All') {
      result = result.filter((j) => j.type === filters.type);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return result;
  }

  getJobBySlug(slug: string): Job | undefined {
    return this.data.jobs.find((j) => j.slug === slug || j.id === slug);
  }

  createJob(jobData: Omit<Job, 'id' | 'viewsCount' | 'applicantsCount' | 'createdAt' | 'updatedAt'>): Job {
    const slug = jobData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newJob: Job = {
      ...jobData,
      id: `job_${Date.now()}`,
      slug: `${slug}-${Math.random().toString(36).substring(2, 5)}`,
      viewsCount: 0,
      applicantsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.jobs.unshift(newJob);
    this.saveData(this.data);
    return newJob;
  }

  updateJob(id: string, updates: Partial<Job>): Job | undefined {
    const index = this.data.jobs.findIndex((j) => j.id === id);
    if (index === -1) return undefined;
    const updated = {
      ...this.data.jobs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.data.jobs[index] = updated;
    this.saveData(this.data);
    return updated;
  }

  incrementJobViews(id: string) {
    const job = this.data.jobs.find((j) => j.id === id);
    if (job) {
      job.viewsCount = (job.viewsCount || 0) + 1;
      this.saveData(this.data);
    }
  }

  // --- APPLICATIONS ---
  getApplications(filter?: { candidateId?: string; jobId?: string; status?: string }): Application[] {
    let list = [...this.data.applications];
    if (filter?.candidateId) {
      list = list.filter((a) => a.candidateId === filter.candidateId);
    }
    if (filter?.jobId) {
      list = list.filter((a) => a.jobId === filter.jobId);
    }
    if (filter?.status) {
      list = list.filter((a) => a.status === filter.status);
    }
    return list;
  }

  getApplicationById(id: string): Application | undefined {
    return this.data.applications.find((a) => a.id === id);
  }

  createApplication(appData: {
    jobId: string;
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    candidatePhone?: string;
    candidateLocation?: string;
    coverNote?: string;
    resumeFileName?: string;
    resumeText?: string;
    aiMatchScore?: number;
    aiMatchRationale?: string;
  }): Application {
    const job = this.data.jobs.find((j) => j.id === appData.jobId);
    const newApp: Application = {
      id: `app_${Date.now()}`,
      jobId: appData.jobId,
      jobTitle: job?.title || 'Unknown Role',
      jobDepartment: job?.department || 'Engineering',
      jobLocation: job?.location || 'Remote',
      candidateId: appData.candidateId,
      candidateName: appData.candidateName,
      candidateEmail: appData.candidateEmail,
      candidatePhone: appData.candidatePhone,
      candidateLocation: appData.candidateLocation,
      status: 'Applied',
      coverNote: appData.coverNote,
      resumeFileName: appData.resumeFileName,
      resumeText: appData.resumeText,
      aiMatchScore: appData.aiMatchScore || 85,
      aiMatchRationale: appData.aiMatchRationale || 'Application profile evaluated with strong foundational alignment.',
      statusHistory: [
        {
          id: `hist_${Date.now()}`,
          toStatus: 'Applied',
          changedBy: 'Candidate',
          timestamp: new Date().toISOString(),
        },
      ],
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.applications.unshift(newApp);

    // Increment applicants counter on job
    if (job) {
      job.applicantsCount = (job.applicantsCount || 0) + 1;
    }

    this.saveData(this.data);
    return newApp;
  }

  updateApplicationStatus(
    id: string,
    newStatus: ApplicationStatus,
    changedBy: string,
    reason?: string
  ): Application | undefined {
    const app = this.data.applications.find((a) => a.id === id);
    if (!app) return undefined;

    const oldStatus = app.status;
    app.status = newStatus;
    app.updatedAt = new Date().toISOString();
    app.statusHistory.push({
      id: `hist_${Date.now()}`,
      fromStatus: oldStatus,
      toStatus: newStatus,
      changedBy,
      reason,
      timestamp: new Date().toISOString(),
    });

    // Create notification for candidate
    this.createNotification({
      userId: app.candidateId,
      title: 'Application Status Updated',
      message: `Your application for "${app.jobTitle}" is now: ${newStatus}.`,
      type: newStatus === 'Offer' || newStatus === 'Hired' ? 'success' : newStatus === 'Rejected' ? 'warning' : 'info',
      link: '/candidate/applications',
    });

    this.saveData(this.data);
    return app;
  }

  addRecruiterNote(id: string, note: string): Application | undefined {
    const app = this.data.applications.find((a) => a.id === id);
    if (!app) return undefined;
    app.recruiterNotes = app.recruiterNotes || [];
    app.recruiterNotes.push(note);
    app.updatedAt = new Date().toISOString();
    this.saveData(this.data);
    return app;
  }

  // --- SAVED JOBS ---
  getSavedJobs(candidateId: string): SavedJob[] {
    return this.data.savedJobs.filter((s) => s.candidateId === candidateId);
  }

  toggleSaveJob(candidateId: string, jobId: string): boolean {
    const index = this.data.savedJobs.findIndex((s) => s.candidateId === candidateId && s.jobId === jobId);
    if (index >= 0) {
      this.data.savedJobs.splice(index, 1);
      this.saveData(this.data);
      return false; // unsaved
    } else {
      this.data.savedJobs.push({
        id: `save_${Date.now()}`,
        candidateId,
        jobId,
        savedAt: new Date().toISOString(),
      });
      this.saveData(this.data);
      return true; // saved
    }
  }

  // --- INTERVIEWS ---
  getInterviews(filter?: { candidateId?: string; recruiterEmail?: string }): Interview[] {
    let list = [...this.data.interviews];
    if (filter?.candidateId) {
      list = list.filter((i) => i.candidateId === filter.candidateId);
    }
    return list;
  }

  createInterview(interviewData: Omit<Interview, 'id' | 'createdAt'>): Interview {
    const newInterview: Interview = {
      ...interviewData,
      id: `int_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.data.interviews.unshift(newInterview);

    // Notify candidate
    this.createNotification({
      userId: newInterview.candidateId,
      title: 'New Interview Scheduled',
      message: `Interview for ${newInterview.jobTitle} with ${newInterview.interviewerName} scheduled for ${new Date(
        newInterview.scheduledAt
      ).toLocaleString()}.`,
      type: 'interview',
      link: '/candidate/interviews',
    });

    this.saveData(this.data);
    return newInterview;
  }

  submitInterviewFeedback(feedbackData: Omit<InterviewFeedback, 'id' | 'submittedAt'>): InterviewFeedback {
    const feedback: InterviewFeedback = {
      ...feedbackData,
      id: `fb_${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    this.data.interviewFeedbacks.push(feedback);

    // Mark interview as completed
    const int = this.data.interviews.find((i) => i.id === feedback.interviewId);
    if (int) {
      int.status = 'completed';
    }

    this.saveData(this.data);
    return feedback;
  }

  getInterviewFeedbacks(interviewId: string): InterviewFeedback[] {
    return this.data.interviewFeedbacks.filter((f) => f.interviewId === interviewId);
  }

  // --- NOTIFICATIONS ---
  getNotifications(userId: string): AppNotification[] {
    return this.data.notifications.filter((n) => n.userId === userId);
  }

  createNotification(notif: Omit<AppNotification, 'id' | 'createdAt' | 'read'>): AppNotification {
    const item: AppNotification = {
      ...notif,
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.data.notifications.unshift(item);
    this.saveData(this.data);
    return item;
  }

  markNotificationRead(id: string) {
    const n = this.data.notifications.find((notif) => notif.id === id);
    if (n) {
      n.read = true;
      this.saveData(this.data);
    }
  }

  markAllNotificationsRead(userId: string) {
    this.data.notifications
      .filter((n) => n.userId === userId)
      .forEach((n) => (n.read = true));
    this.saveData(this.data);
  }

  // --- LEADS & CRM ---
  getLeads(): Lead[] {
    return this.data.leads;
  }

  getLeadById(id: string): Lead | undefined {
    return this.data.leads.find((l) => l.id === id);
  }

  createLead(leadData: Omit<Lead, 'id' | 'stage' | 'assignedToName' | 'notes' | 'createdAt' | 'updatedAt'>): Lead {
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newLead: Lead = {
      ...leadData,
      id: `CA-LEAD-${randomSuffix}`,
      stage: 'New',
      assignedToName: 'David Sterling (CTO)',
      notes: [
        {
          id: `note_${Date.now()}`,
          authorName: 'System Inbound',
          content: 'Inbound lead captured via Codeology AI enterprise contact portal.',
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.leads.unshift(newLead);
    this.saveData(this.data);
    return newLead;
  }

  updateLeadStage(id: string, stage: Lead['stage'], followUpDate?: string): Lead | undefined {
    const lead = this.data.leads.find((l) => l.id === id);
    if (!lead) return undefined;
    lead.stage = stage;
    if (followUpDate) lead.followUpDate = followUpDate;
    lead.updatedAt = new Date().toISOString();
    this.saveData(this.data);
    return lead;
  }

  addLeadNote(id: string, authorName: string, content: string): Lead | undefined {
    const lead = this.data.leads.find((l) => l.id === id);
    if (!lead) return undefined;
    lead.notes.push({
      id: `note_${Date.now()}`,
      authorName,
      content,
      createdAt: new Date().toISOString(),
    });
    lead.updatedAt = new Date().toISOString();
    this.saveData(this.data);
    return lead;
  }

  // --- AUDIT LOGS ---
  getAuditLogs(): AuditLog[] {
    return this.data.auditLogs;
  }

  logAudit(entry: Omit<AuditLog, 'id' | 'timestamp'>): AuditLog {
    const item: AuditLog = {
      ...entry,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    this.data.auditLogs.unshift(item);
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 200);
    }
    this.saveData(this.data);
    return item;
  }

  // --- CMS CONTENT ---
  getServices(): ServiceDetail[] {
    return this.data.services;
  }

  getServiceBySlug(slug: string): ServiceDetail | undefined {
    return this.data.services.find((s) => s.slug === slug);
  }

  getIndustries(): IndustryDetail[] {
    return this.data.industries;
  }

  getCaseStudies(): CaseStudy[] {
    return this.data.caseStudies;
  }

  getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return this.data.caseStudies.find((c) => c.slug === slug);
  }

  getBlogs(): BlogPost[] {
    return this.data.blogs;
  }

  getBlogBySlug(slug: string): BlogPost | undefined {
    return this.data.blogs.find((b) => b.slug === slug);
  }
}

export const db = new DatabaseManager();
