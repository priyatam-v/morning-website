import type { Metadata } from 'next'
import { DM_Sans, Petrona } from 'next/font/google'
import './globals.css'
import PostHogProvider from './components/PostHogProvider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jakarta',
})

const petrona = Petrona({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-petrona',
})

const BASE_URL = 'https://www.getmorning.co'

export const metadata: Metadata = {
  title: 'Morning | Daily Knowledge App',
  description:
    'Morning is a mobile app that gives you twenty knowledge cards every morning — across Health, Money, World, Technology, and Psychology. No algorithm. No streaks. Just knowledge.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/`,
    title: 'Morning — Learn something real today.',
    description:
      'Twenty knowledge cards every morning. No algorithm. No streaks. Just knowledge.',
    siteName: 'Morning',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morning — Learn something real today.',
    description:
      'Twenty knowledge cards. Then stop. No streaks. No guilt. No algorithm.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: 'Morning',
      url: BASE_URL,
      description:
        'A daily knowledge brief delivering twenty curated knowledge cards every morning.',
      inLanguage: 'en-US',
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Morning',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.png`,
        width: 442,
        height: 493,
      },
      description:
        'Morning delivers twenty knowledge cards every morning — the antidote to doomscrolling.',
      foundingDate: '2026',
      contactPoint: { '@type': 'ContactPoint', email: 'hello@getmorning.co' },
      sameAs: ['https://www.instagram.com/getmorning.co'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Morning',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web',
      url: BASE_URL,
      offers: {
        '@type': 'Offer',
        price: '0',
        availability: 'https://schema.org/PreOrder',
      },
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${petrona.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
