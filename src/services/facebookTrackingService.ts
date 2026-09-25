import { Product, CartItem, Order } from '../types';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

const PIXEL_ID = '1733094124585916';
const CAPI_ACCESS_TOKEN = 
  import.meta.env.VITE_FACEBOOK_CAPI_TOKEN || 
  'EAAb4CWBP5boBSWvHMNYuGWtI9KXAJCbzhZCsHq0aviyhS7GlQ1PJPjn1AWG19OdENRl3qZBjZChKfZAU46ToNVNDhRPy6fUumb48CWu7yYZAhOSFokPnLghsoOGBZA6suorkJMkLfwv6K8AdcpUg5onqMBjHC1lHDbstT5W6gbZCsjCfvKorbVp5F1ZBtZByD1gZDZD';

/**
 * Normalizes and hashes text using SHA-256 for Meta Conversions API
 */
async function hashValue(value: string | undefined): Promise<string> {
  if (!value) return '';
  const normalized = value.trim().toLowerCase();
  if (!normalized) return '';
  
  try {
    const msgBuffer = new TextEncoder().encode(normalized);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return '';
  }
}

/**
 * Normalizes phone numbers (ensures Bangladesh country code +880 format for Meta)
 */
function normalizePhone(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.startsWith('880')) {
    return digitsOnly;
  }
  if (digitsOnly.startsWith('0')) {
    return '88' + digitsOnly;
  }
  return '880' + digitsOnly;
}

/**
 * Normalizes customer name into first and last name
 */
function parseName(fullName?: string): { fn?: string; ln?: string } {
  if (!fullName) return {};
  const parts = fullName.trim().toLowerCase().split(/\s+/);
  return {
    fn: parts[0] || undefined,
    ln: parts.length > 1 ? parts.slice(1).join(' ') : undefined
  };
}

/**
 * Sets User Data for Browser Pixel Manual Advanced Matching
 */
export const setPixelUserData = (userData: {
  phone?: string;
  fullName?: string;
  city?: string;
  email?: string;
  externalId?: string;
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const { fn, ln } = parseName(userData.fullName);
    const cleanPhone = userData.phone ? normalizePhone(userData.phone) : undefined;
    const city = userData.city ? userData.city.trim().toLowerCase() : undefined;
    const email = userData.email ? userData.email.trim().toLowerCase() : undefined;

    const pixelUserData: Record<string, any> = {
      country: 'bd'
    };
    if (cleanPhone) pixelUserData.ph = cleanPhone;
    if (fn) pixelUserData.fn = fn;
    if (ln) pixelUserData.ln = ln;
    if (city) pixelUserData.ct = city;
    if (email) pixelUserData.em = email;
    if (userData.externalId) pixelUserData.external_id = userData.externalId;

    // Passing user parameters to fbq('init') enables Manual Advanced Matching in Meta Pixel
    window.fbq('init', PIXEL_ID, pixelUserData);
  }
};

/**
 * Sends a server-side event to Meta Conversions API (CAPI)
 */
async function sendCapiEvent(
  eventName: string,
  eventId: string,
  userData: {
    phone?: string;
    fullName?: string;
    city?: string;
  },
  customData?: Record<string, any>
) {
  try {
    const { fn, ln } = parseName(userData.fullName);
    const [hashedPhone, hashedFn, hashedLn, hashedCity, hashedCountry] = await Promise.all([
      userData.phone ? hashValue(normalizePhone(userData.phone)) : Promise.resolve(''),
      fn ? hashValue(fn) : Promise.resolve(''),
      ln ? hashValue(ln) : Promise.resolve(''),
      userData.city ? hashValue(userData.city) : Promise.resolve(''),
      hashValue('bd')
    ]);

    const payloadUserData: Record<string, any> = {
      country: [hashedCountry]
    };
    if (hashedPhone) payloadUserData.ph = [hashedPhone];
    if (hashedFn) payloadUserData.fn = [hashedFn];
    if (hashedLn) payloadUserData.ln = [hashedLn];
    if (hashedCity) payloadUserData.ct = [hashedCity];

    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://aghran.com';

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: currentUrl,
          action_source: 'website',
          user_data: payloadUserData,
          custom_data: customData || {}
        }
      ]
    };

    // Send directly to Meta Graph API
    await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Facebook CAPI Event dispatch error:', err);
  }
}

/**
 * Tracks ViewContent event (Product PDP View)
 */
export const trackViewContent = (product: Product) => {
  const eventId = `vc_${product.id}_${Date.now()}`;

  // 1. Browser Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: product.nameEnglish || product.nameBangla,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'BDT'
    }, { eventID: eventId });
  }

  // 2. Conversions API
  sendCapiEvent('ViewContent', eventId, {}, {
    content_name: product.nameEnglish || product.nameBangla,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'BDT'
  });
};

/**
 * Tracks AddToCart event
 */
export const trackAddToCart = (product: Product, quantity: number = 1, unitPrice?: number) => {
  const price = unitPrice || product.price;
  const eventId = `atc_${product.id}_${Date.now()}`;

  // 1. Browser Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: product.nameEnglish || product.nameBangla,
      content_ids: [product.id],
      content_type: 'product',
      value: price * quantity,
      currency: 'BDT'
    }, { eventID: eventId });
  }

  // 2. Conversions API
  sendCapiEvent('AddToCart', eventId, {}, {
    content_name: product.nameEnglish || product.nameBangla,
    content_ids: [product.id],
    content_type: 'product',
    value: price * quantity,
    currency: 'BDT'
  });
};

/**
 * Tracks InitiateCheckout event
 */
export const trackInitiateCheckout = (cart: CartItem[], cartTotal: number) => {
  const eventId = `ic_${Date.now()}`;

  // 1. Browser Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: cart.map(item => item.product.id),
      content_type: 'product',
      value: cartTotal,
      currency: 'BDT',
      num_items: cart.reduce((sum, item) => sum + item.quantity, 0)
    }, { eventID: eventId });
  }

  // 2. Conversions API
  sendCapiEvent('InitiateCheckout', eventId, {}, {
    content_ids: cart.map(item => item.product.id),
    content_type: 'product',
    value: cartTotal,
    currency: 'BDT',
    num_items: cart.reduce((sum, item) => sum + item.quantity, 0)
  });
};

/**
 * Tracks Purchase event (High priority conversion event)
 * Implements Meta Manual Advanced Matching & Deduplicated CAPI event
 */
export const trackPurchase = (order: Order) => {
  const eventId = order.orderNumber; // Using orderNumber as eventID ensures Pixel & CAPI deduplication
  const city = order.customer.district || (order.customer.deliveryZone === 'dhaka' ? 'dhaka' : undefined);

  // 1. Browser Pixel - Manual Advanced Matching & Purchase Event
  if (typeof window !== 'undefined' && window.fbq) {
    // Re-initialize pixel with customer data for Manual Advanced Matching
    setPixelUserData({
      phone: order.customer.phone,
      fullName: order.customer.fullName,
      city: city,
      externalId: order.orderNumber
    });

    window.fbq('track', 'Purchase', {
      content_name: 'Order ' + order.orderNumber,
      content_ids: order.items.map(item => item.product.id),
      content_type: 'product',
      value: order.total,
      currency: 'BDT',
      num_items: order.items.reduce((sum, item) => sum + item.quantity, 0),
      contents: order.items.map(item => ({
        id: item.product.id,
        quantity: item.quantity,
        item_price: item.unitPrice
      }))
    }, { eventID: eventId });
  }

  // 2. Conversions API (CAPI) with customer data matching
  sendCapiEvent(
    'Purchase',
    eventId,
    {
      phone: order.customer.phone,
      fullName: order.customer.fullName,
      city: city
    },
    {
      content_name: 'Order ' + order.orderNumber,
      content_ids: order.items.map(item => item.product.id),
      content_type: 'product',
      value: order.total,
      currency: 'BDT',
      num_items: order.items.reduce((sum, item) => sum + item.quantity, 0),
      contents: order.items.map(item => ({
        id: item.product.id,
        quantity: item.quantity,
        item_price: item.unitPrice
      }))
    }
  );
};
