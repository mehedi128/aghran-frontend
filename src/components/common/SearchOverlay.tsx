import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo, addToCart } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'নকশি পিঠা', 'পাটিসাপটা', 'চিনির খাঁটি নলেন গুড়', 'বগুড়ার লাল মরিচ', 
    'নাটোরের হলুদ', 'শাহী গরম মসলা', 'ঘানির সরিষার তেল'
  ];

  const searchResults = searchTerm.trim() === ''
    ? []
    : products.filter(p => {
        const q = searchTerm.toLowerCase();
        return (
          p.nameBangla.toLowerCase().includes(q) ||
          p.nameEnglish.toLowerCase().includes(q) ||
          p.categoryBangla.toLowerCase().includes(q) ||
          p.categoryEnglish.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      });

  return (
    <div
      className="fixed inset-0 z-50 bg-[#3A2A1E]/70 backdrop-blur-md flex flex-col items-center p-4 sm:p-6 overflow-y-auto animate-in fade-in"
      id="search-overlay"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="bg-[#FAF6EE] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-[#D85A30]/30 relative my-auto animate-in zoom-in-95 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="relative flex items-center">
          <Search className="w-6 h-6 text-[#D85A30] absolute left-4" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search homemade pitha, stone-ground spices... (খুঁজুন)"
            className="w-full bg-[#FAEEDA] text-[#3A2A1E] placeholder-[#888780] text-sm sm:text-base pl-12 pr-12 py-4 rounded-2xl border-2 border-[#D85A30]/25 focus:outline-none focus:border-[#D85A30]"
          />
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 p-1 rounded-full text-[#888780] hover:text-[#3A2A1E]"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-4 p-1 rounded-full text-[#888780] hover:text-[#3A2A1E]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Popular Trending Tags */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#888780] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D85A30]" />
            <span>Popular Searches (জনপ্রিয় সার্চ):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => setSearchTerm(term)}
                className="text-xs bg-[#FAEEDA] text-[#3A2A1E] hover:bg-[#D85A30] hover:text-[#FAF6EE] px-3 py-1.5 rounded-xl border border-[#D85A30]/15 transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        {searchTerm.trim() !== '' && (
          <div className="space-y-3 pt-3 border-t border-[#D85A30]/15">
            <div className="flex items-center justify-between text-xs text-[#888780]">
              <span>Results for "{searchTerm}":</span>
              <span>{searchResults.length} items found</span>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#888780]">
                No delicious homemade delicacies matched your search. Try typing "pitha" or "masala".
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1 divide-y divide-[#D85A30]/10">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('product-detail', { slug: item.slug });
                    }}
                    className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-[#FAEEDA]/70 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.images[0]}
                        alt={item.nameEnglish}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-[#D85A30]/20 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold font-serif-bangla text-[#3A2A1E] truncate">
                          {item.nameBangla}
                        </h4>
                        <h5 className="text-[11px] text-[#888780] truncate">
                          {item.nameEnglish}
                        </h5>
                        <div className="text-[10px] text-[#639922] font-semibold">
                          {item.categoryEnglish}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-black text-[#D85A30] block">
                        ৳{item.price}
                      </span>
                      <span className="text-[10px] text-[#888780]">View Details →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
