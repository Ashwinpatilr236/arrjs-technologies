import { useMemo, useState, useEffect } from 'react';
import { cms, type StoreProductItem } from '../lib/cms';
import { useReveal } from '../hooks/useReveal';
import { Star, Download, Eye, Heart, ShoppingCart, Check, ShoppingBag } from 'lucide-react';

export default function DigitalStore() {
  const [cat, setCat] = useState('All');
  const [products, setProducts] = useState<StoreProductItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const { ref, visible } = useReveal();

  useEffect(() => {
    setProducts(cms.getProducts());
  }, []);

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...list];
  }, [products]);

  const filtered = useMemo(
    () => (cat === 'All' ? products : products.filter((p) => p.category === cat)),
    [cat, products]
  );

  const toggleWish = (id: string) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section id="store" className="relative overflow-hidden py-24 md:py-32">
      <div className="glow-orb left-[15%] top-[10%] h-72 w-72 bg-violet-500/10" />
      <div className="container-page relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Digital Store</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl md:text-5xl">
              Premium templates
              <span className="text-gradient"> & digital products.</span>
            </h2>
            <p className="mt-4 text-base text-ink-600 dark:text-ink-300 sm:text-lg">
              Instant download, secure checkout, lifetime updates. From Excel templates to
              full-stack Next.js starter kits.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
              <Check className="h-3.5 w-3.5 text-brand-500" /> Instant Download
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
              <Check className="h-3.5 w-3.5 text-brand-500" /> Secure Checkout
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                cat === c
                  ? 'border-brand-500 bg-brand-600 text-white'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-ink-300 dark:hover:border-brand-400/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div ref={ref} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              visible={visible}
              wished={wishlist.has(p.id)}
              onWish={() => toggleWish(p.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-ink-500">No products in this category yet.</p>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  visible,
  wished,
  onWish,
}: {
  product: StoreProductItem;
  index: number;
  visible: boolean;
  wished: boolean;
  onWish: () => void;
}) {
  const settings = cms.getSiteSettings();
  const buyUrl = product.downloadUrl || product.whatsappLink || `https://wa.me/${settings.whatsappNumber}?text=Hi!+I+want+to+buy+${encodeURIComponent(product.title)}`;

  return (
    <article
      style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
      className={`card card-hover group relative overflow-hidden p-5 transition-all duration-700 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500/10 via-violet-500/10 to-brand-400/10">
        <ShoppingBag className="h-16 w-16 text-brand-500/70 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
            {product.badge}
          </span>
        )}
        <button
          onClick={onWish}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur transition-all ${
            wished
              ? 'border-rose-400 bg-rose-500/20 text-rose-500'
              : 'border-white/20 bg-white/10 text-ink-300 hover:text-rose-500'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
          {product.category}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-500 dark:text-ink-400">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {product.rating} ({product.reviews})
        </span>
      </div>

      <h3 className="mt-1 font-display text-base font-semibold text-ink-900 dark:text-white">
        {product.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300 line-clamp-2">
        {product.description}
      </p>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {product.features?.map((f) => (
          <li
            key={f}
            className="rounded-full border border-ink-100 bg-ink-50 px-2.5 py-0.5 text-[11px] font-medium text-ink-600 dark:border-white/5 dark:bg-white/[0.03] dark:text-ink-300"
          >
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-ink-900 dark:text-white">
            {product.price === 0 ? 'Free' : `₹${product.price}`}
          </span>
          {product.oldPrice && product.price > 0 && (
            <span className="text-sm text-ink-400 line-through">₹{product.oldPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-4 !py-2 text-xs"
          >
            {product.price === 0 ? (
              <>
                <Download className="h-3.5 w-3.5" /> Free Download
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" /> Buy Now
              </>
            )}
          </a>
        </div>
      </div>
    </article>
  );
}
