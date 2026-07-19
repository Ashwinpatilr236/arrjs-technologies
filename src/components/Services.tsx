import { services } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from '../lib/router';

export default function Services() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active) ?? services[0];
  const { ref, visible } = useReveal();

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="section-eyebrow">What we do</span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl md:text-5xl">
            Full-stack technology services
            <span className="text-gradient"> under one roof.</span>
          </h2>
          <p className="mt-4 text-base text-ink-600 dark:text-ink-300 sm:text-lg">
            Three core service pillars covering everything from custom PCs and websites to
            complete business setup and IT support.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {services.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'border-brand-500 bg-brand-600 text-white shadow-lg shadow-brand-500/25'
                    : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:border-brand-400/40'
                }`}
              >
                <Icon className="h-4 w-4" />
                {s.title}
              </button>
            );
          })}
        </div>

        <div ref={ref} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            className={`card card-hover p-7 lg:col-span-1 transition-all duration-700 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-violet-500/15 text-brand-600 dark:text-brand-300">
              <current.icon className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink-900 dark:text-white">
              {current.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-300">
              {current.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {current.description}
            </p>
            <Link to="/contact" className="btn-ghost mt-6 w-full">
              Request a Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card p-7 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              {current.items.length} services included
            </p>
            <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
              {current.items.map((item, i) => (
                <div
                  key={item}
                  style={{ transitionDelay: `${Math.min(i, 12) * 30}ms` }}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-ink-50 dark:hover:bg-white/5"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-300">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink-700 dark:text-ink-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
