import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <Image
            src="/Morning_Logo.svg"
            alt="Morning"
            width={2025}
            height={493}
            className={styles.logo}
            unoptimized
          />
          <p className={styles.tagline}>Less noise, more signal.</p>
        </div>

        <div className={styles.right}>
          <div className={styles.links}>
            <a href="mailto:hello@getmorning.co" className={styles.link}>hello@getmorning.co</a>
            <a href="https://instagram.com/getmorning.co" className={styles.link} rel="noopener noreferrer" target="_blank">Instagram</a>
            <Link href="/about" className={styles.link}>About</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Morning
        </p>
        <div className={styles.legalLinks}>
          <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
          <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
