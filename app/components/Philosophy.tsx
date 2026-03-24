'use client'
import { useEffect, useRef } from 'react'
import styles from './Philosophy.module.css'

const LINES = [
  { text: 'Your attention is finite. So is Morning.', strong: true },
  { text: 'No streaks turning curiosity into obligation.', strong: false },
  { text: 'No feed engineered to outlast your willpower.', strong: false },
  { text: 'Just ten things worth knowing. Finished.', strong: true },
  { text: 'The way things used to be.', strong: false, italic: true },
  { text: '', spacer: true },
  { text: 'Knowledge that compounds. Slowly. Reliably.', strong: false },
  { text: 'The way the best things always have.', strong: false },
]

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add(styles.visible)
          lineRefs.current.forEach((el, i) => {
            if (el) {
              setTimeout(() => el.classList.add(styles.lineVisible), i * 80)
            }
          })
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <p className={styles.eyebrow}>What we believe</p>
        <div className={styles.lines}>
          {LINES.map((line, i) => {
            if (line.spacer) return <div key={i} className={styles.spacer} />
            return (
              <p
                key={i}
                ref={el => { lineRefs.current[i] = el }}
                className={[
                  styles.line,
                  line.strong ? styles.lineStrong : styles.lineMuted,
                  line.italic ? styles.lineItalic : '',
                ].join(' ')}
              >
                {line.text}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
