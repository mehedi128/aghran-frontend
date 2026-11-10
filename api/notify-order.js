// Vercel Serverless Function: order notifications (customer SMS via Textbee + admin Telegram alert).
// Secrets live ONLY in server env vars, never in VITE_ variables (those end up in public browser JS):
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TEXTBEE_API_KEY, TEXTBEE_DEVICE_ID,
//   TEXTBEE_SIM_SUBSCRIPTION_ID (optional, default 3), STORE_HELPLINE (optional)
// The browser sends only order data. Messages are built here, so the endpoint can't be used
// to send arbitrary text, and Redis rate limits stop it being used to spam phones.

import { isAllowedOrigin } from './_origin.js';

const env = name => process.env[name] || process.env[`VITE_${name}`] || '';

const LIMIT_PER_IP_HOUR = 10;
const LIMIT_PER_PHONE_HOUR = 3;

// ---------- helpers ----------

const escapeHtml = s =>
  String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const clip = (s, n) => String(s ?? '').slice(0, n);
const num = v => (Number.isFinite(Number(v)) ? Number(v) : 0);

function convertBanglaDigitsToEnglish(str) {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[০-৯]/g, d => String(bn.indexOf(d)));
}

// Any Bangladeshi number -> +8801XXXXXXXXX ('' if invalid)
function formatPhoneNumber(raw) {
  if (!raw) return '';
  let clean = convertBanglaDigitsToEnglish(String(raw).trim()).replace(/[^\d+]/g, '');
  if (clean.startsWith('+880')) clean = clean.slice(1);
  else if (clean.startsWith('01')) clean = '88' + clean;
  else if (clean.startsWith('1') && clean.length === 10) clean = '880' + clean;
  return /^8801[3-9]\d{8}$/.test(clean) ? '+' + clean : '';
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

// Returns true if under the limit. If Redis is not configured, never blocks orders.
async function underLimit(key, limit) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return true;
  try {
    const r = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([['INCR', key], ['EXPIRE', key, '3600', 'NX']])
    });
    const data = await r.json();
    const count = Number(data?.[0]?.result);
    return !Number.isFinite(count) || count <= limit;
  } catch {
    return true;
  }
}

// ---------- message builders (moved from the browser) ----------

function buildSms(order) {
  const helpline = env('STORE_HELPLINE') || '01752421224';
  return `[Aghran] Your order ${order.orderNumber} has been received.

Order Value: BDT ${order.total.toFixed(2)}

Hotline: ${helpline}
WhatsApp: ${helpline}

Regards,
aghran.shop`;
}

function buildTelegram(order, sms) {
  const c = order.customer;
  const phone = escapeHtml(c.phone || 'N/A');
  const deliveryZone = c.deliveryZone === 'dhaka' ? 'ঢাকা সিটির ভিতরে (৳80)' : 'ঢাকা সিটির বাইরে (৳130)';
  const formattedDate = new Date(order.createdAt || Date.now()).toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  const itemsList = order.items
    .map(i => {
      const variant = i.variant ? ` (${escapeHtml(i.variant)})` : '';
      return `• <b>${escapeHtml(i.name)}${variant}</b> × ${i.quantity}  — ৳${i.unitPrice * i.quantity}`;
    })
    .join('\n');
  const smsSection = sms.sent
    ? `📱 <b>কাস্টমার SMS:</b> ✅ সফলভাবে পাঠানো হয়েছে (GP SIM)\n`
    : `📱 <b>কাস্টমার SMS:</b> ⚠️ <b>ব্যর্থ হয়েছে!</b> <i> (${escapeHtml(sms.error || 'ফোন অফ বা ব্যালেন্স নেই')})</i>\n`;

  return `🛒 <b>নতুন অর্ডার এসেছে! (Aghran)</b>
━━━━━━━━━━━━━━━━━━━━
📦 <b>অর্ডার আইডি:</b> <code>#${escapeHtml(order.orderNumber)}</code>
👤 <b>গ্রাহকের নাম:</b> ${escapeHtml(c.fullName || 'নাম দেওয়া হয়নি')}
📞 <b>মোবাইল:</b> <a href="tel:${phone}">${phone}</a>
📍 <b>ডেলিভারি জোন:</b> ${deliveryZone}
🏠 <b>ঠিকানা:</b> ${escapeHtml(c.streetAddress || 'ঠিকানা দেওয়া হয়নি')}

🛍️ <b>অর্ডার আইটেম:</b>
${itemsList}

💰 <b>সাবটোটাল:</b> ৳${order.subtotal}
🚚 <b>ডেলিভারি চার্জ:</b> ৳${order.shippingFee}
💵 <b>সর্বমোট বিল:</b> <b>৳${order.total}</b>
💳 <b>পেমেন্ট মেথড:</b> Cash on Delivery (COD)
${smsSection}⏰ <b>অর্ডারের সময়:</b> ${formattedDate}
━━━━━━━━━━━━━━━━━━━━`;
}

// ---------- senders ----------

async function sendSms(order, recipient) {
  const apiKey = env('TEXTBEE_API_KEY');
  const deviceId = env('TEXTBEE_DEVICE_ID');
  if (!apiKey || !deviceId) return { sent: false, error: 'SMS gateway not configured on server' };
  if (!recipient) return { sent: false, error: `Invalid phone number: ${order.customer.phone}` };

  const payload = { recipients: [recipient], message: buildSms(order) };
  const sim = env('TEXTBEE_SIM_SUBSCRIPTION_ID') || '3';
  if (sim) payload.simSubscriptionId = Number(sim);

  try {
    const r = await fetch(`https://api.textbee.dev/api/v1/gateway/devices/${encodeURIComponent(deviceId)}/send-sms`, {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      const text = await r.text().catch(() => '');
      console.error(`Textbee SMS error (${r.status}):`, text);
      return { sent: false, error: `HTTP ${r.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error('Textbee network error:', err);
    return { sent: false, error: 'Network error' };
  }
}

async function sendTelegram(order, sms) {
  const botToken = env('TELEGRAM_BOT_TOKEN');
  const chatId = env('TELEGRAM_CHAT_ID');
  if (!botToken || !chatId) return { sent: false, error: 'Telegram not configured on server' };
  try {
    const r = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegram(order, sms),
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    const data = await r.json().catch(() => ({}));
    if (!data.ok) {
      console.error('Telegram API error:', data);
      return { sent: false, error: data.description || 'Telegram error' };
    }
    return { sent: true };
  } catch (err) {
    console.error('Telegram network error:', err);
    return { sent: false, error: 'Network error' };
  }
}

// ---------- handler ----------

function parseOrder(body) {
  const o = body && typeof body === 'object' ? body : null;
  if (!o || typeof o.orderNumber !== 'string' || !/^AGH-[A-Z0-9]{1,24}$/.test(o.orderNumber)) return null;
  const c = o.customer && typeof o.customer === 'object' ? o.customer : {};
  const items = Array.isArray(o.items) ? o.items.slice(0, 30) : [];
  if (items.length === 0) return null;
  return {
    orderNumber: o.orderNumber,
    createdAt: typeof o.createdAt === 'string' ? o.createdAt : new Date().toISOString(),
    customer: {
      fullName: clip(c.fullName, 80),
      phone: clip(c.phone, 20),
      deliveryZone: c.deliveryZone === 'dhaka' ? 'dhaka' : 'outside',
      streetAddress: clip(c.streetAddress, 300)
    },
    items: items.map(i => ({
      name: clip(i?.name, 120),
      variant: clip(i?.variant, 60),
      quantity: Math.max(0, Math.min(999, Math.floor(num(i?.quantity)))),
      unitPrice: num(i?.unitPrice)
    })),
    subtotal: num(o.subtotal),
    shippingFee: num(o.shippingFee),
    total: num(o.total)
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const order = parseOrder(body);
  if (!order) return res.status(400).json({ error: 'Invalid order' });

  if (!(await underLimit(`rl:notify:ip:${clientIp(req)}`, LIMIT_PER_IP_HOUR))) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // SMS is limited per phone so nobody can flood one number; Telegram still alerts the admin.
  const recipient = formatPhoneNumber(order.customer.phone);
  let sms;
  if (recipient && !(await underLimit(`rl:notify:ph:${recipient}`, LIMIT_PER_PHONE_HOUR))) {
    sms = { sent: false, error: 'SMS limit reached for this number (3/hour)' };
  } else {
    sms = await sendSms(order, recipient);
  }
  const telegram = await sendTelegram(order, sms);

  return res.status(200).json({ sms, telegram });
}
