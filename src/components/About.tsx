import { useReveal } from '../hooks/useReveal';
import { Target, Eye, Award, Headset, IndianRupee, Zap, ShieldCheck, Star } from 'lucide-react';

const values = [
  { icon: Headset, title: 'Professional Support', desc: 'Responsive, knowledgeable help — before, during and after delivery.' },
  { icon: IndianRupee, title: 'Affordable Pricing', desc: 'Transparent quotes that fit small businesses, startups and individuals.' },
  { icon: ShieldCheck, title: 'Trusted Service', desc: 'Hundreds of happy clients across Vadodara and India.' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Clear timelines and on-time delivery, every project.' },
];

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative overflow-hidden py-12 md:py-16">
      <div className="glow-orb right-[10%] top-[15%] h-72 w-72 bg-brand-500/10" />
      <div className="container-page relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow">About ARRJS</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl md:text-5xl">
              Building Technology That
              <span className="text-gradient"> Works For Everyone.</span>
            </h2>
            <p className="mt-4 text-base text-ink-600 dark:text-ink-300 sm:text-lg">
              ARRJS Technologies is a Vadodara-based technology solutions company serving
              individuals, gamers, small businesses, restaurants, doctors, clinics, schools,
              startups, freelancers, shops and offices — on-site and remotely across India.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-300">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white">Our Mission</h3>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                    Make reliable, premium technology accessible to every business and individual —
                    regardless of size or budget.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-300">
                  <Eye className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white">Our Vision</h3>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                    To become the most trusted technology brand across Gujarat and India — the
                    first name businesses think of for anything tech.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div ref={ref} className="grid grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className={`card card-hover p-6 transition-all duration-700 ${
                    visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-violet-500/15 text-brand-600 dark:text-brand-300">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink-900 dark:text-white">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Award, title: 'Quality First', desc: 'Every project held to a premium standard — no shortcuts.' },
            { icon: Star, title: '5-Star Rated', desc: 'Consistently rated 5 stars by clients across every service line.' },
            { icon: ShieldCheck, title: 'Trusted Partner', desc: 'Long-term relationships built on reliability and transparency.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-violet-500/15 text-brand-600 dark:text-brand-300">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink-900 dark:text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
