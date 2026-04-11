import styles from './Contrast.module.css'

const ROWS = [
  {
    before: 'You meant to stop. You didn\'t.',
    after: <>You know exactly <em>when you're done.</em></>,
  },
  {
    before: 'You saw a lot. You kept none of it.',
    after: <>Five things. <em>Actually yours.</em></>,
  },
  {
    before: 'Something happened. You half-understood it.',
    after: <>Something happened. <em>Now you understand why.</em></>,
  },
]

export default function Contrast() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.labelRow}>
          <span className={styles.labelBefore}>Most mornings</span>
          <span className={styles.arrowSpacer} />
          <span className={styles.labelAfter}>With Morning</span>
        </div>
        {ROWS.map((row, i) => (
          <div key={i} className={styles.row}>
            <p className={styles.before}>{row.before}</p>
            <p className={styles.arrow}>→</p>
            <p className={styles.after}>{row.after}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
