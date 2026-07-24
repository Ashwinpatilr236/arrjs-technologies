import { Link } from '../lib/router';
import Hero from '../components/Hero';
import { services, products, portfolio, testimonials, blogPosts } from '../data/content';
import { ArrowRight, ArrowUpRight, Star, Quote } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Services preview */}
      <section className="relative py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="section-eyebrow">What we do</span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
                Full-stack technology <span className="text-gradient">services.</span>
              </h2>
            </div>
            <Link to="/services" className="btn-ghost shrink-0">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  to="/services"
                  key={s.id}
                  className="card card-hover group relative overflow-hidden p-7"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-violet-500/15 text-brand-600 dark:text-brand-300">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-300">
                    {s.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {s.description}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                    {s.items.length} services <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Store preview */}
      <StorePreview />
      <PortfolioPreview />
      <TestimonialsPreview />
      <BlogPreview />
    </>
  );
}

function StorePreview() {
  const featured = products.slice(0, 4);
  const { ref, visible } = useReveal();
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="glow-orb left-[15%] top-[10%] h-72 w-72 bg-violet-500/10" />
      <div className="container-page relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Digital Store</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Premium templates <span className="text-gradient">& products.</span>
            </h2>
          </div>
          <Link to="/store" className="btn-ghost shrink-0">
            Visit store <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div ref={ref} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                style={{ transitionDelay: `${i * 60}ms` }}
                className={`card card-hover group overflow-hidden p-5 transition-all duration-700 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500/10 via-violet-500/10 to-brand-400/10">
                  <Icon className="h-12 w-12 text-brand-500/70 transition-transform group-hover:scale-110" strokeWidth={1.25} />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink-400">{p.category}</p>
                <h3 className="mt-1 font-display text-sm font-semibold text-ink-900 dark:text-white">{p.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display text-base font-bold text-ink-900 dark:text-white">
                    {p.price === 0 ? 'Free' : `₹${p.price}`}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-ink-500 dark:text-ink-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {p.rating}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  const items = portfolio.slice(0, 3);
  const { ref, visible } = useReveal();
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Portfolio</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Projects that <span className="text-gradient">delivered results.</span>
            </h2>
          </div>
          <Link to="/portfolio" className="btn-ghost shrink-0">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div ref={ref} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {items.map((p, i) => (
            <article
              key={p.id}
              style={{ transitionDelay: `${i * 70}ms` }}
              className={`card card-hover group overflow-hidden transition-all duration-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 bg-grid-dark opacity-30" style={{ backgroundSize: '32px 32px' }} />
                <span className="absolute left-4 top-4 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  {p.category}
                </span>
                <ArrowUpRight className="absolute right-4 top-4 h-6 w-6 text-white/80 transition-transform group-hover:rotate-12" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white">{p.title}</h3>
                <p className="mt-1 text-xs font-medium text-ink-500 dark:text-ink-400">{p.client}</p>
                <p className="mt-3 text-sm font-medium text-brand-600 dark:text-brand-300">{p.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  const items = testimonials.slice(0, 3);
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Loved by clients <span className="text-gradient">across Vadodara.</span>
            </h2>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.id} className="card card-hover relative p-6">
              <Quote className="h-8 w-8 text-brand-500/30" />
              <div className="mt-2 flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-200">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-sm font-bold text-white">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const items = blogPosts.slice(0, 3);
  const { ref, visible } = useReveal();
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Blog & Insights</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Latest from <span className="text-gradient">the blog.</span>
            </h2>
          </div>
          <Link to="/blog" className="btn-ghost shrink-0">
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div ref={ref} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {items.map((post, i) => (
            <article
              key={post.id}
              style={{ transitionDelay: `${i * 70}ms` }}
              className={`card card-hover group cursor-pointer overflow-hidden transition-all duration-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className="relative h-36 overflow-hidden bg-gradient-to-br from-brand-500/15 via-violet-500/10 to-brand-400/10">
                <div className="absolute inset-0 bg-grid-dark opacity-30" style={{ backgroundSize: '28px 28px' }} />
                <span className="absolute left-4 top-4 rounded-full bg-brand-500/15 px-3 py-1 text-[11px] font-semibold text-brand-600 dark:text-brand-300">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-ink-500 dark:text-ink-400">{post.date} · {post.readTime}</p>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
