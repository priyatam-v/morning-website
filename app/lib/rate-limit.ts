const store = new Map<string, { count: number; resetAt: number }>()

const LIMIT = 5
const WINDOW_MS = 60_000

/**
 * Returns true if the request is within the rate limit, false if it should be blocked.
 * Mutates the in-memory store.
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= LIMIT) return false

  entry.count++
  return true
}
