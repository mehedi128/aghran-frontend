import React from 'react';
import { Sparkles, ShieldCheck, Heart, Users, Wheat, Award } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const BrandStorySection: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12" id="brand-story-section">
      <div className="bg-[#FAF6EE] border-2 border-[#D85A30]/20 rounded-3xl p-6 sm:p-10 md:p-14 shadow-lg overflow-hidden relative">
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FAC775]/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D85A30]/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Visual Storytelling Collage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF6EE]">
              <img
                src="https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80"
                alt="Traditional Bengali Kitchen"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2A1E]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-[#FAF6EE]">
                <span className="text-[11px] font-black uppercase tracking-wider bg-[#D85A30] px-2.5 py-1 rounded-md">
                  গ্রামের রান্নাঘর থেকে
                </span>
                <p className="text-sm font-bold font-serif-bangla mt-1">
                  বগুড়া ও পাবনার গ্রামীণ গৃহিণীদের পরম মমতায় প্রস্তুত
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#FAEEDA] p-3 rounded-2xl text-center border border-[#D85A30]/15">
                <span className="text-lg font-black text-[#D85A30] block">১০০%</span>
                <span className="text-[11px] font-bold text-[#3A2A1E]">নির্ভেজাল খাঁটি</span>
              </div>
              <div className="bg-[#FAEEDA] p-3 rounded-2xl text-center border border-[#D85A30]/15">
                <span className="text-lg font-black text-[#639922] block">৫০+</span>
                <span className="text-[11px] font-bold text-[#3A2A1E]">গ্রামীণ নারী কারিগর</span>
              </div>
              <div className="bg-[#FAEEDA] p-3 rounded-2xl text-center border border-[#D85A30]/15">
                <span className="text-lg font-black text-[#D85A30] block">২৪-৪৮h</span>
                <span className="text-[11px] font-bold text-[#3A2A1E]">হোম ডেলিভারি</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#D85A30] uppercase">
              <Wheat className="w-4 h-4" />
              <span>THE STORY OF AGHRAN • অঘ্রাণের কথা</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-bangla text-[#3A2A1E] leading-tight">
              নতুন ধানের গন্ধ আর মায়ের হাতের পিঠার নস্টালজিয়া
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#888780] leading-relaxed">
              <p>
                বাংলায় <strong className="text-[#3A2A1E]">‘অগ্রহায়ণ’ বা ‘অঘ্রাণ’</strong> মানেই নতুন ধানের আমেজ, নবান্ন উৎসব, খেজুরের খাঁটি নলেন গুড় আর মা-নানু-দাদীদের তৈরি সুস্বাদু পিঠাপুলির সুবাস। শহুরে ব্যস্ততায় সেই ঐতিহ্য যখন হারিয়ে যাচ্ছে, তখনই অঘ্রাণের জন্ম।
              </p>
              <p>
                আমরা কোনো ফ্যাক্টরি বা কেমিক্যাল প্রসেসিংয়ে বিশ্বাস করি না। আমাদের পিঠাসমূহ প্রস্তুত হয় বগুড়া ও পাবনার গ্রামীণ নারীদের নিজস্ব ঘরোয়া রান্নাঘরে, সনাতন উপায়ে। আমাদের মসলা পেষাই হয় কম তাপে প্রাচীন পাথরের জাতায় ও কাঠের ঘানিতে — যাতে কোনো ক্ষতিকারক রাসায়নিক বা কৃত্রিম রং ছাড়াই মসলার আসল ঝাঁঝ ও খাদ্যগুণ অটুট থাকে।
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAEEDA]/60">
                <ShieldCheck className="w-5 h-5 text-[#639922] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#3A2A1E] block">No Preservatives or Dyes</strong>
                  <span className="text-[#888780]">Zero artificial additives or chemical preservatives.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAEEDA]/60">
                <Users className="w-5 h-5 text-[#D85A30] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#3A2A1E] block">Empowering Rural Women</strong>
                  <span className="text-[#888780]">Direct fair income for 50+ village culinary artisans.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="bg-[#3A2A1E] text-[#FAF6EE] hover:bg-[#D85A30] font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
              >
                Read Our Full Brand Story (বিস্তারিত জানুন) →
              </button>
              <button
                onClick={() => navigateTo('collection', { category: 'all' })}
                className="text-xs font-bold text-[#D85A30] hover:underline"
              >
                Shop Fresh Harvest Products →
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
