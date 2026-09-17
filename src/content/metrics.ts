export interface MetricItem {
  id: string;
  value: string;
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  cmsNotice?: string;
}

export const companyMetrics: MetricItem[] = [
  {
    id: 'metric-experience',
    value: '25+',
    numericTarget: 25,
    suffix: '+',
    label: 'Years Experience',
    description: 'Quarter century delivering mission-critical enterprise computing and technology architecture.',
    cmsNotice: '[CMS METRIC: Editable in Admin Panel]',
  },
  {
    id: 'metric-projects',
    value: '350+',
    numericTarget: 350,
    suffix: '+',
    label: 'Enterprise Projects',
    description: 'Production systems delivered across Fortune 500, healthcare, and high-growth technology firms.',
    cmsNotice: '[CMS METRIC: Editable in Admin Panel]',
  },
  {
    id: 'metric-reliability',
    value: '99.99%',
    numericTarget: 99.99,
    suffix: '%',
    label: 'Infrastructure Reliability',
    description: 'Contractually backed SLA uptime maintained across global client private and hybrid cloud topologies.',
    cmsNotice: '[CMS METRIC: Editable in Admin Panel]',
  },
  {
    id: 'metric-cloud-transformations',
    value: '120+',
    numericTarget: 120,
    suffix: '+',
    label: 'Cloud Transformations',
    description: 'Zero-downtime database migrations, microservice modernizations, and cloud landing zones.',
    cmsNotice: '[CMS METRIC: Editable in Admin Panel]',
  },
];
