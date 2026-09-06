import React from 'react';
import { ShoppingBag, Heart, Eye, Zap, Truck } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    navigateTo
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === 'Stock Out';

  // Find 1kg variant if available for initial price display
  const variant1kgIndex = product.variants?.findIndex(v => 
    v.name.toLowerCase().includes('1kg') || 
    v.weight.toLowerCase().includes('1kg') ||
    v.name.includes('১ কেজি')
  );
  const defaultVariant = (variant1kgIndex !== undefined && variant1kgIndex >= 0 && product.variants)
    ? product.variants[variant1kgIndex]
    : product.variants?.[0];

  const displayPrice = defaultVariant ? defaultVariant.price : product.price;
  const displayOriginalPrice = defaultVariant?.originalPrice || product.originalPrice;
  const displayWeight = defaultVariant ? defaultVariant.name : product.weight;

  return (
    <div
      className="bg-[#FAF6EE] rounded-2xl border border-[#D85A30]/15 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D85A30]/40 transition-all duration-300 flex flex-col group relative cursor-pointer"
      id={`product-card-${product.id}`}
      onClick={() => navigateTo('product-detail', { slug: product.slug })}
    >
      {/* Image Container */}
      <div
        className="relative w-full aspect-square bg-[#FAEEDA] overflow-hidden cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          navigateTo('product-detail', { slug: product.slug });
        }}
      >
        <img
          src={product.images[0]}
          alt={product.nameEnglish}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercentage && (
            <span className="bg-[#D85A30] text-[#FAF6EE] text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
              -{product.discountPercentage}% OFF
            </span>
          )}
          {product.freeDelivery ? (
            <span className="bg-[#1B5E20] text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 border border-[#81C784]/60 animate-pulse">
              <Truck className="w-3 h-3 text-[#A5D6A7]" />
              <span>ফ্রি ডেলিভারি</span>
            </span>
          ) : product.badge ? (
            <span className="bg-[#FAC775] text-[#3A2A1E] text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Action icons (Wishlist & Quick View) on hover */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
              isFavorited
                ? 'bg-[#D85A30] text-[#FAF6EE]'
                : 'bg-[#FAF6EE]/80 text-[#3A2A1E] hover:bg-[#FAF6EE] hover:text-[#D85A30]'
            }`}
            title="Save to Wishlist"
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-[#FAF6EE]/80 text-[#3A2A1E] hover:bg-[#FAF6EE] hover:text-[#D85A30] flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Status Pill */}
        <div className="absolute bottom-2 left-2 z-10">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md flex items-center gap-1 ${
              isOutOfStock
                ? 'bg-red-500/90 text-[#FAF6EE]'
                : product.stockStatus === 'Low Stock'
                ? 'bg-amber-500/90 text-[#FAF6EE]'
                : 'bg-[#639922]/90 text-[#FAF6EE]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            {product.stockStatus}
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Product Name */}
          <h3
            onClick={() => navigateTo('product-detail', { slug: product.slug })}
            className="font-serif-bangla font-bold text-lg text-[#3A2A1E] leading-snug group-hover:text-[#D85A30] transition-colors cursor-pointer line-clamp-2"
          >
            {product.nameBangla}
          </h3>
        </div>

        {/* Pricing & Buttons */}
        <div className="mt-3 pt-2">
          <div className="flex items-baseline gap-2 mb-3 flex-wrap">
            <span className="text-lg font-black text-[#D85A30]">
              ৳{displayPrice.toLocaleString()}
            </span>
            {displayOriginalPrice && displayOriginalPrice > displayPrice && (
              <span className="text-xs text-[#888780] line-through font-medium">
                ৳{displayOriginalPrice.toLocaleString()}
              </span>
            )}
            {defaultVariant && (
              <span className="text-[10px] font-bold text-[#8C4A2F] bg-[#FAEEDA] px-2 py-0.5 rounded border border-[#D85A30]/20">
                {defaultVariant.name}
              </span>
            )}
          </div>

          {/* Dual Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, defaultVariant, 1, true);
              }}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                isOutOfStock
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FAEEDA] text-[#D85A30] hover:bg-[#D85A30] hover:text-[#FAF6EE] active:scale-95 border border-[#D85A30]/20'
              }`}
              id={`add-to-cart-btn-${product.id}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                buyNow(product, defaultVariant, 1);
              }}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm ${
                isOutOfStock
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] active:scale-95'
              }`}
              id={`buy-now-btn-${product.id}`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
