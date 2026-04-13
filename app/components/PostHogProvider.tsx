'use client'
import { useEffect } from 'react'

let initialized = false

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key || initialized) return
    initialized = true
    // Dynamically import posthog-js so it is excluded from the initial bundle
    // and only loaded after the page is interactive.
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
        persistence: 'memory',    // cookieless — no consent banner needed
        capture_pageview: true,   // automatic $pageview on load
        autocapture: false,       // we define our own events, no noise
      })
    })
  }, [])

  return <>{children}</>
}
