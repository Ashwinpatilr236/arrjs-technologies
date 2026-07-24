import { portfolio } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const filters = ['All', 'Website', 'Business', 'PC Build', 'Case Study'] as const;

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const { ref, visible } = useReveal();
  const items = filter === 'All' ? portfolio : portfolio.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative py-12 md:py-16">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl md:text-5xl">
            Projects that
            <span className="text-gradient"> delivered results.</span>
          </h2>
          <p className="mt-4 text-base text-ink-600 dark:text-ink-300 sm:text-lg">
            Website projects, business setups, custom PC builds and client success stories from
            across Vadodara and beyond.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                filter === f
                  ? 'border-brand-500 bg-brand-600 text-white'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-ink-300 dark:hover:border-brand-400/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div ref={ref} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <article
              key={p.id}
              style={{ transitionDelay: `${Math.min(i, 8) * 70}ms` }}
              className={`card card-hover group relative overflow-hidden transition-all duration-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 bg-grid-dark opacity-30" style={{ backgroundSize: '32px 32px' }} />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="w-fit rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <ArrowUpRight className="absolute right-4 top-4 h-6 w-6 text-white/80 transition-transform group-hover:rotate-12" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-ink-500 dark:text-ink-400">{p.client}</p>
                <p className="mt-3 text-sm font-medium text-brand-600 dark:text-brand-300">
                  {p.result}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink-100 bg-ink-50 px-2.5 py-0.5 text-[11px] font-medium text-ink-600 dark:border-white/5 dark:bg-white/[0.03] dark:text-ink-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
