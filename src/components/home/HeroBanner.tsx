import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import nokshiPithaHero from '../../assets/images/nokshi_pitha_village_1787466507600.jpg';

interface BannerSlide {
    id: number;
    badgeBangla: string;
    badgeEnglish: string;
    titleBangla: string;
    titleEnglish: string;
    subtitle: string;
    bgGradient: string;
    image: string;
    primaryCtaText: string;
    primaryCategory: 'pitha' | 'mosolla' | 'all';
    secondaryCtaText: string;
    secondarySlug?: string;
    highlightText: string;
}

const SINGLE_SLIDE: BannerSlide = {
    id: 3,
    badgeBangla: 'ঘরের স্বাদ, মায়ের ভালোবাসা',
    badgeEnglish: 'খাঁটি গ্রামীণ স্বাদের নিশ্চয়তা',
    titleBangla: 'গ্রামের মা-চাচীদের পরম যত্নে তৈরি পিঠা',
    titleEnglish: 'নকশী পিঠা ও নারিকেল পুলি ঐতিহ্যবাহী স্বাদ',
    subtitle: 'আতপ চালের গুঁড়োয় সুই-কাঁচির নিপুণ কারুকাজে তৈরি মুচমুচে নকশী পিঠা এবং নারিকেল ও খাঁটি নলেন গুড়ের কম্বিনেশনে তৈরি নারিকেল পুলি, শতভাগ ঘরোয়া পরিবেশে ।',
    bgGradient: 'from-[#3A2A1E] via-[#593922] to-[#3A2A1E]',
    image: nokshiPithaHero,
    primaryCtaText: 'পিঠা অর্ডার করুন',
    primaryCategory: 'pitha',
    secondaryCtaText: 'নকশী পিঠা',
    secondarySlug: 'pata-nokshi-pitha',
    highlightText: '১০০% খাঁটি গুড় ও দেশি চাল',
};

export const HeroBanner: React.FC = () => {
    const { navigateTo } = useStore();
    const active = SINGLE_SLIDE;

    return (
        <div className='relative max-w-7xl mx-auto px-4 pt-4 pb-2' id='hero-banner-section'>
            <div className='relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FAC775]/30 min-h-[440px] md:min-h-[480px] lg:min-h-[500px] flex items-center'>
                {/* Background Image with Dark Gradient Overlay */}
                <div className='absolute inset-0 z-0'>
                    <img src={active.image} alt={active.titleEnglish} referrerPolicy='no-referrer' className='w-full h-full object-cover object-center scale-105' />
                    <div className={`absolute inset-0 bg-gradient-to-r ${active.bgGradient} opacity-90 mix-blend-multiply`} />
                    <div className='absolute inset-0 bg-black/30' />
                </div>

                {/* Content Area */}
                <div className='relative z-10 w-full p-6 sm:p-10 md:p-14 lg:p-16 max-w-3xl text-[#FAF6EE]'>
                    {/* Top Pill Badges */}
                    <div className='flex flex-wrap items-center gap-2 mb-4 animate-in fade-in slide-in-from-bottom-2'>
                        <span className='inline-flex items-center gap-1.5 bg-[#D85A30] text-[#FAF6EE] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md'>
                            <Sparkles className='w-3.5 h-3.5 text-[#FAC775]' />
                            {active.badgeBangla}
                        </span>
                        <span className='inline-flex items-center gap-1 bg-[#639922]/80 backdrop-blur-sm text-[#FAF6EE] text-xs font-semibold px-3 py-1 rounded-full border border-[#FAF6EE]/20'>
                            <ShieldCheck className='w-3.5 h-3.5' />
                            {active.highlightText}
                        </span>
                    </div>

                    {/* Main Title (Bangla + English) */}
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif-bangla leading-tight text-[#FAF6EE] drop-shadow-md'>{active.titleBangla}</h1>
                    <h2 className='text-lg sm:text-xl md:text-2xl font-extrabold text-[#FAC775] mt-2 font-sans tracking-tight'>{active.titleEnglish}</h2>

                    {/* Description */}
                    <p className='text-xs sm:text-sm md:text-base text-[#FAF6EE]/90 mt-3 sm:mt-4 leading-relaxed max-w-xl font-normal drop-shadow-sm'>{active.subtitle}</p>

                    {/* CTA Buttons */}
                    <div className='flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8'>
                        <a
                            href={`?category=${active.primaryCategory}`}
                            onClick={(e) => {
                                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                                    e.preventDefault();
                                    navigateTo('collection', { category: active.primaryCategory });
                                }
                            }}
                            className='bg-[#D85A30] text-[#FAF6EE] hover:bg-[#c24e27] active:scale-95 font-bold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-[#D85A30]/30 group'
                            id='hero-primary-cta'
                        >
                            <span>{active.primaryCtaText}</span>
                            <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
                        </a>

                        {active.secondarySlug && (
                            <a
                                href={`?product=${active.secondarySlug}`}
                                onClick={(e) => {
                                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                                        e.preventDefault();
                                        navigateTo('product-detail', { slug: active.secondarySlug });
                                    }
                                }}
                                className='bg-[#FAF6EE]/15 hover:bg-[#FAF6EE]/25 backdrop-blur-md text-[#FAF6EE] border border-[#FAF6EE]/30 font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-2xl transition-all'
                                id='hero-secondary-cta'
                            >
                                {active.secondaryCtaText} →
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
