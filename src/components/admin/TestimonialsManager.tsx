import { useState } from 'react';
import { Plus, Edit2, Trash2, MessageSquareQuote, Check, X, Star } from 'lucide-react';
import { cms, type TestimonialItem } from '../../lib/cms';

export default function TestimonialsManager() {
  const [items, setItems] = useState<TestimonialItem[]>(() => cms.getTestimonials());
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const refresh = () => setItems(cms.getTestimonials());

  const handleCreateNew = () => {
    setEditing({
      id: '',
      name: '',
      role: 'Business Owner',
      quote: '',
      rating: 5,
      initials: '',
      isFeatured: true,
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.name.trim() || !editing.quote.trim()) return;

    cms.saveTestimonial(editing);
    setEditing(null);
    setIsNew(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      cms.deleteTestimonial(id);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <MessageSquareQuote className="h-5 w-5 text-brand-500" /> Client Testimonials Manager
          </h2>
          <p className="text-xs text-ink-600 dark:text-ink-400">
            Manage customer reviews and client feedback displayed on the homepage.
          </p>
        </div>
        {!editing && (
          <button onClick={handleCreateNew} className="btn-brand text-sm py-2">
            <Plus className="h-4 w-4" /> Add Testimonial
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="card p-6 sm:p-8 space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-ink-100 dark:border-ink-800 pb-4">
            <h3 className="font-semibold text-lg text-ink-900 dark:text-white">
              {isNew ? '✨ Create New Testimonial' : '✏️ Edit Testimonial'}
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
                Client Name *
              </label>
              <input
                type="text"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="e.g. Dr. Patel / Rahul Mehta"
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Role & Location / Business *
              </label>
              <input
                type="text"
                value={editing.role}
                onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                placeholder="e.g. Clinic Owner, Vadodara"
                className="input"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Rating (1 - 5 Stars)
              </label>
              <select
                value={editing.rating}
                onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
                className="input"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5/5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4/5 Stars)</option>
                <option value={3}>⭐⭐⭐ (3/5 Stars)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Featured Status
              </label>
              <select
                value={editing.isFeatured ? 'true' : 'false'}
                onChange={(e) => setEditing({ ...editing, isFeatured: e.target.value === 'true' })}
                className="input"
              >
                <option value="true">Featured on Homepage</option>
                <option value="false">Hidden / Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
              Client Review Quote *
            </label>
            <textarea
              rows={4}
              value={editing.quote}
              onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
              placeholder="Enter the client's review or testimonial text..."
              className="input"
              required
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
              <Check className="h-4 w-4" /> Save Testimonial
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((t) => (
            <div key={t.id} className="card p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 font-bold text-brand-600 dark:text-brand-300 text-sm">
                      {t.initials || t.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink-900 dark:text-white text-sm">
                        {t.name}
                      </h3>
                      <p className="text-xs text-ink-600 dark:text-ink-400">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs italic text-ink-600 dark:text-ink-300">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-ink-100 dark:border-ink-800">
                <button
                  onClick={() => { setEditing(t); setIsNew(false); }}
                  className="btn-ghost p-2 text-ink-600 hover:text-blue-500"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="btn-ghost p-2 text-ink-600 hover:text-red-500"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
