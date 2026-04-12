import styles from './Contrast.module.css'

const PAIRS = [
  {
    before: 'You opened your phone. An hour passed.',
    after:  'You read one thing. You closed it.',
  },
  {
    before: 'You were informed. You weren\'t wiser.',
    after:  'You understood why it happened, not just that it did.',
  },
  {
    before: 'You consumed a lot. You retained almost nothing.',
    after:  'A few things. Properly understood. Still with you.',
  },
]

export default function Contrast() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Sound familiar?</p>
        <div className={styles.pairs}>
          {PAIRS.map((pair, i) => (
            <div key={i} className={styles.pair}>
              <p className={styles.before}>{pair.before}</p>
              <p className={styles.after}>{pair.after}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
