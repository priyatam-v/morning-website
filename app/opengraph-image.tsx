import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Morning — Your mind deserves a better morning.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#1C1C1A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top row — wordmark + pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#F2F0EB',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: 'Georgia, serif',
            }}
          >
            Morning
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#8BAF8C',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: '1px solid #8BAF8C',
              padding: '6px 16px',
              borderRadius: 999,
            }}
          >
            Daily Knowledge Brief
          </span>
        </div>

        {/* Center — main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#F2F0EB',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontFamily: 'Georgia, serif',
            }}
          >
            Your mind deserves<br />a better morning.
          </div>
          <div
            style={{
              fontSize: 22,
              color: 'rgba(242, 240, 235, 0.5)',
              lineHeight: 1.5,
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
            }}
          >
            Twenty curated knowledge cards every morning — then stop.
          </div>
        </div>

        {/* Bottom row — topics + url */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Health', 'Money', 'World', 'Technology', 'Psychology'].map((topic) => (
              <span
                key={topic}
                style={{
                  fontSize: 13,
                  color: 'rgba(242, 240, 235, 0.45)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {topic}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: 15,
              color: 'rgba(242, 240, 235, 0.3)',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.04em',
            }}
          >
            getmorning.co
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
