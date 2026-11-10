// Vercel Serverless Function: global sequential order numbers.
// Format: AGH-<source letter><serial>, e.g. AGH-N001, AGH-C014, AGH-U102, AGH-W007.
// The counter lives in Upstash Redis (atomic INCR), so every customer gets the next
// number and two orders can never get the same one.
//
// Env vars (added automatically by the Vercel Upstash integration):
//   KV_REST_API_URL + KV_REST_API_TOKEN   or   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN

import { isAllowedOrigin } from './_origin.js';

// N = Nokshi Pitha landing, C = Chaler Gura landing, U = Utsab Combo landing, W = main website checkout
const SOURCES = new Set(['N', 'C', 'U', 'W']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    console.error('Upstash Redis env vars are not set');
    return res.status(500).json({ error: 'Server not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const source = body && typeof body.source === 'string' ? body.source.toUpperCase() : '';
  if (!SOURCES.has(source)) {
    return res.status(400).json({ error: 'Invalid source' });
  }

  try {
    const r = await fetch(`${redisUrl.replace(/\/$/, '')}/incr/order_counter:${source}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}` }
    });
    const data = await r.json().catch(() => ({}));
    const serial = Number(data.result);
    if (!r.ok || !Number.isInteger(serial) || serial < 1) {
      console.error('Upstash INCR failed:', data);
      return res.status(502).json({ error: 'Counter unavailable' });
    }
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ orderNumber: `AGH-${source}${String(serial).padStart(3, '0')}`, serial });
  } catch (err) {
    console.error('Upstash network error:', err);
    return res.status(502).json({ error: 'Counter unavailable' });
  }
}
