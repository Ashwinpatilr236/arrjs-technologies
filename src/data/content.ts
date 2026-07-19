import {
  Cpu,
  Code2,
  Building2,
  ShoppingCart,
  Camera,
  Network,
  Bot,
  Globe,
  ShieldCheck,
  Wrench,
  Mail,
  FileSpreadsheet,
  LayoutTemplate,
  Atom,
  FileText,
  Briefcase,
  Calculator,
  Users,
  GraduationCap,
  BookOpen,
  Sparkles,
  Palette,
  Database,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  accent: 'brand' | 'violet';
};

export const services: Service[] = [
  {
    id: 'pc-consultation',
    icon: Cpu,
    title: 'PC Consultation & Build',
    tagline: 'Tailored rigs for every need and budget',
    description:
      'From budget builds to high-end workstations, we consult, plan, assemble and optimize PCs for gaming, content creation, programming and office work.',
    items: [
      'Gaming PC Consultation',
      'Office PC Consultation',
      'Video Editing PC',
      'Streaming PC',
      'Programming PC',
      'Workstation PC',
      'Budget PC Planning',
      'High-End PC Planning',
      'PC Parts Recommendation',
      'Custom PC Build',
      'PC Assembly',
      'BIOS Update',
      'Cable Management',
      'Performance Optimization',
      'Cooling Consultation',
      'Upgrade Consultation',
      'SSD Upgrade',
      'RAM Upgrade',
      'GPU Upgrade',
      'Remote Troubleshooting',
      'Windows Installation',
      'Driver Installation',
      'Software Installation',
      'Performance Check',
      'Price Quote Request',
    ],
    accent: 'brand',
  },
  {
    id: 'website-development',
    icon: Code2,
    title: 'Website Development',
    tagline: 'Premium websites for every industry',
    description:
      'Conversion-focused, SEO-ready websites built with modern stacks — for businesses, professionals, restaurants, schools and e-commerce.',
    items: [
      'Business Website',
      'Portfolio Website',
      'Landing Page',
      'Restaurant Website',
      'Doctor Website',
      'Clinic Website',
      'School Website',
      'Construction Website',
      'Real Estate Website',
      'Interior Designer',
      'Gym Website',
      'Salon Website',
      'Travel Agency',
      'NGO Website',
      'Hotel Website',
      'E-Commerce Website',
      'Blog Website',
      'News Portal',
      'Personal Website',
      'Custom Web Application',
    ],
    accent: 'violet',
  },
  {
    id: 'business-setup',
    icon: Building2,
    title: 'Business Setup Services',
    tagline: 'Everything to launch and run online',
    description:
      'Get your business online and running smoothly — from domain, email and hosting to booking systems, payment gateways and IT infrastructure.',
    items: [
      'Google Business Profile Setup',
      'Business Email Setup',
      'Professional Email',
      'Domain Registration Assistance',
      'Hosting Setup',
      'SSL Configuration',
      'Cloudflare Setup',
      'WhatsApp Business Setup',
      'AI Chatbot Integration',
      'Contact Forms',
      'Booking System',
      'Payment Gateway',
      'Website Maintenance',
      'SEO Basics',
      'Speed Optimization',
      'Website Security',
      'Analytics Setup',
      'Facebook Pixel',
      'Remote IT Support',
      'PC Setup',
      'Laptop Setup',
      'Printer Setup',
      'Network Setup',
      'WiFi Consultation',
      'Router Configuration',
      'CCTV Consultation',
      'CCTV Planning',
      'Office IT Setup',
      'Annual Maintenance Contract (AMC)',
    ],
    accent: 'brand',
  },
];

export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge: 'Best Seller' | 'Featured' | 'New' | 'Free' | 'Premium';
  icon: LucideIcon;
  description: string;
  features: string[];
};

export const productCategories = [
  'All',
  'Excel Templates',
  'Invoice Templates',
  'Business Templates',
  'Accounting Templates',
  'HR Templates',
  'Website Templates',
  'React Templates',
  'Next.js Templates',
  'Landing Pages',
  'Resume Templates',
  'Canva Templates',
  'Notion Templates',
  'AI Prompts',
  'Ebooks',
  'Source Code',
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'GST Invoice Template (Excel)',
    category: 'Invoice Templates',
    price: 299,
    oldPrice: 499,
    rating: 4.9,
    reviews: 214,
    badge: 'Best Seller',
    icon: FileSpreadsheet,
    description: 'Auto-calculating GST-ready invoice template with client database and monthly summary.',
    features: ['GST ready', 'Auto calculations', 'Client database', 'Monthly summary'],
  },
  {
    id: 'p2',
    title: 'Small Business Accounting Pack',
    category: 'Accounting Templates',
    price: 599,
    oldPrice: 999,
    rating: 4.8,
    reviews: 132,
    badge: 'Featured',
    icon: Calculator,
    description: 'Complete accounting workbook — P&L, cashflow, ledger, receivables and payables.',
    features: ['P&L statement', 'Cashflow', 'Ledger', 'Receivables & Payables'],
  },
  {
    id: 'p3',
    title: 'HR & Attendance Sheet',
    category: 'HR Templates',
    price: 349,
    rating: 4.7,
    reviews: 88,
    badge: 'New',
    icon: Users,
    description: 'Track employee attendance, leave, payroll and performance in one workbook.',
    features: ['Attendance', 'Leave tracker', 'Payroll', 'Performance'],
  },
  {
    id: 'p4',
    title: 'SaaS Landing Page (React)',
    category: 'React Templates',
    price: 1499,
    oldPrice: 2499,
    rating: 5.0,
    reviews: 76,
    badge: 'Best Seller',
    icon: Atom,
    description: 'Production-ready React + Tailwind landing page with auth, pricing and dashboard.',
    features: ['React + TS', 'Tailwind', 'Auth flow', 'Pricing table'],
  },
  {
    id: 'p5',
    title: 'Next.js SaaS Starter Kit',
    category: 'Next.js Templates',
    price: 2499,
    oldPrice: 3999,
    rating: 4.9,
    reviews: 54,
    badge: 'Premium',
    icon: Code2,
    description: 'Full-stack Next.js starter with auth, payments, blog and admin dashboard.',
    features: ['Next.js 14', 'Stripe', 'Auth', 'Admin panel'],
  },
  {
    id: 'p6',
    title: 'Business Website Template (HTML)',
    category: 'Website Templates',
    price: 799,
    rating: 4.6,
    reviews: 41,
    badge: 'Featured',
    icon: Globe,
    description: 'Clean multi-page HTML website template for small businesses and agencies.',
    features: ['5 pages', 'Responsive', 'SEO ready', 'Contact form'],
  },
  {
    id: 'p7',
    title: 'Resume Template Bundle',
    category: 'Resume Templates',
    price: 199,
    rating: 4.8,
    reviews: 312,
    badge: 'Best Seller',
    icon: FileText,
    description: '10 modern ATS-friendly resume templates in Word and Canva formats.',
    features: ['10 designs', 'ATS friendly', 'Word + Canva', 'Cover letter'],
  },
  {
    id: 'p8',
    title: 'Notion Productivity OS',
    category: 'Notion Templates',
    price: 499,
    oldPrice: 799,
    rating: 4.9,
    reviews: 167,
    badge: 'Featured',
    icon: Briefcase,
    description: 'All-in-one Notion workspace — tasks, goals, notes, habits and finance tracker.',
    features: ['Tasks', 'Goals', 'Habits', 'Finance'],
  },
  {
    id: 'p9',
    title: 'AI Prompt Pack (500+)',
    category: 'AI Prompts',
    price: 0,
    rating: 4.7,
    reviews: 421,
    badge: 'Free',
    icon: Sparkles,
    description: '500+ curated prompts for marketing, content, coding and business.',
    features: ['500+ prompts', 'Categorized', 'Business', 'Coding'],
  },
  {
    id: 'p10',
    title: 'Admin Dashboard UI Kit',
    category: 'React Templates',
    price: 1299,
    oldPrice: 1999,
    rating: 4.8,
    reviews: 63,
    badge: 'Premium',
    icon: LayoutTemplate,
    description: 'Fully responsive admin dashboard with charts, tables and dark mode.',
    features: ['Charts', 'Tables', 'Dark mode', 'Auth pages'],
  },
  {
    id: 'p11',
    title: 'Cloud & Cyber Security Notes',
    category: 'Ebooks',
    price: 0,
    rating: 4.6,
    reviews: 233,
    badge: 'Free',
    icon: BookOpen,
    description: 'Concise study notes covering cloud fundamentals and cyber security basics.',
    features: ['Cloud basics', 'Security', 'Interview ready', 'PDF'],
  },
  {
    id: 'p12',
    title: 'Project Management Tracker',
    category: 'Business Templates',
    price: 399,
    rating: 4.7,
    reviews: 98,
    badge: 'New',
    icon: Database,
    description: 'Kanban + timeline project tracker with team workload and reporting.',
    features: ['Kanban', 'Timeline', 'Workload', 'Reporting'],
  },
];

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

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Patel',
    role: 'Clinic Owner, Vadodara',
    quote:
      'ARRJS set up our clinic website, professional email and Google profile in days. Patients now find us online and book appointments directly. Truly professional service.',
    rating: 5,
    initials: 'DP',
  },
  {
    id: 't2',
    name: 'Rahul Mehta',
    role: 'Gaming Streamer',
    quote:
      'My custom streaming PC is an absolute beast. They helped me pick every part for my budget and the cable management is art. Worth every rupee.',
    rating: 5,
    initials: 'RM',
  },
  {
    id: 't3',
    name: 'Priya Shah',
    role: 'Restaurant Owner',
    quote:
      'Our new website with online booking brought in 40% more reservations. The team understood our brand and delivered something premium.',
    rating: 5,
    initials: 'PS',
  },
  {
    id: 't4',
    name: 'Amit Desai',
    role: 'Startup Founder',
    quote:
      'From landing page to AI chatbot to payment integration — ARRJS handled our entire tech stack. Fast, reliable and genuinely affordable.',
    rating: 5,
    initials: 'AD',
  },
  {
    id: 't5',
    name: 'Sneha Joshi',
    role: 'School Administrator',
    quote:
      'The school website and admissions portal made our work so much easier. Notices, forms and admissions all in one place. Excellent support.',
    rating: 5,
    initials: 'SJ',
  },
  {
    id: 't6',
    name: 'Karan Vyas',
    role: 'Shop Owner',
    quote:
      'They set up my Google Business Profile, business email and CCTV consultation. Professional, on-time and very reasonably priced.',
    rating: 5,
    initials: 'KV',
  },
];

export type Faq = {
  id: string;
  q: string;
  a: string;
};

export const faqs: Faq[] = [
 
 
 
  {
    id: 'f1',
    q: 'Do you provide on-site service in Vadodara?',
    a: 'Yes. We offer home and office visits across Vadodara for PC setup, IT support, printer setup, CCTV consultation, networking and business technology solutions. For clients outside Vadodara we offer secure remote support and online consultation across all of India.',
  },
  {
    id: 'f2',
    q: 'How much does a custom PC build cost?',
    a: 'Pricing depends on your use case and budget — gaming, streaming, video editing, programming or office work. After a free consultation we provide a detailed quote with recommended parts, performance targets and total cost. Budget builds start affordably and scale up to high-end workstations.',
  },
  {
    id: 'f3',
    q: 'How long does website development take?',
    a: 'A standard business website takes 5–10 days, a landing page 2–4 days, and larger e-commerce or custom web applications 2–4 weeks depending on scope. We share a clear timeline before starting and keep you updated throughout.',
  },
  {
    id: 'f4',
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes. We offer website maintenance, security patches, performance tuning and Annual Maintenance Contracts (AMC) for IT infrastructure. Plans are flexible and can be monthly or annual.',
  },
  {
    id: 'f5',
    q: 'Are the digital products instantly downloadable?',
    a: 'Yes. All digital products in our store are available for instant download after secure checkout. Free products can be downloaded immediately, and premium products come with lifetime updates.',
  },
  {
    id: 'f6',
    q: 'What payment methods do you accept?',
    a: 'We support UPI, cards, net banking, wallets, Razorpay and Stripe. GST-ready invoices are generated automatically for every order and service.',
  },
  {
    id: 'f7',
    q: 'Can you help set up my business online from scratch?',
    a: 'Absolutely. Our Business Setup Services cover domain registration, hosting, SSL, professional email, Google Business Profile, WhatsApp Business, contact forms, booking systems, payment gateways and analytics — everything you need to launch and grow online.',
  },

  {
  id: 'f8',
  q: 'Why should I choose ARRJS Technologies?',
  a: 'ARRJS Technologies provides complete technology solutions under one roof — from websites and custom software to AI solutions, cloud services, PC builds and IT support. We focus on quality, transparent pricing and long-term customer relationships.'
},
{
  id: 'f9',
  q: 'Do you work with clients outside Vadodara?',
  a: 'Yes. We work with clients across India through remote consultation, online meetings and secure remote support. On-site services are available in Vadodara.'
},
{
  id: 'f10',
  q: 'Do you provide a free consultation before starting a project?',
  a: 'Yes. We offer an initial consultation to understand your requirements, suggest the right solution and provide a transparent estimate before starting the project.'
},
{
  id: 'f11',
  q: 'Can you redesign my existing website?',
  a: 'Yes. We help businesses redesign outdated websites with modern UI, better performance, mobile responsiveness, SEO improvements and improved user experience.'
},
{
  id: 'f12',
  q: 'Do you provide AI automation for businesses?',
  a: 'Yes. We help businesses automate repetitive tasks using AI chatbots, workflow automation, customer support solutions and AI-powered business tools.'
},
{
  id: 'f13',
  q: 'Do you provide warranty or support for custom PC builds?',
  a: 'Yes. Custom PC builds include component warranty as per manufacturer terms. We also provide setup assistance, troubleshooting and upgrade consultation.'
},
{
  id: 'f14',
  q: 'How do I start a project with ARRJS Technologies?',
  a: 'Simply contact us with your requirements. We will understand your goals, recommend the best solution, share pricing and start the project after approval.'
},
];

export type BlogPost = {
  id: string;
  title: string;
  category: 'Technology' | 'AI' | 'Website Tips' | 'Business' | 'PC Building' | 'Cloud' | 'Cyber Security';
  excerpt: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'How AI Chatbots Are Transforming Small Business Lead Capture',
    category: 'AI',
    excerpt: 'Why 24/7 automated responses are the highest-ROI upgrade for service businesses in 2026.',
    date: 'Jul 12, 2026',
    readTime: '5 min read',
  },
  {
    id: 'b2',
    title: 'The Complete Guide to Building a Gaming PC in Vadodara',
    category: 'PC Building',
    excerpt: 'Parts selection, budgeting, cooling and assembly tips for your first custom gaming rig.',
    date: 'Jul 8, 2026',
    readTime: '8 min read',
  },
  {
    id: 'b3',
    title: '7 Website Speed Optimizations That Actually Convert',
    category: 'Website Tips',
    excerpt: 'Core Web Vitals, image optimization and lazy loading — the changes that move the needle.',
    date: 'Jul 3, 2026',
    readTime: '6 min read',
  },
  {
    id: 'b4',
    title: 'Cloud Security Basics Every Business Owner Should Know',
    category: 'Cyber Security',
    excerpt: 'Backups, 2FA, access control and monitoring — the fundamentals that prevent disasters.',
    date: 'Jun 28, 2026',
    readTime: '7 min read',
  },
  {
    id: 'b5',
    title: 'Why Every Local Business Needs a Google Business Profile',
    category: 'Business',
    excerpt: 'How appearing on Google Maps drives foot traffic and trust for Vadodara businesses.',
    date: 'Jun 22, 2026',
    readTime: '4 min read',
  },
  {
    id: 'b6',
    title: 'Choosing the Right Cloud Stack for Your Startup',
    category: 'Cloud',
    excerpt: 'A practical comparison of hosting, storage and serverless options for early-stage teams.',
    date: 'Jun 15, 2026',
    readTime: '9 min read',
  },
];

export const stats = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 180, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

export const serviceOptionsForForm = [
  'PC Consultation & Build',
  'Website Development',
  'Business Setup',
  'AI Chatbot Development',
  'IT Support',
  'CCTV Consultation',
  'Networking',
  'Digital Products',
  'Other',
];
