import { blogPosts, type BlogPost } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from '../lib/router';

const categoryColors: Record<BlogPost['category'], string> = {
  Technology: 'bg-brand-500/15 text-brand-600 dark:text-brand-300',
  AI: 'bg-violet-500/15 text-violet-600 dark:text-violet-300',
  'Website Tips': 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300',
  Business: 'bg-amber-500/15 text-amber-600 dark:text-amber-300',
  'PC Building': 'bg-rose-500/15 text-rose-600 dark:text-rose-300',
  Cloud: 'bg-sky-500/15 text-sky-600 dark:text-sky-300',
  'Cyber Security': 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300',
};

export default function Blog() {
  const { ref, visible } = useReveal();
  return (
    <section id="blog" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Blog & Insights</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl md:text-5xl">
              Technology, AI & business
              <span className="text-gradient"> insights.</span>
            </h2>
          </div>
          <Link to="/blog" className="btn-ghost">
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={ref} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <article
              key={post.id}
              style={{ transitionDelay: `${Math.min(i, 8) * 70}ms` }}
              className={`card card-hover group cursor-pointer overflow-hidden transition-all duration-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-brand-500/15 via-violet-500/10 to-brand-400/10">
                <div className="absolute inset-0 bg-grid-dark opacity-30" style={{ backgroundSize: '28px 28px' }} />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold ${categoryColors[post.category]}`}
                >
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-ink-500 dark:text-ink-400">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900 dark:text-white transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                  Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
