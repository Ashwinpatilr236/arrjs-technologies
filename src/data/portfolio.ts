export type PortfolioItem = {
  id: string;
  title: string;
  category: 'Website' | 'Business' | 'PC Build' | 'Case Study';
  client: string;
  result: string;
  tags: string[];
  gradient: string;
};

export const portfolio: PortfolioItem[] = [
  {
    id: 'pf1',
    title: 'Restaurant Website & Booking',
    category: 'Website',
    client: 'Vadodara Restaurant',
    result: '+42% online reservations in 3 months',
    tags: ['Next.js', 'Booking', 'SEO'],
    gradient: 'from-brand-500 to-violet-500',
  },
  {
    id: 'pf2',
    title: 'Clinic Digital Setup',
    category: 'Business',
    client: 'Multi-specialty Clinic',
    result: 'End-to-end online presence + email',
    tags: ['Website', 'Email', 'Google Profile'],
    gradient: 'from-violet-500 to-brand-400',
  },
  {
    id: 'pf3',
    title: 'High-End Streaming PC',
    category: 'PC Build',
    client: 'Gaming Creator',
    result: '1440p 240fps streaming rig',
    tags: ['Custom Build', 'Liquid Cool', 'RGB'],
    gradient: 'from-brand-400 to-violet-600',
  },
  {
    id: 'pf4',
    title: 'E-Commerce Store Launch',
    category: 'Website',
    client: 'Local Apparel Brand',
    result: 'Launched in 14 days, 1st sale in week 1',
    tags: ['Shopify', 'Payments', 'SEO'],
    gradient: 'from-violet-600 to-brand-500',
  },
  {
    id: 'pf5',
    title: 'School Website & Portal',
    category: 'Website',
    client: 'Vadodara School',
    result: 'Centralized notices & admissions online',
    tags: ['CMS', 'Admissions', 'Notices'],
    gradient: 'from-brand-600 to-violet-400',
  },
  {
    id: 'pf6',
    title: 'AI Chatbot for Lead Capture',
    category: 'Case Study',
    client: 'Real Estate Firm',
    result: '3x qualified leads, 24/7 responses',
    tags: ['AI', 'Automation', 'Leads'],
    gradient: 'from-violet-400 to-brand-600',
  },
];
