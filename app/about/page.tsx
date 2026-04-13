import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Morning | Daily Knowledge App',
  description:
    'Morning is a daily knowledge app delivering twenty curated cards every morning across Health, Money, World, Technology, and Psychology. No algorithm. No streaks. Just knowledge.',
  alternates: { canonical: '/about' },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Morning',
  url: 'https://www.getmorning.co/about',
  description:
    'Morning is a daily knowledge app delivering twenty curated cards every morning across Health, Money, World, Technology, and Psychology.',
  mainEntity: {
    '@id': 'https://www.getmorning.co/#organization',
  },
  author: {
    '@type': 'Person',
    name: 'Priyatam',
    jobTitle: 'Founder',
    url: 'https://www.getmorning.co/about',
    sameAs: ['https://www.linkedin.com/in/priyatam-vinnakota/'],
  },
}

export default function AboutPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div style={{ background: '#FAF8F4', minHeight: '100vh', fontFamily: 'var(--font-dm-sans, system-ui, sans-serif)' }}>
      <header style={{ borderBottom: '1px solid #E8E3DB', padding: '20px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/Morning_Logo.svg" alt="Morning" width={132} height={32} style={{ height: 32, width: 'auto' }} />
          </Link>
          <Link href="/" style={{ fontSize: 14, color: '#5C5248', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ maxWidth: 580, margin: '0 auto', padding: '80px 24px 96px' }}>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1C1C1A', marginBottom: 48, lineHeight: 1.25 }}>
          About Morning
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 40 }}>
          The first few minutes of the morning are the sharpest of the day.
          Most of them are spent on Instagram, TikTok, or X.
        </p>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 24 }}>
          Morning is a daily knowledge app. Every morning it gives you twenty cards —
          four each across Health, Money, World, Technology, and Psychology.
          Each card is one idea: sourced from a primary study or report, explained clearly,
          and written to be worth knowing. When you&rsquo;re through them, you&rsquo;re done.
          The app doesn&rsquo;t ask for more of your time.
        </p>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 40 }}>
          No algorithm. No streaks. No feed that never ends.
          Just the best ideas we could find, every morning, then out of your way.
        </p>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1C1C1A', marginBottom: 16, marginTop: 8 }}>
          Why these five topics
        </h2>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 24 }}>
          Health, Money, World, Technology, and Psychology were chosen because they are the domains
          where knowledge most directly compounds into better decisions. Understanding your body changes
          choices you make daily. Understanding money changes choices you make over decades.
          Understanding your own psychology — how you reason, decide, and remember — is the
          meta-skill that improves everything else.
        </p>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1C1C1A', marginBottom: 16 }}>
          How a card is made
        </h2>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 24 }}>
          Every card starts with a primary source — a peer-reviewed study, a major institutional report,
          or direct expert testimony. We do not cite secondary journalism. We read the original.
          The standard we apply internally: would a smart, curious person be glad they read this?
          Not impressed. Not entertained. Glad — as in, they know something real now that they
          didn&rsquo;t before.
        </p>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 40 }}>
          A card fails if it is obvious, unverifiable, misleading, or hedged into uselessness.
          The craft is compression without distortion.
        </p>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1C1C1A', marginBottom: 16 }}>
          The premise
        </h2>

        <p style={{ fontSize: '1.05rem', color: '#2D2A26', lineHeight: 1.9, marginBottom: 56 }}>
          One card is a fact. Twenty cards is a brief. Three hundred and sixty-five days of twenty cards
          is a different person. That is the premise Morning is built on — not that any single card
          changes your life, but that a consistent, deliberate daily input of real ideas, in domains
          that matter, compounds over time into something that looks a lot like being genuinely
          well-informed.
        </p>

        <a
          href="mailto:hello@getmorning.co"
          style={{ fontSize: 14, color: '#5C5248', textDecoration: 'none', borderBottom: '1px solid #C4B8AC', paddingBottom: 2 }}
        >
          hello@getmorning.co
        </a>

      </main>
    </div>
    </>
  )
}
