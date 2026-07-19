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
