import { DemoProject } from '../types';

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'demo-apex-clinic',
    title: 'Apex Medical Clinic & Wellness Center',
    category: 'Website Development',
    industry: 'Clinics & Healthcare',
    description: 'A clean, accessible medical clinic website demo featuring appointment enquiry, doctor profile cards, and service timing schedules.',
    isDemo: true,
    features: [
      'Patient Appointment Request Form',
      'Doctor Specialties & OPD Timing Grid',
      'Google Maps Location Integration',
      'Click-to-Call & WhatsApp OPD Query Button'
    ],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    techStack: ['React', 'Tailwind CSS', 'Responsive UI', 'WhatsApp API'],
    demoDetails: {
      challenge: 'Local clinics often lose potential patients due to unclear OPD schedules, lack of mobile optimization, and friction in asking basic questions.',
      solution: 'Designed a fast-loading clinic homepage layout with instant OPD timing filters, emergency contact callouts, and direct WhatsApp enquiry routing.',
      highlights: ['Sub-second page loading speed', 'High contrast accessible typography', '1-click appointment booking trigger']
    }
  },
  {
    id: 'demo-horizon-coaching',
    title: 'Horizon Classes - Coaching Institute',
    category: 'Website Development',
    industry: 'Coaching Institutes & Education',
    description: 'A structured educational landing page demo designed to present course syllabus, batch timings, and student enquiry forms.',
    isDemo: true,
    features: [
      'Course Catalog & Downloadable Syllabus',
      'Batch Timings & Classroom Facilities Overview',
      'Student Inquiry Form with Course Selector',
      'Direct WhatsApp Admission Query'
    ],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    techStack: ['TypeScript', 'Tailwind CSS', 'Conversion Form'],
    demoDetails: {
      challenge: 'Coaching centers struggle to convey course offerings clearly to parents and students searching on mobile devices.',
      solution: 'Structured a clear course breakdown with interactive filters for Class 9-12 and Competitive Exams, paired with a prominent admission inquiry drawer.',
      highlights: ['Clear fee & batch timing layout', 'Mobile-first lead capture', 'Clean corporate aesthetic']
    }
  },
  {
    id: 'demo-vadodara-fresh',
    title: 'Vadodara Artisan Bakery & Cafe',
    category: 'Website Redesign',
    industry: 'Restaurants & Cafes',
    description: 'An appetizing, modern website redesign demo for a local cafe showcasing digital menu categories and table reservation requests.',
    isDemo: true,
    features: [
      'Interactive Digital Menu Showcase',
      'Table Booking & Catering Query Form',
      'Daily Specials & Chef Highlights',
      'Map directions & parking information'
    ],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    techStack: ['React', 'Tailwind CSS', 'Modern Typography'],
    demoDetails: {
      challenge: 'Traditional physical menus and outdated Facebook pages fail to give cafes a professional web presence or handle party bookings efficiently.',
      solution: 'Created an elegant visual menu experience with rich dish descriptions, location routing, and party hall booking forms.',
      highlights: ['Visually engaging menu grid', 'Seamless mobile navigation', 'Instant WhatsApp order inquiries']
    }
  },
  {
    id: 'demo-craft-retail',
    title: 'Vanguard Retail & Apparel Shop',
    category: 'Website Development',
    industry: 'Retail Shops & Showrooms',
    description: 'A polished local retail showcase website demo helping physical stores build online trust and showcase featured store collections.',
    isDemo: true,
    features: [
      'Store Product Collection Showcase',
      'Store Location & Business Hours Banner',
      'In-Store Visit Enquiry Form',
      'Customer Support Chat Link'
    ],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    techStack: ['React', 'Tailwind CSS', 'Filterable Grid'],
    demoDetails: {
      challenge: 'Local retail shops lose customers to online e-commerce platforms because buyers cannot check current store inventory or operating hours online.',
      solution: 'Built a lightweight catalog showcase where store owners can highlight arrival collections and guide buyers directly to their physical store location in Vadodara.',
      highlights: ['Fast product grid rendering', 'Clear store directions CTA', 'Direct inventory check via WhatsApp']
    }
  },
  {
    id: 'demo-apex-law',
    title: 'Shreeya & Associates Law Firm',
    category: 'Website Development',
    industry: 'Local Offices & Professional Services',
    description: 'A sleek, trustworthy corporate practice website demo tailored for legal consultancies, accountants, and financial advisors.',
    isDemo: true,
    features: [
      'Practice Area Breakdown (GST, Legal, Auditing)',
      'Confidential Consultation Booking Form',
      'Professional Practice Profile Cards',
      'Client Document Checklist'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    techStack: ['TypeScript', 'Tailwind CSS', 'Corporate Design'],
    demoDetails: {
      challenge: 'Professional consultation offices need high authority, immaculate visual design, and easy consultation booking.',
      solution: 'Designed a high-trust corporate portal emphasizing clarity, confidentiality, and structured practice area expertise.',
      highlights: ['Deep navy professional tone', 'Accessible consultation forms', 'Clear service scope descriptions']
    }
  },
  {
    id: 'demo-pulse-gym',
    title: 'Pulse Fitness Studio & Gym',
    category: 'Website Redesign',
    industry: 'Gyms & Fitness Centers',
    description: 'An energetic, clean fitness center website demo featuring trainer profiles, class schedules, and membership inquiry triggers.',
    isDemo: true,
    features: [
      'Trainer Bios & Specializations',
      'Weekly Workout Class Schedule',
      'Membership Plan Pricing Breakdown',
      'Free Trial Day Request Form'
    ],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    techStack: ['React', 'Tailwind CSS', 'Interactive Cards'],
    demoDetails: {
      challenge: 'Gyms often fail to convert local walk-ins because trial passes and pricing options are not clearly stated on a modern page.',
      solution: 'Constructed an action-oriented gym landing page highlighting 1-day free trial passes and trainer credentials.',
      highlights: ['High-contrast energetic layout', 'Clear pricing cards', 'Instant trial registration trigger']
    }
  }
];
