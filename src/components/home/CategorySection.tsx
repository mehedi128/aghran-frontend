import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';

export const CategorySection: React.FC = () => {
  const { products, navigateTo } = useStore();

  const pithaProducts = products.filter(p => p.category === 'pitha');

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-14" id="home-category-sections">
      
      {/* ================= SECTION: PITHA (ঐতিহ্যবাহী পিঠা সম্ভার) ================= */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b-2 border-[#D85A30]/20">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
              ঐতিহ্যবাহী পিঠা সম্ভার
            </h2>
          </div>

          <button
            onClick={() => navigateTo('collection', { category: 'pitha' })}
            className="text-xs font-bold text-[#D85A30] hover:text-[#c24e27] flex items-center gap-1.5 self-start sm:self-auto bg-[#FAEEDA] px-4 py-2 rounded-xl border border-[#D85A30]/20 transition-all hover:shadow-sm"
          >
            <span>View All Pitha ({pithaProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pitha Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pithaProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </section>
  );
};
