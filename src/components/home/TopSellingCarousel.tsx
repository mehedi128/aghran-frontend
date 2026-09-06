import React from 'react';
import { ShoppingCart, Flame, ArrowRight, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const TopSellingCarousel: React.FC = () => {
  const { products, addToCart, buyNow, navigateTo } = useStore();

  // Get top selling products (specifically 4 items for the 2x2 grid layout)
  const topSellers: Product[] = products
    .filter(p => p.isTopSeller)
    .slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8" id="top-selling-carousel-section">
      <div className="w-full">
        {/* Centered Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3A2A1E] tracking-tight font-serif-bangla">
            সেরা বিক্রিত পণ্য
          </h2>
          <div className="w-16 h-1 bg-[#D85A30] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {topSellers.map((product) => {
            // Find 1kg variant if available for initial price display
            const variant1kg = product.variants?.find(v => 
              v.name.toLowerCase().includes('1kg') || 
              v.weight.toLowerCase().includes('1kg') ||
              v.name.includes('১ কেজি')
            );
            
            const displayVariant = variant1kg || product.variants?.[0];
            const displayPrice = displayVariant ? displayVariant.price : product.price;
            const displayOriginalPrice = displayVariant?.originalPrice || product.originalPrice;
            const savings = displayOriginalPrice && displayOriginalPrice > displayPrice 
              ? displayOriginalPrice - displayPrice 
              : 0;

            return (
              <div
                key={product.id}
                id={`top-seller-card-${product.id}`}
                onClick={() => navigateTo('product-detail', { slug: product.slug })}
                className="bg-[#FAF6EE] rounded-2xl border border-[#D85A30]/20 shadow-[0_2px_12px_rgba(58,42,30,0.04)] hover:shadow-lg transition-all duration-300 p-5 sm:p-7 relative flex flex-col sm:flex-row items-center sm:items-stretch gap-6 group hover:border-[#D85A30]/40 cursor-pointer"
              >
                {/* Red/Terracotta Pill Badge in Top Right */}
                <div className="absolute top-4 right-4 bg-[#D85A30] text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>Best Selling</span>
                </div>

                {/* Left: Product Image */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('product-detail', { slug: product.slug });
                  }}
                  className="w-44 h-44 sm:w-56 sm:h-56 flex-shrink-0 flex items-center justify-center p-3 rounded-2xl bg-white border border-[#D85A30]/15 cursor-pointer overflow-hidden shadow-sm"
                >
                  <img
                    src={product.images[0]}
                    alt={product.nameEnglish}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right: Product Details & Actions */}
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div className="pt-1 pr-20 sm:pr-24">
                    <h3
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('product-detail', { slug: product.slug });
                      }}
                      className="text-lg sm:text-xl font-bold text-[#3A2A1E] group-hover:text-[#D85A30] transition-colors cursor-pointer leading-snug font-serif-bangla"
                    >
                      {product.nameBangla}
                    </h3>
                    {/* Price Display */}
                    <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
                      <span className="text-xl sm:text-2xl font-bold text-[#D85A30] font-sans">
                        ৳{displayPrice.toLocaleString()}
                      </span>
                      {displayOriginalPrice && displayOriginalPrice > displayPrice && (
                        <span className="text-sm text-[#888780] line-through font-normal">
                          ৳{displayOriginalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-[#8C4A2F] bg-[#FAEEDA] px-2 py-0.5 rounded-md border border-[#D85A30]/20">
                        {displayVariant?.name || '1kg'}
                      </span>
                    </div>

                    {/* Green Savings Badge */}
                    {savings > 0 && (
                      <div className="mt-1.5">
                        <span className="bg-[#639922]/15 text-[#3b5d14] text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center border border-[#639922]/30">
                          Save ৳{savings.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: Add to Cart & Buy Now */}
                  <div className="mt-5 flex items-center gap-2.5 pt-2 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, displayVariant, 1, true);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAEEDA] hover:bg-[#D85A30] text-[#3A2A1E] hover:text-white border border-[#D85A30]/30 font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98]"
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        buyNow(product, displayVariant, 1);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D85A30] hover:bg-[#C14B24] text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow active:scale-[0.98]"
                      title="Buy now directly"
                    >
                      <Zap className="w-4 h-4 fill-white stroke-none" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('collection', { category: 'all' })}
            className="inline-flex items-center gap-2 font-bold text-[#D85A30] hover:text-[#C14B24] text-sm hover:underline"
          >
            <span>Explore All Traditional Products (সবগুলো পণ্য দেখুন)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};


