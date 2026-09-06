import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowRight, MessageCircle, Banknote } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <footer className="bg-[#FAEEDA] text-[#3A2A1E] pt-14 pb-8 border-t border-[#D85A30]/20" id="main-site-footer">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Facebook Connect / Trust Banner (100% Bangla) */}
        <div className="bg-[#FAF6EE] text-[#3A2A1E] rounded-3xl p-6 md:p-8 mb-12 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6 border-2 border-[#D85A30]/20">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold text-[#1877F2] bg-[#1877F2]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 font-serif-bangla">
              <span>🌾 অঘ্রাণ পরিবার ও ফেসবুক পেজ</span>
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-serif-bangla text-[#3A2A1E] mt-3">
              আমাদের ফেসবুক পেজে যুক্ত হোন
            </h3>
            <p className="text-xs md:text-sm text-[#888780] font-serif-bangla mt-1.5 leading-relaxed">
              সরাসরি গ্রামের ফ্রেশ পিঠার ব্যাচ, খাঁটি খেজুরের গুড় এবং নতুন রান্নার মশলার আপডেট ও অফার পেতে আমাদের অফিসিয়াল ফেসবুক পেজে যুক্ত থাকুন।
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-[0.98] font-serif-bangla"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Join Facebook (যুক্ত হোন)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://m.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white border-2 border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2]/10 text-sm font-bold px-5 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 font-serif-bangla shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>মেসেজ দিন</span>
            </a>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#3A2A1E]/10">
          
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" onClick={() => navigateTo('home')} />
            <p className="text-sm md:text-base text-[#3A2A1E]/85 leading-relaxed max-w-md font-serif-bangla">
              <strong className="text-[#D85A30] font-bold">অঘ্রাণ (Aghran)</strong> — বাংলার ঐতিহ্যবাহী ও খাঁটি খাদ্যপণ্যের ব্র্যান্ড, যা গ্রামীণ স্বাদ ও সংস্কৃতিকে শহরের মানুষের কাছে পৌঁছে দেয়।
            </p>

            <div className="space-y-3 text-sm md:text-base text-[#3A2A1E]/90 pt-2 font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D85A30] flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-[#3A2A1E]">
                  Mouchak, Gazipur
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D85A30] flex-shrink-0" />
                <a href="tel:+8801752421224" className="hover:text-[#D85A30] transition-colors font-semibold">
                  +880 1752-421224
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D85A30] flex-shrink-0" />
                <a href="mailto:support@aghranfood.com" className="hover:text-[#D85A30] transition-colors font-medium">
                  support@aghranfood.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/8801752421224"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#639922] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#52811a] transition-all shadow-sm hover:shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Order / Helpline</span>
              </a>
            </div>
          </div>

          {/* Shop By */}
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider text-[#D85A30] mb-4 font-serif-bangla">
              Shop Categories
            </h4>
            <ul className="space-y-3 text-sm text-[#3A2A1E]/85 font-medium">
              <li>
                <button
                  onClick={() => navigateTo('collection', { category: 'pitha' })}
                  className="hover:text-[#D85A30] transition-colors text-left"
                >
                  Traditional Pitha (ঐতিহ্যবাহী পিঠা)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('collection', { category: 'combos' })}
                  className="hover:text-[#D85A30] transition-colors text-left"
                >
                  Combo Offers (কম্বো অফার)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('product-detail', { slug: 'pata-nokshi-pitha' })}
                  className="hover:text-[#D85A30] transition-colors text-left"
                >
                  Nokshi Pitha (নকশী পিঠা)
                </button>
              </li>
            </ul>
          </div>

          {/* Information & Trust */}
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider text-[#D85A30] mb-4 font-serif-bangla">
              About Aghran
            </h4>
            <ul className="space-y-3 text-sm text-[#3A2A1E]/85 font-medium">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#D85A30] transition-colors text-left">
                  Our Harvest Story (অঘ্রাণের কথা)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#D85A30] transition-colors text-left">
                  Offer Zone (অফার)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider text-[#D85A30] mb-4 font-serif-bangla">
              Help & Support
            </h4>
            <ul className="space-y-3 text-sm text-[#3A2A1E]/85 font-medium">
              <li>
                <button onClick={() => navigateTo('track-order')} className="hover:text-[#D85A30] transition-colors text-left font-bold text-[#D85A30]">
                  ⚡ Track Order Status
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#D85A30] transition-colors text-left">
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#D85A30] transition-colors text-left">
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#D85A30] transition-colors text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#D85A30] transition-colors text-left">
                  Contact Customer Care
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Payment Methods, Courier Partners & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#3A2A1E]/90">
          
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-[#3A2A1E] text-sm">Payment Method:</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#639922] text-white font-black px-3.5 py-1.5 rounded-lg text-xs shadow-sm flex items-center gap-1.5">
                <Banknote className="w-4 h-4" />
                <span>Cash on Delivery (ক্যাশ অন ডেলিভারি)</span>
              </span>
              <span className="bg-[#FAF6EE] text-[#3A2A1E] border border-[#D85A30]/20 font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm">
                পণ্য বুঝে পেয়ে মূল্য পরিশোধ
              </span>
            </div>
          </div>

          {/* Delivery Partner */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#3A2A1E]/80 font-semibold">Delivery by:</span>
            <span className="bg-white text-[#3A2A1E] border border-[#D85A30]/15 px-3 py-1.5 rounded-lg font-bold shadow-sm text-xs">
              Pathao • Steadfast • RedX
            </span>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#3A2A1E]/10 text-center text-xs text-[#3A2A1E]/70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Aghran (অঘ্রাণ). All rights reserved.
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-[#3A2A1E]/90">
            <ShieldCheck className="w-4 h-4 text-[#639922]" />
            Food Safety Compliant Standards
          </span>
        </div>

      </div>
    </footer>
  );
};
