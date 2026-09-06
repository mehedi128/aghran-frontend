import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../common/BrandLogo';

export const Header: React.FC = () => {
  const {
    products,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    navigateTo,
    wishlist,
    addToCart
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products for live search preview on desktop
  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameBangla.includes(searchQuery) ||
        p.categoryEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigateTo('collection', { category: 'all' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#D85A30]/15 shadow-sm transition-all" id="main-site-header">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          
          {/* Brand Logo */}
          <BrandLogo
            size="md"
            onClick={() => navigateTo('home')}
            className="flex-shrink-0 cursor-pointer"
          />

          {/* Search Bar with live autocomplete - Desktop Only (Hidden on Mobile & Tablet) */}
          <div ref={searchRef} className="relative flex-1 max-w-xl hidden lg:block" id="header-search-container">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search homemade Pitha, stone-ground Mosolla (e.g. নকশী পিঠা, হলুদ গুঁড়া)..."
                className="w-full bg-[#FAEEDA]/70 text-[#3A2A1E] placeholder-[#888780] text-sm pl-11 pr-24 py-2.5 rounded-full border border-[#D85A30]/20 focus:border-[#D85A30] focus:bg-[#FAF6EE] focus:ring-2 focus:ring-[#D85A30]/20 outline-none transition-all"
                id="header-search-input"
              />
              <Search className="w-4 h-4 text-[#D85A30] absolute left-4 top-1/2 -translate-y-1/2" />
              
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#D85A30] text-[#FAF6EE] px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#c24e27] transition-colors shadow-sm"
                id="header-search-submit-btn"
              >
                Search
              </button>
            </form>

            {/* Live Search Popup */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#FAF6EE] border border-[#D85A30]/20 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-3 bg-[#FAEEDA]/50 border-b border-[#D85A30]/10 flex items-center justify-between text-xs font-semibold text-[#888780]">
                  <span>Matching Products ({searchResults.length})</span>
                  <span className="text-[#D85A30]">Direct from Village Kitchens</span>
                </div>
                <div className="divide-y divide-[#D85A30]/10 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchFocused(false);
                        navigateTo('product-detail', { slug: product.slug });
                      }}
                      className="p-3 flex items-center gap-3 hover:bg-[#FAEEDA]/60 cursor-pointer transition-colors group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.nameEnglish}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded-xl border border-[#D85A30]/15 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#3A2A1E] truncate group-hover:text-[#D85A30] transition-colors">
                            {product.nameEnglish}
                          </h4>
                          <span className="text-[11px] font-bangla text-[#888780] truncate">
                            ({product.nameBangla})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-extrabold text-[#D85A30]">
                            ৳{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-[#888780] line-through">
                              ৳{product.originalPrice}
                            </span>
                          )}
                          <span className="text-[10px] text-[#639922] bg-[#639922]/10 px-2 py-0.5 rounded-full font-semibold">
                            {product.categoryEnglish}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, undefined, 1);
                        }}
                        className="text-xs font-semibold bg-[#D85A30]/10 text-[#D85A30] hover:bg-[#D85A30] hover:text-[#FAF6EE] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  onClick={() => {
                    setIsSearchFocused(false);
                    navigateTo('collection', { category: 'all' });
                  }}
                  className="p-2.5 bg-[#FAEEDA] text-center text-xs font-bold text-[#D85A30] hover:bg-[#D85A30] hover:text-[#FAF6EE] cursor-pointer transition-colors flex items-center justify-center gap-1"
                >
                  <span>View all results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons (Wishlist, Cart Button) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="p-2 sm:p-2.5 text-[#3A2A1E] hover:bg-[#FAEEDA] rounded-full transition-colors relative flex items-center justify-center"
              id="header-wishlist-icon-btn"
              title="Saved Items"
            >
              <Heart className="w-5 h-5 text-[#3A2A1E]" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 bg-[#D85A30] text-[#FAF6EE] text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Count & Price */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 sm:gap-3 bg-[#D85A30] text-[#FAF6EE] px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl hover:bg-[#c24e27] active:scale-95 transition-all shadow-md group"
              id="header-cart-drawer-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:rotate-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FAC775] text-[#3A2A1E] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden xs:block">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#FAF6EE]/80 leading-none">
                  Cart
                </div>
                <div className="text-xs font-black text-[#FAF6EE] leading-tight mt-0.5">
                  ৳{cartSubtotal}
                </div>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
