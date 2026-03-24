'use client'
import { useEffect, useRef } from 'react'
import styles from './Contrast.module.css'

export default function Contrast() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add(styles.visible) },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.inner} ref={ref}>

        <div className={styles.col + ' ' + styles.colLeft}>
          <p className={styles.colHeader}>Other apps</p>
          <div className={styles.lines}>
            <p>You scroll.</p>
            <p>31 minutes pass.</p>
            <p>You remember nothing.</p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.col + ' ' + styles.colRight}>
          <p className={styles.colHeader}>Morning</p>
          <div className={styles.lines}>
            <p>You read.</p>
            <p>12 minutes pass.</p>
            <p>You know something new.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
