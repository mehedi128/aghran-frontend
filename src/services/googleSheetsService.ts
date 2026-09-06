import { Order } from '../types';

/**
 * Google Apps Script Web App URL
 * Set this in your .env file as VITE_GOOGLE_SHEETS_URL
 */
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

export interface GoogleSheetOrderPayload {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  phone: string;
  deliveryZone: string;
  streetAddress: string;
  paymentMethod: string;
  itemsSummary: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: string;
}

/**
 * Formats an order object into a flat payload suitable for Google Sheets row insertion.
 */
export const formatOrderForSheet = (order: Order): GoogleSheetOrderPayload => {
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
    orderDate: formattedDate,
    customerName: order.customer.fullName,
    phone: order.customer.phone,
    deliveryZone: order.customer.deliveryZone === 'dhaka' ? 'Dhaka Metro' : 'Outside Dhaka',
    streetAddress: order.customer.streetAddress,
    paymentMethod: order.customer.paymentMethod.toUpperCase(),
    itemsSummary,
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    discount: order.discount,
    total: order.total,
    status: order.status
  };
};

/**
 * Sends order data to Google Sheets via Google Apps Script Web App.
 */
export const sendOrderToGoogleSheet = async (order: Order): Promise<{ success: boolean; error?: string }> => {
  if (!GOOGLE_SHEETS_URL) {
    console.warn('VITE_GOOGLE_SHEETS_URL is not defined in environment variables. Order not synced to Google Sheet.');
    return { success: false, error: 'Google Sheets URL not configured' };
  }

  try {
    const payload = formatOrderForSheet(order);

    // Using POST with text/plain or URLSearchParams avoids CORS preflight blockage from Google Apps Script
    await fetch(GOOGLE_SHEETS_URL, {
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
