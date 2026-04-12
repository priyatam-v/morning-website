'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './Hero.module.css'

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
                <div
                  className={`${styles.card} ${animDir === 'next' ? styles['exiting-next'] : styles['exiting-prev']}`}
                  style={{ background: prevCard.bg }}
                >
                  <p className={styles.cardCategory} style={{ color: prevCard.color }}>{prevCard.world}</p>
                  <p className={styles.cardHook}>{prevCard.hook}</p>
                  <p className={styles.cardTeaser}>{prevCard.teaser}</p>
                  <div className={styles.cardAccent} style={{ background: prevCard.color, opacity: 0.15 }} />
                </div>
              )}
              <div
                className={`${styles.card} ${animDir ? (animDir === 'next' ? styles['entering-next'] : styles['entering-prev']) : ''}`}
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

        {/* Card position dots */}
        <div className={styles.dots} aria-hidden="true">
          {CARDS.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
