'use client'
import Image from 'next/image'
import styles from './Navbar.module.css'

export default function Navbar() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${styles.visible}`}>
      <div className={styles.inner}>
        <Image
          src="/Morning_Logo.svg"
          alt="Morning"
          width={2025}
          height={493}
          className={styles.logo}
          priority
          unoptimized
        />
        <button className={styles.cta} onClick={scrollToWaitlist}>
          Get Early Access
        </button>
      </div>
    </nav>
  )
}
