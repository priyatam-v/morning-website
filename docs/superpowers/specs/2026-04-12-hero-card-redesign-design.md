# Hero Card Redesign — Design Spec

**Date:** 2026-04-12  
**Scope:** Redesign the cards displayed inside the phone mockup in the Hero section to match a new editorial app-screen aesthetic.

---

## Overview

The phone mockup in the Hero section currently shows simple colored cards with a category label, hook headline, teaser text, and a color accent stripe. The new design replaces this with a full-screen app-style layout: a top nav bar, a large unique SVG visual per card, a "LEARN MORE" label, and a white slide-up content card at the bottom with category pill, title, teaser, and action buttons.

---

## Color Palette

All cards share a unified palette. Per-card color variation is removed; differentiation comes from the SVG visuals only.

| Token | Value | Usage |
|---|---|---|
| Screen bg | `#FAF8F4` | Warm ivory — visual area background |
| Dark green | `#2D5A2A` | Nav icons, category pill text, LEARN MORE, action buttons |
| White | `#FFFFFF` | Bottom content card background |
| Text dark | `#1C1C1A` | Hook title |
| Text muted | `rgba(28, 28, 26, 0.5)` | Teaser body text |
| Pill bg | `rgba(45, 90, 42, 0.08)` | Category pill background tint |

---

## Card Structure

Each card fills the full phone screen area and is divided into three vertical zones:

### 1. Top Nav Bar (~36px)
- **Left:** `←` back arrow (SVG icon, dark green)
- **Center:** dot pagination — one dot per card, active dot filled dark green, inactive dots are light gray; matches current card index
- **Right:** bookmark icon (SVG icon, dark green, filled state)
- Background: transparent over the visual area

### 2. Visual Area (~52% of screen height)
- Background: `#FAF8F4`
- Centered SVG composition, unique per card (see SVG Visuals section)
- **LEARN MORE** label: rotated 90° clockwise, anchored to the right edge vertically centered in this zone; `font-size: 8px`, `letter-spacing: 0.15em`, `text-transform: uppercase`, color: dark green

### 3. Bottom Content Card (~48% of screen height)
- Background: `#FFFFFF`
- `border-radius: 20px 20px 0 0` — rounded top corners only
- Padding: `16px 16px 12px`
- Contents top to bottom:
  1. **Category pill** — `TYPE · WORLD` format (e.g. `MENTAL MODEL · HEALTH`); `font-size: 8px`, `font-weight: 700`, `letter-spacing: 0.08em`, `text-transform: uppercase`; pill shape with `border-radius: 20px`, dark green text, pill bg tint
  2. **Hook title** — `font-size: 13px`, `font-weight: 600`, `line-height: 1.35`, text dark; margin-top `8px`
  3. **Teaser** — `font-size: 10px`, `line-height: 1.6`, text muted; margin-top `6px`
  4. **Action row** — flex row, space-between; margin-top `auto` (pushed to bottom)
     - Left: thumbs-up icon + `HELPFUL` label
     - Right: bookmark icon + `SAVE` label
     - Both: `font-size: 8px`, `font-weight: 700`, `letter-spacing: 0.08em`, dark green

---

## SVG Visuals (per card)

### Health — "Sunrise / Circadian"
- Two overlapping soft circles: a large one (~110px diameter) slightly above center, a smaller one offset lower-right
- Gradient fill: warm peach-to-cream (`#F5C4A8` → `#FAF8F4`)
- Evokes a sunrise / circadian rhythm arc
- Subtle radial glow behind the main circle

### Money — "Growth Chart"
- Three ascending rectangles (bar chart), rounded tops
- Heights roughly: 40%, 65%, 90% of visual zone
- Fill: warm gold tones (`#D4A843`, `#C49030`, `#B07820`) — darkening left to right
- Centered horizontally with slight gap between bars

### World — "Globe Lattice"
- Two or three overlapping ellipses forming a globe-like wireframe
- Fill: none; `stroke` only, muted blue (`rgba(24, 95, 165, 0.35)`)
- Stroke width: `1.5px`
- A solid filled circle in the center (`rgba(24, 95, 165, 0.12)`) as a soft background

---

## Data Model Changes

Remove the `color` and `bg` fields from the `CARDS` array. Add `type` (string) and `Visual` (React component) fields.

**Before:**
```ts
{ world: 'Health', color: '#1D9E75', bg: '#E1F5EE', hook: '...', teaser: '...' }
```

**After:**
```ts
{ world: 'Health', type: 'Mental Model', hook: '...', teaser: '...', Visual: HealthVisual }
```

The three SVG visual components (`HealthVisual`, `MoneyVisual`, `WorldVisual`) are defined as small functional React components returning an `<svg>` element, co-located in `Hero.tsx` above the `CARDS` array.

---

## Animation

No changes to slide animations. Existing `slideInUp` / `slideOutUp` / `slideInDown` / `slideOutDown` keyframes and entering/exiting class logic remain intact. The new card layout is a drop-in replacement within the same `cardSlot` container.

---

## Responsive

Phone shell sizing at mobile breakpoint (`≤640px`) stays unchanged (`172×372px`). The new layout scales proportionally within that shell. Font sizes within the card are already small enough for both desktop (280px shell) and mobile (172px shell) without additional breakpoints.

---

## Files Changed

- `app/components/Hero.tsx` — update `CARDS` data, add SVG visual components, update JSX card template
- `app/components/Hero.module.css` — update card, category, hook, teaser, and add new styles for nav bar, visual area, LEARN MORE label, content card, action row

---

## Dot Indicator Cleanup

The existing dot indicators rendered **below** the phone shell (`styles.dots` / `styles.dot`) must be **removed**. The new in-card nav bar includes its own dot pagination inside the screen, making the external dots redundant.

---

## Out of Scope

- Scroll/gesture/keyboard logic — no changes
- Other sections (Philosophy, Worlds, Waitlist, Footer) — no changes
