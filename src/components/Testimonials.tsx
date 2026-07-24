import { useState, useEffect } from 'react';
import { cms, type TestimonialItem } from '../lib/cms';
import { useReveal } from '../hooks/useReveal';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const { ref, visible } = useReveal();
  const [items, setItems] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    const list = cms.getTestimonials().filter((t) => t.isFeatured !== false);
    setItems(list);
  }, []);

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl md:text-5xl">
            Loved by clients
            <span className="text-gradient"> across Vadodara.</span>
          </h2>
          <p className="mt-4 text-base text-ink-600 dark:text-ink-300 sm:text-lg">
            Real reviews from businesses, gamers, doctors, schools and startups we've worked with.
          </p>
        </div>

        <div ref={ref} className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={t.id}
              style={{ transitionDelay: `${Math.min(i, 8) * 70}ms` }}
              className={`card card-hover relative p-6 transition-all duration-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <Quote className="h-8 w-8 text-brand-500/30" />
              <div className="mt-2 flex items-center gap-1 text-amber-400">
                {[...Array(t.rating || 5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-sm font-bold text-white">
                  {t.initials || t.name.slice(0, 2).toUpperCase()}
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
