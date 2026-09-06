import React from 'react';
import { ArrowRight, Wheat, UtensilsCrossed, Sparkles, Gift } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import nokshiPithaCategoryImg from '../../assets/images/nokshi_pitha_clay_1787466525945.jpg';

export const FeaturedCategories: React.FC = () => {
  const { navigateTo } = useStore();

  const categories = [
    {
      id: 'pitha',
      titleBangla: 'ঐতিহ্যবাহী পিঠা সম্ভার',
      titleEnglish: 'Traditional Homemade Pitha',
      subtitle: 'পাতা নকশি, ফুল নকশি, ঝিনুক নকশি ও নারিকেল পুলি পিঠা।',
      itemCount: 'Fresh Homemade',
      badge: 'হাতে তৈরি',
      badgeColor: 'bg-[#D85A30]',
      image: nokshiPithaCategoryImg,
      icon: <Wheat className="w-6 h-6 text-[#D85A30]" />,
      actionCategory: 'pitha' as const
    },
    {
      id: 'combos',
      titleBangla: 'স্পেশাল কম্বো অফার',
      titleEnglish: 'Winter Pitha Special Bundles',
      subtitle: 'নকশী পিঠা, ফুল পিঠা ও ঝিনুক পিঠার স্পেশাল সেভার কম্বো প্যাক।',
      itemCount: 'Mega Savings',
      badge: 'জনপ্রিয় অফার',
      badgeColor: 'bg-[#D85A30]',
      image: nokshiPithaCategoryImg,
      icon: <Gift className="w-6 h-6 text-[#D85A30]" />,
      actionCategory: 'combos' as const
    }
  ];

  const handleCategoryClick = (cat: typeof categories[0]) => {
    if (cat.id === 'combos') {
      const el = document.getElementById('combo-offers-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigateTo('collection', { category: cat.actionCategory });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8" id="featured-categories-section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
            প্রধান ক্যাটাগরি
          </h2>
        </div>
        <button
          onClick={() => navigateTo('collection', { category: 'all' })}
          className="text-xs font-bold text-[#D85A30] hover:text-[#c24e27] flex items-center gap-1 hover:underline self-start sm:self-auto"
        >
          <span>View All Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="group relative bg-[#FAF6EE] rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-[#D85A30]/15 hover:border-[#D85A30]/50 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col sm:flex-row items-stretch justify-between gap-5 sm:gap-6 w-full"
            id={`category-card-${cat.id}`}
          >
            {/* Content */}
            <div className="flex-1 space-y-3 z-10 flex flex-col justify-between w-full">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 bg-[#FAEEDA] rounded-2xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <span className={`${cat.badgeColor} text-[#FAF6EE] text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm`}>
                    {cat.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-bangla text-[#3A2A1E] group-hover:text-[#D85A30] transition-colors">
                    {cat.titleBangla}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#888780] leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <span className="text-xs sm:text-sm font-black text-[#3A2A1E] group-hover:text-[#D85A30] flex items-center gap-1.5 group-hover:translate-x-1 transition-all">
                  <span>{cat.id === 'combos' ? 'Explore Combos' : 'Explore Collection'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Thumbnail Image - Full width banner on mobile, square box on desktop */}
            <div className="w-full sm:w-44 sm:h-auto md:w-52 aspect-[16/9] sm:aspect-square rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-[#FAEEDA] group-hover:scale-105 transition-transform duration-500 relative">
              <img
                src={cat.image}
                alt={cat.titleEnglish}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
