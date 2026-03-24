'use client'
import { useEffect, useState } from 'react'
import styles from './CardExperience.module.css'
import { useCardScroll } from './SectionScroller'

const CARDS = [
  {
    category: 'Personal Finance',
    categoryColor: '#BA7517',
    categoryBg: '#FAEEDA',
    type: 'Mental Model',
    hook: 'The market pays for what\'s hard to replace, not what\'s hard to do.',
    insight: 'Effort and value are not the same thing. A surgeon who takes 20 minutes on a procedure that took 20 years to master doesn\'t charge for the minutes.',
    illustrationColor: '#BA7517',
    illustrationBg: '#FAEEDA',
  },
  {
    category: 'Health & Wellness',
    categoryColor: '#1D9E75',
    categoryBg: '#E1F5EE',
    type: 'Counterintuitive Fact',
    hook: 'Sleep is not rest. It\'s when your brain does its most important work.',
    insight: 'During deep sleep, the glymphatic system flushes toxic waste from the brain — including amyloid-beta, a protein linked to Alzheimer\'s. You cannot make up for lost sleep.',
    illustrationColor: '#1D9E75',
    illustrationBg: '#E1F5EE',
  },
  {
    category: 'Psychology',
    categoryColor: '#993C1D',
    categoryBg: '#FAECE7',
    type: 'Mental Model',
    hook: 'You don\'t rise to the level of your goals. You fall to the level of your systems.',
    insight: 'Goals tell you where you want to go. Systems determine whether you get there. The same goal can be achieved by thousands of different people — the difference is the process they build.',
    illustrationColor: '#993C1D',
    illustrationBg: '#FAECE7',
  },
  {
    category: 'Technology & AI',
    categoryColor: '#534AB7',
    categoryBg: '#EEEDFE',
    type: 'Concept Explained Simply',
    hook: 'AI doesn\'t think. It predicts — and that distinction changes everything.',
    insight: 'Large language models work by predicting the most statistically likely next word, over and over. There is no reasoning. No understanding. Just pattern. Knowing this tells you exactly when to trust it.',
    illustrationColor: '#534AB7',
    illustrationBg: '#EEEDFE',
  },
]

function IllustrationPlaceholder({ color, bg }: { color: string; bg: string }) {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="300" height="200" fill={bg} />
      <ellipse cx="150" cy="95" rx="70" ry="80" fill={color} opacity="0.15" />
      <ellipse cx="120" cy="75" rx="45" ry="55" fill={color} opacity="0.12" />
      <circle cx="195" cy="65" rx="35" fill={color} opacity="0.10" />
      <path d={`M150 160 Q160 120 145 90`} stroke={color} strokeWidth="2" opacity="0.3" strokeLinecap="round" fill="none"/>
      <path d={`M145 90 Q175 55 195 45`} stroke={color} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" fill="none"/>
      <circle cx="195" cy="45" r="4" fill={color} opacity="0.25" />
    </svg>
  )
}

export default function CardExperience() {
  const { activeCard } = useCardScroll()
  const [displayCard, setDisplayCard] = useState(activeCard)
  const [animState, setAnimState] = useState<'enter' | 'exitUp' | 'exitDown'>('enter')

  useEffect(() => {
    if (activeCard === displayCard) return
    const dir = activeCard > displayCard ? 'exitUp' : 'exitDown'
    setAnimState(dir)
    const t = setTimeout(() => {
      setDisplayCard(activeCard)
      setAnimState('enter')
    }, 300)
    return () => clearTimeout(t)
  }, [activeCard, displayCard])

  const card = CARDS[displayCard]

  return (
    <section className={styles.section}>
      <div className={styles.sticky}>
        <div className={styles.contextCol}>
          <p className={styles.eyebrow}>The Experience</p>
          <h2 className={styles.heading}>
            Every morning.<br />
            Ten cards.<br />
            <em>Then done.</em>
          </h2>
          <p className={styles.body}>
            Swipe through knowledge cards drawn from scientists, economists, psychologists and thinkers. Each one a complete idea — not a teaser.
          </p>
          {/* Progress dots */}
          <div className={styles.dots}>
            {CARDS.map((_, i) => (
              <div key={i} className={`${styles.dot} ${i === activeCard ? styles.dotActive : ''}`} />
            ))}
          </div>
        </div>

        {/* iPhone Mockup */}
        <div className={styles.phoneWrap}>
          <div className={styles.phone}>
            <div className={styles.phoneShell}>
              <div className={styles.notch} />
              <div className={styles.screen}>
                <div className={`${styles.card} ${animState === 'exitUp' ? styles.exitUp : animState === 'exitDown' ? styles.exitDown : styles.enterCard}`}>
                  <div className={styles.strip} style={{ background: card.categoryColor }} />
                  <div className={styles.illustration} style={{ background: card.illustrationBg }}>
                    <IllustrationPlaceholder color={card.illustrationColor} bg={card.illustrationBg} />
                  </div>
                  <div className={styles.cardDots}>
                    {[0,1,2,3,4,5,6,7,8,9].map(i => (
                      <div key={i} className={`${styles.cardDot} ${i === activeCard ? styles.cardDotActive : ''}`}
                        style={i === activeCard ? { background: card.categoryColor } : {}} />
                    ))}
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardCategory} style={{ color: card.categoryColor }}>
                      {card.type} · {card.category}
                    </p>
                    <p className={styles.cardHook}>{card.hook}</p>
                    <p className={styles.cardInsight}>{card.insight}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardWordmark}>MORNING</span>
                    <div className={styles.cardActions}>
                      <button className={styles.helpfulBtn}>Helpful</button>
                      <button className={styles.saveBtn}>Save</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.homeIndicator} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}