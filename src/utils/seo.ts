import { PageView } from '../types';

export const SEO_METADATA: Record<PageView, { title: string; description: string; keywords: string }> = {
  home: {
    title: 'ARRJS Technologies - IT Services, Computer Repair & Custom PC Build Vadodara',
    description: 'Professional Web Development, Doorstep Computer Repair, Custom RTX Gaming & Workstation PC Assembly, and Office Networking Services in Vadodara, Gujarat.',
    keywords: 'ARRJS Technologies, Computer Repair Vadodara, Custom PC Build Vadodara, Website Development Vadodara, IT Services, Doorstep PC Assembly, Networking Alkapuri Gotri'
  },
  services: {
    title: 'Technology Services & Doorstep Solutions Catalog | ARRJS Technologies',
    description: 'Explore Web Development Solutions, On-Site Computer Repair, SSD/RAM Upgrades, Custom PC Assembly, & Office Wi-Fi Networking Services in Vadodara.',
    keywords: 'Web Development Catalog, Laptop Repair Vadodara, SSD Upgrade Vadodara, Office Network Setup, Doorstep Repair Services'
  },
  store: {
    title: 'Tech Store & Recommended Hardware | ARRJS Technologies Vadodara',
    description: 'Curated hardware recommendations, laptops, graphics cards, motherboards, & networking gear with direct partner links & honest advice.',
    keywords: 'Tech Store Vadodara, PC Components India, Laptops Recommendation, Graphics Card RTX 4070, Networking Hardware'
  },
  portfolio: {
    title: 'Demo Portfolio & Web Development Showcase | ARRJS Technologies',
    description: 'Interactive demo projects including clinic portals, e-commerce stores, restaurant billing, real estate directories, & custom web apps.',
    keywords: 'Web Portfolio Vadodara, React Web Apps, Dental Clinic Website, E-commerce Demo, Custom Software Showcase'
  },
  about: {
    title: 'About ARRJS Technologies - Our Mission & Vadodara Tech Team',
    description: 'Learn about ARRJS Technologies, our transparent pricing philosophy, experienced technicians, & commitment to quality tech services in Vadodara.',
    keywords: 'About ARRJS Technologies, Vadodara Tech Company, Honest PC Repair, Transparent IT Services'
  },
  contact: {
    title: 'Contact ARRJS Technologies | Vadodara Office & Consultation',
    description: 'Get free technology consultation or book doorstep computer repair in Vadodara. Call +91 9825012345 or WhatsApp us directly.',
    keywords: 'Contact ARRJS Technologies, Phone Number 9825012345, WhatsApp Tech Support Vadodara, Alkapuri Address'
  },
  admin: {
    title: 'Control Center Portal - ARRJS Technologies',
    description: 'Internal Management Portal for ARRJS Technologies.',
    keywords: 'Admin Control Portal'
  }
};

export function updatePageSEO(view: PageView) {
  const meta = SEO_METADATA[view] || SEO_METADATA.home;

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Update Meta Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', meta.description);

  // 3. Update Meta Keywords
  let kwMeta = document.querySelector('meta[name="keywords"]');
  if (!kwMeta) {
    kwMeta = document.createElement('meta');
    kwMeta.setAttribute('name', 'keywords');
    document.head.appendChild(kwMeta);
  }
  kwMeta.setAttribute('content', meta.keywords);

  // 4. Update OpenGraph Tags for WhatsApp & Social Shares
  const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
  ogTitle.setAttribute('property', 'og:title');
  ogTitle.setAttribute('content', meta.title);
  document.head.appendChild(ogTitle);

  const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
  ogDesc.setAttribute('property', 'og:description');
  ogDesc.setAttribute('content', meta.description);
  document.head.appendChild(ogDesc);

  // 5. Inject Structured JSON-LD Schema for Google Rich Snippets
  let jsonLdScript = document.getElementById('arrjs-json-ld');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'arrjs-json-ld';
    jsonLdScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(jsonLdScript);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ARRJS Technologies",
    "image": "https://arrjs-technologies.vercel.app/assets/logo/logo.svg",
    "@id": "https://arrjs-technologies.vercel.app",
    "url": "https://arrjs-technologies.vercel.app",
    "telephone": "+919825012345",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Alkapuri Main Road",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.3072,
      "longitude": 73.1812
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com",
      "https://linkedin.com"
    ]
  };

  jsonLdScript.textContent = JSON.stringify(structuredData);
}
