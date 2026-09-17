export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  heroHeadline: string;
  heroSupporting: string;
  url: string;
  contactEmail: string;
  contactPhone: string;
  hqAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  navigation: {
    label: string;
    path: string;
    isMegaMenu?: boolean;
  }[];
  socials: {
    label: string;
    url: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: 'CODEOLOGY AI',
  legalName: 'Codeology AI Inc.',
  tagline: 'Technology that moves business forward.',
  heroHeadline: 'Technology that moves\nbusiness forward.',
  heroSupporting: 'We build, secure and scale digital infrastructure and software solutions for businesses ready for what\'s next.',
  url: 'https://www.codeologyai.com',
  contactEmail: 'contact@codeologyai.com',
  contactPhone: '+1 (800) 555-0199',
  hqAddress: {
    street: '550 Montgomery St, Suite 700',
    city: 'San Francisco',
    state: 'CA',
    zip: '94111',
    country: 'United States',
  },
  navigation: [
    { label: 'Solutions', path: '/solutions', isMegaMenu: true },
    { label: 'Industries', path: '/industries' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Company', path: '/about' },
    { label: 'Insights', path: '/insights' },
    { label: 'Careers', path: '/careers' },
  ],
  socials: [
    { label: 'LinkedIn', url: 'https://linkedin.com/company/codeologyai' },
    { label: 'GitHub', url: 'https://github.com/codeologyai' },
    { label: 'X / Twitter', url: 'https://x.com/codeologyai' },
  ],
};
