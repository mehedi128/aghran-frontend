import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, ArrowLeft, Banknote, Lock 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderCustomerInfo } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    deliveryZone,
    setDeliveryZone,
    placeOrder,
    navigateTo
  } = useStore();

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    streetAddress: '',
    deliveryZone: deliveryZone,
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync delivery zone with parent context
  const handleZoneChange = (zone: 'dhaka' | 'outside_dhaka') => {
    setDeliveryZone(zone);
    setFormData(prev => ({
      ...prev,
      deliveryZone: zone
    }));
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for courier delivery.';
    } else {
      const cleanPhone = formData.phone.replace(/[\s-]/g, '');
      if (!/^(?:\+?880|0)?1[3-9]\d{8}$/.test(cleanPhone)) {
        errs.phone = 'Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678).';
      }
    }

    if (!formData.streetAddress.trim()) {
      errs.streetAddress = 'Please enter detailed street address & house/flat number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        items: cart,
        customer: formData,
        subtotal: cartSubtotal,
        shippingFee: shippingFee,
        discount: discountAmount,
        total: cartTotal
      });
      setIsSubmitting(false);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold font-serif-bangla text-[#3A2A1E]">
          আপনার কার্ট বর্তমানে খালি আছে
        </h2>
        <p className="text-xs text-[#888780]">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('collection', { category: 'all' })}
          className="bg-[#D85A30] text-[#FAF6EE] text-xs font-bold px-6 py-3 rounded-xl"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="checkout-page">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between pb-4 border-b border-[#D85A30]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
            Checkout (অর্ডার কনফার্মেশন)
          </h1>
          <p className="text-xs text-[#888780] mt-0.5">
            Fill in your delivery address to receive pure homemade products at your doorstep.
          </p>
        </div>
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs font-bold text-[#D85A30] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </button>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Customer & Delivery Address Card */}
          <div className="bg-[#FAF6EE] rounded-3xl border border-[#D85A30]/20 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#D85A30]/15">
              <div className="w-7 h-7 rounded-full bg-[#D85A30] text-[#FAF6EE] flex items-center justify-center text-xs font-black">
                1
              </div>
              <h2 className="text-base sm:text-lg font-bold font-serif-bangla text-[#3A2A1E]">
                Delivery Address & Contact (ডেলিভারি ঠিকানা)
              </h2>
            </div>

            {/* Delivery Zone Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#3A2A1E]">
                Select Delivery Zone:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleZoneChange('dhaka')}
                  className={`p-3.5 rounded-2xl text-xs font-bold transition-all border text-left flex items-start gap-2.5 ${
                    formData.deliveryZone === 'dhaka'
                      ? 'bg-[#D85A30] text-[#FAF6EE] border-[#D85A30] shadow-md'
                      : 'bg-[#FAEEDA] text-[#3A2A1E] border-[#D85A30]/20 hover:border-[#D85A30]'
                  }`}
                >
                  <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div>Inside Dhaka Metro</div>
                    <div className="text-[11px] opacity-85 font-normal">৳70</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleZoneChange('outside_dhaka')}
                  className={`p-3.5 rounded-2xl text-xs font-bold transition-all border text-left flex items-start gap-2.5 ${
                    formData.deliveryZone === 'outside_dhaka'
                      ? 'bg-[#D85A30] text-[#FAF6EE] border-[#D85A30] shadow-md'
                      : 'bg-[#FAEEDA] text-[#3A2A1E] border-[#D85A30]/20 hover:border-[#D85A30]'
                  }`}
                >
                  <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div>Outside Dhaka (All BD)</div>
                    <div className="text-[11px] opacity-85 font-normal">৳130</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#3A2A1E] block">
                Your Full Name (আপনার নাম) *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Farhana Ahmed / মো: রহিমুল ইসলাম"
                className={`w-full bg-[#FAEEDA] text-[#3A2A1E] placeholder-[#888780] text-xs sm:text-sm px-4 py-3 rounded-xl border ${
                  errors.fullName ? 'border-red-500' : 'border-[#D85A30]/20'
                } focus:outline-none focus:border-[#D85A30]`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#3A2A1E] block">
                Mobile Number (মোবাইল নম্বর) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#888780]">
                  +880
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="017XXXXXXXX"
                  className={`w-full bg-[#FAEEDA] text-[#3A2A1E] placeholder-[#888780] text-xs sm:text-sm pl-14 pr-4 py-3 rounded-xl border ${
                    errors.phone ? 'border-red-500' : 'border-[#D85A30]/20'
                  } focus:outline-none focus:border-[#D85A30]`}
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Detailed Street Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#3A2A1E] block">
                Full Street Address & Landmark (বাড়ি, রোড, ব্লক ও বিস্তারিত ঠিকানা) *
              </label>
              <textarea
                rows={3}
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                placeholder="e.g. House 42, Road 7/A, Block C, Near Central Mosque, Dhanmondi, Dhaka"
                className={`w-full bg-[#FAEEDA] text-[#3A2A1E] placeholder-[#888780] text-xs sm:text-sm p-4 rounded-xl border ${
                  errors.streetAddress ? 'border-red-500' : 'border-[#D85A30]/20'
                } focus:outline-none focus:border-[#D85A30]`}
              />
              {errors.streetAddress && (
                <p className="text-[11px] text-red-500">{errors.streetAddress}</p>
              )}
            </div>

          </div>

          {/* 2. Payment Method Card */}
          <div className="bg-[#FAF6EE] rounded-3xl border border-[#D85A30]/20 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="space-y-3">
              {/* Only Cash On Delivery (COD) */}
              <div className="p-4 rounded-2xl border-2 border-[#639922] bg-[#FAEEDA] flex items-start gap-3.5 shadow-sm">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={true}
                  readOnly
                  className="accent-[#639922] mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#3A2A1E]">
                    <Banknote className="w-4 h-4 text-[#639922]" />
                    <span>Cash on Delivery (ক্যাশ অন ডেলিভারি)</span>
                    <span className="bg-[#639922] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      ১০০% নিরাপদ
                    </span>
                  </div>
                  <p className="text-xs text-[#888780] mt-1 leading-relaxed">
                    ডেলিভারি রাইডারের কাছ থেকে পণ্য বুঝে পেয়ে দেখে মূল্য পরিশোধ করুন। অগ্রিম কোনো পেমেন্ট লাগবে না।
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#639922] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Pay only upon receiving & verifying your fresh order</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#D85A30]/25 p-6 shadow-md space-y-5 sticky top-28">
            <h3 className="text-lg font-bold font-serif-bangla text-[#3A2A1E] pb-3 border-b border-[#D85A30]/15 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-[#D85A30] font-sans font-black">({cartCount} items)</span>
            </h3>

            {/* Compact item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#D85A30]/10">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariant?.id || 'base'}`} className="flex items-center gap-3 pt-2 first:pt-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.nameEnglish}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-[#D85A30]/15 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold font-serif-bangla text-[#3A2A1E] truncate">
                      {item.product.nameBangla}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-[#888780] mt-0.5">
                      <span>Qty: {item.quantity} {item.selectedVariant ? `(${item.selectedVariant.name})` : ''}</span>
                      <span className="font-bold text-[#D85A30]">৳{item.unitPrice * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#3A2A1E] pt-3 border-t border-[#D85A30]/15">
              <div className="flex justify-between">
                <span className="text-[#888780]">Subtotal:</span>
                <span className="font-bold">৳{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#639922] font-bold">
                  <span>Coupon Discount:</span>
                  <span>-৳{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#888780]">
                  Delivery Charge ({formData.deliveryZone === 'dhaka' ? 'Dhaka Metro' : 'Outside Dhaka'}):
                </span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-[#639922] font-bold">FREE</span>
                  ) : (
                    `৳${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black pt-3 border-t border-[#D85A30]/20 text-[#3A2A1E]">
                <span>Total Amount:</span>
                <span className="text-xl text-[#D85A30]">৳{cartTotal}</span>
              </div>
            </div>

            {/* Submit / Confirm Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] active:scale-98 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#D85A30]/30"
              id="confirm-order-submit-btn"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing Order...' : 'Confirm Order (অর্ডার নিশ্চিত করুন)'}</span>
            </button>

            {/* Trust highlights */}
            <div className="space-y-2 pt-3 border-t border-[#D85A30]/15 text-[11px] text-[#888780]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#639922]" />
                <span>100% Homemade and Adulteration-Free Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D85A30]" />
                <span>Fast & Safe Doorstep Delivery Across Bangladesh</span>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};
