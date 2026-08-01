import { ServiceItem, ServiceEstimateItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  // Web Solutions
  {
    id: 'web-dev',
    category: 'web',
    categoryTitle: '🌐 Web Solutions',
    title: 'Website Development',
    description: 'Custom, responsive, and conversion-oriented websites tailored for local businesses, shops, clinics, and professionals.',
    features: [
      'Mobile-first responsive design',
      'Fast page load speed & light code',
      'Lead collection & contact forms',
      'SEO-friendly structure & Google Maps indexing',
      'WhatsApp integration for direct customer chats'
    ],
    isLocalOnly: false,
    locationNote: 'Available globally & remotely for all businesses',
    iconName: 'Globe',
    estimatedTimeline: '3 to 7 business days',
    badge: '🔥 Trending'
  },
  {
    id: 'web-redesign',
    category: 'web',
    categoryTitle: '🌐 Web Solutions',
    title: 'Website Redesign',
    description: 'Modernize slow, outdated, or unresponsive websites to improve branding, performance, and visitor trust.',
    features: [
      'Complete UI/UX layout refresh',
      'Mobile responsiveness optimization',
      'Speed enhancement & clean architecture',
      'Content reorganization for better conversion'
    ],
    isLocalOnly: false,
    locationNote: 'Available globally & remotely',
    iconName: 'RefreshCw',
    estimatedTimeline: '2 to 5 business days'
  },
  {
    id: 'custom-web',
    category: 'web',
    categoryTitle: '🌐 Web Solutions',
    title: 'Custom Website Development',
    description: 'Tailored web applications with specific features like service booking, product showcases, or client portals.',
    features: [
      'Custom database & backend API integration',
      'Interactive tools & calculators',
      'Secure contact & appointment management',
      'Scalable TypeScript architecture'
    ],
    isLocalOnly: false,
    locationNote: 'Available globally & remotely',
    iconName: 'Code',
    estimatedTimeline: '1 to 3 weeks'
  },

  // Computer Solutions
  {
    id: 'custom-pc-build',
    category: 'computer',
    categoryTitle: '💻 Computer Solutions',
    title: 'Custom PC Build',
    description: 'Expert component selection and custom computer assembly optimized for office productivity, editing, or gaming.',
    features: [
      'Tailored component compatibility check',
      'Budget optimization based on requirements',
      'Professional wire management & airflow setup',
      'OS installation & stress testing'
    ],
    isLocalOnly: true,
    locationNote: 'Home & On-Site Service available ONLY in Vadodara',
    iconName: 'Cpu',
    estimatedTimeline: '1 to 2 business days'
  },
  {
    id: 'pc-assembly',
    category: 'computer',
    categoryTitle: '💻 Computer Solutions',
    title: 'PC Assembly',
    description: 'Professional assembly of client-owned components with careful handling and thermal paste application.',
    features: [
      'Precision mounting & secure fitting',
      'Optimal thermal paste application',
      'POST verification & BIOS setup',
      'Cable routing for clean interior aesthetics'
    ],
    isLocalOnly: true,
    locationNote: 'Home & On-Site Service available ONLY in Vadodara',
    iconName: 'Wrench',
    estimatedTimeline: 'Same day / 24 hours'
  },
  {
    id: 'computer-repair',
    category: 'computer',
    categoryTitle: '💻 Computer Solutions',
    title: 'Computer Repair',
    description: 'Diagnostics, OS troubleshooting, slow performance resolution, and hardware component replacement (excluding chip-level repair).',
    features: [
      'System slowdown diagnostics & malware cleanup',
      'Operating System installation & recovery',
      'Power supply, RAM, or storage replacement',
      'Honest repair advice (excluding chip-level repair)'
    ],
    isLocalOnly: true,
    locationNote: 'Home & On-Site Service available ONLY in Vadodara',
    iconName: 'Monitor',
    estimatedTimeline: 'Same day service in Vadodara'
  },
  {
    id: 'hardware-upgrades',
    category: 'computer',
    categoryTitle: '💻 Computer Solutions',
    title: 'Hardware Upgrades',
    description: 'Breathe new life into aging PCs with SSD installations, RAM upgrades, and graphics card enhancements.',
    features: [
      'HDD to high-speed NVMe SSD migration',
      'RAM expansion for seamless multitasking',
      'GPU & PSU upgrades for demanding tasks',
      'Data backup & OS cloning assistance'
    ],
    isLocalOnly: true,
    locationNote: 'Home & On-Site Service available ONLY in Vadodara',
    iconName: 'Zap',
    estimatedTimeline: 'Same day / On-site'
  },

  // Networking
  {
    id: 'wifi-setup',
    category: 'networking',
    categoryTitle: '🌐 Networking',
    title: 'Wi-Fi Setup & Optimization',
    description: 'Seamless wireless internet configuration for homes, duplexes, and small office spaces in Vadodara.',
    features: [
      'Dead-zone elimination & signal mapping',
      'Secure WPA3 encryption & password config',
      'Guest network isolation for security',
      'Mesh Wi-Fi system setup'
    ],
    isLocalOnly: true,
    locationNote: 'Home & On-Site Service available ONLY in Vadodara',
    iconName: 'Wifi',
    estimatedTimeline: 'Same day service'
  },
  {
    id: 'router-installation',
    category: 'networking',
    categoryTitle: '🌐 Networking',
    title: 'Router Installation & Configuration',
    description: 'Setup and optimization of fiber broadband routers, TP-Link/D-Link/Netgear equipment for maximum stability.',
    features: [
      'PPPoE & ISP gateway setup',
      'Bandwidth allocation & QoS settings',
      'Firmware updates & vulnerability patching',
      'Remote management enablement'
    ],
    isLocalOnly: true,
    locationNote: 'Home & On-Site Service available ONLY in Vadodara',
    iconName: 'Server',
    estimatedTimeline: 'Same day service'
  },
  {
    id: 'office-network',
    category: 'networking',
    categoryTitle: '🌐 Networking',
    title: 'Basic Office Network Setup',
    description: 'Reliable wired and wireless LAN setup for clinics, small offices, shops, and coaching centers.',
    features: [
      'Ethernet switch connection & structured patching',
      'Multi-device IP configuration',
      'File & folder sharing permissions',
      'Clean cable management'
    ],
    isLocalOnly: true,
    locationNote: 'Home & On-Site Service available ONLY in Vadodara',
    iconName: 'Network',
    estimatedTimeline: '1 to 2 business days'
  },
  {
    id: 'printer-sharing',
    category: 'networking',
    categoryTitle: '🌐 Networking',
    title: 'Printer Sharing Setup',
    description: 'Network setup enabling all computers in your home or office to print seamlessly to a single shared printer.',
    features: [
      'Network printer configuration',
      'Wireless printing setup for PCs and phones',
      'Driver installation on multiple devices',
      'Print queue troubleshooting'
    ],
    isLocalOnly: true,
    locationNote: 'Home & On-Site Service available ONLY in Vadodara',
    iconName: 'Printer',
    estimatedTimeline: 'Same day service'
  }
];

export const ESTIMATOR_SERVICES: ServiceEstimateItem[] = [
  { id: 'web-single', name: 'Business Website (3-5 Pages)', category: 'web', baseEstimate: '₹4,999 - ₹8,999', timeframe: '3-5 Days' },
  { id: 'web-custom', name: 'Custom Website with Advanced Features', category: 'web', baseEstimate: '₹9,999 - ₹18,999', timeframe: '1-2 Weeks' },
  { id: 'web-redesign', name: 'Existing Website Redesign & Speed Up', category: 'web', baseEstimate: '₹3,999 - ₹6,999', timeframe: '2-4 Days' },
  { id: 'pc-assembly-est', name: 'PC Assembly Service (Vadodara)', category: 'computer', baseEstimate: '₹799 - ₹1,499', timeframe: 'Same Day' },
  { id: 'ssd-upgrade-est', name: 'SSD Migration & Upgrade (Vadodara)', category: 'computer', baseEstimate: '₹499 + Hardware Cost', timeframe: 'Same Day' },
  { id: 'wifi-setup-est', name: 'Wi-Fi & Router Configuration (Vadodara)', category: 'networking', baseEstimate: '₹499 - ₹899', timeframe: 'Same Day' },
  { id: 'office-net-est', name: 'Office Network & Printer Setup (Vadodara)', category: 'networking', baseEstimate: '₹1,299 - ₹2,999', timeframe: '1 Day' }
];

export const VADODARA_AREAS = [
  'Alkapuri', 'Gotri', 'Manjalpur', 'Karelibaug', 'Sama', 'Sayajigunj',
  'Fatehgunj', 'Vasna Road', 'Makarpura', 'Subhanpura', 'Akota', 'Ellora Park',
  'Tarsali', 'Gorwa', 'Atladara', 'Bhayli', 'Waghodia Road', 'Harni'
];
