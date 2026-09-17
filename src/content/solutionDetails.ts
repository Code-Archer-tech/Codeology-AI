export interface SolutionProcessStage {
  step: string;
  name: string;
  description: string;
}

export interface SolutionCapabilityCategory {
  title: string;
  description: string;
  items: string[];
}

export interface SolutionArchitectureLayer {
  name: string;
  tagline: string;
  components: string[];
}

export interface SolutionDetailData {
  slug: string;
  aliases?: string[];
  number: string;
  title: string;
  tagline: string;
  heroHeadline: string;
  shortDescription: string;
  longOverview: string;
  strategicPillars: {
    title: string;
    description: string;
  }[];
  capabilitiesCategories: SolutionCapabilityCategory[];
  processStages: SolutionProcessStage[];
  processTitle?: string;
  architectureType: 'network' | 'cloud' | 'security-layers' | 'software-stack' | 'transformation-framework' | 'marketing-funnel' | 'hiring-pipeline' | 'ai-workflow';
  architectureLayers: SolutionArchitectureLayer[];
  techStackCategories: {
    category: string;
    technologies: string[];
  }[];
  keyBenefits: {
    metric: string;
    label: string;
    description: string;
  }[];
  caseStudySlug?: string;
  specialNotice?: string;
  faqKey: string;
}

export const solutionDetailsMap: Record<string, SolutionDetailData> = {
  'it-infrastructure': {
    slug: 'it-infrastructure',
    number: '01',
    title: 'IT Infrastructure & Operations',
    tagline: 'High-availability multi-site networking, 24/7 NOC oversight, and lifecycle resilience.',
    heroHeadline: 'Mission-Critical IT Infrastructure Engineered for Maximum Uptime',
    shortDescription:
      'We design, provision, and maintain mission-critical enterprise systems. From hybrid virtualization to automated disaster recovery, our infrastructure guarantees continuous operational continuity.',
    longOverview:
      'Enterprise operations cannot afford network outages, unmonitored server degradations, or lost backup snapshots. Codeology AI delivers carrier-grade infrastructure strategy, managed network fabrics, server virtualization, and 24/7/365 Network Operations Center (NOC) vigilance.',
    strategicPillars: [
      {
        title: 'Infrastructure Strategy',
        description: 'Comprehensive capacity planning, topology blueprints, and hardware refresh roadmaps aligned with corporate scale.',
      },
      {
        title: 'Network Management',
        description: 'Software-defined WAN (SD-WAN), multi-gigabit routing, and redundant BGP transit connections.',
      },
      {
        title: 'Server & Systems Management',
        description: 'Bare-metal lifecycle management, hypervisors (VMware/Nutanix/Proxmox), and automated OS patching.',
      },
      {
        title: 'Database & Storage Management',
        description: 'High-throughput SAN/NAS topologies, distributed storage replication, and database health optimization.',
      },
      {
        title: 'Infrastructure Monitoring & NOC',
        description: '24/7 proactive telemetry with 15-minute response SLAs and automated incident escalation runbooks.',
      },
      {
        title: 'Backup & Disaster Recovery',
        description: 'Automated air-gapped snapshots, automated recovery point testing, and sub-15 minute RTO failovers.',
      },
    ],
    capabilitiesCategories: [
      {
        title: 'Core Systems & Virtualization',
        description: 'Enterprise compute clusters engineered for continuous density and automated failover.',
        items: ['VMware vSphere & Nutanix HCI', 'Linux & Windows Server Hardening', 'Automated Patch Management Orchestration', 'Capacity & Thermal Telemetry'],
      },
      {
        title: 'Network Fabrics & Telecommunications',
        description: 'High-availability routing across campus, data center, and edge environments.',
        items: ['Multi-Site SD-WAN Topologies', 'Arista & Cisco Core Switching', 'Zero-Loss BGP Multi-Homed Routing', 'High-Density Enterprise Wi-Fi 6E/7'],
      },
      {
        title: 'Resilience & Business Continuity',
        description: 'Deterministic backup verification and disaster recovery orchestration.',
        items: ['Immutable Ransomware-Proof Backups', 'Veeam & Cohesity Enterprise Pipelines', 'Cold/Warm/Hot Disaster Recovery Sites', 'Simulated Failover Chaos Drills'],
      },
    ],
    processTitle: 'The 5-Stage Infrastructure Lifecycle',
    processStages: [
      { step: '01', name: 'Assess', description: 'Comprehensive audit of physical hardware, network bandwidth, topology choke-points, and backup hygiene.' },
      { step: '02', name: 'Design', description: 'Engineering fault-tolerant target architecture with N+1 redundancy, automated failover, and compliance controls.' },
      { step: '03', name: 'Implement', description: 'Staged migration and hardware provisioning with zero disruption to active business operations.' },
      { step: '04', name: 'Monitor', description: 'Continuous 24/7/365 NOC observation tracking synthetic latency, resource saturation, and hardware warnings.' },
      { step: '05', name: 'Optimize', description: 'Quarterly architecture reviews to right-size compute, prune legacy storage, and lower ongoing operating expense.' },
    ],
    architectureType: 'network',
    architectureLayers: [
      { name: 'Core Ingress', tagline: 'Redundant Multi-Carrier Fiber & SD-WAN', components: ['BGP Transit Gateways', 'Carrier Redundancy', 'DDoS Edge Filtering'] },
      { name: 'Fabric Switching', tagline: '100GbE Spine-Leaf Data Center Topology', components: ['Arista Spine Switches', 'L2/L3 Leaf Routing', 'VLAN Micro-Segmentation'] },
      { name: 'Hyperconverged Compute', tagline: 'Clustered Virtualization & Containers', components: ['VMware ESXi Nodes', 'Nutanix AHV Clustered', 'Kubernetes Bare-Metal'] },
      { name: 'Resilient Storage', tagline: 'NVMe All-Flash SAN & Immutable Air-Gap', components: ['Pure Storage All-Flash', 'Air-Gapped S3 Vaults', 'Automated Replication Engine'] },
    ],
    techStackCategories: [
      { category: 'Networking', technologies: ['Cisco Enterprise', 'Arista Networks', 'Fortinet SD-WAN', 'Palo Alto Networks'] },
      { category: 'Virtualization & OS', technologies: ['VMware vSphere', 'Nutanix HCI', 'Red Hat Enterprise Linux', 'Windows Server'] },
      { category: 'Storage & Backup', technologies: ['Pure Storage', 'NetApp', 'Veeam Enterprise', 'Cohesity', 'AWS Storage Gateway'] },
      { category: 'Monitoring & NOC', technologies: ['Datadog', 'Zabbix', 'Prometheus', 'PagerDuty', 'Grafana'] },
    ],
    keyBenefits: [
      { metric: '99.99%', label: 'Infrastructure Availability', description: 'High-availability clusters eliminating single points of failure.' },
      { metric: '<15 min', label: 'Critical Incident SLA', description: 'Guaranteed 24/7 response time from certified NOC engineers.' },
      { metric: '100%', label: 'Air-Gapped Backup Fidelity', description: 'Cryptographically verified immutable backup vaults.' },
    ],
    caseStudySlug: 'manufacturing-iot-telemetry',
    faqKey: 'it-infrastructure',
  },

  'cloud-devops': {
    slug: 'cloud-devops',
    aliases: ['cloud'],
    number: '02',
    title: 'Cloud & DevOps Engineering',
    tagline: 'Multi-cloud architectures, Kubernetes orchestration, GitOps automation, and FinOps cost governance.',
    heroHeadline: 'High-Velocity Cloud Architecture & Automated GitOps Engineering',
    shortDescription:
      'Accelerate release velocity while cutting cloud expenditures across AWS, Azure, and GCP through automated Infrastructure-as-Code, container meshes, and FinOps governance.',
    longOverview:
      'Modern enterprise software delivery demands immutable infrastructure, declarative deployments, and continuous security automation. Codeology AI transforms legacy compute into automated cloud-native platforms that deploy multiple times daily with zero downtime.',
    strategicPillars: [
      { title: 'Cloud Strategy & Advisory', description: 'Total cost of ownership (TCO) assessments, multi-cloud governance, and migration feasibility studies.' },
      { title: 'Zero-Downtime Migration', description: 'Re-platforming and refactoring legacy monoliths using the strangler fig application pattern and CDC pipelines.' },
      { title: 'Kubernetes & Containers', description: 'Multi-cluster EKS/AKS/GKE topologies with automated service meshes, ingress proxies, and auto-scaling.' },
      { title: 'GitOps & CI/CD Pipelines', description: 'Declarative Git-driven deployments via ArgoCD, automated test suites, and canary verification gates.' },
      { title: 'Infrastructure as Code (IaC)', description: 'Modular, version-controlled Terraform, OpenTofu, and Pulumi templates with automated drift detection.' },
      { title: 'FinOps Cost Optimization', description: 'Automated spot fleet orchestration, rightsizing algorithms, and reserved commitment modeling cutting bills by 30%+.' },
    ],
    capabilitiesCategories: [
      {
        title: 'Multi-Cloud Architecture',
        description: 'Landing zones architected against the AWS Well-Architected Framework and Azure Cloud Adoption Framework.',
        items: ['Multi-Account Organizations (AWS Control Tower / Azure Management Groups)', 'Cross-Cloud Transit Gateways & Private Interconnects', 'Active-Active Multi-Region Resiliency', 'Zero-Egress Data Locality Governance'],
      },
      {
        title: 'Containerization & Orchestration',
        description: 'Production-grade Kubernetes clusters engineered for high density and rapid elasticity.',
        items: ['Amazon EKS, Azure AKS & Google Cloud GKE', 'Istio & Linkerd Service Meshes', 'Karpenter Autoscaling Compute Nodes', 'Cilium eBPF High-Performance Networking'],
      },
      {
        title: 'Continuous Delivery Automation',
        description: 'Automated pipelines moving code from commit to production with mathematical confidence.',
        items: ['ArgoCD & Flux Declarative GitOps', 'GitHub Actions & GitLab CI Enterprise', 'Automated Semantic Versioning & Artifact Registries', 'Canary & Blue/Green Zero-Downtime Cutover'],
      },
    ],
    processTitle: 'The 5-Stage Cloud Transformation Process',
    processStages: [
      { step: '01', name: 'Discover', description: 'Inventory applications, dependencies, network egress flows, and database transaction volumes.' },
      { step: '02', name: 'Architect', description: 'Author formal Cloud Architecture Decision Records (ADRs) with high-availability landing zones.' },
      { step: '03', name: 'Migrate', description: 'Execute staged migrations with automated database CDC streaming and zero operational downtime.' },
      { step: '04', name: 'Automate', description: 'Deploy GitOps pipelines, automated compliance scanning, and synthetic monitoring probes.' },
      { step: '05', name: 'Optimize', description: 'Implement continuous FinOps governance, spot instance automation, and cost anomaly alerts.' },
    ],
    architectureType: 'cloud',
    architectureLayers: [
      { name: 'Global DNS & Edge', tagline: 'Route 53 Latency Ingress & Fastly CDN', components: ['Anycast DNS Routing', 'WAF Edge Protection', 'DDoS Shield Advanced'] },
      { name: 'Compute Cluster', tagline: 'Multi-Region Kubernetes (EKS / AKS)', components: ['Karpenter Autoscaler', 'Cilium eBPF Network', 'Istio Service Mesh'] },
      { name: 'Continuous Delivery', tagline: 'GitOps Declarative Pipeline', components: ['ArgoCD Synchronization', 'GitHub Actions Runners', 'HashiCorp Vault Secrets'] },
      { name: 'Distributed Data', tagline: 'Multi-AZ Database & Cache Tier', components: ['Aurora Global Database', 'Redis Cluster Caching', 'S3 Intelligent Tiering'] },
    ],
    techStackCategories: [
      { category: 'Cloud Providers', technologies: ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud Platform (GCP)'] },
      { category: 'Containers & Mesh', technologies: ['Kubernetes (EKS/AKS/GKE)', 'Docker', 'Istio', 'Cilium', 'Helm'] },
      { category: 'IaC & Automation', technologies: ['Terraform', 'OpenTofu', 'Pulumi', 'Ansible', 'ArgoCD'] },
      { category: 'Observability & FinOps', technologies: ['Prometheus', 'Datadog', 'OpenTelemetry', 'Kubecost', 'Grafana'] },
    ],
    keyBenefits: [
      { metric: '32%', label: 'Average Cloud Cost Reduction', description: 'Through automated FinOps spot fleets and persistent volume rightsizing.' },
      { metric: '10x', label: 'Faster Release Frequency', description: 'Automated GitOps pipelines replacing manual change advisory boards.' },
      { metric: '99.99%', label: 'Multi-Region Cloud Uptime', description: 'Active-active architectures resilient against single-region outages.' },
    ],
    caseStudySlug: 'fintech-cloud-migration',
    faqKey: 'cloud-devops',
  },

  cybersecurity: {
    slug: 'cybersecurity',
    number: '03',
    title: 'Enterprise Cybersecurity & Zero Trust',
    tagline: 'Defensive engineering, managed detection and response (MDR), and audit readiness.',
    heroHeadline: 'Resilient Defensive Security Built for Complex Threat Environments',
    shortDescription:
      'Zero Trust architecture, 24/7 managed detection and response (MDR), regulatory audit readiness (SOC 2, ISO 27001), and offensive penetration testing.',
    longOverview:
      'Perimeter defenses are no longer sufficient. Codeology AI implements defense-in-depth engineering based on Zero Trust principles: verify explicitly, grant least-privilege access, and continuously assume compromise. We safeguard sensitive corporate IP and automate regulatory compliance.',
    strategicPillars: [
      { title: 'Security Architecture Assessment', description: 'Comprehensive threat modeling, attack surface mapping, and architecture gap identification.' },
      { title: 'Vulnerability Management', description: 'Continuous scanning, automated CVE triage, and prioritized patch remediation workflows.' },
      { title: 'Penetration Testing & Red Teaming', description: 'Rigorous adversary simulation across web applications, APIs, internal networks, and cloud perimeters.' },
      { title: 'Network & Cloud Security', description: 'Micro-segmentation, Web Application Firewalls (WAF), and cloud security posture management (CSPM).' },
      { title: 'Endpoint Security & EDR', description: 'Next-generation behavioral endpoint protection with 24/7 automated containment capabilities.' },
      { title: 'Identity & Access Governance (IAM)', description: 'Phishing-resistant FIDO2 MFA, dynamic conditional access, and ephemeral just-in-time privilege.' },
    ],
    capabilitiesCategories: [
      {
        title: 'Zero Trust Identity & Micro-Perimeters',
        description: 'Cryptographic authentication verifying identity and device posture on every connection.',
        items: ['Hardware Security Keys (WebAuthn / FIDO2)', 'Context-Aware Conditional Access Policies', 'Just-In-Time Ephemeral Credentials via Vault', 'Least-Privilege Role-Based Access Control (RBAC)'],
      },
      {
        title: 'Managed Detection & Threat Hunting (MDR)',
        description: '24/7 security operations center analyzing endpoint, network, and cloud audit logs.',
        items: ['Real-Time Behavioral Anomaly Telemetry', 'Automated Host Containment within 15 Minutes', 'SIEM / SOAR Pipeline Integration', 'Forensic Memory & Network Packet Analysis'],
      },
      {
        title: 'Compliance & Audit Automation',
        description: 'Authoring policy frameworks and automating technical evidence collection for auditors.',
        items: ['SOC 2 Type II Readiness & Attestation', 'ISO/IEC 27001:2022 Implementation', 'HIPAA / HITECH Clinical Safeguards', 'Continuous Automated Compliance Monitoring'],
      },
    ],
    processTitle: 'The 5-Stage Defensive Security Lifecycle',
    processStages: [
      { step: '01', name: 'Identify', description: 'Map critical data stores, IAM permissions, public exposure surfaces, and regulatory obligations.' },
      { step: '02', name: 'Protect', description: 'Enforce Zero Trust identity, micro-segmented subnets, full-disk encryption, and immutable backups.' },
      { step: '03', name: 'Detect', description: 'Deploy EDR and SIEM pipelines with real-time threat intelligence feeds and behavioral heuristics.' },
      { step: '04', name: 'Respond', description: 'Immediate containment of compromised assets via automated playbooks and dedicated incident leads.' },
      { step: '05', name: 'Recover', description: 'Restore verified clean states from immutable snapshots and conduct comprehensive root-cause analysis.' },
    ],
    architectureType: 'security-layers',
    architectureLayers: [
      { name: '1. Identity Layer', tagline: 'The Primary Perimeter', components: ['FIDO2 / WebAuthn MFA', 'Okta Identity Engine', 'Contextual Risk Scores'] },
      { name: '2. Endpoint Layer', tagline: 'Host Attestation & Containment', components: ['CrowdStrike Falcon EDR', 'TPM 2.0 Device Health', 'Automated Isolation'] },
      { name: '3. Network Layer', tagline: 'Zero-Trust Micro-Perimeters', components: ['Software-Defined Perimeters', 'Encrypted WireGuard Mesh', 'Ingress WAF Rules'] },
      { name: '4. Application Layer', tagline: 'Secure Code & API Verification', components: ['OAuth 2.0 / mTLS Tokens', 'DAST / SAST CI Gates', 'OpenAPI Schema Validation'] },
      { name: '5. Data Layer', tagline: 'Field-Level Cryptographic Isolation', components: ['AES-256 Envelope Encryption', 'Customer-Managed KMS', 'Tokenization Vaults'] },
      { name: '6. Cloud Layer', tagline: 'Continuous Posture Governance', components: ['Wiz.io CSPM', 'Immutable CloudTrail Logs', 'Automated IAM Pruning'] },
    ],
    techStackCategories: [
      { category: 'Endpoint & MDR', technologies: ['CrowdStrike Falcon', 'SentinelOne', 'Microsoft Defender for Endpoint', 'Wazuh'] },
      { category: 'Cloud Security & SIEM', technologies: ['Wiz.io', 'Microsoft Sentinel', 'Splunk Enterprise', 'Datadog Security', 'AWS Security Hub'] },
      { category: 'Identity & Secrets', technologies: ['Okta', 'HashiCorp Vault', 'CyberArk', '1Password Enterprise', 'Google Cloud IAM'] },
      { category: 'Compliance Automation', technologies: ['Vanta', 'Drata', 'Secureframe', 'Tenable.io'] },
    ],
    keyBenefits: [
      { metric: '100%', label: 'First-Pass Audit Success', description: 'Across SOC 2 Type II and ISO 27001 external client examinations.' },
      { metric: '<15 min', label: 'Threat Containment SLA', description: 'Automated cryptographic isolation of compromised host credentials.' },
      { metric: 'Zero', label: 'Cryptographic Compromises', description: 'Hardware-backed MFA eliminating credential stuffing vulnerabilities.' },
    ],
    specialNotice: 'Security posture is an ongoing discipline. Codeology AI does not make irresponsible claims of 100% invulnerability; we engineer verifiable defense-in-depth resilience that minimizes blast radiuses and neutralizes adversaries rapidly.',
    caseStudySlug: 'healthcare-hipaa-ehr-modernization',
    faqKey: 'cybersecurity',
  },

  'software-development': {
    slug: 'software-development',
    number: '04',
    title: 'Custom Enterprise Software Engineering',
    tagline: 'High-throughput distributed systems, secure cloud microservices, and modern web applications.',
    heroHeadline: 'Engineering Scalable Software Systems That Deliver Business Leverage',
    shortDescription:
      'Distributed backend systems, enterprise web applications, high-throughput microservices, and secure API gateways built with TypeScript, Go, Python, and React.',
    longOverview:
      'Great enterprise software is engineered for maintainability, operational clarity, and high developer velocity. Codeology AI builds robust transactional web applications, cloud-native microservices, and APIs with strict type safety, thorough test coverage, and modular architectures.',
    strategicPillars: [
      { title: 'Web Application Engineering', description: 'Responsive, accessible enterprise portals built with React, Next.js, and TypeScript.' },
      { title: 'Distributed Microservices & APIs', description: 'High-throughput transactional microservices with strict schema validation and sub-50ms p99 latencies.' },
      { title: 'Mobile Application Development', description: 'High-performance cross-platform iOS and Android applications with offline-first synchronization.' },
      { title: 'Legacy Modernization & Refactoring', description: 'Systematically deconstructing monoliths into modern services with zero regression.' },
      { title: 'SaaS Multi-Tenant Platforms', description: 'Scalable subscription platforms with secure tenant isolation, billing, and role management.' },
      { title: 'Quality Engineering & Testing', description: 'Automated unit, integration, and end-to-end testing suites enforcing 85%+ code coverage.' },
    ],
    capabilitiesCategories: [
      {
        title: 'Modern Frontend Engineering',
        description: 'User interfaces crafted with high aesthetic polish, accessibility, and instant reactivity.',
        items: ['React 18/19 & Next.js App Router', 'TypeScript Strict Mode Architecture', 'Tailwind CSS & Design System Tokens', 'WCAG 2.1 AA Accessibility Standards'],
      },
      {
        title: 'Backend Systems & Distributed Data',
        description: 'High-concurrency microservices processing high transaction volumes with mathematical reliability.',
        items: ['Go (Golang) & Node.js/TypeScript Microservices', 'PostgreSQL & Distributed Sharding', 'Redis Enterprise In-Memory Caching', 'Apache Kafka & RabbitMQ Event Streaming'],
      },
      {
        title: 'Architectural Governance',
        description: 'Codebases constructed for longevity and clean team handoffs.',
        items: ['Clean Architecture & Domain-Driven Design', 'OpenAPI / Swagger Contract Verification', 'Automated Static Analysis (SonarQube)', '100% IP Transfer to Client Partners'],
      },
    ],
    processTitle: 'The 6-Stage Software Engineering Lifecycle',
    processStages: [
      { step: '01', name: 'Discover', description: 'Technical scoping, domain modeling, API contract specifications, and risk mitigation planning.' },
      { step: '02', name: 'Design', description: 'Architectural blueprints, database schema design, and interactive UI/UX wireframes.' },
      { step: '03', name: 'Build', description: 'Sprint-based agile engineering with daily commits, automated tests, and continuous staging deployments.' },
      { step: '04', name: 'Test', description: 'Automated unit, integration, load, and security vulnerability testing across all endpoints.' },
      { step: '05', name: 'Deploy', description: 'Zero-downtime blue/green deployment to production cloud infrastructure.' },
      { step: '06', name: 'Scale', description: 'Continuous performance telemetry monitoring, database query indexing, and feature iteration.' },
    ],
    architectureType: 'software-stack',
    architectureLayers: [
      { name: '1. Frontend Tier', tagline: 'Responsive, Accessible Edge UI', components: ['Next.js React Server Components', 'Tailwind CSS Design Tokens', 'Client State Management'] },
      { name: '2. API Gateway Tier', tagline: 'Secure Ingress & Traffic Routing', components: ['Envoy / Kong API Gateway', 'OAuth 2.0 Token Validation', 'Rate Limiting & Throttling'] },
      { name: '3. Application Tier', tagline: 'Domain Microservices', components: ['Go & Node.js Service Pods', 'gRPC High-Speed RPC', 'Domain Event Publishers'] },
      { name: '4. Message Tier', tagline: 'Asynchronous Event Streaming', components: ['Apache Kafka Event Log', 'Dead-Letter Queue Handlers', 'Idempotent Consumers'] },
      { name: '5. Persistence Tier', tagline: 'Transactional ACID Databases', components: ['PostgreSQL with Partitioning', 'Redis Distributed Cache', 'TimescaleDB Metrics'] },
    ],
    techStackCategories: [
      { category: 'Frontend', technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite'] },
      { category: 'Backend & APIs', technologies: ['Go (Golang)', 'Node.js', 'Python (FastAPI)', 'GraphQL', 'gRPC'] },
      { category: 'Databases & Cache', technologies: ['PostgreSQL', 'Redis Enterprise', 'MongoDB', 'Elasticsearch'] },
      { category: 'DevOps & Testing', technologies: ['Docker', 'Kubernetes', 'Playwright', 'Jest', 'GitHub Actions'] },
    ],
    keyBenefits: [
      { metric: '90%+', label: 'Automated Test Coverage', description: 'Rigorous CI test pipelines preventing production regressions.' },
      { metric: '<50ms', label: 'API Latency Targets', description: 'High-performance microservices optimized for rapid transactional throughput.' },
      { metric: '100%', label: 'Client IP Ownership', description: 'Full transfer of all repositories, documentation, and architecture assets.' },
    ],
    caseStudySlug: 'retail-ecommerce-flash-sale',
    faqKey: 'software-development',
  },

  'digital-transformation': {
    slug: 'digital-transformation',
    number: '05',
    title: 'Enterprise Digital Transformation',
    tagline: 'Modernizing legacy monoliths, connecting enterprise ERPs, and automating workflows.',
    heroHeadline: 'De-Risking Enterprise Modernization with Proven Engineering Rigor',
    shortDescription:
      'De-risk legacy migration with proven parallel-run architectures, event-driven data streaming, and automated operational orchestration.',
    longOverview:
      'Enterprises trapped by decades-old mainframe systems or brittle ERP customizations face soaring maintenance costs and operational paralysis. Codeology AI designs phased modernization pathways that introduce cloud elasticity and automated workflows without risking active revenue pipelines.',
    strategicPillars: [
      { title: 'Digital Strategy & Roadmap', description: 'Assessing legacy systems and authoring phased modernization roadmaps with measurable milestones.' },
      { title: 'Legacy Modernization', description: 'Safely dismantling monoliths using strangler patterns and parallel-run data verification.' },
      { title: 'Process & Workflow Automation', description: 'Automating manual data entry and cross-departmental approvals with event-driven pipelines.' },
      { title: 'Data Platform Modernization', description: 'Connecting fragmented operational databases into unified real-time analytics data lakes.' },
      { title: 'Cloud Transformation', description: 'Transitioning on-premise workloads into elastic, secure public and private cloud environments.' },
      { title: 'AI & Machine Learning Adoption', description: 'Integrating enterprise AI models into existing ERP and CRM business processes.' },
    ],
    capabilitiesCategories: [
      {
        title: 'Legacy Monolith Deconstruction',
        description: 'Transitioning complex core systems without big-bang operational disruption.',
        items: ['Strangler Fig Architectural Execution', 'Change Data Capture (CDC) Syncing', 'Automated Parity Verification Scripts', 'Zero Data Loss Cutover Guarantees'],
      },
      {
        title: 'Enterprise ERP & Systems Integration',
        description: 'Bridging modern applications with legacy record systems.',
        items: ['SAP & Oracle ERP Connectors', 'Salesforce CRM Event Synchronization', 'REST & GraphQL Middleware Gateways', 'Encrypted Document Exchange Pipelines'],
      },
    ],
    processTitle: 'The 4-Stage Transformation Framework',
    processStages: [
      { step: '01', name: 'Assess', description: 'Examine existing workflows, data dependencies, licensing costs, and operational bottlenecks.' },
      { step: '02', name: 'Prioritize', description: 'Identify highest-impact quick wins to fund long-term modernization through immediate cost savings.' },
      { step: '03', name: 'Transform', description: 'Execute agile 90-day modernization sprints with continuous testing and parallel execution.' },
      { step: '04', name: 'Measure', description: 'Track business outcomes against core KPIs: cycle time, operating expense, and employee productivity.' },
    ],
    architectureType: 'transformation-framework',
    architectureLayers: [
      { name: 'Legacy Core', tagline: 'Existing Systems of Record', components: ['Legacy Monolith / ERP', 'Mainframe Databases', 'On-Premise File Stores'] },
      { name: 'Integration Fabric', tagline: 'Event-Driven CDC Middleware', components: ['Debezium CDC Connectors', 'Kafka Event Streaming', 'Schema Registry'] },
      { name: 'Modern Service Mesh', tagline: 'Cloud-Native Domain Services', components: ['Containerized Microservices', 'Unified API Gateway', 'Workflow Orchestrator'] },
      { name: 'Business Value Layer', tagline: 'Accelerated Operational Velocity', components: ['Modern Web / Mobile Apps', 'Real-Time Executive BI', 'Automated Integrations'] },
    ],
    techStackCategories: [
      { category: 'Data & CDC', technologies: ['Apache Kafka', 'Debezium', 'Apache Flink', 'Snowflake'] },
      { category: 'Integration Middleware', technologies: ['MuleSoft', 'Temporal.io', 'Node.js Microservices', 'PostgreSQL'] },
      { category: 'Modern Cloud', technologies: ['AWS', 'Azure', 'Kubernetes', 'Docker'] },
    ],
    keyBenefits: [
      { metric: 'Zero', label: 'Data Loss During Migration', description: 'Verified cryptographic database parity before legacy decommissioning.' },
      { metric: '45%', label: 'Cycle Time Reduction', description: 'Through automated cross-departmental approval workflows.' },
      { metric: '90-Day', label: 'Demonstrable Horizons', description: 'Delivering tangible production value at each milestone.' },
    ],
    caseStudySlug: 'fintech-cloud-migration',
    faqKey: 'digital-transformation',
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    number: '06',
    title: 'Digital Marketing & Growth Architecture',
    tagline: 'Technical B2B search architecture, account-based demand engines, and revenue operations.',
    heroHeadline: 'Engineering-Driven Growth Engines That Drive Measurable Pipeline',
    shortDescription:
      'Technical SEO architecture, account-based marketing (ABM) infrastructure, and multi-touch attribution analytics to scale enterprise customer acquisition.',
    longOverview:
      'Modern digital growth requires technical rigor, server-side performance optimization, and transparent revenue attribution. Codeology AI combines software engineering precision with strategic marketing to build scalable inbound customer acquisition engines.',
    strategicPillars: [
      { title: 'Technical SEO Architecture', description: 'Server-side rendering, Core Web Vitals optimization, and automated Schema.org markup.' },
      { title: 'Performance Marketing', description: 'Data-driven paid search and social campaigns optimized for customer acquisition cost (CAC).' },
      { title: 'Account-Based Marketing (ABM)', description: 'Targeting high-value enterprise accounts with personalized dynamic content experiences.' },
      { title: 'Conversion Rate Architecture (CRO)', description: 'Scientific A/B testing frameworks and frictionless high-converting user funnels.' },
      { title: 'Multi-Touch Revenue Attribution', description: 'Tracking the full journey from initial anonymous visit to signed enterprise contract.' },
      { title: 'Content & Editorial Strategy', description: 'Deep technical thought leadership that builds authority with enterprise CTOs and CISOs.' },
    ],
    capabilitiesCategories: [
      {
        title: 'Technical Search Architecture',
        description: 'Engineering websites that dominate organic search results through raw technical performance.',
        items: ['Sub-Second Core Web Vitals (LCP, FID, CLS)', 'Dynamic Server-Side Rendering (SSR)', 'Automated XML Sitemaps & Canonical Tags', 'Advanced JSON-LD Structured Data Schema'],
      },
      {
        title: 'Revenue Operations & Attribution',
        description: 'Connecting marketing interactions directly to CRM revenue pipelines.',
        items: ['Multi-Touch Attribution Modeling', 'HubSpot & Salesforce Bi-Directional Sync', 'Server-Side Google Analytics 4 (GA4)', 'Lead Scoring & Automated Qualification'],
      },
    ],
    processTitle: 'The Measurable Growth Framework',
    processStages: [
      { step: '01', name: 'Audit', description: 'Technical crawl analysis, search indexing health, conversion funnel drop-offs, and CAC baselines.' },
      { step: '02', name: 'Architect', description: 'Authoring content topologies, technical SEO fixes, and conversion funnel improvements.' },
      { step: '03', name: 'Execute', description: 'Rolling out high-performing landing pages, paid campaigns, and organic content pipelines.' },
      { step: '04', name: 'Analyze', description: 'Attributing closed revenue to specific marketing touchpoints and eliminating underperforming spend.' },
    ],
    architectureType: 'marketing-funnel',
    architectureLayers: [
      { name: '1. Discovery & Search', tagline: 'Technical SEO & Paid Ingress', components: ['Sub-second SSR Pages', 'Targeted B2B Campaigns', 'High-Intent Search Ads'] },
      { name: '2. Engagement & Polish', tagline: 'High-Converting Digital Assets', components: ['Editorial Case Studies', 'Interactive Calculators', 'Dynamic Personalization'] },
      { name: '3. Conversion & Capture', tagline: 'Frictionless Inbound Flow', components: ['Verified Form Gateways', 'Instant Lead Qualification', 'Instant Lead Ref ID'] },
      { name: '4. Revenue Attribution', tagline: 'Full-Funnel Sales Pipeline', components: ['CRM Closed-Loop Sync', 'Multi-Touch Attribution', 'CAC / LTV Reporting'] },
    ],
    techStackCategories: [
      { category: 'Analytics & Attribution', technologies: ['Google Analytics 4', 'Segment', 'Mixpanel', 'HubSpot CRM'] },
      { category: 'Optimization & SEO', technologies: ['Google Search Console', 'Ahrefs', 'Semrush', 'PostHog'] },
      { category: 'Advertising Platforms', technologies: ['LinkedIn Ads B2B', 'Google Ads', 'Meta Business'] },
    ],
    keyBenefits: [
      { metric: '3.4x', label: 'Pipeline Velocity Increase', description: 'Through targeted account-based marketing and technical SEO dominance.' },
      { metric: '<1.2s', label: 'Largest Contentful Paint', description: 'Engineering lightning-fast pages that satisfy Google Core Web Vitals.' },
      { metric: '100%', label: 'Closed-Loop Attribution', description: 'Clear attribution tying digital campaigns directly to closed CRM contracts.' },
    ],
    caseStudySlug: 'retail-ecommerce-flash-sale',
    faqKey: 'digital-marketing',
  },

  'recruitment-staffing': {
    slug: 'recruitment-staffing',
    aliases: ['recruitment'],
    number: '07',
    title: 'Technical Recruitment & Staffing Solutions',
    tagline: 'Embedded Recruitment Process Outsourcing (RPO), specialized engineering pods, and executive search.',
    heroHeadline: 'Scale Elite Engineering Teams with Vetted Technical Talent',
    shortDescription:
      'Scale elite technology squads rapidly with our vetted engineering talent pools, proprietary technical evaluations, and dedicated recruitment pods.',
    longOverview:
      'Finding, evaluating, and securing elite engineering talent is one of the greatest bottlenecks facing technology executives. Codeology AI solves this by embedding practicing senior engineers into the evaluation process, screening candidates for real-world architecture acumen before they reach your calendar.',
    strategicPillars: [
      { title: 'Technical Recruitment & Sourcing', description: 'Active sourcing of passive senior engineers, DevOps architects, and security specialists.' },
      { title: 'Embedded Technical RPO', description: 'Dedicated recruiting pods embedded into your internal HR workflows and Slack channels.' },
      { title: 'Contract & Managed Pods', description: 'Autonomous engineering squads that hit the ground running on critical technical initiatives.' },
      { title: 'Executive Technology Search', description: 'Retained search for Chief Technology Officers, VP of Engineering, and Head of InfoSec roles.' },
      { title: 'Rigorous Technical Screening', description: 'Algorithmic, architectural, and code quality evaluations conducted by senior practicing engineers.' },
      { title: 'Contract-to-Hire Models', description: 'De-risk permanent hires with flexible trial periods before full-time conversion.' },
    ],
    capabilitiesCategories: [
      {
        title: 'Specialized Practice Areas',
        description: 'Deep technical talent networks across all modern enterprise engineering disciplines.',
        items: ['DevOps & Cloud Platform Architects (AWS/Azure/GCP)', 'Defensive Cybersecurity & Compliance Specialists', 'Full-Stack TypeScript & React Developers', 'Distributed Systems & Go/Rust Engineers', 'Machine Learning & Data Platform Architects'],
      },
      {
        title: 'Proprietary Vetting Standard',
        description: 'Every candidate is vetted by a practicing engineer with 10+ years of production experience.',
        items: ['Live Systems Architecture Whiteboarding', 'Production Code Repository Review', 'Hands-on Failure Mode Debugging', 'Communication & Cultural Fit Assessment'],
      },
    ],
    processTitle: 'The 6-Stage Technical Hiring Process',
    processStages: [
      { step: '01', name: 'Understand', description: 'Analyze your technical stack, team culture, architecture roadmap, and specific candidate requirements.' },
      { step: '02', name: 'Source', description: 'Engage our proprietary network of senior passive engineers and targeted technical communities.' },
      { step: '03', name: 'Screen', description: 'Conduct initial technical credentials check, career motivation evaluation, and compensation alignment.' },
      { step: '04', name: 'Assess', description: 'Deep technical evaluation conducted by a Codeology AI senior architect with detailed scoring rubrics.' },
      { step: '05', name: 'Interview', description: 'Present a shortlist of pre-vetted finalists ready for direct interview with your engineering leadership.' },
      { step: '06', name: 'Hire', description: 'Assist with offer negotiation, background checks, and seamless onboarding integration.' },
    ],
    architectureType: 'hiring-pipeline',
    architectureLayers: [
      { name: '1. Sourcing Pipeline', tagline: 'Proprietary Senior Network', components: ['Targeted Passive Outreach', 'Tech Community Alumni', 'Skill-Matched Databases'] },
      { name: '2. Architect Evaluation', tagline: 'Conducted by Practicing CTOs', components: ['Architecture Whiteboarding', 'Git Commit History Review', 'Hands-on Coding Assessment'] },
      { name: '3. Behavioral Verification', tagline: 'Cultural Alignment & Leadership', components: ['Problem Solving Under Stress', 'Communication Clarity', 'Background Checks'] },
      { name: '4. Executive Shortlist', tagline: 'Interview-Ready Finalists', components: ['Comprehensive Scorecards', 'Recorded Code Walkthroughs', '14-Day Median Placement'] },
    ],
    techStackCategories: [
      { category: 'Hiring Operations', technologies: ['Greenhouse', 'Lever', 'Workday', 'Ashby ATS'] },
      { category: 'Evaluation Platforms', technologies: ['HackerRank', 'CodeSignal', 'GitHub Enterprise', 'Custom Codeology Rubrics'] },
    ],
    keyBenefits: [
      { metric: '14 Days', label: 'Median Time to Presentation', description: 'Delivering interview-ready senior finalists within two weeks.' },
      { metric: '88%', label: 'First-Round Acceptance Rate', description: 'Candidates presented advance to final interview rounds.' },
      { metric: '95%', label: '90-Day Retention Rate', description: 'Long-term cultural alignment and technical performance.' },
    ],
    caseStudySlug: 'fintech-cloud-migration',
    faqKey: 'recruitment-staffing',
  },

  'ai-solutions': {
    slug: 'ai-solutions',
    number: '08',
    title: 'Enterprise AI & Machine Learning Solutions',
    tagline: 'Private LLM deployments, retrieval-augmented generation (RAG), and operational intelligence.',
    heroHeadline: 'Deploy Enterprise AI with Private Sovereignty & Verified Accuracy',
    shortDescription:
      'Deploy production AI architectures that integrate seamlessly with existing enterprise data lakes while strictly safeguarding data privacy and security perimeters.',
    longOverview:
      'Generative AI has immense potential, but enterprise adoption is frequently halted by data privacy risks, hallucination hazards, and unpredictable operating costs. Codeology AI architects private AI systems deployed directly inside your VPC, grounding LLMs in your verified enterprise documents with human-in-the-loop governance.',
    strategicPillars: [
      { title: 'AI Strategy & Feasibility', description: 'Identifying high-leverage business use cases, ROI feasibility, and data readiness assessments.' },
      { title: 'Private LLM Deployment', description: 'Hosting open-weights models inside client VPCs with zero data leakage to commercial providers.' },
      { title: 'Enterprise RAG & Knowledge Systems', description: 'Connecting LLMs to internal wikis, ERPs, and document archives with factual source citations.' },
      { title: 'Document Intelligence & Extraction', description: 'Automating parsing of unstructured PDFs, medical records, and legal contracts into structured data.' },
      { title: 'Autonomous Workflow Agents', description: 'Task-oriented agentic workflows that execute business processes under human supervision.' },
      { title: 'AI Governance & Compliance', description: 'Continuous audit logging, bias testing, hallucination mitigation, and model performance tracking.' },
    ],
    capabilitiesCategories: [
      {
        title: 'Private & Secure AI Architecture',
        description: 'Ensuring your proprietary enterprise data is never ingested into third-party training corpuses.',
        items: ['Dedicated GPU Cluster Hosting (AWS EC2 / Azure ND)', 'Quantized Open-Weights Models (Llama 3, Mistral, Qwen)', 'Private pgvector & Qdrant Vector Stores', 'Zero-Egress Customer VPC Isolation'],
      },
      {
        title: 'Enterprise RAG & Citations',
        description: 'Deterministic factual generation grounded strictly in authorized enterprise documentation.',
        items: ['Hybrid Dense & Sparse Search Retrieval', 'Document Chunking & Semantic Re-Ranking', 'Direct Source Page & Paragraph Citations', 'Role-Based Document Access Filtering'],
      },
      {
        title: 'Human-in-the-Loop Governance',
        description: 'Preventing automated hallucination errors from harming customer or clinical operations.',
        items: ['Model Confidence Scoring Thresholds', 'Mandatory Human Verification Workflows', 'Continuous Adversarial Prompt Injection Defense', 'Comprehensive Request & Response Audit Trails'],
      },
    ],
    processTitle: 'The 6-Stage AI Workflow Architecture',
    processStages: [
      { step: '01', name: 'Data Ingestion', description: 'Securely extract unstructured documents, databases, and API streams.' },
      { step: '02', name: 'Processing & Embedding', description: 'Clean data, chunk semantically, and generate high-dimensional embeddings.' },
      { step: '03', name: 'Private Vector Store', description: 'Store vector embeddings in private encrypted databases with strict tenant isolation.' },
      { step: '04', name: 'Model Inference', description: 'Generate structured completions using private models or air-gapped endpoints.' },
      { step: '05', name: 'Business Logic Validation', description: 'Verify outputs against deterministic business rules, schemas, and guardrails.' },
      { step: '06', name: 'Human Decision', description: 'Present synthesized intelligence to human decision-makers for final action.' },
    ],
    architectureType: 'ai-workflow',
    architectureLayers: [
      { name: '1. Business Data Sources', tagline: 'Unstructured Enterprise Telemetry', components: ['Internal ERP & CRM', 'PDF Contract Archives', 'Confluence / Notion Wikis'] },
      { name: '2. Ingestion & Embedding', tagline: 'Semantic Vectorization Pipeline', components: ['Text Chunking Engine', 'Embedding Models', 'Metadata Filtering'] },
      { name: '3. Vector Database Core', tagline: 'Encrypted Semantic Storage', components: ['pgvector / Qdrant Cluster', 'Cosine Similarity Search', 'Row-Level Security'] },
      { name: '4. AI Model Inference', tagline: 'Private Air-Gapped Foundation Model', components: ['Self-Hosted LLMs', 'Guardrail Input Filters', 'Source Citation Injector'] },
      { name: '5. Human Decision Gateway', tagline: 'Verified Operational Outcome', components: ['Confidence Scoring', 'Human Approval Checkpoint', 'Action Dispatcher'] },
    ],
    techStackCategories: [
      { category: 'Foundation Models', technologies: ['Llama 3 (Meta)', 'Mistral Large', 'Claude Enterprise', 'Gemini Enterprise'] },
      { category: 'Vector Stores & Search', technologies: ['pgvector (PostgreSQL)', 'Qdrant', 'Milvus', 'Elasticsearch Vector'] },
      { category: 'Frameworks & RAG', technologies: ['LangChain', 'LlamaIndex', 'vLLM Inference Server', 'PyTorch'] },
      { category: 'Compute Infrastructure', technologies: ['AWS EC2 g5 / p4d', 'Azure ND-Series', 'NVIDIA TensorRT', 'Triton'] },
    ],
    keyBenefits: [
      { metric: '100%', label: 'VPC Data Sovereignty', description: 'Proprietary enterprise data never leaves your private cloud security perimeter.' },
      { metric: '94%', label: 'Extraction Time Reduction', description: 'Automated document processing replacing manual data entry.' },
      { metric: 'Zero', label: 'Unverified Autonomous Action', description: 'Enforced human-in-the-loop validation for all high-consequence outputs.' },
    ],
    specialNotice: 'Codeology AI develops enterprise AI under strict ethical guidelines. AI outputs are probabilistic decision-support tools, not infallible determinations. We do not make misleading guarantees of automated outcomes.',
    caseStudySlug: 'healthcare-hipaa-ehr-modernization',
    faqKey: 'ai-solutions',
  },
};
