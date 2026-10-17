import { Order } from '../types';

/**
 * Telegram Bot Configuration for Order Notifications
 */
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8657618788:AAGtsG-dHe_pYMvnRiI7Rj_utIiSelfXmSs';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '1022610461';

/**
 * Formats order details into a clean HTML formatted Telegram message
 */
export const buildTelegramOrderNotification = (order: Order): string => {
  const customerName = order.customer.fullName || 'গ্রাহক';
  const phone = order.customer.phone || 'N/A';
  const deliveryZone = order.customer.deliveryZone === 'dhaka' ? 'ঢাকা সিটির ভিতরে (৳80)' : 'ঢাকা সিটির বাইরে (৳130)';
  const address = order.customer.streetAddress || 'ঠিকানা দেওয়া হয়নি';
  const formattedDate = new Date(order.createdAt).toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const itemsList = order.items
    .map(item => {
      const variantText = item.selectedVariant ? ` (${item.selectedVariant.name})` : '';
      const name = item.product.nameBangla || item.product.nameEnglish;
      return `• <b>${name}${variantText}</b> × ${item.quantity}  — ৳${item.unitPrice * item.quantity}`;
    })
    .join('\n');

  return `🛒 <b>নতুন অর্ডার এসেছে! (Aghran)</b>
━━━━━━━━━━━━━━━━━━━━
📦 <b>অর্ডার আইডি:</b> <code>#${order.orderNumber}</code>
👤 <b>গ্রাহকের নাম:</b> ${customerName}
📞 <b>মোবাইল:</b> <a href="tel:${phone}">${phone}</a>
📍 <b>ডেলিভারি জোন:</b> ${deliveryZone}
🏠 <b>ঠিকানা:</b> ${address}

🛍️ <b>অর্ডার আইটেম:</b>
${itemsList}

💰 <b>সাবটোটাল:</b> ৳${order.subtotal}
🚚 <b>ডেলিভারি চার্জ:</b> ৳${order.shippingFee}
💵 <b>সর্বমোট বিল:</b> <b>৳${order.total}</b>
💳 <b>পেমেন্ট মেথড:</b> Cash on Delivery (COD)
⏰ <b>অর্ডারের সময়:</b> ${formattedDate}
━━━━━━━━━━━━━━━━━━━━`;
};

export interface TelegramSendResult {
  success: boolean;
  messageId?: number;
  error?: string;
}

/**
 * Sends order notification to admin's Telegram chat/group
 */
export const sendOrderToTelegram = async (
  order: Order,
  customBotToken?: string,
  customChatId?: string
): Promise<TelegramSendResult> => {
  const botToken = customBotToken || TELEGRAM_BOT_TOKEN;
  const chatId = customChatId || TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('⚠️ Telegram Bot Token or Chat ID is missing. Notification not sent.');
    return {
      success: false,
      error: 'Telegram Bot Token or Chat ID not configured'
    };
  }

  const messageText = buildTelegramOrderNotification(order);

  try {
    const endpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('❌ Telegram API error:', data);
      return {
        success: false,
        error: data.description || 'Failed to send message via Telegram'
      };
    }

    console.log(`✅ Order notification successfully sent to Telegram (Chat ID: ${chatId}):`, data.result?.message_id);
    return {
      success: true,
      messageId: data.result?.message_id
    };
  } catch (err: any) {
    console.error('❌ Network error sending order to Telegram:', err);
    return {
      success: false,
      error: err.message || 'Unknown network error'
    };
  }
};
