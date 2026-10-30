import React, { useState, useMemo, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Star, 
  Flame, 
  ArrowUpRight, 
  Lock,
  ShoppingBag,
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Wheat,
  Clock,
  HeartHandshake,
  Award,
  Sun,
  PackageCheck,
  CookingPot,
  Leaf
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductVariant, CartItem, OrderCustomerInfo } from '../../types';
import { sendChalerGuraOrderToGoogleSheet } from '../../services/googleSheetsService';
import { trackPurchase } from '../../services/facebookTrackingService';

// Product & Showcase Images
import dhekiChalerGuraImg1 from '../../assets/images/dheki_chaler_gura_1.jpg';
import dhekiChalerGuraBannerImg from '../../assets/images/dheki_chaler_gura_banner.jpg';
import dhekiChalerGuraTextureImg from '../../assets/images/dheki_chaler_gura_texture.jpg';
import pataNokshiImg1 from '../../assets/images/pata_n0.png';
import jhinukNokshiImg from '../../assets/images/jn0.png';

// Reviews user avatars
import reviewUser1 from '../../assets/images/review_user_1.jpg';
import reviewUser2 from '../../assets/images/review_user_2.jpg';
import reviewUser3 from '../../assets/images/review_user_3.jpg';

interface PackageOption {
  id: string;
  name: string;
  nameEnglish: string;
  weight: string;
  weightKg: number;
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  badge?: string;
  description: string;
  highlight?: boolean;
  freeDelivery?: boolean;
}

export const ChalerGuraLandingPage: React.FC = () => {
  const { products, placeOrder, navigateTo } = useStore();

  // Packages: 3kg = 490, 5kg = 790
  const packages: PackageOption[] = useMemo(() => [
    {
      id: 'pkg-chal-5kg',
      name: 'ঢেঁকি ছাঁটা আতপ চালের গুঁড়া (৫ কেজি)',
      nameEnglish: 'Dheki-chata Atop Rice Flour (5 kg)',
      weight: '5 kg',
      weightKg: 5,
      price: 790,
      originalPrice: 980,
      savings: 190,
      image: dhekiChalerGuraImg1,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true,
      description: 'পুরো পরিবারের শীতের পিঠাপুলির সেরা প্যাকেজ। খাঁটি সুগন্ধি আতপ চালের গুঁড়া।',
      highlight: true
    },
    {
      id: 'pkg-chal-3kg',
      name: 'ঢেঁকি ছাঁটা আতপ চালের গুঁড়া (৩ কেজি)',
      nameEnglish: 'Dheki-chata Atop Rice Flour (3 kg)',
      weight: '3 kg',
      weightKg: 3,
      price: 490,
      originalPrice: 590,
      savings: 100,
      image: dhekiChalerGuraTextureImg,
      badge: '🌾 স্পেশাল অফার',
      description: 'ছোট ও মাঝারি পরিবারের জন্য আদর্শ। কাঠের ঢেঁকিতে ছাঁটা ১০০% খাঁটি আতপ চালের গুঁড়া।'
    }
  ], []);

  // Selected Package State: Map of packageId -> quantity
  // Default selected: 5kg Package
  const [selectedItems, setSelectedItems] = useState<{ [pkgId: string]: number }>({
    'pkg-chal-5kg': 1
  });

  // Photo Carousel State
  const carouselSlides = useMemo(() => [
    {
      src: dhekiChalerGuraBannerImg,
      title: 'ঐতিহ্যবাহী কাঠের ঢেঁকিতে খাঁটি আতপ চাল ছাঁটাই',
      subtitle: 'গ্রামবাংলার মা-বোনদের হাতে তৈরি শীতের সকালের নিখুঁত পিঠাপুলির সুবাস'
    },
    {
      src: dhekiChalerGuraImg1,
      title: 'মাটির পাত্র ও পাটের বস্তায় ১০০% খাঁটি চালের গুঁড়া',
      subtitle: 'কোনো প্রিজারভেটিভ বা কৃত্রিম উপাদান ছাড়া প্রাকৃতিক রোদে শুকানো আতপ চাল'
    },
    {
      src: dhekiChalerGuraTextureImg,
      title: 'বাঁশের চালনিতে নিখুঁত মিহি চালের গুঁড়া',
      subtitle: 'ভাপা, চিতই, নকশি ও পুলি পিঠার জন্য একদম মসৃণ ও পারফেক্ট টেক্সচার'
    }
  ], []);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto rotate carousel every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex(prev => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  // Rolling 24-Hour Countdown Timer
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    const diff = midnight.getTime() - now.getTime();
    if (diff <= 0) return { hours: 23, minutes: 59, seconds: 59 };
    return {
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Meta Pixel Tracking on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
      window.fbq('track', 'ViewContent', {
        content_name: 'ঢেঁকি ছাঁটা আতপ চালের গুঁড়া ল্যান্ডিং পেজ',
        content_ids: ['chaler-gura-1'],
        content_type: 'product',
        value: 790,
        currency: 'BDT'
      });
    }
  }, []);

  // Customer Form Data
  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    streetAddress: '',
    deliveryZone: 'dhaka',
    paymentMethod: 'cod',
    orderNotes: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTrackedCheckout, setHasTrackedCheckout] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Track InitiateCheckout once when customer interacts
  const triggerInitiateCheckout = () => {
    if (!hasTrackedCheckout) {
      setHasTrackedCheckout(true);
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          content_name: 'ঢেঁকি ছাঁটা আতপ চালের গুঁড়া অর্ডার ফর্ম',
          content_ids: ['chaler-gura-1'],
          content_type: 'product',
          value: totalAmount,
          currency: 'BDT'
        });
      }
    }
  };

  // Toggle package
  const handleSelectPackage = (pkgId: string) => {
    setSelectedItems(prev => {
      const current = prev[pkgId] || 0;
      if (current > 0) {
        // If clicking already selected, keep it or allow deselection if more than 1 selected
        const keys = Object.keys(prev).filter(k => prev[k] > 0);
        if (keys.length === 1 && keys[0] === pkgId) return prev; // keep at least one
        const next = { ...prev };
        delete next[pkgId];
        return next;
      }
      return { ...prev, [pkgId]: 1 };
    });
  };

  // Quantity modifier (+ / -)
  const handleQuantityChange = (pkgId: string, newQty: number) => {
    setSelectedItems(prev => {
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[pkgId];
        return next;
      }
      return { ...prev, [pkgId]: newQty };
    });
  };

  // Active selected list
  const activeSelectedList = useMemo(() => {
    return Object.entries(selectedItems)
      .filter(([_, qty]) => Number(qty) > 0)
      .map(([id, qty]) => {
        const pkg = packages.find(p => p.id === id);
        return {
          ...pkg!,
          quantity: Number(qty)
        };
      })
      .filter(item => Boolean(item.id));
  }, [selectedItems, packages]);

  // Calculations
  const subtotal = useMemo(() => {
    return activeSelectedList.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [activeSelectedList]);

  const totalWeightKg = useMemo(() => {
    return activeSelectedList.reduce((acc, item) => acc + (item.weightKg * item.quantity), 0);
  }, [activeSelectedList]);

  // Free delivery trigger: if any item has freeDelivery, or total weight >= 5kg, or subtotal >= 1000
  const isFreeDeliveryQualified = useMemo(() => {
    const hasFreeItem = activeSelectedList.some(item => item.freeDelivery);
    return hasFreeItem || totalWeightKg >= 5 || subtotal >= 1000;
  }, [activeSelectedList, totalWeightKg, subtotal]);

  const shippingFee = useMemo(() => {
    if (activeSelectedList.length === 0) return 0;
    if (isFreeDeliveryQualified) return 0;
    return formData.deliveryZone === 'dhaka' ? 80 : 130;
  }, [activeSelectedList.length, isFreeDeliveryQualified, formData.deliveryZone]);

  const totalAmount = subtotal + shippingFee;

  // Form Validation
  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (activeSelectedList.length === 0) {
      errs.items = 'অনুগ্রহ করে কমপক্ষে একটি প্যাকেজ নির্বাচন করুন।';
    }

    if (!formData.fullName.trim()) {
      errs.fullName = 'আপনার সম্পূর্ণ নাম লিখুন।';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নাম্বার লিখুন।';
    } else if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(cleanPhone)) {
      errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নাম্বার লিখুন (যেমন: 01712345678)।';
    }

    if (!formData.streetAddress.trim()) {
      errs.streetAddress = 'আপনার সম্পূর্ণ ডেলিভারি ঠিকানা বিস্তারিত লিখুন।';
    } else if (formData.streetAddress.trim().length < 8) {
      errs.streetAddress = 'সঠিক ডেলিভারির জন্য এলাকা, থানা ও জেলার নাম বিস্তারিত লিখুন।';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Order
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const formEl = document.getElementById('checkout-form-section');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const matchedProduct = products.find(p => p.id === 'chaler-gura-1' || p.slug === 'dheki-chata-atop-chaler-gura') || products[0];

      const orderCartItems: CartItem[] = activeSelectedList.map(item => {
        const matchedVariant: ProductVariant = {
          id: item.id,
          name: item.weight,
          weight: item.weight,
          price: item.price,
          originalPrice: item.originalPrice,
          inStock: true
        };

        return {
          product: {
            ...matchedProduct,
            nameBangla: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            images: [item.image, ...matchedProduct.images]
          },
          selectedVariant: matchedVariant,
          quantity: item.quantity,
          unitPrice: item.price
        };
      });

      const createdOrder = placeOrder({
        items: orderCartItems,
        customer: formData,
        subtotal: subtotal,
        shippingFee: shippingFee,
        discount: 0,
        total: totalAmount
      }, { skipDefaultSheetSync: true });

      // Facebook tracking & Dedicated Google Sheet sync
      trackPurchase(createdOrder);
      await sendChalerGuraOrderToGoogleSheet(createdOrder);

      navigateTo('order-success');
    } catch (err) {
      console.error('Order submission error:', err);
      navigateTo('order-success');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to Order section helper
  const scrollToOrder = (pkgId?: string) => {
    if (pkgId) {
      setSelectedItems({ [pkgId]: 1 });
    }
    triggerInitiateCheckout();
    const el = document.getElementById('order');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#3A2A1E] font-bangla pb-20 selection:bg-[#FAC775] selection:text-[#3A2A1E]">
      
      {/* 1. TOP URGENCY ANNOUNCEMENT BAR (Bilrong Inspiration) */}
      <div className="bg-gradient-to-r from-[#8B2500] via-[#D85A30] to-[#8B2500] text-white py-2.5 px-4 text-center shadow-md sticky top-0 z-40 border-b border-amber-300/30">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-bold font-serif-bangla tracking-wide">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse shrink-0" />
          <span>🌾 শীতের স্পেশাল ধামাকা অফার: ৫ কেজিতে সম্পূর্ণ ফ্রি হোম ডেলিভারি! ক্যাশ অন হোম ডেলিভারি</span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse shrink-0 hidden sm:inline" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-5 sm:py-8 space-y-8">

        {/* 2. HERO HEADLINE & BADGE */}
        <div className="text-center space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 bg-[#FFF3CC] border-2 border-[#E59E27] text-[#7A270D] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-xs">
            <Wheat className="w-4 h-4 text-[#D85A30]" />
            <span>শতভাগ খাঁটি দেশি আতপ চাল • গ্রামীণ কাঠের ঢেঁকি ছাঁটা</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-serif-bangla text-[#3A2A1E] leading-tight sm:leading-snug">
            ঐতিহ্যবাহী <span className="text-[#D85A30]">ঢেঁকি ছাঁটা আতপ চালের গুঁড়া</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#5D4A3A] font-serif-bangla max-w-2xl mx-auto leading-relaxed">
            শীতের সকালে ধোঁয়া ওঠা তুলতুলে নরম ভাপা, ফুলকো চিতই, মচমচে নকশি কিংবা রসালো পুলি পিঠার আসল গ্রামীণ স্বাদ ফিরিয়ে আনুন কোনো প্রকার কেমিক্যাল বা প্রিজারভেটিভ ছাড়া।
          </p>

          {/* Quick Hero CTA Button */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToOrder('pkg-chal-5kg')}
              className="inline-flex items-center justify-center gap-2.5 bg-[#19910f] hover:bg-[#157a0d] text-white font-black font-serif-bangla text-base sm:text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-[#19910f]/30 hover:shadow-xl transition-all transform active:scale-95 cursor-pointer border border-white/20"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>অর্ডার করুন এখনই</span>
            </button>
            <a
              href="tel:+8801752421224"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF6EE] text-[#3A2A1E] border border-[#D85A30]/30 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-xs transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#D85A30]" />
              <span>01752-421224</span>
            </a>
          </div>
        </div>

        {/* 3. HERO IMAGE CAROUSEL / SLIDESHOW (Bilrong Elementor Style) */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#D85A30]/25 bg-white shadow-xl aspect-[16/9] sm:aspect-[21/9]">
          {carouselSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === activeSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform duration-500"
                onClick={() => setLightboxImg(slide.src)}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-6 text-white text-center">
                <h3 className="font-serif-bangla font-black text-sm sm:text-lg md:text-xl drop-shadow-md">
                  {slide.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200 font-serif-bangla drop-shadow-sm mt-0.5 hidden sm:block">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Carousel Navigation Buttons */}
          <button
            type="button"
            onClick={() => setActiveSlideIndex(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            onClick={() => setActiveSlideIndex(prev => (prev + 1) % carouselSlides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlideIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === activeSlideIndex ? 'w-7 bg-amber-400' : 'w-2 bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 4. 24-HOUR COUNTDOWN TIMER BOX (Nokshi Pitha Match) */}
        <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-3xl border-2 border-red-400/40 p-4 sm:p-6 shadow-xl shadow-red-600/25 space-y-3.5 text-center text-white">
          <div className="flex items-center justify-center gap-2 text-lg sm:text-2xl font-black font-serif-bangla drop-shadow-sm">
            <Flame className="w-6 h-6 text-yellow-300 animate-bounce shrink-0" />
            <span>🔥 বিশেষ শীতকালীন অফারটি আর বাকি রয়েছে 🔥</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 sm:gap-4 font-mono">
            <div className="flex flex-col items-center justify-center bg-white text-red-600 px-3.5 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-lg min-w-[70px] sm:min-w-[90px]">
              <span className="text-2xl sm:text-4xl font-black tracking-tight leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans font-bold tracking-wider uppercase text-gray-700 mt-1">
                ঘণ্টা
              </span>
            </div>
            <span className="text-xl sm:text-3xl font-black -mt-3">:</span>
            <div className="flex flex-col items-center justify-center bg-white text-red-600 px-3.5 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-lg min-w-[70px] sm:min-w-[90px]">
              <span className="text-2xl sm:text-4xl font-black tracking-tight leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans font-bold tracking-wider uppercase text-gray-700 mt-1">
                মিনিট
              </span>
            </div>
            <span className="text-xl sm:text-3xl font-black -mt-3">:</span>
            <div className="flex flex-col items-center justify-center bg-white text-red-600 px-3.5 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-lg min-w-[70px] sm:min-w-[90px]">
              <span className="text-2xl sm:text-4xl font-black tracking-tight leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans font-bold tracking-wider uppercase text-gray-700 mt-1">
                সেকেন্ড
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-yellow-100 font-serif-bangla">
            স্টক সীমিত! শীতের তাজা চালের গুঁড়া পেতে আজই অর্ডার বুকিং করুন।
          </p>
        </div>

        {/* 5. "আমাদের প্যাকেজ" (PACKAGE CARDS SECTION - BILRONG STYLE) */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-3xl font-black font-serif-bangla text-[#3A2A1E]">
              আমাদের প্যাকেজসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-[#888780] font-serif-bangla">
              আপনার প্রয়োজন অনুযায়ী যেকোনো প্যাকেজ বেছে নিন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-5 sm:p-6 bg-white border-2 transition-all duration-300 relative flex flex-col justify-between shadow-md hover:shadow-xl ${
                  pkg.freeDelivery
                    ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/30 bg-gradient-to-b from-[#F1F8E9]/50 via-white to-[#FAF6EE]'
                    : pkg.highlight
                      ? 'border-[#D85A30] ring-2 ring-[#D85A30]/30 bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF6EE]'
                      : 'border-[#D85A30]/20 hover:border-[#D85A30]/60'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-6 z-10">
                    <span className={`text-xs font-black px-3.5 py-1 rounded-full shadow-sm font-serif-bangla uppercase tracking-wider ${
                      pkg.freeDelivery
                        ? 'bg-[#1B5E20] text-white border border-[#81C784]/70'
                        : 'bg-[#D85A30] text-white'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-amber-50">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif-bangla font-black text-lg sm:text-xl text-[#3A2A1E] leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#706050] font-serif-bangla leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#D85A30]/15 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#888780] line-through block font-mono">
                        ৳{pkg.originalPrice}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#D85A30] font-mono leading-none">
                        ৳{pkg.price}
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#1B5E20] bg-[#E8F5E9] px-2.5 py-1 rounded-full border border-[#81C784]/60">
                      সাশ্রয় ৳{pkg.savings}
                    </span>
                  </div>
                </div>

                {/* Direct Order Button on Card */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => scrollToOrder(pkg.id)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-serif-bangla font-black text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>এই প্যাকেজটি অর্ডার করুন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. WHY CHOOSE OUR DHEKI-CHATA CHALER GURA (BENEFITS GRID) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D85A30]/20 shadow-sm space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-black text-[#D85A30] bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#D85A30]/20">
              খাঁটি ঐতিহ্য ও গুণমান
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-serif-bangla text-[#3A2A1E]">
              কেন আমাদের ঢেঁকি ছাঁটা চালের গুঁড়া সেরা?
            </h3>
            <p className="text-xs sm:text-sm text-[#706050] font-serif-bangla max-w-xl mx-auto">
              আধুনিক অটো মিলের তাপে চালের আসল সুবাস ও পুষ্টি নষ্ট হয়ে যায়। আমাদের গুঁড়ায় যা পাবেন:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* 1. বাছাইকৃত দেশীয় আতপ চাল */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE]/80 border border-[#D85A30]/20 space-y-2.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#D85A30]/10 text-[#D85A30] flex items-center justify-center font-bold">
                <Wheat className="w-5 h-5" />
              </div>
              <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                বাছাইকৃত দেশীয় আতপ চাল
              </h4>
              <p className="text-xs sm:text-[13px] text-[#5D4A3A] font-serif-bangla leading-relaxed">
                মানসম্মত সেরা জাতের দেশি আতপ চাল বিশেষ যত্ন নিয়ে বাছাই করে তৈরি করা হয়। কোনো কৃত্রিম উপাদান বা ভেজাল নেই।
              </p>
            </div>

            {/* 2. রোদে ভালোভাবে শুকানো */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE]/80 border border-[#D85A30]/20 space-y-2.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Sun className="w-5 h-5" />
              </div>
              <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                রোদে ভালোভাবে শুকানো ☀️
              </h4>
              <p className="text-xs sm:text-[13px] text-[#5D4A3A] font-serif-bangla leading-relaxed">
                চাল ও চালের গুঁড়া উভয়ই প্রয়োজন ও নিয়ম অনুযায়ী রোদে শুকিয়ে নেওয়া হয়, যা পুষ্টিমান ও আসল সুবাস অটুট রাখে।
              </p>
            </div>

            {/* 3. মিহি ও ঝরঝরে গুঁড়া */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE]/80 border border-[#D85A30]/20 space-y-2.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#19910f]/10 text-[#19910f] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                মিহি ও ঝরঝরে গুঁড়া ✨
              </h4>
              <p className="text-xs sm:text-[13px] text-[#5D4A3A] font-serif-bangla leading-relaxed">
                পিঠার মিশ্রণে খুব সহজে মিশে যায় এবং কোনো দলা বাঁধে না। প্রতিটি পিঠা তৈরিতে অসাধারণ ফিনিশিং এনে দেয়।
              </p>
            </div>

            {/* 4. পিঠা-পুলির জন্য উপযোগী */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE]/80 border border-[#D85A30]/20 space-y-2.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#639922]/10 text-[#639922] flex items-center justify-center font-bold">
                <CookingPot className="w-5 h-5" />
              </div>
              <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                পিঠা-পুলির জন্য উপযোগী 🥣
              </h4>
              <p className="text-xs sm:text-[13px] text-[#5D4A3A] font-serif-bangla leading-relaxed">
                ভাপা পিঠা, ফুলকো চিতই, তুলতুলে পাটিসাপটা, রসালো পুলি ও মচমচে নকশি পিঠা তৈরিতে বিশেষভাবে উপযোগী।
              </p>
            </div>

            {/* 5. যত্নসহকারে প্রস্তুত */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE]/80 border border-[#D85A30]/20 space-y-2.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                যত্নসহকারে প্রস্তুত 🌿
              </h4>
              <p className="text-xs sm:text-[13px] text-[#5D4A3A] font-serif-bangla leading-relaxed">
                সম্পূর্ণ পরিষ্কার পরিবেশে ঐতিহ্যবাহী উপায়ে ভাঙানো, বাঁশের চালনিতে নিখুঁতভাবে চেলে নেওয়া ও প্যাকেটজাত করা হয়।
              </p>
            </div>

            {/* 6. পরিচ্ছন্ন প্যাকেজিং */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE]/80 border border-[#D85A30]/20 space-y-2.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#D85A30]/10 text-[#D85A30] flex items-center justify-center font-bold">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                পরিচ্ছন্ন প্যাকেজিং 📦
              </h4>
              <p className="text-xs sm:text-[13px] text-[#5D4A3A] font-serif-bangla leading-relaxed">
                আপনার রান্নাঘরে পৌঁছানো পর্যন্ত পণ্যের মান, আর্দ্রতা ও শতভাগ পরিচ্ছন্নতার প্রতি সর্বোচ্চ গুরুত্ব দেওয়া হয়।
              </p>
            </div>
          </div>
        </div>

        {/* 7. WHICH PITHAS CAN BE MADE? (PITHA SHOWCASE) */}
        <div className="bg-gradient-to-r from-[#FFF9E6] via-[#FFF3CC] to-[#FFF9E6] border-2 border-[#E59E27]/50 rounded-3xl p-5 sm:p-7 text-center space-y-4 shadow-sm">
          <h3 className="text-lg sm:text-2xl font-black font-serif-bangla text-[#3A2A1E]">
            যেসব ঐতিহ্যবাহী পিঠার জন্য আমাদের চালের গুঁড়া সেরা
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3 rounded-2xl border border-[#E59E27]/30 shadow-xs">
              <span className="text-2xl block mb-1">🥟</span>
              <span className="font-serif-bangla font-bold text-xs sm:text-sm text-[#3A2A1E]">
                ভাপা পিঠা (Vapa)
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#E59E27]/30 shadow-xs">
              <span className="text-2xl block mb-1">🥮</span>
              <span className="font-serif-bangla font-bold text-xs sm:text-sm text-[#3A2A1E]">
                চিতই পিঠা (Chitoi)
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#E59E27]/30 shadow-xs">
              <span className="text-2xl block mb-1">✨</span>
              <span className="font-serif-bangla font-bold text-xs sm:text-sm text-[#3A2A1E]">
                নকশি পিঠা (Nokshi)
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#E59E27]/30 shadow-xs">
              <span className="text-2xl block mb-1">🥥</span>
              <span className="font-serif-bangla font-bold text-xs sm:text-sm text-[#3A2A1E]">
                পুলি পিঠা (Puli)
              </span>
            </div>
          </div>
        </div>

        {/* 8. CHECKOUT SECTION (STEP 1, 2, 3 - BILRONG & NOKSHI HYBRID) */}
        <div id="order" className="scroll-mt-14 space-y-6">

          <div className="text-center space-y-2 border-t-2 border-[#D85A30]/20 pt-6">
            <h2 className="text-2xl sm:text-4xl font-black font-serif-bangla text-[#3A2A1E]">
              আপনার তথ্য দিয়ে সহজে অর্ডার করুন
            </h2>
            <p className="text-xs sm:text-sm text-[#5D4A3A] font-serif-bangla max-w-xl mx-auto">
              নিচের ফর্মে আপনার প্যাকেজ সিলেক্ট করে নাম, মোবাইল নাম্বার ও ঠিকানা লিখুন এবং <span className="text-[#D85A30] font-black">অর্ডার কনফার্ম করুন</span> বাটনে চাপুন।
            </p>
          </div>

          {/* STEP 1: PACKAGE SELECTION */}
          <div className="bg-white rounded-3xl border border-[#D85A30]/20 shadow-sm p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D85A30]/15 pb-3">
              <h3 className="text-base sm:text-lg font-bold font-serif-bangla text-[#3A2A1E] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D85A30] text-white text-xs flex items-center justify-center font-bold">১</span>
                <span>প্যাকেজ ও পরিমাণ সিলেক্ট করুন</span>
              </h3>
              <span className="text-xs text-[#888780] font-medium hidden sm:inline">
                (এক বা একাধিক সিলেক্ট করতে পারেন)
              </span>
            </div>

            {errors.items && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold">
                {errors.items}
              </div>
            )}

            <div className="space-y-3">
              {packages.map(pkg => {
                const isSelected = (selectedItems[pkg.id] || 0) > 0;
                const quantity = selectedItems[pkg.id] || 0;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isSelected
                        ? pkg.freeDelivery
                          ? 'border-[#2E7D32] bg-[#E8F5E9]/70 shadow-md ring-2 ring-[#2E7D32]/50'
                          : 'border-[#D85A30] bg-[#FAEEDA]/70 shadow-md ring-2 ring-[#D85A30]/40'
                        : pkg.freeDelivery
                          ? 'border-[#81C784]/80 bg-gradient-to-r from-[#F1F8E9] via-[#FFFDE7] to-[#F1F8E9] hover:border-[#2E7D32]'
                          : 'border-[#D85A30]/20 bg-white hover:border-[#D85A30]/50 hover:bg-[#FAF6EE]/50'
                    }`}
                  >
                    {/* Top Badge */}
                    {pkg.badge && (
                      <div className="absolute -top-2.5 left-4 z-10">
                        <span className={`text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider ${
                          pkg.freeDelivery
                            ? 'bg-[#1B5E20] text-white border border-[#81C784]/70'
                            : 'bg-[#D85A30] text-white'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>
                    )}

                    {/* Left: Checkbox + Image + Name */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectPackage(pkg.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-5 h-5 text-[#D85A30] rounded border-gray-300 focus:ring-[#D85A30] cursor-pointer shrink-0"
                      />

                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-[#D85A30]/20 shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif-bangla font-bold text-sm sm:text-base text-[#3A2A1E] leading-snug">
                          {pkg.name}
                        </h4>
                        <p className="text-xs text-[#888780] font-serif-bangla mt-0.5 leading-snug">
                          {pkg.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Quantity Selector & Price */}
                    <div
                      className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D85A30]/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center border border-[#D85A30]/30 rounded-xl bg-[#FAF6EE] shadow-xs overflow-hidden">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(pkg.id, (selectedItems[pkg.id] || 0) - 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm font-black text-[#3A2A1E] hover:bg-[#D85A30] hover:text-white transition-colors cursor-pointer"
                          title="কমিয়ে দিন"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs sm:text-sm font-black text-[#3A2A1E] font-mono">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(pkg.id, (selectedItems[pkg.id] || 0) + 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm font-black text-[#3A2A1E] hover:bg-[#D85A30] hover:text-white transition-colors cursor-pointer"
                          title="বাড়িয়ে দিন"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <span className="text-base sm:text-lg font-black text-[#D85A30] block font-mono">
                          ৳{(pkg.price * (quantity || 1)).toLocaleString()}
                        </span>
                        <span className="text-[11px] text-[#888780] line-through font-mono">
                          ৳{(pkg.originalPrice * (quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2 & 3: FORM & ORDER SUMMARY */}
          <form
            onSubmit={handleSubmitOrder}
            onFocusCapture={triggerInitiateCheckout}
            className="space-y-6"
            id="checkout-form-section"
          >
            {/* STEP 2: CUSTOMER SHIPPING INFO */}
            <div className="bg-white rounded-3xl border border-[#D85A30]/20 shadow-sm p-4 sm:p-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold font-serif-bangla text-[#3A2A1E] flex items-center gap-2 border-b border-[#D85A30]/15 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#D85A30] text-white text-xs flex items-center justify-center font-bold">২</span>
                <span>আপনার নাম, ঠিকানা ও মোবাইল নাম্বার দিন</span>
              </h3>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#3A2A1E] mb-1 font-serif-bangla">
                    আপনার সম্পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="যেমন: মেহেরুন নেসা"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                      errors.fullName
                        ? 'border-red-500 bg-red-50/30 ring-1 ring-red-500'
                        : 'border-[#D85A30]/20 bg-[#FAF6EE]/40 focus:border-[#D85A30] focus:bg-white focus:ring-2 focus:ring-[#D85A30]/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#3A2A1E] mb-1 font-serif-bangla">
                    মোবাইল নাম্বার <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="১১ ডিজিটের সচল মোবাইল নাম্বার (যেমন: 01712345678)"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all ${
                      errors.phone
                        ? 'border-red-500 bg-red-50/30 ring-1 ring-red-500'
                        : 'border-[#D85A30]/20 bg-[#FAF6EE]/40 focus:border-[#D85A30] focus:bg-white focus:ring-2 focus:ring-[#D85A30]/20'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{errors.phone}</p>
                  )}
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#3A2A1E] mb-1 font-serif-bangla">
                    সম্পূর্ণ ঠিকানা (বাসা/রোড, এলাকা, থানা, জেলা) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    placeholder="বাসা/ফ্ল্যাট নং, রোড নং, এলাকা, থানা ও জেলার নাম বিস্তারিত লিখুন..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                      errors.streetAddress
                        ? 'border-red-500 bg-red-50/30 ring-1 ring-red-500'
                        : 'border-[#D85A30]/20 bg-[#FAF6EE]/40 focus:border-[#D85A30] focus:bg-white focus:ring-2 focus:ring-[#D85A30]/20'
                    }`}
                  />
                  {errors.streetAddress && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{errors.streetAddress}</p>
                  )}
                </div>

                {/* Delivery Zone Selection */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                    <label className="block text-xs sm:text-sm font-bold text-[#3A2A1E] font-serif-bangla">
                      ডেলিভারি এলাকা সিলেক্ট করুন:
                    </label>
                    {isFreeDeliveryQualified && (
                      <span className="text-[11px] font-bold text-[#1B5E20] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#81C784]/50">
                        🎉 আপনি সম্পূর্ণ ফ্রি ডেলিভারি পাচ্ছেন!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.deliveryZone === 'dhaka'
                          ? 'border-[#D85A30] bg-[#FAEEDA]/60 shadow-xs ring-1 ring-[#D85A30]'
                          : 'border-[#D85A30]/20 bg-[#FAF6EE]/30 hover:border-[#D85A30]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="deliveryZone"
                          value="dhaka"
                          checked={formData.deliveryZone === 'dhaka'}
                          onChange={() => setFormData({ ...formData, deliveryZone: 'dhaka' })}
                          className="accent-[#D85A30] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-bold font-serif-bangla text-[#3A2A1E]">
                          ঢাকা সিটির ভিতরে
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-black font-sans">
                        {isFreeDeliveryQualified ? (
                          <span className="text-[#1B5E20] font-black font-serif-bangla">🚚 ফ্রি ডেলিভারি (0 TK)</span>
                        ) : (
                          <span className="text-[#D85A30]">80 TK</span>
                        )}
                      </span>
                    </label>

                    <label
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.deliveryZone === 'outside_dhaka'
                          ? 'border-[#D85A30] bg-[#FAEEDA]/60 shadow-xs ring-1 ring-[#D85A30]'
                          : 'border-[#D85A30]/20 bg-[#FAF6EE]/30 hover:border-[#D85A30]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="deliveryZone"
                          value="outside_dhaka"
                          checked={formData.deliveryZone === 'outside_dhaka'}
                          onChange={() => setFormData({ ...formData, deliveryZone: 'outside_dhaka' })}
                          className="accent-[#D85A30] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-bold font-serif-bangla text-[#3A2A1E]">
                          ঢাকা সিটির বাইরে
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-black font-sans">
                        {isFreeDeliveryQualified ? (
                          <span className="text-[#1B5E20] font-black font-serif-bangla">🚚 ফ্রি ডেলিভারি (0 TK)</span>
                        ) : (
                          <span className="text-[#D85A30]">130 TK</span>
                        )}
                      </span>
                    </label>
                  </div>

                  {!isFreeDeliveryQualified && (
                    <p className="text-[11px] text-[#888780] font-serif-bangla mt-2">
                      💡 ৫ কেজি প্যাকেজ অর্ডার করলেই পাচ্ছেন সম্পূর্ণ ফ্রি হোম ডেলিভারি!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 3: ORDER SUMMARY & CASH ON DELIVERY PROMISE */}
            <div className="bg-white rounded-3xl border border-[#D85A30]/20 shadow-sm p-4 sm:p-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold font-serif-bangla text-[#3A2A1E] flex items-center gap-2 border-b border-[#D85A30]/15 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#D85A30] text-white text-xs flex items-center justify-center font-bold">৩</span>
                <span>অর্ডার বিবরণী ও পেমেন্ট</span>
              </h3>

              {/* Items Table */}
              <div className="divide-y divide-[#D85A30]/10 border border-[#D85A30]/15 rounded-2xl overflow-hidden">
                <div className="p-3 bg-[#FAEEDA]/60 flex items-center justify-between text-xs font-bold text-[#3A2A1E]">
                  <span>নির্বাচিত আইটেম</span>
                  <span>মূল্য</span>
                </div>

                {activeSelectedList.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#888780]">
                    কোনো প্যাকেজ সিলেক্ট করা হয়নি। উপরে গিয়ে প্যাকেজ নির্বাচন করুন।
                  </div>
                ) : (
                  activeSelectedList.map(item => (
                    <div key={item.id} className="p-3 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-bold text-[#3A2A1E] font-serif-bangla truncate">
                          {item.name}
                        </span>
                        <span className="text-[#888780] font-black">× {item.quantity}</span>
                      </div>
                      <span className="font-black text-[#D85A30] shrink-0 font-mono">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}

                {/* Subtotal */}
                <div className="p-3 flex items-center justify-between text-xs bg-[#FAF6EE]/50">
                  <span className="font-medium text-[#3A2A1E]/80">সাবটোটাল (Subtotal):</span>
                  <span className="font-bold text-[#3A2A1E] font-mono">৳{subtotal.toLocaleString()}</span>
                </div>

                {/* Delivery */}
                <div className="p-3 flex items-center justify-between text-xs bg-[#FAF6EE]/50">
                  <span className="font-medium text-[#3A2A1E]/80">ডেলিভারি চার্জ:</span>
                  <span className={`font-bold ${isFreeDeliveryQualified ? 'text-[#1B5E20]' : 'text-[#3A2A1E]'} font-mono`}>
                    {isFreeDeliveryQualified ? '🚚 সম্পূর্ণ ফ্রি (0 TK)' : `৳${shippingFee}`}
                  </span>
                </div>

                {/* Total */}
                <div className="p-4 flex items-center justify-between text-sm sm:text-base bg-[#FAEEDA]/80 font-bold border-t-2 border-[#D85A30]/20">
                  <span className="text-[#3A2A1E] font-serif-bangla">সর্বমোট প্রদেয় বিল (Total):</span>
                  <span className="text-xl sm:text-2xl font-black text-[#D85A30] font-mono">
                    ৳{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Cash On Delivery Guarantee Box (Bilrong/Nokshi standard) */}
              <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#81C784]/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1B5E20] font-serif-bangla">
                    ক্যাশ অন ডেলিভারি (Cash On Delivery)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1B5E20] mt-0.5 font-serif-bangla font-semibold">
                    আমি অবশ্যই পণ্যটি গ্রহণ করব এবং পণ্যটি হাতে পেয়ে চেক করে ডেলিভারিম্যানকে টাকা পরিশোধ করব, ইনশাআল্লাহ।
                  </p>
                </div>
              </div>

              {/* CONFIRM ORDER BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || activeSelectedList.length === 0}
                  className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-[#D85A30] hover:bg-[#c24e27] active:scale-[0.99] text-white font-serif-bangla font-black text-lg sm:text-xl transition-all shadow-xl hover:shadow-2xl shadow-[#D85A30]/40 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                  id="place-order-submit-btn"
                >
                  {isSubmitting ? (
                    <span>অর্ডার প্রসেসিং হচ্ছে...</span>
                  ) : (
                    <>
                      <span>অর্ডার কনফার্ম করুন</span>
                      <span className="bg-white/20 px-3 py-1 rounded-xl text-base font-sans font-mono">
                        ৳{totalAmount.toLocaleString()}
                      </span>
                      <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges under button */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] sm:text-xs text-[#888780]">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF6EE]/60">
                  <ShieldCheck className="w-4 h-4 text-[#639922]" />
                  <span>১০০% খাঁটি ও নির্ভেজাল</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF6EE]/60">
                  <Truck className="w-4 h-4 text-[#D85A30]" />
                  <span>সারা দেশে হোম ডেলিভারি</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF6EE]/60">
                  <Lock className="w-4 h-4 text-[#3A2A1E]" />
                  <span>হাতে পেয়ে পেমেন্ট</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* 9. REAL CUSTOMER REVIEWS (Matching Nokshi Pitha / Bilrong quality) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D85A30]/20 space-y-6 shadow-sm">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-[#FAF6EE] text-[#D85A30] text-xs font-black px-3.5 py-1 rounded-full border border-[#D85A30]/20">
              <Star className="w-3.5 h-3.5 fill-[#D85A30] text-[#D85A30]" />
              <span>গ্রাহকদের মূল্যবান প্রতিক্রিয়া (Customer Reviews)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-bangla text-[#3A2A1E]">
              আমাদের চালের গুঁড়া ব্যবহার করে গ্রাহকরা যা বলছেন
            </h3>
            <p className="text-xs sm:text-sm text-[#888780] font-serif-bangla max-w-lg mx-auto">
              সারা দেশ থেকে পিঠাপ্রেমী পরিবাররা আমাদের ঐতিহ্যবাহী চালের গুঁড়ায় মুগ্ধ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAF6EE]/60 rounded-2xl p-4 sm:p-5 border border-[#D85A30]/15 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#639922] bg-[#E8F5E9] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    ভেরিফাইড ক্রেতা
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] font-serif-bangla text-[#3A2A1E] leading-relaxed italic">
                  "বাজারে প্যাকেটজাত চালের গুঁড়ায় কোনো ঘ্রাণ পাই না। কিন্তু অঘ্রাণের ঢেঁকি ছাঁটা গুঁড়া দিয়ে ভাপা আর চিতই বানিয়েছি—একদম ছোটবেলায় গ্রামে খাওয়া পিঠার মতো নরম ও মিষ্টি ঘ্রাণ!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#D85A30]/10">
                <img src={reviewUser1} alt="Customer" className="w-10 h-10 rounded-full object-cover border border-[#D85A30]/20" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#3A2A1E] font-serif-bangla">সুলতানা রহমান</h4>
                  <p className="text-[11px] text-[#888780]">উত্তরা, ঢাকা</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF6EE]/60 rounded-2xl p-4 sm:p-5 border border-[#D85A30]/15 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#639922] bg-[#E8F5E9] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    ভেরিফাইড ক্রেতা
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] font-serif-bangla text-[#3A2A1E] leading-relaxed italic">
                  "৫ কেজির প্যাকটা নিয়েছিলাম। চালের গুঁড়াটা সত্যি অসাধারণ মিহি ও তাজা। নকশি পিঠা বানাতে কোনো ফাটাফাটি হয়নি, তেলে ভাজার পর মচমচে হয়েছে। ধন্যবাদ অঘ্রাণ।"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#D85A30]/10">
                <img src={reviewUser2} alt="Customer" className="w-10 h-10 rounded-full object-cover border border-[#D85A30]/20" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#3A2A1E] font-serif-bangla">ফাতিমা জোহরা</h4>
                  <p className="text-[11px] text-[#888780]">ধানমন্ডি, ঢাকা</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF6EE]/60 rounded-2xl p-4 sm:p-5 border border-[#D85A30]/15 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#639922] bg-[#E8F5E9] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    ভেরিফাইড ক্রেতা
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] font-serif-bangla text-[#3A2A1E] leading-relaxed italic">
                  "ঢাকার বাইরে দ্রুত ডেলিভারি পেয়েছি। চালের কোয়ালিটি ১০০% নির্ভেজাল, কোনো বালু বা কণা নেই। চিতই পিঠা খুব সুন্দর ফুলেছে। আবার অর্ডার করবো ইনশাআল্লাহ।"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#D85A30]/10">
                <img src={reviewUser3} alt="Customer" className="w-10 h-10 rounded-full object-cover border border-[#D85A30]/20" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#3A2A1E] font-serif-bangla">তানভীর আহমেদ</h4>
                  <p className="text-[11px] text-[#888780]">সিলেট সদর</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 10. FAQ SECTION */}
        <div className="bg-white rounded-3xl border border-[#D85A30]/20 p-5 sm:p-7 space-y-4 shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold font-serif-bangla text-[#3A2A1E] text-center">
            সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
          </h3>
          <div className="space-y-3 max-w-2xl mx-auto">
            <details className="p-3.5 rounded-2xl bg-[#FAF6EE]/60 border border-[#D85A30]/15 group cursor-pointer">
              <summary className="font-bold text-sm text-[#3A2A1E] font-serif-bangla list-none flex items-center justify-between">
                <span>১. এটি কি সত্যিই কাঠের ঢেঁকিতে ছাঁটা?</span>
                <ChevronRight className="w-4 h-4 text-[#D85A30] group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-xs text-[#5D4A3A] font-serif-bangla mt-2 pt-2 border-t border-[#D85A30]/10 leading-relaxed">
                হ্যাঁ, শতভাগ নিশ্চিত থাকুন। উত্তরবঙ্গের পল্লী গ্রামের ঐতিহ্যবাহী কাঠের ঢেঁকিতে মা-বোনদের হাতে ধীরে ধীরে কুটে এই আতপ চালের গুঁড়া তৈরি করা হয়।
              </p>
            </details>

            <details className="p-3.5 rounded-2xl bg-[#FAF6EE]/60 border border-[#D85A30]/15 group cursor-pointer">
              <summary className="font-bold text-sm text-[#3A2A1E] font-serif-bangla list-none flex items-center justify-between">
                <span>২. কত দিন ভালো থাকবে এবং কীভাবে রাখব?</span>
                <ChevronRight className="w-4 h-4 text-[#D85A30] group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-xs text-[#5D4A3A] font-serif-bangla mt-2 pt-2 border-t border-[#D85A30]/10 leading-relaxed">
                শুকনো এয়ারটাইট পাত্রে বা বয়ামে রাখলে স্বাভাবিক তাপমাত্রায় ৩ মাস পর্যন্ত সম্পূর্ণ ভালো থাকে। মাঝে মাঝে রোদে দিলে আরও বেশি দিন সংরক্ষণ করা যায়।
              </p>
            </details>

            <details className="p-3.5 rounded-2xl bg-[#FAF6EE]/60 border border-[#D85A30]/15 group cursor-pointer">
              <summary className="font-bold text-sm text-[#3A2A1E] font-serif-bangla list-none flex items-center justify-between">
                <span>৩. ডেলিভারি কত দিনে পাব এবং টাকা কীভাবে দেব?</span>
                <ChevronRight className="w-4 h-4 text-[#D85A30] group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-xs text-[#5D4A3A] font-serif-bangla mt-2 pt-2 border-t border-[#D85A30]/10 leading-relaxed">
                ঢাকা সিটির ভিতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৩ কার্যদিবসে ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি পাবেন। কোনো অগ্রিম পেমেন্ট নেই।
              </p>
            </details>
          </div>
        </div>

        {/* 11. QUICK CONTACT FOOTER */}
        <div className="text-center py-6 px-4 bg-[#FFF5EB] border border-[#D85A30]/25 rounded-3xl shadow-sm space-y-3">
          <p className="text-base sm:text-lg font-bold font-serif-bangla text-[#D85A30]">
            Aghran - অঘ্রাণ • খাঁটি স্বাদের নিশ্চয়তা
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+8801752421224"
              className="inline-flex items-center gap-2 bg-[#D85A30] hover:bg-[#b84218] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>কল করুন: 01752-421224</span>
            </a>
            <a
              href="https://wa.me/8801752421224?text=আমি ঢেঁকি ছাঁটা আতপ চালের গুঁড়া অর্ডার করতে চাই"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#19910f] hover:bg-[#157a0d] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপ মেসেজ</span>
            </a>
          </div>
          <p className="text-[11px] text-[#888780] font-serif-bangla">
            © {new Date().getFullYear()} Aghran. All rights reserved.
          </p>
        </div>

      </div>

      {/* 12. STICKY MOBILE BOTTOM BAR FOR QUICK ORDER JUMP */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#D85A30]/20 p-3 sm:hidden z-30 shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] text-[#888780] block font-serif-bangla leading-none">
            ঢেঁকি ছাঁটা আতপ চালের গুঁড়া
          </span>
          <span className="text-base font-black text-[#D85A30] font-mono leading-tight">
            ৳{totalAmount.toLocaleString()}
          </span>
        </div>
        <button
          type="button"
          onClick={() => scrollToOrder()}
          className="flex-1 py-3 px-4 bg-[#D85A30] hover:bg-[#b84218] text-white font-serif-bangla font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>অর্ডার করুন</span>
        </button>
      </div>

      {/* 13. LIGHTBOX MODAL */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImg(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full z-10 transition-colors shadow-md cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={lightboxImg} 
              alt="প্রোডাক্ট ছবি" 
              className="w-full h-auto rounded-2xl object-cover max-h-[80vh]" 
            />
          </div>
        </div>
      )}

    </div>
  );
};
