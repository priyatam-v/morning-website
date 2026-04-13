import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What is a Knowledge Card? | Morning',
  description:
    "A knowledge card is a single idea, distilled to its essence: hook, explanation, source. The format Morning uses to deliver twenty things worth knowing every morning.",
  alternates: { canonical: '/blog/what-is-a-knowledge-card' },
  openGraph: {
    title: 'What is a Knowledge Card?',
    description: "One idea, distilled to its essence. The format behind Morning's daily brief.",
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What is a Knowledge Card?',
  description:
    "A knowledge card is a single idea, distilled to its essence: hook, explanation, source. The format Morning uses to deliver twenty things worth knowing every morning.",
  url: 'https://www.getmorning.co/blog/what-is-a-knowledge-card',
  datePublished: '2026-04-13',
  dateModified: '2026-04-13',
  author: {
    '@type': 'Organization',
    '@id': 'https://www.getmorning.co/#organization',
    name: 'Morning',
  },
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.getmorning.co/#organization',
    name: 'Morning',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.getmorning.co/icon.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.getmorning.co/blog/what-is-a-knowledge-card',
  },
  keywords: ['knowledge card', 'daily brief', 'learning', 'morning newsletter', 'curated content'],
  articleSection: 'About Morning',
  inLanguage: 'en-US',
}

const EXAMPLE = {
  world: 'Psychology',
  cardType: 'Research',
  color: '#993C1D',
  hook: 'The people most confident they are immune to bias are typically the most affected by it.',
  body:
    'Psychologists call this the Bias Blind Spot. In a study of over 600 people, virtually everyone rated themselves as less biased than the average person -- statistically impossible. Worse: people who scored highest on cognitive ability showed the largest blind spot. Intelligence gives you tools to rationalise, not to see clearly. The fix is to examine your reasoning process, not just your conclusions.',
  source: 'Pronin, Lin & Ross, Personality and Social Psychology Bulletin, 2002',
}

export default function KnowledgeCardPost() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div style={{ background: '#FAF8F4', minHeight: '100vh', fontFamily: 'var(--font-jakarta, system-ui, sans-serif)' }}>

      <header style={{ borderBottom: '1px solid #E8E3DB', padding: '20px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img src="/Morning_Logo.svg" alt="Morning" width={99} height={24} style={{ height: 24, width: 'auto', display: 'block', filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(500%) hue-rotate(10deg)' }} />
          </Link>
          <Link href="/#waitlist" style={{ fontSize: 13, fontWeight: 600, color: '#FAF8F4', background: '#2D5A2A', padding: '8px 18px', borderRadius: 6, textDecoration: 'none' }}>
            Subscribe free
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '56px 24px 80px' }}>

        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9B8E83', marginBottom: 20 }}>
          About Morning
        </p>

        <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 2.6rem)', fontWeight: 800, color: '#1C1C1A', lineHeight: 1.15, marginBottom: 20, fontFamily: 'var(--font-petrona, Georgia, serif)' }}>
          What is a knowledge card?
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#5C5248', lineHeight: 1.7, marginBottom: 32 }}>
          One idea. A hook that makes it land. An explanation that makes it stick. A source
          so you can go deeper. That&apos;s all it is -- and it turns out that&apos;s enough.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 32, borderBottom: '1px solid #E8E3DB', marginBottom: 40 }}>
          <span style={{ fontSize: 13, color: '#9B8E83' }}>By the Morning Team</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C4B8AC', display: 'inline-block' }} />
          <span style={{ fontSize: 13, color: '#9B8E83' }}>5 min read</span>
        </div>

        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 13, color: '#9B8E83', marginBottom: 16 }}>Here&apos;s one:</p>
          <article style={{ background: '#FFFFFF', borderRadius: 12, padding: '28px 32px', borderLeft: `3px solid ${EXAMPLE.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: EXAMPLE.color }}>
                {EXAMPLE.world}
              </span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C4B8AC', display: 'inline-block' }} />
              <span style={{ fontSize: 11, color: '#9B8E83' }}>{EXAMPLE.cardType}</span>
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1C1C1A', lineHeight: 1.35, marginBottom: 14, fontFamily: 'var(--font-petrona, Georgia, serif)' }}>
              {EXAMPLE.hook}
            </h2>
            <p style={{ fontSize: 15, color: '#3D3D3A', lineHeight: 1.75, marginBottom: 16 }}>
              {EXAMPLE.body}
            </p>
            <p style={{ fontSize: 12, color: '#C4B8AC' }}>Source: {EXAMPLE.source}</p>
          </article>
        </div>

        <div style={{ fontSize: 17, lineHeight: 1.8, color: '#2D2A26' }}>

          <p style={{ marginBottom: 22 }}>
            Every Morning issue contains twenty of these, across five topics. You can read them in
            ten minutes. Then the issue ends. There is no next article, no autoplay,
            no recommendations. Just twenty cards. Then done.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1C1A', margin: '40px 0 16px', fontFamily: 'var(--font-petrona, Georgia, serif)' }}>
            The anatomy of a card
          </h2>

          <p style={{ marginBottom: 22 }}>Every knowledge card has three parts:</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
            <Part number="01" label="The hook" color="#1D9E75"
              description="A single sentence that reframes something you thought you knew, or tells you something genuinely surprising. It should be true, and it should be the thing you still remember tomorrow. 'You don't lose fat. You breathe it out.' That is a hook." />
            <Part number="02" label="The explanation" color="#BA7517"
              description="Two to four sentences that explain the mechanism. Not the full study. Not the Wikipedia article. The actual idea, explained clearly. If we can't explain it in 80 words, we haven't understood it yet. This forces us to cut every word that isn't doing work." />
            <Part number="03" label="The source" color="#185FA5"
              description="The primary paper, study, or report the card draws from. Not a journalist's interpretation of it. The actual source. So if you want to go further -- you can." />
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1C1A', margin: '40px 0 16px', fontFamily: 'var(--font-petrona, Georgia, serif)' }}>
            Why twenty?
          </h2>

          <p style={{ marginBottom: 22 }}>
            Twenty cards gives you four cards per topic — enough depth to notice patterns across a domain,
            not just isolated facts. Each pair builds on the one before it. The format is still short enough
            to finish in a single sitting, which matters more than any other number.
          </p>
          <p style={{ marginBottom: 22 }}>
            A brief you actually complete is worth far more than a long one you skim and abandon.
            We have all read the first three paragraphs of articles we &ldquo;saved for later.&rdquo;
            Later never comes.
          </p>
          <p style={{ marginBottom: 22 }}>
            Twenty is also a number small enough to count. You know when you&apos;re done. That certainty
            -- the knowledge that there is an end -- is something most information formats deliberately remove.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1C1A', margin: '40px 0 16px', fontFamily: 'var(--font-petrona, Georgia, serif)' }}>
            Why these five topics
          </h2>

          <p style={{ marginBottom: 22 }}>
            Health, Money, World, Technology, Psychology. These were chosen because they are
            the domains where knowledge most directly compounds into better decisions.
          </p>
          <p style={{ marginBottom: 22 }}>
            Understanding your body&apos;s biology changes the choices you make daily.
            Understanding how money works changes the choices you make over decades.
            Understanding what&apos;s happening in the world gives your opinions a basis in reality.
            Understanding technology tells you what is actually changing versus what is hype.
            Understanding your own psychology -- how you reason, decide, and remember -- is the
            meta-skill that improves everything else.
          </p>
          <p style={{ marginBottom: 22 }}>
            We deliberately excluded entertainment, sports, and celebrity news. Not because they
            don&apos;t exist, but because Morning&apos;s premise is that your morning attention is worth more
            than that -- and you can find that content easily everywhere else.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1C1A', margin: '40px 0 16px', fontFamily: 'var(--font-petrona, Georgia, serif)' }}>
            What makes a card good
          </h2>

          <p style={{ marginBottom: 22 }}>
            The standard we use internally: would a smart, curious person be glad they read this?
            Not impressed. Not entertained. Glad -- as in, they know something real now that they
            didn&apos;t know before, and it might quietly change how they think or act.
          </p>
          <p style={{ marginBottom: 22 }}>A card fails this test if it is:</p>

          <ul style={{ paddingLeft: 22, marginBottom: 22 }}>
            <li style={{ marginBottom: 10 }}><strong>Obvious</strong> -- something everyone already knows, restated in different words.</li>
            <li style={{ marginBottom: 10 }}><strong>Unverifiable</strong> -- a claim sourced to &ldquo;researchers say&rdquo; with no actual study.</li>
            <li style={{ marginBottom: 10 }}><strong>Misleading</strong> -- technically true in isolation but distorted by missing context.</li>
            <li style={{ marginBottom: 10 }}><strong>Hedged into uselessness</strong> -- so many qualifications that the reader learns nothing actionable.</li>
          </ul>

          <p style={{ marginBottom: 22 }}>
            The craft of a knowledge card is compression without distortion. You are finding the
            weight-bearing claim in a piece of research -- the thing that is true, interesting,
            and portable -- and presenting it in a form that transfers cleanly into another mind.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1C1A', margin: '40px 0 16px', fontFamily: 'var(--font-petrona, Georgia, serif)' }}>
            Knowledge compounds
          </h2>

          <p style={{ marginBottom: 22 }}>
            One card is a fact. Twenty cards is a brief. Three hundred and sixty-five days of
            twenty cards is a different person.
          </p>
          <p style={{ marginBottom: 22 }}>
            That is the premise we are building on. Not that any single card will change your
            life -- it probably won&apos;t. But that a consistent, deliberate daily input of real ideas,
            in domains that matter, across years, adds up to something that looks a lot like
            being well-informed. And being well-informed, quietly, compounds.
          </p>
          <p style={{ marginBottom: 22 }}>
            The opposite is also true. A consistent daily input of algorithmically-ranked content,
            optimised for engagement, also compounds. Into anxiety. Into a feeling of being
            overwhelmed by things you can&apos;t affect. Into a baseline sense that the world is worse
            than it is.
          </p>
          <p style={{ marginBottom: 22 }}>
            The knowledge card is just a different choice about what you put in.
          </p>
        </div>

        <div style={{ marginTop: 56, background: '#1C1C1A', borderRadius: 16, padding: '40px 36px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8BAF8C', marginBottom: 12 }}>
            Morning
          </p>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F2F0EB', marginBottom: 12, lineHeight: 1.25 }}>
            Twenty knowledge cards, every morning.
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(242,240,235,0.55)', marginBottom: 28, lineHeight: 1.65 }}>
            Health, Money, World, Technology, Psychology.
            Free. Curated. Sourced. Then done.
          </p>
          <Link
            href="/#waitlist"
            style={{ display: 'inline-block', background: '#8BAF8C', color: '#1C1C1A', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 6, textDecoration: 'none' }}
          >
            Subscribe free
          </Link>
        </div>

        <div style={{ marginTop: 40, display: 'flex', gap: 24 }}>
          <Link href="/sample" style={{ fontSize: 13, color: '#9B8E83', textDecoration: 'none' }}>See a sample issue</Link>
          <Link href="/blog/how-to-stop-doomscrolling" style={{ fontSize: 13, color: '#9B8E83', textDecoration: 'none' }}>How to stop doomscrolling</Link>
        </div>
      </main>
    </div>
    </>
  )
}

function Part({ number, label, color, description }: { number: string; label: string; color: string; description: string }) {
  return (
    <div style={{ display: 'flex', gap: 20, padding: '20px 24px', background: '#FFFFFF', borderRadius: 10, borderLeft: `3px solid ${color}` }}>
      <div style={{ flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#C4B8AC', display: 'block', marginBottom: 4 }}>{number}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{label}</span>
      </div>
      <p style={{ fontSize: 15, color: '#5C5248', lineHeight: 1.7, margin: 0 }}>{description}</p>
    </div>
  )
}
