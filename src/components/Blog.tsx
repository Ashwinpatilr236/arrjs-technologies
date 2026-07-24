import { useState, useEffect } from 'react';
import { cms, type BlogPostItem } from '../lib/cms';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight, Clock, Flame, Hash } from 'lucide-react';
import { Link } from '../lib/router';

export default function Blog() {
  const { ref, visible } = useReveal();
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);

  useEffect(() => {
    const list = cms.getBlogs().filter((b) => b.status === 'published');
    setBlogs(list.slice(0, 6));
  }, []);

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
          {blogs.map((post, i) => {
            const slug = post.slug || post.id;
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            return (
              <article
                key={post.id}
                style={{ transitionDelay: `${Math.min(i, 8) * 70}ms` }}
                className={`card card-hover group cursor-pointer overflow-hidden transition-all duration-700 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-500/15 via-violet-500/10 to-brand-400/10 p-4 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-grid-dark opacity-30" style={{ backgroundSize: '28px 28px' }} />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold bg-brand-500/15 text-brand-600 dark:text-brand-300 backdrop-blur">
                      {post.category}
                    </span>
                    {post.isTrending && (
                      <span className="rounded-full px-3 py-1 text-[11px] font-bold bg-gradient-to-r from-amber-500 to-red-500 text-white flex items-center gap-1 shadow-md animate-pulse">
                        <Flame className="h-3.5 w-3.5 fill-current" /> TRENDING
                      </span>
                    )}
                  </div>

                  {/* Tags list on card */}
                  {(post.tags || []).length > 0 && (
                    <div className="relative z-10 flex flex-wrap gap-1">
                      {post.tags?.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-semibold text-brand-700 dark:text-brand-300 bg-white/70 dark:bg-slate-900/70 px-2 py-0.5 rounded-md backdrop-blur">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-ink-500 dark:text-ink-400">
                    <span>{formattedDate}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900 dark:text-white transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                    Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
