import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sample Issue | Morning',
  description:
    'See what a Morning daily brief looks like. Twenty knowledge cards, five topics, then done. This is what lands in your inbox every morning.',
  alternates: { canonical: '/sample' },
  robots: { index: true, follow: true },
}

const CARDS = [
  {
    world: 'Health',
    type: 'Mental Model',
    color: '#1D9E75',
    bg: '#F0FAF6',
    hook: "You don't lose fat. You breathe it out.",
    body: "When fat is metabolised, 84% leaves your body as CO₂ through your lungs — exhaled with every breath. The remaining 16% exits as water through sweat, urine, and breath vapour. Your lungs, not your sweat glands, are the primary fat-exit organ. Exercise works partly by making you breathe faster and more deeply, accelerating that exhaust.",
    source: 'Meerman & Brown, BMJ, 2014',
    sourceUrl: 'https://www.bmj.com/content/349/bmj.g7257',
  },
  {
    world: 'Money',
    type: 'Deep Dive',
    color: '#BA7517',
    bg: '#FDF6EC',
    hook: "Delaying investment by 10 years doesn't halve your wealth. It destroys 70% of it.",
    body: "₹5,000 per month invested at 12% annual return from age 25 grows to ₹3.2 crore by 60. Start at 35, same rate, same amount — you end with ₹94 lakh. The first decade of compounding does most of the work, because growth accelerates on an ever-larger base. Time in the market is not a cliché. It is the actual mechanism.",
    source: 'SEBI Investor Education',
    sourceUrl: null,
  },
  {
    world: 'World',
    type: 'Explainer',
    color: '#185FA5',
    bg: '#EEF5FD',
    hook: "90% of the world's most advanced chips are made in a country smaller than Jharkhand.",
    body: "Taiwan Semiconductor Manufacturing Company (TSMC) in Taiwan manufactures over 90% of the world's sub-5nm chips — the processors inside every modern smartphone, AI model, data centre, and advanced weapons system. No country, including the US, can independently replicate this supply chain. It took Taiwan 40 years and enormous public investment to build. This single geographic concentration is now considered the most consequential choke point in the global economy.",
    source: 'CSIS Semiconductor Supply Chain Report, 2023',
    sourceUrl: null,
  },
  {
    world: 'Psychology',
    type: 'Research',
    color: '#993C1D',
    bg: '#FDF3F0',
    hook: 'The people most confident they are immune to bias are typically the most affected by it.',
    body: "Psychologists call this the Bias Blind Spot. In a study of over 600 people, virtually everyone rated themselves as less biased than the average person — statistically impossible. Worse: people who scored highest on cognitive ability showed the largest blind spot. Intelligence gives you the tools to rationalise, not to see clearly. The fix is to examine your reasoning process, not just your conclusions.",
    source: 'Pronin, Lin & Ross, Personality and Social Psychology Bulletin, 2002',
    sourceUrl: null,
  },
  {
    world: 'Technology',
    type: 'Primer',
    color: '#534AB7',
    bg: '#F4F3FF',
    hook: "Infinite scroll was invented by one person. He now publicly regrets it.",
    body: "Aza Raskin, a designer at Mozilla, patented infinite scroll in 2006 to make web pages feel seamless. He estimated his invention alone costs humanity 200,000 hours of attention every day. He now co-runs the Center for Humane Technology with Tristan Harris, arguing that the attention economy harvests human psychology the same way industrial farming harvests land — efficiently, at scale, and at enormous long-term cost.",
    source: 'BBC Interview with Aza Raskin, 2018',
    sourceUrl: null,
  },
]

export default function SamplePage() {
  const today = new Date()
  const formatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #E8E3DB', padding: '20px 24px', background: '#FAF8F4', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img src="/Morning_Logo.svg" alt="Morning" style={{ height: 24, display: 'block', filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(500%) hue-rotate(10deg)' }} />
          </Link>
          <Link href="/#waitlist" style={{ fontSize: 13, fontWeight: 600, color: '#FAF8F4', background: '#2D5A2A', padding: '8px 18px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.01em' }}>
            Subscribe free →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 80px', fontFamily: 'var(--font-jakarta, system-ui, sans-serif)' }}>

        {/* Issue header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C4B8AC', marginBottom: 12 }}>
            Sample Issue
          </p>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1C1C1A', lineHeight: 1.2, marginBottom: 8 }}>
            Morning Brief
          </h1>
          <p style={{ fontSize: 14, color: '#9B8E83' }}>{formatted} · 20 cards · ~10 min read</p>

          <div style={{ marginTop: 24, padding: '16px 20px', background: '#F0FAF6', borderLeft: '3px solid #1D9E75', borderRadius: '0 6px 6px 0' }}>
            <p style={{ fontSize: 14, color: '#2D5A2A', lineHeight: 1.7 }}>
              This is what lands in your inbox every morning. Twenty cards, five topics, then done.
              No algorithm. No endless feed. Subscribe to get this daily.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {CARDS.map((card, i) => (
            <Card key={card.world} card={card} index={i} />
          ))}
        </div>

        {/* Ellipsis — more cards follow */}
        <div style={{ textAlign: 'center', padding: '32px 0', color: '#C4B8AC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#E8E3DB' }} />
            <span style={{ fontSize: 13, color: '#9B8E83', letterSpacing: '0.5px' }}>15 more cards in today's full issue</span>
            <div style={{ flex: 1, height: 1, background: '#E8E3DB' }} />
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#1C1C1A', borderRadius: 16, padding: '48px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8BAF8C', marginBottom: 16 }}>
            Free · No credit card · Unsubscribe anytime
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F2F0EB', marginBottom: 12, lineHeight: 1.2 }}>
            Get this in your inbox every morning.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(242,240,235,0.55)', marginBottom: 32, lineHeight: 1.6 }}>
            Twenty cards. Then stop. No streaks, no guilt, no algorithm.<br/>
            Just something worth knowing before your day starts.
          </p>
          <Link
            href="/#waitlist"
            style={{
              display: 'inline-block',
              background: '#8BAF8C',
              color: '#1C1C1A',
              fontWeight: 700,
              fontSize: 15,
              padding: '14px 32px',
              borderRadius: 8,
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            Subscribe free →
          </Link>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid #E8E3DB', display: 'flex', gap: 24 }}>
          <Link href="/" style={{ fontSize: 13, color: '#9B8E83', textDecoration: 'none' }}>← Back to Morning</Link>
          <Link href="/about" style={{ fontSize: 13, color: '#9B8E83', textDecoration: 'none' }}>About</Link>
        </div>
      </main>
    </div>
  )
}

function Card({ card, index }: { card: typeof CARDS[number]; index: number }) {
  return (
    <article
      style={{
        background: '#FFFFFF',
        borderRadius: 12,
        padding: '28px 32px',
        marginBottom: 12,
        borderLeft: `3px solid ${card.color}`,
      }}
    >
      {/* Category + type row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            color: card.color,
          }}
        >
          {card.world}
        </span>
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C4B8AC', display: 'inline-block' }} />
        <span style={{ fontSize: 11, color: '#9B8E83', letterSpacing: '0.5px' }}>{card.type}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#C4B8AC', fontVariantNumeric: 'tabular-nums' }}>
          {String(index + 1).padStart(2, '0')} / 10
        </span>
      </div>

      {/* Hook */}
      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#1C1C1A',
          lineHeight: 1.35,
          marginBottom: 14,
          fontFamily: 'var(--font-petrona, Georgia, serif)',
        }}
      >
        {card.hook}
      </h3>

      {/* Body */}
      <p style={{ fontSize: 15, color: '#3D3D3A', lineHeight: 1.75, marginBottom: 16 }}>
        {card.body}
      </p>

      {/* Source */}
      <p style={{ fontSize: 12, color: '#C4B8AC', letterSpacing: '0.2px' }}>
        Source:{' '}
        {card.sourceUrl ? (
          <a href={card.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#9B8E83', textDecoration: 'underline' }}>
            {card.source}
          </a>
        ) : (
          <span>{card.source}</span>
        )}
      </p>
    </article>
  )
}
