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
