import { ImageResponse } from 'next/og'

export const alt = 'Snell Remodel — Painting, Kitchen Remodels & Drywall'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const NAVY  = '#1a2e44'
const GOLD  = '#c8a254'
const WHITE = '#ffffff'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: NAVY,
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Gold accent bar — top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: GOLD,
            display: 'flex',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 48,
          }}
        >
          <div
            style={{
              backgroundColor: GOLD,
              color: '#1a1a1a',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.1em',
              padding: '8px 20px',
              borderRadius: 4,
              display: 'flex',
            }}
          >
            LICENSED &amp; INSURED CONTRACTOR
          </div>
        </div>

        {/* Business name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              color: WHITE,
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginRight: 20,
            }}
          >
            Snell
          </span>
          <span
            style={{
              color: GOLD,
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Remodel
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 32,
            fontWeight: 400,
            letterSpacing: '0.02em',
            display: 'flex',
          }}
        >
          Painting · Kitchen Remodels · Drywall
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: GOLD,
                display: 'flex',
              }}
            />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 22, display: 'flex' }}>
              snellremodel.com
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex' }} />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 20,
            }}
          >
            <span style={{ display: 'flex' }}>Free Estimates</span>
            <span style={{ color: GOLD, display: 'flex' }}>·</span>
            <span style={{ display: 'flex' }}>5-Star Rated</span>
            <span style={{ color: GOLD, display: 'flex' }}>·</span>
            <span style={{ display: 'flex' }}>10+ Years Experience</span>
          </div>
        </div>

        {/* Gold accent bar — bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: GOLD,
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
