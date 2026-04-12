# PostHog Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate PostHog Cloud analytics into the Morning marketing site to track visitor engagement (section views) and the waitlist conversion funnel.

**Architecture:** A single `PostHogProvider` client component initializes PostHog once on mount in cookieless mode and wraps the app via `layout.tsx`. Custom events are fired directly via `import posthog from 'posthog-js'` at the call sites — no abstraction layer. Section view events piggyback on existing IntersectionObservers already in each component.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, posthog-js

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `app/components/PostHogProvider.tsx` | Init PostHog once, wrap children |
| Modify | `app/layout.tsx` | Add `<PostHogProvider>` around `{children}` |
| Modify | `app/components/Waitlist.tsx` | Fire `section_viewed` (existing observer) + 3 funnel events |
| Modify | `app/components/Philosophy.tsx` | Fire `section_viewed` (existing eyebrow observer) |
| Modify | `app/components/Worlds.tsx` | Fire `section_viewed` (existing header observer) |

---

## Task 1: Install posthog-js and configure env vars

**Files:**
- Modify: `package.json` (via npm)
- Modify: `.env.local` (create if it doesn't exist — not committed)

- [ ] **Step 1: Install the package**

```bash
npm install posthog-js
```

Expected output: `added 1 package` (posthog-js has no runtime dependencies).

- [ ] **Step 2: Add env vars to .env.local**

Add these two lines to `.env.local` (create the file if it doesn't exist). Get the key from PostHog Cloud → Project Settings → Project API Key.

```
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_KEY_HERE
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

- [ ] **Step 3: Commit the package changes**

```bash
git add package.json package-lock.json
git commit -m "chore: install posthog-js"
```

---

## Task 2: Create PostHogProvider component

**Files:**
- Create: `app/components/PostHogProvider.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      persistence: 'memory',    // cookieless — no consent banner needed
      capture_pageview: true,   // automatic $pageview on load
      autocapture: false,       // we define our own events, no noise
    })
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/PostHogProvider.tsx
git commit -m "feat: add PostHogProvider with cookieless init"
```

---

## Task 3: Wire PostHogProvider into layout.tsx

**Files:**
- Modify: `app/layout.tsx`

Current `layout.tsx` body:
```tsx
<body>{children}</body>
```

- [ ] **Step 1: Add the import and wrap children**

Replace the body line in `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import './globals.css'
import PostHogProvider from './components/PostHogProvider'

export const metadata: Metadata = {
  title: 'Morning — Learn something real today.',
  description: 'Ten high-quality knowledge cards every day. Then stop. Morning is the antidote to doomscrolling.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Petrona:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Start the dev server and verify $pageview fires**

```bash
npm run dev
```

Open http://localhost:3000 in a browser. In PostHog Cloud → Activity → Live Events, you should see a `$pageview` event arrive within a few seconds. If `NEXT_PUBLIC_POSTHOG_KEY` is not set, no events fire and no errors appear (PostHog fails silently).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire PostHogProvider into app layout"
```

---

## Task 4: Add section_viewed to Waitlist.tsx

**Files:**
- Modify: `app/components/Waitlist.tsx`

The existing observer (line 13–18) fires when the waitlist section enters the viewport but never disconnects. Add `section_viewed` capture and a `disconnect()` so it fires exactly once.

- [ ] **Step 1: Add the import and update the observer callback**

At the top of `Waitlist.tsx`, add the posthog import after the existing React import:

```tsx
import posthog from 'posthog-js'
```

Replace the existing `useEffect` observer block (lines 12–19):

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        ref.current?.classList.add(styles.visible)
        posthog.capture('section_viewed', { section: 'waitlist' })
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
```

- [ ] **Step 2: Verify in browser**

With the dev server running, scroll down to the Waitlist section. Check PostHog Live Events — a `section_viewed` event with property `section: "waitlist"` should appear. Scrolling back up and down should not fire it again.

- [ ] **Step 3: Commit**

```bash
git add app/components/Waitlist.tsx
git commit -m "feat: fire section_viewed for waitlist section"
```

---

## Task 5: Add section_viewed to Philosophy.tsx

**Files:**
- Modify: `app/components/Philosophy.tsx`

The existing eyebrow observer (lines 20–29) already fires once and disconnects — add `section_viewed` capture inside its callback.

- [ ] **Step 1: Add the import**

At the top of `Philosophy.tsx`, add after the existing React import:

```tsx
import posthog from 'posthog-js'
```

- [ ] **Step 2: Update the eyebrow observer callback**

Replace lines 20–29 (the eyebrowObserver block):

```tsx
eyebrowObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      eyebrowEl.classList.add(styles.eyebrowVisible)
      posthog.capture('section_viewed', { section: 'philosophy' })
      eyebrowObserver!.disconnect()
    }
  },
  { threshold: 0.5 }
)
eyebrowObserver.observe(eyebrowEl)
```

- [ ] **Step 3: Verify in browser**

Scroll to the Philosophy section. Check PostHog Live Events — a `section_viewed` event with `section: "philosophy"` should appear once.

- [ ] **Step 4: Commit**

```bash
git add app/components/Philosophy.tsx
git commit -m "feat: fire section_viewed for philosophy section"
```

---

## Task 6: Add section_viewed to Worlds.tsx

**Files:**
- Modify: `app/components/Worlds.tsx`

The existing header observer (lines 113–117) fires when the Worlds header enters the viewport but never disconnects. Add `section_viewed` capture and `disconnect()`.

- [ ] **Step 1: Add the import**

At the top of `Worlds.tsx`, add after the existing React import:

```tsx
import posthog from 'posthog-js'
```

- [ ] **Step 2: Update the header observer callback**

Replace lines 113–117 (the first `observer` block in `useEffect`):

```tsx
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      ref.current?.classList.add(styles.visible)
      posthog.capture('section_viewed', { section: 'worlds' })
      observer.disconnect()
    }
  },
  { threshold: 0.2 }
)
if (ref.current) observer.observe(ref.current)
```

- [ ] **Step 3: Verify in browser**

Scroll to the Worlds section. Check PostHog Live Events — a `section_viewed` event with `section: "worlds"` should appear once.

- [ ] **Step 4: Commit**

```bash
git add app/components/Worlds.tsx
git commit -m "feat: fire section_viewed for worlds section"
```

---

## Task 7: Add waitlist funnel events to Waitlist.tsx

**Files:**
- Modify: `app/components/Waitlist.tsx`

Three events fire inside `handleSubmit`: `waitlist_submitted` when the form is submitted, `waitlist_success` on a 200 response, and `waitlist_error` on any failure with the error message as the `reason` property.

- [ ] **Step 1: Replace the handleSubmit function**

Replace the existing `handleSubmit` function (lines 21–47) with:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!email) return
  setLoading(true)
  setError(null)
  posthog.capture('waitlist_submitted')
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (res.ok) {
      posthog.capture('waitlist_success')
      setSubmitted(true)
    } else {
      let message = 'Something went wrong. Please try again.'
      try {
        const data = await res.json()
        if (typeof data?.error === 'string') message = data.error
      } catch { /* ignore non-JSON error bodies */ }
      posthog.capture('waitlist_error', { reason: message })
      setError(message)
    }
  } catch {
    posthog.capture('waitlist_error', { reason: 'network_error' })
    setError('Something went wrong. Please try again.')
  } finally {
    setLoading(false)
  }
}
```

- [ ] **Step 2: Verify the full funnel in browser**

With the dev server running, scroll to the waitlist and submit a test email. In PostHog Live Events you should see in sequence:
1. `waitlist_submitted`
2. `waitlist_success` (or `waitlist_error` with a `reason` property if the API is not configured)

- [ ] **Step 3: Commit**

```bash
git add app/components/Waitlist.tsx
git commit -m "feat: add waitlist funnel events (submitted / success / error)"
```

---

## Final Verification

After all tasks are complete, exercise the full page in a browser and confirm these events appear in PostHog Live Events in order:

| Event | Trigger |
|-------|---------|
| `$pageview` | Page load |
| `section_viewed` `{ section: 'philosophy' }` | Scroll to Philosophy |
| `section_viewed` `{ section: 'worlds' }` | Scroll to Worlds |
| `section_viewed` `{ section: 'waitlist' }` | Scroll to Waitlist |
| `waitlist_submitted` | Click "Get Early Access" |
| `waitlist_success` | Successful subscription |

To build the conversion funnel in PostHog: Insights → Funnel → add steps in order: `$pageview` → `section_viewed` (filter `section = waitlist`) → `waitlist_submitted` → `waitlist_success`.
