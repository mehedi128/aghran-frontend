import React from 'react';
import { Wheat, Users, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-16" id="about-brand-page">
      
      {/* Hero Header */}
      <div className="bg-[#FAEEDA] rounded-3xl p-8 sm:p-14 border-2 border-[#D85A30]/20 text-center max-w-4xl mx-auto space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 text-xs font-black tracking-widest text-[#D85A30] uppercase">
          <Wheat className="w-4 h-4" />
          <span>OUR HERITAGE • আমাদের গল্প</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bangla text-[#3A2A1E] leading-tight">
          নতুন ধানের গন্ধ আর মায়ের হাতের পিঠার নস্টালজিয়া
        </h1>

        <p className="text-sm sm:text-base text-[#888780] max-w-2xl mx-auto leading-relaxed">
          Aghran (অঘ্রাণ) is born from a deep love for Bengal's rural food traditions. We bring pure, unadulterated, homemade delicacies from village courtyards directly to your dining table.
        </p>
      </div>

      {/* Story Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-[#639922] bg-[#639922]/10 px-3 py-1 rounded-full uppercase">
            The Essence of Agrahayan
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
            কেন আমাদের নাম 'অঘ্রাণ'?
          </h2>
          <p className="text-xs sm:text-sm text-[#888780] leading-relaxed">
            বাংলা বর্ষপঞ্জির অষ্টম মাস ‘অগ্রহায়ণ’ বা গ্রামবাংলার লোকমুখে ‘অঘ্রাণ’। এই ঋতুতেই বাংলার মাঠজুড়ে সোনালি আমন ধান পেকে ওঠে, কৃষক পরিবারে শুরু হয় নবান্ন উৎসব। সেই নতুন চালের গুঁড়ি আর শীতের প্রথম খাঁটি খেজুরের নলেন গুড় দিয়ে ঘরে ঘরে তৈরি হতো নকশি পিঠা, কুলি পিঠা, আর পাটিসাপটা।
          </p>
          <p className="text-xs sm:text-sm text-[#888780] leading-relaxed">
            শহরের ব্যস্ত জীবনে আমরা যখন প্যাকেটজাত কৃত্রিম খাবার আর কেমিক্যালযুক্ত মসলায় অভ্যস্ত হয়ে পড়ছি, অঘ্রাণ তখন ফিরে যেতে চায় সেই শিকড়ে — যেখানে প্রতিটি পদ তৈরি হয় ভালোবাসা ও আন্তরিকতায়।
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF6EE] relative">
          <img
            src="https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80"
            alt="Bangladeshi Rural Heritage Kitchen"
            referrerPolicy="no-referrer"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>
      </div>



      {/* Social Impact / Women Empowerment */}
      <div className="bg-[#FAEEDA] rounded-3xl p-8 sm:p-12 border border-[#D85A30]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D85A30] uppercase">
            <Users className="w-4 h-4" />
            <span>COMMUNITY EMPOWERMENT • নারী উদ্যোক্তা ও সামাজিক দায়বদ্ধতা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-bangla text-[#3A2A1E]">
            গ্রামের মায়েদের স্বাবলম্বিতা ও ন্যায্য মজুরি
          </h2>
          <p className="text-xs sm:text-sm text-[#888780] leading-relaxed">
            অঘ্রাণের প্রতিটি ক্রয়ের মাধ্যমে আপনি সরাসরি বগুড়া, পাবনা ও কুষ্টিয়ার ৫০ জনেরও বেশি গ্রামীণ নারীর সংসারে আর্থিক স্বাচ্ছন্দ্য এনে দিচ্ছেন। মধ্যস্বত্বভোগী ছাড়াই তাদের তৈরি পণ্যের ন্যায্য মূল্য নিশ্চিত করাই আমাদের মিশন।
          </p>
        </div>

        <div className="lg:col-span-4 text-center">
          <button
            onClick={() => navigateTo('collection', { category: 'all' })}
            className="w-full py-4 bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Taste Our Products (পণ্য কিনুন)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
