'use client'
import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [line1Ref, line2Ref, ctaRef]
    els.forEach((ref, i) => {
      if (ref.current) {
        ref.current.style.opacity = '0'
        ref.current.style.transform = 'translateY(20px)'
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = 'opacity 1s ease, transform 1s ease'
            ref.current.style.opacity = '1'
            ref.current.style.transform = 'translateY(0)'
          }
        }, 200 + i * 200)
      }
    })
  }, [])

  const scrollToWaitlist = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: { index: 5 } }))
  }

  return (
    <section className={styles.hero}>
      <div className={styles.atmosphere}>
        <svg viewBox="0 0 420 540" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.atmosphereSvg}>
          <rect x="30" y="30" width="340" height="480" rx="24" fill="#E8E4DC" opacity="0.55"/>
          <rect x="30" y="30" width="340" height="4" rx="2" fill="#8BAF8C" opacity="0.7"/>
          <ellipse cx="210" cy="230" rx="100" ry="130" fill="#8BAF8C" opacity="0.09"/>
          <ellipse cx="180" cy="200" rx="70" ry="90" fill="#8BAF8C" opacity="0.07"/>
          <circle cx="270" cy="160" rx="50" ry="50" fill="#C4856A" opacity="0.06"/>
          <path d="M210 360 Q220 300 200 240" stroke="#8BAF8C" strokeWidth="2" opacity="0.2" strokeLinecap="round"/>
          <path d="M200 240 Q240 200 270 160" stroke="#8BAF8C" strokeWidth="1.5" opacity="0.15" strokeLinecap="round"/>
          <rect x="70" y="400" width="200" height="7" rx="3.5" fill="#3D3D3A" opacity="0.09"/>
          <rect x="70" y="418" width="155" height="5" rx="2.5" fill="#3D3D3A" opacity="0.06"/>
          <rect x="70" y="433" width="175" height="5" rx="2.5" fill="#3D3D3A" opacity="0.06"/>
        </svg>
      </div>

      <div className={styles.content}>
        <div ref={line1Ref} className={styles.line1}>
          Stop giving your mornings away.
        </div>
        <div ref={line2Ref} className={styles.line2}>
          Start knowing things.
        </div>
        <div ref={ctaRef} className={styles.ctaWrap}>
          <button className={styles.btn} onClick={scrollToWaitlist}>
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  )
}
