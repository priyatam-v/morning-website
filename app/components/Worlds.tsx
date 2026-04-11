'use client'
import { useEffect, useRef } from 'react'
import styles from './Worlds.module.css'

const WORLDS = [
  {
    id: 'body',
    name: 'The Body',
    category: 'Health & Wellness',
    color: '#1D9E75',
    bg: '#E1F5EE',
    lines: ['Sleep, stress, nutrition, longevity.', 'Science that changes how you treat yourself.'],
    illustration: (color: string) => (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="80" r="45" fill={color} opacity="0.12"/>
        <ellipse cx="100" cy="145" rx="25" ry="35" fill={color} opacity="0.15"/>
        <path d="M75 80 Q100 55 125 80" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M100 80 L100 145" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
        <path d="M100 105 L75 120" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
        <path d="M100 105 L125 120" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
        <circle cx="100" cy="80" r="12" fill={color} opacity="0.2"/>
        <circle cx="100" cy="80" r="5" fill={color} opacity="0.5"/>
      </svg>
    )
  },
  {
    id: 'game',
    name: 'The Game',
    category: 'Personal Finance & Investing',
    color: '#BA7517',
    bg: '#FAEEDA',
    lines: ['How money actually moves.', 'And why most of what you were taught about it is wrong.'],
    illustration: (color: string) => (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="120" width="24" height="50" rx="4" fill={color} opacity="0.2"/>
        <rect x="64" y="95" width="24" height="75" rx="4" fill={color} opacity="0.3"/>
        <rect x="98" y="70" width="24" height="100" rx="4" fill={color} opacity="0.4"/>
        <rect x="132" y="45" width="24" height="125" rx="4" fill={color} opacity="0.6"/>
        <path d="M42 118 L76 93 L110 68 L144 43" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.4" fill="none"/>
        <circle cx="144" cy="43" r="5" fill={color} opacity="0.7"/>
      </svg>
    )
  },
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
  {
    id: 'shift',
    name: 'The Shift',
    category: 'Technology & AI',
    color: '#534AB7',
    bg: '#EEEDFE',
    lines: ['The world is being rewritten.', 'Understand it before it surprises you.'],
    illustration: (color: string) => (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="55" stroke={color} strokeWidth="1.5" opacity="0.15" fill="none"/>
        <circle cx="100" cy="100" r="35" stroke={color} strokeWidth="1.5" opacity="0.2" fill="none"/>
        <circle cx="100" cy="100" r="15" fill={color} opacity="0.2"/>
        <circle cx="100" cy="100" r="7" fill={color} opacity="0.5"/>
        <line x1="100" y1="45" x2="100" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <line x1="155" y1="100" x2="170" y2="100" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <line x1="100" y1="155" x2="100" y2="170" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <line x1="45" y1="100" x2="30" y2="100" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <circle cx="100" cy="30" r="4" fill={color} opacity="0.4"/>
      </svg>
    )
  },
  {
    id: 'mind',
    name: 'The Mind',
    category: 'Psychology & Mental Models',
    color: '#993C1D',
    bg: '#FAECE7',
    lines: ['Why you decide what you decide.', 'And how to get better at both.'],
    illustration: (color: string) => (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 155 C65 155 40 135 40 105 C40 80 55 68 70 65 C70 50 80 35 100 35 C120 35 130 50 130 65 C145 68 160 80 160 105 C160 135 135 155 100 155Z" fill={color} opacity="0.1" stroke={color} strokeWidth="1.5" strokeOpacity="0.2"/>
        <path d="M100 65 L100 100" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
        <path d="M80 85 Q90 75 100 80 Q110 75 120 85" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35"/>
        <circle cx="100" cy="110" r="8" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" strokeOpacity="0.3"/>
        <path d="M75 115 Q85 130 100 125 Q115 130 125 115" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25"/>
      </svg>
    )
  },
]

export default function Worlds() {
  const ref = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add(styles.visible) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add(styles.cardVisible)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    cardRefs.current.forEach(el => { if (el) cardObserver.observe(el) })

    return () => { observer.disconnect(); cardObserver.disconnect() }
  }, [])

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
              <p className={styles.worldDesc}>{world.lines.join(' ')}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
