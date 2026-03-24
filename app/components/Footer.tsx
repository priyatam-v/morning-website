import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Morn</span>
            <span className={styles.logoI}>ı</span>
            <span className={styles.logoDot} />
            <span className={styles.logoText}>ng</span>
          </div>
          <p className={styles.tagline}>Learn something real today.</p>
        </div>

        <div className={styles.right}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Morning. Built with care.
          </p>
          <div className={styles.links}>
            <a href="mailto:hello@morning.app" className={styles.link}>hello@morning.app</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.bottomText}>
          No streaks. No guilt. No algorithm.
        </p>
      </div>
    </footer>
  )
}
