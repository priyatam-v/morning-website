'use client'
import styles from './Navbar.module.css'

export default function Navbar() {
  const scrollToWaitlist = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: { index: 4 } }))
  }

  return (
    <nav className={`${styles.nav} ${styles.visible}`}>
      <div className={styles.inner}>
        <img
          src="/Morning_Logo.svg"
          alt="Morning"
          className={styles.logo}
        />
        <button className={styles.cta} onClick={scrollToWaitlist}>
          Join Waitlist
        </button>
      </div>
    </nav>
  )
}
