export interface SolutionItem {
  number: string;
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: 'Server' | 'Cloud' | 'ShieldCheck' | 'Code2' | 'Cpu' | 'TrendingUp' | 'Users' | 'Sparkles';
  capabilities: string[];
  metricsPreview?: string;
  featured?: boolean;
}

export const solutionsContent: SolutionItem[] = [
  {
    number: '01',
    id: 'it-infrastructure',
    slug: 'it-infrastructure',
    title: 'IT Infrastructure',
    shortDescription: 'Resilient multi-site networking, 24/7 NOC oversight, and high-availability enterprise hardware lifecycle management.',
    fullDescription: 'We design, provision, and maintain mission-critical enterprise systems. From hybrid virtualization to automated backup failovers, our infrastructure guarantees continuous operational continuity.',
    iconName: 'Server',
    capabilities: [
      '24/7/365 Global NOC Monitoring',
      'SD-WAN & Zero-Downtime Networking',
      'Virtualization & SAN Topologies',
      'Automated Disaster Recovery Orchestration',
    ],
    metricsPreview: '99.99% Uptime Guarantee',
    featured: true,
  },
  {
    number: '02',
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortDescription: 'Multi-cloud architectures, Kubernetes orchestration, GitOps automation, and FinOps cost governance.',
    fullDescription: 'Accelerate release velocity while cutting cloud expenditures across AWS, Azure, and GCP through automated Infrastructure-as-Code and production-grade container meshes.',
    iconName: 'Cloud',
    capabilities: [
      'AWS / Azure / GCP Landing Zones',
      'Multi-Cluster Kubernetes (EKS/AKS/GKE)',
      'Automated CI/CD with GitOps',
      'FinOps Infrastructure Cost Optimization',
    ],
    metricsPreview: '32% Avg Cloud Savings',
  },
  {
    number: '03',
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    shortDescription: 'Managed Detection and Response (MDR), Zero Trust network architecture, and audit-ready compliance frameworks.',
    fullDescription: 'Comprehensive defense-in-depth security protecting corporate data, cloud workloads, and identity perimeters against sophisticated threat vectors with guaranteed rapid incident response.',
    iconName: 'ShieldCheck',
    capabilities: [
      'Managed Detection & Response (MDR)',
      'Zero Trust Network Access (ZTNA)',
      'SOC 2 Type II, ISO 27001 & HIPAA Readiness',
      'Continuous Penetration Testing',
    ],
    metricsPreview: '<15 Min Incident Response',
    featured: true,
  },
  {
    number: '04',
    id: 'software-engineering',
    slug: 'software-development',
    title: 'Software Development',
    shortDescription: 'High-throughput distributed systems, secure cloud-native microservices, and enterprise web applications.',
    fullDescription: 'Custom engineering teams constructing durable, test-driven systems in TypeScript, Go, Python, and modern React with strict architecture governance.',
    iconName: 'Code2',
    capabilities: [
      'Distributed Microservices Architecture',
      'API Gateway & Event-Driven Systems',
      'Cloud-Native SaaS Application Build',
      'High-Concurrency Database Optimization',
    ],
    metricsPreview: '90%+ Automated Test Coverage',
  },
  {
    number: '05',
    id: 'digital-transformation',
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    shortDescription: 'Modernizing legacy monoliths, connecting enterprise ERPs, and automating manual business workflows.',
    fullDescription: 'De-risk legacy migration with proven parallel-run architectures, event-driven data streaming, and automated operational orchestration.',
    iconName: 'Cpu',
    capabilities: [
      'Monolith-to-Microservices Refactoring',
      'Legacy Mainframe Modernization',
      'Enterprise ERP & CRM Integration',
      'Workflow Process Automation',
    ],
    metricsPreview: 'Zero Data Loss Migration',
  },
  {
    number: '06',
    id: 'digital-growth',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'Technical B2B search architecture, account-based demand engines, and revenue operations analytics.',
    fullDescription: 'Combine rigorous engineering with growth marketing to construct measurable acquisition pipelines, search dominance, and digital market expansion.',
    iconName: 'TrendingUp',
    capabilities: [
      'Enterprise Technical SEO Architecture',
      'Account-Based Marketing (ABM) Infrastructure',
      'Multi-Touch Attribution Analytics',
      'Conversion Rate Architecture',
    ],
    metricsPreview: '3.4x Pipeline Velocity',
  },
  {
    number: '07',
    id: 'recruitment-staffing',
    slug: 'recruitment-staffing',
    title: 'Recruitment & Staffing',
    shortDescription: 'Embedded Recruitment Process Outsourcing (RPO), specialized engineering pods, and executive talent search.',
    fullDescription: 'Scale elite technology squads rapidly with our vetted engineering talent pools, proprietary skill evaluation workflows, and dedicated recruitment pods.',
    iconName: 'Users',
    capabilities: [
      'Embedded Technical RPO Partnerships',
      'Pre-Vetted Senior Engineering Pods',
      'Executive Technology Search',
      'Contract-to-Hire & Managed Teams',
    ],
    metricsPreview: '14-Day Median Time-to-Hire',
    featured: true,
  },
  {
    number: '08',
    id: 'ai-solutions',
    slug: 'ai-solutions',
    title: 'AI Solutions',
    shortDescription: 'Enterprise LLM deployments, retrieval-augmented generation (RAG), and proprietary operational intelligence.',
    fullDescription: 'Deploy production AI architectures that integrate seamlessly with existing enterprise data lakes while strictly safeguarding data privacy and security perimeters.',
    iconName: 'Sparkles',
    capabilities: [
      'Enterprise RAG & Knowledge Retrieval',
      'Private LLM Hosting & Fine-Tuning',
      'Autonomous Workflow Agents',
      'AI Governance, Safety & Auditing',
    ],
    metricsPreview: 'SOC 2 Compliant AI Enclaves',
  },
];
