import { ArrowRight, Sparkles, Star, Zap, ShieldCheck, Bot } from 'lucide-react';
import { stats } from '../data/content';
import { useEffect, useRef, useState } from 'react';
import { Link } from '../lib/router';

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

export default function Hero() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStatsVisible(true)),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-40">
      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-ink-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-ink-200">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            Technology Solutions Company · Vadodara, Gujarat
          </div>

          <h1 className="animate-fade-up mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 dark:text-white sm:text-6xl lg:text-7xl">
            Technology Solutions
            <br />
            <span className="text-gradient">For Modern Businesses</span>
          </h1>

          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300 sm:text-lg [animation-delay:80ms]">
            We help businesses grow with Websites, AI Solutions, PC Consultation, Business Setup,
            IT Services, and Digital Products — on-site in Vadodara, remote across India.
          </p>

          <div className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:160ms]">
            <Link to="/contact" className="btn-primary group">
              Get Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/services" className="btn-ghost">
              Explore Services
            </Link>
          </div>

          <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-500 dark:text-ink-400 [animation-delay:240ms]">
            {[
              { icon: Zap, label: 'Fast Delivery' },
              { icon: ShieldCheck, label: 'Trusted Service' },
              { icon: Bot, label: 'AI-Powered' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-brand-500" /> {label}
              </span>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} active={statsVisible} />
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center gap-1 text-violet-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="mt-2 text-center text-sm text-ink-500 dark:text-ink-400">
          Trusted by 180+ businesses, gamers, doctors, schools and startups across Vadodara
        </p>
      </div>

      <div className="relative mt-16 overflow-hidden border-y border-ink-100 bg-ink-50/50 py-4 dark:border-white/5 dark:bg-white/[0.02]">
        <div className="mask-fade-x flex">
          {[0, 1].map((dup) => (
            <div key={dup} className="animate-marquee flex shrink-0 items-center gap-10 px-5" aria-hidden={dup === 1}>
              {marqueeItems.map((m) => (
                <span
                  key={m}
                  className="whitespace-nowrap font-mono text-sm font-medium uppercase tracking-widest text-ink-400 dark:text-ink-500"
                >
                  {m}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  suffix,
  label,
  index,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  active: boolean;
}) {
  const v = useCountUp(value, active);
  return (
    <div
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`card p-5 text-center transition-all duration-700 ${
        active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <p className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">
        {v}
        <span>{suffix}</span>
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
        {label}
      </p>
    </div>
  );
}

const marqueeItems = [
  'Website Development',
  'AI Chatbots',
  'PC Builds',
  'Business Setup',
  'IT Support',
  'CCTV Consultation',
  'Digital Products',
  'Networking',
  'SEO',
  'E-Commerce',
];
