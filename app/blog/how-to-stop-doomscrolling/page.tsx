import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Stop Doomscrolling | Morning',
  description:
    "Doomscrolling isn't a willpower problem. It's an engineering problem — and it has a solution. Here's what the research actually says about breaking the scroll loop.",
  alternates: { canonical: '/blog/how-to-stop-doomscrolling' },
  openGraph: {
    title: 'How to Stop Doomscrolling',
    description:
      "It isn't a willpower problem. Here's what the research actually says.",
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Stop Doomscrolling',
  description:
    "Doomscrolling isn't a willpower problem. It's an engineering problem — and it has a solution. Here's what the research actually says about breaking the scroll loop.",
  url: 'https://www.getmorning.co/blog/how-to-stop-doomscrolling',
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
    '@id': 'https://www.getmorning.co/blog/how-to-stop-doomscrolling',
  },
  keywords: ['doomscrolling', 'screen time', 'digital habits', 'attention', 'psychology', 'phone addiction'],
  articleSection: 'Health · Psychology',
  inLanguage: 'en-US',
}

export default function DoomscrollingPost() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div style={{ background: '#FAF8F4', minHeight: '100vh', fontFamily: 'var(--font-jakarta, system-ui, sans-serif)' }}>
      {/* Nav */}
      <header style={{ borderBottom: '1px solid #E8E3DB', padding: '20px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img src="/Morning_Logo.svg" alt="Morning" width={99} height={24} style={{ height: 24, width: 'auto', display: 'block', filter: 'brightness(0) saturate(100%) invert(18%) sepia(5%) saturate(500%) hue-rotate(10deg)' }} />
          </Link>
          <Link href="/#waitlist" style={{ fontSize: 13, fontWeight: 600, color: '#FAF8F4', background: '#2D5A2A', padding: '8px 18px', borderRadius: 6, textDecoration: 'none' }}>
            Subscribe free →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* Eyebrow */}
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9B8E83', marginBottom: 20 }}>
          Health · Psychology
        </p>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 800,
            color: '#1C1C1A',
            lineHeight: 1.15,
            marginBottom: 20,
            fontFamily: 'var(--font-petrona, Georgia, serif)',
          }}
        >
          How to Stop Doomscrolling
        </h1>

        {/* Deck */}
        <p style={{ fontSize: '1.15rem', color: '#5C5248', lineHeight: 1.7, marginBottom: 32 }}>
          It isn&rsquo;t a willpower problem. It&rsquo;s an engineering problem — and the engineers built it on purpose. Here&rsquo;s what the research actually says about breaking the loop.
        </p>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 32, borderBottom: '1px solid #E8E3DB', marginBottom: 40 }}>
          <span style={{ fontSize: 13, color: '#9B8E83' }}>By the Morning Team</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C4B8AC', display: 'inline-block' }} />
          <span style={{ fontSize: 13, color: '#9B8E83' }}>8 min read</span>
        </div>

        {/* Body */}
        <Prose>
          <p>
            At 11:47pm on a Tuesday, you&rsquo;re watching a video about a political dispute in a country
            you&rsquo;ve never visited, involving people you&rsquo;ll never meet, about an outcome you cannot influence.
            You know you should sleep. The next video starts automatically.
          </p>
          <p>
            This is doomscrolling: the compulsive consumption of negative or distressing content, long
            past the point where you&rsquo;re learning anything useful. The term emerged during the early
            days of the COVID-19 pandemic in 2020, though the behaviour it describes is far older than
            the word.
          </p>
          <p>
            Most advice on the topic treats it as a discipline problem. Set a timer. Put your phone in
            a drawer. Just stop. That advice fails for the same reason telling someone to &ldquo;just eat less&rdquo;
            fails: it mistakes the symptom for the cause.
          </p>

          <h2>Why your brain is wired to scroll</h2>
          <p>
            The human brain evolved with a negativity bias — a tendency to weight threats more heavily
            than equivalent rewards. From an evolutionary standpoint, this made sense. Missing a
            piece of good news was costly; missing a predator was fatal. That asymmetry is baked into
            our neurology.
          </p>
          <p>
            News feeds exploit this directly. Platforms don&rsquo;t just show you negative content because
            it exists — they algorithmically rank it higher because it generates more engagement.
            Outrage, fear, and anxiety all produce clicks. The algorithm is not neutral. It is a
            revenue-optimised system that has discovered, empirically, that negative content keeps
            people watching longer.
          </p>
          <p>
            Layered on top of this is a dopamine mechanism borrowed from behavioural psychology.
            B.F. Skinner demonstrated in the 1950s that variable reward schedules — where a
            behaviour is reinforced unpredictably — produce the most persistent behaviour. A slot
            machine that paid out every time would be boring. One that pays out sometimes, randomly,
            creates compulsion. Infinite scroll is a slot machine. Each downward swipe might return
            something rewarding. Usually it doesn&rsquo;t. The unpredictability is the feature.
          </p>

          <Callout>
            Aza Raskin, the designer who invented infinite scroll in 2006, estimates his
            invention alone costs humanity 200,000 hours of collective attention daily. He
            now runs an organisation dedicated to undoing the harm.
          </Callout>

          <h2>Why willpower doesn&rsquo;t work</h2>
          <p>
            Willpower is a finite resource — psychologists call this ego depletion. It depletes
            with use across the day, and is particularly vulnerable in the evening when you&rsquo;re
            tired. This is exactly when most doomscrolling happens. You&rsquo;re physiologically
            worst-placed to resist at the moment you&rsquo;re most exposed.
          </p>
          <p>
            Apps are also not designed to be easy to stop. Variable reward schedules, autoplay,
            algorithmic ranking, removal of stopping cues (infinite scroll removes the natural
            endpoint that pagination provided) — these are the result of hundreds of millions of
            dollars of engineering effort and A/B testing against human psychology. Willpower,
            alone, is not a match for this.
          </p>
          <p>
            This is not fatalism. It means the effective interventions need to work at the
            environment level, not the willpower level.
          </p>

          <h2>What actually works</h2>

          <h3>1. Friction, not restriction</h3>
          <p>
            Removing apps from your home screen doesn&rsquo;t delete them — it just adds one step
            between you and the scroll. Research on behaviour change consistently shows that
            adding small friction to unwanted behaviours is more effective than willpower or
            intention-setting. Each additional tap is a moment where you can catch yourself.
          </p>
          <p>
            Grayscale mode works on a similar principle. Social media platforms are designed
            in colour because colour triggers emotional responses and increases engagement.
            Switching your phone to grayscale (available in Accessibility settings on both iOS
            and Android) makes the visual environment less stimulating. Many people who try it
            report significantly reduced usage within a week.
          </p>

          <h3>2. Substitution, not elimination</h3>
          <p>
            Trying to simply stop a habitual behaviour is significantly harder than replacing
            it. The habit loop — cue, routine, reward — doesn&rsquo;t disappear when you remove
            the routine; the cue still fires and you feel the pull. The most durable changes
            come from substituting a different routine that delivers a similar (but healthier)
            reward.
          </p>
          <p>
            For scrolling habits, this means having something else to reach for. Not
            &ldquo;nothing&rdquo; — nothing is hard. A short read, a book, a newsletter you actually
            enjoy. The goal is not to become someone who doesn&rsquo;t consume information.
            The goal is to consume information that leaves you better off than when you started.
          </p>

          <h3>3. Scheduled consumption windows</h3>
          <p>
            Checking the news once a day, at a fixed time, is a practice that appeared across
            human history for most of the time that news has existed. The newspaper arrived
            once a day. You read it. You moved on. The 24-hour news cycle and the smartphone
            made perpetual consumption possible; it did not make it necessary.
          </p>
          <p>
            Defining a window — say, 20 minutes at lunch, not in bed — constrains consumption
            without eliminating it. Crucially, it removes the ambient anxiety of needing to
            &ldquo;keep up.&rdquo; You will check at lunch. Until then, you&rsquo;re not missing anything
            that can&rsquo;t wait.
          </p>

          <h3>4. Phone out of the bedroom</h3>
          <p>
            The timing of phone use matters. Using your phone within an hour of sleep significantly
            worsens sleep quality, and worse sleep makes the prefrontal cortex — the seat of
            impulse control — less effective the following day. The cycle compounds: poor sleep
            makes it harder to resist scrolling; scrolling makes sleep worse.
          </p>
          <p>
            Charging your phone in another room is the single highest-impact physical change
            most people can make. An analogue alarm clock costs less than £10 and removes the
            only legitimate reason most people give for having a phone by their bed.
          </p>

          <Callout>
            A 2019 study in JAMA Pediatrics found that screen time in the hour before bed
            was associated with later bedtimes, less sleep, and worse sleep quality — and
            this effect held even when controlling for overall screen time during the day.
            The when matters as much as the how much.
          </Callout>

          <h3>5. Audit what you actually want to know</h3>
          <p>
            Most people have never explicitly decided what information they actually want in
            their lives. The default is everything, all the time, ranked by engagement. A
            more intentional approach is to ask: what five topics, if I understood them better,
            would most improve my decisions and my life?
          </p>
          <p>
            For most people, this list is something like: their health, their finances, their
            field of work, what&rsquo;s happening in the world, and how their own mind works. These are
            not obscure or niche — they are the foundational domains of a good life. But the
            typical information diet is radically misaligned with them, dominated by current
            events, celebrity news, and content optimised for engagement rather than understanding.
          </p>

          <h2>The deeper question</h2>
          <p>
            Doomscrolling is not really about phones. It&rsquo;s about what we do with our attention,
            and whether we make that choice deliberately or by default.
          </p>
          <p>
            Human attention is finite. It does not renew. Every minute spent watching content
            you didn&rsquo;t choose, about things that don&rsquo;t matter to you, is a minute that didn&rsquo;t go
            toward the things that do. This isn&rsquo;t a moral argument — it&rsquo;s an accounting one.
          </p>
          <p>
            The goal isn&rsquo;t to stop consuming information. Information is valuable. The goal is
            an information diet that is as deliberate as a food diet — something you choose, in
            amounts you choose, because it makes you better, not because it&rsquo;s there.
          </p>
        </Prose>

        {/* CTA */}
        <div style={{ marginTop: 56, background: '#1C1C1A', borderRadius: 16, padding: '40px 36px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8BAF8C', marginBottom: 12 }}>
            Morning
          </p>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F2F0EB', marginBottom: 12, lineHeight: 1.25 }}>
            A structured daily information diet.
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(242,240,235,0.55)', marginBottom: 28, lineHeight: 1.65 }}>
            Twenty knowledge cards every morning, across Health, Money, World, Technology, and Psychology.
            Curated, sourced, and written to inform — not to hook. Then it stops.
          </p>
          <Link
            href="/#waitlist"
            style={{
              display: 'inline-block',
              background: '#8BAF8C',
              color: '#1C1C1A',
              fontWeight: 700,
              fontSize: 14,
              padding: '12px 28px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            Subscribe free →
          </Link>
        </div>

        {/* Footer links */}
        <div style={{ marginTop: 40, display: 'flex', gap: 24 }}>
          <Link href="/" style={{ fontSize: 13, color: '#9B8E83', textDecoration: 'none' }}>← Morning</Link>
          <Link href="/blog/what-is-a-knowledge-card" style={{ fontSize: 13, color: '#9B8E83', textDecoration: 'none' }}>What is a knowledge card? →</Link>
        </div>
      </main>
    </div>
    </>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 17,
        lineHeight: 1.8,
        color: '#2D2A26',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      <style>{`
        .prose-wrap p { margin-bottom: 22px; }
        .prose-wrap h2 { font-size: 1.25rem; font-weight: 700; color: #1C1C1A; margin: 40px 0 16px; font-family: var(--font-petrona, Georgia, serif); }
        .prose-wrap h3 { font-size: 1rem; font-weight: 700; color: #1C1C1A; margin: 28px 0 12px; }
      `}</style>
      <div className="prose-wrap" style={{ fontSize: 17, lineHeight: 1.8, color: '#2D2A26' }}>
        {children}
      </div>
    </div>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: '32px 0',
        padding: '20px 24px',
        background: '#F0FAF6',
        borderLeft: '3px solid #1D9E75',
        borderRadius: '0 8px 8px 0',
        fontSize: 16,
        color: '#2D5A2A',
        lineHeight: 1.7,
        fontStyle: 'italic',
      }}
    >
      {children}
    </div>
  )
}
