import React, { useState } from 'react';
import { X, Star, ShoppingBag, Zap, Heart, ShieldCheck, Truck, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    navigateTo
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Set default variant to 1kg on product change
  React.useEffect(() => {
    if (quickViewProduct?.variants) {
      const idx = quickViewProduct.variants.findIndex(v =>
        v.name.toLowerCase().includes('1kg') ||
        v.weight.toLowerCase().includes('1kg') ||
        v.name.includes('১ কেজি')
      );
      if (idx !== -1) {
        setSelectedVariantIndex(idx);
      } else {
        setSelectedVariantIndex(0);
      }
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const variants = product.variants || [];
  const selectedVariant = variants.length > 0 ? variants[selectedVariantIndex] : undefined;
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
    setSelectedVariantIndex(0);
    setSelectedImageIndex(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#3A2A1E]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
      id="quick-view-modal"
      onClick={handleClose}
    >
      <div
        className="bg-[#FAF6EE] rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border-2 border-[#D85A30]/30 relative overflow-hidden animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAEEDA] text-[#3A2A1E] hover:bg-[#D85A30] hover:text-[#FAF6EE] transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left: Image Gallery */}
          <div className="space-y-3">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#FAEEDA] border border-[#D85A30]/20 relative shadow-inner">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.nameEnglish}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.discountPercentage && (
                <span className="absolute top-3 left-3 bg-[#D85A30] text-[#FAF6EE] text-xs font-black uppercase px-2.5 py-1 rounded-md shadow-md">
                  -{product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === selectedImageIndex ? 'border-[#D85A30] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="space-y-4">
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#639922] bg-[#639922]/10 px-2.5 py-0.5 rounded-full">
                {product.categoryEnglish} ( {product.categoryBangla} )
              </span>

              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-[#3A2A1E]">{product.rating}</span>
                <span className="text-[#888780]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-bangla text-[#3A2A1E] leading-tight">
                {product.nameBangla}
              </h2>
              <h3 className="text-sm font-semibold text-[#888780] mt-0.5">
                {product.nameEnglish}
              </h3>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 p-3 bg-[#FAEEDA] rounded-2xl">
              <span className="text-2xl font-black text-[#D85A30]">
                ৳{currentPrice}
              </span>
              {currentOriginalPrice && (
                <span className="text-sm text-[#888780] line-through font-medium">
                  ৳{currentOriginalPrice}
                </span>
              )}
              <span className="ml-auto text-xs font-bold text-[#639922] bg-[#FAF6EE] px-2 py-0.5 rounded-md">
                {product.stockStatus}
              </span>
            </div>

            {/* Variants Selector */}
            {variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A2A1E] block">
                  Select Pack Size / Weight:
                </label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, index) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        index === selectedVariantIndex
                          ? 'bg-[#D85A30] text-[#FAF6EE] border-[#D85A30] shadow-sm'
                          : 'bg-[#FAF6EE] text-[#3A2A1E] border-[#D85A30]/20 hover:border-[#D85A30]'
                      }`}
                    >
                      {v.name} (৳{v.price})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Short Description */}
            <p className="text-xs text-[#888780] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quantity & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D85A30]/30 rounded-xl bg-[#FAEEDA]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-[#3A2A1E] hover:text-[#D85A30]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-black text-[#3A2A1E]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-[#3A2A1E] hover:text-[#D85A30]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isFavorited
                      ? 'bg-[#D85A30] text-[#FAF6EE] border-[#D85A30]'
                      : 'bg-[#FAF6EE] text-[#3A2A1E] border-[#D85A30]/20 hover:border-[#D85A30]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    addToCart(product, selectedVariant, quantity, true);
                    handleClose();
                  }}
                  className="w-full py-3 bg-[#FAEEDA] text-[#D85A30] hover:bg-[#D85A30] hover:text-[#FAF6EE] border border-[#D85A30]/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    buyNow(product, selectedVariant, quantity);
                  }}
                  className="w-full py-3 bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* View Full Product Link */}
            <div className="pt-2 text-center border-t border-[#D85A30]/10">
              <a
                href={`?product=${product.slug}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    handleClose();
                    navigateTo('product-detail', { slug: product.slug });
                  }
                }}
                className="inline-block text-xs font-bold text-[#D85A30] hover:underline"
              >
                View Full Product Details & Ingredients →
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
