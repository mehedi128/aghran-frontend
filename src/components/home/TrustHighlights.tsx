import React from 'react';
import { ShieldCheck, Sparkles, Truck, Banknote, HeartHandshake } from 'lucide-react';

export const TrustHighlights: React.FC = () => {
  const highlights = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#639922]" />,
      titleBangla: '১০০% নির্ভেজাল ও ঘরোয়া',
      titleEnglish: '100% Homemade & Pure',
      description: 'Zero artificial colors, lead chromate, or chemical preservatives.'
    },
    {
      icon: <Truck className="w-7 h-7 text-[#D85A30]" />,
      titleBangla: 'সারা দেশে হোম ডেলিভারি',
      titleEnglish: 'Express Fast Delivery',
      description: '24-48 hours across all 64 districts.'
    },
    {
      icon: <Banknote className="w-7 h-7 text-[#639922]" />,
      titleBangla: 'ক্যাশ অন ডেলিভারি সুবিধা',
      titleEnglish: 'Cash On Delivery (COD)',
      description: 'Check your fresh package upon arrival before paying the rider.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8" id="trust-highlights-section">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="bg-[#FAF6EE] border border-[#D85A30]/15 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#D85A30]/30 transition-all flex items-start gap-4 group"
          >
            <div className="p-3 bg-[#FAEEDA] rounded-2xl group-hover:scale-110 transition-transform flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold font-serif-bangla text-[#3A2A1E] leading-tight">
                {item.titleBangla}
              </h3>
              <h4 className="text-xs font-extrabold text-[#D85A30] mt-0.5">
                {item.titleEnglish}
              </h4>
              <p className="text-xs text-[#888780] mt-1 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
