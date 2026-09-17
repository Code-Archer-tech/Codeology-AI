export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  initials: string;
  verifiedTag: string;
  cmsNotice: string;
}

export const testimonialsContent: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'Codeology AI rebuilt our entire transactional backbone while we maintained 100% active uptime for over 4 million end users. Their architectural discipline and 24/7 responsiveness set an entirely new benchmark for technology partners.',
    clientName: 'Julian Sterling',
    role: 'Chief Technology Officer',
    company: '[CMS CONTENT: FinTech Global Core]',
    initials: 'JS',
    verifiedTag: 'VERIFIED ENTERPRISE ENGAGEMENT',
    cmsNotice: '[CMS CONTENT: Testimonial managed in CMS database]',
  },
  {
    id: 'test-2',
    quote: 'When we needed to staff an entire specialized distributed engineering pod for a critical HIPAA EHR rollout within 45 days, Codeology delivered pre-vetted engineers who were committing production-grade code in week two.',
    clientName: 'Dr. Evelyn Morales',
    role: 'Senior VP of Digital Health',
    company: '[CMS CONTENT: National Healthcare Systems]',
    initials: 'EM',
    verifiedTag: 'VERIFIED ENTERPRISE ENGAGEMENT',
    cmsNotice: '[CMS CONTENT: Testimonial managed in CMS database]',
  },
  {
    id: 'test-3',
    quote: 'Their cybersecurity practice audited our distributed zero-trust perimeters and identified architectural vulnerabilities that previous tier-one consultancies had overlooked. The remediation runbooks were immediate and flawless.',
    clientName: 'Cameron Vance',
    role: 'Chief Information Security Officer',
    company: '[CMS CONTENT: Autonomous Logistics Systems]',
    initials: 'CV',
    verifiedTag: 'VERIFIED ENTERPRISE ENGAGEMENT',
    cmsNotice: '[CMS CONTENT: Testimonial managed in CMS database]',
  },
];
