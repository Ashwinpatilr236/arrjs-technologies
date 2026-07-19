import { Link } from '../lib/router';
import { blogPosts } from '../data/content';
import { ArrowLeft, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useLocation } from '../lib/router';

export default function BlogPostPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/blog\//, '');
  const post = blogPosts.find((item) => item.slug === slug || item.id === slug);

  if (!post) {
    return (
      <div className="container-page py-24 md:py-32">
        <PageHeader eyebrow="Blog post not found" title="Sorry, this post does not exist." highlight="404" subtitle="Check the URL or go back to the blog list." />
        <div className="mt-10">
          <Link to="/blog" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-24 md:py-32">
      <PageHeader
        eyebrow="Blog & Insights"
        title={post.title}
        highlight="post"
        subtitle={post.excerpt}
      />
      <div className="mt-12 rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-sm shadow-slate-900/5 dark:border-slate-700/80 dark:bg-slate-900/80">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-ink-500 dark:text-ink-300">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> {post.category}
          </span>
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> {post.readTime}
          </span>
        </div>
        <div className="prose prose-slate max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.html ?? '<p>No content available.</p>' }} />
        <div className="mt-10">
          <Link to="/blog" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}
