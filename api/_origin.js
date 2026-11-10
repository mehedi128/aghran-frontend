// Shared helper for the API functions. Files starting with "_" are not deployed as endpoints by Vercel.

const ALLOWED_HOSTS = ['aghran.shop', 'www.aghran.shop', 'localhost', '127.0.0.1'];

export function isAllowedOrigin(req) {
  const origin = req.headers.origin || req.headers.referer || '';
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_HOSTS.includes(host) || host.endsWith('.vercel.app');
  } catch {
    return false;
  }
}
