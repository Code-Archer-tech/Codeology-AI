import { FAQItem } from '../components/ui/FAQAccordion';

export const practiceFaqs: Record<string, FAQItem[]> = {
  'it-infrastructure': [
    {
      question: 'What is Codeology AI’s Network Operations Center (NOC) response SLA?',
      answer: 'Our tier-1 through tier-3 enterprise infrastructure contracts provide a guaranteed 15-minute response SLA for critical priority (P1) incidents, backed by 24/7/365 active monitoring and automated runbook orchestration.',
    },
    {
      question: 'How do you handle hybrid and multi-site network failover?',
      answer: 'We design software-defined wide area network (SD-WAN) and multi-cloud transit gateways with automated BGP route convergence, active-active IPsec tunnels, and secondary cellular or satellite failover paths.',
    },
    {
      question: 'What compliance frameworks are supported for infrastructure hosting?',
      answer: 'All hosted and managed environments are audited against SOC 2 Type II, ISO/IEC 27001, HIPAA/HITECH, and PCI-DSS Level 1 compliance specifications.',
    },
    {
      question: 'Can Codeology AI manage existing co-located data centers and bare-metal servers?',
      answer: 'Yes. We provide complete lifecycle management, hypervisor maintenance (VMware vSphere, Nutanix, Proxmox, Hyper-V), SAN storage zoning, and remote out-of-band management (IPMI/iDRAC/iLO).',
    },
  ],
  'cloud-devops': [
    {
      question: 'How does Codeology AI approach zero-downtime cloud migration?',
      answer: 'We use the strangler fig application pattern and dual-write database CDC (Change Data Capture) pipelines. Traffic is gradually cut over using automated DNS and weighted canary ingress routing once data parity is verified.',
    },
    {
      question: 'Which public cloud hyperscalers do your engineers support?',
      answer: 'Our solutions architects maintain senior professional certifications across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), with deep experience in hybrid multi-cloud mesh architectures.',
    },
    {
      question: 'What is your FinOps cloud cost optimization methodology?',
      answer: 'We audit compute utilization, right-size persistent volumes, deploy automated Karpenter/spot instance fleets for non-critical workloads, and structure reserved instance (RI) and savings plan commitments to achieve an average 32% reduction in recurring cloud spend.',
    },
    {
      question: 'How do you structure Infrastructure as Code (IaC)?',
      answer: 'We standardize on modular, peer-reviewed Terraform, OpenTofu, or Pulumi modules maintained in Git repositories with automated Atlantis or Terraform Cloud drift detection and validation gates.',
    },
  ],
  cybersecurity: [
    {
      question: 'What distinguishes your Managed Detection and Response (MDR) service?',
      answer: 'Rather than solely forwarding alerts, our SOC analysts investigate raw telemetry in real-time, executing automated host containment, token revocation, and memory forensics within minutes of confirmed indicators of compromise (IOCs).',
    },
    {
      question: 'Do you conduct third-party penetration testing and red teaming?',
      answer: 'Yes. Our offensive security engineers execute black-box, gray-box, and white-box penetration testing covering external attack surfaces, internal Active Directory domains, Kubernetes clusters, and web application APIs mapped to OWASP Top 10.',
    },
    {
      question: 'How does Codeology AI assist with SOC 2 or ISO 27001 readiness?',
      answer: 'We perform gap assessments, author human-vetted security policies, configure automated evidence collectors (Vanta, Drata, Secureframe), and attend external auditor interviews as technical delegates.',
    },
    {
      question: 'How is Zero Trust identity and access enforced?',
      answer: 'We implement phishing-resistant FIDO2/WebAuthn multifactor authentication, context-aware conditional access policies, and ephemeral just-in-time (JIT) role elevation via HashiCorp Vault or Cloud IAM.',
    },
  ],
  'software-development': [
    {
      question: 'What programming languages and frameworks do your teams specialize in?',
      answer: 'Our core stacks include modern TypeScript/JavaScript (Node.js, React, Next.js), Go (Golang), Python (FastAPI, PyTorch), Java/Kotlin (Spring Boot), and Rust for high-throughput distributed systems.',
    },
    {
      question: 'How do you guarantee software quality and maintainability?',
      answer: 'We enforce strict continuous integration checks requiring a minimum of 85-90% automated unit and integration test coverage, static analysis (SonarQube), automated dependency vulnerability scanning, and strict semantic PR reviews.',
    },
    {
      question: 'Who retains intellectual property (IP) rights for developed software?',
      answer: 'All custom source code, documentation, architectural blueprints, and associated intellectual property rights transfer 100% to our client organization upon milestone completion.',
    },
    {
      question: 'Can your team modernize legacy monolithic codebases?',
      answer: 'Yes. We deconstruct monolithic applications into domain-driven microservices or modular modern architectures without pausing active feature development or customer-facing operations.',
    },
  ],
  'digital-transformation': [
    {
      question: 'What is the typical timeline for an enterprise digital transformation program?',
      answer: 'Engagements commence with a 3-4 week diagnostic assessment and architecture roadmap, followed by agile 90-day implementation horizons delivering demonstrable business value at each interval.',
    },
    {
      question: 'How do you minimize operational disruption during legacy system replacement?',
      answer: 'We run parallel execution streams with automated reconciliation scripts ensuring historical data and concurrent transactional states match with 100% fidelity before decommissioning legacy systems.',
    },
    {
      question: 'How do you align executive stakeholders and technical teams?',
      answer: 'We establish a joint Transformation Governance Committee with bi-weekly progress dashboards, shared OKR scorecards, and transparent risk escalation paths.',
    },
  ],
  'digital-marketing': [
    {
      question: 'How does Codeology AI approach technical SEO for enterprise applications?',
      answer: 'We optimize server-side rendering (SSR), core web vitals, crawl budgets, Schema.org JSON-LD structured data, and internationalization (hreflang) across multi-million URL platforms.',
    },
    {
      question: 'What attribution models do you support for B2B demand generation?',
      answer: 'We build unified multi-touch attribution engines integrating CRM pipeline data, web analytics, and marketing automation to track full-funnel customer acquisition costs (CAC) and customer lifetime value (LTV).',
    },
    {
      question: 'Are marketing performance metrics guaranteed?',
      answer: 'While market dynamics vary, we establish contractual performance milestones tied to measurable indicators such as search visibility indexes, qualified lead velocity, and infrastructure response times.',
    },
  ],
  'recruitment-staffing': [
    {
      question: 'What is the vetting process for Codeology AI technical candidates?',
      answer: 'Candidates undergo rigorous three-stage technical screening: algorithmic and systems architecture evaluations conducted by senior engineers, past project code review, and behavioral assessments.',
    },
    {
      question: 'What models of engagement do you provide for staffing?',
      answer: 'We provide Embedded Technical RPO (recruitment process outsourcing), contract engineering pods, contract-to-hire, and executive retained search for VP and C-level technology leadership.',
    },
    {
      question: 'What is your average time-to-hire for specialized technology roles?',
      answer: 'Our median time-to-presentation of pre-screened, interview-ready engineering candidates is 7 to 10 business days, with full onboarding completed within 2 to 3 weeks.',
    },
  ],
  'ai-solutions': [
    {
      question: 'How do you safeguard proprietary enterprise data when building AI models?',
      answer: 'We deploy private isolated AI enclaves where customer data never leaves your VPC perimeter. We prohibit training public commercial foundation models on proprietary enterprise data.',
    },
    {
      question: 'What is Retrieval-Augmented Generation (RAG) and why is it preferred?',
      answer: 'RAG connects generative models to your internal documents and databases in real-time, providing factual, cited answers while eliminating hallucinations and the massive compute costs of retraining base models.',
    },
    {
      question: 'Are AI recommendations presented as guaranteed outcomes?',
      answer: 'No. In compliance with ethical AI governance standards, AI outputs are probabilistic heuristics designed to accelerate human decision-making, accompanied by confidence scoring and human-in-the-loop validation.',
    },
  ],
};

export const generalFaqs: FAQItem[] = [
  {
    question: 'How do we initiate a technical engagement with Codeology AI?',
    answer: 'Engagements typically begin with a confidential discovery call with a Practice Director to review your system requirements, followed by an architectural scope and delivery roadmap within 48 to 72 hours.',
  },
  {
    question: 'Where are Codeology AI engineering hubs located?',
    answer: 'Our primary headquarters is in San Francisco, with regional engineering hubs and security operations centers in New York, Austin, London, and distributed remote senior engineering pods globally.',
  },
  {
    question: 'What are your contractual terms and master service agreements (MSA)?',
    answer: 'We support flexible Statement of Work (SOW) structures including fixed-bid deliverable milestones, dedicated monthly engineering pods, and time-and-materials enterprise retainers.',
  },
  {
    question: 'Do you provide 24/7 post-deployment support and warranty?',
    answer: 'Yes. All production deployments include an initial warranty period and optional ongoing managed operations contracts covering continuous patching, uptime SLAs, and architectural escalations.',
  },
];
