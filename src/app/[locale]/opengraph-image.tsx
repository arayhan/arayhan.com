import { ImageResponse } from 'next/og';
import { getContent, type Locale } from '@/content';

export const alt = 'Ahmed Rayhan Primadedas — Frontend Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#0C0F16';
const ICE = '#F2F6FA';
const COBALT = '#1B44F0';
const MUTED = '#97A0AE';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { profile } = getContent(locale as Locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: INK,
          color: ICE,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: COBALT,
          }}
        >
          <span>{'//'}</span>
          <span>{profile.role}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              textTransform: 'uppercase',
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 32, color: MUTED, maxWidth: 900, lineHeight: 1.4 }}>
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 26,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          <div style={{ width: 40, height: 3, background: COBALT }} />
          <span>RAYHAN.DEV</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
