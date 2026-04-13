import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Morning',
  description: 'How Morning collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
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

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9B8E83', marginBottom: 16 }}>
          Legal
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1C1C1A', marginBottom: 8, lineHeight: 1.2 }}>
          Privacy Policy
        </h1>
        <p style={{ color: '#9B8E83', fontSize: 14, marginBottom: 48 }}>
          Last updated: April 13, 2026
        </p>

        <div style={{ color: '#2D2A26', lineHeight: 1.8, fontSize: 15 }}>
          <Section title="1. Who We Are">
            <p>
              Morning (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website{' '}
              <strong>getmorning.co</strong>. Morning is a daily knowledge brief delivering twenty curated
              knowledge cards every day. Questions about this policy can be directed to{' '}
              <a href="mailto:hello@getmorning.co" style={{ color: '#2D5A2A', textDecoration: 'underline' }}>
                hello@getmorning.co
              </a>.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              <strong>Email address.</strong> When you join the waitlist or subscribe to Morning, we
              collect your email address. This is the only personal data we collect directly.
            </p>
            <p style={{ marginTop: 12 }}>
              <strong>Usage analytics.</strong> We use PostHog (a privacy-friendly analytics tool) to
              understand how visitors use our site. PostHog is configured in cookieless mode — it does
              not store cookies or fingerprint your device. Aggregated, anonymised data only.
            </p>
            <p style={{ marginTop: 12 }}>
              <strong>Server logs.</strong> Our hosting infrastructure (Vercel) may store standard HTTP
              server logs (IP addresses, browser type, page visited, timestamp) for up to 30 days for
              security and debugging purposes.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>To send you the Morning daily knowledge brief once you subscribe.</li>
              <li>To notify you when Morning launches (if you are on the waitlist).</li>
              <li>To send occasional product updates and announcements relevant to Morning.</li>
              <li>To improve the service based on anonymised usage data.</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              We will never sell, rent, or share your personal data with third parties for marketing
              purposes.
            </p>
          </Section>

          <Section title="4. Legal Basis for Processing (GDPR)">
            <p>
              If you are located in the European Economic Area, we process your email address on the
              basis of your <strong>consent</strong> (Article 6(1)(a) GDPR), which you give by
              submitting the waitlist or subscription form. You may withdraw consent at any time by
              unsubscribing (every email includes an unsubscribe link) or by contacting us directly.
            </p>
          </Section>

          <Section title="5. Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li><strong>Access</strong> the personal data we hold about you.</li>
              <li><strong>Correct</strong> inaccurate data.</li>
              <li><strong>Delete</strong> your data (&ldquo;right to be forgotten&rdquo;).</li>
              <li><strong>Object</strong> to or restrict processing.</li>
              <li><strong>Portability</strong> — receive your data in a machine-readable format.</li>
              <li><strong>Opt out of sale</strong> of your data (we do not sell data, but this right
              is available to California residents under CCPA).</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              To exercise any of these rights, email{' '}
              <a href="mailto:hello@getmorning.co" style={{ color: '#2D5A2A', textDecoration: 'underline' }}>
                hello@getmorning.co
              </a>. We will respond within 30 days.
            </p>
          </Section>

          <Section title="6. Email Communications &amp; CAN-SPAM">
            <p>
              Every marketing or newsletter email we send includes a clear unsubscribe mechanism. We
              honour all unsubscribe requests within 10 business days. Our emails include our physical
              mailing address as required by CAN-SPAM.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your email address for as long as your subscription is active, or until you
              request deletion. Anonymised analytics data may be retained indefinitely.
            </p>
          </Section>

          <Section title="8. Third-Party Services">
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li><strong>PostHog</strong> — privacy-friendly product analytics (cookieless mode).</li>
              <li><strong>Vercel</strong> — website hosting and infrastructure.</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Each of these services processes data under their own privacy policies. We choose
              processors that maintain appropriate data protection standards.
            </p>
          </Section>

          <Section title="9. Cookies">
            <p>
              Morning does not use tracking or advertising cookies. PostHog analytics runs in
              cookieless mode. We do not display a cookie consent banner because we do not set
              non-essential cookies.
            </p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>
              Morning is not directed at children under 13. We do not knowingly collect personal data
              from children. If you believe a child has provided us with personal data, please contact
              us and we will delete it promptly.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify subscribers of
              material changes via email. The &ldquo;last updated&rdquo; date at the top of this page
              reflects the most recent revision.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              For any privacy-related questions or requests:{' '}
              <a href="mailto:hello@getmorning.co" style={{ color: '#2D5A2A', textDecoration: 'underline' }}>
                hello@getmorning.co
              </a>
            </p>
          </Section>
        </div>

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid #E8E3DB', display: 'flex', gap: 24 }}>
          <Link href="/terms" style={{ fontSize: 14, color: '#5C5248', textDecoration: 'underline' }}>Terms of Service</Link>
          <Link href="/" style={{ fontSize: 14, color: '#5C5248', textDecoration: 'underline' }}>← Back to Morning</Link>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1C1C1A', marginBottom: 12 }}>{title}</h2>
      {children}
    </div>
  )
}
