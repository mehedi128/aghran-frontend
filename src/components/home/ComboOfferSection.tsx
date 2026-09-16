import React from 'react';
import { ShoppingCart, Tag, Check, Zap, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import nokshiPithaComboImg from '../../assets/images/nokshi_pitha_village_1787466507600.jpg';
import utsabComboImage from '../../assets/images/up0.png';

interface ComboOffer {
  id: string;
  titleBangla: string;
  titleEnglish: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  savings: number;
  items: string[];
  image: string;
  badge: string;
  freeDelivery?: boolean;
  category: 'pitha' | 'mosolla' | 'all';
}

export const ComboOfferSection: React.FC = () => {
  const { products, addToCart, buyNow, navigateTo } = useStore();

  const comboOffers: ComboOffer[] = [
    {
      id: 'pitha-combo-pack',
      titleBangla: 'উৎসব কম্বো প্যাক ( 1 kg)',
      titleEnglish: 'Utsab Combo Pack (1 kg)',
      subtitle: 'পাতা নকশি + ফুল নকশি + ঝিনুক নকশি + নারিকেল পুলি পিঠার স্পেশাল কম্বো সমাহার',
      price: 699,
      originalPrice: 850,
      savings: 151,
      badge: 'বেস্ট সেলিং কম্বো',
      image: utsabComboImage,
      items: [
        'পাতা নকশি পিঠা',
        'ফুল নকশি পিঠা',
        'ঝিনুক নকশি পিঠা',
        'নারিকেল পুলি পিঠা'
      ],
      category: 'pitha'
    },

    {
      id: 'combo-pitha-utsab',
      titleBangla: 'উৎসব কম্বো প্যাক (2 KG)',
      titleEnglish: 'Utsab Combo Pack (2 kg)',
      subtitle: 'পাতা নকশি, ফুল নকশি, ঝিনুক নকশি ও নারিকেল পুলি পিঠার ২ কেজির মেগা প্যাক',
      price: 1350,
      originalPrice: 1650,
      savings: 300,
      badge: 'ফ্রি ডেলিভারি',
      freeDelivery: true,
      image: utsabComboImage,
      items: [
        'পাতা নকশি পিঠা',
        'ফুল নকশি পিঠা',
        'ঝিনুক নকশি পিঠা',
        'সুস্বাদু নারিকেল পুলি পিঠা',
        'সারা দেশে ফ্রি হোম ডেলিভারি'
      ],
      category: 'pitha'
    }
  ];

  const getProductForCombo = (combo: ComboOffer) => {
    const existingProduct = products.find(p => p.slug === combo.id || p.id === combo.id);
    if (existingProduct) return existingProduct;

    return {
      id: combo.id,
      slug: combo.id,
      nameBangla: combo.titleBangla,
      nameEnglish: combo.titleEnglish,
      category: combo.category,
      categoryBangla: 'ঐতিহ্যবাহী পিঠা ও কম্বো',
      categoryEnglish: 'Traditional Pitha & Combos',
      price: combo.price,
      originalPrice: combo.originalPrice,
      discountPercentage: Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100),
      weight: 'Combo Pack',
      descriptionBangla: combo.subtitle,
      descriptionEnglish: combo.subtitle,
      shortDescription: combo.subtitle,
      ingredients: combo.items,
      features: combo.items,
      stockStatus: 'In Stock' as const,
      stockCount: 25,
      rating: 5.0,
      reviewCount: 78,
      images: [combo.image],
      isFeatured: true,
      origin: 'বাংলাদেশ',
      shelfLife: '৬ মাস',
      storageAdvice: 'শুকনো ও ঠান্ডা স্থানে সংরক্ষণ করুন।'
    };
  };

  const handleComboAddToCart = (e: React.MouseEvent, combo: ComboOffer) => {
    e.stopPropagation();
    const prod = getProductForCombo(combo);
    addToCart(prod, undefined, 1, true);
  };

  const handleComboBuyNow = (e: React.MouseEvent, combo: ComboOffer) => {
    e.stopPropagation();
    const prod = getProductForCombo(combo);
    buyNow(prod, undefined, 1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8" id="combo-offers-section">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3A2A1E] font-serif-bangla tracking-tight">
          কম্বো অফার (Combo Offers)
        </h2>
        <div className="w-16 h-1 bg-[#D85A30] mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comboOffers.map((combo) => (
          <div
            key={combo.id}
            id={`combo-card-${combo.id}`}
            onClick={() => navigateTo('product-detail', { slug: combo.id })}
            className="bg-[#FAF6EE] rounded-3xl border border-[#D85A30]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
          >
            <div>
              {/* Image Banner */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('product-detail', { slug: combo.id });
                }}
                className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FAEEDA] cursor-pointer"
              >
                <img
                  src={combo.image}
                  alt={combo.titleBangla}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {combo.freeDelivery ? (
                  <div className="absolute top-3 left-3 bg-[#1B5E20] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-[#81C784]/60 animate-pulse">
                    <Truck className="w-3.5 h-3.5 text-[#A5D6A7]" />
                    <span>🚚 ফ্রি ডেলিভারি</span>
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 bg-[#D85A30] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    {combo.badge}
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-[#639922] text-white text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>সেভ ৳{combo.savings}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('product-detail', { slug: combo.id });
                      }}
                      className="text-lg sm:text-xl font-bold text-[#3A2A1E] font-serif-bangla group-hover:text-[#D85A30] transition-colors leading-snug cursor-pointer"
                    >
                      {combo.titleBangla}
                    </h3>
                    <p className="text-xs text-[#888780] font-sans font-semibold mt-0.5">
                      {combo.titleEnglish}
                    </p>
                  </div>
                </div>

                {combo.freeDelivery && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] border border-[#81C784]/60 px-2.5 py-1 rounded-lg text-xs font-black font-serif-bangla shadow-xs">
                    <Truck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>সারা দেশে ফ্রি হোম ডেলিভারি</span>
                  </div>
                )}

                {/* Pricing Block */}
                <div className="mt-3 flex items-baseline gap-2 pb-3 border-b border-[#D85A30]/10">
                  <span className="text-2xl font-bold text-[#D85A30]">
                    ৳{combo.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-[#888780] line-through font-normal">
                    ৳{combo.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Included Items List */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-bold text-[#3A2A1E] uppercase tracking-wider">
                    প্যাকেজে যা যা থাকছে:
                  </div>
                  <ul className="space-y-1.5">
                    {combo.items.map((item, index) => {
                      const isFreeDeliveryItem = item.includes('ফ্রি') || item.includes('ডেলিভারি');
                      return (
                        <li key={index} className={`text-xs flex items-center gap-2 ${isFreeDeliveryItem ? 'text-[#1B5E20] font-bold' : 'text-[#3A2A1E]/80'}`}>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isFreeDeliveryItem ? 'bg-[#1B5E20] text-white' : 'bg-[#639922]/15 text-[#639922]'}`}>
                            {isFreeDeliveryItem ? <Truck className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </span>
                          <span className="font-serif-bangla">{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons: Add to Cart & Buy Now */}
            <div className="p-5 pt-0">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={(e) => handleComboAddToCart(e, combo)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#FAEEDA] hover:bg-[#D85A30] text-[#3A2A1E] hover:text-white border border-[#D85A30]/30 font-bold py-2.5 px-2 rounded-xl transition-all shadow-sm active:scale-[0.98] text-xs"
                >
                  <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleComboBuyNow(e, combo)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#D85A30] hover:bg-[#c24e27] text-white font-bold py-2.5 px-2 rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98] text-xs"
                >
                  <Zap className="w-4 h-4 fill-white stroke-none" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
