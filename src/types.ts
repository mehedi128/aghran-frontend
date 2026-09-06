export type CategoryId = 'pitha' | 'mosolla' | 'combos' | 'all';

export interface ProductVariant {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  nameBangla: string;
  nameEnglish: string;
  category: 'pitha' | 'mosolla';
  categoryBangla: string;
  categoryEnglish: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  weight: string; // e.g. "500g", "10 pcs", "250g"
  variants?: ProductVariant[];
  descriptionBangla: string;
  descriptionEnglish: string;
  shortDescription: string;
  ingredients: string[];
  features: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Stock Out';
  stockCount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isFeatured?: boolean;
  isTopSeller?: boolean;
  freeDelivery?: boolean;
  badge?: string; // e.g. "Best Seller", "Winter Special", "100% Organic"
  origin: string; // e.g., "Bogura Rural Kitchen", "Rajshahi Farm"
  shelfLife: string; // e.g., "6 Months", "Freshly prepared (3-5 days)"
  storageAdvice: string;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export type DeliveryZone = 'dhaka' | 'outside_dhaka';

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  alternativePhone?: string;
  email?: string;
  division?: string;
  district?: string;
  upazilaOrArea?: string;
  streetAddress: string;
  deliveryZone: DeliveryZone;
  orderNotes?: string;
  paymentMethod: 'cod';
  bkashTrxId?: string;
  nagadTrxId?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: OrderCustomerInfo;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'In Kitchen Preparation' | 'Dispatched' | 'Delivered' | 'Cancelled';
  trackingSteps: {
    title: string;
    description: string;
    completed: boolean;
    date?: string;
  }[];
}

export interface Testimonial {
  id: string;
  author: string;
  authorBangla?: string;
  location: string;
  rating: number;
  comment: string;
  commentBangla?: string;
  productName: string;
  verifiedBuyer: boolean;
  avatarUrl?: string;
}

export interface FilterOptions {
  category: CategoryId;
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  minSpend: number;
  description: string;
}
