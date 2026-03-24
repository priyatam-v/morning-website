'use client'
import styles from './Navbar.module.css'

export default function Navbar() {
  const scrollToWaitlist = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: { index: 5 } }))
  }

  return (
    <nav className={`${styles.nav} ${styles.visible}`}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Morn</span>
          <span className={styles.logoI}>ı</span>
          <span className={styles.logoDot} />
          <span className={styles.logoText}>ng</span>
        </div>
        <button className={styles.cta} onClick={scrollToWaitlist}>
          Join Waitlist
        </button>
      </div>
    </nav>
  )
}