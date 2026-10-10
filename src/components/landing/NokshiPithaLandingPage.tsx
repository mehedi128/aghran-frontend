import React, { useState, useMemo, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Flame, 
  ArrowUpRight, 
  Lock,
  ShoppingBag,
  X,
  Images
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductVariant, CartItem, OrderCustomerInfo } from '../../types';
import { TESTIMONIALS } from '../../data/products';
import { sendNokshiOrderToGoogleSheet } from '../../services/googleSheetsService';
import { trackInitiateCheckout, trackPurchase } from '../../services/facebookTrackingService';

// Product Images
import nokshiJhinukComboImg from '../../assets/images/nokshi_jhinuk_combo.jpg';
import pataNokshiImg1 from '../../assets/images/pata_n0.png';
import pataNokshiImg2 from '../../assets/images/pata_n1.png';
import phulNokshiImg from '../../assets/images/pn0.png';
import jhinukNokshiImg from '../../assets/images/jn0.png';
import jhinukNokshiImg2 from '../../assets/images/jn1.jpg';
import nokshi2kgOfferImg from '../../assets/images/nokshi_2kg_free_delivery.jpg';

// Gallery Real Photos (npk/nkp folder)
import nkp001Img from '../../assets/images/nkp/nkp001.jpg';
import nkp003Img from '../../assets/images/nkp/nkp003.jpg';
import nkp005Img from '../../assets/images/nkp/nkp005.jpg';
import nkp006Img from '../../assets/images/nkp/nkp006.jpg';

interface PithaOption {
  id: string;
  productId: string;
  name: string;
  nameEnglish: string;
  weight: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  description?: string;
  freeDelivery?: boolean;
  highlight?: boolean;
}

export const NokshiPithaLandingPage: React.FC = () => {
  const { products, placeOrder, navigateTo } = useStore();

  // Target pitha options: Nokshi Pitha (2kg, 1kg, 500g) and Nokshi & Jhinuk Special Combo (2kg, 1kg)
  const pithaOptions: PithaOption[] = useMemo(() => [
    {
      id: 'opt-nokshi-2kg',
      productId: 'pitha-1',
      name: 'নকশি পিঠা (২ কেজি)',
      nameEnglish: 'Nokshi Pitha (2 kg)',
      weight: '2 kg',
      price: 1299,
      originalPrice: 1450,
      image: pataNokshiImg1,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    },
    {
      id: 'opt-nokshi-1kg',
      productId: 'pitha-1',
      name: 'নকশি পিঠা (১ কেজি)',
      nameEnglish: 'Nokshi Pitha (1 kg)',
      weight: '1 kg',
      price: 650,
      originalPrice: 799,
      image: pataNokshiImg1
    },
    {
      id: 'opt-nokshi-500g',
      productId: 'pitha-1',
      name: 'নকশি পিঠা (৫০০ গ্রাম)',
      nameEnglish: 'Nokshi Pitha (500g)',
      weight: '500g',
      price: 399,
      originalPrice: 499,
      image: pataNokshiImg1
    },
    {
      id: 'opt-combo-2kg',
      productId: 'pitha-combo-pack',
      name: 'নকশি ও ঝিনুক স্পেশাল কম্বো (২ কেজি)',
      nameEnglish: 'Nokshi & Jhinuk Special Combo (2 kg)',
      description: 'নকশি ১ কেজি + ঝিনুক ১ কেজি (মোট ২ কেজি)',
      weight: '2 kg',
      price: 1299,
      originalPrice: 1550,
      image: nokshiJhinukComboImg,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true,
      highlight: true
    },
    {
      id: 'opt-combo-1kg',
      productId: 'pitha-combo-pack',
      name: 'নকশি ও ঝিনুক স্পেশাল কম্বো (১ কেজি)',
      nameEnglish: 'Nokshi & Jhinuk Special Combo (1 kg)',
      description: 'নকশি ৫০০ গ্রাম + ঝিনুক ৫০০ গ্রাম (মোট ১ কেজি)',
      weight: '1 kg',
      price: 699,
      originalPrice: 850,
      image: nokshiJhinukComboImg
    }
  ], []);

  // 24-Hour Rolling Countdown Timer that automatically resets every 24 hours (at midnight)
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    
    const diff = midnight.getTime() - now.getTime();
    if (diff <= 0) {
      return { hours: 23, minutes: 59, seconds: 59 };
    }
    
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Selected State: Map of optionId -> quantity
  // Default selected: 2kg Nokshi Pitha
  const [selectedItems, setSelectedItems] = useState<{ [optionId: string]: number }>({
    'opt-nokshi-2kg': 1
  });

  // Photo Gallery State
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // Photo Gallery Items (User specified: nkp001, nkp003, nkp005, nkp006 in 2-column grid)
  const galleryImages = useMemo(() => [
    { src: nkp001Img, title: 'ঐতিহ্যবাহী হাতে তৈরি নকশি পিঠা' },
    { src: nkp003Img, title: 'নিখুঁত কারুকাজের ফুল নকশি পিঠা' },
    { src: nkp005Img, title: 'ঘরোয়া তৈরি বিভিন্ন ডিজাইনের নকশি পিঠা' },
    { src: nkp006Img, title: 'ফ্রেশ ও মচমচে স্পেশাল ঝিনুক পিঠা' },
  ], []);

  // Customer Delivery Info
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

  // Toggle Item checkbox
  const handleToggleItem = (optionId: string) => {
    setSelectedItems(prev => {
      const current = prev[optionId] || 0;
      if (current > 0) {
        const next = { ...prev };
        delete next[optionId];
        return next;
      } else {
        return { ...prev, [optionId]: 1 };
      }
    });
  };

  // Modify quantity (+ / -)
  const handleQuantityChange = (optionId: string, newQty: number) => {
    setSelectedItems(prev => {
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[optionId];
        return next;
      }
      return { ...prev, [optionId]: newQty };
    });
  };

  // Calculations
  const activeSelectedList = useMemo(() => {
    return Object.entries(selectedItems)
      .filter(([_, qty]) => Number(qty) > 0)
      .map(([id, qty]) => {
        const opt = pithaOptions.find(o => o.id === id);
        return {
          ...opt!,
          quantity: Number(qty)
        };
      })
      .filter(item => Boolean(item.id));
  }, [selectedItems, pithaOptions]);

  const subtotal = useMemo(() => {
    return activeSelectedList.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [activeSelectedList]);

  // Check if eligible for Free Delivery: if any item has freeDelivery or 2kg+ or subtotal >= 1200
  const isFreeDeliveryQualified = useMemo(() => {
    const hasFreeItem = activeSelectedList.some(item => item.freeDelivery);
    const totalWeightKg = activeSelectedList.reduce((acc, item) => {
      if (item.weight === '2 kg') return acc + (2 * item.quantity);
      if (item.weight === '1 kg') return acc + (1 * item.quantity);
      if (item.weight === '500g') return acc + (0.5 * item.quantity);
      return acc + (1 * item.quantity);
    }, 0);
    return hasFreeItem || totalWeightKg >= 2 || subtotal >= 1200;
  }, [activeSelectedList, subtotal]);

  const shippingFee = useMemo(() => {
    if (activeSelectedList.length === 0) return 0;
    if (isFreeDeliveryQualified) return 0;
    return formData.deliveryZone === 'dhaka' ? 80 : 130;
  }, [activeSelectedList.length, isFreeDeliveryQualified, formData.deliveryZone]);

  const totalAmount = subtotal + shippingFee;

  // Validation
  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (activeSelectedList.length === 0) {
      errs.items = 'অনুগ্রহ করে কমপক্ষে একটি পিঠার প্যাকেজ সিলেক্ট করুন।';
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
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const orderCartItems: CartItem[] = activeSelectedList.map(item => {
        const matchedProduct = products.find(p => p.id === item.productId || p.slug === item.productId) || products[0];
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
      });

      // Facebook tracking & Dedicated Nokshi Google Sheet integration
      trackPurchase(createdOrder);
      await sendNokshiOrderToGoogleSheet(createdOrder);

      navigateTo('order-success');
    } catch (err) {
      console.error('Order error:', err);
      navigateTo('order-success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#3A2A1E] font-bangla pb-16">
      {/* MAIN CHECKOUT CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8" id="buynow">
        
        {/* 1. TOP NOTICE & INSTRUCTIONS BANNER (EXACTLY AS SCREENSHOT) */}
        <div className="text-center space-y-4">
          
          {/* Highlighted Yellow/Gold Trust Banner */}
          <div className="bg-gradient-to-r from-[#FFF9E6] via-[#FFF3CC] to-[#FFF9E6] border-2 border-[#E59E27] rounded-2xl p-4 sm:p-6 text-center shadow-md max-w-4xl mx-auto">
            <p className="text-lg sm:text-2xl md:text-3xl font-serif-bangla text-[#3A2A1E] leading-snug">
              <span className="bg-[#FFE066] text-[#7A270D] px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl font-black inline-block shadow-sm">
                🔥 অর্ডারের পর ফ্রেশ ভেজে দেওয়া হয় • কোনো খোলা বা পোড়া তেল ব্যবহার করা হয় না
              </span>
            </p>
          </div>

          {/* 2kg Nokshi Pitha Free Delivery Offer Banner Image */}
          <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-lg border-2 border-[#D85A30]/20 bg-white">
            <img 
              src={nokshi2kgOfferImg} 
              alt="২ কেজি নকশি পিঠা অর্ডার করলে ফ্রি হোম ডেলিভারি" 
              className="w-full h-auto object-cover rounded-3xl"
            />
          </div>

          {/* 24-HOUR COUNTDOWN TIMER SECTION */}
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-3xl border-2 border-red-400/40 p-5 sm:p-6 shadow-xl shadow-red-600/25 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-black font-serif-bangla text-white drop-shadow-sm">
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-300 animate-bounce shrink-0" />
              <span>🔥 বিঃদ্রঃ অফারটি সীমিত সময়ের জন্য 🔥</span>
            </div>

            {/* Countdown Boxes */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 font-mono">
              {/* Hours Box */}
              <div className="flex flex-col items-center justify-center bg-white text-red-600 px-3.5 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl shadow-lg min-w-[72px] sm:min-w-[95px]">
                <span className="text-2xl sm:text-4xl font-black tracking-tight leading-none text-red-600">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs font-sans font-bold tracking-wider uppercase text-gray-700 mt-1">
                  Hours
                </span>
              </div>

              <span className="text-xl sm:text-3xl font-black text-white -mt-3">:</span>

              {/* Minutes Box */}
              <div className="flex flex-col items-center justify-center bg-white text-red-600 px-3.5 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl shadow-lg min-w-[72px] sm:min-w-[95px]">
                <span className="text-2xl sm:text-4xl font-black tracking-tight leading-none text-red-600">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs font-sans font-bold tracking-wider uppercase text-gray-700 mt-1">
                  Minutes
                </span>
              </div>

              <span className="text-xl sm:text-3xl font-black text-white -mt-3">:</span>

              {/* Seconds Box */}
              <div className="flex flex-col items-center justify-center bg-white text-red-600 px-3.5 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl shadow-lg min-w-[72px] sm:min-w-[95px]">
                <span className="text-2xl sm:text-4xl font-black tracking-tight leading-none text-red-600">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs font-sans font-bold tracking-wider uppercase text-gray-700 mt-1">
                  Seconds
                </span>
              </div>
            </div>

            {/* Order Now Button (Configured to #19910f) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('package-selection');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#19910f] hover:bg-[#157a0d] text-white font-black font-serif-bangla text-base sm:text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-[#19910f]/30 hover:shadow-xl transition-all transform active:scale-95 cursor-pointer border border-white/25"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>অর্ডার করুন এখনই</span>
              </button>
            </div>
          </div>

          {/* PHOTO GALLERY SECTION (2 COLUMNS - 4/6 ASPECT RATIO) */}
          <div className="max-w-3xl mx-auto space-y-4 pt-3">
            <div className="flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl font-bold font-serif-bangla text-[#3A2A1E]">
              <Images className="w-5 h-5 text-[#D85A30]" />
              <span>আমাদের হাতে তৈরি খাঁটি নকশি ও ঝিনুক পিঠার অরিজিনাল ছবির গ্যালারি</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
              {galleryImages.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedGalleryImg(item.src)}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border-2 border-[#D85A30]/25 shadow-md aspect-[4/6] cursor-pointer active:scale-95 transition-all duration-300 hover:shadow-xl hover:border-[#D85A30]/50"
                  style={{ aspectRatio: '4/6' }}
                >
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 sm:p-4 text-center">
                    <p className="text-white font-serif-bangla font-bold text-xs sm:text-sm md:text-base drop-shadow-md">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Instruction Text */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-serif-bangla text-[#3A2A1E] leading-relaxed max-w-3xl mx-auto px-2">
            অর্ডার করতে নিচের ফর্মে আপনার নাম, পূর্ণ ঠিকানা এবং মোবাইল নং লিখুন। তারপর নিচে <span className="text-[#B84218] font-black">অর্ডার কনফার্ম করুন</span> বাটনে ক্লিক করুন। আপনার অর্ডারটি সঠিকভাবে সম্পন্ন হবে। যদি এখানে অর্ডার করতে না পারেন আমাদের পেজের ইনবক্সে নক করুন অথবা কল করুন
          </h1>

          {/* Action Buttons: Call & WhatsApp */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 pb-2 sm:pt-6 sm:pb-4">
            <a
              href="tel:+8801752421224"
              className="inline-flex items-center justify-center gap-2.5 bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-sm sm:text-base px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Phone className="w-5 h-5" />
              <span>কল করুন: 01752-421224</span>
            </a>
            <a
              href="https://wa.me/8801752421224?text=আমি নকশি ও ঝিনুক পিঠা অর্ডার করতে চাই"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#19910f] hover:bg-[#157a0d] text-white font-bold text-sm sm:text-base px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>হোয়াটসঅ্যাপে মেসেজ করুন</span>
            </a>
          </div>
        </div>

        {/* 2. PRODUCT SELECTION CARD (STEP 1) */}
        <div id="package-selection" className="bg-white rounded-3xl border border-[#D85A30]/20 shadow-sm p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#D85A30]/15 pb-3">
            <h2 className="text-base sm:text-lg font-bold font-serif-bangla text-[#3A2A1E] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#D85A30] text-white text-xs flex items-center justify-center font-bold">১</span>
              <span>পিঠার পরিমাণ ও প্যাকেজ সিলেক্ট করুন</span>
            </h2>
            <span className="text-xs text-[#888780] font-medium hidden sm:inline">
              (এক বা একাধিক সিলেক্ট করতে পারেন)
            </span>
          </div>

          {errors.items && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold">
              {errors.items}
            </div>
          )}

          {/* List of Product Options */}
          <div className="space-y-3">
            {pithaOptions.map((option) => {
              const isSelected = (selectedItems[option.id] || 0) > 0;
              const quantity = selectedItems[option.id] || 0;

              return (
                <div
                  key={option.id}
                  onClick={() => handleToggleItem(option.id)}
                  className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isSelected
                      ? option.freeDelivery
                        ? 'border-[#2E7D32] bg-[#E8F5E9]/70 shadow-md ring-2 ring-[#2E7D32]/50'
                        : option.highlight
                          ? 'border-[#D85A30] bg-[#FAEEDA]/90 shadow-md ring-2 ring-[#D85A30]/50'
                          : 'border-[#D85A30] bg-[#FAEEDA]/40 shadow-md ring-1 ring-[#D85A30]/50'
                      : option.freeDelivery
                        ? 'border-[#81C784]/80 bg-gradient-to-r from-[#F1F8E9] via-[#FFFDE7] to-[#F1F8E9] hover:border-[#2E7D32] shadow-xs'
                        : option.highlight
                          ? 'border-[#D85A30]/50 bg-gradient-to-r from-[#FFF9E6] via-[#FFF3CC]/50 to-[#FFF9E6] hover:border-[#D85A30] shadow-sm ring-1 ring-[#D85A30]/20'
                          : 'border-[#D85A30]/15 bg-white hover:border-[#D85A30]/40 hover:bg-[#FAF6EE]/50'
                  }`}
                >
                  {/* Top Badge (Free Delivery pill) */}
                  {option.badge && (
                    <div className="absolute -top-2.5 left-4 z-10">
                      <span className={`text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider ${
                        option.freeDelivery
                          ? 'bg-[#1B5E20] text-white border border-[#81C784]/70'
                          : 'bg-[#D85A30] text-white'
                      }`}>
                        {option.badge}
                      </span>
                    </div>
                  )}

                  {/* Left: Checkbox + Thumbnail + Title */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleItem(option.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 text-[#D85A30] rounded border-gray-300 focus:ring-[#D85A30] cursor-pointer shrink-0"
                    />

                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-[#D85A30]/20 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif-bangla font-bold text-sm sm:text-base text-[#3A2A1E] leading-snug">
                        {option.name}
                      </h3>
                      {option.description && (
                        <p className="text-xs text-[#888780] font-serif-bangla mt-0.5 leading-snug">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Quantity Selector + Price */}
                  <div 
                    className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D85A30]/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Quantity modifier (+/-) */}
                    <div className="flex items-center border border-[#D85A30]/30 rounded-xl bg-[#FAF6EE] shadow-xs overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(option.id, (selectedItems[option.id] || 0) - 1)}
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
                        onClick={() => handleQuantityChange(option.id, (selectedItems[option.id] || 0) + 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm font-black text-[#3A2A1E] hover:bg-[#D85A30] hover:text-white transition-colors cursor-pointer"
                        title="বাড়িয়ে দিন"
                      >
                        +
                      </button>
                    </div>

                    {/* Price display */}
                    <div className="text-right min-w-[75px]">
                      <span className="text-base sm:text-lg font-black text-[#D85A30] block font-mono">
                        ৳{(option.price * (quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. CUSTOMER DETAILS FORM & CHECKOUT (STEP 2 & 3) */}
        <form onSubmit={handleSubmitOrder} className="space-y-8" id="checkout-form-section">
          
          {/* STEP 2: CUSTOMER SHIPPING INFO */}
          <div className="bg-white rounded-3xl border border-[#D85A30]/20 shadow-sm p-4 sm:p-6 space-y-4">
            <h2 className="text-base sm:text-lg font-bold font-serif-bangla text-[#3A2A1E] flex items-center gap-2 border-b border-[#D85A30]/15 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#D85A30] text-white text-xs flex items-center justify-center font-bold">২</span>
              <span>আপনার নাম, ঠিকানা ও মোবাইল নাম্বার দিন</span>
            </h2>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#3A2A1E] mb-1 font-serif-bangla">
                  আপনার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="সম্পূর্ণ নাম লিখুন"
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

              {/* Delivery Address */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#3A2A1E] mb-1 font-serif-bangla">
                  সম্পূর্ণ ঠিকানা (বাসা/রোড, থানা, জেলা) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  placeholder="রোড নং, বাড়ি/ফ্ল্যাট নং, এলাকা, থানা ও জেলার নাম বিস্তারিত লিখুন..."
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
                      🎉 ২ কেজি বা তার বেশি হওয়ায় ফ্রি ডেলিভারি পাচ্ছেন!
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
                  <p className="text-[11px] text-[#888780] font-serif-bangla mt-2 flex items-center gap-1">
                    <span>💡 যেকোনো ২ কেজি বা তার বেশি পিঠা অর্ডার করলেই পাচ্ছেন সম্পূর্ণ ফ্রি হোম ডেলিভারি!</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* STEP 3: ORDER SUMMARY & PAYMENT */}
          <div className="bg-white rounded-3xl border border-[#D85A30]/20 shadow-sm p-4 sm:p-6 space-y-4">
            <h2 className="text-base sm:text-lg font-bold font-serif-bangla text-[#3A2A1E] flex items-center gap-2 border-b border-[#D85A30]/15 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#D85A30] text-white text-xs flex items-center justify-center font-bold">৩</span>
              <span>অর্ডার বিবরণী ও পেমেন্ট</span>
            </h2>

            {/* Selected Items Breakdown Table */}
            <div className="divide-y divide-[#D85A30]/10 border border-[#D85A30]/15 rounded-2xl overflow-hidden">
              <div className="p-3 bg-[#FAEEDA]/60 flex items-center justify-between text-xs font-bold text-[#3A2A1E]">
                <span>নির্বাচিত আইটেম</span>
                <span>মোট মূল্য</span>
              </div>

              {activeSelectedList.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#888780]">
                  কোনো আইটেম সিলেক্ট করা হয়নি। উপরে গিয়ে আইটেম সিলেক্ট করুন।
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

              {/* Delivery charge */}
              <div className="p-3 flex items-center justify-between text-xs bg-[#FAF6EE]/50">
                <span className="font-medium text-[#3A2A1E]/80">ডেলিভারি চার্জ:</span>
                <span className={`font-bold ${isFreeDeliveryQualified ? 'text-[#1B5E20]' : 'text-[#3A2A1E]'} font-mono`}>
                  {isFreeDeliveryQualified ? '🚚 সম্পূর্ণ ফ্রি (0 TK)' : `৳${shippingFee}`}
                </span>
              </div>

              {/* Total */}
              <div className="p-4 flex items-center justify-between text-sm sm:text-base bg-[#FAEEDA]/80 font-bold border-t-2 border-[#D85A30]/20">
                <span className="text-[#3A2A1E] font-serif-bangla">সর্বমোট প্রদেয় বিল (Total):</span>
                <span className="text-xl sm:text-2xl font-black text-[#D85A30] font-mono">
                  ৳{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#81C784]/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B5E20] font-serif-bangla">
                  ক্যাশ অন ডেলিভারি (Cash On Delivery)
                </h4>
                <p className="text-xs sm:text-sm text-[#1B5E20] mt-0.5 font-serif-bangla font-semibold">
                  আমি অবশ্যই পণ্যটি রিসিভ করবো, পণ্যটি হাতে পেয়ে টাকা পরিশোধ করবো, ইনশাআল্লাহ
                </p>
              </div>
            </div>

            {/* BIG CALL TO ACTION PLACE ORDER BUTTON */}
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
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF6EE]/50">
                <ShieldCheck className="w-4 h-4 text-[#639922]" />
                <span>১০০% খাঁটি ও নিরাপদ</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF6EE]/50">
                <Truck className="w-4 h-4 text-[#D85A30]" />
                <span>সারা দেশে হোম ডেলিভারি</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF6EE]/50">
                <Lock className="w-4 h-4 text-[#3A2A1E]" />
                <span>হাতে পেয়ে পেমেন্ট</span>
              </div>
            </div>
          </div>
        </form>

        {/* CUSTOMER REVIEWS & TESTIMONIALS SECTION (MATCHING SCREENSHOT) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D85A30]/20 space-y-6 shadow-sm">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-[#FAF6EE] text-[#D85A30] text-xs font-black px-3.5 py-1 rounded-full border border-[#D85A30]/20">
              <Star className="w-3.5 h-3.5 fill-[#D85A30] text-[#D85A30]" />
              <span>গ্রাহকদের মূল্যবান প্রতিক্রিয়া (Customer Reviews)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-bangla text-[#3A2A1E]">
              আমাদের পিঠা খেয়ে সম্মানিত গ্রাহকরা যা বলছেন
            </h3>
            <p className="text-xs sm:text-sm text-[#888780] font-serif-bangla max-w-lg mx-auto">
              সারা দেশ থেকে শত শত পরিবার অঘ্রাণের খাঁটি পিঠার স্বাদ গ্রহণ করেছেন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FAF6EE]/60 rounded-2xl p-4 sm:p-5 border border-[#D85A30]/15 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#639922] bg-[#E8F5E9] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      ভেরিফাইড ক্রেতা
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] font-serif-bangla text-[#3A2A1E] leading-relaxed italic">
                    "{t.commentBangla || t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#D85A30]/10">
                  {t.avatarUrl ? (
                    <img
                      src={t.avatarUrl}
                      alt={t.authorBangla || t.author}
                      className="w-10 h-10 rounded-full object-cover border border-[#D85A30]/20 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#D85A30]/10 text-[#D85A30] font-bold flex items-center justify-center text-xs shrink-0">
                      {(t.authorBangla || t.author).charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#3A2A1E] font-serif-bangla truncate">
                      {t.authorBangla || t.author}
                    </h4>
                    <p className="text-[11px] text-[#888780] truncate">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER SECTION */}
        <footer className="mt-8 py-5 px-4 text-center bg-[#FFF5EB] border border-[#D85A30]/25 rounded-2xl shadow-sm">
          <p className="text-base sm:text-lg font-bold font-serif-bangla text-[#D85A30]">
            Aghran - অঘ্রাণ
          </p>
          <p className="text-xs sm:text-sm text-[#3A2A1E]/80 font-medium font-serif-bangla mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-[11px] sm:text-xs text-[#888780] font-serif-bangla mt-1">
            বাংলার ঐতিহ্যবাহী ও খাঁটি ঘরে তৈরি নকশি ও ঝিনুক পিঠা
          </p>
        </footer>

        {/* IMAGE PREVIEW LIGHTBOX MODAL */}
        {selectedGalleryImg && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedGalleryImg(null)}
          >
            <div 
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-2.5"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                onClick={() => setSelectedGalleryImg(null)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full z-10 transition-colors shadow-md cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <img 
                src={selectedGalleryImg} 
                alt="পিঠার ছবি" 
                className="w-full h-auto rounded-2xl object-cover max-h-[80vh]" 
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
