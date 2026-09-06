import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OrderSuccessView: React.FC = () => {
  const { activeOrder, navigateTo } = useStore();

  if (!activeOrder) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#3A2A1E]">কোনো সক্রিয় অর্ডার পাওয়া যায়নি</h2>
        <button
          onClick={() => navigateTo('home')}
          className="bg-[#D85A30] text-[#FAF6EE] text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#c24e27] transition-all"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  const order = activeOrder;

  return (
    <div className="max-w-xl mx-auto px-4 py-12" id="order-success-view">
      <div className="bg-[#FAF6EE] rounded-3xl border border-[#D85A30]/20 p-6 sm:p-8 shadow-sm text-center space-y-6">
        
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#639922]/15 text-[#639922] flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        {/* Success Message */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
            ধন্যবাদ! আপনার অর্ডার কনফার্ম হয়েছে
          </h1>
          <p className="text-xs sm:text-sm text-[#888780]">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি ডেলিভারির জন্য আপনার সাথে যোগাযোগ করবেন।
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#FAEEDA]/60 rounded-2xl p-5 text-left text-xs space-y-3.5 border border-[#D85A30]/10">
          <div className="flex justify-between items-center pb-2.5 border-b border-[#D85A30]/15">
            <span className="text-[#888780]">অর্ডার নম্বর:</span>
            <span className="font-bold text-sm text-[#D85A30] font-mono">#{order.orderNumber}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-[#888780]">কাস্টমারের নাম:</span>
            <span className="font-semibold text-[#3A2A1E] text-right">
              {order.customer.fullName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#888780]">মোবাইল নম্বর:</span>
            <span className="font-semibold text-[#3A2A1E] text-right">
              {order.customer.phone}
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-[#888780]">ডেলিভারি ঠিকানা:</span>
            <span className="font-medium text-[#3A2A1E] text-right max-w-[65%] leading-relaxed">
              {order.customer.streetAddress}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#888780]">পেমেন্ট মেথড:</span>
            <span className="font-semibold text-[#639922]">ক্যাশ অন ডেলিভারি (COD)</span>
          </div>

          {/* Ordered Items Summary */}
          <div className="pt-2.5 border-t border-[#D85A30]/15 space-y-1.5">
            <span className="text-[#888780] block text-[11px] font-bold uppercase">অর্ডারকৃত পণ্য:</span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px] text-[#3A2A1E]">
                <span className="truncate pr-2">
                  • {item.product.nameBangla || item.product.nameEnglish}
                  {item.selectedVariant ? ` (${item.selectedVariant.name})` : ''} × {item.quantity}
                </span>
                <span className="font-bold text-[#D85A30] flex-shrink-0">
                  ৳{item.unitPrice * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Cost Breakdown with Delivery Charge */}
          <div className="pt-2.5 border-t border-[#D85A30]/15 space-y-1.5 text-xs text-[#3A2A1E]">
            <div className="flex justify-between items-center">
              <span className="text-[#888780]">সাবটোটাল:</span>
              <span className="font-semibold">৳{order.subtotal}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between items-center text-[#639922]">
                <span>ডিসকাউন্ট:</span>
                <span className="font-semibold">-৳{order.discount}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-[#888780]">ডেলিভারি চার্জ:</span>
              <span className="font-semibold">
                {order.shippingFee === 0 ? (
                  <span className="text-[#639922] font-bold">ফ্রি (Free)</span>
                ) : (
                  `৳${order.shippingFee}`
                )}
              </span>
            </div>
          </div>

          {/* Total Amount */}
          <div className="pt-3 border-t border-[#D85A30]/20 flex justify-between items-center text-sm font-bold text-[#3A2A1E]">
            <span>সর্বমোট পরিশোধযোগ্য:</span>
            <span className="text-xl text-[#D85A30]">৳{order.total}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-4 px-6 bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] active:scale-[0.99] rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#D85A30]/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>আরও কেনাকাটা করুন (হোমে ফিরে যান)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
