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
