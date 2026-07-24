import { useState, useEffect } from 'react';
import { cms, type BlogPostItem } from '../lib/cms';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight, Clock, Flame, Play } from 'lucide-react';
import { Link } from '../lib/router';

export default function Blog() {
  const { ref, visible } = useReveal();
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);

  useEffect(() => {
    const list = cms.getBlogs().filter((b) => b.status === 'published');
    setBlogs(list.slice(0, 6));
  }, []);

  return (
    <section id="blog" className="relative py-12 md:py-16">
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

        <div ref={ref} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post, i) => {
            const slug = post.slug || post.id;
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const hasMedia = Boolean(post.coverImage || post.videoUrl);

            return (
              <Link
                key={post.id}
                to={`/blog/${slug}`}
                style={{ transitionDelay: `${Math.min(i, 8) * 70}ms` }}
                className={`card card-hover group block overflow-hidden transition-all duration-500 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                {/* Media Container: Only render height if cover image or video URL exists */}
                {hasMedia ? (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : post.videoUrl ? (
                      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform group-hover:scale-110">
                          <Play className="h-5 w-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    ) : null}

                    {/* Overlay Badges */}
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between z-10">
                      <span className="rounded-full px-3 py-1 text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur border border-white/10">
                        {post.category}
                      </span>
                      {post.isTrending && (
                        <span className="rounded-full px-3 py-1 text-[11px] font-bold bg-gradient-to-r from-amber-500 to-red-500 text-white flex items-center gap-1 shadow-md">
                          <Flame className="h-3.5 w-3.5 fill-current animate-bounce" /> TRENDING
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Compact Header Bar for Articles without Media (No blank empty space) */
                  <div className="px-6 pt-6 pb-2 flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold bg-brand-500/15 text-brand-600 dark:text-brand-300">
                      {post.category}
                    </span>
                    {post.isTrending && (
                      <span className="rounded-full px-3 py-1 text-[11px] font-bold bg-gradient-to-r from-amber-500 to-red-500 text-white flex items-center gap-1 shadow-md">
                        <Flame className="h-3.5 w-3.5 fill-current" /> TRENDING
                      </span>
                    )}
                  </div>
                )}

                <div className={`p-6 ${hasMedia ? '' : 'pt-2'}`}>
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-3 text-xs text-ink-500 dark:text-ink-400">
                    <span>{formattedDate}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink-900 dark:text-white transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-600 dark:text-ink-300 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Hashtags */}
                  {(post.tags || []).length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags?.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-semibold text-brand-600 dark:text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="mt-5 flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:text-brand-500">
                    Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
