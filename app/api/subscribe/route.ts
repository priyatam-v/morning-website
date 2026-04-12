import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/app/lib/rate-limit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  // 1. Rate limit check
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    null

  if (ip !== null && !checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // 2. Parse and validate email
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const rawEmail = (body as Record<string, unknown>)?.email
  if (typeof rawEmail !== 'string' || !rawEmail || rawEmail.length > 254 || !EMAIL_RE.test(rawEmail)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  const email = rawEmail

  // 3. Check env vars are configured
  const apiKey = process.env.BEEHIIV_API_KEY
  const pubId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !pubId) {
    console.error('[subscribe] Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID')
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    )
  }

  // 4. Call Beehiiv Subscribe API
  try {
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: false,
          utm_source: 'waitlist',
          double_opt_override: 'enabled',
        }),
      }
    )

    if (!beehiivRes.ok) {
      console.error(`[subscribe] Beehiiv returned ${beehiivRes.status} for pub ${pubId}`)
      throw new Error(`Beehiiv error: ${beehiivRes.status}`)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[subscribe] Beehiiv fetch failed:', err)
    return NextResponse.json(
      { error: 'Could not subscribe. Please try again.' },
      { status: 502 }
    )
  }
}
