export type PageView = 'home' | 'about' | 'services' | 'store' | 'portfolio' | 'contact' | 'admin';

export interface AdminLead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  customerType: string;
  specificService: string;
  location: string;
  isVadodaraResident: boolean;
  message?: string;
  status: 'new' | 'contacted' | 'quoted' | 'completed';
}

export interface ServiceItem {
  id: string;
  category: 'web' | 'computer' | 'networking';
  categoryTitle: string;
  title: string;
  description: string;
  features: string[];
  isLocalOnly?: boolean;
  locationNote?: string;
  iconName: string;
  estimatedTimeline?: string;
  badge?: string;
  badges?: string[];
}

export interface StoreProduct {
  id: string;
  title: string;
  category: 'laptops-pcs' | 'networking' | 'components' | 'accessories';
  categoryName: string;
  description: string;
  rating: number;
  specs: string[];
  recommendedFor: string;
  affiliateUrlAmazon?: string;
  affiliateUrlFlipkart?: string;
  imageUrl: string;
  badge?: string;
  badges?: string[];
}

export interface DemoProject {
  id: string;
  title: string;
  category: 'Website Development' | 'Website Redesign' | 'Custom Web Application' | 'Web Development';
  industry: string;
  description: string;
  isDemo: true; // Strictly true as per rule
  features: string[];
  image: string;
  techStack: string[];
  previewUrl?: string;
  badge?: string;
  badges?: string[];
  demoDetails: {
    challenge: string;
    solution: string;
    highlights: string[];
  };
}

export interface ServiceEstimateItem {
  id: string;
  name: string;
  category: 'web' | 'computer' | 'networking';
  baseEstimate: string;
  timeframe: string;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  officialEmail: string;
  officialPhone: string;
  officialWhatsApp: string;
  operatingHours: string;
  locationCity: string;
  officeAddress: string;
  
  // Banner & Hero
  showTopBanner: boolean;
  topBannerText: string;
  heroHeadline: string;
  heroHighlightText: string;
  heroSubtitle: string;
  heroBadgeText: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  
  // Trust Stats
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  
  // About Page
  aboutHeadline: string;
  aboutMissionText: string;
  aboutStoryText: string;
  
  // Floating Button & Modal
  floatingCtaText: string;
  modalTitle: string;
  modalSubtitle: string;
  
  // Footer & Social
  footerDescription: string;
  copyrightText: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  
  // SEO Meta
  customSeoTitle: string;
  customSeoDescription: string;
  customSeoKeywords: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  customerType: 'Small Business' | 'Home User' | 'Clinic' | 'Retail Shop' | 'Restaurant' | 'Gym' | 'Coaching Institute' | 'Freelancer' | 'Local Office' | 'Individual';
  serviceCategory: 'web' | 'computer' | 'networking' | 'store-inquiry' | 'general';
  specificService: string;
  location: string;
  isVadodaraResident: boolean;
  message: string;
}
