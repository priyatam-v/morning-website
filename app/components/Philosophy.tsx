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
