import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    freeShippingRemaining,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    navigateTo,
    applyCoupon,
    appliedCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 1500;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div
      className="fixed inset-0 z-50 bg-[#3A2A1E]/60 backdrop-blur-sm flex justify-end animate-in fade-in"
      id="cart-drawer-overlay"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="bg-[#FAF6EE] w-full max-w-md h-full flex flex-col shadow-2xl border-l-2 border-[#D85A30]/30 animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
        id="cart-drawer-panel"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D85A30]/15 flex items-center justify-between bg-[#FAEEDA]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D85A30]" />
            <h3 className="text-base font-bold text-[#3A2A1E]">
              Your Shopping Cart ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#FAF6EE] text-[#888780] hover:text-[#3A2A1E] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress tracker */}
        <div className="bg-[#FAEEDA]/50 px-5 py-3 border-b border-[#D85A30]/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            {freeShippingRemaining > 0 ? (
              <span className="text-[#3A2A1E]">
                Add <strong className="text-[#D85A30]">৳{freeShippingRemaining}</strong> more for <strong className="text-[#639922]">FREE Dhaka Delivery</strong>!
              </span>
            ) : (
              <span className="font-bold text-[#639922] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Congratulations! You got FREE Delivery in Dhaka!
              </span>
            )}
            <span className="text-[11px] font-extrabold text-[#D85A30]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#FAF6EE] rounded-full overflow-hidden border border-[#D85A30]/20">
            <div
              className="h-full bg-gradient-to-r from-[#FAC775] via-[#D85A30] to-[#639922] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#D85A30]/10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FAEEDA] flex items-center justify-center text-[#D85A30]">
                <ShoppingBag className="w-10 h-10 stroke-1" />
              </div>
              <div>
                <h4 className="text-base font-bold font-serif-bangla text-[#3A2A1E]">
                  আপনার ঝুড়ি খালি
                </h4>
                <p className="text-xs text-[#888780] mt-1 max-w-xs">
                  Your cart is empty. Add freshly made Nokshi Pitha or pure stone-ground spices to taste the essence of Aghran!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('collection', { category: 'all' });
                }}
                className="bg-[#D85A30] text-[#FAF6EE] text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#c24e27] transition-all shadow-md"
              >
                Start Shopping (কেনাকাটা করুন)
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const handleItemClick = (e: React.MouseEvent) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  setIsCartOpen(false);
                  navigateTo('product-detail', { slug: item.product.slug });
                }
              };

              return (
                <div key={`${item.product.id}-${item.selectedVariant?.id || 'base'}`} className={`flex items-start gap-3.5 ${index > 0 ? 'pt-4' : ''}`}>
                  <a
                    href={`?product=${item.product.slug}`}
                    onClick={handleItemClick}
                    className="block flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.nameEnglish}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-[#D85A30]/20 hover:scale-105 transition-transform"
                    />
                  </a>

                  <div className="flex-1 min-w-0">
                    <a
                      href={`?product=${item.product.slug}`}
                      onClick={handleItemClick}
                      className="block group"
                    >
                      <h4 className="text-xs font-bold text-[#3A2A1E] font-serif-bangla truncate group-hover:text-[#D85A30] transition-colors">
                        {item.product.nameBangla}
                      </h4>
                      <h5 className="text-[11px] text-[#888780] truncate">
                        {item.product.nameEnglish}
                      </h5>
                    </a>
                    {item.selectedVariant && (
                      <span className="text-[10px] bg-[#FAEEDA] text-[#D85A30] font-semibold px-1.5 py-0.2 rounded inline-block mt-0.5">
                        {item.selectedVariant.name}
                      </span>
                    )}

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity modifier */}
                    <div className="flex items-center border border-[#D85A30]/30 rounded-lg bg-[#FAF6EE]">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#3A2A1E] hover:text-[#D85A30]"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-black text-[#3A2A1E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#3A2A1E] hover:text-[#D85A30]"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs font-black text-[#D85A30]">
                        ৳{item.unitPrice * item.quantity}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                      className="text-[#888780] hover:text-red-500 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#D85A30]/15 bg-[#FAEEDA]/70 space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1 text-xs text-[#3A2A1E]">
              <div className="flex justify-between">
                <span className="text-[#888780]">Subtotal:</span>
                <span className="font-bold">৳{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#639922] font-semibold">
                  <span>Discount:</span>
                  <span>-৳{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#888780]">Shipping:</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-[#639922] font-bold">FREE</span>
                  ) : (
                    `৳${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black pt-2 border-t border-[#D85A30]/15 text-[#3A2A1E]">
                <span>Grand Total:</span>
                <span className="text-base text-[#D85A30]">৳{cartTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full py-3.5 bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] active:scale-98 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D85A30]/30"
                id="cart-drawer-checkout-btn"
              >
                <span>Proceed to Checkout (অর্ডার করুন)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('cart');
                }}
                className="w-full py-2 text-center text-xs font-bold text-[#888780] hover:text-[#3A2A1E] transition-colors"
              >
                View Full Cart Page →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
