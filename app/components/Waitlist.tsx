'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './Waitlist.module.css'
import Footer from './Footer'

export default function Waitlist() {
  const ref = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add(styles.visible) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.grain} />
      <div className={styles.waitlistContent}>
        <div className={styles.inner} ref={ref}>

          <h2 className={styles.heading}>Morning is almost ready.</h2>
          <p className={styles.body}>Leave your email. We'll let you know.</p>

          <div className={styles.formWrap}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={styles.input}
                  required
                />
                <button type="submit" className={styles.btn} disabled={loading}>
                  {loading ? 'Joining...' : 'Join the Waitlist'}
                </button>
              </form>
            ) : (
              <div className={styles.thanks}>
                <span className={styles.thanksDot} />
                We'll reach out when Morning is ready.
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </section>
  )
}
