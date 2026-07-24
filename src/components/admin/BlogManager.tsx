import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, FileText, Check, X, Flame, Hash } from 'lucide-react';
import { cms, type BlogPostItem } from '../../lib/cms';

export default function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>(() => cms.getBlogs());
  const [editing, setEditing] = useState<BlogPostItem | null>(null);
  const [tagInput, setTagInput] = useState('');
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
      tags: ['#Tech', '#AI'],
      isTrending: false,
    });
    setTagInput('');
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

  const addTag = () => {
    if (!tagInput.trim() || !editing) return;
    let formatted = tagInput.trim();
    if (!formatted.startsWith('#')) formatted = '#' + formatted;
    setEditing({ ...editing, tags: [...(editing.tags || []), formatted] });
    setTagInput('');
  };

  const removeTag = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, tags: (editing.tags || []).filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-500" /> Blog Articles & Tags Manager
          </h2>
          <p className="text-xs text-ink-600 dark:text-ink-400">
            Create, edit, add #hashtags, toggle 🔥 Trending status, and publish blog articles.
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                🔥 Trending Status
              </label>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(editing.isTrending)}
                  onChange={(e) => setEditing({ ...editing, isTrending: e.target.checked })}
                  className="h-5 w-5 rounded border-ink-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  <Flame className="h-4 w-4 fill-orange-500" /> Highlight as Trending
                </span>
              </label>
            </div>
          </div>

          {/* Hashtags & Sub-tags Manager */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1 flex items-center gap-1">
              <Hash className="h-3.5 w-3.5 text-brand-500" /> Article Sub-Tags & Hashtags (#tags)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="Add tag e.g. #Vadodara, #AI, #WebDesign"
                className="input text-xs"
              />
              <button type="button" onClick={addTag} className="btn-brand text-xs px-3">
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(editing.tags || []).map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 text-xs font-semibold">
                  {t}
                  <button type="button" onClick={() => removeTag(i)} className="text-ink-400 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
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
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-brand text-[10px] py-0.5">{b.category}</span>
                    {b.isTrending && (
                      <span className="bg-gradient-to-r from-amber-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Flame className="h-3 w-3 fill-current" /> TRENDING
                      </span>
                    )}
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

                  <div className="flex flex-wrap gap-1 pt-1">
                    {(b.tags || []).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
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
