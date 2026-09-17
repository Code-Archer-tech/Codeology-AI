export interface IndustryChallenge {
  problem: string;
  solution: string;
}

export interface IndustryCaseStudyPreview {
  client: string;
  headline: string;
  metric: string;
  metricLabel: string;
  summary: string;
  slug: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  headline: string;
  description: string;
  industryChallenge: string;
  keyArchitectures: string[];
  complianceStandards: string[];
  sampleDeliverable: string;
  impactMetric: string;
  impactLabel: string;
  challenges: IndustryChallenge[];
  techEcosystem: string[];
  whyCodeology: {
    title: string;
    description: string;
  }[];
  caseStudyPreview?: IndustryCaseStudyPreview;
  faqs: { question: string; answer: string }[];
  cmsNotice?: string;
}

export const industriesContent: IndustryItem[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    slug: 'healthcare',
    tagline: 'HIPAA-compliant cloud platforms and secure clinical interoperability.',
    headline: 'Clinical Reliability & HIPAA-Grade Security at Scale',
    description: 'Protect sensitive electronic Protected Health Information (ePHI) while modernizing legacy EHR synchronization, telehealth ingestion pipelines, and medical data governance.',
    industryChallenge: 'Healthcare organizations face strict regulatory penalties for data exposure while struggling with siloed on-premise records that slow clinical decision-making.',
    keyArchitectures: [
      'Encrypted Data Lakes & HL7/FHIR v4 Ingress',
      'Zero Trust Clinical Network Micro-Segmentation',
      'High-Availability Patient Portal Infrastructure',
      'Automated ePHI Field Tokenization Vaults',
    ],
    complianceStandards: ['HIPAA / HITECH', 'HITRUST CSF', 'SOC 2 Type II', 'FDA 21 CFR Part 11'],
    sampleDeliverable: 'Multi-clinic distributed EHR synchronization engine with instant audit logging.',
    impactMetric: '100%',
    impactLabel: 'HIPAA & Audit Readiness',
    challenges: [
      {
        problem: 'Siloed Electronic Health Record (EHR) systems cause delays in patient treatment pathways.',
        solution: 'We construct bidirectional HL7/FHIR v4 API gateways with real-time caching and strict field-level access governance.',
      },
      {
        problem: 'Ransomware threats and insider leaks targeting clinical workstation perimeters.',
        solution: 'Deploy hardware-backed FIDO2 MFA, micro-segmented subnets, and continuous behavioral anomaly telemetry.',
      },
      {
        problem: 'High compliance friction delaying the launch of modern telehealth portals.',
        solution: 'Automated Terraform landing zones pre-configured with HITRUST and HIPAA compliance controls and audit trails.',
      },
    ],
    techEcosystem: ['AWS HealthLake', 'Epic Systems EHR', 'Cerner FHIR', 'Okta Identity', 'HashiCorp Vault', 'CrowdStrike', 'PostgreSQL Encrypted'],
    whyCodeology: [
      {
        title: 'Deep Health Informatics Mastery',
        description: 'Our engineers have architected systems processing millions of clinical encounters across multi-state hospital systems.',
      },
      {
        title: 'Zero ePHI Exposure Guarantee',
        description: 'We enforce field-level cryptographic tokenization so operational engineers never see raw protected health records.',
      },
      {
        title: 'Audit-Ready Infrastructure as Code',
        description: 'Every infrastructure change generates immutable compliance evidence mapped directly to HIPAA and HITRUST requirements.',
      },
    ],
    caseStudyPreview: {
      client: '[CMS CONTENT: Multi-State Hospital Network]',
      headline: 'HIPAA-Compliant Zero-Trust Data Architecture for Distributed Clinical Systems',
      metric: '100%',
      metricLabel: 'First-Pass Audit Success',
      summary: 'Architected an end-to-end encrypted clinical record processing platform unifying 42 regional hospitals while maintaining airtight compliance.',
      slug: 'healthcare-hipaa-ehr-modernization',
    },
    faqs: [
      {
        question: 'Will Codeology AI sign a Business Associate Agreement (BAA)?',
        answer: 'Yes. Codeology AI executes formal BAAs for all healthcare and life sciences client engagements, guaranteeing HIPAA-compliant data handling practices.',
      },
      {
        question: 'How do you handle legacy EHR integrations like Epic or Cerner?',
        answer: 'We develop HL7/FHIR compliant middleware with bi-directional streaming queues that safely bridge legacy on-premise EHR installations with modern cloud platforms.',
      },
    ],
    cmsNotice: '[CMS CONTENT: Healthcare vertical standards and metrics managed via CMS]',
  },
  {
    id: 'financial-services',
    name: 'Financial Services & Banking',
    slug: 'financial-services',
    tagline: 'Low-latency multi-region architectures with banking-grade security perimeters.',
    headline: 'High-Throughput Financial Systems Engineered for Zero Downtime',
    description: 'Deliver sub-millisecond transaction routing, PCI-DSS compliance automation, and active-active multi-region resilience for payment systems and capital market exchanges.',
    industryChallenge: 'Financial institutions must safeguard against volatile market opening transaction spikes and sophisticated financial fraud while adhering to rigorous regulatory audits.',
    keyArchitectures: [
      'Active-Active Multi-Region Resiliency Mesh',
      'Distributed Ledger & Clearing Gateways',
      'Automated PCI-DSS Tokenization Vaults',
      'Sub-Millisecond Low-Latency Ingress Routing',
    ],
    complianceStandards: ['PCI-DSS Level 1', 'GLBA', 'SOC 2 Type II', 'ISO 27001', 'SEC Rule 17a-4'],
    sampleDeliverable: 'Real-time payment gateway mesh processing 25k transactions/second.',
    impactMetric: '99.999%',
    impactLabel: 'Core Banking Availability',
    challenges: [
      {
        problem: 'Legacy batch settlement processing delays money transfers and creates reconciliation errors.',
        solution: 'Architect event-driven Kafka and Apache Flink stream processing for sub-second real-time ledger updates.',
      },
      {
        problem: 'Vulnerability to localized cloud region outages during high-volatility market windows.',
        solution: 'Deploy active-active multi-region Kubernetes clusters with bidirectional database replication and sub-second failover.',
      },
      {
        problem: 'Strict PCI-DSS audits requiring extensive isolation of payment cardholder data environments (CDE).',
        solution: 'Implement tokenization microservices that isolate sensitive PAN data into dedicated, air-gapped cryptographic enclaves.',
      },
    ],
    techEcosystem: ['AWS Aurora Global', 'Apache Kafka', 'HashiCorp Vault', 'Kubernetes EKS', 'Datadog Financial', 'Go Microservices', 'Envoy Gateway'],
    whyCodeology: [
      {
        title: 'Proven at Sovereign Scale',
        description: 'Our architects have built clearing engines processing tens of billions in annual transaction volume with zero loss.',
      },
      {
        title: 'Zero Trust Financial Perimeters',
        description: 'Every internal financial microservice enforces mutual TLS cryptographic authentication and ephemeral access credentials.',
      },
      {
        title: 'Institutional Audit Facilitation',
        description: 'We interface directly with regulatory bodies and financial examiners during SOC 2 and PCI audits.',
      },
    ],
    caseStudyPreview: {
      client: '[CMS CONTENT: Global Digital Banking Network]',
      headline: 'Multi-Region Active-Active Cloud Modernization Under Strict Zero-Loss Mandate',
      metric: '0 ms',
      metricLabel: 'Unplanned Outage During Cutover',
      summary: 'Migrated $14B annual transaction processing volume into a resilient multi-region AWS and Kubernetes topology.',
      slug: 'fintech-cloud-migration',
    },
    faqs: [
      {
        question: 'How do you guarantee zero financial data loss during failover?',
        answer: 'We deploy synchronous consensus-backed distributed databases with automated idempotency keys, ensuring transactions are committed across multiple availability zones before acknowledgment.',
      },
      {
        question: 'Are your engineers vetted for financial security clearance?',
        answer: 'All assigned engineers undergo comprehensive criminal background checks, credit evaluations, and security clearance vetting under strict NDA.',
      },
    ],
    cmsNotice: '[CMS CONTENT: Financial services vertical content managed via CMS]',
  },
  {
    id: 'manufacturing',
    name: 'Industrial Manufacturing & IoT',
    slug: 'manufacturing',
    tagline: 'Industrial IoT integration, edge computing, and smart factory telemetry.',
    headline: 'Connected Industrial Plants & Resilient Predictive Maintenance',
    description: 'Bridge legacy Programmable Logic Controllers (PLCs) and Supervisory Control and Data Acquisition (SCADA) networks with resilient cloud data telemetry and predictive maintenance engines.',
    industryChallenge: 'Industrial facilities operate disparate machinery across remote plants, where unpredicted equipment failures cause catastrophic downtime and missed supply commitments.',
    keyArchitectures: [
      'Edge Gateway Ingestion with MQTT / OPC-UA',
      'Air-Gapped Operational Technology (OT) Networks',
      'Time-Series Predictive Maintenance Pipelines',
      'Hardware-Enforced Unidirectional Data Diodes',
    ],
    complianceStandards: ['ISO 9001', 'IEC 62443', 'NIST SP 800-82', 'OSHA Safety'],
    sampleDeliverable: 'Industrial IoT sensor data aggregation platform across 14 manufacturing plants.',
    impactMetric: '40%+',
    impactLabel: 'Unplanned Downtime Reduction',
    challenges: [
      {
        problem: 'Catastrophic stamping press or robotic arm failures halting manufacturing output.',
        solution: 'Deploy high-frequency vibration and thermal sensors paired with edge ML anomaly detection models.',
      },
      {
        problem: 'Severe cybersecurity risks when connecting plant OT networks to corporate IT.',
        solution: 'Install hardware data diodes and micro-segmented DMZ broker clusters allowing only outbound telemetry.',
      },
      {
        problem: 'Intermittent internet connectivity at rural manufacturing sites losing sensor data.',
        solution: 'Edge gateways running local persistent buffers capable of storing 72 hours of telemetry during network disconnects.',
      },
    ],
    techEcosystem: ['OPC-UA', 'MQTT Brokers', 'K3s Edge Kubernetes', 'TimescaleDB', 'Grafana Enterprise', 'Siemens PLC Connectors', 'Python ML'],
    whyCodeology: [
      {
        title: 'Deep Shop-Floor Realism',
        description: 'Our engineers understand industrial protocols, PLC cycle times, and the harsh physical realities of factory floors.',
      },
      {
        title: 'OT & IT Security Convergence',
        description: 'We protect physical production machinery with industrial-grade IEC 62443 cybersecurity architectures.',
      },
      {
        title: 'Demonstrated ROI in Under 90 Days',
        description: 'Predictive maintenance platforms frequently pay for themselves by catching a single catastrophic equipment failure.',
      },
    ],
    caseStudyPreview: {
      client: '[CMS CONTENT: Precision Automotive Components Manufacturer]',
      headline: 'Industrial IoT Edge Telemetry & Predictive Maintenance Across 14 Plants',
      metric: '41%',
      metricLabel: 'Downtime Reduction',
      summary: 'Integrated 3,200 industrial machines across 14 facilities into a unified telemetry mesh with predictive alerts.',
      slug: 'manufacturing-iot-telemetry',
    },
    faqs: [
      {
        question: 'Can your IoT solutions work with legacy machinery without built-in Ethernet?',
        answer: 'Yes. We utilize non-invasive external clamp sensors, current transducers, and RS-485 serial converters to capture telemetry without interfering with existing machine warranties.',
      },
    ],
    cmsNotice: '[CMS CONTENT: Manufacturing vertical telemetry verified via plant monitoring]',
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    slug: 'retail-ecommerce',
    tagline: 'Flash-sale resilience, omnichannel headless commerce, and inventory synchronization.',
    headline: 'High-Concurrency Commerce Architecture for Peak Traffic Surges',
    description: 'Ensure e-commerce infrastructure handles 10x traffic surges during seasonal shopping events with zero lag, instant search indexing, and real-time inventory reconciliation.',
    industryChallenge: 'E-commerce retailers lose millions when infrastructure crashes during Black Friday flash sales or inventory states desynchronize between warehouse and checkout.',
    keyArchitectures: [
      'Global Edge CDN Caching & Auto-Scaling',
      'Headless Commerce Microservices (Next.js/Node)',
      'Distributed Multi-Warehouse Inventory Mesh',
      'Real-Time Asynchronous Order Queueing',
    ],
    complianceStandards: ['PCI-DSS Level 1', 'GDPR', 'CCPA/CPRA', 'SOC 2 Type II'],
    sampleDeliverable: 'High-throughput inventory synchronization pipeline preventing stockouts.',
    impactMetric: '300ms',
    impactLabel: 'Global Page Load Time',
    challenges: [
      {
        problem: 'Checkout timeouts and database locking during high-profile holiday flash sales.',
        solution: 'Decouple checkout queueing via Apache Kafka and Redis distributed locks, absorbing 100k+ concurrent checkouts.',
      },
      {
        problem: 'Slow catalog search and navigation causing high mobile bounce rates.',
        solution: 'Edge-rendered Next.js storefronts paired with Elasticsearch clusters delivering sub-50ms instant search results.',
      },
      {
        problem: 'Overselling inventory across multiple retail channels and physical stores.',
        solution: 'Real-time event-driven inventory reconciliation reconciling stock across all retail nodes in sub-seconds.',
      },
    ],
    techEcosystem: ['Next.js', 'Redis Enterprise', 'Apache Kafka', 'Elasticsearch', 'Fastly Edge', 'Stripe Payments', 'PostgreSQL'],
    whyCodeology: [
      {
        title: 'Peak Load Architecture Veterans',
        description: 'We have stress-tested and supported e-commerce platforms generating hundreds of millions during peak shopping weekends.',
      },
      {
        title: 'Sub-Second Global Experience',
        description: 'We engineer edge-cached headless storefronts that drive quantifiable increases in mobile conversion rates.',
      },
      {
        title: 'Seamless ERP & Warehouse Integration',
        description: 'Deep integration with SAP, NetSuite, and 3PL fulfillment logistics ensures accurate inventory promises.',
      },
    ],
    caseStudyPreview: {
      client: '[CMS CONTENT: Omnichannel Luxury Retailer]',
      headline: 'Headless Commerce Architecture Engineered for 10x Holiday Traffic Surges',
      metric: '280ms',
      metricLabel: 'Page Render Time',
      summary: 'Re-engineered legacy storefront into a headless architecture handling 85,000 concurrent checkout sessions.',
      slug: 'retail-ecommerce-flash-sale',
    },
    faqs: [
      {
        question: 'How do you prevent bots from buying up limited flash inventory?',
        answer: 'We deploy edge bot mitigation (Cloudflare / Fastly) with behavioral biometric analysis, proof-of-work challenge verifications, and rate-limiting rules.',
      },
    ],
    cmsNotice: '[CMS CONTENT: Retail vertical data maintained via CMS repository]',
  },
  {
    id: 'education',
    name: 'Education & EdTech',
    slug: 'education',
    tagline: 'Scalable learning management systems and FERPA-compliant student data infrastructure.',
    headline: 'High-Concurrency Digital Learning Platforms Built for Scale',
    description: 'Modernize university and enterprise learning platforms with high-concurrency video delivery, automated grading microservices, and airtight student privacy safeguards.',
    industryChallenge: 'Educational institutions struggle to deliver reliable digital assessments to hundreds of thousands of concurrent students while safeguarding student privacy under FERPA.',
    keyArchitectures: [
      'Elastic Virtual Classroom Streaming Mesh',
      'FERPA-Compliant Student Data Partitioning',
      'Integrated LMS Analytics & Gradebook Engines',
      'Automated Exam Assessment Microservices',
    ],
    complianceStandards: ['FERPA', 'COPPA', 'ADA / Section 508 Accessibility', 'SOC 2 Type II'],
    sampleDeliverable: 'Statewide digital testing platform supporting 200,000 concurrent students.',
    impactMetric: '200k+',
    impactLabel: 'Concurrent Active Students',
    challenges: [
      {
        problem: 'LMS servers crashing during state-wide final exam windows.',
        solution: 'Deploy auto-scaling containerized examination microservices with isolated state snapshotting.',
      },
      {
        problem: 'Strict student data privacy regulations forbidding commercial data sharing.',
        solution: 'Implement FERPA-compliant isolated database schemas with strict zero-knowledge encryption.',
      },
      {
        problem: 'Inaccessible digital course materials failing Section 508 compliance.',
        solution: 'Conduct automated accessibility audits and engineer high-contrast WCAG 2.1 AA compliant UI frameworks.',
      },
    ],
    techEcosystem: ['Node.js', 'PostgreSQL', 'WebRTC Video Mesh', 'Redis', 'AWS Elemental', 'Docker', 'OpenEdX'],
    whyCodeology: [
      {
        title: 'Education at Sovereign Scale',
        description: 'Our platforms have powered state-wide testing initiatives for major educational boards and university consortia.',
      },
      {
        title: 'Accessibility First',
        description: 'Every interface is engineered to pass rigorous Section 508 and WCAG accessibility standards.',
      },
      {
        title: 'Uncompromising Student Privacy',
        description: 'Airtight compliance controls prevent unauthorized exposure of student academic records.',
      },
    ],
    faqs: [
      {
        question: 'How do your platforms comply with FERPA and COPPA?',
        answer: 'We implement role-based access control, tenant isolation, and cryptographic hashing so student identifiers are never exposed to unauthorized personnel or external services.',
      },
    ],
    cmsNotice: '[CMS CONTENT: Education vertical architecture managed via CMS]',
  },
  {
    id: 'technology',
    name: 'Technology & High-Growth SaaS',
    slug: 'technology',
    tagline: 'Cloud-native DevOps pipelines, developer platforms, and Kubernetes meshes.',
    headline: 'Developer Platforms & Scalable SaaS Multi-Tenant Architecture',
    description: 'Empower high-growth tech enterprises to accelerate release velocity, enforce automated security testing, and scale multi-tenant SaaS backends with minimal operational friction.',
    industryChallenge: 'Software companies struggle with slow deployment pipelines, mounting cloud compute bills, and engineering squads spending more time on DevOps toil than product features.',
    keyArchitectures: [
      'Developer Self-Service Internal Platforms (IDP)',
      'Multi-Tenant SaaS Database Partitioning',
      'Automated Vulnerability Scanning & Canary Routing',
      'FinOps Automated Spot Compute Fleet Management',
    ],
    complianceStandards: ['SOC 2 Type II', 'ISO 27001', 'Cloud Security Alliance (CSA)', 'GDPR'],
    sampleDeliverable: 'GitOps CI/CD delivery pipeline reducing build and deploy cycle from 4 hours to 8 minutes.',
    impactMetric: '8 min',
    impactLabel: 'Deploy Cycle Time',
    challenges: [
      {
        problem: 'Developer teams waiting hours for test suites and manual deployment approvals.',
        solution: 'Build automated GitOps pipelines with parallel test runners and canary verification gates.',
      },
      {
        problem: 'Uncontrolled multi-tenant database contention causing noisy-neighbor slowdowns.',
        solution: 'Implement tenant-level database sharding and connection pooling with dynamic query quotas.',
      },
      {
        problem: 'Spiraling AWS and GCP compute costs eroding SaaS gross margins.',
        solution: 'Deploy automated Karpenter spot orchestration and database rightsizing reducing cloud spend by 30%+.',
      },
    ],
    techEcosystem: ['Kubernetes', 'Terraform', 'ArgoCD', 'TypeScript', 'Go', 'Datadog', 'PostgreSQL', 'Redis'],
    whyCodeology: [
      {
        title: 'Built by Engineers for Engineers',
        description: 'We eliminate developer friction by building intuitive internal developer platforms (IDPs).',
      },
      {
        title: 'Production-Hardened Multi-Tenancy',
        description: 'Our architectures ensure airtight tenant data isolation while maintaining high compute density.',
      },
      {
        title: 'Rapid Velocity Without Breakage',
        description: 'We enable teams to ship code multiple times daily with automated canary rollbacks.',
      },
    ],
    faqs: [
      {
        question: 'How do you transition a company to GitOps?',
        answer: 'We declare all infrastructure and deployment configurations in Git repositories, utilizing ArgoCD or Flux to automatically synchronize live cluster states with code commits.',
      },
    ],
    cmsNotice: '[CMS CONTENT: Technology vertical blueprints managed via CMS]',
  },
  {
    id: 'professional-services',
    name: 'Professional & Legal Services',
    slug: 'professional-services',
    tagline: 'Zero trust remote workspaces, client document vaults, and operational workflow engines.',
    headline: 'Secure Client Vaults & Zero-Trust Knowledge Systems',
    description: 'Equip global legal, accounting, and consulting firms with secure collaboration environments, encrypted document storage, and automated billing workflows.',
    industryChallenge: 'Professional services firms handle confidential client work product across distributed workforces, creating acute vulnerabilities to phishing, data leaks, and lost billable hours.',
    keyArchitectures: [
      'Zero-Knowledge Client Document Vaults',
      'Secure Virtual Desktop Infrastructure (VDI)',
      'Integrated Time-Tracking & ERP Connectors',
      'AI-Powered Contract & Audit Synthesis',
    ],
    complianceStandards: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'ABA Cybersecurity Guidelines'],
    sampleDeliverable: 'Unified client engagement portal with automated engagement letter workflows.',
    impactMetric: '99.9%',
    impactLabel: 'Platform Availability',
    challenges: [
      {
        problem: 'Attorneys and consultants transmitting sensitive client documents via unencrypted email.',
        solution: 'Deploy client portals with end-to-end cryptographic envelope encryption and access expiration controls.',
      },
      {
        problem: 'Fragmented timekeeping and invoicing systems delaying monthly billing cycles.',
        solution: 'Build integrated workflow engines that capture billable work automatically from calendar and document activity.',
      },
      {
        problem: 'Firm exposure to spear-phishing campaigns targeting partner email accounts.',
        solution: 'Enforce hardware security key (FIDO2) authentication and automated inbound email sandbox analysis.',
      },
    ],
    techEcosystem: ['Microsoft 365 Enterprise', 'Okta Identity', 'Box Enterprise', 'AWS KMS', 'TypeScript', 'PostgreSQL'],
    whyCodeology: [
      {
        title: 'Confidentiality First',
        description: 'We design systems that protect privileged attorney-client and audit work product.',
      },
      {
        title: 'Frictionless Partner Workflows',
        description: 'Security controls are integrated seamlessly into everyday Microsoft and mobile workflows.',
      },
      {
        title: 'Accelerated Engagement Velocity',
        description: 'Automated engagement letters and client onboarding accelerate deal signing.',
      },
    ],
    faqs: [
      {
        question: 'Can client document vaults support client-managed encryption keys (CMEK)?',
        answer: 'Yes. We support Bring-Your-Own-Key (BYOK) architectures where clients retain exclusive ownership of the master cryptographic key material.',
      },
    ],
    cmsNotice: '[CMS CONTENT: Professional services vertical managed via CMS]',
  },
  {
    id: 'startups-smes',
    name: 'Startups & SMEs',
    slug: 'startups-smes',
    tagline: 'Capital-efficient cloud architecture, MVP engineering, and rapid hiring pods.',
    headline: 'Enterprise-Grade Foundations for High-Growth Startups',
    description: 'Provide venture-backed startups and growing businesses with enterprise-grade foundations without the enterprise bloat—from seed-stage architecture to Series B scaling.',
    industryChallenge: 'Startups need to ship rapidly to prove product-market fit, but incurring severe technical debt early creates security vulnerabilities and requires total rewrites upon scaling.',
    keyArchitectures: [
      'Modular TypeScript & React Architecture',
      'Managed Cloud Services (AWS / GCP / Supabase)',
      'Automated CI/CD & Testing Boilerplates',
      'Rapid Embedded Engineering Pods',
    ],
    complianceStandards: ['SOC 2 Baseline', 'GDPR Ready', 'OWASP Top 10 Standards'],
    sampleDeliverable: 'Complete production-grade SaaS architecture deployed from zero in 6 weeks.',
    impactMetric: '6 wks',
    impactLabel: 'Time to Production MVP',
    challenges: [
      {
        problem: 'Premature over-engineering draining seed funding and delaying customer validation.',
        solution: 'Construct clean, modular monoliths and managed serverless services that scale seamlessly without operational overhead.',
      },
      {
        problem: 'Prospective enterprise customers demanding SOC 2 compliance before signing pilots.',
        solution: 'Implement automated compliance tooling and baseline security controls from day one.',
      },
      {
        problem: 'Difficulty recruiting senior technical talent with limited hiring brand recognition.',
        solution: 'Provide embedded senior engineering pods that execute immediate product milestones while assisting in permanent team building.',
      },
    ],
    techEcosystem: ['Next.js', 'TypeScript', 'PostgreSQL / Supabase', 'Tailwind CSS', 'Vercel / AWS', 'GitHub Actions', 'Stripe'],
    whyCodeology: [
      {
        title: 'Capital-Efficient Delivery',
        description: 'We prioritize architectures that minimize recurring cloud spend and eliminate unnecessary complexity.',
      },
      {
        title: 'Built to Scale to Series B',
        description: 'Code and infrastructure written cleanly so your growing internal team can take over effortlessly.',
      },
      {
        title: 'High-Impact Speed',
        description: 'We turn architectural designs into deployed production code in weeks, not quarters.',
      },
    ],
    faqs: [
      {
        question: 'Do you work with early-stage pre-seed and seed startups?',
        answer: 'Yes. We frequently partner with funded early-stage startups to build their core MVP architecture and prepare for enterprise pilot deployments.',
      },
    ],
    cmsNotice: '[CMS CONTENT: Startup vertical blueprints managed via CMS]',
  },
];
