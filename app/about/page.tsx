import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Morning',
  description:
    'Morning is a mobile app that gives you twenty knowledge cards every morning across Health, Money, World, Technology, and Psychology. No algorithm. No streaks. Just knowledge.',
  alternates: { canonical: '/about' },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh', fontFamily: 'var(--font-dm-sans, system-ui, sans-serif)' }}>
      <header style={{ borderBottom: '1px solid #E8E3DB', padding: '20px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/Morning_Logo.svg" alt="Morning" style={{ height: 32 }} />
          </Link>
          <Link href="/" style={{ fontSize: 14, color: '#5C5248', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ maxWidth: 580, margin: '0 auto', padding: '80px 24px 96px' }}>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1C1C1A', marginBottom: 48, lineHeight: 1.25 }}>
          About Morning
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 56 }}>
          The first few minutes of the morning are the sharpest of the day.
          Most of them are spent on Instagram, TikTok, or X.
        </p>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 24 }}>
          Morning is an app that gives you twenty knowledge cards every morning —
          Health, Money, World, Technology, and Psychology.
          Each card is one idea: sourced, clear, and worth knowing.
          When you&rsquo;re through them, you&rsquo;re done. The app doesn&rsquo;t ask for more of your time.
        </p>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 56 }}>
          No algorithm. No streaks. No feed that never ends.
          Just the best ideas we could find, every morning, then out of your way.
        </p>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 80 }}>
          Five topics to start. More coming.
        </p>

        <a
          href="mailto:hello@getmorning.co"
          style={{ fontSize: 14, color: '#5C5248', textDecoration: 'none', borderBottom: '1px solid #C4B8AC', paddingBottom: 2 }}
        >
          hello@getmorning.co
        </a>

      </main>
    </div>
  )
}
