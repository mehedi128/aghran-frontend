import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../../data/products';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10" id="customer-testimonials-section">
      <div className="bg-[#FAEEDA]/40 rounded-3xl p-6 sm:p-10 md:p-12 border border-[#D85A30]/20 relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#D85A30] uppercase">
              <Heart className="w-4 h-4 fill-current text-[#D85A30]" />
              <span>TESTIMONIALS • গ্রাহকদের ভালোবাসা</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-bangla text-[#3A2A1E] mt-1">
              What Our Happy Customers Say (গ্রাহক প্রতিক্রিয়া)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#D85A30]/20 text-[#3A2A1E] hover:bg-[#D85A30] hover:text-[#FAF6EE] flex items-center justify-center transition-all shadow-sm"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#D85A30]/20 text-[#3A2A1E] hover:bg-[#D85A30] hover:text-[#FAF6EE] flex items-center justify-center transition-all shadow-sm"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid / Active Slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-[#FAF6EE] rounded-2xl p-5 border border-[#D85A30]/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                idx === currentIndex ? 'ring-2 ring-[#D85A30]' : ''
              }`}
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#D85A30]/30" />
                </div>

                {/* Comment Text */}
                <p className="text-xs font-serif-bangla text-[#3A2A1E] leading-relaxed mb-3">
                  "{t.commentBangla || t.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-[#D85A30]/10 flex items-center gap-3">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#D85A30]/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#D85A30]/10 text-[#D85A30] font-bold flex items-center justify-center text-xs">
                    {t.author.charAt(0)}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-[#3A2A1E] truncate">
                      {t.author}
                    </h4>
                    {t.verifiedBuyer && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#639922] flex-shrink-0" title="Verified Buyer" />
                    )}
                  </div>
                  <div className="text-[11px] text-[#888780] truncate">
                    {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
