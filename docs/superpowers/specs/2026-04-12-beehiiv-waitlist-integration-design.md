# Beehiiv Waitlist Integration Design

**Date:** 2026-04-12
**Status:** Approved

## Overview

Integrate the existing `Waitlist.tsx` email form with Beehiiv's Subscribe API so that submitted emails are collected into the Morning Beehiiv publication. The UI remains unchanged; only the submission logic and a new API route are added.

---

## Architecture

```
Browser (Waitlist.tsx)
  → POST /api/subscribe  { email }
    → app/api/subscribe/route.ts  (server-side, Next.js App Router)
      → Beehiiv Subscribe API
         POST https://api.beehiiv.com/v2/publications/{pub_id}/subscriptions
        ← 200/201 → return { ok: true }
        ← 4xx/5xx → return { error: "…" }
  ← Waitlist.tsx shows success or error state
```

### New files
| File | Purpose |
|------|---------|
| `app/api/subscribe/route.ts` | Server-side API route — calls Beehiiv, keeps API key out of browser |
| `.env.local` | Holds `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` |

### Unchanged files (visual)
- `app/components/Waitlist.module.css` — no changes
- All other components — no changes

---

## Environment Variables

```
BEEHIIV_API_KEY=your_api_key_here
BEEHIIV_PUBLICATION_ID=your_publication_id_here
```

These must be set in `.env.local` locally and in the deployment environment (Vercel, etc.) for production.

---

## API Route: `app/api/subscribe/route.ts`

**Method:** `POST` only (405 for anything else)

**Request body:**
```json
{ "email": "user@example.com" }
```

**Behaviour:**
1. Check rate limit for the requesting IP — return `429` if exceeded
2. Parse and validate `email` from JSON body — return `400` if missing or malformed
3. Call Beehiiv Subscribe API:
   - `reactivate_existing: true` — prevents duplicate confirmation emails for re-subscribers
   - `double_opt_in: true` — Beehiiv sends a confirmation email; subscriber is only added after they confirm
   - `utm_source: "waitlist"` — tracks the sign-up source in Beehiiv dashboard
4. On Beehiiv `2xx` → return `200 { ok: true }`
5. On Beehiiv `4xx/5xx` or network failure → return `502 { error: "Could not subscribe. Please try again." }`

**Error responses:**
| Scenario | Status | Body |
|----------|--------|------|
| Rate limit exceeded | 429 | `{ error: "Too many requests. Please try again later." }` |
| Missing / invalid email | 400 | `{ error: "Invalid email" }` |
| Beehiiv API failure | 502 | `{ error: "Could not subscribe. Please try again." }` |

---

## Waitlist.tsx Changes

The form's visual structure and CSS are untouched. Only `handleSubmit` and state are updated.

**State additions:**
- `error: string | null` — holds an error message to display below the form

**`handleSubmit` replacement:**
- Remove the fake `setTimeout` mock
- `fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })`
- On `ok: true` response → `setSubmitted(true)` (existing success UI shown)
- On error response → `setError(response.error)`, form stays visible so user can retry
- Clear `error` on each new submission attempt

**Error display:**
- A small error line rendered below the form (only when `error !== null`)
- Styled to be noticeable but not alarming — red-tinted text, small font, consistent with the section's aesthetic

---

## Rate Limiting

**Strategy:** In-memory per-IP rate limiting — no additional services or dependencies required.

**Limit:** 5 requests per IP per 60 seconds.

**Implementation:** A module-level `Map<string, { count: number; resetAt: number }>` tracks request counts per IP. On each request, the IP is extracted from the `x-forwarded-for` header (Vercel sets this) with a fallback to `"unknown"`. If the window has expired, the counter resets; if `count >= 5`, return `429`.

**Trade-offs:**
- Resets on serverless cold starts — acceptable for a newsletter waitlist
- Does not protect against distributed abuse across many IPs — CAPTCHA can be added later if needed
- Zero cost, zero dependencies — right level of protection for this use case

---

## Opt-in Strategy

**Double opt-in** is used. After form submission, Beehiiv sends a confirmation email to the address. The subscriber only appears on the Morning publication list after they click the confirmation link. This protects sender reputation and ensures only valid, interested emails are collected.

---

## Out of Scope

- CAPTCHA / bot protection
- Analytics events (e.g. tracking conversions beyond Beehiiv's `utm_source`)
