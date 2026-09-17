export interface CaseStudyItem {
  id: string;
  slug: string;
  badge: string;
  client: string;
  industry: string;
  service: string;
  technology: string[];
  title: string;
  summary: string;
  challenge: string;
  context: string;
  approach: string;
  solution: string;
  implementation: string[];
  architectureOverview: string;
  architectureNodes: {
    layer: string;
    details: string;
  }[];
  outcome: {
    primaryMetric: string;
    primaryLabel: string;
    secondaryMetric: string;
    secondaryLabel: string;
    tertiaryMetric: string;
    tertiaryLabel: string;
  };
  verifiedMetrics: string[];
  lessons: string[];
  relatedCaseStudySlugs: string[];
  ctaText: string;
  cmsNotice: string;
}

export const caseStudiesList: CaseStudyItem[] = [
  {
    id: 'case-fintech-migration',
    slug: 'fintech-cloud-migration',
    badge: 'MISSION CRITICAL // FINANCIAL SERVICES',
    client: '[CMS CONTENT: Tier-1 Digital Banking Network]',
    industry: 'Financial Services',
    service: 'Cloud & DevOps',
    technology: [
      'Kubernetes (EKS)',
      'AWS Multi-Region',
      'Terraform Cloud',
      'Prometheus & OpenTelemetry',
      'Go & gRPC Microservices',
      'HashiCorp Vault',
    ],
    title: 'Multi-Region Active-Active Cloud Modernization Under Strict Zero-Loss Mandate',
    summary: 'Migrated $14B annual transaction processing volume from legacy co-located data centers into a resilient multi-region AWS and Kubernetes topology with continuous compliance verification.',
    challenge: 'The institution faced mounting infrastructure licensing overhead, localized single-point-of-failure risks during market opening volatility spikes, and an impending regulatory SOC 2 Type II audit timeline.',
    context: 'With over 4 million active accounts executing trades and payments, downtime or dropped transactions would incur severe financial penalties and reputational loss.',
    approach: 'We executed a zero-downtime strangler pattern migration, configuring automated cross-region database CDC pipelines and canary weighted traffic routing.',
    solution: 'Engineered an automated Infrastructure-as-Code pipeline deploying cross-region Kubernetes clusters with bidirectional asynchronous database synchronization, automated canary traffic routing, and strict zero-trust mTLS encryption across all service boundaries.',
    implementation: [
      'Phase 1: Automated Terraform Landing Zone deployment across us-east-1 and us-west-2.',
      'Phase 2: Bidirectional PostgreSQL streaming replication with sub-5ms replication lag monitoring.',
      'Phase 3: Automated canary DNS cutover with 1% traffic testing, scaling to 100% over 14 days.',
      'Phase 4: Automated disaster recovery chaos testing simulating complete regional failure.',
    ],
    architectureOverview: 'Active-Active Dual Region Kubernetes (EKS) mesh fronted by Route 53 latency routing and Envoy gateway proxies with automated cryptographic token verification.',
    architectureNodes: [
      { layer: 'Ingress Layer', details: 'AWS Route 53 with automated latency-based routing & health checks' },
      { layer: 'Compute Layer', details: 'Dual-region EKS clusters autoscaling via Karpenter' },
      { layer: 'Data Layer', details: 'Amazon Aurora Global Database with sub-second replication latency' },
      { layer: 'Security Layer', details: 'Zero-Trust mTLS service mesh enforced via Istio & HashiCorp Vault' },
    ],
    outcome: {
      primaryMetric: '0 ms',
      primaryLabel: 'Unplanned Outage During Cutover',
      secondaryMetric: '34%',
      secondaryLabel: 'Annual Cloud Compute Reduction',
      tertiaryMetric: '42 Days',
      tertiaryLabel: 'Accelerated SOC 2 Compliance Audit',
    },
    verifiedMetrics: [
      'Zero lost transactions over 300 million processed during cutover window',
      '34% sustained reduction in monthly infrastructure operating costs',
      'Under 15ms p99 transactional latency across North American endpoints',
    ],
    lessons: [
      'Continuous database CDC validation scripts prevented subtle schema mismatch issues prior to cutover.',
      'Investing in automated chaos testing early instilled executive confidence during final migration phases.',
    ],
    relatedCaseStudySlugs: ['healthcare-hipaa-ehr-modernization', 'manufacturing-iot-telemetry'],
    ctaText: 'View Case Study',
    cmsNotice: '[CMS CONTENT: Case study narrative and metrics are managed via CMS]',
  },
  {
    id: 'case-healthcare-hipaa',
    slug: 'healthcare-hipaa-ehr-modernization',
    badge: 'REGULATORY COMPLIANCE // HEALTHCARE',
    client: '[CMS CONTENT: Multi-State Hospital Network]',
    industry: 'Healthcare',
    service: 'Cybersecurity',
    technology: [
      'AWS HealthLake',
      'HL7 / FHIR Ingress',
      'Okta Identity Engine',
      'CrowdStrike Falcon',
      'Terraform',
      'PostgreSQL Encrypted',
    ],
    title: 'HIPAA-Compliant Zero-Trust Data Architecture for Distributed Clinical Systems',
    summary: 'Architected an airtight, end-to-end encrypted clinical record processing platform unifying 42 regional hospitals while maintaining 100% HIPAA and HITRUST compliance.',
    challenge: 'Fragmented on-premise medical databases prevented real-time clinical data sharing, exposing the network to ransomware threats and delayed patient charting.',
    context: 'The network handles over 120,000 daily clinical interactions across outpatient clinics, acute care hospitals, and telemedicine portals.',
    approach: 'Deployed zero-trust network micro-segmentation, hardware-backed MFA, and automated clinical FHIR ingestion pipelines with immutable audit logging.',
    solution: 'Constructed an encrypted medical data lake with cryptographic field-level tokenization for ePHI and automated role-based access controls for 14,000 healthcare practitioners.',
    implementation: [
      'Phase 1: Comprehensive clinical attack-surface audit and vulnerability remediation.',
      'Phase 2: FHIR-compliant API gateway rollout with strict TLS 1.3 encryption.',
      'Phase 3: Context-aware zero-trust authentication integration across all hospital workstations.',
      'Phase 4: Automated 365-day immutable compliance log archiving in air-gapped S3 Glacier vaults.',
    ],
    architectureOverview: 'Private VPC enclave connecting clinical workstations through dedicated AWS Direct Connect circuits, encrypted with AES-256 at rest and in transit.',
    architectureNodes: [
      { layer: 'Clinical Access', details: 'FIDO2 biometric MFA with context-aware workstation IP verification' },
      { layer: 'API Gateway', details: 'FHIR v4 standardized REST endpoints with field-level ePHI redaction' },
      { layer: 'Storage Layer', details: 'Encrypted multi-AZ data lake with continuous cryptographic integrity checks' },
      { layer: 'Auditing Layer', details: 'Immutable SIEM audit log forwarder with real-time anomaly alerting' },
    ],
    outcome: {
      primaryMetric: '100%',
      primaryLabel: 'First-Pass HIPAA & HITRUST Audit',
      secondaryMetric: '4.2x',
      secondaryLabel: 'Faster Clinical Record Lookup',
      tertiaryMetric: '0',
      tertiaryLabel: 'Security Breaches or ePHI Leaks',
    },
    verifiedMetrics: [
      '100% pass rate across third-party HITRUST CSF validation audit',
      'Average record retrieval time dropped from 12 seconds to 2.8 seconds',
      'Over 14,000 clinical staff onboarded with zero workflow interruption',
    ],
    lessons: [
      'Co-designing authentication flows with clinical nurse leads ensured security protocols did not impede emergency triage.',
    ],
    relatedCaseStudySlugs: ['fintech-cloud-migration', 'retail-ecommerce-flash-sale'],
    ctaText: 'View Case Study',
    cmsNotice: '[CMS CONTENT: Healthcare case study details verified under clinical confidentiality]',
  },
  {
    id: 'case-retail-ecommerce',
    slug: 'retail-ecommerce-flash-sale',
    badge: 'HIGH-CONCURRENCY SCALING // E-COMMERCE',
    client: '[CMS CONTENT: Omnichannel Luxury Retailer]',
    industry: 'Retail & E-commerce',
    service: 'Software Development',
    technology: [
      'Next.js',
      'Node.js Microservices',
      'Redis Enterprise',
      'Kafka Event Streaming',
      'Fastly Edge CDN',
      'Elasticsearch',
    ],
    title: 'Headless Commerce Architecture Engineered for 10x Holiday Traffic Surges',
    summary: 'Re-engineered legacy monolithic e-commerce storefront into a high-performance headless architecture capable of handling 85,000 concurrent checkout sessions with sub-second response times.',
    challenge: 'Previous holiday shopping seasons resulted in recurring database locks, delayed cart checkouts, and estimated lost revenue exceeding $2.8M.',
    context: 'The brand experiences 90% of its annual profitability during concentrated 72-hour Black Friday / Cyber Monday promotional periods.',
    approach: 'Decoupled frontend rendering from core inventory databases via edge caching, asynchronous order streaming via Apache Kafka, and distributed Redis locking.',
    solution: 'Designed an event-driven headless commerce platform with Next.js edge rendering, sub-100ms global search indexing, and resilient inventory reservation microservices.',
    implementation: [
      'Phase 1: Decoupling frontend into Next.js edge-rendered dynamic store templates.',
      'Phase 2: Redis distributed caching implementation for product catalog and pricing.',
      'Phase 3: Asynchronous order processing pipeline powered by Apache Kafka cluster.',
      'Phase 4: Synthetic load testing up to 250,000 virtual users across 6 global geographic regions.',
    ],
    architectureOverview: 'Edge-rendered frontend served via global CDN, communicating with auto-scaling containerized checkout pods and an asynchronous Kafka order bus.',
    architectureNodes: [
      { layer: 'Edge Layer', details: 'Fastly Edge compute with stale-while-revalidate catalog caching' },
      { layer: 'Frontend Layer', details: 'Next.js SSR application deployed across multi-region serverless nodes' },
      { layer: 'Message Bus', details: 'Apache Kafka cluster streaming orders into inventory reconciliation' },
      { layer: 'Database Layer', details: 'Distributed Redis Enterprise cluster with multi-master replication' },
    ],
    outcome: {
      primaryMetric: '280ms',
      primaryLabel: 'Global p95 Page Render Time',
      secondaryMetric: '100%',
      secondaryLabel: 'Checkout Uptime During Peak Surge',
      tertiaryMetric: '+44%',
      tertiaryLabel: 'Holiday Gross Merchandise Value',
    },
    verifiedMetrics: [
      'Zero downtime or checkout errors during 4-day peak promotional surge',
      'Mobile conversion rates increased by 31% due to sub-second load times',
      'Successfully processed 82,000 peak concurrent checkouts',
    ],
    lessons: [
      'Asynchronous order ingestion completely shields core relational databases from peak flash-sale surges.',
    ],
    relatedCaseStudySlugs: ['fintech-cloud-migration', 'manufacturing-iot-telemetry'],
    ctaText: 'View Case Study',
    cmsNotice: '[CMS CONTENT: E-commerce performance figures based on client production telemetry]',
  },
  {
    id: 'case-manufacturing-iot',
    slug: 'manufacturing-iot-telemetry',
    badge: 'INDUSTRIAL IOT // EDGE COMPUTING',
    client: '[CMS CONTENT: Precision Automotive Components Manufacturer]',
    industry: 'Manufacturing',
    service: 'IT Infrastructure',
    technology: [
      'Industrial IoT Gateways',
      'MQTT & OPC-UA',
      'TimescaleDB',
      'Kubernetes at Edge (K3s)',
      'Grafana Enterprise',
      'Python',
    ],
    title: 'Industrial IoT Edge Telemetry & Predictive Maintenance Across 14 Plants',
    summary: 'Integrated 3,200 industrial machines across 14 manufacturing facilities into a unified real-time telemetry mesh, reducing unplanned equipment downtime by 41%.',
    challenge: 'Unpredicted stamping press failures caused recurring production line halts, costly scrap material waste, and missed automotive supply chain deadlines.',
    context: 'Operating under just-in-time delivery contracts, unpredicted manufacturing shutdowns carried contractual penalties of $45,000 per hour.',
    approach: 'Installed edge compute gateways running lightweight containerized telemetry agents that capture vibration, temperature, and cycle time at 1,000 Hz.',
    solution: 'Built an air-gapped industrial edge ingestion platform that evaluates machine health locally while streaming aggregated telemetry to central cloud analytics.',
    implementation: [
      'Phase 1: Non-invasive sensor retrofitting on critical high-tonnage stamping presses.',
      'Phase 2: Edge gateway deployment running K3s with local failover memory buffers.',
      'Phase 3: Central time-series database ingestion cluster with sub-second anomaly detection.',
      'Phase 4: Plant technician mobile alert dispatch and automated work order creation.',
    ],
    architectureOverview: 'Industrial OT network safely bridged to enterprise IT via unidirectional data diodes and authenticated MQTT edge brokers.',
    architectureNodes: [
      { layer: 'Sensor Layer', details: 'Triaxial vibration and thermal sensors reading at 1 kHz frequency' },
      { layer: 'Edge Gateway', details: 'Hardened K3s edge clusters buffering data during plant WAN disconnects' },
      { layer: 'Data Diode', details: 'Hardware-enforced unidirectional optical isolator protecting OT systems' },
      { layer: 'Analytics Core', details: 'TimescaleDB cluster evaluating predictive maintenance degradation curves' },
    ],
    outcome: {
      primaryMetric: '41%',
      primaryLabel: 'Reduction in Unplanned Downtime',
      secondaryMetric: '$3.2M',
      secondaryLabel: 'Annual Scrap & Penalty Savings',
      tertiaryMetric: '14 Plants',
      tertiaryLabel: 'Fully Unified in 6 Months',
    },
    verifiedMetrics: [
      'Identified 28 catastrophic bearing failures before line stoppage occurred',
      'Zero unauthorized inbound access attempts through data diode boundary',
      'Return on initial engineering investment achieved in 94 days',
    ],
    lessons: [
      'Edge gateways must maintain minimum 72-hour local storage buffers to withstand intermittent rural plant network disconnects.',
    ],
    relatedCaseStudySlugs: ['fintech-cloud-migration', 'retail-ecommerce-flash-sale'],
    ctaText: 'View Case Study',
    cmsNotice: '[CMS CONTENT: Industrial IoT case study data based on client plant metrics]',
  },
];

export const featuredCaseStudy = caseStudiesList[0];
