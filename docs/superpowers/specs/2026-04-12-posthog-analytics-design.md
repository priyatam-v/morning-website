# PostHog Analytics — Design Spec

**Date:** 2026-04-12  
**Project:** Morning (nextjs/morning-website)  
**Status:** Approved

---

## Overview

Add PostHog analytics to the Morning marketing/waitlist site. The goal is a full picture of visitor behavior: both the waitlist conversion funnel and section engagement as visitors scroll down the page.

**Constraints:**
- PostHog Cloud (app.posthog.com) — managed SaaS, free tier (up to 1M events/month)
- Cookieless / privacy-first mode — no consent banner required, aligns with Morning's trust-first brand
- Events only — no session recording, heatmaps, or feature flags
- Minimal surface area — 1 new file, 4 modified files

---

## Architecture

### New file

**`app/components/PostHogProvider.tsx`**  
A `'use client'` component that initializes PostHog once on mount and wraps its children. Added to `app/layout.tsx` to cover the entire app.

Init config:
```ts
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  persistence: 'memory',       // cookieless — no consent banner needed
  capture_pageview: true,       // automatic $pageview on load
  autocapture: false,           // we define our own events, no noise
})
```

PostHog fails silently if the key is missing, so dev environments without `.env.local` configured will not throw errors.

### Modified files

| File | Change |
|------|--------|
| `app/layout.tsx` | Wrap `{children}` with `<PostHogProvider>` |
| `app/components/Waitlist.tsx` | Fire 3 funnel events in `handleSubmit` |
| `app/components/Philosophy.tsx` | Add IntersectionObserver → fire `section_viewed` |
| `app/components/Worlds.tsx` | Add IntersectionObserver → fire `section_viewed` |

Note: `Waitlist.tsx` already has an IntersectionObserver for its CSS animation — the `section_viewed` event fires from that same observer callback.

---

## Environment Variables

Add to `.env.local` (not committed):

```
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Both are `NEXT_PUBLIC_` so the browser bundle can read them. Obtain the key from the PostHog Cloud project settings.

---

## Event Taxonomy

### Automatic (PostHog built-in)

| Event | Trigger | Properties |
|-------|---------|------------|
| `$pageview` | Page load | URL, referrer, UTM params |

### Section engagement

| Event | Trigger | Properties |
|-------|---------|------------|
| `section_viewed` | Philosophy section enters viewport (30% threshold) | `{ section: 'philosophy' }` |
| `section_viewed` | Worlds section enters viewport (30% threshold) | `{ section: 'worlds' }` |
| `section_viewed` | Waitlist section enters viewport (30% threshold) | `{ section: 'waitlist' }` |

IntersectionObserver fires once per session (guard with a `hasTracked` ref to avoid duplicate events on scroll back).

### Waitlist funnel

| Event | Trigger | Properties |
|-------|---------|------------|
| `waitlist_submitted` | User clicks "Get Early Access" | — |
| `waitlist_success` | `/api/subscribe` returns 200 | — |
| `waitlist_error` | `/api/subscribe` returns error | `{ reason: string }` |

---

## Funnel This Unlocks in PostHog

```
$pageview → section_viewed (waitlist) → waitlist_submitted → waitlist_success
```

This four-step funnel in PostHog shows:
1. How many visitors land on the page
2. How many scroll far enough to see the waitlist form
3. How many attempt to sign up
4. How many successfully convert

Drop-off between steps 2→3 (saw form but didn't try) and 3→4 (tried but failed) are the key signals.

---

## Error Handling

- PostHog init: fails silently if key is missing or network is unavailable — no user impact
- `section_viewed` events: fired inside IntersectionObserver callbacks, no try/catch needed (PostHog SDK handles internally)
- `waitlist_error` event: fired in the existing `catch` block in `Waitlist.tsx` — the `reason` property captures the error message shown to the user

---

## Testing

No new unit tests required. PostHog initialization is a side effect with no business logic. The existing rate-limit tests in `app/lib/__tests__/rate-limit.test.ts` are unaffected.

Manual verification: open the PostHog Cloud dashboard after deploying — confirm `$pageview`, `section_viewed`, and waitlist funnel events appear when exercising the page.

---

## Dependencies

```
posthog-js   # npm install posthog-js
```

No other new dependencies.
