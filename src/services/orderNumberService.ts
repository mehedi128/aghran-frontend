// Gets the next global sequential order number from the /api/order-number server function.
// N = Nokshi Pitha landing, C = Chaler Gura landing, U = Utsab Combo landing, W = main website checkout
export type OrderSource = 'N' | 'C' | 'U' | 'W';

/**
 * Returns e.g. "AGH-N001". If the server cannot be reached (offline, local `vite dev`
 * without the API), it falls back to "AGH-<source>X<random>" so the order is still
 * placed and the ID stays unique; the "X" marks it as outside the serial sequence.
 */
export async function getNextOrderNumber(source: OrderSource): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch('/api/order-number', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ source }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.orderNumber === 'string' && data.orderNumber.startsWith(`AGH-${source}`)) {
        return data.orderNumber;
      }
    }
  } catch (err) {
    console.warn('Order number service unavailable, using fallback ID:', err);
  }
  return `AGH-${source}X${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1000)}`;
}
