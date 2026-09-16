import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    deliveryZone,
    setDeliveryZone,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    navigateTo,
    applyCoupon,
    appliedCoupon,
    removeCoupon
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-[#FAEEDA] rounded-full flex items-center justify-center text-[#D85A30]">
          <ShoppingBag className="w-12 h-12 stroke-1" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
          আপনার কার্ট বর্তমানে খালি আছে
        </h2>
        <p className="text-sm text-[#888780] max-w-md mx-auto">
          Your shopping cart is currently empty. Explore our collection of handcrafted Nokshi Pitha, Patishapta, and 100% stone-ground spices.
        </p>
        <button
          onClick={() => navigateTo('collection', { category: 'all' })}
          className="bg-[#D85A30] text-[#FAF6EE] text-sm font-bold px-8 py-3.5 rounded-2xl hover:bg-[#c24e27] transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Continue Shopping (পণ্য দেখুন)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="full-cart-page">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
            Shopping Cart (আপনার শপিং কার্ট)
          </h1>
          <p className="text-xs text-[#888780] mt-0.5">
            Review your selected homemade delicacies before proceeding to checkout.
          </p>
        </div>
        <button
          onClick={() => navigateTo('collection', { category: 'all' })}
          className="text-xs font-bold text-[#D85A30] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#FAF6EE] rounded-3xl border border-[#D85A30]/20 shadow-sm overflow-hidden">
            <div className="p-4 bg-[#FAEEDA] border-b border-[#D85A30]/15 grid grid-cols-12 text-xs font-black uppercase text-[#888780]">
              <div className="col-span-6 sm:col-span-7">Product Details</div>
              <div className="col-span-3 sm:col-span-3 text-center">Quantity</div>
              <div className="col-span-3 sm:col-span-2 text-right">Subtotal</div>
            </div>

            <div className="divide-y divide-[#D85A30]/10 p-4 space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariant?.id || 'base'}`} className="grid grid-cols-12 items-center gap-2 pt-4 first:pt-0">
                  
                  {/* Product Thumbnail & Details */}
                  <div className="col-span-6 sm:col-span-7 flex items-center gap-3">
                    <a
                      href={`?product=${item.product.slug}`}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                          e.preventDefault();
                          navigateTo('product-detail', { slug: item.product.slug });
                        }
                      }}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.nameEnglish}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#D85A30]/20 hover:scale-105 transition-transform"
                      />
                    </a>
                    <div className="min-w-0">
                      <a
                        href={`?product=${item.product.slug}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            navigateTo('product-detail', { slug: item.product.slug });
                          }
                        }}
                        className="block group"
                      >
                        <h4 className="text-xs sm:text-sm font-bold font-serif-bangla text-[#3A2A1E] truncate group-hover:text-[#D85A30] transition-colors">
                          {item.product.nameBangla}
                        </h4>
                        <h5 className="text-[11px] sm:text-xs text-[#888780] truncate">
                          {item.product.nameEnglish}
                        </h5>
                      </a>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-[#D85A30]">
                          ৳{item.unitPrice}
                        </span>
                        {item.selectedVariant && (
                          <span className="text-[10px] bg-[#FAEEDA] text-[#3A2A1E] px-1.5 py-0.5 rounded font-semibold">
                            {item.selectedVariant.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Modifier */}
                  <div className="col-span-3 sm:col-span-3 flex items-center justify-center">
                    <div className="flex items-center border border-[#D85A30]/30 rounded-xl bg-[#FAEEDA]">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs font-bold text-[#3A2A1E] hover:text-[#D85A30]"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 text-xs font-black text-[#3A2A1E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs font-bold text-[#3A2A1E] hover:text-[#D85A30]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-3">
                    <span className="text-sm font-black text-[#D85A30]">
                      ৳{item.unitPrice * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                      className="text-[#888780] hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="p-4 bg-[#FAEEDA]/40 border-t border-[#D85A30]/15 flex items-center justify-between">
              <button
                onClick={clearCart}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Clear Cart (কার্ট খালি করুন)
              </button>
              <span className="text-xs text-[#888780]">
                {cartCount} total items
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#D85A30]/20 p-6 shadow-md space-y-5">
            <h3 className="text-lg font-bold font-serif-bangla text-[#3A2A1E] pb-3 border-b border-[#D85A30]/15">
              Order Summary (হিসাব বিবরণী)
            </h3>

            {/* Delivery Area Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A2A1E] block">
                Select Delivery Zone:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryZone('dhaka')}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all border text-left ${
                    deliveryZone === 'dhaka'
                      ? 'bg-[#D85A30] text-[#FAF6EE] border-[#D85A30] shadow-sm'
                      : 'bg-[#FAEEDA] text-[#3A2A1E] border-[#D85A30]/20 hover:border-[#D85A30]'
                  }`}
                >
                  <div>Inside Dhaka</div>
                  <div className="text-[11px] opacity-80 mt-0.5">৳80</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all border text-left ${
                    deliveryZone === 'outside_dhaka'
                      ? 'bg-[#D85A30] text-[#FAF6EE] border-[#D85A30] shadow-sm'
                      : 'bg-[#FAEEDA] text-[#3A2A1E] border-[#D85A30]/20 hover:border-[#D85A30]'
                  }`}
                >
                  <div>Outside Dhaka</div>
                  <div className="text-[11px] opacity-80 mt-0.5">৳130</div>
                </button>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div>
              <label className="text-xs font-bold text-[#3A2A1E] block mb-1.5">
                Have a Promo Code?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#639922]/10 border border-[#639922]/30 p-2.5 rounded-xl text-xs">
                  <span className="font-bold text-[#639922]">
                    Code: {appliedCoupon.code} applied!
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter AGHRAN10 or FREESHIP"
                    className="flex-1 bg-[#FAEEDA] text-[#3A2A1E] placeholder-[#888780] text-xs px-3 py-2 rounded-xl border border-[#D85A30]/20 focus:outline-none focus:border-[#D85A30]"
                  />
                  <button
                    type="submit"
                    className="bg-[#3A2A1E] text-[#FAF6EE] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#D85A30] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMsg && (
                <p className={`text-[11px] mt-1 ${couponMsg.isError ? 'text-red-500' : 'text-[#639922]'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#3A2A1E] pt-3 border-t border-[#D85A30]/15">
              <div className="flex justify-between">
                <span className="text-[#888780]">Subtotal:</span>
                <span className="font-bold">৳{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#639922] font-semibold">
                  <span>Coupon Discount:</span>
                  <span>-৳{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#888780]">Delivery Charge:</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-[#639922] font-bold">FREE (ফ্রি ডেলিভারি)</span>
                  ) : (
                    `৳${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black pt-3 border-t border-[#D85A30]/20 text-[#3A2A1E]">
                <span>Total Payable:</span>
                <span className="text-xl text-[#D85A30]">৳{cartTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] active:scale-98 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D85A30]/30"
              id="full-cart-proceed-checkout-btn"
            >
              <span>Proceed to Checkout (চেকআউট করুন)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Guarantee note */}
            <div className="flex items-center gap-2 pt-2 text-[11px] text-[#888780] justify-center">
              <ShieldCheck className="w-4 h-4 text-[#639922]" />
              <span>100% Cash On Delivery & Quality Guarantee</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
