import React, { useState } from 'react';
import { STORE_PRODUCTS } from '../data/store';
import { StoreProduct } from '../types';
import { 
  ShoppingBag, 
  ExternalLink, 
  Search, 
  Filter, 
  ShieldCheck, 
  Star, 
  X, 
  CheckCircle,
  Sparkles,
  Info
} from 'lucide-react';

export const StoreView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<StoreProduct | null>(null);

  const categories = [
    { id: 'all', label: 'All Recommendations' },
    { id: 'networking', label: 'Networking & Routers' },
    { id: 'components', label: 'PC Upgrades & Memory' },
    { id: 'accessories', label: 'Office & Workstation' },
    { id: 'laptops-pcs', label: 'Laptops & Desktop PCs' }
  ];

  const filteredProducts = STORE_PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.recommendedFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-xs font-semibold px-3.5 py-1 rounded-full border border-purple-400/30">
            <ShoppingBag className="w-4 h-4 text-purple-400" /> ARRJS Tech Store
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Curated Technology Recommendations
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Handpicked routers, PC upgrade components, and office hardware tested and recommended by technical professionals.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Mandatory Affiliate Disclosure Banner */}
        <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-purple-900 space-y-1">
              <p className="font-bold">
                Affiliate Partner Notice & Transparent Product Curation
              </p>
              <p className="text-purple-800 leading-relaxed">
                ARRJS Tech Store curates technology products recommended through trusted affiliate partners such as <strong>Amazon</strong> and <strong>Flipkart</strong>. ARRJS Technologies does NOT maintain physical inventory or sell products directly. Prices and live availability are displayed on partner platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id 
                    ? 'bg-purple-700 text-white shadow-2xs' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products & specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-purple-600"
            />
          </div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Product Image & Badge */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                    <span>{product.categoryName}</span>
                    <span className="flex items-center gap-0.5 text-amber-600">
                      <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" /> {product.rating}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px] text-slate-700 space-y-1">
                    <p className="font-semibold text-slate-900">Recommended For:</p>
                    <p className="text-slate-600 text-[10px]">{product.recommendedFor}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => setActiveModalProduct(product)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  View Details & Specifications
                </button>

                <div className="grid grid-cols-2 gap-2">
                  {product.affiliateUrlAmazon && (
                    <a
                      href={product.affiliateUrlAmazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-extrabold py-2 rounded-lg text-center flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <span>Amazon</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {product.affiliateUrlFlipkart && (
                    <a
                      href={product.affiliateUrlFlipkart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <span>Flipkart</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Product Specification Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                  {activeModalProduct.categoryName}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5 leading-snug">
                  {activeModalProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
              <div className="h-48 rounded-xl overflow-hidden bg-slate-100">
                <img 
                  src={activeModalProduct.imageUrl} 
                  alt={activeModalProduct.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div>
                <p className="font-bold text-slate-900 text-sm">Product Overview</p>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  {activeModalProduct.description}
                </p>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 space-y-1">
                <p className="font-bold text-purple-900">Key Features & Technical Specs:</p>
                <ul className="space-y-1 pl-4 list-disc text-purple-950">
                  {activeModalProduct.specs.map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-900">Ideal Target Setup:</p>
                <p className="text-slate-600 mt-0.5">{activeModalProduct.recommendedFor}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <p className="text-[11px] text-slate-500 text-center">
                  Redirects to affiliate partner platform for live pricing & stock checkout:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {activeModalProduct.affiliateUrlAmazon && (
                    <a
                      href={activeModalProduct.affiliateUrlAmazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Buy on Amazon</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {activeModalProduct.affiliateUrlFlipkart && (
                    <a
                      href={activeModalProduct.affiliateUrlFlipkart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Buy on Flipkart</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
