export interface CareerHighlight {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange: string;
}

export const careersPreviewContent = {
  headline: "Build what's next with us.",
  description: 'Join a team solving meaningful technology problems across software, cloud, cybersecurity and digital transformation.',
  openPositionsCount: 8,
  departmentsCount: 5,
  locations: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Remote (US & Global)'],
  featuredRoles: [
    {
      id: 'job-1',
      slug: 'staff-cloud-architect',
      title: 'Staff Cloud Architect (AWS/K8s)',
      department: 'Cloud Infrastructure',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salaryRange: '$210,000 – $250,000',
    },
    {
      id: 'job-2',
      slug: 'principal-cybersecurity-engineer',
      title: 'Principal Cybersecurity Engineer',
      department: 'Cybersecurity & Zero Trust',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      salaryRange: '$195,000 – $235,000',
    },
    {
      id: 'job-3',
      slug: 'lead-fullstack-engineer',
      title: 'Lead Full-Stack Engineer (TS/Go)',
      department: 'Software Engineering',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      salaryRange: '$180,000 – $215,000',
    },
  ] as CareerHighlight[],
  ctaText: 'Explore Careers',
  ctaPath: '/careers',
};
