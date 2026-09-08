import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductVariant, CartItem, Order, CategoryId, DeliveryZone, Coupon } from '../types';
import { INITIAL_PRODUCTS, SAMPLE_COUPONS } from '../data/products';
import { sendOrderToGoogleSheet } from '../services/googleSheetsService';

export type CurrentView = 
  | 'home'
  | 'collection'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'track-order'
  | 'about'
  | 'contact'
  | 'wishlist';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // product IDs
  isCartOpen: boolean;
  currentView: CurrentView;
  selectedCategory: CategoryId;
  selectedProductSlug: string | null;
  searchQuery: string;
  quickViewProduct: Product | null;
  recentOrders: Order[];
  activeOrder: Order | null;
  deliveryZone: DeliveryZone;
  appliedCoupon: Coupon | null;
  toast: ToastMessage | null;
  
  // Navigation actions
  navigateTo: (view: CurrentView, params?: { category?: CategoryId; slug?: string }) => void;
  setSelectedCategory: (cat: CategoryId) => void;
  setSearchQuery: (query: string) => void;
  setQuickViewProduct: (prod: Product | null) => void;
  
  // Cart actions
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  buyNow: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Checkout & Order actions
  setDeliveryZone: (zone: DeliveryZone) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingSteps'>) => Order;
  setActiveOrder: (order: Order | null) => void;
  
  // Calculations
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  cartTotal: number;
  freeShippingRemaining: number;
  
  // Notifications
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_CART_KEY = 'aghran_cart_v1';
const STORAGE_WISHLIST_KEY = 'aghran_wishlist_v1';
const STORAGE_ORDERS_KEY = 'aghran_orders_v1';

// Helper to parse state from URL
const getStateFromUrl = (): { view: CurrentView; category: CategoryId; slug: string | null } => {
  if (typeof window === 'undefined') {
    return { view: 'home', category: 'all', slug: null };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.replace(/^#\/?/, '');

  // 1. Check Query Parameters
  const productParam = urlParams.get('product') || urlParams.get('p');
  if (productParam) {
    return { view: 'product-detail', category: 'all', slug: productParam };
  }

  const categoryParam = urlParams.get('category') || urlParams.get('cat');
  if (categoryParam) {
    return { view: 'collection', category: categoryParam as CategoryId, slug: null };
  }

  const viewParam = urlParams.get('view');
  if (viewParam) {
    return {
      view: (viewParam as CurrentView) || 'home',
      category: (urlParams.get('category') as CategoryId) || 'all',
      slug: urlParams.get('slug') || null
    };
  }

  // 2. Check Pathname or Hash (e.g., /product/slug or #product/slug)
  const pathToCheck = pathname || hash;
  if (pathToCheck.startsWith('product/')) {
    const slug = pathToCheck.replace('product/', '');
    return { view: 'product-detail', category: 'all', slug };
  }
  if (pathToCheck.startsWith('collection/')) {
    const cat = pathToCheck.replace('collection/', '');
    return { view: 'collection', category: cat as CategoryId, slug: null };
  }
  if (['collection', 'cart', 'checkout', 'order-success', 'track-order', 'about', 'contact', 'wishlist'].includes(pathToCheck)) {
    return { view: pathToCheck as CurrentView, category: 'all', slug: null };
  }

  return { view: 'home', category: 'all', slug: null };
};

const syncUrlToBrowser = (view: CurrentView, params?: { category?: CategoryId; slug?: string }, replace: boolean = false) => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  // Clear known route query parameters
  url.searchParams.delete('product');
  url.searchParams.delete('p');
  url.searchParams.delete('category');
  url.searchParams.delete('cat');
  url.searchParams.delete('view');
  url.searchParams.delete('slug');

  if (view === 'product-detail' && params?.slug) {
    url.searchParams.set('product', params.slug);
  } else if (view === 'collection') {
    if (params?.category && params.category !== 'all') {
      url.searchParams.set('category', params.category);
    } else {
      url.searchParams.set('view', 'collection');
    }
  } else if (view !== 'home') {
    url.searchParams.set('view', view);
  }

  const targetUrl = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '') + url.hash;

  if (replace) {
    window.history.replaceState({ view, params }, '', targetUrl);
  } else {
    window.history.pushState({ view, params }, '', targetUrl);
  }
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialUrlState = getStateFromUrl();
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentView, setCurrentView] = useState<CurrentView>(initialUrlState.view);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialUrlState.category);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(initialUrlState.slug);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('dhaka');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync initial URL
  useEffect(() => {
    syncUrlToBrowser(currentView, { category: selectedCategory, slug: selectedProductSlug || undefined }, true);
  }, []);

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const state = getStateFromUrl();
      setCurrentView(state.view);
      setSelectedCategory(state.category);
      setSelectedProductSlug(state.slug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize Cart from LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initialize Wishlist from LocalStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initialize Recent Orders from LocalStorage
  const [recentOrders, setRecentOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      // Provide a pre-seeded order so Track Order works instantly with demo ID
      const seedOrder: Order = {
        id: 'ord-demo-01',
        orderNumber: 'AGH-89241',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            selectedVariant: INITIAL_PRODUCTS[0].variants?.[0],
            quantity: 2,
            unitPrice: 320
          },
          {
            product: INITIAL_PRODUCTS[5],
            selectedVariant: INITIAL_PRODUCTS[5].variants?.[0],
            quantity: 1,
            unitPrice: 180
          }
        ],
        customer: {
          fullName: 'Rahim Chowdhury',
          phone: '01712345678',
          division: 'Dhaka',
          district: 'Dhaka City',
          upazilaOrArea: 'Dhanmondi 27',
          streetAddress: 'House 42, Road 9/A, Dhanmondi R/A',
          deliveryZone: 'dhaka',
          paymentMethod: 'cod'
        },
        subtotal: 820,
        shippingFee: 70,
        discount: 0,
        total: 890,
        status: 'In Kitchen Preparation',
        trackingSteps: [
          { title: 'Order Placed', description: 'Your order was verified and confirmed by kitchen dispatch.', completed: true, date: 'Today, 10:30 AM' },
          { title: 'Kitchen Fresh Preparation', description: 'Pitha is being handcrafted in our hygienic village kitchen.', completed: true, date: 'Today, 12:15 PM' },
          { title: 'Quality Assurance & Eco Packaging', description: 'Packed in vacuum food-grade box with tamper seal.', completed: false },
          { title: 'Out for Delivery (Pathao Courier)', description: 'Rider assigned for same-day Dhaka Metro doorstep delivery.', completed: false },
          { title: 'Delivered', description: 'Order delivered with warm smile.', completed: false }
        ]
      };
      return [seedOrder];
    } catch {
      return [];
    }
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Save Orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(recentOrders));
    } catch (e) {
      console.error(e);
    }
  }, [recentOrders]);

  // Scroll to top on view switch and sync URL
  const navigateTo = (view: CurrentView, params?: { category?: CategoryId; slug?: string }) => {
    if (params?.category) {
      setSelectedCategory(params.category);
    }
    if (params?.slug) {
      setSelectedProductSlug(params.slug);
    }
    setCurrentView(view);
    syncUrlToBrowser(view, params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({
      id: Math.random().toString(),
      title,
      message,
      type
    });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const hideToast = () => {
    setToast(null);
  };

  // Cart operations
  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1, openDrawer: boolean = true) => {
    const selectedVar = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const unitPrice = selectedVar ? selectedVar.price : product.price;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        (selectedVar ? item.selectedVariant?.id === selectedVar.id : !item.selectedVariant)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, {
          product,
          selectedVariant: selectedVar,
          quantity,
          unitPrice
        }];
      }
    });

    showToast('Added to Cart', `${product.nameBangla} (${product.nameEnglish}) added to your basket!`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateCartQuantity = (productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart(prev => prev.map(item => {
      const match = item.product.id === productId && (variantId ? item.selectedVariant?.id === variantId : !item.selectedVariant);
      if (match) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => {
      const match = item.product.id === productId && (variantId ? item.selectedVariant?.id === variantId : !item.selectedVariant);
      return !match;
    }));
    showToast('Item Removed', 'Product removed from your basket.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const buyNow = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    addToCart(product, variant, quantity, false);
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', 'Item removed from your favorites.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Item added to your favorites list!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = SAMPLE_COUPONS.find(c => c.code.toUpperCase() === trimmed);
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try AGHRAN10 or FREESHIP' };
    }
    if (cartSubtotal < found.minSpend) {
      return { success: false, message: `Minimum spend of ৳${found.minSpend} required for code ${found.code}` };
    }
    setAppliedCoupon(found);
    showToast('Coupon Applied!', `${found.code} applied successfully.`);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo code removed.', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  
  // Shipping calculation: Inside Dhaka ৳70, Outside Dhaka ৳130. Free above ৳1500 or with Free Delivery products!
  const freeShippingThreshold = 1500;
  const hasFreeDeliveryProduct = cart.some(item => item.product.freeDelivery || item.product.id === 'combo-pitha-utsab' || item.product.slug === 'combo-pitha-utsab');
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || hasFreeDeliveryProduct;
  const baseShipping = deliveryZone === 'dhaka' ? 70 : 130;
  const shippingFee = cart.length === 0 ? 0 : (isFreeShipping ? 0 : baseShipping);
  const freeShippingRemaining = hasFreeDeliveryProduct ? 0 : Math.max(0, freeShippingThreshold - cartSubtotal);

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountFixed) {
      discountAmount = appliedCoupon.discountFixed;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  // Place Order
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingSteps'>): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `AGH-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      trackingSteps: [
        { title: 'Order Placed & Verified', description: 'We received your order and sent SMS confirmation.', completed: true, date: 'Just Now' },
        { title: 'Kitchen Handcrafting & Packing', description: 'Freshly prepared and packed in food-grade packaging.', completed: false },
        { title: 'Quality Inspection', description: 'Passed 100% adulteration and hygiene check.', completed: false },
        { title: 'Handed to Courier Partner', description: 'Dispatched for fast doorstep delivery.', completed: false },
        { title: 'Delivered', description: 'Enjoy the authentic homemade taste!', completed: false }
      ]
    };

    setRecentOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    // Send order to Google Sheets
    sendOrderToGoogleSheet(newOrder).catch(err => {
      console.error('Failed to sync order to Google Sheets:', err);
    });

    navigateTo('order-success');
    showToast('Order Placed Successfully!', `Order #${newOrder.orderNumber} is now confirmed.`);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        isCartOpen,
        currentView,
        selectedCategory,
        selectedProductSlug,
        searchQuery,
        quickViewProduct,
        recentOrders,
        activeOrder,
        deliveryZone,
        appliedCoupon,
        toast,
        navigateTo,
        setSelectedCategory,
        setSearchQuery,
        setQuickViewProduct,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        buyNow,
        toggleWishlist,
        isInWishlist,
        setDeliveryZone,
        applyCoupon,
        removeCoupon,
        placeOrder,
        setActiveOrder,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        cartTotal,
        freeShippingRemaining,
        showToast,
        hideToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
