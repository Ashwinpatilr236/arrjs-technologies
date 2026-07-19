import { Cpu, Code2, Building2, type LucideIcon } from 'lucide-react';

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
