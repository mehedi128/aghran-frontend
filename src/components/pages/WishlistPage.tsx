import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, navigateTo } = useStore();

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-[#FAEEDA] rounded-full flex items-center justify-center text-[#D85A30]">
          <Heart className="w-10 h-10 stroke-1" />
        </div>
        <h2 className="text-2xl font-bold font-serif-bangla text-[#3A2A1E]">
          আপনার পছন্দের তালিকা খালি
        </h2>
        <p className="text-xs sm:text-sm text-[#888780] max-w-sm mx-auto">
          You haven't saved any products to your wishlist yet. Explore our handcrafted pithas and pure spices and save your favorites!
        </p>
        <button
          onClick={() => navigateTo('collection', { category: 'all' })}
          className="bg-[#D85A30] text-[#FAF6EE] text-xs sm:text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#c24e27] transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Explore Delicacies</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8" id="wishlist-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D85A30]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
            My Wishlist (পছন্দের তালিকা)
          </h1>
          <p className="text-xs text-[#888780] mt-0.5">
            You have {favoriteProducts.length} items saved in your personal wishlist.
          </p>
        </div>

        <button
          onClick={() => navigateTo('collection', { category: 'all' })}
          className="text-xs font-bold text-[#D85A30] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
