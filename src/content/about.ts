export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  practice: string;
  bio: string;
  initials: string;
  credentials: string[];
}

export interface CompanyValue {
  id: string;
  number: string;
  title: string;
  statement: string;
  elaboration: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  metric?: string;
}

export const aboutContent = {
  hero: {
    headline: 'Technology is our craft.\nBusiness impact is the goal.',
    supporting:
      'Codeology AI was founded by systems engineers and infrastructure architects with a singular thesis: mission-critical enterprise systems require uncompromising technical rigor, human-in-the-loop integrity, and long-term partnership.',
    badge: 'ABOUT CODEOLOGY AI // ARCHITECTURE & TALENT',
  },

  whoWeAre: {
    title: 'Engineered for reliability. Proven in production.',
    paragraph1:
      'We are an enterprise technology advisory and engineering firm specializing in high-availability cloud infrastructure, zero-trust cybersecurity, custom software platforms, and specialized technical talent pods.',
    paragraph2:
      'Unlike generic IT agencies that rely on layers of non-technical project management, every Codeology AI engagement is steered directly by senior systems architects who have spent decades defending networks, deploying distributed clusters, and shipping enterprise software at scale.',
  },

  approach: {
    title: 'The Codeology AI Engineering Standard',
    principles: [
      {
        title: 'Rigorous Architecture Discovery',
        description:
          'We do not write code or provision infrastructure until failure modes, compliance thresholds, and data sovereignty boundaries are rigorously analyzed.',
      },
      {
        title: 'Infrastructure as Reproducible Code',
        description:
          'Every subnet, IAM policy, and database cluster is defined in version-controlled, peer-reviewed declarative code with zero manual click-ops.',
      },
      {
        title: 'Defense in Depth by Default',
        description:
          'Security is never an afterthought or audit-week scramble. Cryptographic mTLS, least-privilege RBAC, and immutable audit logs are built into the foundational layer.',
      },
      {
        title: 'Transparent Technical Governance',
        description:
          'We provide our client partners with direct access to architecture repositories, test coverage telemetry, and live status dashboards with zero gatekeeping.',
      },
    ],
  },

  values: [
    {
      id: 'val-1',
      number: '01',
      title: 'Customer First',
      statement: 'We measure success solely by our clients’ production uptime, security posture, and business leverage.',
      elaboration: 'We reject vendor lock-in and opaque proprietary wrappers. Our architectures empower clients to operate independently and scale autonomously.',
    },
    {
      id: 'val-2',
      number: '02',
      title: 'Engineering Excellence',
      statement: 'Craftsmanship over shortcuts. Durable design over temporary workarounds.',
      elaboration: 'We adhere strictly to test-driven engineering, comprehensive automated testing, and clean, self-documenting architectures that withstand team transitions.',
    },
    {
      id: 'val-3',
      number: '03',
      title: 'Security by Design',
      statement: 'Assume compromise. Verify cryptographically at every network boundary.',
      elaboration: 'Zero Trust is not a buzzword in our engineering vocabulary—it is an enforced operational protocol across all identity providers, APIs, and data stores.',
    },
    {
      id: 'val-4',
      number: '04',
      title: 'Continuous Learning',
      statement: 'The technological landscape evolves relentlessly; our mastery must outpace it.',
      elaboration: 'We invest deeply in research, open-source contribution, and rigorous certification across emerging cloud, AI, and defensive security frontiers.',
    },
    {
      id: 'val-5',
      number: '05',
      title: 'Accountability',
      statement: 'Ownership of outcomes from the initial design whiteboard through production deployment.',
      elaboration: 'When unforeseen challenges emerge in high-load production, our engineers stand shoulder-to-shoulder with client teams until resolution is complete.',
    },
    {
      id: 'val-6',
      number: '06',
      title: 'Long-Term Thinking',
      statement: 'We construct architectures designed to perform reliably for the next decade, not just the next sprint.',
      elaboration: 'Sustainable systems architecture prioritizes clean abstractions, predictable cost models, and straightforward maintainability.',
    },
  ] as CompanyValue[],

  leadership: [
    {
      id: 'lead-1',
      name: 'David Sterling',
      role: 'Chief Technology Officer & Co-Founder',
      practice: 'Systems Architecture & Infrastructure',
      bio: 'Former principal infrastructure architect with 22+ years guiding mission-critical migrations for Global 100 financial clearinghouses and healthcare hospital systems.',
      initials: 'DS',
      credentials: ['AWS Solutions Architect Pro', 'CISSP', 'M.S. Computer Engineering'],
    },
    {
      id: 'lead-2',
      name: 'Arthur Bradley',
      role: 'Director of Information Security',
      practice: 'Cybersecurity & Compliance',
      bio: 'Specialist in defensive cybersecurity, active adversary emulation, and SOC 2 / ISO 27001 regulatory compliance orchestration across distributed enterprise networks.',
      initials: 'AB',
      credentials: ['CISM', 'OSCP', 'GIAC Certified Forensic Analyst'],
    },
    {
      id: 'lead-3',
      name: 'Elena Rostova',
      role: 'VP of Cloud & DevOps Engineering',
      practice: 'Cloud & Distributed Systems',
      bio: 'Pioneered early Kubernetes enterprise implementations and multi-region failover protocols, managing cloud infrastructure portfolios exceeding $40M annual spend.',
      initials: 'ER',
      credentials: ['Certified Kubernetes Administrator', 'Google Cloud Fellow', 'FinOps Certified'],
    },
    {
      id: 'lead-4',
      name: 'Marcus Vance',
      role: 'Head of Technical Talent & Operations',
      practice: 'Executive Recruitment & Staffing',
      bio: 'Built engineering teams across three high-growth unicorn tech startups, establishing ethical assessment criteria and specialized engineering talent pipelines.',
      initials: 'MV',
      credentials: ['SHRM-SCP', 'Tech Hiring Fellow', 'B.S. Industrial Psychology'],
    },
    {
      id: 'lead-5',
      name: 'Dr. Aris Thorne',
      role: 'Principal AI & Data Architect',
      practice: 'Enterprise AI & Machine Learning',
      bio: 'Specializes in private LLM deployment, high-throughput vector databases, and ethical AI governance for heavily regulated healthcare and financial institutions.',
      initials: 'AT',
      credentials: ['Ph.D. Machine Learning (Stanford)', 'NeurIPS Contributor', 'IEEE AI Ethics'],
    },
  ] as LeaderProfile[],

  timeline: [
    {
      year: '2016',
      title: 'Founding & Network Operations Center',
      description: 'Founded in San Francisco by senior systems engineers providing 24/7 dedicated NOC and infrastructure oversight.',
      metric: 'Initial 10 Enterprise Clients',
    },
    {
      year: '2019',
      title: 'Multi-Cloud & Kubernetes Practice Launch',
      description: 'Expanded practice into automated cloud migrations and GitOps container orchestration across AWS and GCP.',
      metric: '100% Client Uptime Track Record',
    },
    {
      year: '2021',
      title: 'Cybersecurity & Compliance Division',
      description: 'Established the dedicated defensive cybersecurity division, introducing Managed Detection & Response (MDR).',
      metric: 'SOC 2 Type II Certified',
    },
    {
      year: '2023',
      title: 'Global Talent Network & RPO Practice',
      description: 'Formalized specialized engineering recruitment pods and technical screening infrastructure.',
      metric: '350+ Placed Tech Leaders',
    },
    {
      year: '2026',
      title: 'Enterprise AI Enclaves & Modern Scale',
      description: 'Launched privacy-first private AI enclaves and high-throughput vector search infrastructure for regulated verticals.',
      metric: '350+ Completed Enterprise Projects',
    },
  ] as TimelineMilestone[],
};

export const aboutLeadership = [
  {
    name: 'David Sterling',
    title: 'Chief Technology Officer & Co-Founder',
    domain: 'Distributed Systems & Infrastructure',
    bio: 'Ex-VP of Distributed Systems at major hyperscaler; 22+ years architecting high-reliability backplanes and multi-region infrastructure.',
    pedigree: 'Global 100 Financial & Healthcare Architect',
  },
  {
    name: 'Arthur Bradley',
    title: 'Director of Information Security',
    domain: 'Zero Trust & Offensive Security',
    bio: 'Specialist in defensive cybersecurity, active adversary emulation, and SOC 2 / ISO 27001 regulatory compliance orchestration across distributed enterprise networks.',
    pedigree: 'CISSP, OSCP, GIAC Forensic Analyst',
  },
  {
    name: 'Elena Rostova',
    title: 'VP of Cloud & DevOps Engineering',
    domain: 'Kubernetes & Multi-Cloud',
    bio: 'Former principal SRE lead; pioneer in Kubernetes zero-downtime mesh deployments, multi-region failovers, and automated enterprise FinOps.',
    pedigree: 'Google Cloud Fellow, CKA, FinOps Certified',
  },
  {
    name: 'Marcus Vance',
    title: 'Head of Technical Talent & Operations',
    domain: 'Talent Acquisition & Technical RPO',
    bio: 'Built engineering teams across three high-growth unicorn tech startups, establishing ethical assessment criteria and specialized engineering talent pipelines.',
    pedigree: 'SHRM-SCP, 350+ Senior Placements',
  },
];

export const aboutPrinciples = [
  {
    title: 'Architecture Over Hype',
    motto: 'Substance over speculative trends',
    description: 'We prioritize mathematically sound systems architecture, verifiable SLAs, and proven operational resilience over ephemeral market fads.',
  },
  {
    title: 'Precision Over Velocity',
    motto: 'Moving fast requires unshakeable foundations',
    description: 'Hasty deployment without automated testing or security attestation is technical debt in disguise. We build with mathematical precision.',
  },
  {
    title: 'Transparency Over Polish',
    motto: 'Direct telemetry, zero spin',
    description: 'We provide our client partners with unrestricted access to code repositories, test coverage telemetry, and live status dashboards with zero gatekeeping.',
  },
  {
    title: 'Reliability Over Novelty',
    motto: 'Boring technology that runs forever',
    description: 'When operating high-concurrency payment clearinghouses or patient EHRs, we deploy proven, rock-solid technologies designed for decadal durability.',
  },
];

export const companyMilestones = [
  {
    year: '2016',
    title: 'Founding & NOC Inception',
    highlight: 'San Francisco, CA',
    description: 'Founded by senior systems engineers to provide carrier-grade 24/7 infrastructure and NOC monitoring.',
  },
  {
    year: '2019',
    title: 'Multi-Cloud & Kubernetes Practice',
    highlight: 'Zero-Downtime Milestones',
    description: 'Scaled practice into automated cloud migrations, Terraform infrastructure-as-code, and GitOps pipelines.',
  },
  {
    year: '2021',
    title: 'Zero Trust Cybersecurity Division',
    highlight: 'SOC 2 & ISO 27001 Certified',
    description: 'Launched managed detection and response (MDR), threat hunting, and compliance audit frameworks.',
  },
  {
    year: '2023',
    title: 'Embedded Technical RPO & Talent Pods',
    highlight: 'Global Talent Network',
    description: 'Introduced specialized technical staffing squads screened exclusively by practicing senior architects.',
  },
  {
    year: '2026',
    title: 'Enterprise AI & Modern Scale',
    highlight: '350+ Enterprise Deployments',
    description: 'Pioneered private VPC vector search and air-gapped LLM deployments for regulated enterprises worldwide.',
  },
];

