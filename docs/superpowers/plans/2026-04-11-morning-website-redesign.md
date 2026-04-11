# Morning Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all locked design changes to the Morning landing page as specified in `docs/superpowers/specs/2026-04-11-morning-website-redesign-design.md`.

**Architecture:** Full-page scroll-snap layout managed by `SectionScroller.tsx`. Each section is a self-contained React component + CSS Module. The Hero gets the largest change (new phone mockup + card animation); other sections are rewrites or targeted updates. No test framework exists — verification is visual via `npm run dev`.

**Tech Stack:** Next.js 14 App Router, TypeScript, CSS Modules, React 18

---

## File Map

| File | Action | What changes |
|---|---|---|
| `public/Morning_Logo.svg` | **Create** | Copy logo from `static/` |
| `app/globals.css` | **Modify** | Rename `--career` → `--world` |
| `app/page.tsx` | **Modify** | Remove CardExperience |
| `app/components/CardExperience.tsx` | **Delete** | Removed from page |
| `app/components/CardExperience.module.css` | **Delete** | Removed from page |
| `app/components/SectionScroller.tsx` | **Modify** | Remove card-section special logic |
| `app/components/Navbar.tsx` | **Modify** | Section index 5→4, SVG logo |
| `app/components/Footer.tsx` | **Modify** | Email, Instagram link, SVG logo |
| `app/components/Footer.module.css` | **Modify** | Logo image styles |
| `app/components/Hero.tsx` | **Rewrite** | Phone mockup + sliding cards |
| `app/components/Hero.module.css` | **Rewrite** | Two-column layout, phone, animation |
| `app/components/Contrast.tsx` | **Rewrite** | Stacked row pairs layout |
| `app/components/Contrast.module.css` | **Rewrite** | Direction B styles |
| `app/components/Philosophy.tsx` | **Rewrite** | Numbered declarations |
| `app/components/Philosophy.module.css` | **Rewrite** | Numbered row styles |
| `app/components/Worlds.tsx` | **Modify** | Header copy, World card data, remove footer |
| `app/components/Worlds.module.css` | **Modify** | Header styles |
| `app/components/Waitlist.tsx` | **Modify** | Background, heading, sub-line |
| `app/components/Waitlist.module.css` | **Modify** | Light background, form styles |
| `app/components/Navbar.module.css` | **Modify** | Logo image styles |

---

## Task 1: Setup — public folder and logo asset

**Files:**
- Create: `public/Morning_Logo.svg`

- [ ] Copy the SVG logo into the public folder:

```bash
mkdir -p public
cp static/Morning_Logo.svg public/Morning_Logo.svg
```

- [ ] Verify it's accessible — start the dev server and open the URL:

```bash
npm run dev
```

Open `http://localhost:3000/Morning_Logo.svg` — you should see the SVG wordmark rendered in the browser.

- [ ] Commit:

```bash
git add public/Morning_Logo.svg
git commit -m "feat: add Morning logo SVG to public folder"
```

---

## Task 2: Global CSS — rename `--career` to `--world`

**Files:**
- Modify: `app/globals.css`

- [ ] In `app/globals.css`, find and replace the variable definition:

Change:
```css
--career: #185FA5;
```
To:
```css
--world: #185FA5;
```

- [ ] Grep to confirm no remaining `--career` references:

```bash
grep -r "career" app/ --include="*.css" --include="*.tsx"
```

Expected output: no results.

- [ ] Commit:

```bash
git add app/globals.css
git commit -m "refactor: rename CSS variable --career to --world"
```

---

## Task 3: Remove CardExperience

**Files:**
- Modify: `app/page.tsx`
- Delete: `app/components/CardExperience.tsx`
- Delete: `app/components/CardExperience.module.css`

- [ ] Edit `app/page.tsx` — remove the CardExperience import and entry from the sections array:

```tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contrast from './components/Contrast'
import Philosophy from './components/Philosophy'
import Worlds from './components/Worlds'
import Waitlist from './components/Waitlist'
import SectionScroller from './components/SectionScroller'

export default function Home() {
  const sections = [
    <Hero key="hero" />,
    <Contrast key="contrast" />,
    <Philosophy key="philosophy" />,
    <Worlds key="worlds" />,
    <Waitlist key="waitlist" />,
  ]

  return (
    <>
      <Navbar />
      <SectionScroller sections={sections} />
    </>
  )
}
```

- [ ] Delete the CardExperience files:

```bash
rm app/components/CardExperience.tsx
rm app/components/CardExperience.module.css
```

- [ ] Verify the dev server still compiles without errors — check the terminal for TypeScript/build errors. The page should show 5 sections.

- [ ] Commit:

```bash
git add app/page.tsx
git rm app/components/CardExperience.tsx app/components/CardExperience.module.css
git commit -m "feat: remove CardExperience section (now redundant with Hero phone mockup)"
```

---

## Task 4: SectionScroller — remove card-section logic

**Files:**
- Modify: `app/components/SectionScroller.tsx`

- [ ] Replace the entire contents of `app/components/SectionScroller.tsx` with the cleaned version below. This removes `CARD_SECTION_INDEX`, `TOTAL_CARDS`, `activeCard` state, and `CardScrollContext` entirely — the Hero manages its own card state internally:

```tsx
'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import React from 'react'

const SECTION_TRANSITION_MS = 800

interface SectionScrollerProps {
  sections: React.ReactNode[]
}

export default function SectionScroller({ sections }: SectionScrollerProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const isTransitioning = useRef(false)
  const currentSectionRef = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => { currentSectionRef.current = currentSection }, [currentSection])

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioning.current) return
    const sec = currentSectionRef.current

    if (direction === 'next' && sec < sections.length - 1) {
      isTransitioning.current = true
      setCurrentSection(sec + 1)
      setTimeout(() => { isTransitioning.current = false }, SECTION_TRANSITION_MS)
    } else if (direction === 'prev' && sec > 0) {
      isTransitioning.current = true
      setCurrentSection(sec - 1)
      setTimeout(() => { isTransitioning.current = false }, SECTION_TRANSITION_MS)
    }
  }, [sections.length])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < 5) return
      navigate(e.deltaY > 0 ? 'next' : 'prev')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); navigate('next') }
      if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); navigate('prev') }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 50) navigate(delta > 0 ? 'next' : 'prev')
    }

    const handleNavigate = (e: Event) => {
      const idx = (e as CustomEvent).detail?.index
      if (typeof idx !== 'number' || isTransitioning.current) return
      isTransitioning.current = true
      setCurrentSection(idx)
      setTimeout(() => { isTransitioning.current = false }, SECTION_TRANSITION_MS)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('navigate-to-section', handleNavigate)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('navigate-to-section', handleNavigate)
    }
  }, [navigate])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <div
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: `transform ${SECTION_TRANSITION_MS}ms cubic-bezier(0.77, 0, 0.175, 1)`,
          willChange: 'transform',
        }}
      >
        {sections.map((section, i) => (
          <div key={i} style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
            {section}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] Verify: scroll through all 5 sections in the browser — wheel, keyboard arrows, and touch should all work. No TypeScript errors.

- [ ] Commit:

```bash
git add app/components/SectionScroller.tsx
git commit -m "refactor: remove card-section scroll logic from SectionScroller"
```

---

## Task 5: Navbar — update waitlist index and logo

**Files:**
- Modify: `app/components/Navbar.tsx`
- Modify: `app/components/Navbar.module.css`

- [ ] Replace `app/components/Navbar.tsx`:

```tsx
'use client'
import styles from './Navbar.module.css'

export default function Navbar() {
  const scrollToWaitlist = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: { index: 4 } }))
  }

  return (
    <nav className={`${styles.nav} ${styles.visible}`}>
      <div className={styles.inner}>
        <img
          src="/Morning_Logo.svg"
          alt="Morning"
          className={styles.logo}
        />
        <button className={styles.cta} onClick={scrollToWaitlist}>
          Join Waitlist
        </button>
      </div>
    </nav>
  )
}
```

- [ ] Add logo styles to `app/components/Navbar.module.css`. Find the existing `.logo` rule and replace it with:

```css
.logo {
  height: 22px;
  width: auto;
  display: block;
}
```

Remove any existing `.logoText`, `.logoI`, `.logoDot` rules that are no longer needed.

- [ ] Verify: the Morning wordmark logo appears in the navbar in the browser. "Join Waitlist" button still scrolls to the waitlist section (section 4).

- [ ] Commit:

```bash
git add app/components/Navbar.tsx app/components/Navbar.module.css
git commit -m "feat: use SVG logo in Navbar, update waitlist section index to 4"
```

---

## Task 6: Footer — email, Instagram, and logo

**Files:**
- Modify: `app/components/Footer.tsx`
- Modify: `app/components/Footer.module.css`

- [ ] Replace `app/components/Footer.tsx`:

```tsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <img
            src="/Morning_Logo.svg"
            alt="Morning"
            className={styles.logo}
          />
          <p className={styles.tagline}>Learn something real today.</p>
        </div>

        <div className={styles.right}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Morning. Built with care.
          </p>
          <div className={styles.links}>
            <a href="mailto:hello@getmorning.co" className={styles.link}>hello@getmorning.co</a>
            <a href="https://instagram.com/getmorning.co" className={styles.link}>@getmorning.co on Instagram</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.bottomText}>
          No streaks. No guilt. No algorithm.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] Add `.logo` styles to `app/components/Footer.module.css`. Find and replace the existing `.logo`, `.logoText`, `.logoI`, `.logoDot` rules with:

```css
.logo {
  height: 20px;
  width: auto;
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.85;
}
```

- [ ] Verify: footer shows the Morning wordmark in white, email is `hello@getmorning.co`, Instagram link appears.

- [ ] Commit:

```bash
git add app/components/Footer.tsx app/components/Footer.module.css
git commit -m "feat: update Footer with SVG logo, new email, and Instagram link"
```

---

## Task 7: Contrast redesign — Direction B

**Files:**
- Rewrite: `app/components/Contrast.tsx`
- Rewrite: `app/components/Contrast.module.css`

- [ ] Replace `app/components/Contrast.tsx`:

```tsx
'use client'
import styles from './Contrast.module.css'

const ROWS = [
  {
    before: 'You meant to stop. You didn\'t.',
    after: <>You know exactly <em>when you're done.</em></>,
  },
  {
    before: 'You saw a lot. You kept none of it.',
    after: <>Five things. <em>Actually yours.</em></>,
  },
  {
    before: 'Something happened. You half-understood it.',
    after: <>Something happened. <em>Now you understand why.</em></>,
  },
]

export default function Contrast() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.labelRow}>
          <span className={styles.labelBefore}>Most mornings</span>
          <span className={styles.arrow} />
          <span className={styles.labelAfter}>With Morning</span>
        </div>
        {ROWS.map((row, i) => (
          <div key={i} className={styles.row}>
            <p className={styles.before}>{row.before}</p>
            <p className={styles.arrow}>→</p>
            <p className={styles.after}>{row.after}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] Replace `app/components/Contrast.module.css`:

```css
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 0 2rem;
}

.card {
  background: #E8E4DC;
  border-radius: 20px;
  padding: 56px 64px;
  width: 100%;
  max-width: 780px;
}

.labelRow {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  margin-bottom: 24px;
}

.labelBefore {
  font-family: var(--font-jakarta);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  color: rgba(61, 61, 58, 0.4);
}

.labelAfter {
  font-family: var(--font-jakarta);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  color: #8BAF8C;
  padding-left: 16px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(61, 61, 58, 0.08);
}

.row:last-child {
  border-bottom: none;
}

.before {
  font-family: var(--font-petrona);
  font-size: 16px;
  line-height: 1.55;
  color: rgba(61, 61, 58, 0.58);
  padding-right: 16px;
}

.arrow {
  font-size: 14px;
  color: rgba(61, 61, 58, 0.2);
  text-align: center;
  font-family: var(--font-jakarta);
}

.after {
  font-family: var(--font-petrona);
  font-size: 16px;
  line-height: 1.55;
  font-weight: 600;
  color: #3D3D3A;
  padding-left: 16px;
}

.after em {
  color: #8BAF8C;
  font-style: italic;
  font-weight: 400;
}
```

- [ ] Verify in browser: section shows the 3-row before/after grid on a warm card background.

- [ ] Commit:

```bash
git add app/components/Contrast.tsx app/components/Contrast.module.css
git commit -m "feat: redesign Contrast section with stacked row pairs (Direction B)"
```

---

## Task 8: Philosophy redesign — numbered declarations

**Files:**
- Rewrite: `app/components/Philosophy.tsx`
- Rewrite: `app/components/Philosophy.module.css`

- [ ] Replace `app/components/Philosophy.tsx`:

```tsx
'use client'
import { useEffect, useRef } from 'react'
import styles from './Philosophy.module.css'

const LINES = [
  { num: '01', text: <>Attention is <em>finite.</em> Treat it that way.</>, strong: true },
  { num: '02', text: 'No streaks. No guilt. No algorithm.', strong: false },
  { num: '03', text: <>Five ideas. Done. <em>Every morning.</em></>, strong: true },
  { num: '04', text: 'Knowledge compounds. Slowly. Reliably.', strong: false },
  { num: '05', text: <>The way the best things <em>always have.</em></>, strong: true },
]

export default function Philosophy() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible)
        })
      },
      { threshold: 0.2 }
    )
    rowRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Our philosophy</p>
        <div className={styles.rows}>
          {LINES.map((line, i) => (
            <div
              key={line.num}
              ref={el => { rowRefs.current[i] = el }}
              className={styles.row}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className={styles.num}>{line.num}</span>
              <span className={`${styles.text} ${line.strong ? styles.strong : styles.muted}`}>
                {line.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] Replace `app/components/Philosophy.module.css`:

```css
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 0 2rem;
}

.inner {
  max-width: 680px;
  width: 100%;
}

.eyebrow {
  font-family: var(--font-jakarta);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C4856A;
  margin-bottom: 40px;
}

.rows {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(61, 61, 58, 0.08);
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.row:last-child {
  border-bottom: none;
}

.row.visible {
  opacity: 1;
  transform: translateY(0);
}

.num {
  font-family: var(--font-jakarta);
  font-size: 10px;
  font-weight: 700;
  color: rgba(61, 61, 58, 0.25);
  letter-spacing: 0.1em;
  flex-shrink: 0;
  width: 18px;
  padding-top: 4px;
}

.text {
  font-family: var(--font-petrona);
  font-size: clamp(26px, 3.2vw, 36px);
  line-height: 1.3;
}

.strong {
  font-weight: 600;
  color: #3D3D3A;
}

.muted {
  font-weight: 400;
  color: rgba(61, 61, 58, 0.45);
}

.text em {
  font-style: italic;
  font-weight: 400;
  color: #8BAF8C;
}
```

- [ ] Verify in browser: numbered rows animate in with a stagger on scroll. Strong/muted alternation is visible. Italic green text on em elements.

- [ ] Commit:

```bash
git add app/components/Philosophy.tsx app/components/Philosophy.module.css
git commit -m "feat: redesign Philosophy section with numbered declarations (Variation 4)"
```

---

## Task 9: Worlds update — header, World card, remove footer

**Files:**
- Modify: `app/components/Worlds.tsx`
- Modify: `app/components/Worlds.module.css`

- [ ] In `app/components/Worlds.tsx`, make these changes:

**a) Replace the `work` entry in the `WORLDS` array:**

Find:
```tsx
{
  id: 'work',
  name: 'The Work',
  category: 'Career & Productivity',
  color: '#185FA5',
  bg: '#E6F1FB',
  lines: ['Not hustle. Not hacks.', 'Systems that quietly compound over years.'],
  illustration: (color: string) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      ...
    </svg>
  )
},
```

Replace with:
```tsx
{
  id: 'world',
  name: 'The World',
  category: 'World',
  color: '#185FA5',
  bg: '#E6F1FB',
  lines: ['Geopolitics, history, science, society.', 'The forces shaping the world you wake up in.'],
  illustration: (color: string) => (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="28" y1="28" x2="14" y2="17" stroke={color} strokeWidth="1" strokeOpacity="0.2"/>
      <line x1="28" y1="28" x2="43" y2="18" stroke={color} strokeWidth="1" strokeOpacity="0.2"/>
      <line x1="28" y1="28" x2="44" y2="36" stroke={color} strokeWidth="1" strokeOpacity="0.2"/>
      <line x1="28" y1="28" x2="15" y2="40" stroke={color} strokeWidth="1" strokeOpacity="0.2"/>
      <line x1="28" y1="28" x2="28" y2="11" stroke={color} strokeWidth="1" strokeOpacity="0.2"/>
      <circle cx="28" cy="28" r="5" fill={color} opacity="0.2"/>
      <circle cx="28" cy="28" r="2.5" fill={color} opacity="0.6"/>
      <circle cx="14" cy="17" r="3.5" fill={color} opacity="0.3"/>
      <circle cx="43" cy="18" r="3.5" fill={color} opacity="0.3"/>
      <circle cx="44" cy="36" r="3.5" fill={color} opacity="0.3"/>
      <circle cx="15" cy="40" r="3.5" fill={color} opacity="0.3"/>
      <circle cx="28" cy="11" r="2.5" fill={color} opacity="0.22"/>
    </svg>
  )
},
```

**b) Replace the section JSX** — remove the eyebrow/heading/sub and footer, replace with single label. Change the `return` block to:

```tsx
return (
  <section className={styles.section}>
    <div className={styles.header} ref={ref}>
      <p className={styles.heading}>What Morning covers</p>
    </div>

    <div className={styles.grid}>
      {WORLDS.map((world, i) => (
        <div
          key={world.id}
          ref={el => { cardRefs.current[i] = el }}
          className={styles.worldCard}
          style={{ '--world-color': world.color, '--world-bg': world.bg } as React.CSSProperties}
        >
          <div className={styles.worldIllustration}>
            {world.illustration(world.color)}
          </div>
          <div className={styles.worldContent}>
            <p className={styles.worldCategory} style={{ color: world.color }}>
              {world.category}
            </p>
            <h3 className={styles.worldName}>{world.name}</h3>
            <div className={styles.worldLines}>
              {world.lines.map((line, j) => (
                <p key={j} className={j === 1 ? styles.worldLine2 : styles.worldLine1}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)
```

- [ ] In `app/components/Worlds.module.css`, replace the `.eyebrow`, `.heading`, `.sub` rules and any `.footer`, `.footerLine`, `.footerLine2` rules with:

```css
.heading {
  font-family: var(--font-petrona);
  font-size: clamp(22px, 2.5vw, 28px);
  font-weight: 600;
  color: #3D3D3A;
  line-height: 1.3;
}
```

Also update `.header` margin if it has `margin-bottom` set for the old multi-line header — set it to `margin-bottom: 44px`.

- [ ] Verify in browser: "What Morning covers" as a single Petrona heading above the 5 cards. The World card (third) shows connected nodes SVG and updated copy.

- [ ] Commit:

```bash
git add app/components/Worlds.tsx app/components/Worlds.module.css
git commit -m "feat: update Worlds section header and replace Work card with The World"
```

---

## Task 10: Waitlist redesign — light background, new copy

**Files:**
- Modify: `app/components/Waitlist.tsx`
- Modify: `app/components/Waitlist.module.css`

- [ ] In `app/components/Waitlist.tsx`, update the heading and body text inside the `<div className={styles.inner}>`:

Find:
```tsx
<h2 className={styles.heading}>Morning is almost ready.</h2>
<p className={styles.body}>Leave your email and we'll let you know.</p>
```

Replace with:
```tsx
<h2 className={styles.heading}>Morning is almost ready.</h2>
<p className={styles.body}>Leave your email. We'll let you know.</p>
```

- [ ] In `app/components/Waitlist.module.css`, update the `.section` rule to use a light background:

Find:
```css
.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  position: relative;
  overflow: hidden;
}
```

Replace with:
```css
.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}
```

- [ ] Update `.heading` in Waitlist.module.css to use the correct size and dark color:

```css
.heading {
  font-family: var(--font-petrona);
  font-weight: 600;
  font-size: clamp(28px, 3.5vw, 40px);
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--tertiary);
  margin-bottom: 0.5rem;
}
```

- [ ] Update the `.btn` hover state to use the primary green:

Find the existing `.btn:hover:not(:disabled)` rule and update it:
```css
.btn:hover:not(:disabled) {
  background: var(--primary);
  transform: translateY(-1px);
}
```

- [ ] Verify in browser: Waitlist section has a light `#F2F0EB` background (same as rest of page), heading reads "Morning is almost ready." and sub-line reads "Leave your email. We'll let you know." The button hover turns green.

- [ ] Commit:

```bash
git add app/components/Waitlist.tsx app/components/Waitlist.module.css
git commit -m "feat: redesign Waitlist with light background and refined copy"
```

---

## Task 11: Hero redesign — phone mockup with sliding cards

This is the most complex task. The Hero gets a full rewrite: two-column layout with headline on the left and an animated phone mockup on the right.

**Files:**
- Rewrite: `app/components/Hero.tsx`
- Rewrite: `app/components/Hero.module.css`

### Step A — Write Hero.module.css

- [ ] Replace the entire `app/components/Hero.module.css` with:

```css
/* ── Section ── */
.hero {
  height: 100vh;
  display: grid;
  grid-template-columns: 55fr 45fr;
  align-items: center;
  background: var(--bg);
  padding: 0 5vw;
  gap: 4vw;
  overflow: hidden;
}

/* ── Left: headline ── */
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.headline {
  font-family: var(--font-petrona);
  font-size: clamp(32px, 4vw, 54px);
  line-height: 1.18;
  font-weight: 600;
  color: var(--tertiary);
  letter-spacing: -0.02em;
}

.headline em {
  font-style: italic;
  font-weight: 400;
  color: var(--primary);
}

/* ── Right: phone ── */
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* ── Phone shell ── */
.phone {
  width: 280px;
  height: 606px;
  background: #1C1C1A;
  border-radius: 44px;
  position: relative;
  box-shadow:
    0 0 0 1.5px rgba(255,255,255,0.08),
    0 32px 80px rgba(0,0,0,0.35),
    0 8px 20px rgba(0,0,0,0.2);
  flex-shrink: 0;
}

/* Dynamic island */
.island {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 26px;
  background: #000;
  border-radius: 13px;
  z-index: 2;
}

/* Screen */
.screen {
  position: absolute;
  inset: 8px;
  border-radius: 38px;
  background: #F2F0EB;
  overflow: hidden;
}

/* Card slot inside screen */
.cardSlot {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* Individual card */
.card {
  position: absolute;
  inset: 0;
  padding: 52px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cardCategory {
  font-family: var(--font-jakarta);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.cardHook {
  font-family: var(--font-petrona);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
  color: #3D3D3A;
}

.cardTeaser {
  font-family: var(--font-jakarta);
  font-size: 11px;
  line-height: 1.65;
  color: rgba(61, 61, 58, 0.5);
  margin-top: 4px;
}

.cardAccent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
}

/* ── Slide animations ── */
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

.entering-next {
  animation: slideInUp 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.exiting-next {
  animation: slideOutUp 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.entering-prev {
  animation: slideInDown 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.exiting-prev {
  animation: slideOutDown 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* ── Prev / Next controls ── */
.controls {
  display: flex;
  gap: 24px;
  align-items: center;
}

.ctaBtn {
  font-family: var(--font-petrona);
  font-style: italic;
  font-size: 14px;
  font-weight: 400;
  color: rgba(61, 61, 58, 0.4);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.2s ease;
}

.ctaBtn:hover {
  color: rgba(61, 61, 58, 0.8);
}
```

### Step B — Write Hero.tsx

- [ ] Replace the entire `app/components/Hero.tsx` with:

```tsx
'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './Hero.module.css'

const CARDS = [
  {
    world: 'Health',
    color: '#1D9E75',
    bg: '#E1F5EE',
    hook: 'The 8-hour myth — why sleeping longer might actually be hurting you',
    teaser: 'New research on sleep quality vs. quantity is changing what experts recommend.',
  },
  {
    world: 'Money',
    color: '#BA7517',
    bg: '#FAEEDA',
    hook: 'Why your savings account is quietly making you poorer',
    teaser: 'Inflation math that most banks don\'t want you to think about.',
  },
  {
    world: 'World',
    color: '#185FA5',
    bg: '#E6F1FB',
    hook: 'The country quietly buying up more land than anyone realises',
    teaser: 'A map of global land acquisitions that rewrites the geopolitical story.',
  },
  {
    world: 'Tech',
    color: '#534AB7',
    bg: '#EEEDFE',
    hook: 'The AI nobody is talking about — and why it changes everything',
    teaser: 'It\'s not ChatGPT. And it\'s already inside the tools you use every day.',
  },
  {
    world: 'Psychology',
    color: '#993C1D',
    bg: '#FAECE7',
    hook: 'The bias that makes you terrible at predicting your own happiness',
    teaser: 'Why humans are systematically wrong about what will make them feel good.',
  },
]

const ANIMATION_MS = 400
const AUTO_ADVANCE_MS = 4000

type AnimState = 'idle' | 'next' | 'prev'

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animState, setAnimState] = useState<AnimState>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isAnimating = useRef(false)

  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    setTimeout(() => {
      el.style.transition = 'opacity 1s ease, transform 1s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 200)
  }, [])

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating.current) return
    isAnimating.current = true

    if (timerRef.current) clearTimeout(timerRef.current)

    setPrev(current)
    setAnimState(direction)
    setCurrent(c => {
      if (direction === 'next') return (c + 1) % CARDS.length
      return (c - 1 + CARDS.length) % CARDS.length
    })

    setTimeout(() => {
      setPrev(null)
      setAnimState('idle')
      isAnimating.current = false
    }, ANIMATION_MS)
  }, [current])

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(() => navigate('next'), AUTO_ADVANCE_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [navigate, current])

  const currentCard = CARDS[current]
  const prevCard = prev !== null ? CARDS[prev] : null

  return (
    <section className={styles.hero}>
      {/* Left: headline */}
      <div className={styles.left}>
        <div ref={headlineRef} className={styles.headline}>
          Something worth knowing.<br />
          <em>Every morning.</em>
        </div>
      </div>

      {/* Right: phone mockup */}
      <div className={styles.right}>
        <div className={styles.phone}>
          <div className={styles.island} />
          <div className={styles.screen}>
            <div className={styles.cardSlot}>
              {/* Outgoing card */}
              {prevCard && (
                <div
                  className={`${styles.card} ${animState === 'next' ? styles['exiting-next'] : styles['exiting-prev']}`}
                  style={{ background: prevCard.bg }}
                >
                  <p className={styles.cardCategory} style={{ color: prevCard.color }}>{prevCard.world}</p>
                  <p className={styles.cardHook}>{prevCard.hook}</p>
                  <p className={styles.cardTeaser}>{prevCard.teaser}</p>
                  <div className={styles.cardAccent} style={{ background: prevCard.color, opacity: 0.15 }} />
                </div>
              )}
              {/* Incoming card */}
              <div
                className={`${styles.card} ${animState !== 'idle' ? (animState === 'next' ? styles['entering-next'] : styles['entering-prev']) : ''}`}
                style={{ background: currentCard.bg }}
              >
                <p className={styles.cardCategory} style={{ color: currentCard.color }}>{currentCard.world}</p>
                <p className={styles.cardHook}>{currentCard.hook}</p>
                <p className={styles.cardTeaser}>{currentCard.teaser}</p>
                <div className={styles.cardAccent} style={{ background: currentCard.color, opacity: 0.15 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button className={styles.ctaBtn} onClick={() => navigate('prev')}>Prev</button>
          <button className={styles.ctaBtn} onClick={() => navigate('next')}>Next</button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] Start or reload `npm run dev` and open `http://localhost:3000`. Verify:
  - Two-column layout: headline left, phone mockup right
  - Phone has a dark shell, dynamic island, light screen
  - Cards slide up automatically every 4 seconds
  - Prev/Next buttons trigger the animation in the correct direction (Prev slides down, Next slides up)
  - No TypeScript errors in terminal

- [ ] Commit:

```bash
git add app/components/Hero.tsx app/components/Hero.module.css
git commit -m "feat: redesign Hero with phone mockup and sliding card animation"
```

---

## Task 12: Final check — scroll through all 5 sections

- [ ] With `npm run dev` running, scroll through all 5 sections in order:
  1. **Hero** — phone mockup, headline, cards auto-advance
  2. **Contrast** — 3-row before/after grid on warm card
  3. **Philosophy** — numbered declarations animate in
  4. **Worlds** — "What Morning covers" + 5 cards, The World card has nodes SVG
  5. **Waitlist** — light background, "Morning is almost ready.", light form

- [ ] Verify Navbar:
  - Morning SVG wordmark visible top-left
  - "Join Waitlist" button scrolls to section 5 (Waitlist)

- [ ] Verify Footer (visible inside Waitlist section):
  - SVG wordmark in white
  - `hello@getmorning.co` email link
  - `@getmorning.co on Instagram` link
  - "No streaks. No guilt. No algorithm." bottom strip

- [ ] Commit if any final tweaks were made:

```bash
git add -A
git commit -m "fix: final adjustments after full-page review"
```

---

## Implementation Notes

- **Task 11 is the most complex** — implement Hero last so earlier sections are stable first
- **CSS Module class name with hyphen** (`styles['entering-next']`) — bracket notation required since hyphens aren't valid JS identifiers
- **Auto-advance timer** in Hero resets whenever `current` changes (via the `useEffect` dependency), which correctly resets after both manual and auto navigation
