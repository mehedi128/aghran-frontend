import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../common/BrandLogo';

export const Header: React.FC = () => {
  const {
    products,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    navigateTo,
    currentView,
    selectedCategory,
    addToCart,
    wishlist
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products for live search preview
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
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#3A2A1E] hover:bg-[#FAEEDA] rounded-xl transition-colors"
            id="mobile-menu-toggle-btn"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <BrandLogo
            size="md"
            onClick={() => navigateTo('home')}
            className="flex-shrink-0"
          />

          {/* Search Bar with live autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block" id="header-search-container">
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="p-2.5 text-[#3A2A1E] hover:bg-[#FAEEDA] rounded-full transition-colors relative hidden sm:flex items-center justify-center"
              id="header-wishlist-icon-btn"
              title="Saved Items"
            >
              <Heart className="w-5 h-5 text-[#3A2A1E]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D85A30] text-[#FAF6EE] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Count & Price */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 sm:gap-3 bg-[#D85A30] text-[#FAF6EE] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl hover:bg-[#c24e27] active:scale-95 transition-all shadow-md group"
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

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Pitha or Mosolla..."
              className="w-full bg-[#FAEEDA]/70 text-[#3A2A1E] placeholder-[#888780] text-xs pl-9 pr-16 py-2 rounded-xl border border-[#D85A30]/20 focus:border-[#D85A30] focus:bg-[#FAF6EE] outline-none"
            />
            <Search className="w-3.5 h-3.5 text-[#D85A30] absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#D85A30] text-[#FAF6EE] px-2.5 py-1 rounded-lg text-[11px] font-semibold"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-[#3A2A1E]/50 backdrop-blur-sm z-50 animate-in fade-in">
          <div className="bg-[#FAF6EE] w-4/5 max-w-sm h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between border-r border-[#D85A30]/20">
            <div className="space-y-4">
              <div className="pb-4 border-b border-[#D85A30]/15">
                <span className="text-xs font-bold text-[#888780] uppercase tracking-wider">
                  Menu & Categories
                </span>
              </div>
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('home');
                  }}
                  className={`text-left px-3 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-between ${
                    currentView === 'home' ? 'bg-[#D85A30] text-[#FAF6EE]' : 'text-[#3A2A1E] hover:bg-[#FAEEDA]'
                  }`}
                >
                  <span>Home (হোম)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('collection', { category: 'pitha' });
                  }}
                  className={`text-left px-3 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-between ${
                    currentView === 'collection' && selectedCategory === 'pitha' ? 'bg-[#D85A30] text-[#FAF6EE]' : 'text-[#3A2A1E] hover:bg-[#FAEEDA]'
                  }`}
                >
                  <span>Pitha Collection (পিঠা সম্ভার)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('collection', { category: 'combos' });
                  }}
                  className={`text-left px-3 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-between ${
                    currentView === 'collection' && selectedCategory === 'combos' ? 'bg-[#D85A30] text-[#FAF6EE]' : 'text-[#3A2A1E] hover:bg-[#FAEEDA]'
                  }`}
                >
                  <span>Combo Offers (কম্বো অফার)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('collection', { category: 'all' });
                  }}
                  className="text-left px-3 py-2.5 rounded-xl font-bold text-sm text-[#3A2A1E] hover:bg-[#FAEEDA] transition-colors"
                >
                  <span>All Products (সকল পণ্য)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('track-order');
                  }}
                  className="text-left px-3 py-2.5 rounded-xl font-bold text-sm text-[#3A2A1E] hover:bg-[#FAEEDA] transition-colors flex items-center justify-between"
                >
                  <span>Track Your Order</span>
                  <span className="text-xs text-[#D85A30] font-semibold">Live status</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('about');
                  }}
                  className="text-left px-3 py-2.5 rounded-xl font-bold text-sm text-[#3A2A1E] hover:bg-[#FAEEDA] transition-colors"
                >
                  <span>Our Story (অঘ্রাণের গল্প)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('contact');
                  }}
                  className="text-left px-3 py-2.5 rounded-xl font-bold text-sm text-[#3A2A1E] hover:bg-[#FAEEDA] transition-colors"
                >
                  <span>Contact & Support</span>
                </button>
              </nav>
            </div>

            {/* Bottom helper in mobile drawer */}
            <div className="pt-6 border-t border-[#D85A30]/15 space-y-3">
              <div className="flex items-center gap-2 p-3 bg-[#FAEEDA] rounded-xl text-xs text-[#3A2A1E]">
                <Sparkles className="w-4 h-4 text-[#D85A30] flex-shrink-0" />
                <span>100% Homemade • Chemical Free • Fast Delivery</span>
              </div>
              <a
                href="tel:+8801712345678"
                className="w-full text-center block bg-[#3A2A1E] text-[#FAF6EE] py-2.5 rounded-xl text-xs font-bold"
              >
                Call Hotline: +880 1712-345678
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
