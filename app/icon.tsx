import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

const NAVY = '#1a2e44'
const GOLD = '#c8a254'
const WHITE = '#ffffff'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: NAVY,
          borderRadius: 96,
        }}
      >
        {/* House shape */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

          {/* Roof — rotated square clipped to triangle look */}
          <div
            style={{
              width: 240,
              height: 240,
              backgroundColor: GOLD,
              transform: 'rotate(45deg)',
              borderRadius: 16,
              position: 'absolute',
              top: -60,
              display: 'flex',
            }}
          />

          {/* House body */}
          <div
            style={{
              width: 220,
              height: 180,
              backgroundColor: WHITE,
              borderRadius: '0 0 16px 16px',
              marginTop: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Door */}
            <div
              style={{
                width: 64,
                height: 96,
                backgroundColor: GOLD,
                borderRadius: '12px 12px 0 0',
                position: 'absolute',
                bottom: 0,
                display: 'flex',
              }}
            />
            {/* Left window */}
            <div
              style={{
                width: 48,
                height: 48,
                backgroundColor: NAVY,
                borderRadius: 6,
                position: 'absolute',
                top: 24,
                left: 28,
                display: 'flex',
              }}
            />
            {/* Right window */}
            <div
              style={{
                width: 48,
                height: 48,
                backgroundColor: NAVY,
                borderRadius: 6,
                position: 'absolute',
                top: 24,
                right: 28,
                display: 'flex',
              }}
            />
          </div>

          {/* Paint brush handle — diagonal accent */}
          <div
            style={{
              position: 'absolute',
              bottom: -32,
              right: -48,
              width: 16,
              height: 100,
              backgroundColor: GOLD,
              borderRadius: 8,
              transform: 'rotate(-35deg)',
              display: 'flex',
            }}
          />
          {/* Brush bristles */}
          <div
            style={{
              position: 'absolute',
              bottom: -68,
              right: -62,
              width: 28,
              height: 36,
              backgroundColor: WHITE,
              borderRadius: '2px 2px 12px 12px',
              transform: 'rotate(-35deg)',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
