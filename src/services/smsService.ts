import { Order } from '../types';

/**
 * Textbee SMS Gateway Configuration
 * Set these in your .env file
 */
const TEXTBEE_API_KEY = import.meta.env.VITE_TEXTBEE_API_KEY || 'txb_177cInyYDO0wOy7VUVQBUyfoaThZWbO4';
const TEXTBEE_DEVICE_ID = import.meta.env.VITE_TEXTBEE_DEVICE_ID || '6ad3997d5291071e57eca6e6';
const TEXTBEE_SIM_SUBSCRIPTION_ID = import.meta.env.VITE_TEXTBEE_SIM_SUBSCRIPTION_ID || '3';
const SMS_LANGUAGE = import.meta.env.VITE_SMS_LANGUAGE || 'bn';
const STORE_HELPLINE = import.meta.env.VITE_STORE_HELPLINE || '01752421224';

/**
 * Converts Bengali digits to English digits if customer entered in Bangla
 */
export const convertBanglaDigitsToEnglish = (str: string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[০-৯]/g, (digit) => banglaDigits.indexOf(digit).toString());
};

/**
 * Formats any Bangladeshi phone number to standard E.164 format (+8801XXXXXXXXX)
 */
export const formatPhoneNumber = (rawPhone: string): string => {
  if (!rawPhone) return '';
  
  // Convert any Bengali numerals to English
  let clean = convertBanglaDigitsToEnglish(rawPhone.trim());
  
  // Remove all non-digit characters except '+'
  clean = clean.replace(/[^\d+]/g, '');
  
  if (clean.startsWith('+880')) {
    return clean;
  }
  if (clean.startsWith('880')) {
    return `+${clean}`;
  }
  if (clean.startsWith('01')) {
    return `+88${clean}`;
  }
  if (clean.startsWith('1') && clean.length === 10) {
    return `+880${clean}`;
  }
  
  return clean;
};

/**
 * Generates the order confirmation SMS message text
 */
export const buildOrderConfirmationMessage = (order: Order): string => {
  const orderNumber = order.orderNumber;
  const formattedTotal = Number(order.total).toFixed(2);

  return `[Aghran] Your order ${orderNumber} has been received.

Order Value: BDT ${formattedTotal}

Hotline: ${STORE_HELPLINE}
WhatsApp: ${STORE_HELPLINE}

Regards,
aghran.shop`;
};

export interface SmsSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends order confirmation SMS to customer's phone via Textbee Gateway
 */
export const sendOrderConfirmationSms = async (
  order: Order,
  customApiKey?: string,
  customDeviceId?: string
): Promise<SmsSendResult> => {
  const apiKey = customApiKey || TEXTBEE_API_KEY;
  const deviceId = customDeviceId || TEXTBEE_DEVICE_ID;

  if (!apiKey || !deviceId) {
    console.warn(
      '⚠️ Textbee SMS Gateway is not configured. Please add VITE_TEXTBEE_API_KEY and VITE_TEXTBEE_DEVICE_ID to your .env file.'
    );
    return {
      success: false,
      error: 'Textbee API Key or Device ID missing in environment variables'
    };
  }

  const recipient = formatPhoneNumber(order.customer.phone);
  if (!recipient || recipient.length < 13) {
    console.warn(`⚠️ Invalid recipient phone number for order #${order.orderNumber}:`, order.customer.phone);
    return {
      success: false,
      error: `Invalid phone number: ${order.customer.phone}`
    };
  }

  const message = buildOrderConfirmationMessage(order);

  try {
    const endpoint = `https://api.textbee.dev/api/v1/gateway/devices/${deviceId}/send-sms`;

    const payload: Record<string, any> = {
      recipients: [recipient],
      message: message
    };

    if (TEXTBEE_SIM_SUBSCRIPTION_ID) {
      payload.simSubscriptionId = Number(TEXTBEE_SIM_SUBSCRIPTION_ID);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Textbee SMS API error (${response.status}):`, errorText);
      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText}`
      };
    }

    const data = await response.json();
    console.log(`✅ Confirmation SMS successfully sent to ${recipient} for order #${order.orderNumber}:`, data);
    return {
      success: true,
      messageId: data.data?.id || data.id
    };
  } catch (err: any) {
    console.error('❌ Failed to dispatch SMS via Textbee:', err);
    return {
      success: false,
      error: err.message || 'Unknown network error'
    };
  }
};
