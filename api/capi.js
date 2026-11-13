// Vercel Serverless Function: Meta Conversions API (CAPI) proxy.
// The CAPI access token lives ONLY here, in the server env var FB_CAPI_TOKEN.
// Never put it in a VITE_ variable: those are bundled into the public browser JS.

import { isAllowedOrigin } from './_origin.js';

const PIXEL_ID = process.env.FB_PIXEL_ID || '1733094124585916';
const GRAPH_VERSION = 'v19.0';

const ALLOWED_EVENTS = new Set(['ViewContent', 'AddToCart', 'InitiateCheckout', 'Purchase']);
function readCookie(req, name) {
  const cookies = req.headers.cookie || '';
  const match = cookies.split(';').map(c => c.trim()).find(c => c.startsWith(name + '='));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  const token = process.env.FB_CAPI_TOKEN;
  if (!token) {
    console.error('FB_CAPI_TOKEN is not set');
    return res.status(500).json({ error: 'Server not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const { event_name, event_id, event_source_url, user_data, custom_data } = body || {};

  if (!ALLOWED_EVENTS.has(event_name) || typeof event_id !== 'string' || !event_id) {
    return res.status(400).json({ error: 'Invalid event' });
  }

  // user_data from the browser is already SHA-256 hashed (ph, fn, ln, ct, country).
  // Add the non-hashed match keys Meta expects from the server side.
  const userData = { ...(user_data && typeof user_data === 'object' ? user_data : {}) };
  const ip = clientIp(req);
  if (ip) userData.client_ip_address = ip;
  if (req.headers['user-agent']) userData.client_user_agent = req.headers['user-agent'];
  const fbp = readCookie(req, '_fbp');
  const fbc = readCookie(req, '_fbc');
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  // Meta needs value as a non-negative number and currency as a 3-letter ISO code.
  // Normalize here too, so a bad client payload never reaches Meta as a string/NaN.
  const customData = { ...(custom_data && typeof custom_data === 'object' ? custom_data : {}) };
  if ('value' in customData || event_name === 'Purchase') {
    const n = typeof customData.value === 'number'
      ? customData.value
      : parseFloat(String(customData.value ?? '').replace(/[^0-9.\-]/g, ''));
    customData.value = Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : 0;
  }
  if ('value' in customData) {
    const cur = typeof customData.currency === 'string' ? customData.currency.trim().toUpperCase() : '';
    customData.currency = /^[A-Z]{3}$/.test(cur) ? cur : 'BDT';
  }

  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url: typeof event_source_url === 'string' ? event_source_url : 'https://www.aghran.shop/',
        action_source: 'website',
        user_data: userData,
        custom_data: customData
      }
    ]
  };

  try {
    const fbRes = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );
    const result = await fbRes.json().catch(() => ({}));
    if (!fbRes.ok) {
      console.error('Meta CAPI error:', result);
      return res.status(502).json({ error: 'Meta CAPI request failed' });
    }
    return res.status(200).json({ ok: true, events_received: result.events_received });
  } catch (err) {
    console.error('Meta CAPI network error:', err);
    return res.status(502).json({ error: 'Meta CAPI unreachable' });
  }
}
