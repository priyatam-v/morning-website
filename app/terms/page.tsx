import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Morning',
  description: 'Terms of Service for Morning — the daily knowledge brief.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ color: '#9B8E83', fontSize: 14, marginBottom: 48 }}>
          Last updated: April 13, 2026
        </p>

        <div style={{ color: '#2D2A26', lineHeight: 1.8, fontSize: 15 }}>
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing <strong>getmorning.co</strong> or subscribing to the Morning newsletter, you
              agree to these Terms of Service. If you do not agree, please do not use the service.
              These terms apply to all visitors, subscribers, and users of Morning.
            </p>
          </Section>

          <Section title="2. What Morning Is">
            <p>
              Morning is a daily knowledge brief that delivers twenty curated knowledge cards every morning
              across Health, Money, World, Technology, and Psychology topics. Morning is provided for
              personal, non-commercial informational purposes only.
            </p>
          </Section>

          <Section title="3. Subscriptions and Waitlist">
            <p>
              By providing your email address, you consent to receive the Morning daily newsletter and
              related product communications. Morning is currently free. We reserve the right to
              introduce paid tiers in the future; you will be notified before any charges apply and
              can cancel at any time.
            </p>
            <p style={{ marginTop: 12 }}>
              You may unsubscribe at any time via the unsubscribe link in any email, or by contacting{' '}
              <a href="mailto:hello@getmorning.co" style={{ color: '#2D5A2A', textDecoration: 'underline' }}>
                hello@getmorning.co
              </a>.
            </p>
          </Section>

          <Section title="4. Intellectual Property">
            <p>
              All content published by Morning — including knowledge cards, editorial copy, brand
              assets, and design — is the intellectual property of Morning and is protected by
              applicable copyright law. You may not reproduce, republish, or redistribute Morning
              content without prior written consent, except for personal, non-commercial use.
            </p>
            <p style={{ marginTop: 12 }}>
              Brief quotations with attribution to Morning and a link to{' '}
              <strong>getmorning.co</strong> are permitted.
            </p>
          </Section>

          <Section title="5. Accuracy of Content">
            <p>
              Morning makes every effort to ensure accuracy in its knowledge cards. However, content
              is provided for informational purposes only and does not constitute professional advice
              (medical, financial, legal, or otherwise). Always consult a qualified professional
              before acting on any information.
            </p>
          </Section>

          <Section title="6. Prohibited Use">
            <p>You agree not to:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>Use Morning for any unlawful purpose.</li>
              <li>Reproduce or resell Morning content without permission.</li>
              <li>Attempt to reverse-engineer, scrape, or copy our content at scale.</li>
              <li>Submit false or misleading information when registering.</li>
            </ul>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>
              Morning is provided &ldquo;as is&rdquo; without warranties of any kind, express or
              implied. We do not guarantee that the service will be uninterrupted, error-free, or free
              of viruses. Your use of Morning is at your sole risk.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Morning shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of or
              inability to use the service, even if advised of the possibility of such damages.
            </p>
          </Section>

          <Section title="9. Changes to Terms">
            <p>
              We may update these Terms of Service at any time. Material changes will be notified via
              email to active subscribers. Continued use of Morning after changes constitutes
              acceptance of the updated terms.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These terms are governed by applicable law. Any disputes shall be resolved through
              good-faith negotiation. If you have concerns, please reach out to us before pursuing
              any formal action.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Questions about these terms:{' '}
              <a href="mailto:hello@getmorning.co" style={{ color: '#2D5A2A', textDecoration: 'underline' }}>
                hello@getmorning.co
              </a>
            </p>
          </Section>
        </div>

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid #E8E3DB', display: 'flex', gap: 24 }}>
          <Link href="/privacy" style={{ fontSize: 14, color: '#5C5248', textDecoration: 'underline' }}>Privacy Policy</Link>
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
