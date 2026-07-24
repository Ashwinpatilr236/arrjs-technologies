import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, FileText, Check, X, Sparkles } from 'lucide-react';
import { cms, type BlogPostItem } from '../../lib/cms';

export default function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>(() => cms.getBlogs());
  const [editing, setEditing] = useState<BlogPostItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const refresh = () => setBlogs(cms.getBlogs());

  const handleCreateNew = () => {
    setEditing({
      id: '',
      title: '',
      category: 'Tech & AI',
      excerpt: '',
      date: new Date().toISOString(),
      readTime: '5 min read',
      slug: '',
      html: '',
      status: 'published',
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.title.trim()) return;

    cms.saveBlog(editing);
    setEditing(null);
    setIsNew(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      cms.deleteBlog(id);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-500" /> Blog Articles Manager
          </h2>
          <p className="text-xs text-ink-600 dark:text-ink-400">
            Create, edit, and publish blog articles directly on your website.
          </p>
        </div>
        {!editing && (
          <button onClick={handleCreateNew} className="btn-brand text-sm py-2">
            <Plus className="h-4 w-4" /> Add New Article
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="card p-6 sm:p-8 space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-ink-100 dark:border-ink-800 pb-4">
            <h3 className="font-semibold text-lg text-ink-900 dark:text-white">
              {isNew ? '✨ Create New Article' : '✏️ Edit Article'}
            </h3>
            <button
              type="button"
              onClick={() => { setEditing(null); setIsNew(false); }}
              className="p-1 rounded-lg text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Article Title *
              </label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="e.g. 5 AI Tools Every Small Business Needs in 2026"
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Category
              </label>
              <input
                type="text"
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                placeholder="e.g. AI, Tech, PC Building, Web Dev"
                className="input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Read Time
              </label>
              <input
                type="text"
                value={editing.readTime}
                onChange={(e) => setEditing({ ...editing, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Status
              </label>
              <select
                value={editing.status}
                onChange={(e) => setEditing({ ...editing, status: e.target.value as 'published' | 'draft' })}
                className="input"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
              Short Excerpt (Summary for Cards)
            </label>
            <textarea
              rows={2}
              value={editing.excerpt}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              placeholder="Brief 1-2 sentence summary of what this article is about..."
              className="input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
              Article Content (HTML / Rich Text / Markdown)
            </label>
            <textarea
              rows={10}
              value={editing.html}
              onChange={(e) => setEditing({ ...editing, html: e.target.value })}
              placeholder="<p>Write your full article content here. You can use standard HTML like <h3>, <p>, <ul>, <li>, <strong>, etc.</p>"
              className="input font-mono text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-100 dark:border-ink-800">
            <button
              type="button"
              onClick={() => { setEditing(null); setIsNew(false); }}
              className="btn-ghost text-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn-brand text-sm px-6">
              <Check className="h-4 w-4" /> Save Article
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {blogs.length === 0 ? (
            <div className="card p-8 text-center text-ink-600 dark:text-ink-400">
              No articles found. Click "Add New Article" to write your first post!
            </div>
          ) : (
            blogs.map((b) => (
              <div key={b.id} className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="badge-brand text-[10px] py-0.5">{b.category}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      b.status === 'published' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/15 text-amber-600'
                    }`}>
                      {b.status}
                    </span>
                    <span className="text-xs text-ink-600 dark:text-ink-400">{b.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-ink-900 dark:text-white text-base">
                    {b.title}
                  </h3>
                  <p className="text-xs text-ink-600 dark:text-ink-300 line-clamp-1">
                    {b.excerpt || 'No description'}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <a
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost p-2 text-ink-600 hover:text-brand-500"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => { setEditing(b); setIsNew(false); }}
                    className="btn-ghost p-2 text-ink-600 hover:text-blue-500"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="btn-ghost p-2 text-ink-600 hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
