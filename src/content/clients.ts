export interface ClientPartner {
  id: string;
  name: string;
  sector: string;
  placeholderLabel: string;
  badgeText: string;
  isCmsPlaceholder: boolean;
}

export const trustedClients: ClientPartner[] = [
  {
    id: 'client-1',
    name: 'Global Financial Clearinghouse',
    sector: 'FinTech & Capital Markets',
    placeholderLabel: '[CMS LOGO: Tier-1 FinTech]',
    badgeText: 'FINTECH_PARTNER_01',
    isCmsPlaceholder: true,
  },
  {
    id: 'client-2',
    name: 'Integrated Health Systems',
    sector: 'Healthcare & Life Sciences',
    placeholderLabel: '[CMS LOGO: HealthTech Network]',
    badgeText: 'HEALTH_SYSTEM_02',
    isCmsPlaceholder: true,
  },
  {
    id: 'client-3',
    name: 'Autonomous Supply & Logistics',
    sector: 'Industrial IoT & Logistics',
    placeholderLabel: '[CMS LOGO: Logistics Group]',
    badgeText: 'LOGISTICS_OPS_03',
    isCmsPlaceholder: true,
  },
  {
    id: 'client-4',
    name: 'Enterprise Cloud SaaS Platform',
    sector: 'Software & Cloud Services',
    placeholderLabel: '[CMS LOGO: Global SaaS Provider]',
    badgeText: 'SAAS_PLATFORM_04',
    isCmsPlaceholder: true,
  },
  {
    id: 'client-5',
    name: 'Decentralized Energy Grid Network',
    sector: 'Energy & Smart Utilities',
    placeholderLabel: '[CMS LOGO: Clean Energy Corp]',
    badgeText: 'ENERGY_GRID_05',
    isCmsPlaceholder: true,
  },
  {
    id: 'client-6',
    name: 'Omnichannel Retail Exchange',
    sector: 'Commerce & Retail',
    placeholderLabel: '[CMS LOGO: Retail Consortium]',
    badgeText: 'RETAIL_GLOBAL_06',
    isCmsPlaceholder: true,
  },
];
