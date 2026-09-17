export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  publishedDate: string;
  readingTime: string;
  badge: string;
  featured?: boolean;
  tableOfContents: TableOfContentsItem[];
  body: {
    type: 'paragraph' | 'heading2' | 'heading3' | 'quote' | 'code' | 'list' | 'table';
    content?: string;
    items?: string[];
    language?: string;
    tableHeaders?: string[];
    tableRows?: string[][];
  }[];
  relatedSlugs: string[];
}

export const insightCategories = [
  'All',
  'Technology',
  'AI',
  'Cybersecurity',
  'Cloud',
  'Software Engineering',
  'Digital Transformation',
  'Business',
  'Careers',
];

export const allInsightArticles: InsightArticle[] = [
  {
    id: 'insight-1',
    slug: 'multi-region-resilience-patterns',
    category: 'Cloud',
    title: 'Architecting Multi-Region Resiliency: Active-Active Failover Without Split-Brain Latency',
    excerpt: 'How we eliminate replication lag and state desynchronization across geographically distributed Kubernetes clusters under high-load transactional traffic.',
    author: {
      name: 'Elena Rostova',
      role: 'VP of Cloud Infrastructure',
      avatarInitials: 'ER',
    },
    publishedDate: 'March 12, 2026',
    readingTime: '7 min read',
    badge: 'TECHNICAL DEEP DIVE',
    featured: true,
    tableOfContents: [
      { id: 'the-split-brain-dilemma', title: 'The Split-Brain Dilemma in Multi-Region' },
      { id: 'consensus-versus-asynchronous', title: 'Consensus vs. Asynchronous Replication' },
      { id: 'traffic-steering-canary', title: 'Traffic Steering & Canary Ingress' },
      { id: 'production-playbook', title: 'Production Architecture Playbook' },
    ],
    body: [
      {
        type: 'paragraph',
        content:
          'When designing distributed enterprise systems across multiple public cloud availability regions, architects frequently confront the classic distributed systems tradeoff: consistency versus latency. While active-passive disaster recovery configurations remain straightforward, true active-active multi-region topologies introduce the hazard of split-brain state desynchronization during network partitions.',
      },
      {
        type: 'heading2',
        content: 'The Split-Brain Dilemma in Multi-Region Topologies',
      },
      {
        type: 'paragraph',
        content:
          'Split-brain occurs when two separate regions lose cross-transit connectivity and both independently determine they are the authoritative primary. When write transactions continue unabated on both sides of the partition, reconciliating divergent states after network recovery becomes extraordinarily painful and frequently leads to data corruption.',
      },
      {
        type: 'quote',
        content:
          'In mission-critical financial systems, five seconds of undetected state divergence between US-East and US-West can result in millions of dollars of irreconcilable transactions.',
      },
      {
        type: 'heading2',
        content: 'Consensus vs. Asynchronous Replication',
      },
      {
        type: 'paragraph',
        content:
          'To overcome this challenge without paying the severe 60ms+ cross-country speed-of-light roundtrip penalty on every single write, modern architectures partition workloads by tenant or customer geographic origin while streaming transaction logs asynchronously via dedicated cross-region peering.',
      },
      {
        type: 'table',
        tableHeaders: ['Strategy', 'Typical Write Latency', 'RPO (Data Loss Window)', 'RTO (Recovery Time)'],
        tableRows: [
          ['Synchronous Multi-Region Raft', '65ms - 90ms', '0 seconds (Zero Loss)', '< 5 seconds automated'],
          ['Asynchronous CDC Streaming', '< 8ms (local)', '< 500ms lag delta', '< 30 seconds failover'],
          ['Active-Passive Pilot Light', '< 5ms (primary)', 'Minutes to hours', '15 - 45 minutes'],
        ],
      },
      {
        type: 'heading2',
        content: 'Traffic Steering & Canary Ingress',
      },
      {
        type: 'paragraph',
        content:
          'We leverage intelligent Envoy-based mesh ingress controllers paired with Route 53 health checking scripts that evaluate not merely HTTP ping status, but deep database write replication lag. If local database replication falls behind threshold limits, the ingress layer immediately sheds incoming write load to the healthy alternate region.',
      },
      {
        type: 'code',
        language: 'yaml',
        content: `# Envoy Health Check Configuration with Deep CDC Health Probe
health_checkers:
  - timeout: 2s
    interval: 5s
    unhealthy_threshold: 2
    healthy_threshold: 1
    http_health_check:
      path: "/health/replication-lag"
      expected_statuses:
        - 200
      custom_headers:
        - name: "X-Enforce-Max-Lag-Ms"
          value: "500"`,
      },
      {
        type: 'heading2',
        content: 'Production Architecture Playbook',
      },
      {
        type: 'list',
        items: [
          'Enforce strict idempotency tokens on all API mutation requests to allow safe retries during failovers.',
          'Deploy automated chaos experiments monthly to verify automated BGP failover triggers in production.',
          'Partition database writes by geographic customer affinity to minimize cross-region locking conflicts.',
          'Maintain cryptographically verified audit trails of all regional routing policy updates.',
        ],
      },
    ],
    relatedSlugs: ['zero-trust-identity-perimeters', 'ai-enclaves-private-rag'],
  },
  {
    id: 'insight-2',
    slug: 'zero-trust-identity-perimeters',
    category: 'Cybersecurity',
    title: 'Moving Beyond Perimeter Defenses: Pragmatic Zero-Trust Implementation in 2026',
    excerpt: 'A blueprint for replacing brittle VPNs with software-defined micro-perimeters, continuous token evaluation, and cryptographic device attestation.',
    author: {
      name: 'Marcus Vance',
      role: 'Head of Cybersecurity Practice',
      avatarInitials: 'MV',
    },
    publishedDate: 'February 24, 2026',
    readingTime: '5 min read',
    badge: 'SECURITY ADVISORY',
    tableOfContents: [
      { id: 'death-of-vpn', title: 'The Demise of Traditional Corporate VPNs' },
      { id: 'core-pillars-zero-trust', title: 'The Three Pillars of Modern Zero Trust' },
      { id: 'ephemeral-credentials', title: 'Eliminating Static Credentials' },
    ],
    body: [
      {
        type: 'paragraph',
        content:
          'The concept of a secure internal corporate network is obsolete. In modern hybrid enterprise operations, an employee workstation connected to home Wi-Fi and a production database cluster in AWS must operate with zero implicit trust between them.',
      },
      {
        type: 'heading2',
        content: 'The Demise of Traditional Corporate VPNs',
      },
      {
        type: 'paragraph',
        content:
          'Traditional VPN appliances represent a single point of failure and provide catastrophic lateral movement opportunities once breached. Once an attacker obtains valid credentials or exploits an unpatched VPN concentrator, they gain broad subnet visibility across the enterprise.',
      },
      {
        type: 'heading2',
        content: 'The Three Pillars of Modern Zero Trust',
      },
      {
        type: 'list',
        items: [
          'Cryptographic Device Health Attestation: Hardware TPM validation before granting network access.',
          'Context-Aware Continuous Evaluation: Dynamic re-authentication when user risk scores fluctuate.',
          'Micro-Segmented Service Proxies: User requests connect solely to explicit authorized application ports.',
        ],
      },
      {
        type: 'heading2',
        content: 'Eliminating Static Credentials',
      },
      {
        type: 'paragraph',
        content:
          'Static API keys and long-lived SSH credentials are the most common source of enterprise data breaches. By integrating HashiCorp Vault with OpenID Connect (OIDC), our engineers issue ephemeral, cryptographically signed access tokens that expire automatically after 60 minutes.',
      },
    ],
    relatedSlugs: ['multi-region-resilience-patterns', 'engineering-talent-velocity-rpo'],
  },
  {
    id: 'insight-3',
    slug: 'ai-enclaves-private-rag',
    category: 'AI',
    title: 'Enterprise RAG in Regulated Verticals: Balancing Knowledge Retrieval with Data Sovereignty',
    excerpt: 'Tactical approaches to deploying private vector stores and local LLM inference engines without risking sensitive customer telemetry or HIPAA violations.',
    author: {
      name: 'Dr. Aris Thorne',
      role: 'Principal AI Architect',
      avatarInitials: 'AT',
    },
    publishedDate: 'February 10, 2026',
    readingTime: '9 min read',
    badge: 'AI GOVERNANCE',
    tableOfContents: [
      { id: 'data-privacy-imperative', title: 'The Data Sovereignty Imperative' },
      { id: 'private-enclave-architecture', title: 'Private Enclave Vector Architecture' },
      { id: 'human-in-the-loop', title: 'Enforcing Human-in-the-Loop Safeguards' },
    ],
    body: [
      {
        type: 'paragraph',
        content:
          'Generative AI offers remarkable productivity dividends for legal research, medical document synthesis, and customer support. However, for organizations in healthcare, banking, and defense, transmitting raw proprietary documents across public cloud LLM APIs represents an unacceptable compliance violation.',
      },
      {
        type: 'heading2',
        content: 'The Data Sovereignty Imperative',
      },
      {
        type: 'paragraph',
        content:
          'Under HIPAA, GDPR, and SOC 2 requirements, enterprise organizations cannot permit third-party AI foundation models to ingest customer data for training purposes. The solution is private enclaves hosting dedicated embedding models and local vector indices completely segregated within the client’s own VPC.',
      },
      {
        type: 'heading2',
        content: 'Private Enclave Vector Architecture',
      },
      {
        type: 'paragraph',
        content:
          'Our reference architecture leverages quantized open-weights models deployed on dedicated GPU instances (e.g. AWS g5 or Azure ND-series), paired with pgvector or Qdrant clusters encrypted with customer-managed KMS keys.',
      },
      {
        type: 'heading2',
        content: 'Enforcing Human-in-the-Loop Safeguards',
      },
      {
        type: 'paragraph',
        content:
          'AI systems in enterprise environments must never make autonomous unreviewed determinations regarding loan eligibility, clinical diagnoses, or employment offers. We build explicit validation checkpoints where AI synthesized outputs are presented alongside source citations for human confirmation.',
      },
    ],
    relatedSlugs: ['multi-region-resilience-patterns', 'zero-trust-identity-perimeters'],
  },
  {
    id: 'insight-4',
    slug: 'engineering-talent-velocity-rpo',
    category: 'Careers',
    title: 'The Real Cost of Engineering Vacancies: Why Embedded RPO Outperforms Traditional Headhunting',
    excerpt: 'How leading technology leaders are reducing time-to-hire by 60% through dedicated recruitment pods and technical screening benchmarks.',
    author: {
      name: 'Marcus Vance',
      role: 'Head of Technical Talent & Operations',
      avatarInitials: 'MV',
    },
    publishedDate: 'January 28, 2026',
    readingTime: '6 min read',
    badge: 'TALENT STRATEGY',
    tableOfContents: [
      { id: 'the-vacancy-tax', title: 'The Compounding Engineering Vacancy Tax' },
      { id: 'broken-agency-model', title: 'Why Traditional Contingency Agencies Fail' },
      { id: 'embedded-rpo-playbook', title: 'The Embedded Technical RPO Framework' },
    ],
    body: [
      {
        type: 'paragraph',
        content:
          'For high-velocity technology organizations, an open Principal DevOps or Staff Software Engineer seat remaining vacant for 90 days is not merely an HR inconvenience—it directly degrades feature release velocity, stalls enterprise sales deals, and burns out existing engineering teams.',
      },
      {
        type: 'heading2',
        content: 'The Compounding Engineering Vacancy Tax',
      },
      {
        type: 'paragraph',
        content:
          'When critical technical roles remain unfilled, existing senior engineers are forced to absorb maintenance duties and context-switch endlessly. Studies indicate that engineering vacancies carry an indirect cost exceeding $4,000 per day in lost product momentum.',
      },
      {
        type: 'heading2',
        content: 'Why Traditional Contingency Agencies Fail',
      },
      {
        type: 'paragraph',
        content:
          'Traditional recruiting agencies rely on keyword search spamming on LinkedIn, submitting dozens of unqualified resumes in the hope that one passes the hiring manager’s screen. This overwhelms internal engineering teams with useless phone screens.',
      },
      {
        type: 'heading2',
        content: 'The Embedded Technical RPO Framework',
      },
      {
        type: 'paragraph',
        content:
          'Codeology AI’s embedded RPO model embeds seasoned technical sourcers and practicing senior engineers directly into your hiring workflows, conducting rigorous first-round technical evaluations so hiring managers only interview pre-vetted finalists.',
      },
    ],
    relatedSlugs: ['zero-trust-identity-perimeters', 'ai-enclaves-private-rag'],
  },
];

export const insightsPreviewContent = {
  headline: 'Insights that move ideas forward.',
  subheadline: 'Architectural perspectives, security threat intelligence, and engineering playbooks from our practice leads.',
  ctaText: 'View All Insights',
  ctaPath: '/insights',
  articles: allInsightArticles.slice(0, 3),
};

export const insightsList = allInsightArticles;
export const featuredInsight = allInsightArticles.find((a) => a.featured) || allInsightArticles[0];

