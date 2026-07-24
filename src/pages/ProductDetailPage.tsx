import { useState } from 'react';
import { useLocation, Link } from '../lib/router';
import { cms, type StoreProductItem } from '../lib/cms';
import PageHeader from '../components/PageHeader';
import { 
  ArrowLeft, 
  Star, 
  Check, 
  Download, 
  ShoppingCart, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Flame, 
  Play, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function ProductDetailPage() {
  const { pathname } = useLocation();
  const settings = cms.getSiteSettings();
  
  // Extract id from pathname e.g. /store/p1 or /store/product/p1
  const id = pathname.replace(/^\/store\/(product\/)?/, '');
  const product = cms.getProducts().find((p) => p.id === id);

  const [unlocked, setUnlocked] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [txId, setTxId] = useState('');
  const [txError, setTxError] = useState('');

  if (!product) {
    return (
      <div className="container-page py-24 md:py-32">
        <PageHeader eyebrow="Product Not Found" title="Sorry, this product does not exist." highlight="404" subtitle="Check the URL or return to the digital store." />
        <div className="mt-8">
          <Link to="/store" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const isFree = product.price === 0;
  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waPaymentText = encodeURIComponent(`Hi! I paid ₹${product.price} for "${product.title}". Please send me the download access.`);
  const waPaymentUrl = `https://wa.me/${cleanWaNumber || '919106053108'}?text=${waPaymentText}`;

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId.trim()) {
      setTxError('Please enter Transaction ID or UTR number');
      return;
    }
    setTxError('');
    setUnlocked(true);
    setShowPayModal(false);
  };

  return (
    <div className="container-page py-24 md:py-32 space-y-12">
      {/* Top Back Navigation */}
      <div>
        <Link to="/store" className="btn-ghost text-xs inline-flex items-center gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back to Digital Store
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Media Preview & Description (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Media Player / Image Header */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900 shadow-xl min-h-[280px] sm:min-h-[380px] flex items-center justify-center">
            {product.videoUrl ? (
              product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={product.videoUrl.replace('watch?v=', 'embed/')}
                  title={product.title}
                  className="w-full h-[380px] border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={product.videoUrl} controls className="w-full h-[380px] object-cover" />
              )
            ) : product.imageUrl ? (
              <img src={product.imageUrl} alt={product.title} className="w-full h-full max-h-[420px] object-cover" />
            ) : (
              <div className="p-8 text-center space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-white">{product.title}</h3>
                <span className="badge-brand text-xs">{product.category}</span>
              </div>
            )}

            {/* Badges Overlays */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.isTrending && (
                <span className="rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Flame className="h-3.5 w-3.5 fill-current animate-bounce" /> Trending
                </span>
              )}
              {product.badge && !product.isTrending && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/20 text-amber-300 backdrop-blur px-3 py-1 text-xs font-bold uppercase">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Description Card */}
          <div className="card p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                Product Description
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300 whitespace-pre-line">
                {product.description || 'No detailed description specified for this template.'}
              </p>
            </div>

            {/* Features list */}
            {product.features?.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <h4 className="font-semibold text-sm text-ink-900 dark:text-white mb-3">
                  Key Specifications & Included Features:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-ink-800 dark:text-ink-200">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hashtags */}
            {(product.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags?.map((tag, idx) => (
                  <span key={idx} className="text-xs font-semibold text-brand-600 dark:text-brand-300 bg-brand-500/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing & Payment Checkout Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="glow-orb -top-10 -right-10 h-40 w-40 bg-brand-500/20" />

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {product.category}
              </span>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-ink-900 dark:text-white">
                {product.title}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-ink-500">
                <div className="flex items-center text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-ink-900 dark:text-white font-bold">{product.rating}</span>
                </div>
                <span>·</span>
                <span>{product.reviews} Customer Reviews</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-ink-500 block">Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                    {isFree ? 'FREE' : `₹${product.price}`}
                  </span>
                  {product.oldPrice && product.price > 0 && (
                    <span className="text-sm text-ink-400 line-through">₹{product.oldPrice}</span>
                  )}
                </div>
              </div>

              {!isFree && product.oldPrice && (
                <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">
                  Save ₹{product.oldPrice - product.price}
                </span>
              )}
            </div>

            {/* Download & Payment Access Box */}
            <div className="space-y-4 pt-2">
              {isFree || unlocked ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    {isFree ? 'Free Item — Instant Download Unlocked!' : 'Payment Verified — Access Unlocked! 🎉'}
                  </div>

                  <a
                    href={product.downloadUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand w-full py-3.5 text-base font-semibold shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" /> Download Product File Now
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-300 text-xs font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 shrink-0" />
                    <span>Download file is locked until payment is verified.</span>
                  </div>

                  <button
                    onClick={() => setShowPayModal(true)}
                    className="btn-brand w-full py-3.5 text-base font-semibold shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" /> Pay ₹{product.price} & Unlock Download
                  </button>

                  <a
                    href={waPaymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-violet w-full py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" /> Pay via WhatsApp / UPI
                  </a>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-3 text-xs text-ink-500 dark:text-ink-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure Checkout
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-brand-500" /> Lifetime Access
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Verification Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="card max-w-md w-full p-6 sm:p-8 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="font-bold text-lg text-ink-900 dark:text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-brand-500" /> Payment & Verification
              </h3>
              <button onClick={() => setShowPayModal(false)} className="text-ink-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            <p className="text-xs text-ink-600 dark:text-ink-300">
              Complete payment of <strong>₹{product.price}</strong> using UPI or WhatsApp:
            </p>

            <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 space-y-2 text-xs">
              <p className="font-semibold text-brand-600 dark:text-brand-300">
                💳 UPI ID: <span className="font-mono text-sm underline select-all">919106053108@upi</span>
              </p>
              <p className="text-ink-600 dark:text-ink-400">
                Or click below to pay via WhatsApp:
              </p>
              <a
                href={waPaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-violet text-xs py-2 w-full flex items-center justify-center gap-2 mt-2"
              >
                <MessageCircle className="h-4 w-4" /> Open WhatsApp Payment
              </a>
            </div>

            <form onSubmit={handleVerifyPayment} className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-ink-700 dark:text-ink-300">
                Enter Transaction ID / UTR / Code after payment:
              </label>
              <input
                type="text"
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
                placeholder="e.g. 420192847192 or ABC123"
                className="input text-xs font-mono"
              />
              {txError && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" /> {txError}
                </p>
              )}
              <button type="submit" className="btn-brand text-xs w-full py-3 font-semibold">
                <Unlock className="h-4 w-4" /> Confirm Payment & Unlock File
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
