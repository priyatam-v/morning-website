import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <img
            src="/Morning_Logo.svg"
            alt="Morning"
            className={styles.logo}
          />
          <p className={styles.tagline}>Learn something real today.</p>
        </div>

        <div className={styles.right}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Morning. Built with care.
          </p>
          <div className={styles.links}>
            <a href="mailto:hello@getmorning.co" className={styles.link}>hello@getmorning.co</a>
            <a href="https://instagram.com/getmorning.co" className={styles.link}>@getmorning.co on Instagram</a>
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
