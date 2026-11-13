import { Product, CartItem, Order } from '../types';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

const PIXEL_ID = 
  import.meta.env.VITE_FACEBOOK_PIXEL_ID || 
  '1733094124585916';
// CAPI access token is NOT kept in browser code. Server events go through the
// Vercel function /api/capi, which reads the token from the FB_CAPI_TOKEN env var.
const CAPI_ENDPOINT = '/api/capi';

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

    // Sent to our own server function; it adds IP, user agent, fbp/fbc and the token.
    await fetch(CAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      keepalive: true,
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: currentUrl,
        user_data: payloadUserData,
        custom_data: customData || {}
      })
    });
  } catch (err) {
    console.warn('Facebook CAPI Event dispatch error:', err);
  }
}

/**
 * Tracks a landing-page ViewContent or InitiateCheckout event.
 * Sends the browser pixel and CAPI with the same eventID, so Meta deduplicates them
 * and still receives the event when an ad blocker stops the browser pixel.
 */
export const trackLandingEvent = (
  eventName: 'ViewContent' | 'InitiateCheckout',
  customData: Record<string, any>
) => {
  const prefix = eventName === 'ViewContent' ? 'vc' : 'ic';
  const eventId = `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, customData, { eventID: eventId });
  }

  sendCapiEvent(eventName, eventId, {}, customData);
};

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
/**
 * Converts any price-like input ("1,250", "৳1250", 1250, undefined) to a finite
 * number rounded to 2 decimals. Returns NaN when it cannot be parsed.
 * Meta rejects Purchase events whose value is missing, NaN, a string or negative.
 */
const toMoney = (input: unknown): number => {
  const n = typeof input === 'number' ? input : parseFloat(String(input ?? '').replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN;
};

/**
 * Builds a Purchase custom_data object that always carries a valid numeric
 * `value` and `currency: 'BDT'`. Falls back to items + shipping - discount
 * when order.total is missing or invalid.
 */
const buildPurchaseData = (order: Order) => {
  const contents = order.items.map(item => ({
    id: String(item.product.id),
    quantity: Math.max(1, Math.round(Number(item.quantity) || 1)),
    item_price: toMoney(item.unitPrice ?? item.product.price) || 0
  }));

  const itemsTotal = contents.reduce((sum, c) => sum + c.item_price * c.quantity, 0);
  const fallbackTotal = itemsTotal + (toMoney(order.shippingFee) || 0) - (toMoney(order.discount) || 0);

  let value = toMoney(order.total);
  if (!Number.isFinite(value) || value <= 0) value = toMoney(fallbackTotal);
  if (!Number.isFinite(value) || value < 0) value = 0;

  return {
    content_name: 'Order ' + order.orderNumber,
    content_ids: contents.map(c => c.id),
    content_type: 'product',
    value,
    currency: 'BDT',
    num_items: contents.reduce((sum, c) => sum + c.quantity, 0),
    contents
  };
};

export const trackPurchase = (order: Order) => {
  const eventId = order.orderNumber; // Using orderNumber as eventID ensures Pixel & CAPI deduplication
  const city = order.customer.district || (order.customer.deliveryZone === 'dhaka' ? 'dhaka' : undefined);
  const purchaseData = buildPurchaseData(order);

  // 1. Browser Pixel - Manual Advanced Matching & Purchase Event
  if (typeof window !== 'undefined' && window.fbq) {
    // Re-initialize pixel with customer data for Manual Advanced Matching
    setPixelUserData({
      phone: order.customer.phone,
      fullName: order.customer.fullName,
      city: city,
      externalId: order.orderNumber
    });

    window.fbq('track', 'Purchase', purchaseData, { eventID: eventId });
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
    purchaseData
  );
};
