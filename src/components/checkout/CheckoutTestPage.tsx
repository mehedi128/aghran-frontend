import React, { useState, useMemo } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  ArrowUpRight, 
  Flame, 
  Package, 
  Heart,
  BadgePercent,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductVariant, CartItem, OrderCustomerInfo } from '../../types';
import { TESTIMONIALS } from '../../data/products';

// Images
import utsabComboImg from '../../assets/images/up0.png';
import pataNokshiImg1 from '../../assets/images/pata_n0.png';
import pataNokshiImg2 from '../../assets/images/pata_n1.png';
import phulNokshiImg from '../../assets/images/pn0.png';
import jhinukNokshiImg from '../../assets/images/jn0.png';
import narikelPuliImg1 from '../../assets/images/narikel_puli_pitha_1.jpg';
import narikelPuliImg2 from '../../assets/images/narikel_puli_pitha_2.jpg';
import nokshiClayImg from '../../assets/images/nokshi_pitha_clay_1787466525945.jpg';

const gurImg = 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80';
const honeyImg = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80';
const gheeImg = 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80';

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

export const CheckoutTestPage: React.FC = () => {
  const { products, placeOrder, navigateTo } = useStore();

  // All Pitha package options available for quick selection
  const pithaOptions: PithaOption[] = useMemo(() => [
    {
      id: 'opt-utsab-2kg',
      productId: 'combo-pitha-utsab',
      name: 'উৎসব কম্বো প্যাক (২ কেজি)',
      nameEnglish: 'Utsab Combo Pack (2 kg) - All in One',
      description: 'নকশি ১ কেজি + ঝিনুক ৫০০ গ্রাম + নারিকেল পুলি ৫০০ গ্রাম',
      weight: '2 kg',
      price: 1350,
      originalPrice: 1650,
      image: utsabComboImg,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true,
      highlight: true
    },
    {
      id: 'opt-utsab-1kg',
      productId: 'pitha-combo-pack',
      name: 'উৎসব কম্বো প্যাক (১ কেজি)',
      nameEnglish: 'Utsab Combo Pack (1 kg)',
      description: 'নকশি ৫০০ গ্রাম + ঝিনুক ২৫০ গ্রাম + নারিকেল পুলি ২৫০ গ্রাম',
      weight: '1 kg',
      price: 699,
      originalPrice: 850,
      image: utsabComboImg
    },
    {
      id: 'opt-pata-2kg',
      productId: 'pitha-1',
      name: 'পাতা নকশি পিঠা (২ কেজি)',
      nameEnglish: 'Pata Nokshi Pitha (2 kg)',
      weight: '2 kg',
      price: 1299,
      originalPrice: 1450,
      image: pataNokshiImg1,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    },
    {
      id: 'opt-pata-1kg',
      productId: 'pitha-1',
      name: 'পাতা নকশি পিঠা (১ কেজি)',
      nameEnglish: 'Pata Nokshi Pitha (1 kg)',
      weight: '1 kg',
      price: 650,
      originalPrice: 799,
      image: pataNokshiImg1
    },
    {
      id: 'opt-pata-500g',
      productId: 'pitha-1',
      name: 'পাতা নকশি পিঠা (৫০০ গ্রাম)',
      nameEnglish: 'Pata Nokshi Pitha (500g)',
      weight: '500g',
      price: 350,
      originalPrice: 499,
      image: pataNokshiImg2
    },
    {
      id: 'opt-phul-2kg',
      productId: 'pitha-2',
      name: 'ফুল নকশি পিঠা (২ কেজি)',
      nameEnglish: 'Phul Nokshi Pitha (2 kg)',
      weight: '2 kg',
      price: 1299,
      originalPrice: 1450,
      image: phulNokshiImg,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    },
    {
      id: 'opt-phul-1kg',
      productId: 'pitha-2',
      name: 'ফুল নকশি পিঠা (১ কেজি)',
      nameEnglish: 'Phul Nokshi Pitha (1 kg)',
      weight: '1 kg',
      price: 650,
      originalPrice: 799,
      image: phulNokshiImg
    },
    {
      id: 'opt-jhinuk-2kg',
      productId: 'pitha-3',
      name: 'ঝিনুক নকশি পিঠা (২ কেজি)',
      nameEnglish: 'Jhinuk Nokshi Pitha (2 kg)',
      weight: '2 kg',
      price: 1299,
      originalPrice: 1450,
      image: jhinukNokshiImg,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    },
    {
      id: 'opt-jhinuk-1kg',
      productId: 'pitha-3',
      name: 'ঝিনুক নকশি পিঠা (১ কেজি)',
      nameEnglish: 'Jhinuk Nokshi Pitha (1 kg)',
      weight: '1 kg',
      price: 650,
      originalPrice: 799,
      image: jhinukNokshiImg
    },
    {
      id: 'opt-puli-2kg',
      productId: 'pitha-4',
      name: 'নারিকেল পুলি পিঠা (২ কেজি)',
      nameEnglish: 'Traditional Narikel Puli (2 kg)',
      weight: '2 kg',
      price: 1799,
      originalPrice: 2100,
      image: narikelPuliImg1,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    },
    {
      id: 'opt-puli-1kg',
      productId: 'pitha-4',
      name: 'নারিকেল পুলি পিঠা (১ কেজি)',
      nameEnglish: 'Traditional Narikel Puli (1 kg)',
      weight: '1 kg',
      price: 950,
      originalPrice: 1150,
      image: narikelPuliImg1
    },
    {
      id: 'opt-puli-500g',
      productId: 'pitha-4',
      name: 'নারিকেল পুলি পিঠা (৫০০ গ্রাম)',
      nameEnglish: 'Traditional Narikel Puli (500g)',
      weight: '500g',
      price: 499,
      originalPrice: 599,
      image: narikelPuliImg2
    },
    {
      id: 'opt-pata-phul-combo',
      productId: 'pitha-combo-pack',
      name: 'পাতা নকশি ১ কেজি + ফুল নকশি ১ কেজি (মোট ২ কেজি)',
      nameEnglish: 'Pata Nokshi 1kg + Phul Nokshi 1kg (2kg)',
      weight: '2 kg',
      price: 1299,
      originalPrice: 1550,
      image: pataNokshiImg1,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    },
    {
      id: 'opt-pata-jhinuk-combo',
      productId: 'pitha-combo-pack',
      name: 'পাতা নকশি ১ কেজি + ঝিনুক নকশি ১ কেজি (মোট ২ কেজি)',
      nameEnglish: 'Pata Nokshi 1kg + Jhinuk Nokshi 1kg (2kg)',
      weight: '2 kg',
      price: 1299,
      originalPrice: 1550,
      image: jhinukNokshiImg,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    },
    {
      id: 'opt-gur-1kg',
      productId: 'mosolla-7',
      name: 'যশোরের খাঁটি দানাদার নলেন পাটালী গুড় (১ কেজি)',
      nameEnglish: 'Pure Jashore Nolen Patali Date Jaggery (1kg)',
      weight: '1 kg',
      price: 650,
      originalPrice: 799,
      image: gurImg,
      badge: '১০০% খাঁটি গুড়'
    },
    {
      id: 'opt-honey-1kg',
      productId: 'top-1',
      name: 'সুন্দরবনের প্রাকৃতিক খলিশা ফুলের মধু (১ কেজি)',
      nameEnglish: 'Sundarban Raw Kholisha Honey (1kg)',
      weight: '2 kg',
      price: 1350,
      originalPrice: 1600,
      image: honeyImg,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    },
    {
      id: 'opt-ghee-1kg',
      productId: 'top-2',
      name: 'পাবনার খাঁটি দানাদার গাওয়া ঘি (১ কেজি)',
      nameEnglish: 'Pabna Pure Gawa Ghee (1kg)',
      weight: '2 kg',
      price: 1650,
      originalPrice: 1950,
      image: gheeImg,
      badge: '🚚 ফ্রি ডেলিভারি',
      freeDelivery: true
    }
  ], []);

  // Selected state: Map of optionId -> quantity (0 if not selected)
  // Default selected: 2kg Utsab Combo Pack
  const [selectedItems, setSelectedItems] = useState<{ [optionId: string]: number }>({
    'opt-utsab-2kg': 1
  });

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

  // Toggle selection
  const handleToggleItem = (optionId: string) => {
    setSelectedItems(prev => {
      const currentQty = prev[optionId] || 0;
      if (currentQty > 0) {
        // If it's the last selected item, keep at least 1 or allow unchecking
        const next = { ...prev };
        delete next[optionId];
        return next;
      } else {
        return { ...prev, [optionId]: 1 };
      }
    });
  };

  // Change quantity
  const handleQuantityChange = (optionId: string, newQty: number) => {
    if (newQty <= 0) {
      setSelectedItems(prev => {
        const next = { ...prev };
        delete next[optionId];
        return next;
      });
    } else {
      setSelectedItems(prev => ({
        ...prev,
        [optionId]: Math.min(20, Math.max(1, newQty))
      }));
    }
  };

  // Quick select an item and smooth scroll to #buynow
  const handleSelectAndScroll = (optionId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [optionId]: (prev[optionId] || 0) > 0 ? prev[optionId] : 1
    }));
    const buynowElem = document.getElementById('buynow');
    if (buynowElem) {
      buynowElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculations
  const activeSelectedList = useMemo(() => {
    return pithaOptions
      .filter(opt => (selectedItems[opt.id] || 0) > 0)
      .map(opt => ({
        ...opt,
        quantity: selectedItems[opt.id]
      }));
  }, [pithaOptions, selectedItems]);

  const subtotal = useMemo(() => {
    return activeSelectedList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [activeSelectedList]);

  // Weight calculator helper
  const getWeightInGrams = (weightStr: string): number => {
    const lower = (weightStr || '').toLowerCase();
    if (lower.includes('2 kg') || lower.includes('2kg') || lower.includes('২ কেজি')) return 2000;
    if (lower.includes('1 kg') || lower.includes('1kg') || lower.includes('১ কেজি')) return 1000;
    if (lower.includes('500g') || lower.includes('500') || lower.includes('৫০০ গ্রাম')) return 500;
    if (lower.includes('250g') || lower.includes('250') || lower.includes('২৫০ গ্রাম')) return 250;
    return 1000;
  };

  const totalWeightInGrams = useMemo(() => {
    return activeSelectedList.reduce((sum, item) => {
      return sum + getWeightInGrams(item.weight) * item.quantity;
    }, 0);
  }, [activeSelectedList]);

  // If total weight is >= 2000g (2kg or more), or if any 2kg freeDelivery item is selected
  const isFreeDeliveryQualified = useMemo(() => {
    if (totalWeightInGrams >= 2000) return true;
    return activeSelectedList.some(item => item.freeDelivery);
  }, [activeSelectedList, totalWeightInGrams]);

  const shippingFee = useMemo(() => {
    if (activeSelectedList.length === 0) return 0;
    if (isFreeDeliveryQualified) return 0;
    return formData.deliveryZone === 'dhaka' ? 80 : 130;
  }, [activeSelectedList, isFreeDeliveryQualified, formData.deliveryZone]);

  const totalAmount = subtotal + shippingFee;

  // Form Validation
  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (activeSelectedList.length === 0) {
      errs.items = 'অনুগ্রহ করে অন্তত একটি পিঠার প্যাকেজ সিলেক্ট করুন।';
    }

    if (!formData.fullName.trim()) {
      errs.fullName = 'আপনার পূর্ণ নাম লিখুন।';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'সচল মোবাইল নাম্বার লিখুন।';
    } else {
      const cleanPhone = formData.phone.replace(/[\s-]/g, '');
      if (!/^(?:\+?880|0)?1[3-9]\d{8}$/.test(cleanPhone)) {
        errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নাম্বার লিখুন (যেমন: 01712345678)।';
      }
    }

    if (!formData.streetAddress.trim()) {
      errs.streetAddress = 'আপনার বিস্তারিত ঠিকানা (রোড, বাসা নং, থানা, জেলা) লিখুন।';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Order Submit
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const formEl = document.getElementById('checkout-form-section');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Build CartItems for placeOrder
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

    setTimeout(() => {
      placeOrder({
        items: orderCartItems,
        customer: formData,
        subtotal: subtotal,
        shippingFee: shippingFee,
        discount: 0,
        total: totalAmount
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#3A2A1E] font-sans pb-16">
      {/* MAIN CHECKOUT CONTAINER */}
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10 space-y-8" id="buynow">
        
        {/* Main Title & Instructions */}
        <div className="text-center space-y-3.5">
          {/* 1st: Highlighted Fresh & Pure Oil Trust Banner */}
          <div className="bg-gradient-to-r from-[#FFF9E6] via-[#FFF3CC] to-[#FFF9E6] border-2 border-[#E59E27] rounded-2xl p-4 sm:p-5 text-center shadow-md max-w-3xl mx-auto">
            <p className="text-base sm:text-xl md:text-2xl font-serif-bangla text-[#3A2A1E] leading-snug">
              <span className="bg-[#FFE066] text-[#7A270D] px-3.5 py-1.5 rounded-xl font-black inline-block shadow-sm">
                🔥 অর্ডারের পর ফ্রেশ ভেজে দেওয়া হয় • কোনো খোলা বা পোড়া তেল ব্যবহার করা হয় না
              </span>
            </p>
          </div>

          <h1 className="text-base sm:text-lg md:text-xl font-bold font-serif-bangla text-[#3A2A1E] leading-relaxed max-w-2xl mx-auto">
            অর্ডার করতে নিচের ফর্মে আপনার নাম, পূর্ণ ঠিকানা এবং মোবাইল নং লিখুন। তারপর নিচে <span className="text-[#B84218] font-black">অর্ডার কনফার্ম করুন</span> বাটনে ক্লিক করুন। আপনার অর্ডারটি সঠিকভাবে সম্পন্ন হবে। যদি এখানে অর্ডার করতে না পারেন আমাদের পেজের ইনবক্সে নক করুন অথবা কল করুন
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="tel:+8801752421224"
              className="inline-flex items-center gap-2 bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>কল করুন: 01752-421224</span>
            </a>
            <a
              href="https://wa.me/8801752421224"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb757] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে মেসেজ করুন</span>
            </a>
          </div>
        </div>

        {/* 2. PRODUCT SELECTION GRID */}
        <div className="bg-white rounded-3xl border border-[#D85A30]/20 shadow-sm p-4 sm:p-6 space-y-4">
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
                        : 'border-[#D85A30] bg-[#FAEEDA]/40 shadow-md ring-1 ring-[#D85A30]/50'
                      : option.freeDelivery
                        ? 'border-[#81C784]/80 bg-gradient-to-r from-[#F1F8E9] via-[#FFFDE7] to-[#F1F8E9] hover:border-[#2E7D32] shadow-xs'
                        : 'border-[#D85A30]/15 bg-white hover:border-[#D85A30]/40 hover:bg-[#FAF6EE]/50'
                  }`}
                >
                  {/* Top Badge (if any) */}
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
                      className="w-5 h-5 text-[#D85A30] rounded border-gray-300 focus:ring-[#D85A30] cursor-pointer flex-shrink-0"
                    />

                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-[#D85A30]/20 flex-shrink-0"
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
                        className="w-8 h-8 flex items-center justify-center text-sm font-black text-[#3A2A1E] hover:bg-[#D85A30] hover:text-white transition-colors"
                        title="কমিয়ে দিন"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs sm:text-sm font-black text-[#3A2A1E]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(option.id, (selectedItems[option.id] || 0) + 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm font-black text-[#3A2A1E] hover:bg-[#D85A30] hover:text-white transition-colors"
                        title="বাড়িয়ে দিন"
                      >
                        +
                      </button>
                    </div>

                    {/* Price display */}
                    <div className="text-right min-w-[70px]">
                      <span className="text-base sm:text-lg font-black text-[#D85A30] block">
                        ৳{(option.price * (quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. CUSTOMER DETAILS FORM */}
        <form onSubmit={handleSubmitOrder} className="space-y-8" id="checkout-form-section">
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
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
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
                        className="text-[#D85A30] focus:ring-[#D85A30] w-4 h-4 cursor-pointer"
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
                        className="text-[#D85A30] focus:ring-[#D85A30] w-4 h-4 cursor-pointer"
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

          {/* 4. ORDER SUMMARY & REVIEW TABLE */}
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
                    <span className="font-black text-[#D85A30] flex-shrink-0">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))
              )}

              {/* Subtotal */}
              <div className="p-3 flex items-center justify-between text-xs bg-[#FAF6EE]/50">
                <span className="font-medium text-[#3A2A1E]/80">সাবটোটাল (Subtotal):</span>
                <span className="font-bold text-[#3A2A1E]">৳{subtotal.toLocaleString()}</span>
              </div>

              {/* Delivery charge */}
              <div className="p-3 flex items-center justify-between text-xs bg-[#FAF6EE]/50">
                <span className="font-medium text-[#3A2A1E]/80">ডেলিভারি চার্জ:</span>
                <span className={`font-bold ${isFreeDeliveryQualified ? 'text-[#1B5E20]' : 'text-[#3A2A1E]'}`}>
                  {isFreeDeliveryQualified ? '🚚 সম্পূর্ণ ফ্রি (০ টাকা)' : `৳${shippingFee}`}
                </span>
              </div>

              {/* Total */}
              <div className="p-4 flex items-center justify-between text-sm sm:text-base bg-[#FAEEDA]/80 font-bold border-t-2 border-[#D85A30]/20">
                <span className="text-[#3A2A1E] font-serif-bangla">সর্বমোট প্রদেয় বিল (Total):</span>
                <span className="text-xl sm:text-2xl font-black text-[#D85A30]">
                  ৳{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#81C784]/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B5E20] font-serif-bangla">
                  ক্যাশ অন ডেলিভারি (Cash On Delivery)
                </h4>
                <p className="text-xs sm:text-sm text-[#1B5E20] mt-0.5 font-serif-bangla font-semibold">
                  আমি অবশ্যই পণ্যটি রিসিভ করবো, পণ্যটি হাতে পেয়ে টাকা পরিশোধ করবো, ইনশাআল্লাহ
                </p>
              </div>
            </div>

            {/* 5. BIG CALL TO ACTION PLACE ORDER BUTTON */}
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
                    <span className="bg-white/20 px-3 py-1 rounded-xl text-base font-sans">
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

        {/* CUSTOMER REVIEWS & TESTIMONIALS SECTION */}
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
                      className="w-10 h-10 rounded-full object-cover border border-[#D85A30]/20 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#D85A30]/10 text-[#D85A30] font-bold flex items-center justify-center text-xs flex-shrink-0">
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
        {/* POPULAR PRODUCTS SHOWCASE (Last section) */}
        <div className="space-y-6 pt-2">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-[#FAEEDA] border border-[#D85A30]/30 text-[#D85A30] text-xs font-black px-3.5 py-1 rounded-full">
              <Flame className="w-3.5 h-3.5 fill-[#D85A30]" />
              <span>আমাদের স্পেশাল পিঠা কালেকশন</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-bangla text-[#3A2A1E]">
              পছন্দের পিঠা সিলেক্ট করে সরাসরি অর্ডার করুন
            </h3>
            <p className="text-xs sm:text-sm text-[#888780] font-serif-bangla max-w-lg mx-auto">
              যেকোনো আইটেমে ক্লিক করলেই উপরের ফর্মে সিলেক্ট হয়ে যাবে এবং সহজে অর্ডার সম্পন্ন করতে পারবেন।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Utsab Combo 2kg Mega Pack */}
            <div className="bg-white rounded-2xl border-2 border-[#D85A30] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={utsabComboImg}
                    alt="উৎসব কম্বো প্যাক ২ কেজি"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#1B5E20] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#81C784]/60 font-serif-bangla">
                    <Truck className="w-3 h-3 text-[#A5D6A7]" />
                    <span>🚚 ফ্রি ডেলিভারি</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      উৎসব কম্বো প্যাক (২ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳১৩৫০</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-utsab-2kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Utsab Combo 1kg */}
            <div className="bg-white rounded-2xl border border-[#D85A30]/20 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={utsabComboImg}
                    alt="উৎসব কম্বো প্যাক ১ কেজি"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#D85A30] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md font-serif-bangla">
                    কম্বো প্যাক
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      উৎসব কম্বো প্যাক (১ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳৬৯৯</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-utsab-1kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 3: Pata Nokshi 1kg */}
            <div className="bg-white rounded-2xl border border-[#D85A30]/20 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={pataNokshiImg1}
                    alt="পাতা নকশি পিঠা"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#3A2A1E]/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md font-serif-bangla">
                    হাতে নকশা করা
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      পাতা নকশি পিঠা (১ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳৬৫০</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-pata-1kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 4: Phul Nokshi 1kg */}
            <div className="bg-white rounded-2xl border border-[#D85A30]/20 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={phulNokshiImg}
                    alt="ফুল নকশি পিঠা"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#3A2A1E]/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md font-serif-bangla">
                    ফুলের কারুকাজ
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      ফুল নকশি পিঠা (১ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳৬৫০</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-phul-1kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 5: Jhinuk Nokshi 1kg */}
            <div className="bg-white rounded-2xl border border-[#D85A30]/20 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={jhinukNokshiImg}
                    alt="ঝিনুক নকশি পিঠা"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#3A2A1E]/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md font-serif-bangla">
                    ঝিনুক নকশা
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      ঝিনুক নকশি পিঠা (১ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳৬৫০</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-jhinuk-1kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 6: Narikel Puli 1kg */}
            <div className="bg-white rounded-2xl border border-[#D85A30]/20 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={narikelPuliImg1}
                    alt="নারিকেল পুলি পিঠা"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#3A2A1E]/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md font-serif-bangla">
                    খাঁটি নারিকেলের পুর
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      নারিকেল পুলি পিঠা (১ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳৯৫০</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-puli-1kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 7: Pata Nokshi 2kg Mega Pack */}
            <div className="bg-white rounded-2xl border-2 border-[#2E7D32]/40 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={pataNokshiImg1}
                    alt="পাতা নকশি পিঠা ২ কেজি"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#1B5E20] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#81C784]/60 font-serif-bangla">
                    <Truck className="w-3 h-3 text-[#A5D6A7]" />
                    <span>🚚 ফ্রি ডেলিভারি</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      পাতা নকশি পিঠা (২ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳১২৯৯</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-pata-2kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 8: Narikel Puli 2kg Mega Pack */}
            <div className="bg-white rounded-2xl border-2 border-[#2E7D32]/40 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={narikelPuliImg1}
                    alt="নারিকেল পুলি পিঠা ২ কেজি"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#1B5E20] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#81C784]/60 font-serif-bangla">
                    <Truck className="w-3 h-3 text-[#A5D6A7]" />
                    <span>🚚 ফ্রি ডেলিভারি</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      নারিকেল পুলি পিঠা (২ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳১৭৯৯</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-puli-2kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 9: Pata + Phul Combo 2kg */}
            <div className="bg-white rounded-2xl border-2 border-[#2E7D32]/40 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={pataNokshiImg1}
                    alt="পাতা + ফুল নকশি কম্বো"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#1B5E20] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#81C784]/60 font-serif-bangla">
                    <Truck className="w-3 h-3 text-[#A5D6A7]" />
                    <span>🚚 ফ্রি ডেলিভারি</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      পাতা ১ কেজি + ফুল ১ কেজি (২ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳১২৯৯</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-pata-phul-combo')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 10: Jashore Nolen Patali Gur */}
            <div className="bg-white rounded-2xl border border-[#D85A30]/20 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={gurImg}
                    alt="যশোরের খাঁটি দানাদার নলেন পাটালী গুড়"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#D85A30] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md font-serif-bangla">
                    ১০০% খাঁটি গুড়
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      যশোরের নলেন পাটালী গুড় (১ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳৬৫০</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-gur-1kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 11: Sundarban Kholisha Honey 1kg */}
            <div className="bg-white rounded-2xl border-2 border-[#2E7D32]/40 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={honeyImg}
                    alt="সুন্দরবনের প্রাকৃতিক খলিশা মধু"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#1B5E20] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#81C784]/60 font-serif-bangla">
                    <Truck className="w-3 h-3 text-[#A5D6A7]" />
                    <span>🚚 ফ্রি ডেলিভারি</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      সুন্দরবনের খলিশা মধু (১ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳১৩৫০</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-honey-1kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 12: Pabna Gawa Ghee 1kg */}
            <div className="bg-white rounded-2xl border-2 border-[#2E7D32]/40 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden bg-[#FAEEDA] relative">
                  <img
                    src={gheeImg}
                    alt="পাবনার খাঁটি দানাদার গাওয়া ঘি"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#1B5E20] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#81C784]/60 font-serif-bangla">
                    <Truck className="w-3 h-3 text-[#A5D6A7]" />
                    <span>🚚 ফ্রি ডেলিভারি</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-bangla font-bold text-base text-[#3A2A1E]">
                      পাবনার খাঁটি গাওয়া ঘি (১ কেজি)
                    </h4>
                    <span className="text-base font-black text-[#D85A30]">৳১৬৫০</span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectAndScroll('opt-ghee-1kg')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D85A30] hover:bg-[#b84218] text-white font-bold text-xs sm:text-sm font-serif-bangla transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>এখনই অর্ডার করুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FLOATING ACTION HELPLINE */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/8801752421224"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
          title="WhatsApp Order Helpline"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

    </div>
  );
};
