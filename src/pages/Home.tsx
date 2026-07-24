import { useState, useEffect } from 'react';
import { Link } from '../lib/router';
import Hero from '../components/Hero';
import { services } from '../data/content';
import { cms, type StoreProductItem, type TestimonialItem, type BlogPostItem } from '../lib/cms';
import { ArrowRight, ArrowUpRight, Star, Quote, Flame, Clock, Play } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />

      {/* 1. Services Preview */}
      <ServicesPreview />

      {/* 2. Digital Store Preview ("Premium templates & products.") */}
      <StorePreview />

      {/* 3. Blogs Preview (Immediately below Digital Store) */}
      <BlogPreview />

      {/* 4. Portfolio Preview */}
      <PortfolioPreview />

      {/* 5. Testimonials Preview */}
      <TestimonialsPreview />

      {/* 6. FAQ & Contact Preview */}
      <FAQ />
      <Newsletter />
    </>
  );
}

function ServicesPreview() {
  return (
    <section className="relative py-6 md:py-8">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">What we do</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Full-stack technology <span className="text-gradient">services.</span>
            </h2>
          </div>
          <Link to="/services" className="btn-ghost shrink-0 text-xs">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                to="/services"
                key={s.id}
                className="card card-hover group relative overflow-hidden p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-violet-500/15 text-brand-600 dark:text-brand-300">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-brand-600 dark:text-brand-300">
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

function StorePreview() {
  const [products, setProducts] = useState<StoreProductItem[]>([]);
  const { ref, visible } = useReveal();

  useEffect(() => {
    setProducts(cms.getProducts().slice(0, 4));
  }, []);

  return (
    <section className="relative overflow-hidden py-6 md:py-8">
      <div className="glow-orb left-[15%] top-[10%] h-72 w-72 bg-violet-500/10" />
      <div className="container-page relative">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Digital Store</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Premium templates <span className="text-gradient">& products.</span>
            </h2>
          </div>
          <Link to="/store" className="btn-ghost shrink-0 text-xs">
            Visit store <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Columns Grid */}
        <div ref={ref} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Link
              key={p.id}
              to={`/store/${p.id}`}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={`card card-hover group block overflow-hidden p-4 transition-all duration-500 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {p.imageUrl ? (
                <div className="relative h-28 overflow-hidden rounded-lg bg-slate-900 mb-3">
                  <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              ) : p.videoUrl ? (
                <div className="relative h-28 flex items-center justify-center overflow-hidden rounded-lg bg-slate-900 mb-3">
                  <Play className="h-8 w-8 text-brand-500" />
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-400">{p.category}</p>
                {p.isTrending && (
                  <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                    <Flame className="h-3 w-3 fill-current" /> Trending
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-display text-sm font-semibold text-ink-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-1">{p.title}</h3>
              <div className="mt-2 flex items-center justify-between pt-2 border-t border-ink-100 dark:border-white/10">
                <span className="font-display text-sm font-bold text-brand-600 dark:text-brand-400">
                  {p.price === 0 ? 'Free' : `₹${p.price}`}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-ink-500 dark:text-ink-400">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {p.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const { ref, visible } = useReveal();

  useEffect(() => {
    setBlogs(cms.getBlogs().filter((b) => b.status === 'published').slice(0, 3));
  }, []);

  return (
    <section className="relative py-6 md:py-8">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Blog & Insights</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Latest from <span className="text-gradient">the blog.</span>
            </h2>
          </div>
          <Link to="/blog" className="btn-ghost shrink-0 text-xs">
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div ref={ref} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {blogs.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug || post.id}`}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`card card-hover group block overflow-hidden p-5 transition-all duration-500 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {post.coverImage ? (
                <div className="relative h-28 overflow-hidden rounded-lg bg-slate-900 mb-3">
                  <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-brand-600 dark:text-brand-300">
                  {post.category}
                </span>
                <span className="text-[10px] text-ink-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
              <h3 className="mt-2 font-display text-sm font-bold leading-snug text-ink-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-1 text-xs text-ink-600 dark:text-ink-300 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  const { ref, visible } = useReveal();
  return (
    <section className="relative py-6 md:py-8">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Portfolio</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Projects that <span className="text-gradient">delivered results.</span>
            </h2>
          </div>
          <Link to="/portfolio" className="btn-ghost shrink-0 text-xs">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div ref={ref} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <article className="card card-hover group overflow-hidden transition-all duration-500">
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-brand-600 to-violet-600 p-4">
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                Website & Booking
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-sm font-bold text-ink-900 dark:text-white">Restaurant Online Setup</h3>
              <p className="mt-0.5 text-xs font-medium text-ink-500">Vadodara Restaurant</p>
              <p className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-300">+42% online reservations in 3 months</p>
            </div>
          </article>
          <article className="card card-hover group overflow-hidden transition-all duration-500">
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-600 p-4">
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                Clinic Tech Stack
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-sm font-bold text-ink-900 dark:text-white">Multi-Specialty Clinic</h3>
              <p className="mt-0.5 text-xs font-medium text-ink-500">Vadodara Clinic</p>
              <p className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-300">End-to-end online presence & booking</p>
            </div>
          </article>
          <article className="card card-hover group overflow-hidden transition-all duration-500">
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-cyan-600 to-brand-600 p-4">
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                Custom Gaming Rig
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-sm font-bold text-ink-900 dark:text-white">High-End Streamer PC</h3>
              <p className="mt-0.5 text-xs font-medium text-ink-500">Gaming Streamer</p>
              <p className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-300">4K 144FPS streaming rig</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  useEffect(() => {
    setTestimonials(cms.getTestimonials().slice(0, 3));
  }, []);

  return (
    <section className="relative py-6 md:py-8">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Loved by clients <span className="text-gradient">across Vadodara.</span>
            </h2>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="card card-hover relative p-5">
              <Quote className="h-6 w-6 text-brand-500/30" />
              <div className="mt-1 flex items-center gap-1 text-amber-400">
                {[...Array(t.rating || 5)].map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-2 text-xs leading-relaxed text-ink-700 dark:text-ink-200">"{t.quote}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
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
