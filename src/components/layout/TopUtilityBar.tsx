import React from 'react';
import { Phone, Truck, Heart, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const TopUtilityBar: React.FC = () => {
  const { navigateTo, wishlist } = useStore();

  return (
    <div className="bg-[#3A2A1E] text-[#FAF6EE] text-xs py-2 px-4 border-b border-[#3A2A1E]/20" id="top-utility-bar">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Announcement / Trust statement */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 font-semibold text-[#FAC775] px-2 py-0.5 rounded-full bg-[#FAF6EE]/10 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#639922]" />
            ১০০% নির্ভেজাল
          </span>
          <span className="text-[#FAF6EE]/90 text-[12px] hidden md:inline">
            Aghran: Authentic Homemade Pitha & Pure Spices • Free Dhaka delivery on orders above ৳1500!
          </span>
          <span className="text-[#FAF6EE]/90 text-[12px] md:hidden">
            Free Dhaka delivery on ৳1500+
          </span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-4 sm:gap-6 text-[12px]">
          <button
            onClick={() => navigateTo('track-order')}
            className="inline-flex items-center gap-1.5 text-[#FAF6EE]/90 hover:text-[#FAC775] transition-colors"
            id="top-track-order-btn"
          >
            <Truck className="w-3.5 h-3.5 text-[#FAC775]" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => navigateTo('wishlist')}
            className="inline-flex items-center gap-1.5 text-[#FAF6EE]/90 hover:text-[#FAC775] transition-colors relative"
            id="top-wishlist-btn"
          >
            <Heart className="w-3.5 h-3.5 text-[#FAC775]" />
            <span>Wishlist</span>
            {wishlist.length > 0 && (
              <span className="bg-[#D85A30] text-[#FAF6EE] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center -ml-0.5">
                {wishlist.length}
              </span>
            )}
          </button>

          <a
            href="tel:+8801712345678"
            className="hidden lg:inline-flex items-center gap-1.5 text-[#FAC775] font-semibold hover:underline"
            id="top-helpline-link"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hotline: +880 1712-345678</span>
          </a>

          <div className="text-[#FAF6EE]/70 border-l border-[#FAF6EE]/20 pl-3">
            <span className="font-semibold text-[#FAC775]">৳ BDT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
