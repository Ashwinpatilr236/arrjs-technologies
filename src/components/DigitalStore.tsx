import { useMemo, useState, useEffect } from 'react';
import { cms, type StoreProductItem } from '../lib/cms';
import { useReveal } from '../hooks/useReveal';
import { Star, Download, Heart, ShoppingCart, Check, ShoppingBag, Flame, Play, ArrowRight } from 'lucide-react';
import { Link } from '../lib/router';

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

        <div ref={ref} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  const hasMedia = Boolean(product.imageUrl || product.videoUrl);

  return (
    <Link
      to={`/store/${product.id}`}
      style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
      className={`card card-hover group block relative overflow-hidden transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      {/* Media Box: Only renders height if image or video exists */}
      {hasMedia ? (
        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : product.videoUrl ? (
            <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </div>
            </div>
          ) : null}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 z-10">
            {product.isTrending && (
              <span className="rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Flame className="h-3 w-3 fill-current" /> Trending
              </span>
            )}
            {product.badge && !product.isTrending && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                {product.badge}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Compact Header Bar when Media is not present (Eliminates empty blank space) */
        <div className="px-5 pt-5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            {product.isTrending && (
              <span className="rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white px-2 py-0.5 text-[10px] font-bold uppercase flex items-center gap-1 shadow-sm">
                <Flame className="h-3 w-3 fill-current" /> Trending
              </span>
            )}
            {product.badge && !product.isTrending && (
              <span className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300 px-2 py-0.5 text-[10px] font-semibold uppercase">
                {product.badge}
              </span>
            )}
          </div>
        </div>
      )}

      <div className={`p-5 ${hasMedia ? '' : 'pt-2'}`}>
        <div className="flex items-center justify-between text-xs text-ink-500 dark:text-ink-400">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
            {product.category}
          </span>
          <span className="inline-flex items-center gap-1 font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating} ({product.reviews})
          </span>
        </div>

        <h3 className="mt-2 font-display text-base font-bold text-ink-900 dark:text-white transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
          {product.title}
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-600 dark:text-ink-300 line-clamp-2">
          {product.description}
        </p>

        {/* Hashtags */}
        {(product.tags || []).length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.tags?.map((t, idx) => (
              <span key={idx} className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Pricing & Details CTA Bar */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-ink-100 dark:border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-ink-900 dark:text-white">
              {product.price === 0 ? 'Free' : `₹${product.price}`}
            </span>
            {product.oldPrice && product.price > 0 && (
              <span className="text-xs text-ink-400 line-through">₹{product.oldPrice}</span>
            )}
          </div>
          
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:text-brand-500">
            View Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
