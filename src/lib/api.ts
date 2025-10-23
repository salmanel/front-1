// src/lib/api.ts
export async function api<T>(url: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      credentials: 'include', // Works with HttpOnly cookies server-side
      signal: controller.signal,
      headers: { 'Accept': 'application/json', ...(init.headers || {}) },
      ...init
    });

    if (!res.ok) {
      // Surface concise error; you can refine per API.
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status}${text ? `: ${text}` : ''}`);
    }

    // Try JSON first; fall back to text if needed
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await res.json()) as T;
    }
    return (await res.text()) as unknown as T;
  } finally {
    clearTimeout(timer);
  }
}
