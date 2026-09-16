import React from 'react';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const { navigateTo, selectedCategory, currentView } = useStore();

  return (
    <nav className="bg-[#FAEEDA] border-b border-[#D85A30]/20 hidden lg:block sticky top-[73px] z-30 shadow-sm" id="category-horizontal-navbar">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2.5">
          
          {/* Category Nav Links */}
          <div className="flex items-center space-x-2">
            <a
              href="?category=pitha"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  navigateTo('collection', { category: 'pitha' });
                }
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                currentView === 'collection' && selectedCategory === 'pitha'
                  ? 'text-[#D85A30] bg-[#FAF6EE] shadow-sm'
                  : 'text-[#3A2A1E] hover:text-[#D85A30] hover:bg-[#FAF6EE]/50'
              }`}
            >
              Pitha Collection (পিঠা সম্ভার)
            </a>

            <a
              href="?category=combos"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  navigateTo('collection', { category: 'combos' });
                }
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                currentView === 'collection' && selectedCategory === 'combos'
                  ? 'text-[#D85A30] bg-[#FAF6EE] shadow-sm'
                  : 'text-[#3A2A1E] hover:text-[#D85A30] hover:bg-[#FAF6EE]/50'
              }`}
            >
              Combo Offers (কম্বো অফার)
            </a>

            <a
              href="?category=all"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  navigateTo('collection', { category: 'all' });
                }
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                currentView === 'collection' && selectedCategory === 'all'
                  ? 'text-[#D85A30] bg-[#FAF6EE] shadow-sm'
                  : 'text-[#3A2A1E] hover:text-[#D85A30] hover:bg-[#FAF6EE]/50'
              }`}
            >
              All Products (সকল পণ্য)
            </a>

            <a
              href="?view=about"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  navigateTo('about');
                }
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                currentView === 'about'
                  ? 'text-[#D85A30] bg-[#FAF6EE]'
                  : 'text-[#3A2A1E] hover:text-[#D85A30] hover:bg-[#FAF6EE]/50'
              }`}
            >
              Our Story (অঘ্রাণের কথা)
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};
