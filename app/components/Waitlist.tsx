'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './Waitlist.module.css'

export default function Waitlist() {
  const ref = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        let message = 'Something went wrong. Please try again.'
        try {
          const data = await res.json()
          if (typeof data?.error === 'string') message = data.error
        } catch { /* ignore non-JSON error bodies */ }
        setError(message)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.grain} />
      <div className={styles.waitlistContent}>
        <div className={styles.inner} ref={ref}>

          <h2 className={styles.heading}>We're almost ready.</h2>
          <p className={styles.body}>Morning is in its final stretch. If you'd like to be among the first to read it, leave your email below.</p>

          <div className={styles.formWrap}>
            {!submitted ? (
              <>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <label htmlFor="waitlist-email" className={styles.srOnly}>
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (error) setError(null) }}
                    placeholder="your@email.com"
                    className={styles.input}
                    required
                  />
                  <button type="submit" className={styles.btn} disabled={loading}>
                    {loading ? 'Joining...' : 'Get Early Access'}
                  </button>
                </form>
                {error && (
                  <p className={styles.error} role="alert">{error}</p>
                )}
              </>
            ) : (
              <div className={styles.thanks}>
                <span className={styles.thanksDot} />
                You're in.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
