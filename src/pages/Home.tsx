import { useState, useEffect } from 'react';
import { Link } from '../lib/router';
import Hero from '../components/Hero';
import { services, portfolio, testimonials } from '../data/content';
import { cms, type StoreProductItem, type BlogPostItem, type TestimonialItem } from '../lib/cms';
import { ArrowRight, ArrowUpRight, Star, Quote, Flame, ShoppingBag, Clock, Play } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  return (
    <>
      <Hero />

      {/* 1. Services Section */}
      <ServicesSection />

      {/* 2. Digital Store Section (Follows Services) */}
      <StoreSection />

      {/* 3. Blog Section (Follows Store) */}
      <BlogSection />

      {/* 4. Portfolio Section (Follows Blog) */}
      <PortfolioSection />

      {/* 5. Testimonials Section (Follows Portfolio) */}
      <TestimonialsSection />
    </>
  );
}

/* --- 1. SERVICES SECTION --- */
function ServicesSection() {
  return (
    <section id="services-preview" className="relative py-8 md:py-12">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">What we do</span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl lg:text-4xl">
              Full-stack technology <span className="text-gradient">services.</span>
            </h2>
          </div>
          <Link to="/services" className="btn-ghost shrink-0 text-xs">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 2 Rows Layout: Services Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                to="/services"
                key={s.id}
                className="card card-hover group relative overflow-hidden p-6 transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-violet-500/15 text-brand-600 dark:text-brand-300">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
                  {s.tagline}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300 line-clamp-2">
                  {s.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
                  {s.items.length} services <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --- 2. DIGITAL STORE SECTION (2 Rows Grid) --- */
function StoreSection() {
  const [products, setProducts] = useState<StoreProductItem[]>([]);
  const { ref, visible } = useReveal();

  useEffect(() => {
    // Fetch 8 products to create 2 complete rows (4 cols x 2 rows)
    const list = cms.getProducts();
    setProducts(list.slice(0, 8));
  }, []);

  return (
    <section id="store-preview" className="relative overflow-hidden py-8 md:py-12">
      <div className="glow-orb left-[15%] top-[10%] h-72 w-72 bg-violet-500/10" />
      <div className="container-page relative">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Digital Store</span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl lg:text-4xl">
              Premium templates <span className="text-gradient">& products.</span>
            </h2>
          </div>
          <Link to="/store" className="btn-ghost shrink-0 text-xs">
            Visit store <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 2 Rows Grid: 4 columns x 2 rows on large screens = 8 products */}
        <div ref={ref} className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <Link
              key={p.id}
              to={`/store/${p.id}`}
              style={{ transitionDelay: `${Math.min(i, 7) * 50}ms` }}
              className={`card card-hover group block overflow-hidden p-4 transition-all duration-500 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {/* Media Thumbnail or Compact Badge Header */}
              {p.imageUrl ? (
                <div className="relative h-32 w-full overflow-hidden rounded-xl bg-slate-900 mb-3">
                  <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {p.isTrending && (
                    <span className="absolute top-2 left-2 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white px-2 py-0.5 text-[9px] font-bold uppercase flex items-center gap-1 shadow-sm">
                      <Flame className="h-2.5 w-2.5 fill-current" /> Trending
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
                    {p.category}
                  </span>
                  {p.isTrending ? (
                    <span className="rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white px-2 py-0.5 text-[9px] font-bold uppercase flex items-center gap-1 shadow-sm">
                      <Flame className="h-2.5 w-2.5 fill-current" /> Trending
                    </span>
                  ) : p.badge ? (
                    <span className="bg-amber-500/15 text-amber-600 text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  ) : null}
                </div>
              )}

              <h3 className="font-display text-sm font-bold text-ink-900 dark:text-white line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-300">
                {p.title}
              </h3>

              <p className="mt-1 text-[11px] leading-relaxed text-ink-600 dark:text-ink-300 line-clamp-2">
                {p.description}
              </p>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-ink-100 dark:border-white/10">
                <span className="font-display text-sm font-extrabold text-brand-600 dark:text-brand-400">
                  {p.price === 0 ? 'Free' : `₹${p.price}`}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-500 dark:text-ink-400">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {p.rating || 5.0}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 3. BLOG SECTION (Follows Store - 2 Rows Grid) --- */
function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const { ref, visible } = useReveal();

  useEffect(() => {
    // Fetch 6 articles to create 2 rows (3 cols x 2 rows = 6 items)
    const list = cms.getBlogs().filter((b) => b.status === 'published');
    setBlogs(list.slice(0, 6));
  }, []);

  return (
    <section id="blog-preview" className="relative py-8 md:py-12">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Blog & Insights</span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl lg:text-4xl">
              Technology, AI & business <span className="text-gradient">insights.</span>
            </h2>
          </div>
          <Link to="/blog" className="btn-ghost shrink-0 text-xs">
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 2 Rows Grid: 3 columns x 2 rows = 6 articles */}
        <div ref={ref} className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((post, i) => {
            const slug = post.slug || post.id;
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
            return (
              <Link
                key={post.id}
                to={`/blog/${slug}`}
                style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}
                className={`card card-hover group block overflow-hidden p-5 transition-all duration-500 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-brand-500/15 text-brand-600 dark:text-brand-300">
                    {post.category}
                  </span>
                  {post.isTrending && (
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-500 to-red-500 text-white flex items-center gap-1 shadow-xs">
                      <Flame className="h-3 w-3 fill-current" /> TRENDING
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-ink-500 dark:text-ink-400 flex items-center gap-2 mb-1">
                  <span>{formattedDate}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-ink-900 dark:text-white line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-300">
                  {post.title}
                </h3>

                <p className="mt-1.5 text-xs text-ink-600 dark:text-ink-300 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:text-brand-500">
                  Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --- 4. PORTFOLIO SECTION (2 Rows Grid) --- */
function PortfolioSection() {
  const items = portfolio.slice(0, 6);
  const { ref, visible } = useReveal();

  return (
    <section id="portfolio-preview" className="relative py-8 md:py-12">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Portfolio</span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl lg:text-4xl">
              Projects that <span className="text-gradient">delivered results.</span>
            </h2>
          </div>
          <Link to="/portfolio" className="btn-ghost shrink-0 text-xs">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 2 Rows Grid: 3 columns x 2 rows = 6 items */}
        <div ref={ref} className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p, i) => (
            <article
              key={p.id}
              style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}
              className={`card card-hover group overflow-hidden transition-all duration-500 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 bg-grid-dark opacity-30" style={{ backgroundSize: '32px 32px' }} />
                <span className="absolute left-3 top-3 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  {p.category}
                </span>
                <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 text-white/80 transition-transform group-hover:rotate-12" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-ink-900 dark:text-white">{p.title}</h3>
                <p className="mt-0.5 text-[11px] font-medium text-ink-500 dark:text-ink-400">{p.client}</p>
                <p className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-300">{p.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 5. TESTIMONIALS SECTION (2 Rows Grid) --- */
function TestimonialsSection() {
  const [items, setItems] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    const list = cms.getTestimonials().filter((t) => t.isFeatured !== false);
    setItems(list.slice(0, 6));
  }, []);

  return (
    <section id="testimonials-preview" className="relative py-8 md:py-12">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-3xl lg:text-4xl">
              Loved by clients <span className="text-gradient">across Vadodara.</span>
            </h2>
          </div>
        </div>

        {/* 2 Rows Grid: 3 columns x 2 rows = 6 reviews */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <figure key={t.id} className="card card-hover relative p-5 flex flex-col justify-between">
              <div>
                <Quote className="h-6 w-6 text-brand-500/30" />
                <div className="mt-1 flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-2 text-xs leading-relaxed text-ink-700 dark:text-ink-200 line-clamp-3">
                  "{t.quote}"
                </blockquote>
              </div>
              <figcaption className="mt-4 flex items-center gap-3 pt-3 border-t border-ink-100 dark:border-white/10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white">
                  {t.initials || t.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="text-xs font-bold text-ink-900 dark:text-white">{t.name}</p>
                  <p className="text-[10px] text-ink-500 dark:text-ink-400">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
