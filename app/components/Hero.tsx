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
]

const ANIMATION_MS = 400

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animDir, setAnimDir] = useState<'next' | 'prev' | null>(null)
  const currentRef = useRef(0)
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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

  const goTo = useCallback((newIndex: number) => {
    const oldIndex = currentRef.current
    if (newIndex === oldIndex) return
    const dir = newIndex > oldIndex ? 'next' : 'prev'
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

  // Drive cards from scroll — each card triggers after 40% of viewport height scrolled
  useEffect(() => {
    const onScroll = () => {
      const step = window.innerHeight * 0.4  // 40vh per card
      const idx = Math.min(Math.floor(window.scrollY / step), CARDS.length - 1)
      goTo(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [goTo])

  const currentCard = CARDS[current]
  const prevCard = prev !== null ? CARDS[prev] : null

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div ref={headlineRef} className={styles.headline}>
          Something worth knowing.<br />
          <em>Every morning.</em>
        </div>
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
      </div>
    </section>
  )
}
