# Hero Card Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the cards inside the phone mockup in the Hero section to an editorial app-screen layout with a top nav bar, unique SVG visual per card, and a white content card at the bottom.

**Architecture:** Two files change — `Hero.module.css` gets a full card-styles rewrite (old `.cardCategory`, `.cardAccent`, `.dots` removed; new nav, visual zone, and content card styles added) and `Hero.tsx` gets three inline SVG components, an updated `CARDS` data array, and a rewritten card JSX template. No changes to scroll/gesture/animation logic.

**Tech Stack:** Next.js 14, React, CSS Modules, inline SVG

---

## File Map

| File | Change |
|---|---|
| `app/components/Hero.module.css` | Replace card styles; remove dot styles; add nav/visual/content card styles; update mobile breakpoint |
| `app/components/Hero.tsx` | Add 3 SVG visual components; update `CARDS` array; rewrite card JSX; remove external dots markup |

---

## Task 1: Rewrite card styles in Hero.module.css

**Files:**
- Modify: `app/components/Hero.module.css`

- [ ] **Step 1: Replace everything from `.dots` through end of file**

Open `app/components/Hero.module.css`. Delete from line 59 (`/* ── Card position dots ── */`) to end of file and replace with the following. Keep everything above line 59 (`.hero`, `.left`, `.headline`, `.subline`, `.right`, `.phone`, `.island`, `.screen`, `.cardSlot`) unchanged.

```css
/* ── Card layout ── */
.card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: #FAF8F4;
}

/* In-card nav bar */
.cardNav {
  flex-shrink: 0;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  position: relative;
  z-index: 2;
}

.cardNavDots {
  display: flex;
  gap: 4px;
  align-items: center;
}

.cardNavDot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(45, 90, 42, 0.2);
}

.cardNavDotActive {
  background: #2D5A2A;
}

/* Visual zone */
.cardVisual {
  flex: 1;
  min-height: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* LEARN MORE vertical label */
.learnMoreWrap {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.learnMore {
  transform: rotate(90deg);
  white-space: nowrap;
  font-family: var(--font-jakarta);
  font-size: 6px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2D5A2A;
  font-weight: 700;
}

/* Bottom content card */
.cardContent {
  flex-shrink: 0;
  height: 46%;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 14px 14px 10px;
  display: flex;
  flex-direction: column;
}

.cardPill {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 20px;
  background: rgba(45, 90, 42, 0.08);
  font-family: var(--font-jakarta);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2D5A2A;
  align-self: flex-start;
}

.cardHook {
  font-family: var(--font-jakarta);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: #1C1C1A;
  margin-top: 8px;
}

.cardTeaser {
  font-family: var(--font-jakarta);
  font-size: 10px;
  line-height: 1.6;
  color: rgba(28, 28, 26, 0.5);
  margin-top: 6px;
}

.cardActions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 8px;
}

.cardActionBtn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-jakarta);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2D5A2A;
}

/* ── Slide animations ── */
@media (prefers-reduced-motion: no-preference) {
  @keyframes slideInUp {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes slideOutUp {
    from { transform: translateY(0);     opacity: 1; }
    to   { transform: translateY(-100%); opacity: 0; }
  }
  @keyframes slideInDown {
    from { transform: translateY(-100%); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }
  @keyframes slideOutDown {
    from { transform: translateY(0);    opacity: 1; }
    to   { transform: translateY(100%); opacity: 0; }
  }

  .entering-next  { animation: slideInUp    400ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .exiting-next   { animation: slideOutUp   400ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .entering-prev  { animation: slideInDown  400ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .exiting-prev   { animation: slideOutDown 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .hero {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    padding: 72px 6vw 20px;
    gap: 20px;
    align-items: start;
  }

  .left {
    align-items: center;
    text-align: center;
    order: 1;
  }

  .headline {
    font-size: clamp(26px, 8vw, 36px);
  }

  .subline {
    font-size: 14px;
    max-width: 100%;
    text-align: center;
    margin-top: 12px;
  }

  .right {
    order: 2;
    justify-content: flex-start;
  }

  .phone {
    width: 172px;
    height: 372px;
    border-radius: 28px;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.08),
      0 16px 40px rgba(0,0,0,0.3),
      0 4px 12px rgba(0,0,0,0.15);
  }

  .island {
    width: 56px;
    height: 16px;
    top: 8px;
    border-radius: 8px;
  }

  .screen {
    inset: 5px;
    border-radius: 24px;
  }

  .cardNav {
    height: 26px;
    padding: 0 10px;
  }

  .cardContent {
    border-radius: 14px 14px 0 0;
    padding: 10px 10px 8px;
  }

  .cardHook {
    font-size: 10px;
    line-height: 1.4;
  }

  .cardTeaser {
    font-size: 8px;
  }

  .cardPill {
    font-size: 6px;
    padding: 2px 6px;
  }

  .cardActionBtn {
    font-size: 6px;
    gap: 3px;
  }

  .learnMore {
    font-size: 5px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Hero.module.css
git commit -m "style: rewrite hero card CSS for new app-screen layout"
```

---

## Task 2: Add SVG visual components to Hero.tsx

**Files:**
- Modify: `app/components/Hero.tsx` (add above the `CARDS` constant, after the imports)

- [ ] **Step 1: Add the three SVG visual components**

In `app/components/Hero.tsx`, after the import lines and before the `CARDS` constant, insert:

```tsx
function HealthVisual() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5C4A8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FAF8F4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="95" r="80" fill="url(#hGlow)" />
      <circle cx="95" cy="85" r="55" fill="#F5C4A8" opacity="0.55" />
      <circle cx="125" cy="115" r="32" fill="#F0A888" opacity="0.4" />
    </svg>
  )
}

function MoneyVisual() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="46" y="112" width="28" height="48" rx="4" fill="#D4A843" opacity="0.5" />
      <rect x="84" y="80" width="28" height="80" rx="4" fill="#C49030" opacity="0.65" />
      <rect x="122" y="48" width="28" height="112" rx="4" fill="#B07820" opacity="0.8" />
    </svg>
  )
}

function WorldVisual() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="90" r="60" fill="rgba(24,95,165,0.07)" />
      <ellipse cx="100" cy="90" rx="60" ry="60" fill="none" stroke="rgba(24,95,165,0.3)" strokeWidth="1.5" />
      <ellipse cx="100" cy="90" rx="32" ry="60" fill="none" stroke="rgba(24,95,165,0.3)" strokeWidth="1.5" />
      <ellipse cx="100" cy="90" rx="60" ry="22" fill="none" stroke="rgba(24,95,165,0.3)" strokeWidth="1.5" />
      <line x1="40" y1="90" x2="160" y2="90" stroke="rgba(24,95,165,0.15)" strokeWidth="1" />
    </svg>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat: add SVG visual components for hero cards"
```

---

## Task 3: Update CARDS data and rewrite card JSX

**Files:**
- Modify: `app/components/Hero.tsx`

- [ ] **Step 1: Replace the CARDS array**

Replace the existing `CARDS` constant with:

```tsx
const CARDS = [
  {
    world: 'Health',
    type: 'Mental Model',
    hook: 'The 8-hour myth — why sleeping longer might actually be hurting you',
    teaser: 'New research on sleep quality vs. quantity is changing what experts recommend.',
    Visual: HealthVisual,
  },
  {
    world: 'Money',
    type: 'Deep Dive',
    hook: 'Why your savings account is quietly making you poorer',
    teaser: "Inflation math that most banks don't want you to think about.",
    Visual: MoneyVisual,
  },
  {
    world: 'World',
    type: 'Explainer',
    hook: 'The country quietly buying up more land than anyone realises',
    teaser: 'A map of global land acquisitions that rewrites the geopolitical story.',
    Visual: WorldVisual,
  },
]
```

- [ ] **Step 2: Rewrite the card JSX template and remove external dots**

In the `return` of the `Hero` component, replace the entire `<div className={styles.right}>` block with:

```tsx
<div className={styles.right}>
  <div className={styles.phone}>
    <div className={styles.island} />
    <div className={styles.screen}>
      <div className={styles.cardSlot}>
        {prevCard && (
          <div
            className={`${styles.card} ${animDir === 'next' ? styles['exiting-next'] : styles['exiting-prev']}`}
          >
            {/* Nav */}
            <div className={styles.cardNav}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="#2D5A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className={styles.cardNavDots}>
                {CARDS.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.cardNavDot} ${i === prev ? styles.cardNavDotActive : ''}`}
                  />
                ))}
              </div>
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path d="M2 2h10v12l-5-3-5 3V2z" stroke="#2D5A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Visual */}
            <div className={styles.cardVisual}>
              <prevCard.Visual />
              <div className={styles.learnMoreWrap}>
                <span className={styles.learnMore}>Learn More</span>
              </div>
            </div>
            {/* Content */}
            <div className={styles.cardContent}>
              <span className={styles.cardPill}>{prevCard.type} · {prevCard.world}</span>
              <p className={styles.cardHook}>{prevCard.hook}</p>
              <p className={styles.cardTeaser}>{prevCard.teaser}</p>
              <div className={styles.cardActions}>
                <div className={styles.cardActionBtn}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3m7-4V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" stroke="#2D5A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Helpful
                </div>
                <div className={styles.cardActionBtn}>
                  <svg width="10" height="12" viewBox="0 0 14 16" fill="none">
                    <path d="M2 2h10v12l-5-3-5 3V2z" stroke="#2D5A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Save
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`${styles.card} ${animDir ? (animDir === 'next' ? styles['entering-next'] : styles['entering-prev']) : ''}`}
        >
          {/* Nav */}
          <div className={styles.cardNav}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="#2D5A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className={styles.cardNavDots}>
              {CARDS.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.cardNavDot} ${i === current ? styles.cardNavDotActive : ''}`}
                />
              ))}
            </div>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M2 2h10v12l-5-3-5 3V2z" stroke="#2D5A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Visual */}
          <div className={styles.cardVisual}>
            <currentCard.Visual />
            <div className={styles.learnMoreWrap}>
              <span className={styles.learnMore}>Learn More</span>
            </div>
          </div>
          {/* Content */}
          <div className={styles.cardContent}>
            <span className={styles.cardPill}>{currentCard.type} · {currentCard.world}</span>
            <p className={styles.cardHook}>{currentCard.hook}</p>
            <p className={styles.cardTeaser}>{currentCard.teaser}</p>
            <div className={styles.cardActions}>
              <div className={styles.cardActionBtn}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3m7-4V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" stroke="#2D5A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Helpful
              </div>
              <div className={styles.cardActionBtn}>
                <svg width="10" height="12" viewBox="0 0 14 16" fill="none">
                  <path d="M2 2h10v12l-5-3-5 3V2z" stroke="#2D5A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Note: the external `<div className={styles.dots}>` block that previously followed the `<div className={styles.phone}>` is intentionally omitted — it is replaced by the in-card nav dots.

- [ ] **Step 3: Commit**

```bash
git add app/components/Hero.tsx
git commit -m "feat: redesign hero phone cards with app-screen layout and SVG visuals"
```

---

## Task 4: Visual verification

**Files:** None modified

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Verify desktop layout**

Check all three cards (scroll/swipe through them):
- Each card shows a top nav bar with ← icon, 3 dots (active dot is filled green), bookmark icon
- Visual zone shows a unique SVG: soft peach circles (Health), gold bars (Money), blue globe rings (World)
- "LEARN MORE" label is vertically positioned on the right edge of the visual zone
- White content card at the bottom shows pill tag (`MENTAL MODEL · HEALTH`, `DEEP DIVE · MONEY`, `EXPLAINER · WORLD`), hook text, teaser, and HELPFUL / SAVE action buttons
- Slide animations still work when scrolling through cards

- [ ] **Step 3: Verify mobile layout**

Resize browser to < 640px or use DevTools device simulation:
- Phone shell is 172×372px
- Card layout proportions are correct — nav, visual, content card all visible without overflow
- Text is legible at small size

- [ ] **Step 4: Stop dev server**

`Ctrl+C`
