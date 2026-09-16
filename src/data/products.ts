import { Product, Testimonial, Coupon } from '../types';
import utsabComboImage from '../assets/images/up0.png';
import pataNokshiImage1 from '../assets/images/pata_n0.png';
import pataNokshiImage2 from '../assets/images/pata_n1.png';
import nokshiPithaImage1 from '../assets/images/nokshi_pitha_village_1787466507600.jpg';
import nokshiPithaImage2 from '../assets/images/nokshi_pitha_clay_1787466525945.jpg';
import narikelPuliImage1 from '../assets/images/narikel_puli_pitha_1.jpg';
import narikelPuliImage2 from '../assets/images/narikel_puli_pitha_2.jpg';
import jhinukPithaImage1 from '../assets/images/jn0.png';
import jhinukPithaImage2 from '../assets/images/jn1.jpg';
import phulNokshiImage1 from '../assets/images/pn0.png';
import phulNokshiImage2 from '../assets/images/pn1.png';
import phulNokshiImage3 from '../assets/images/pn2.png';
import reviewUserImage1 from '../assets/images/review_user_1.jpg';
import reviewUserImage2 from '../assets/images/review_user_2.jpg';
import reviewUserImage3 from '../assets/images/review_user_3.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // ==================== TOP SELLING NOKSHI PITHA PRODUCTS ====================
  {
    id: 'pitha-1',
    slug: 'pata-nokshi-pitha',
    nameBangla: 'পাতা নকশি পিঠা',
    nameEnglish: 'পাতা নকশি পিঠা (Pata Nokshi Pitha)',
    category: 'pitha',
    categoryBangla: 'ঐতিহ্যবাহী পিঠা',
    categoryEnglish: 'Traditional Pitha',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'পাতা নকশি পিঠা আমাদের অন্যতম সেরা ও জনপ্রিয় পিঠার একটি। আমাদের এই পাতা নকশি পিঠাটি এতোটাই মচমচে, খাস্তা আর সুস্বাদু যা খেয়ে আপনি রীতিমতো অবাক হয়ে যাবেন, ব্যাপারটা কিন্তু আসলেই সত্য! আমাদের তৈরী সকল পিঠাতে কোনো রকম এডিশনাল চিনি ব্যবহার করা হয় না। পিঠা মুখে দিলে একটা ওয়েল ব্যালেন্সড টেস্ট ফিল করবেন। আমাদের পাতা নকশি পিঠাটি না খাওয়া পর্যন্ত বুঝবেন না পিঠাটি কি পরিমাণ নিখুঁত আর পারফেক্ট টেস্টি যা আপনাকে একের অধিক পিঠা খেতে রীতিমতো বাধ্য করবে।',
    descriptionEnglish: 'Hand-carved leaf pattern Nokshi Pitha. Extra crisp, balanced sweetness with authentic date jaggery, zero added chemical sugar, fried in pure oil.',
    shortDescription: 'হাতে সুই দিয়ে কাটা নিখুঁত পাতার নকশা, মচমচে খাস্তা ও নো-এডিশনাল কালার পিঠা।',
    ingredients: [
      'চালের গুড়ো।',
      'অথেন্টিক মিঠাই।',
      'নো এডিশনাল কালার ।',
      'সয়াবিন তেল।'
    ],
    features: [
      '১০০% হাতে সুই দিয়ে নিখুঁত কারুকাজ কাটা',
      'কোনো প্রকার কেমিক্যাল নেই',
      'ওয়েল ব্যালেন্সড মিষ্টি ও মুখে মেল্ট হওয়া মচমচে ভাব'
    ],
    stockStatus: 'In Stock',
    stockCount: 50,
    rating: 4.9,
    reviewCount: 128,
    images: [
      pataNokshiImage1,
      pataNokshiImage2
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: 'বেস্ট সেলিং',
    origin: 'পিঠা-পার্ক বাই তানজিলা কিচেন',
    shelfLife: '১৫-২০ দিন (এয়ারটাইট বক্সে সংরক্ষণ করুন)',
    storageAdvice: 'শুকনো ও নরমাল তাপমাত্রার এয়ারটাইট বক্সে সংরক্ষণ করুন। খাওয়ার আগে সামান্য গরম করে নিলে স্বাদ দ্বিগুণ হয়।'
  },
  {
    id: 'pitha-2',
    slug: 'phool-nokshi-pitha',
    nameBangla: 'ফুল নকশি পিঠা',
    nameEnglish: 'ফুল নকশি পিঠা (Phul Nokshi Pitha)',
    category: 'pitha',
    categoryBangla: 'ঐতিহ্যবাহী পিঠা',
    categoryEnglish: 'Traditional Pitha',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'ফুল নকশি পিঠা আমাদের বেস্ট সেলিং প্রোডাক্টের মধ্যে একটি। আমাদের এই ফুল নকশি পিঠাটি এতোটাই মচমচে আর সুস্বাদু যা খেয়ে আপনি রীতিমতো অবাক হয়ে যাবেন, ব্যাপারটা কিন্তু আসলেই সত্য। আমাদের তৈরী সকল পিঠাতে কোনো রকম এডিশনাল চিনি ব্যাবহার করা হয় না। পিঠা মুখে দিলে একটা ওয়েল ব্যালেন্সড টেস্ট ফিল করবেন। আমাদের ফুল নকশি পিঠাটি না খাওয়া পর্যন্ত বুঝবেন না পিঠাটি কি পরিমান সফট আর পারফেক্ট টেস্টি যা আপনাকে একের অধিক পিঠা খেতে রীতিমতো বাধ্য করবে।',
    descriptionEnglish: 'Our flagship Phul Nokshi Pitha. Extremely crunchy, delicious, zero added sugar, made with premium rice flour and authentic date palm jaggery.',
    shortDescription: 'এতোটাই মচমচে আর সুস্বাদু যা আপনাকে একের অধিক পিঠা খেতে বাধ্য করবে!',
    ingredients: [
      'চালের গুড়ো।',
      'অথেন্টিক মিঠাই।',
      'নো এডিশনাল কালার ।',
      'সয়াবিন তেল।'
    ],
    features: [
      '১০০% হাতে সুই দিয়ে নিখুঁত কারুকাজ কাটা',
      'কোনো প্রকার কেমিক্যাল নেই',
      'ওয়েল ব্যালেন্সড মিষ্টি ও মুখে মেল্ট হওয়া মচমচে ভাব'
    ],
    stockStatus: 'In Stock',
    stockCount: 45,
    rating: 5.0,
    reviewCount: 156,
    images: [
      phulNokshiImage1,
      phulNokshiImage2,
      phulNokshiImage3
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: 'বেস্ট সেলিং',
    origin: 'পিঠা-পার্ক বাই তানজিলা কিচেন',
    shelfLife: '২০ দিন (এয়ারটাইট বক্সে সংরক্ষণ করুন)',
    storageAdvice: 'শুকনো কাঁচের বা ফুড-গ্রেড এয়ারটাইট বয়ামে সংরক্ষণ করুন।'
  },
  {
    id: 'pitha-3',
    slug: 'jinuk-nokshi-pitha',
    nameBangla: 'ঝিনুক নকশি পিঠা',
    nameEnglish: 'ঝিনুক নকশি পিঠা (Jhinuk Nokshi Pitha)',
    category: 'pitha',
    categoryBangla: 'ঐতিহ্যবাহী পিঠা',
    categoryEnglish: 'Traditional Pitha',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'ঝিনুক নকশি পিঠা আমাদের গ্রাহকদের আরেকটি অত্যন্ত প্রিয় আইটেম। ঝিনুকের নিখুঁত খাঁজকাটা প্যাটার্নে তৈরি এই পিঠাটি মুখে দিলেই পাবেন এক অপূর্ব মুচমুচে খাস্তা অনুভূতি। আমাদের অন্য সব পিঠার মতোই এতে কোনো প্রকার কৃত্রিম চিনি বা কেমিক্যাল মেশানো হয় না। অথেন্টিক মিঠাইয়ের পরিমিত মিষ্টিতে তৈরি এই পিঠার ব্যালেন্সড স্বাদ বাচ্চা থেকে মুরুব্বি সবার মন কাড়বে। না খাওয়া পর্যন্ত বুঝবেন না এটা কতটা লোভনীয় আর পারফেক্ট টেস্টি!',
    descriptionEnglish: 'Seashell embossed crunchy Jhinuk Nokshi Pitha. Pure rice flour, authentic date jaggery glaze, zero added sugar, highly addictive crunch.',
    shortDescription: 'ঝিনুকের খাঁজকাটা প্যাটার্নের মুচমুচে খাস্তা ও ব্যালেন্সড মিষ্টির পিঠা।',
    ingredients: [
      'চালের গুড়ো।',
      'অথেন্টিক মিঠাই।',
      'নো এডিশনাল কালার ।',
      'সয়াবিন তেল।'
    ],
    features: [
      '১০০% হাতে সুই দিয়ে নিখুঁত কারুকাজ কাটা',
      'কোনো প্রকার কেমিক্যাল নেই',
      'ওয়েল ব্যালেন্সড মিষ্টি ও মুখে মেল্ট হওয়া মচমচে ভাব'
    ],
    stockStatus: 'In Stock',
    stockCount: 40,
    rating: 4.9,
    reviewCount: 110,
    images: [
      jhinukPithaImage1,
      jhinukPithaImage2
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: 'বেস্ট সেলিং',
    origin: 'পিঠা-পার্ক বাই তানজিলা কিচেন',
    shelfLife: '২৫ দিন',
    storageAdvice: 'বাতাস ঢুকবে না এমন জারে সংরক্ষণ করুন যাতে মচমচে ভাব অটুট থাকে।'
  },
  {
    id: 'pitha-combo-pack',
    slug: 'pitha-combo-pack',
    nameBangla: 'উৎসব কম্বো প্যাক ( 1 kg)',
    nameEnglish: 'Utsab Combo Pack (1 kg) - All-in-One Nokshi & Puli Pitha',
    category: 'pitha',
    categoryBangla: 'ঐতিহ্যবাহী পিঠা',
    categoryEnglish: 'Traditional Pitha',
    price: 699,
    originalPrice: 850,
    discountPercentage: 18,
    weight: '1 kg',
    variants: [],
    descriptionBangla: 'পাতা নকশি, ফুল নকশি, ঝিনুক নকশি ও নারিকেল পুলি পিঠার সেরা সমাহার নিয়ে আমাদের উৎসব কম্বো প্যাক (১ কেজি)। আমাদের তৈরি সকল পিঠাতে কোনো প্রকার কেমিক্যাল বা এডিশনাল কালার ব্যবহার করা হয় না। খাঁটি চালের গুঁড়ো ও অথেন্টিক মিঠাইয়ে তৈরি প্রতিটি পিঠা মুখে দিলেই অসাধারণ মচমচে ও ওয়েল-ব্যালেন্সড টেস্ট ফিল করবেন।',
    descriptionEnglish: 'Festival Grand Combo Pack (1 kg) bringing together our signature Pata Nokshi, Phul Nokshi, Jhinuk Nokshi, and traditional Narikel Puli Pitha. 100% pure ingredients with no artificial color, sugar, or preservatives.',
    shortDescription: 'পাতা নকশি, ফুল নকশি, ঝিনুক নকশি ও নারিকেল পুলি পিঠার সেরা ৪টি আইটেম নিয়ে ১ কেজির স্পেশাল উৎসব কম্বো প্যাক।',
    ingredients: [
      'চালের গুড়ো।',
      'অথেন্টিক মিঠাই।',
      'নারিকেল।',
      'নো এডিশনাল কালার ।',
      'সয়াবিন তেল।'
    ],
    features: [
      '১০০% হাতে সুই দিয়ে নিখুঁত কারুকাজ কাটা',
      'কোনো প্রকার কেমিক্যাল নেই',
      'ওয়েল ব্যালেন্সড মিষ্টি ও মুখে মেল্ট হওয়া মচমচে ভাব'
    ],
    stockStatus: 'In Stock',
    stockCount: 50,
    rating: 5.0,
    reviewCount: 248,
    images: [
      utsabComboImage,
      nokshiPithaImage2,
      nokshiPithaImage1
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: 'বেস্ট সেলিং কম্বো',
    origin: 'পিঠা-পার্ক বাই তানজিলা কিচেন',
    shelfLife: '২০-২৫ দিন (এয়ারটাইট বক্সে সংরক্ষণ করুন)',
    storageAdvice: 'শুকনো ও স্বাভাবিক তাপমাত্রায় বাতাস ঢুকবে না এমন এয়ারটাইট বক্সে বা কাঁচের বয়ামে সংরক্ষণ করুন যাতে মচমচে ভাব দীর্ঘ দিন অটুট থাকে।'
  },

  {
    id: 'combo-pitha-utsab',
    slug: 'combo-pitha-utsab',
    nameBangla: 'উৎসব কম্বো প্যাক (2 KG)',
    nameEnglish: 'Utsab Combo Pack (2 kg)',
    category: 'pitha',
    categoryBangla: 'ঐতিহ্যবাহী পিঠা',
    categoryEnglish: 'Traditional Pitha',
    price: 1350,
    originalPrice: 1650,
    discountPercentage: 18,
    weight: '2 kg',
    variants: [],
    descriptionBangla: 'পাতা নকশি, ফুল নকশি, ঝিনুক নকশি ও নারিকেল পুলি পিঠার সেরা সমাহার নিয়ে আমাদের উৎসব কম্বো প্যাক (২  কেজি)। আমাদের তৈরি সকল পিঠাতে কোনো প্রকার কেমিক্যাল বা এডিশনাল কালার ব্যবহার করা হয় না। খাঁটি চালের গুঁড়ো ও অথেন্টিক মিঠাইয়ে তৈরি প্রতিটি পিঠা মুখে দিলেই অসাধারণ মচমচে ও ওয়েল-ব্যালেন্সড টেস্ট ফিল করবেন।',
    descriptionEnglish: 'Festival Grand Combo Pack (2 kg) bringing together our signature Pata Nokshi, Phul Nokshi, Jhinuk Nokshi, and traditional Narikel Puli Pitha. 100% pure ingredients with no chemicals or additional colors.',
    shortDescription: 'পাতা নকশি, ফুল নকশি, ঝিনুক নকশি ও নারিকেল পুলি পিঠার সেরা ৪টি আইটেম নিয়ে ২ কেজির স্পেশাল উৎসব কম্বো প্যাক।',
    ingredients: [
      'চালের গুড়ো।',
      'অথেন্টিক মিঠাই।',
      'নারিকেল।',
      'নো এডিশনাল কালার ।',
      'সয়াবিন তেল।'
    ],
    features: [
      '১০০% হাতে সুই দিয়ে নিখুঁত কারুকাজ কাটা',
      'কোনো প্রকার কেমিক্যাল নেই',
      'ওয়েল ব্যালেন্সড মিষ্টি ও মুখে মেল্ট হওয়া মচমচে ভাব',
      'সম্পূর্ণ ফ্রি হোম ডেলিভারি'
    ],
    stockStatus: 'In Stock',
    stockCount: 35,
    rating: 5.0,
    reviewCount: 82,
    images: [
      utsabComboImage,
      nokshiPithaImage2,
      nokshiPithaImage1
    ],
    isFeatured: true,
    isTopSeller: true,
    freeDelivery: true,
    badge: 'ফ্রি ডেলিভারি',
    origin: 'পিঠা-পার্ক বাই তানজিলা কিচেন',
    shelfLife: '২৫ দিন',
    storageAdvice: 'শুকনো স্থানে এয়ারটাইট বক্সে রাখুন।'
  },

  // ==================== OTHER AUTHENTIC PRODUCTS ====================
  {
    id: 'top-1',
    slug: 'sundarban-honey-1kg',
    nameBangla: 'সুন্দরবনের প্রাকৃতিক খলিশা ফুলের মধু ১ কেজি',
    nameEnglish: 'Sundarban Honey 1kg',
    category: 'mosolla',
    categoryBangla: 'খাঁটি মধু',
    categoryEnglish: 'Pure Honey',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'সুন্দরবনের গভীর অরণ্যের প্রাকৃতিকভাবে সংগৃহীত ১০০% নির্ভেজাল খলিশা ও গরান ফুলের কাঁচা মধু। কোনো প্রকার প্রক্রিয়াজাতকরণ বা চিনি মেশানো ছাড়া সরাসরি মৌয়ালদের কাছ থেকে সংগৃহীত।',
    descriptionEnglish: 'Raw, unpasteurized honey wild-harvested by traditional Mauals from the deep mangrove forests of the Sundarbans. Naturally rich in pollen, antioxidants, and active enzymes.',
    shortDescription: '100% wild-harvested raw honey from deep Sundarban mangrove blossoms.',
    ingredients: ['100% Raw Wildflower Honey (Sundarbans)'],
    features: [
      'Collected directly from wild honeybee hives in the deep Sundarbans',
      'Zero heat treatment, zero sugar syrup adulteration',
      'Naturally thick, floral aroma and distinct deep amber color',
      'Bottled in food-grade airtight bottle'
    ],
    stockStatus: 'In Stock',
    stockCount: 65,
    rating: 5.0,
    reviewCount: 380,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: false,
    badge: 'খাঁটি মধু',
    origin: 'Sundarban Forest Biosphere',
    shelfLife: '24 Months',
    storageAdvice: 'Store at room temperature in a dry place. Do not refrigerate.'
  },
  {
    id: 'top-2',
    slug: 'gawa-ghee-1kg',
    nameBangla: 'পাবনার খাঁটি গাওয়া ঘি ১ কেজি',
    nameEnglish: 'Gawa Ghee 1kg',
    category: 'mosolla',
    categoryBangla: 'খাঁটি ঘি',
    categoryEnglish: 'Organic Ghee',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'পাবনা ও সিরাজগঞ্জের বাথানের দেশি গরুর খাঁটি দুধের মাখন থেকে ঐতিহ্যবাহী পদ্ধতিতে জ্বাল দিয়ে তৈরি খাঁটি দানাদার গাওয়া ঘি। মুখে দিলে মেল্ট হয়ে যাওয়া টেক্সচার আর সুবাস মাতানো খাঁটি ঘ্রাণ।',
    descriptionEnglish: 'Traditional granular golden cow ghee made from fresh cultured butter of pasture-fed cows in Pabna. Slow-cooked over gentle wood fire for that signature nutty aroma.',
    shortDescription: 'Slow-clarified granular cow ghee with intoxicating traditional village aroma.',
    ingredients: ['100% Pure Cow Milk Fat / Cream Butter (দেশি গাওয়া ঘি)'],
    features: [
      'Cultured bilona method preserving essential butyric acids & vitamins',
      'Golden granular texture with rich appetizing aroma',
      'Zero vegetable fat (Dalda) or artificial butter essence'
    ],
    stockStatus: 'In Stock',
    stockCount: 40,
    rating: 4.9,
    reviewCount: 420,
    images: [
      'https://images.unsplash.com/photo-1631709497146-a239ef373cf1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: false,
    badge: 'খাঁটি ঘি',
    origin: 'Pabna Traditional Milk Belt',
    shelfLife: '12 Months',
    storageAdvice: 'Store at room temperature away from moisture.'
  },
  {
    id: 'top-3',
    slug: 'deshi-mustard-oil-5-liter',
    nameBangla: 'কাঠের ঘানি ভাঙা খাঁটি দেশি সরিষার তেল ৫ লিটার',
    nameEnglish: 'Deshi Mustard Oil 5 liter',
    category: 'mosolla',
    categoryBangla: 'সরিষার তেল',
    categoryEnglish: 'Mustard Oil',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'সিরাজগঞ্জ ও নাটোরের দেশি মাঘী সরিষা কাঠের ঘানিতে ধীরে ধীরে কোল্ড-প্রেস করে সংগৃহীত ১০০% ঝাঁঝালো খাঁটি সরিষার তেল। খাঁটি কাঁচা সুবাস ও রান্নার স্বাদ বাড়াতে অতুলনীয়।',
    descriptionEnglish: 'Cold-pressed authentic mustard oil from local Maghi mustard seeds in traditional wooden mills. Pungent, unrefined, and loaded with natural omega-3 fatty acids.',
    shortDescription: 'Wood-pressed pungent raw mustard oil with natural aroma.',
    ingredients: ['100% Deshi First-Press Maghi Mustard Seeds'],
    features: [
      'Cold-pressed in slow-moving wooden ghani',
      'High pungency and natural golden color',
      'Zero chemical extraction, zero palm oil dilution'
    ],
    stockStatus: 'In Stock',
    stockCount: 50,
    rating: 4.9,
    reviewCount: 290,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: false,
    badge: 'ঘানি ভাঙা',
    origin: 'Sirajganj Traditional Ghani',
    shelfLife: '12 Months',
    storageAdvice: 'Store in a cool and dry place away from heat.'
  },
  {
    id: 'top-4',
    slug: 'black-seed-honey-1kg',
    nameBangla: 'খাঁটি কালোজিরা ফুলের মধু ১ কেজি',
    nameEnglish: 'Black Seed Honey 1kg',
    category: 'mosolla',
    categoryBangla: 'কালোজিরা মধু',
    categoryEnglish: 'Black Seed Honey',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'মাঠের কালোজিরা ফুলের প্রস্ফুটন মৌসুমে মৌমাছির তৈরি প্রাকৃতিক কালোজিরা মধু। কালচে লালচে রঙের এই মধু ঔষধি গুণাগুণে ভরপুর ও রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিতে অত্যন্ত কার্যকর।',
    descriptionEnglish: 'Single-origin unheated pure honey produced when bees forage on blooming black cumin (Kalojeera) flower fields. Renowned for its immunity booster properties and distinctive caramel molasses flavor.',
    shortDescription: 'Pure black seed flower nectar honey packed with therapeutic vitality.',
    ingredients: ['100% Pure Black Seed Flower Honey (কালোজিরা ফুলের মধু)'],
    features: [
      'Naturally harvested during black seed flowering season',
      'Rich dark amber color with thick molasses notes',
      '100% natural, chemical-free and unpasteurized'
    ],
    stockStatus: 'In Stock',
    stockCount: 35,
    rating: 4.9,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: false,
    badge: 'কালোজিরা মধু',
    origin: 'Natore Black Cumin Farms',
    shelfLife: '24 Months',
    storageAdvice: 'Store at room temperature.'
  },

  // ==================== MORE PITHA PRODUCTS ====================
  {
    id: 'pitha-4',
    slug: 'narikel-puli-pitha',
    nameBangla: 'নারিকেল পুলি পিঠা',
    nameEnglish: 'Traditional Narikel Puli',
    category: 'pitha',
    categoryBangla: 'ঐতিহ্যবাহী পিঠা',
    categoryEnglish: 'Traditional Pitha',
    price: 499,
    originalPrice: 599,
    discountPercentage: 17,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 499, originalPrice: 599, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 950, originalPrice: 1150, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1799, originalPrice: 2100, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 2599, originalPrice: 2999, inStock: true }
    ],
    descriptionBangla: 'ভাজা নারিকেলের লোভনীয় পুর ও খাঁটি খেজুরের গুড়ে প্রস্তুত নরম সুস্বাদু ঐতিহ্যবাহী নারিকেল পুলি পিঠা। চালের নরম খোলসের ভেতরে রসালো নারিকেল ও এলাচের সুবাস মন ভরিয়ে দেয়।',
    descriptionEnglish: 'Authentic Bengali Narikel Puli dumplings stuffed with a rich, caramelized filling of grated fresh coconut, roasted sesame, and pure date palm jaggery.',
    shortDescription: 'Crescent rice dumplings packed with caramelized grated coconut and date jaggery.',
    ingredients: ['Fresh Grated Coconut (নারিকেল কোরা)', 'Pure Date Jaggery (খেজুর গুড়)', 'Native Rice Flour', 'Green Cardamom', 'Milk Mawa'],
    features: [
      'Stuffed generously with fresh juicy coconut and jaggery',
      'Zero refined sugar — 100% natural date palm sweetness',
      'Prepared fresh with delicate soft outer crescent fold',
      'Hygienic vacuum food-grade packaging'
    ],
    stockStatus: 'In Stock',
    stockCount: 30,
    rating: 4.9,
    reviewCount: 185,
    images: [
      narikelPuliImage1,
      narikelPuliImage2
    ],
    isFeatured: true,
    isTopSeller: false,
    badge: 'রসালো পুর',
    origin: 'Barishal Coconut Groves Kitchen',
    shelfLife: '7 Days (Refrigerated) / 3 Days (Room Temp)',
    storageAdvice: 'Store in refrigerator. Steam or pan-warm for 1-2 minutes before serving.'
  },

  // ==================== MOSOLLA / SPICES CATEGORY ====================
  {
    id: 'mosolla-1',
    slug: 'pure-turmeric-powder',
    nameBangla: 'ঘানি/ঢেঁকি ভাঙা খাঁটি হলুদ গুঁড়া',
    nameEnglish: 'Pure Stone-Ground Turmeric Powder',
    category: 'mosolla',
    categoryBangla: 'মসলা',
    categoryEnglish: 'Spices',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'পাবনা ও নাটোরের বাছাইকৃত দেশি কাঁচা হলুদ রোদে শুকিয়ে নিজস্ব তত্ত্বাবধানে চূর্ণ করা ১০০% নির্ভেজাল হলুদ গুঁড়া। কোনো প্রকার কৃত্রিম রং, ক্ষতিকারক সিসা (Lead Chromate) বা ধানের কুঁড়ার ভেজাল নেই। তরকারিতে দেয় নিখুঁত প্রাকৃতিক সোনালী রং ও ঝাঁঝালো সুবাস।',
    descriptionEnglish: '100% pure native turmeric harvested directly from rural farmers in Natore & Pabna. Naturally sun-dried and slowly stone-milled with zero artificial food dyes or fillers. Imparts a bright golden color and authentic herbal earthiness to your curries.',
    shortDescription: 'Sun-dried native yellow turmeric, cold stone-ground with zero adulteration.',
    ingredients: ['100% Single-Origin Deshi Dried Turmeric Root'],
    features: [
      'Zero lead chromate, zero artificial yellow color, zero chalk powder',
      'High natural curcumin content (verified 4.2%+)',
      'Stone-milled at low temperatures to retain natural essential oils',
      'Airtight food-grade pet container keeps aroma fresh for months'
    ],
    stockStatus: 'In Stock',
    stockCount: 120,
    rating: 4.9,
    reviewCount: 245,
    images: [
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: '100% Pure & Lab Tested',
    origin: 'Natore Organic Farmers Cooperative',
    shelfLife: '12 Months',
    storageAdvice: 'Keep in a cool, dry place away from direct sunlight. Seal cap tightly after each use.'
  },
  {
    id: 'mosolla-2',
    slug: 'pure-chili-powder',
    nameBangla: 'বগুড়ার ঝাল মরিচ গুঁড়া',
    nameEnglish: 'Authentic Bogura Red Chili Powder',
    category: 'mosolla',
    categoryBangla: 'মসলা',
    categoryEnglish: 'Spices',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'মরিচের স্বর্গভূমি উত্তরবঙ্গের বগুড়া থেকে সংগৃহীত সেরা জাতের বোঁটাবিহীন লাল মরিচ। কাঠফাটা রোদে শুকানোর পর কাঠের ঘানি ও পাথরে ধীরে ধীরে গুঁড়া করা। তীব্র ঝাঁঝ ও উজ্জ্বল প্রাকৃতিক রক্তিম রঙের নিশ্চয়তা।',
    descriptionEnglish: 'Sourced from the famous chili heartland of Bogura. Whole red chilies are de-stemmed, thoroughly washed, solar-dried, and ground at controlled speeds to preserve volatile capsaicin oils and vibrant natural redness.',
    shortDescription: 'Sun-dried Bogura red chilies ground with natural fiery punch and deep color.',
    ingredients: ['100% Bogura Sun-Dried Whole Red Chili (Stemless)'],
    features: [
      'Stemless (বোঁটা ছাড়া) processing for uncompromised purity',
      'No brick dust, Sudan dye, or synthetic red pigmentation',
      'Perfect balance of pungent heat and rich aroma',
      'Tested for zero aflatoxin & microbial safety'
    ],
    stockStatus: 'In Stock',
    stockCount: 95,
    rating: 4.9,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: 'Bogura Heritage',
    origin: 'Sariakandi, Bogura',
    shelfLife: '12 Months',
    storageAdvice: 'Store in an airtight jar in a dry cabinet. Use a clean dry spoon.'
  },
  {
    id: 'mosolla-3',
    slug: 'pure-coriander-powder',
    nameBangla: 'সুগন্ধি দেশি ধনিয়া গুঁড়া',
    nameEnglish: 'Fragrant Roasted Coriander Powder',
    category: 'mosolla',
    categoryBangla: 'মসলা',
    categoryEnglish: 'Spices',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'ফরিদপুরের বিখ্যাত সুগন্ধি ছোট দানার দেশি ধনিয়া বীজ। হালকা আঁচে সুবাস বের হওয়া পর্যন্ত ভেজে তারপর গুঁড়া করা। মাংস, ডাল, মাছ ও তরকারিতে দারুণ স্নিগ্ধ ঘ্রাণ সৃষ্টি করে।',
    descriptionEnglish: 'Small-grain native coriander seeds from Faridpur, lightly artisan-roasted to unlock citrusy herbal notes before being finely milled. Elevates daily curries, stews, and marinades.',
    shortDescription: 'Gently roasted native coriander seeds ground to fragrant perfection.',
    ingredients: ['100% Native Deshi Coriander Seeds'],
    features: [
      'Lightly slow-roasted to bring out rich essential oils',
      'Completely free from husk chaff and wood dust adulteration',
      'Gives a sweet, earthy, citrusy aroma to any dish'
    ],
    stockStatus: 'In Stock',
    stockCount: 65,
    rating: 4.8,
    reviewCount: 114,
    images: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    isTopSeller: false,
    badge: 'Slow Roasted',
    origin: 'Faridpur Agro Hub',
    shelfLife: '12 Months',
    storageAdvice: 'Airtight container in a dark dry spot.'
  },
  {
    id: 'mosolla-4',
    slug: 'special-shahi-garam-masala',
    nameBangla: 'স্পেশাল শাহী গরম মসলা (১৪ পদের মিশ্রণ)',
    nameEnglish: 'Royal Shahi Garam Masala Blend (14 Spices)',
    category: 'mosolla',
    categoryBangla: 'মসলা',
    categoryEnglish: 'Spices',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'সবুজ ছোট এলাচ, বড় কালো এলাচ, দারুচিনি, লবঙ্গ, জয়ফল, জয়ত্রী, তেজপাতা, স্টার অ্যানিস, শাহি জিরা সহ ১৪টি প্রিমিয়াম সুগন্ধি মসলার রাজকীয় সিক্রেট রেসিপি। কাচ্চি বিরিয়ানি, রোস্ট ও রেজালার অতুলনীয় ঘ্রাণ নিশ্চিত করে।',
    descriptionEnglish: 'A secret royal blend of 14 whole whole exotic spices including green cardamom, dark mace, nutmeg, cinnamon quills, cloves, star anise, and shahi jeera. The gold standard for biryani, roast, and rezala.',
    shortDescription: 'Handcrafted blend of 14 royal spices for biryani, meat roasts and korma.',
    ingredients: [
      'Green Cardamom', 'Black Cardamom', 'Ceylon Cinnamon', 'Cloves', 'Mace (জয়ত্রী)',
      'Nutmeg (জয়ফল)', 'Star Anise', 'Shahi Jeera', 'Bay Leaves', 'Black Peppercorns', 'Kabab Chini'
    ],
    features: [
      '14 premium whole spices hand-sorted and stone-crushed',
      'No cheap coriander/cumin filler dilution',
      'Small pinch brings royal wedding-house Mughlai aroma',
      'Packed in moisture-proof seal jar'
    ],
    stockStatus: 'In Stock',
    stockCount: 80,
    rating: 5.0,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: '👑 Royal Blend',
    origin: 'Aghran Signature Master Blend',
    shelfLife: '12 Months',
    storageAdvice: 'Keep securely closed to lock in volatile essential oils.'
  },
  {
    id: 'mosolla-5',
    slug: 'traditional-panch-phoron',
    nameBangla: 'ঐতিহ্যবাহী খাঁটি পাঁচ ফোড়ন',
    nameEnglish: 'Traditional Bengali Panch Phoron (5-Spice Blend)',
    category: 'mosolla',
    categoryBangla: 'মসলা',
    categoryEnglish: 'Spices',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'মেথি, কালোজিরা, জিরা, মৌরি এবং সরিষা দানার নিখুঁত সুষম অনুপাতে প্রস্তুত খাঁটি পাঁচ ফোড়ন। পাঁচমিশালি তরকারি, ডাল তড়কা, মাছের ঝোল ও সুস্বাদু আচার তৈরিতে অপরিহার্য।',
    descriptionEnglish: 'The quintessential Bengali five-spice whole blend in precise classical ratios: Fenugreek seeds, Nigella (Kalojeera), Cumin seeds, Sweet fennel (Mouri), and Black mustard. Essential for tempering daal, shukto, and pickles.',
    shortDescription: 'Equal-ratio classic whole five spices for Bengali tempering and pickles.',
    ingredients: ['Fenugreek Seeds (মেথি)', 'Nigella Seeds (কালোজিরা)', 'Cumin Seeds (জিরা)', 'Fennel Seeds (মৌরি)', 'Black Mustard (কালো সরিষা)'],
    features: [
      'Hand-cleaned whole seeds free from dust and sand stones',
      'Unbroken seeds to deliver maximum burst of flavor when tempered in oil',
      'A staple of traditional Bengali vegetarian cuisine'
    ],
    stockStatus: 'In Stock',
    stockCount: 70,
    rating: 4.8,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    isTopSeller: false,
    badge: '100% Natural',
    origin: 'Rangpur Spice Growers Collective',
    shelfLife: '18 Months',
    storageAdvice: 'Keep in an airtight jar at room temperature.'
  },
  {
    id: 'mosolla-6',
    slug: 'pure-raw-mustard-oil',
    nameBangla: 'ঘানি ভাঙা খাঁটি সরিষার তেল (কাঠের ঘানি)',
    nameEnglish: 'Pure Cold-Pressed Wood Ghani Mustard Oil',
    category: 'mosolla',
    categoryBangla: 'মসলা',
    categoryEnglish: 'Spices',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'প্রাচীন কাঠের ঘানিতে ধীরে ধীরে পেষাই করা ঝাঁঝালো খাঁটি সরিষার তেল। কোনো কেমিক্যাল রিফাইনিং বা পাম তেলের মিশ্রণ নেই। ভর্তা, ইলিশ মাছ ভাজা ও আচারে এনে দেয় খাঁটি গ্রামীণ স্বাদ।',
    descriptionEnglish: 'Authentic cold-pressed mustard oil extracted from choice local Maghi mustard seeds in traditional wooden mills (Ghani). Raw, pungent, unrefined, and loaded with natural omega-3s.',
    shortDescription: 'Wood-pressed pungent raw mustard oil with zero chemical refining.',
    ingredients: ['100% First-Press Native Mustard Seeds (মাঘী সরিষা)'],
    features: [
      'Extracted at temperatures under 40°C to preserve pungent allyl isothiocyanate',
      'Natural deep golden clarity and signature authentic aroma',
      'Ideal for raw bhortas, pickles, and traditional fish curries'
    ],
    stockStatus: 'In Stock',
    stockCount: 55,
    rating: 4.9,
    reviewCount: 184,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: 'Wood-Pressed',
    origin: 'Sirajganj Traditional Ghani',
    shelfLife: '12 Months',
    storageAdvice: 'Store in dark amber/glass bottle away from heat.'
  },
  {
    id: 'mosolla-7',
    slug: 'jashore-nolen-patali-gur',
    nameBangla: 'যশোরের খাঁটি দানাদার নলেন পাটালী গুড়',
    nameEnglish: 'Pure Jashore Nolen Patali Date Jaggery',
    category: 'mosolla',
    categoryBangla: 'মিষ্টি ও গুড়',
    categoryEnglish: 'Jaggery & Sweeteners',
    price: 350,
    originalPrice: 499,
    discountPercentage: 30,
    weight: '500g Pack',
    variants: [
      { id: 'v1', name: '500g', weight: '500g', price: 350, originalPrice: 499, inStock: true },
      { id: 'v2', name: '1kg', weight: '1kg', price: 650, originalPrice: 799, inStock: true },
      { id: 'v3', name: '2kg', weight: '2kg', price: 1299, originalPrice: 1450, inStock: true },
      { id: 'v4', name: '3kg', weight: '3kg', price: 1899, originalPrice: 2100, inStock: true }
    ],
    descriptionBangla: 'যশোরের ঐতিহ্যবাহী গাছিদের সংগৃহীত ভোরের কাঁচা খেজুর রস জ্বাল দিয়ে তৈরি ১০০% নির্ভেজাল দানাদার নলেন পাটালী গুড়। কোনো চিনি, সোডা বা রাসায়নিক হাইড্রোজ মেশানো নেই। পিঠা ও পায়েসের জন্য অতুলনীয়।',
    descriptionEnglish: 'Pure artisanal crystalline date palm jaggery boiled from fresh dawn date palm sap in Jashore. Completely chemical and refined sugar free.',
    shortDescription: 'Pure crystalline date palm jaggery from authentic Jashore tree-tappers.',
    ingredients: ['100% Fresh Date Palm Sap (খেজুরের রস)'],
    features: [
      '100% free from white sugar adulteration, sodium hydrosulfite, or coloring',
      'Rich caramel fudge aroma with soft melt-in-mouth crystalline grain',
      'The soul of winter Pitha and Payesh'
    ],
    stockStatus: 'Low Stock',
    stockCount: 12,
    rating: 5.0,
    reviewCount: 147,
    images: [
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: '100% Pure Organic',
    origin: 'Jashore Date Palm Groves',
    shelfLife: '6 Months',
    storageAdvice: 'Store in refrigerator in airtight container to retain crystal texture.'
  },
  // ==================== COMBO OFFER PACKS ====================
  {
    id: 'combo-pitha-utsab',
    slug: 'combo-pitha-utsab',
    nameBangla: 'নবান্ন পিঠা উৎসব কম্বো প্যাক',
    nameEnglish: 'নবান্ন পিঠা উৎসব কম্বো (Nobanno Pitha Grand Combo)',
    category: 'pitha',
    categoryBangla: 'ঐতিহ্যবাহী পিঠা',
    categoryEnglish: 'Traditional Pitha & Combos',
    price: 1350,
    originalPrice: 1650,
    discountPercentage: 18,
    weight: 'Grand Combo Pack',
    descriptionBangla: 'নকশী পিঠা + ঝিনুক পিঠা + সুস্বাদু নারিকেল পুলি (১০ পিস প্রতি আইটেম) ও পাবনার খাঁটি ঝোলা খেজুরের গুড় নিয়ে প্রস্তুত নবান্ন পিঠা উৎসব স্পেশাল কম্বো। সম্পূর্ণ দেশি আতপ চাল ও নির্ভেজাল খেজুর গুড়ে তৈরি।',
    descriptionEnglish: 'Grand Nobanno celebration combo pack featuring Needle-carved Leaf Nokshi Pitha (10 pcs), Crunchy Jhinuk Pitha (10 pcs), Coconut Puli (10 pcs), and Pure Jashore Date Palm Syrup (500g).',
    shortDescription: 'নকশী পিঠা + ঝিনুক পিঠা + নারিকেল পুলি (১০ পিস প্রতি আইটেম) ও খাঁটি খেজুরের গুড়।',
    ingredients: [
      'হাতে কাটা নকশী পিঠা (১০ পিস)',
      'মুচমুচে ঝিনুক পিঠা (১০ পিস)',
      'ঐতিহ্যবাহী নারিকেল পুলি পিঠা (১০ পিস)',
      'পাবনার খাঁটি ঝোলা খেজুর গুড় (৫০০ গ্রাম)'
    ],
    features: [
      '৪টি সেরা আইটেম এক প্যাকেজে বিশেষ সাশ্রয়ী মূল্যে',
      '১০০% নির্ভেজাল খেজুরের গুড় ও দেশি চালের গুঁড়া',
      'প্রিমিয়াম ফুড গ্রেড বাক্সে গিফট প্যাকিং',
      'ক্যাশ অন ডেলিভারিতে সম্পূর্ণ নিরাপদ হোম ডেলিভারি'
    ],
    stockStatus: 'In Stock',
    stockCount: 30,
    rating: 5.0,
    reviewCount: 94,
    images: [
      nokshiPithaImage1,
      nokshiPithaImage2
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: 'জনপ্রিয় কম্বো',
    origin: 'Aghran Heritage Village Kitchen',
    shelfLife: '20 Days',
    storageAdvice: 'Keep in an airtight box in a cool and dry place.'
  },

  {
    id: 'combo-royal-heritage',
    slug: 'combo-royal-heritage',
    nameBangla: 'অঘ্রাণ প্রিমিয়াম হেরিটেজ বক্স',
    nameEnglish: 'অঘ্রাণ প্রিমিয়াম হেরিটেজ বক্স (Aghran Royal Heritage Pack)',
    category: 'mosolla',
    categoryBangla: 'ঐতিহ্যবাহী কম্বো',
    categoryEnglish: 'Spices & Sweeteners',
    price: 3450,
    originalPrice: 4100,
    discountPercentage: 16,
    weight: 'Royal Heritage Box',
    descriptionBangla: 'সুন্দরবনের খাঁটি খলিশা ফুলের মধু (১ কেজি) + পাবনার খাঁটি দানাদার গাওয়া ঘি (১ কেজি) + হাতে তৈরি স্পেশাল নকশী পিঠা (১৫ পিস) নিয়ে রাজকীয় হেরিটেজ কম্বো বক্স।',
    descriptionEnglish: 'Luxury Royal Heritage Gift Pack containing 1kg Wild Sundarban Honey, 1kg Pure Gawa Ghee, and 15 pcs Handcrafted Nokshi Pitha.',
    shortDescription: 'সুন্দরবনের খলিশা মধু + পাবনার খাঁটি গাওয়া ঘি + প্রিমিয়াম নকশী পিঠা।',
    ingredients: [
      'সুন্দরবনের প্রাকৃতিক মধু (১ কেজি)',
      'পাবনার খাঁটি গাওয়া ঘি (১ কেজি)',
      'হাতে তৈরি নকশী পিঠা স্পেশাল প্যাক (১৫ পিস)'
    ],
    features: [
      'সুন্দরবনের ১ নম্বর খলিশা মধু ও পাবনার সেরা ঘি',
      '১০০% খাঁটি ও ল্যাব-পরীক্ষিত বিশুদ্ধতা',
      'অভিজাত কাঠের লুকের প্রিমিয়াম গিফট বক্স'
    ],
    stockStatus: 'In Stock',
    stockCount: 15,
    rating: 5.0,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      nokshiPithaImage1
    ],
    isFeatured: true,
    isTopSeller: true,
    badge: 'মেগা ডিসকাউন্ট',
    origin: 'Sundarbans & Pabna Heritage Collective',
    shelfLife: '12 Months',
    storageAdvice: 'Keep in a cool and dry location.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-jahid-jhinuk',
    author: 'Jahid Hasan Pappu',
    authorBangla: 'জাহিদ হাসান পাপ্পু',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    comment: 'The Jhinuk Pithas were extraordinary, ordered some more pithas today!',
    commentBangla: 'ঝিনুক পিঠাগুলো অসাধারণ ছিল , আজকে আরও বেশ কিছু পিঠা অর্ডার করে দিলাম',
    productName: 'ঝিনুক নকশি পিঠা (Jhinuk Nokshi Pitha)',
    verifiedBuyer: true,
    avatarUrl: reviewUserImage1
  },
  {
    id: 't-abu-hanif',
    author: 'Abu Hanif',
    authorBangla: 'আবু হানিফ',
    location: 'Gazipur',
    rating: 5,
    comment: 'tasty and delicious. Will order again.',
    commentBangla: 'অনেক সুস্বাদু ও মুখরোচক ছিল। আবারও অর্ডার করব।',
    productName: 'Traditional Pitha & Delicacies',
    verifiedBuyer: true,
    avatarUrl: reviewUserImage2
  },
  {
    id: 't-mohammad-arafat',
    author: 'Mohammad Arafat',
    authorBangla: 'মোহাম্মদ আরাফাত',
    location: 'Tongi',
    rating: 5,
    comment: 'দেখতে যতটুকু লোভনীয় খেতে তারথেকে বেশি মজা কোনো ভেজাল নেই একদম পিওর জিনিস কোয়ালিটি এবং কোয়ান্টিটি একদমই বেস্ট ইনশাল্লাহ পরবর্তীতে আবার অর্ডার করবো',
    commentBangla: 'দেখতে যতটুকু লোভনীয় খেতে তারথেকে বেশি মজা কোনো ভেজাল নেই একদম পিওর জিনিস কোয়ালিটি এবং কোয়ান্টিটি একদমই বেস্ট ইনশাল্লাহ পরবর্তীতে আবার অর্ডার করবো',
    productName: 'Traditional Pitha Collection',
    verifiedBuyer: true,
    avatarUrl: reviewUserImage3
  }
];

export const SAMPLE_COUPONS: Coupon[] = [
  { code: 'AGHRAN10', discountPercent: 10, minSpend: 500, description: '10% OFF on orders above ৳500' },
  { code: 'FREESHIP', discountFixed: 70, minSpend: 1000, description: 'Free Dhaka delivery on orders above ৳1000' },
  { code: 'NOKSHI50', discountFixed: 50, minSpend: 600, description: 'Flat ৳50 OFF on Pitha orders' }
];

export const BANGLADESH_DISTRICTS: { [division: string]: string[] } = {
  'Dhaka': ['Dhaka City', 'Gazipur', 'Narayanganj', 'Narsingdi', 'Tangail', 'Manikganj', 'Munshiganj', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur'],
  'Chattogram': ['Chattogram City', "Cox's Bazar", 'Cumilla', 'Feni', 'Brahmanbaria', 'Noakhali', 'Chandpur', 'Lakshmipur', 'Rangamati', 'Khagrachhari', 'Bandarban'],
  'Rajshahi': ['Rajshahi City', 'Bogura', 'Pabna', 'Natore', 'Naogaon', 'Sirajganj', 'Chapai Nawabganj', 'Joypurhat'],
  'Khulna': ['Khulna City', 'Jashore', 'Kushtia', 'Satkhira', 'Bagerhat', 'Jhenaidah', 'Chuadanga', 'Meherpur', 'Magura', 'Narail'],
  'Sylhet': ['Sylhet City', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  'Barishal': ['Barishal City', 'Bhola', 'Patuakhali', 'Pirojpur', 'Jhalokati', 'Barguna'],
  'Rangpur': ['Rangpur City', 'Dinajpur', 'Kurigram', 'Gaibandha', 'Nilphamari', 'Lalmonirhat', 'Thakurgaon', 'Panchagarh'],
  'Mymensingh': ['Mymensingh City', 'Jamalpur', 'Netrokona', 'Sherpur']
};
