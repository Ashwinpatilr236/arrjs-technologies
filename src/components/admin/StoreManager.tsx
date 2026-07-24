import { useState } from 'react';
import { Plus, Edit2, Trash2, ShoppingBag, Check, X, Tag, DollarSign, ExternalLink, Flame, Hash, Image, Video } from 'lucide-react';
import { cms, type StoreProductItem } from '../../lib/cms';

export default function StoreManager() {
  const [products, setProducts] = useState<StoreProductItem[]>(() => cms.getProducts());
  const [editing, setEditing] = useState<StoreProductItem | null>(null);
  const [featureInput, setFeatureInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [isNew, setIsNew] = useState(false);

  const refresh = () => setProducts(cms.getProducts());

  const handleCreateNew = () => {
    setEditing({
      id: '',
      title: '',
      category: 'Excel Templates',
      price: 499,
      oldPrice: 799,
      rating: 5.0,
      reviews: 1,
      badge: 'Trending',
      description: '',
      features: ['Auto calculations', 'GST ready'],
      imageUrl: '',
      videoUrl: '',
      downloadUrl: '',
      whatsappLink: '',
      tags: ['#Templates', '#GST'],
      isTrending: true,
    });
    setFeatureInput('');
    setTagInput('');
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.title.trim()) return;

    cms.saveProduct(editing);
    setEditing(null);
    setIsNew(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      cms.deleteProduct(id);
      refresh();
    }
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editing) return;
    setEditing({ ...editing, features: [...editing.features, featureInput.trim()] });
    setFeatureInput('');
  };

  const removeFeature = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, features: editing.features.filter((_, i) => i !== idx) });
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
            <ShoppingBag className="h-5 w-5 text-brand-500" /> Digital Store & Pricing Products Manager
          </h2>
          <p className="text-xs text-ink-600 dark:text-ink-400">
            Add products, update photos/videos, prices, badges (*"Trending"*, *"Best Seller"*), #tags, and buy links.
          </p>
        </div>
        {!editing && (
          <button onClick={handleCreateNew} className="btn-brand text-sm py-2">
            <Plus className="h-4 w-4" /> Add New Product
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="card p-6 sm:p-8 space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-ink-100 dark:border-ink-800 pb-4">
            <h3 className="font-semibold text-lg text-ink-900 dark:text-white">
              {isNew ? '✨ Create New Product' : '✏️ Edit Product'}
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
                Product Title *
              </label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="e.g. Small Business GST Invoice Pack"
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
                placeholder="e.g. Excel Templates, React Templates, AI Prompts"
                className="input"
              />
            </div>
          </div>

          {/* Photo & Video inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1 flex items-center gap-1">
                <Image className="h-3.5 w-3.5 text-brand-500" /> Product Photo / Image URL
              </label>
              <input
                type="url"
                value={editing.imageUrl || ''}
                onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/... or image link"
                className="input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1 flex items-center gap-1">
                <Video className="h-3.5 w-3.5 text-violet-500" /> Demo Video URL (YouTube / Video link)
              </label>
              <input
                type="text"
                value={editing.videoUrl || ''}
                onChange={(e) => setEditing({ ...editing, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=... or video link"
                className="input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                value={editing.price}
                onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                placeholder="299"
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Original Price (₹) (Discount)
              </label>
              <input
                type="number"
                value={editing.oldPrice || ''}
                onChange={(e) => setEditing({ ...editing, oldPrice: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="499"
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Badge
              </label>
              <select
                value={editing.badge || ''}
                onChange={(e) => setEditing({ ...editing, badge: e.target.value, isTrending: e.target.value === 'Trending' ? true : editing.isTrending })}
                className="input"
              >
                <option value="Trending">🔥 Trending</option>
                <option value="Best Seller">⭐ Best Seller</option>
                <option value="Featured">✨ Featured</option>
                <option value="New">🚀 New</option>
                <option value="Free">🎁 Free</option>
                <option value="Premium">👑 Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                🔥 Trending Switch
              </label>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(editing.isTrending)}
                  onChange={(e) => setEditing({ ...editing, isTrending: e.target.checked })}
                  className="h-5 w-5 rounded border-ink-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                  Trending
                </span>
              </label>
            </div>
          </div>

          {/* Sub-Tags (#tags) */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1 flex items-center gap-1">
              <Hash className="h-3.5 w-3.5 text-brand-500" /> Product Sub-Tags (#tags)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="Add hashtag e.g. #Automation, #GST, #React"
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
              Description
            </label>
            <textarea
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              placeholder="Detailed description of what the buyer receives..."
              className="input"
            />
          </div>

          {/* Features bullet points */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
              Product Key Features & Highlights
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                placeholder="Add feature (e.g. GST Ready, Lifetime access)"
                className="input text-xs"
              />
              <button type="button" onClick={addFeature} className="btn-brand text-xs px-3">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editing.features.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ink-100 dark:bg-ink-800 text-xs font-medium text-ink-800 dark:text-ink-200">
                  {f}
                  <button type="button" onClick={() => removeFeature(i)} className="text-ink-400 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Direct Download / Instant Link URL
              </label>
              <input
                type="url"
                value={editing.downloadUrl || ''}
                onChange={(e) => setEditing({ ...editing, downloadUrl: e.target.value })}
                placeholder="https://drive.google.com/... or file link"
                className="input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300 mb-1">
                Custom WhatsApp Buy Link (Optional override)
              </label>
              <input
                type="text"
                value={editing.whatsappLink || ''}
                onChange={(e) => setEditing({ ...editing, whatsappLink: e.target.value })}
                placeholder="https://wa.me/919876543210?text=I+want+to+buy..."
                className="input text-xs"
              />
            </div>
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
              <Check className="h-4 w-4" /> Save Product
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="card p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="badge-brand text-[10px]">{p.category}</span>
                  <div className="flex items-center gap-1">
                    {p.isTrending && (
                      <span className="bg-gradient-to-r from-amber-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Flame className="h-3 w-3 fill-current" /> TRENDING
                      </span>
                    )}
                    {p.imageUrl && <span className="text-[10px] font-semibold text-brand-600 bg-brand-500/10 px-2 py-0.5 rounded-full">🖼️ Photo</span>}
                    {p.videoUrl && <span className="text-[10px] font-semibold text-violet-600 bg-violet-500/10 px-2 py-0.5 rounded-full">🎥 Video</span>}
                    {p.badge && (
                      <span className="bg-amber-500/15 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-ink-900 dark:text-white text-base">
                  {p.title}
                </h3>
                <p className="text-xs text-ink-600 dark:text-ink-300 line-clamp-2">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {(p.tags || []).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                    {p.price === 0 ? 'FREE' : `₹${p.price}`}
                  </span>
                  {p.oldPrice && (
                    <span className="text-xs text-ink-400 line-through">
                      ₹{p.oldPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-ink-100 dark:border-ink-800">
                <span className="text-xs text-ink-600 dark:text-ink-400">
                  {p.features?.length || 0} Features
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditing(p); setIsNew(false); }}
                    className="btn-ghost p-2 text-ink-600 hover:text-blue-500"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn-ghost p-2 text-ink-600 hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
