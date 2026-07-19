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
