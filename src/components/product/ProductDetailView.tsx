import React, { useState } from 'react';
import { 
  Star, ShoppingBag, Zap, Heart, ShieldCheck, Truck, 
  RotateCcw, Sparkles, Check, MapPin, Clock, Info, ArrowLeft,
  ChevronRight, MessageCircle, Phone, Plus, Minus, Share2, Link2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { trackViewContent } from '../../services/facebookTrackingService';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductSlug,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    showToast
  } = useStore();
  const product = products.find(p => p.slug === selectedProductSlug || p.id === selectedProductSlug) || products[0];
  const [isCopied, setIsCopied] = useState(false);

  const handleShareOrCopy = async () => {
    const productUrl = `${window.location.origin}${window.location.pathname}?product=${product.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.nameBangla} | Aghran`,
          text: product.shortDescription,
          url: productUrl
        });
        return;
      } catch {
        // Fallback to copy if user cancelled share or share failed
      }
    }
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(productUrl).then(() => {
        setIsCopied(true);
        showToast('লিংক কপি হয়েছে!', 'প্রডাক্ট লিংক ক্লিপবোর্ডে কপি করা হয়েছে।');
        setTimeout(() => setIsCopied(false), 2500);
      });
    }
  };

  // Helper to find default variant index (prefer 1kg if available)
  const getDefaultVariantIndex = (p: typeof products[0] | undefined) => {
    if (!p?.variants || p.variants.length === 0) return 0;
    const idx = p.variants.findIndex(v =>
      v.name.toLowerCase().replace(/\s+/g, '').includes('1kg') ||
      v.weight?.toLowerCase().replace(/\s+/g, '').includes('1kg') ||
      v.name.includes('১ কেজি') ||
      v.weight?.includes('১ কেজি') ||
      v.name.toLowerCase().includes('1 kg') ||
      v.weight?.toLowerCase().includes('1 kg')
    );
    return idx !== -1 ? idx : 0;
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(() => getDefaultVariantIndex(product));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'usage' | 'reviews'>('description');

  // Update default variant selection and track ViewContent when product changes
  React.useEffect(() => {
    setSelectedVariantIndex(getDefaultVariantIndex(product));
    setSelectedImageIndex(0);
    setQuantity(1);
    if (product) {
      trackViewContent(product);
    }
  }, [product?.id]);

  const isFavorited = isInWishlist(product.id);
  const variants = product.variants || [];
  const selectedVariant = variants.length > 0 ? variants[selectedVariantIndex] : undefined;
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const isOutOfStock = product.stockStatus === 'Stock Out';

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-12" id="product-detail-page">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#888780] font-medium flex-wrap">
        <button onClick={() => navigateTo('home')} className="hover:text-[#D85A30] transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => navigateTo('collection', { category: product.category })}
          className="hover:text-[#D85A30] transition-colors"
        >
          {product.categoryEnglish} ({product.categoryBangla})
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#3A2A1E] font-bold truncate">
          {product.nameEnglish}
        </span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Photo Box */}
          <div className="w-full aspect-square rounded-3xl overflow-hidden bg-[#FAEEDA] border-2 border-[#D85A30]/20 relative shadow-md">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.nameEnglish}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-[#D85A30] text-[#FAF6EE] text-xs font-black uppercase px-3 py-1.5 rounded-xl shadow-md">
                -{product.discountPercentage}% OFF
              </span>
            )}
            {product.badge && (
              <span className="absolute top-4 right-4 bg-[#FAC775] text-[#3A2A1E] text-xs font-black uppercase px-3 py-1.5 rounded-xl shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    idx === selectedImageIndex
                      ? 'border-[#D85A30] scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Titles */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-bangla text-[#3A2A1E] leading-tight">
              {product.nameBangla}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="p-4 sm:p-5 bg-[#FAEEDA] rounded-2xl border-2 border-[#D85A30]/30 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#D85A30]">
                ৳{currentPrice}
              </span>
              {currentOriginalPrice && (
                <span className="text-lg text-[#888780] line-through font-semibold">
                  ৳{currentOriginalPrice}
                </span>
              )}
            </div>
            {product.freeDelivery && (
              <span className="bg-[#1B5E20] text-white text-xs sm:text-sm font-black px-4 py-2 rounded-full flex items-center gap-2 shadow-md border border-[#4CAF50]/50 animate-pulse">
                <Truck className="w-4 h-4 text-[#81C784]" />
                <span>🚚 ফ্রি ডেলিভারি অফার</span>
              </span>
            )}
          </div>

          {/* Large Prominent Free Delivery Banner */}
          {product.freeDelivery && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#E8F5E9] via-[#C8E6C9] to-[#E8F5E9] border-2 border-[#4CAF50] text-[#1B5E20] shadow-md flex items-start sm:items-center gap-3.5 sm:gap-4 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Truck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#1B5E20] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    ধামাকা অফার
                  </span>
                  <h4 className="text-base sm:text-lg font-black font-serif-bangla text-[#1B5E20]">
                    সম্পূর্ণ ফ্রি হোম ডেলিভারি!
                  </h4>
                </div>
                <p className="text-xs sm:text-sm font-semibold font-serif-bangla text-[#2E7D32] mt-1 leading-snug">
                  এই স্পেশাল উৎসব কম্বো প্যাকটি অর্ডার করলে সমগ্র বাংলাদেশে ডেলিভারি সম্পূর্ণ ফ্রি পাবেন। কোনো হিডেন চার্জ নেই!
                </p>
              </div>
            </div>
          )}

          {/* Variants Selector */}
          {variants.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#3A2A1E] block">
                কতটুকু নিবেন তা সিলেক্ট করুন
              </label>
              <div className="flex flex-wrap gap-2.5">
                {variants.map((v, index) => {
                  const isSelected = index === selectedVariantIndex;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#D85A30] text-[#FAF6EE] border-[#D85A30] shadow-md scale-[1.02]'
                          : 'bg-[#FAF6EE] text-[#3A2A1E] border-[#D85A30]/25 hover:border-[#D85A30]'
                      }`}
                    >
                      <span>{v.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and Actions (Matching Reference Image) */}
          <div className="space-y-4 pt-2">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-sm md:text-base font-medium text-[#3A2A1E]">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm md:text-base font-bold text-[#3A2A1E]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4 Action Buttons Grid */}
            <div className="space-y-2.5">
              {/* Row 1: ADD TO CART & BUY NOW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => addToCart(product, selectedVariant, quantity, true)}
                  disabled={isOutOfStock}
                  className="w-full py-3.5 px-4 bg-[#F27A1A] hover:bg-[#e06d12] text-white font-bold text-sm tracking-wide rounded-md transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] uppercase"
                  id="pdp-add-to-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  type="button"
                  onClick={() => buyNow(product, selectedVariant, quantity)}
                  disabled={isOutOfStock}
                  className="w-full py-3.5 px-4 bg-[#072421] hover:bg-[#0c3834] text-white font-bold text-sm tracking-wide rounded-md transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] uppercase"
                  id="pdp-buy-now-btn"
                >
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* Row 2: Order On WhatsApp & Call For Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={`https://wa.me/8801752421224?text=${encodeURIComponent(
                    `Hello Aghran, I would like to order:\nProduct: ${product.nameBangla} (${product.nameEnglish})\nVariant: ${selectedVariant?.name || 'Default'}\nQuantity: ${quantity}\nTotal Price: ৳${currentPrice * quantity}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#20A859] hover:bg-[#1b934e] text-white font-bold text-sm tracking-wide rounded-md transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
                  id="pdp-whatsapp-order-btn"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Order On WhatsApp</span>
                </a>

                <a
                  href={`https://m.me/aghranbd?text=${encodeURIComponent(
                    `Hello Aghran, I would like to order:\nProduct: ${product.nameBangla} (${product.nameEnglish})\nVariant: ${selectedVariant?.name || 'Default'}\nQuantity: ${quantity}\nTotal Price: ৳${currentPrice * quantity}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#0084FF] hover:bg-[#0073e6] text-white font-bold text-sm tracking-wide rounded-md transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
                  id="pdp-call-order-btn"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Order In Messenger</span>
                </a>
              </div>

              {/* Share / Copy Product Link Button */}
              <button
                type="button"
                onClick={handleShareOrCopy}
                className="w-full py-2.5 px-4 bg-[#FAF6EE] hover:bg-[#FAEEDA] text-[#3A2A1E] border border-[#D85A30]/30 hover:border-[#D85A30] font-semibold text-xs tracking-wide rounded-md transition-all flex items-center justify-center gap-2 shadow-xs"
                id="pdp-share-link-btn"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">লিংক কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#D85A30]" />
                    <span>প্রডাক্টের সরাসরি লিংক কপি / শেয়ার করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Tabbed Info Section (Description, Ingredients, Usage, Reviews) */}
      <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#D85A30]/15 p-6 sm:p-8 shadow-sm">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-[#D85A30]/15 pb-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'description'
                ? 'bg-[#D85A30] text-[#FAF6EE]'
                : 'text-[#888780] hover:text-[#3A2A1E] hover:bg-[#FAEEDA]'
            }`}
          >
            Product Story & Description (বিবরণ)
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-[#D85A30] text-[#FAF6EE]'
                : 'text-[#888780] hover:text-[#3A2A1E] hover:bg-[#FAEEDA]'
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-6">
          {activeTab === 'description' && (
            <div className="space-y-6 text-xs sm:text-sm text-[#3A2A1E] leading-relaxed">
              {/* Bangla Description Body */}
              <div className="font-serif-bangla text-sm sm:text-base md:text-lg leading-relaxed text-[#3A2A1E] space-y-4 whitespace-pre-line bg-white/60 p-5 rounded-2xl border border-[#D85A30]/10">
                {product.descriptionBangla}
              </div>

              {/* Main Ingredients Section */}
              <div className="p-5 rounded-2xl bg-[#FAEEDA]/70 border border-[#D85A30]/20 space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-[#D85A30] font-serif-bangla flex items-center gap-2">
                  <span>আমাদের পিঠা তৈরীর মেইন ইনগ্রেডিয়েন্টস ঃ</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {product.ingredients.map((ing, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 bg-white/80 p-2.5 rounded-xl border border-[#D85A30]/15 font-serif-bangla text-xs sm:text-sm font-semibold text-[#3A2A1E]"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#D85A30] flex-shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust & Quality Guarantee Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#D85A30]/10 via-[#FAF6EE] to-[#D85A30]/10 border-2 border-[#D85A30]/30 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D85A30] text-white flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
                  ★
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-[#D85A30] text-xs sm:text-sm font-serif-bangla">
                    অঘ্রাণ এর নিশ্চয়তা:
                  </h5>
                  <p className="font-serif-bangla text-xs sm:text-sm text-[#3A2A1E] leading-relaxed">
                    এদিক ওদিক না তাকিয়ে, কম টাকায় নিম্ন মানের প্রোডাক্ট না কিনে আমাদের শপ থেকে ভালো জিনিসটা কিনে খেয়ে দেখুন। আশা করি পিঠা শেষ হওয়ার আগেই আবার অর্ডার দিবেন!
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-black uppercase text-[#D85A30] tracking-wider mb-3">
                  Key Quality Highlights (বিশেষ বৈশিষ্ট্য):
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#3A2A1E]">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-[#D85A30]/10">
                      <Check className="w-4 h-4 text-[#639922] flex-shrink-0" />
                      <span className="font-serif-bangla text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase text-[#D85A30] tracking-wider">
                Pure Natural Ingredients List (১০০% প্রাকৃতিক উপাদান)
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-[#FAEEDA] text-[#3A2A1E] border border-[#D85A30]/20 px-3.5 py-1.5 rounded-xl text-xs font-semibold"
                  >
                    🌿 {ing}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#888780] mt-2">
                Contains zero chemical bleaches, zero lead chromate, zero artificial synthetic fragrances, and zero chemical preservatives.
              </p>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#3A2A1E]">
              <div className="p-4 bg-[#FAEEDA] rounded-2xl space-y-2">
                <h4 className="font-bold text-[#D85A30]">Storage Advice:</h4>
                <p className="text-[#888780]">{product.storageAdvice}</p>
              </div>
              <div className="p-4 bg-[#639922]/10 rounded-2xl space-y-2">
                <h4 className="font-bold text-[#639922]">Aghran Freshness Recommendation:</h4>
                <p className="text-[#3A2A1E]">
                  For Pithas, warm gently on a pan or microwave for 20 seconds to revive maximum aroma. For spices, always use a clean dry spoon to maintain shelf freshness.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-4 bg-[#FAEEDA] rounded-2xl">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#D85A30]">{product.rating}</div>
                  <div className="flex items-center text-amber-500 justify-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="text-[11px] text-[#888780]">Based on {product.reviewCount} reviews</div>
                </div>
                <div className="text-xs text-[#3A2A1E] border-l border-[#D85A30]/20 pl-6 space-y-1">
                  <div>100% of customers recommend this product for authentic homemade flavor.</div>
                  <div className="text-[#639922] font-semibold">✓ Verified purchases across Bangladesh</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#D85A30]/20">
            <h3 className="text-xl sm:text-2xl font-bold font-serif-bangla text-[#3A2A1E]">
              You May Also Like (সম্পর্কিত পণ্য)
            </h3>
            <button
              onClick={() => navigateTo('collection', { category: product.category })}
              className="text-xs font-bold text-[#D85A30] hover:underline"
            >
              View Category →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
