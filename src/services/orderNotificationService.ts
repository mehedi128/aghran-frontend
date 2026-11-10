import { Order } from '../types';

// Customer SMS (Textbee) and admin Telegram alert are sent by the /api/notify-order
// server function. Bot token and SMS API key stay on the server, never in this bundle.
export const notifyOrder = async (order: Order): Promise<void> => {
  try {
    const res = await fetch('/api/notify-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      keepalive: true,
      body: JSON.stringify({
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        customer: {
          fullName: order.customer.fullName,
          phone: order.customer.phone,
          deliveryZone: order.customer.deliveryZone,
          streetAddress: order.customer.streetAddress
        },
        items: order.items.map(item => ({
          name: item.product.nameBangla || item.product.nameEnglish,
          variant: item.selectedVariant?.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        })),
        subtotal: order.subtotal,
        shippingFee: order.shippingFee,
        total: order.total
      })
    });
    if (!res.ok) {
      console.error('Order notification failed:', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.error('Failed to dispatch order notifications:', err);
  }
};
