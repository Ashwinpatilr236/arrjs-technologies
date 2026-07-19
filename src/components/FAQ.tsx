import { faqs } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from '../lib/router';

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(faqs[0].id);
  const { ref, visible } = useReveal();

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Common
              <span className="text-gradient"> questions.</span>
            </h2>
            <p className="mt-4 text-base text-ink-600 dark:text-ink-300">
              Everything you need to know about our services, pricing and process. Can't find an
              answer? Reach out — we reply within a business day.
            </p>
            <Link to="/contact" className="btn-ghost mt-6">
              Still have questions?
            </Link>
          </div>

          <div ref={ref} className="space-y-3 lg:col-span-2">
            {faqs.map((f, i) => {
              const isOpen = open === f.id;
              return (
                <div
                  key={f.id}
                  style={{ transitionDelay: `${Math.min(i, 8) * 50}ms` }}
                  className={`card overflow-hidden transition-all duration-700 ${
                    visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-ink-900 dark:text-white">
                      {f.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-300">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
