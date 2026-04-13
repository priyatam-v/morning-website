'use client'
import { useEffect, useRef } from 'react'
import styles from './Philosophy.module.css'
import { capture } from '../lib/capture'

const LINES = [
  { num: '01', text: 'Attention is finite. Treat it that way.' },
  { num: '02', text: 'No streaks. No guilt. No algorithm.' },
  { num: '03', text: 'Knowledge compounds. Slowly. Reliably.' },
]

export default function Philosophy() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // --- Eyebrow ---
    const eyebrowEl = eyebrowRef.current
    let eyebrowObserver: IntersectionObserver | null = null
    if (eyebrowEl) {
      eyebrowObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            eyebrowEl.classList.add(styles.eyebrowVisible)
            capture('section_viewed', { section: 'philosophy' })
            eyebrowObserver!.disconnect()
          }
        },
        { threshold: 0.5 }
      )
      eyebrowObserver.observe(eyebrowEl)
    }

    // --- Rows ---
    const els = rowRefs.current.filter(Boolean) as HTMLDivElement[]
    // Add .animate so CSS hides sub-elements ready for animation
    els.forEach(el => el.classList.add(styles.animate))

    const rowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            rowObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    els.forEach(el => rowObserver.observe(el))

    return () => {
      eyebrowObserver?.disconnect()
      rowObserver.disconnect()
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 ref={eyebrowRef} className={styles.eyebrow}>Our philosophy</h2>
        {LINES.map((line, i) => (
          <div
            key={line.num}
            ref={el => { rowRefs.current[i] = el }}
            className={styles.row}
            style={{ '--row-delay': `${i * 120}ms` } as React.CSSProperties}
          >
            <span className={styles.text}>{line.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
