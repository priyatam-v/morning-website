# Beehiiv Waitlist Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the existing Waitlist form to Beehiiv's Subscribe API via a secure Next.js API route with in-memory rate limiting, double opt-in, and user-visible error handling.

**Architecture:** A new server-side route at `app/api/subscribe/route.ts` receives the email from the browser, checks a per-IP in-memory rate limiter, then calls Beehiiv's REST API. The API key never leaves the server. `Waitlist.tsx` replaces its fake timeout with a real fetch and renders success or error state.

**Tech Stack:** Next.js 14 App Router, TypeScript, Beehiiv REST API v2, Vitest (unit tests)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `app/lib/rate-limit.ts` | Per-IP in-memory rate limiter — isolated module, unit testable |
| Create | `app/api/subscribe/route.ts` | POST handler: validates email, rate-limits, calls Beehiiv |
| Modify | `app/components/Waitlist.tsx` | Replace fake submit with real fetch; add error state |
| Modify | `app/components/Waitlist.module.css` | Add `.error` style |
| Create | `.env.local` | `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` |
| Modify | `.gitignore` | Ensure `.env.local` is ignored |
| Create | `vitest.config.ts` | Vitest config with path alias `@` → project root |
| Create | `app/lib/__tests__/rate-limit.test.ts` | Unit tests for rate limiter |

---

## Task 1: Add `.env.local` and protect it with `.gitignore`

**Files:**
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Add `.env.local` to `.gitignore`**

Open `.gitignore` and append:

```
.env.local
```

Current `.gitignore` content to preserve:
```
.DS_Store
.next
node_modules
```

Final `.gitignore`:
```
.DS_Store
.next
node_modules
.env.local
```

- [ ] **Step 2: Create `.env.local` with your Beehiiv credentials**

Create `.env.local` at project root:

```
BEEHIIV_API_KEY=your_api_key_here
BEEHIIV_PUBLICATION_ID=your_publication_id_here
```

Replace `your_api_key_here` with your Beehiiv API key (found in Beehiiv dashboard → Settings → API).
Replace `your_publication_id_here` with your publication ID (e.g. `pub_xxxxxxxx`, found in the same settings page or in the URL of your publication).

- [ ] **Step 3: Commit the `.gitignore` change only (never commit `.env.local`)**

```bash
git add .gitignore
git commit -m "chore: add .env.local to .gitignore"
```

---

## Task 2: Set up Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest
```

- [ ] **Step 2: Add test script to `package.json`**

In `package.json`, add `"test"` to the `scripts` section:

```json
{
  "name": "morning-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run"
  },
  "dependencies": {
    "framer-motion": "^11.18.2",
    "next": "^14.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "vitest": "latest"
  }
}
```

- [ ] **Step 3: Create `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 4: Verify Vitest runs (no tests yet)**

```bash
npm test
```

Expected output:
```
No test files found, exiting with code 1
```

(This is expected — we have no test files yet. Vitest is wired up correctly.)

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest for unit testing"
```

---

## Task 3: Create the rate limiter module

**Files:**
- Create: `app/lib/rate-limit.ts`
- Create: `app/lib/__tests__/rate-limit.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `app/lib/__tests__/rate-limit.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { checkRateLimit } from '../rate-limit'

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows the first request from an IP', () => {
    expect(checkRateLimit('1.2.3.4')).toBe(true)
  })

  it('allows up to 5 requests within the window', () => {
    const ip = '10.0.0.1'
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip)).toBe(true)
    }
  })

  it('blocks the 6th request within the same 60-second window', () => {
    const ip = '10.0.0.2'
    for (let i = 0; i < 5; i++) checkRateLimit(ip)
    expect(checkRateLimit(ip)).toBe(false)
  })

  it('resets the counter after 60 seconds', () => {
    const ip = '10.0.0.3'
    for (let i = 0; i < 5; i++) checkRateLimit(ip)
    expect(checkRateLimit(ip)).toBe(false)

    vi.advanceTimersByTime(61_000)

    expect(checkRateLimit(ip)).toBe(true)
  })

  it('tracks different IPs independently', () => {
    const ipA = '192.168.1.1'
    const ipB = '192.168.1.2'
    for (let i = 0; i < 5; i++) checkRateLimit(ipA)
    expect(checkRateLimit(ipA)).toBe(false)
    expect(checkRateLimit(ipB)).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test
```

Expected output:
```
FAIL  app/lib/__tests__/rate-limit.test.ts
  × Cannot find module '../rate-limit'
```

- [ ] **Step 3: Implement `app/lib/rate-limit.ts`**

Create `app/lib/rate-limit.ts`:

```typescript
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
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test
```

Expected output:
```
✓ app/lib/__tests__/rate-limit.test.ts (5 tests)

Test Files  1 passed (1)
Tests       5 passed (5)
```

- [ ] **Step 5: Commit**

```bash
git add app/lib/rate-limit.ts app/lib/__tests__/rate-limit.test.ts
git commit -m "feat: add in-memory per-IP rate limiter with tests"
```

---

## Task 4: Create the API route

**Files:**
- Create: `app/api/subscribe/route.ts`

- [ ] **Step 1: Create `app/api/subscribe/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/app/lib/rate-limit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  // 1. Rate limit check
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // 2. Parse and validate email
  let email: string
  try {
    const body = await req.json()
    email = body?.email
  } catch {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // 3. Call Beehiiv Subscribe API
  const apiKey = process.env.BEEHIIV_API_KEY
  const pubId = process.env.BEEHIIV_PUBLICATION_ID

  try {
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: false,
          utm_source: 'waitlist',
          double_opt_override: 'enabled',
        }),
      }
    )

    if (!beehiivRes.ok) {
      throw new Error(`Beehiiv error: ${beehiivRes.status}`)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Could not subscribe. Please try again.' },
      { status: 502 }
    )
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual smoke test — start the dev server**

```bash
npm run dev
```

In a second terminal, test the happy path (replace with a real email you own):

```bash
curl -s -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com"}' | jq
```

Expected response:
```json
{ "ok": true }
```

Then check your Beehiiv dashboard — the email should appear as "pending confirmation" (awaiting double opt-in click).

- [ ] **Step 4: Manual smoke test — invalid email**

```bash
curl -s -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"notanemail"}' | jq
```

Expected:
```json
{ "error": "Invalid email" }
```

- [ ] **Step 5: Manual smoke test — rate limit**

```bash
for i in {1..6}; do
  curl -s -X POST http://localhost:3000/api/subscribe \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com"}' | jq .
done
```

Expected: first 5 return `{"ok":true}`, 6th returns `{"error":"Too many requests. Please try again later."}`.

- [ ] **Step 6: Commit**

```bash
git add app/api/subscribe/route.ts
git commit -m "feat: add /api/subscribe route with Beehiiv integration and rate limiting"
```

---

## Task 5: Update `Waitlist.tsx` and add error styling

**Files:**
- Modify: `app/components/Waitlist.tsx`
- Modify: `app/components/Waitlist.module.css`

- [ ] **Step 1: Update `Waitlist.tsx`**

Replace the entire file with:

```typescript
'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './Waitlist.module.css'

export default function Waitlist() {
  const ref = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add(styles.visible) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.grain} />
      <div className={styles.waitlistContent}>
        <div className={styles.inner} ref={ref}>

          <h2 className={styles.heading}>We're almost ready.</h2>
          <p className={styles.body}>Morning is in its final stretch. If you'd like to be among the first to read it, leave your email below.</p>

          <div className={styles.formWrap}>
            {!submitted ? (
              <>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <label htmlFor="waitlist-email" className={styles.srOnly}>
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={styles.input}
                    required
                  />
                  <button type="submit" className={styles.btn} disabled={loading}>
                    {loading ? 'Joining...' : 'Get Early Access'}
                  </button>
                </form>
                {error && (
                  <p className={styles.error}>{error}</p>
                )}
              </>
            ) : (
              <div className={styles.thanks}>
                <span className={styles.thanksDot} />
                You're in. We'll reach out when it's time.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add `.error` style to `Waitlist.module.css`**

Append to the end of `app/components/Waitlist.module.css`:

```css
.error {
  margin-top: 0.25rem;
  font-family: var(--font-jakarta);
  font-size: 0.8125rem;
  font-weight: 400;
  color: #b94a3a;
  text-align: center;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Manual end-to-end test in browser**

With `npm run dev` running, open `http://localhost:3000` and scroll to the waitlist section.

Test the happy path:
1. Enter a real email address you own
2. Click "Get Early Access"
3. Button should show "Joining..." briefly
4. Success state: "You're in. We'll reach out when it's time."
5. Check Beehiiv dashboard → subscriber appears as pending confirmation
6. Check your email inbox — confirmation email from Beehiiv should arrive

Test the error path:
1. Temporarily break the API key in `.env.local` (e.g. add an `x` to it), restart the dev server
2. Submit a valid email — should show: "Could not subscribe. Please try again."
3. Form stays visible so user can retry
4. Restore the real API key

- [ ] **Step 5: Commit**

```bash
git add app/components/Waitlist.tsx app/components/Waitlist.module.css
git commit -m "feat: connect Waitlist form to Beehiiv via /api/subscribe"
```

---

## Done

The full integration is complete:
- Emails are collected in Beehiiv with double opt-in
- API key stays server-side
- Per-IP rate limiting (5 req / 60s) protects the endpoint
- Users see meaningful errors; the form stays visible on failure so they can retry
