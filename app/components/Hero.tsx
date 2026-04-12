'use client'
import { useEffect, useRef, useState, useCallback, useId } from 'react'
import styles from './Hero.module.css'

function HealthVisual() {
  const glowId = useId()
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5C4A8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FAF8F4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="95" r="80" fill={`url(#${glowId})`} />
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

function CardFace({
  card,
  activeIndex,
  animClass,
}: {
  card: typeof CARDS[number]
  activeIndex: number
  animClass: string
}) {
  const Visual = card.Visual
  return (
    <div className={`${styles.card} ${animClass}`}>
      {/* Nav */}
      <div className={styles.cardNav}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#2D5A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className={styles.cardNavDots}>
          {CARDS.map((_, i) => (
            <span
              key={i}
              className={`${styles.cardNavDot} ${i === activeIndex ? styles.cardNavDotActive : ''}`}
            />
          ))}
        </div>
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path d="M2 2h10v12l-5-3-5 3V2z" stroke="#2D5A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Visual */}
      <div className={styles.cardVisual}>
        <Visual />
      </div>
      {/* Content */}
      <div className={styles.cardContent}>
        <span className={styles.cardPill}>{card.type} · {card.world}</span>
        <p className={styles.cardHook}>{card.hook}</p>
        <p className={styles.cardTeaser}>{card.teaser}</p>
        <div className={styles.cardActions}>
          <div className={styles.cardActionHelpful}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" stroke="#2D5A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3v11z" stroke="#2D5A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Helpful
          </div>
          <div className={styles.cardActionSave}>
            <svg width="10" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" stroke="#1C1C1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Save
          </div>
        </div>
      </div>
    </div>
  )
}

const CARDS = [
  {
    world: 'Health',
    type: 'Mental Model',
    hook: "You don't lose fat. You breathe it out.",
    teaser: 'When fat is metabolised, 84% leaves your body as CO₂ through your lungs. Your lungs — not your sweat — are the primary fat-exit organ.',
    Visual: HealthVisual,
  },
  {
    world: 'Money',
    type: 'Deep Dive',
    hook: "Delaying investment by 10 years doesn't halve your wealth. It destroys 70% of it.",
    teaser: '₹5,000/month from age 25 grows to ₹3.2 crore. Starting at 35, same rate, yields ₹94 lakh. Compounding rewards the first decade the most.',
    Visual: MoneyVisual,
  },
  {
    world: 'World',
    type: 'Explainer',
    hook: "90% of the world's most advanced chips are made in a country smaller than Jharkhand.",
    teaser: "TSMC in Taiwan manufactures over 90% of the world's most advanced semiconductors. Every AI model, every modern weapon system depends on this single location.",
    Visual: WorldVisual,
  },
]

const ANIMATION_MS = 400
// How long to ignore wheel events after a card advance (absorbs trackpad inertia)
const GESTURE_COOLDOWN_MS = 900
// Minimum accumulated deltaY before a card advance fires
const DELTA_THRESHOLD = 30

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animDir, setAnimDir] = useState<'next' | 'prev' | null>(null)
  const currentRef = useRef(0)
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cooldownRef = useRef(false)
  const deltaAccRef = useRef(0)
  const touchStartYRef = useRef(0)
  const headlineRef = useRef<HTMLDivElement>(null)

  // Headline intro fade-in
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

  const goTo = useCallback((newIndex: number, dir: 'next' | 'prev') => {
    const oldIndex = currentRef.current
    if (newIndex === oldIndex) return
    setPrev(oldIndex)
    setAnimDir(dir)
    setCurrent(newIndex)
    currentRef.current = newIndex
    if (animTimerRef.current) clearTimeout(animTimerRef.current)
    animTimerRef.current = setTimeout(() => {
      setPrev(null)
      setAnimDir(null)
    }, ANIMATION_MS)
  }, [])

  useEffect(() => () => { if (animTimerRef.current) clearTimeout(animTimerRef.current) }, [])

  useEffect(() => {
    const lock = () => {
      cooldownRef.current = true
      deltaAccRef.current = 0
      setTimeout(() => {
        cooldownRef.current = false
        deltaAccRef.current = 0
      }, GESTURE_COOLDOWN_MS)
    }

    const handleDown = () => {
      lock()
      const idx = currentRef.current
      if (idx < CARDS.length - 1) {
        goTo(idx + 1, 'next')
      } else {
        // Last card — kick the page past the hero smoothly
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
      }
    }

    const handleUp = (): boolean => {
      const idx = currentRef.current
      if (idx > 0) {
        lock()
        goTo(idx - 1, 'prev')
        return true
      }
      return false
    }

    const onWheel = (e: WheelEvent) => {
      if (window.scrollY > 50) return
      e.preventDefault()

      // During cooldown, swallow all events (absorbs trackpad inertia tail)
      if (cooldownRef.current) return

      // Normalize across deltaMode: 0=pixels, 1=lines, 2=pages
      let delta = e.deltaY
      if (e.deltaMode === 1) delta *= 16
      if (e.deltaMode === 2) delta *= window.innerHeight

      deltaAccRef.current += delta

      if (deltaAccRef.current >= DELTA_THRESHOLD) {
        handleDown()
      } else if (deltaAccRef.current <= -DELTA_THRESHOLD) {
        handleUp()
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (window.scrollY > 50) return
      if (cooldownRef.current) return
      const delta = touchStartYRef.current - e.changedTouches[0].clientY
      if (Math.abs(delta) < 40) return // too small to be intentional

      if (delta > 0) {
        e.preventDefault()
        handleDown()
      } else {
        const consumed = handleUp()
        if (consumed) e.preventDefault()
      }
    }

    // Arrow key support as a bonus
    const onKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > 50) return
      if (cooldownRef.current) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleDown()
      } else if (e.key === 'ArrowUp') {
        const consumed = handleUp()
        if (consumed) e.preventDefault()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [goTo])

  const currentCard = CARDS[current]
  const prevCard = prev !== null ? CARDS[prev] : null

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div ref={headlineRef} className={styles.headline}>
          Your mind deserves<br />a better morning.
        </div>
        <p className={styles.subline}>
          Morning is a daily brief for people who want to understand the world — not just scroll through it.
        </p>
      </div>

      <div className={styles.right}>
        <div className={styles.phone}>
          <div className={styles.island} />
          <div className={styles.screen}>
            <div className={styles.cardSlot}>
              {prevCard && (
                <CardFace
                  card={prevCard}
                  activeIndex={prev as number}
                  animClass={animDir === 'next' ? styles['exiting-next'] : styles['exiting-prev']}
                />
              )}
              <CardFace
                card={currentCard}
                activeIndex={current}
                animClass={animDir ? (animDir === 'next' ? styles['entering-next'] : styles['entering-prev']) : ''}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
