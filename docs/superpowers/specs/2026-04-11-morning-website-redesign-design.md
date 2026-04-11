# Morning Website Redesign — Design Spec

**Date:** 2026-04-11
**Project:** Morning landing page (`/Users/priyatamv/projects/nextjs/morning-website`)
**Stack:** Next.js 14 App Router, TypeScript, CSS Modules
**Status:** Design locked. Ready for implementation.

---

## Overview

Full redesign of the Morning pre-launch landing page. The page is a full-screen scroll-snapped single-page layout managed by `SectionScroller.tsx`. All sections were brainstormed visually via a local companion server. This spec covers every change needed to implement the locked designs.

**Section order (new):**
1. Hero
2. Contrast
3. Philosophy
4. Worlds
5. Waitlist (includes Footer)

`CardExperience` is removed entirely. Previous order had it at index 2; removal shifts all subsequent indices down by one.

---

## 1. Global Changes

### 1.1 CSS Variable Rename (`app/globals.css`)
- Rename `--career` → `--world` (colour value stays: `#185FA5`)
- Find and replace all usages across CSS modules

### 1.2 Logo — Use SVG Wordmark
- Source file: `static/Morning_Logo.svg` (single-path SVG, fill `#3D3D3A`)
- Create `public/` folder and copy `Morning_Logo.svg` into it → `public/Morning_Logo.svg`
- **Light backgrounds (Navbar):** Use as-is, `fill` is already `#3D3D3A`
- **Dark backgrounds (Footer):** Apply `filter: brightness(0) invert(1)` via CSS to render white, or use `fill="currentColor"` with `color: #F2F0EB` on the parent
- Replace all span-built logo markup in `Navbar.tsx` and `Footer.tsx` with `<img src="/Morning_Logo.svg" … />`
- Suggested size in Navbar: `height: 28px; width: auto`
- Suggested size in Footer: `height: 22px; width: auto`

---

## 2. SectionScroller (`app/components/SectionScroller.tsx`)

- `CardExperience` is removed, so the total section count drops from 6 → 5
- `CARD_SECTION_INDEX` was `2` (pointing at CardExperience for special scroll handling). With that section gone, the card-scroll logic it powered is no longer needed — **remove `CARD_SECTION_INDEX` and `TOTAL_CARDS` constants and all associated card-section special-case logic**
- Verify that wheel/touch/keyboard navigation works cleanly across 5 sections after removal

---

## 3. Navbar (`app/components/Navbar.tsx`)

- The "Join Waitlist" button fires `navigate-to-section` with index `5`. With CardExperience removed, Waitlist is now at index `4` — update accordingly
- Replace span-built logo with `<img src="/Morning_Logo.svg" height="28" />` (see §1.2)

---

## 4. Hero (`app/components/Hero.tsx` + `Hero.module.css`)

### 4.1 Layout
- Two-column grid: `55fr 45fr`
- Left: headline + sub-line
- Right: phone mockup with sliding cards

### 4.2 Copy
- **Headline:** "Something worth knowing. Every morning."
  - "Something worth knowing." — Petrona serif, bold, `#3D3D3A`
  - "Every morning." — Petrona serif, italic, lighter weight, `#8BAF8C`
- **Sub-line:** Remove. The headline and phone mockup carry the section on their own.

### 4.3 Phone Mockup
- Dimensions: `280px × 606px` (iPhone 14 Pro ratio 1:2.164, ~67% viewport height)
- Outer shell: dark (`#1C1C1A`), `border-radius: 44px`, subtle `box-shadow`
- Dynamic island: centred at top, `60px × 20px`, `border-radius: 10px`
- Inner screen: `#F2F0EB` background, `border-radius: 36px`, `overflow: hidden`
- Cards render inside the screen area

### 4.4 Cards (5 total — one per world)
Each card has:
- Category label (colour-coded, uppercase, 10px)
- Hook headline (Petrona serif, ~18px)
- 2-line teaser body (Plus Jakarta Sans, 12px, muted)
- World colour as a left-border accent or background tint

Card content (hook-only, no full article copy):

| World | Category | Hook |
|---|---|---|
| The Body | Health | The 8-hour myth — why sleeping longer might actually be hurting you |
| The Game | Money | Why your savings account is quietly making you poorer |
| The World | World | The country quietly buying up more land than anyone realises |
| The Shift | Tech | The AI nobody is talking about — and why it changes everything |
| The Mind | Psychology | The bias that makes you terrible at predicting your own happiness |

### 4.5 Card Slide Animation
- Two DOM elements used simultaneously: outgoing card exits, incoming card enters
- **Exit (outgoing):** `translateY(0)` → `translateY(-100%)`, opacity 1 → 0
- **Enter (incoming):** `translateY(100%)` → `translateY(0)`, opacity 0 → 1
- Duration: `400ms`, easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Both transitions run simultaneously (not sequential)

### 4.6 Controls
- **Prev / Next** text buttons, positioned below the phone mockup, centred
- Minimal style: no border, no background, Petrona italic, muted colour, subtle hover
- **Auto-advance:** every 4 seconds via `setTimeout`; timer resets on manual navigation
- No dot position indicators inside the card

---

## 5. Contrast (`app/components/Contrast.tsx` + `Contrast.module.css`)

### 5.1 Layout — Direction B (stacked row pairs)
- Container: `background: #E8E4DC`, `border-radius: 20px`, `padding: 56px 64px`
- Grid per row: `grid-template-columns: 1fr 40px 1fr`
- Label row uses the same grid columns so text aligns with content below
- Rows separated by `border-bottom: 1px solid rgba(61,61,58,0.08)`

### 5.2 Label Row
- Left label: "Most mornings" — 9px uppercase, `rgba(61,61,58,0.4)`
- Right label: "With Morning" — 9px uppercase, `#8BAF8C`

### 5.3 Content (3 rows)

| Left (before) | Arrow | Right (after) |
|---|---|---|
| You meant to stop. You didn't. | → | You know exactly *when you're done.* |
| You saw a lot. You kept none of it. | → | Five things. *Actually yours.* |
| Something happened. You half-understood it. | → | Something happened. *Now you understand why.* |

- Left text: Petrona serif, 16px, `rgba(61,61,58,0.58)` — readable but clearly secondary
- Arrow: `rgba(61,61,58,0.2)`, centred
- Right text: Petrona serif, 16px, `font-weight: 600`, `#3D3D3A`; italic `em` in `#8BAF8C`

---

## 6. Philosophy (`app/components/Philosophy.tsx` + `Philosophy.module.css`)

### 6.1 Layout — Variation 4 (numbered declarations)
- Eyebrow: "Our philosophy" — 10px uppercase, `#C4856A`
- Five numbered rows, each: `display: flex; align-items: baseline; gap: 16px`
- Rows separated by `border-bottom: 1px solid rgba(61,61,58,0.08)`
- Scroll-triggered stagger animation: each row fades + slides up with 100ms delay between rows

### 6.2 Content

| # | Text | Style |
|---|---|---|
| 01 | Attention is *finite.* Treat it that way. | Strong (`#3D3D3A`, weight 600) |
| 02 | No streaks. No guilt. No algorithm. | Muted (`rgba(61,61,58,0.45)`, weight 400) |
| 03 | Five ideas. Done. *Every morning.* | Strong |
| 04 | Knowledge compounds. Slowly. Reliably. | Muted |
| 05 | The way the best things *always have.* | Strong |

- Number labels: 10px, `rgba(61,61,58,0.25)`, `width: 18px`, `flex-shrink: 0`
- Italic `em` spans: `#8BAF8C`, `font-weight: 400`
- Font size: `clamp(26px, 3.2vw, 36px)`

---

## 7. CardExperience — Remove

- Delete `app/components/CardExperience.tsx`
- Delete `app/components/CardExperience.module.css`
- Remove import and entry from the sections array in `app/page.tsx`

---

## 8. Worlds (`app/components/Worlds.tsx` + `Worlds.module.css`)

### 8.1 Section Header
- Remove the current eyebrow + heading + sub-line structure
- Replace with a single label: "What Morning covers"
- Style: Petrona serif, `clamp(22px, 2.5vw, 28px)`, `font-weight: 600`, `#3D3D3A`
- Aligned left (not centred), `max-width: 1100px`, `margin: 0 auto 44px`
- No sub-line, no footer text below the cards

### 8.2 Card Grid
- `grid-template-columns: repeat(5, 1fr)`, `gap: 12px`, `max-width: 1100px`

### 8.3 "The Work" → "The World" card update
Update the existing Career/Work card entry:
- `id`: `world`
- `name`: "The World"
- `category`: "World"
- `color`: `#185FA5`
- `bg`: `#E6F1FB`
- `description`: ["Geopolitics, history, science, society.", "The forces shaping the world you wake up in."]
- **SVG illustration** — connected nodes:
  - Centre node: `r=5`, fill `#185FA5`, opacity `0.6`; outer glow ring `r=12`, opacity `0.2`
  - 5 outer nodes: `r=3.5`, fill `#185FA5`, opacity `0.3`; positioned at roughly: top, top-left, top-right, bottom-left, bottom-right
  - Lines connecting centre to each outer node: `stroke-width: 1`, `stroke-opacity: 0.2`

### 8.4 Card Style (all 5 cards)
- `border-radius: 14px`, `padding: 22px 18px 20px`
- Illustration: `48px × 48px` SVG
- Category label: 9px uppercase, colour-matched to world
- Name: Petrona serif, 16px, `font-weight: 600`, `#3D3D3A`
- Description: 11px, `rgba(61,61,58,0.58)`, `line-height: 1.65`
- Hover: `transform: translateY(-3px)`, `transition: 0.2s ease`

---

## 9. Waitlist (`app/components/Waitlist.tsx` + `Waitlist.module.css`)

### 9.1 Layout
- Background: `#F2F0EB` (light — matches rest of page)
- Content centred vertically and horizontally
- `padding: 80px 32px`

### 9.2 Copy
- **Heading:** "Morning is almost ready." — Petrona serif, `clamp(28px, 3.5vw, 40px)`, `font-weight: 600`, `#3D3D3A`
- **Sub-line:** "Leave your email. We'll let you know." — 15px, `rgba(61,61,58,0.45)`, `margin-bottom: 40px`

### 9.3 Form
- Inline pill layout: `display: flex; gap: 8px; max-width: 420px`
- Input: pill shape (`border-radius: 100px`), light border, `background: rgba(61,61,58,0.05)`
- Button label: "Join the waitlist"
- Button: dark background `#3D3D3A`, `color: #F2F0EB`, `border-radius: 100px`
- Button hover: background transitions to `#8BAF8C`
- Success state (existing): keep italic "We'll reach out when Morning is ready." with green dot

---

## 10. Footer (`app/components/Footer.tsx` + `Footer.module.css`)

Keep current design and layout. Two changes only:

1. **Email:** `hello@morning.app` → `hello@getmorning.co`
2. **Instagram link:** Add `<a href="https://instagram.com/getmorning.co">@getmorning.co on Instagram</a>` to `.links` alongside the email
3. **Logo:** Replace span-built logo with `<img src="/Morning_Logo.svg" />` styled white via CSS filter (see §1.2)

---

## Implementation Notes

- The Hero phone mockup and card animation are the most complex piece — implement and test in isolation first before integrating into the full page
- `SectionScroller` card-section logic removal must be done carefully — test all 5 sections navigate correctly after
- CSS variable rename (`--career` → `--world`) — grep all `.module.css` files before and after to confirm no missed references
- The `public/` folder must be created and `Morning_Logo.svg` copied before any logo `<img>` tags are added
