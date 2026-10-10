import { Order } from '../types';

/**
 * Google Apps Script Web App URLs
 * Configured in .env file as VITE_GOOGLE_SHEETS_URL / VITE_NOKSHI_GOOGLE_SHEETS_URL
 */
const DEFAULT_GOOGLE_SHEETS_URL = 
  import.meta.env.VITE_GOOGLE_SHEETS_URL || 
  'https://script.google.com/macros/s/AKfycbxgnNweu5fSRONScOumyzaYJ8_T1k1Fa2ahUOS3CWh3p7KJ-n7515fEaMylAIVWP1IXVQ/exec';

const NOKSHI_GOOGLE_SHEETS_URL = 
  import.meta.env.VITE_NOKSHI_GOOGLE_SHEETS_URL || 
  DEFAULT_GOOGLE_SHEETS_URL;

export interface GoogleSheetOrderPayload {
  orderNumber: string;
  orderId?: string;
  orderDate: string;
  customerName: string;
  phone: string;
  mobileNumber?: string;
  deliveryZone: string;
  streetAddress: string;
  deliveryAddress?: string;
  paymentMethod: string;
  itemsSummary: string;
  itemsOrdered?: string;
  subtotal: number;
  shippingFee: number;
  deliveryFee?: number;
  discount: number;
  total: number;
  status: string;
  source?: string;
}

/**
 * Formats an order object into a flat payload suitable for Google Sheets row insertion.
 */
export const formatOrderForSheet = (order: Order, source = 'General'): GoogleSheetOrderPayload => {
  const itemsSummary = order.items
    .map(item => {
      const variantText = item.selectedVariant ? ` (${item.selectedVariant.name})` : '';
      return `${item.product.nameBangla || item.product.nameEnglish}${variantText} x ${item.quantity} [৳${item.unitPrice * item.quantity}]`;
    })
    .join(', ');

  const formattedDate = new Date(order.createdAt).toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return {
    orderNumber: order.orderNumber,
    orderId: order.orderNumber,
    orderDate: formattedDate,
    customerName: order.customer.fullName,
    phone: order.customer.phone,
    mobileNumber: order.customer.phone,
    deliveryZone: order.customer.deliveryZone === 'dhaka' ? 'Dhaka Metro' : 'Outside Dhaka',
    streetAddress: order.customer.streetAddress,
    deliveryAddress: order.customer.streetAddress,
    paymentMethod: order.customer.paymentMethod.toUpperCase(),
    itemsSummary,
    itemsOrdered: itemsSummary,
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    deliveryFee: order.shippingFee,
    discount: order.discount,
    total: order.total,
    status: order.status || 'Pending',
    source
  };
};

/**
 * Sends order data to Google Sheets via Google Apps Script Web App.
 */
export const sendOrderToGoogleSheet = async (
  order: Order,
  customWebhookUrl?: string,
  source = 'General'
): Promise<{ success: boolean; error?: string }> => {
  const targetUrl = customWebhookUrl || DEFAULT_GOOGLE_SHEETS_URL;

  if (!targetUrl) {
    console.warn('Google Sheets URL is not defined. Order not synced to Google Sheet.');
    return { success: false, error: 'Google Sheets URL not configured' };
  }

  try {
    const payload = formatOrderForSheet(order, source);

    // Using POST with text/plain or URLSearchParams avoids CORS preflight blockage from Google Apps Script
    await fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script redirects require no-cors or text/plain
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return { success: true };
  } catch (err: any) {
    console.error('Error submitting order to Google Sheet:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
};

/**
 * Dedicated sender for Nokshi Pitha Landing Page.
 * Uses VITE_NOKSHI_GOOGLE_SHEETS_URL if specified, otherwise falls back to VITE_GOOGLE_SHEETS_URL.
 */
export const sendNokshiOrderToGoogleSheet = async (order: Order) => {
  return sendOrderToGoogleSheet(order, NOKSHI_GOOGLE_SHEETS_URL, 'নকশি পিঠা ল্যান্ডিং পেজ');
};
