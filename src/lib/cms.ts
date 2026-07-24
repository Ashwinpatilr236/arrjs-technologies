import { blogPosts as generatedBlogPosts } from '../data/blogPosts.generated';
import { products as initialProducts, type Product } from '../data/products';
import { testimonials as initialTestimonials, type Testimonial } from '../data/testimonials';

export type BlogPostItem = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  html: string;
  coverImage?: string;
  status: 'published' | 'draft';
};

export type StoreProductItem = {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  features: string[];
  imageUrl?: string;
  downloadUrl?: string;
  whatsappLink?: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  avatar?: string;
  isFeatured?: boolean;
};

export type InquiryItem = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  location?: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'resolved';
};

export type NewsletterItem = {
  id: string;
  email: string;
  date: string;
};

export type SiteSettings = {
  announcementBanner: string;
  bannerEnabled: boolean;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  whatsappNumber: string;
  accentTheme: 'brand' | 'violet' | 'emerald' | 'amber';
};

const DEFAULT_SETTINGS: SiteSettings = {
  announcementBanner: '🚀 Special Offer: Get 20% off all Web & AI Development Packages this month!',
  bannerEnabled: true,
  contactPhone: '+91 98765 43210',
  contactEmail: 'hello@arrjs.tech',
  contactAddress: 'Vadodara, Gujarat — On-site & Remote across India',
  whatsappNumber: '919876543210',
  accentTheme: 'brand',
};

// Storage Keys
const KEYS = {
  BLOGS: 'arrjs_cms_blogs',
  PRODUCTS: 'arrjs_cms_products',
  TESTIMONIALS: 'arrjs_cms_testimonials',
  INQUIRIES: 'arrjs_cms_inquiries',
  NEWSLETTER: 'arrjs_cms_newsletters',
  SETTINGS: 'arrjs_cms_settings',
  AUTH: 'arrjs_cms_admin_auth',
};

// Helper: Local Storage wrapper
function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error('Storage write error:', err);
  }
}

// Initial Data Normalization
const defaultBlogs: BlogPostItem[] = generatedBlogPosts.map((b) => ({
  id: b.id,
  title: b.title,
  category: b.category,
  excerpt: b.excerpt,
  date: b.date,
  readTime: b.readTime,
  slug: b.slug,
  html: b.html,
  status: 'published',
}));

const defaultProducts: StoreProductItem[] = initialProducts.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  price: p.price,
  oldPrice: p.oldPrice,
  rating: p.rating || 5.0,
  reviews: p.reviews || 10,
  badge: p.badge,
  description: p.description,
  features: p.features,
}));

const defaultTestimonials: TestimonialItem[] = initialTestimonials.map((t) => ({
  id: t.id,
  name: t.name,
  role: t.role,
  quote: t.quote,
  rating: t.rating,
  initials: t.initials,
  isFeatured: true,
}));

// --- CMS API SERVICES ---

export const cms = {
  // Auth
  isLoggedIn(): boolean {
    return localStorage.getItem(KEYS.AUTH) === 'true';
  },
  login(passcode: string): boolean {
    // Simple passcode check (default: 'admin123' or customizable)
    if (passcode === 'admin123' || passcode === 'arrjs2026') {
      localStorage.setItem(KEYS.AUTH, 'true');
      return true;
    }
    return false;
  },
  logout(): void {
    localStorage.removeItem(KEYS.AUTH);
  },

  // Blogs
  getBlogs(): BlogPostItem[] {
    return getStored<BlogPostItem[]>(KEYS.BLOGS, defaultBlogs);
  },
  getBlogBySlug(slug: string): BlogPostItem | undefined {
    return this.getBlogs().find((b) => b.slug === slug);
  },
  saveBlog(blog: Partial<BlogPostItem> & { title: string; content?: string; html?: string }): BlogPostItem {
    const blogs = this.getBlogs();
    const slug = blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date().toISOString();

    let item: BlogPostItem;
    if (blog.id) {
      const idx = blogs.findIndex((b) => b.id === blog.id);
      if (idx !== -1) {
        item = {
          ...blogs[idx],
          ...blog,
          slug,
          html: blog.html || blog.content || blogs[idx].html,
        };
        blogs[idx] = item;
      } else {
        item = {
          id: blog.id,
          title: blog.title,
          category: blog.category || 'General',
          excerpt: blog.excerpt || '',
          date: blog.date || now,
          readTime: blog.readTime || '4 min read',
          slug,
          html: blog.html || blog.content || '',
          coverImage: blog.coverImage,
          status: blog.status || 'published',
        };
        blogs.unshift(item);
      }
    } else {
      item = {
        id: 'b_' + Date.now(),
        title: blog.title,
        category: blog.category || 'General',
        excerpt: blog.excerpt || '',
        date: now,
        readTime: blog.readTime || '4 min read',
        slug,
        html: blog.html || blog.content || '',
        coverImage: blog.coverImage,
        status: blog.status || 'published',
      };
      blogs.unshift(item);
    }
    setStored(KEYS.BLOGS, blogs);
    return item;
  },
  deleteBlog(id: string): void {
    const blogs = this.getBlogs().filter((b) => b.id !== id);
    setStored(KEYS.BLOGS, blogs);
  },

  // Store Products
  getProducts(): StoreProductItem[] {
    return getStored<StoreProductItem[]>(KEYS.PRODUCTS, defaultProducts);
  },
  saveProduct(prod: Partial<StoreProductItem> & { title: string; price: number }): StoreProductItem {
    const products = this.getProducts();
    let item: StoreProductItem;
    if (prod.id) {
      const idx = products.findIndex((p) => p.id === prod.id);
      if (idx !== -1) {
        item = { ...products[idx], ...prod };
        products[idx] = item;
      } else {
        item = {
          id: prod.id,
          title: prod.title,
          category: prod.category || 'Digital Product',
          price: Number(prod.price),
          oldPrice: prod.oldPrice ? Number(prod.oldPrice) : undefined,
          rating: prod.rating || 5.0,
          reviews: prod.reviews || 1,
          badge: prod.badge,
          description: prod.description || '',
          features: prod.features || [],
          imageUrl: prod.imageUrl,
          downloadUrl: prod.downloadUrl,
          whatsappLink: prod.whatsappLink,
        };
        products.unshift(item);
      }
    } else {
      item = {
        id: 'p_' + Date.now(),
        title: prod.title,
        category: prod.category || 'Digital Product',
        price: Number(prod.price),
        oldPrice: prod.oldPrice ? Number(prod.oldPrice) : undefined,
        rating: 5.0,
        reviews: 1,
        badge: prod.badge || 'New',
        description: prod.description || '',
        features: prod.features || [],
        imageUrl: prod.imageUrl,
        downloadUrl: prod.downloadUrl,
        whatsappLink: prod.whatsappLink,
      };
      products.unshift(item);
    }
    setStored(KEYS.PRODUCTS, products);
    return item;
  },
  deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    setStored(KEYS.PRODUCTS, products);
  },

  // Testimonials
  getTestimonials(): TestimonialItem[] {
    return getStored<TestimonialItem[]>(KEYS.TESTIMONIALS, defaultTestimonials);
  },
  saveTestimonial(testi: Partial<TestimonialItem> & { name: string; quote: string }): TestimonialItem {
    const items = this.getTestimonials();
    let item: TestimonialItem;
    const initials = testi.initials || testi.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    if (testi.id) {
      const idx = items.findIndex((t) => t.id === testi.id);
      if (idx !== -1) {
        item = { ...items[idx], ...testi, initials };
        items[idx] = item;
      } else {
        item = {
          id: testi.id,
          name: testi.name,
          role: testi.role || 'Client',
          quote: testi.quote,
          rating: testi.rating || 5,
          initials,
          avatar: testi.avatar,
          isFeatured: testi.isFeatured ?? true,
        };
        items.unshift(item);
      }
    } else {
      item = {
        id: 't_' + Date.now(),
        name: testi.name,
        role: testi.role || 'Client',
        quote: testi.quote,
        rating: testi.rating || 5,
        initials,
        avatar: testi.avatar,
        isFeatured: true,
      };
      items.unshift(item);
    }
    setStored(KEYS.TESTIMONIALS, items);
    return item;
  },
  deleteTestimonial(id: string): void {
    const items = this.getTestimonials().filter((t) => t.id !== id);
    setStored(KEYS.TESTIMONIALS, items);
  },

  // Inquiries / Form Submissions
  getInquiries(): InquiryItem[] {
    return getStored<InquiryItem[]>(KEYS.INQUIRIES, []);
  },
  saveInquiry(inquiry: Omit<InquiryItem, 'id' | 'date' | 'status'>): InquiryItem {
    const list = this.getInquiries();
    const item: InquiryItem = {
      ...inquiry,
      id: 'inq_' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'new',
    };
    list.unshift(item);
    setStored(KEYS.INQUIRIES, list);
    return item;
  },
  updateInquiryStatus(id: string, status: InquiryItem['status']): void {
    const list = this.getInquiries();
    const idx = list.findIndex(i => i.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      setStored(KEYS.INQUIRIES, list);
    }
  },
  deleteInquiry(id: string): void {
    const list = this.getInquiries().filter(i => i.id !== id);
    setStored(KEYS.INQUIRIES, list);
  },

  // Newsletters
  getNewsletters(): NewsletterItem[] {
    return getStored<NewsletterItem[]>(KEYS.NEWSLETTER, []);
  },
  saveNewsletter(email: string): NewsletterItem {
    const list = this.getNewsletters();
    const existing = list.find(n => n.email.toLowerCase() === email.toLowerCase());
    if (existing) return existing;

    const item: NewsletterItem = {
      id: 'sub_' + Date.now(),
      email,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    list.unshift(item);
    setStored(KEYS.NEWSLETTER, list);
    return item;
  },

  // Site Settings
  getSiteSettings(): SiteSettings {
    return getStored<SiteSettings>(KEYS.SETTINGS, DEFAULT_SETTINGS);
  },
  saveSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.getSiteSettings();
    const updated = { ...current, ...settings };
    setStored(KEYS.SETTINGS, updated);
    return updated;
  },
};
