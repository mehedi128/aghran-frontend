import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Wheat, UtensilsCrossed, Sparkles, Gift } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CategoryId } from '../../types';
import { ProductCard } from '../product/ProductCard';

export const CollectionPage: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, navigateTo } = useStore();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Category title and subtitle mapping
  const categoryMeta: Record<CategoryId, { titleBangla: string; titleEnglish: string; description: string }> = {
    pitha: {
      titleBangla: 'ঐতিহ্যবাহী পিঠা সম্ভার',
      titleEnglish: 'Traditional Homemade Pitha Collection',
      description: 'Handcrafted Nokshi Pitha, Jinuk Pitha, Kheer Patishapta, and fresh Chitoi platters made with pure date palm molasses.'
    },
    mosolla: {
      titleBangla: 'ঘানি ও পাথর ভাঙা দেশি মসলা',
      titleEnglish: 'Stone-Ground Pure Spices Collection',
      description: 'Single-origin Natore Turmeric, Bogura Chili, roasted Coriander, 14-spice royal Shahi Garam Masala, and wood-pressed Mustard Oil.'
    },
    all: {
      titleBangla: 'অঘ্রাণের সকল পণ্য সম্ভার',
      titleEnglish: 'All Organic & Traditional Delicacies',
      description: 'Discover the entire catalogue of 100% adulteration-free homemade Bengali organic food.'
    },
    combos: {
      titleBangla: 'স্পেশাল কম্বো অফার',
      titleEnglish: 'Winter Harvest Combos & Gift Boxes',
      description: 'পাতা নকশি, ফুল নকশি ও ঝিনুক নকশি পিঠার অল-ইন-ওয়ান স্পেশাল কম্বো প্যাক।'
    }
  };

  const meta = categoryMeta[selectedCategory] || categoryMeta.all;

  // Filtered & Sorted products (Mosolla temporarily off)
  const activeProducts = useMemo(() => {
    return products.filter(p => p.category !== 'mosolla');
  }, [products]);

  const filteredProducts = useMemo(() => {
    return activeProducts.filter(p => {
      // Category filter
      if (selectedCategory === 'combos') {
        if (p.category !== 'combos' && !p.id.includes('combo') && !p.slug.includes('combo')) {
          return false;
        }
      } else if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && p.stockStatus === 'Stock Out') {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [activeProducts, selectedCategory, inStockOnly, maxPrice, sortBy]);

  const pithaCount = activeProducts.filter(p => p.category === 'pitha').length;
  const comboCount = activeProducts.filter(p => p.category === 'combos' || p.id.includes('combo') || p.slug.includes('combo')).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8" id="collection-listing-page">
      
      {/* Category Banner Header */}
      <div className="bg-[#FAEEDA] rounded-3xl p-6 sm:p-10 border border-[#D85A30]/20 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#D85A30] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AGHRAN COLLECTION • অঘ্রাণ সমাহার</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-bangla text-[#3A2A1E]">
            {meta.titleBangla}
          </h1>
          <h2 className="text-base sm:text-lg font-bold text-[#888780]">
            {meta.titleEnglish}
          </h2>
          <p className="text-xs sm:text-sm text-[#888780] leading-relaxed pt-1">
            {meta.description}
          </p>
        </div>

        {/* Quick Category Switcher Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 relative z-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#D85A30] text-[#FAF6EE] shadow-sm'
                : 'bg-[#FAF6EE] text-[#3A2A1E] hover:bg-[#FAF6EE]/80'
            }`}
          >
            All Products ({activeProducts.length})
          </button>
          <button
            onClick={() => setSelectedCategory('pitha')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === 'pitha'
                ? 'bg-[#D85A30] text-[#FAF6EE] shadow-sm'
                : 'bg-[#FAF6EE] text-[#3A2A1E] hover:bg-[#FAF6EE]/80'
            }`}
          >
            <Wheat className="w-3.5 h-3.5" />
            <span>Traditional Pitha ({pithaCount})</span>
          </button>
          <button
            onClick={() => setSelectedCategory('combos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === 'combos'
                ? 'bg-[#D85A30] text-[#FAF6EE] shadow-sm'
                : 'bg-[#FAF6EE] text-[#3A2A1E] hover:bg-[#FAF6EE]/80'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Combo Offers ({comboCount})</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filter (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 space-y-6 bg-[#FAF6EE] p-6 rounded-3xl border border-[#D85A30]/20 shadow-sm sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D85A30]/15">
            <span className="text-sm font-bold text-[#3A2A1E] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#D85A30]" />
              Filter Products
            </span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(5000);
                setInStockOnly(false);
                setSortBy('featured');
              }}
              className="text-[11px] font-bold text-[#D85A30] hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3A2A1E] block uppercase tracking-wider">
              Category
            </label>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs text-[#3A2A1E] cursor-pointer">
                <input
                  type="radio"
                  name="cat"
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory('all')}
                  className="accent-[#D85A30]"
                />
                <span>All Categories ({activeProducts.length})</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#3A2A1E] cursor-pointer">
                <input
                  type="radio"
                  name="cat"
                  checked={selectedCategory === 'pitha'}
                  onChange={() => setSelectedCategory('pitha')}
                  className="accent-[#D85A30]"
                />
                <span>Traditional Pitha ({pithaCount})</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#3A2A1E] cursor-pointer">
                <input
                  type="radio"
                  name="cat"
                  checked={selectedCategory === 'combos'}
                  onChange={() => setSelectedCategory('combos')}
                  className="accent-[#D85A30]"
                />
                <span>Combo Offers ({comboCount})</span>
              </label>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-3 border-t border-[#D85A30]/10">
            <div className="flex items-center justify-between text-xs font-bold text-[#3A2A1E]">
              <span>Max Price:</span>
              <span className="text-[#D85A30]">৳{maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#D85A30]"
            />
            <div className="flex justify-between text-[10px] text-[#888780]">
              <span>৳100</span>
              <span>৳5000</span>
            </div>
          </div>

          {/* Stock Filter */}
          <div className="pt-3 border-t border-[#D85A30]/10">
            <label className="flex items-center gap-2 text-xs text-[#3A2A1E] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#639922]"
              />
              <span className="font-bold">In-Stock Only</span>
            </label>
          </div>
        </div>

        {/* Right Main Product Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Bar: Results Count + Sort & Mobile Filter Toggle */}
          <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#D85A30]/20 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="text-xs font-semibold text-[#888780]">
              Showing <span className="text-[#3A2A1E] font-bold">{filteredProducts.length}</span> items
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-bold bg-[#FAEEDA] px-3 py-2 rounded-xl border border-[#D85A30]/20 text-[#3A2A1E]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D85A30]" />
                <span>Filters</span>
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#888780] hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAEEDA] text-[#3A2A1E] text-xs font-bold px-3 py-2 rounded-xl border border-[#D85A30]/20 focus:outline-none focus:border-[#D85A30]"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FAF6EE] rounded-3xl p-12 text-center space-y-4 border border-[#D85A30]/20">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAEEDA] flex items-center justify-center text-[#D85A30]">
                <Filter className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="text-lg font-bold font-serif-bangla text-[#3A2A1E]">
                কোনো পণ্য পাওয়া যায়নি
              </h3>
              <p className="text-xs text-[#888780] max-w-sm mx-auto">
                No products match your current price or category filters. Try resetting the filters to view all items.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxPrice(5000);
                  setInStockOnly(false);
                }}
                className="bg-[#D85A30] text-[#FAF6EE] text-xs font-bold px-5 py-2.5 rounded-xl shadow-md"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#3A2A1E]/60 backdrop-blur-sm flex justify-end animate-in fade-in">
          <div className="bg-[#FAF6EE] w-4/5 max-w-xs h-full p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#D85A30]/20">
                <span className="text-sm font-bold text-[#3A2A1E] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#D85A30]" />
                  Filters
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-[#888780]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A2A1E] block">Category</label>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold ${
                      selectedCategory === 'all' ? 'bg-[#D85A30] text-[#FAF6EE]' : 'bg-[#FAEEDA] text-[#3A2A1E]'
                    }`}
                  >
                    All Products ({activeProducts.length})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('pitha');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold ${
                      selectedCategory === 'pitha' ? 'bg-[#D85A30] text-[#FAF6EE]' : 'bg-[#FAEEDA] text-[#3A2A1E]'
                    }`}
                  >
                    Traditional Pitha ({pithaCount})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('combos');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold ${
                      selectedCategory === 'combos' ? 'bg-[#D85A30] text-[#FAF6EE]' : 'bg-[#FAEEDA] text-[#3A2A1E]'
                    }`}
                  >
                    Combo Offers ({comboCount})
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A2A1E] block">
                  Max Price: ৳{maxPrice}
                </label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#D85A30]"
                />
              </div>

              {/* In stock */}
              <div>
                <label className="flex items-center gap-2 text-xs text-[#3A2A1E]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#639922]"
                  />
                  <span className="font-bold">In-Stock Only</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-[#D85A30] text-[#FAF6EE] rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
