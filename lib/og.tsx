import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// Per-country flag accent colors — mirror [data-country] rules in app/globals.css
const ACCENTS: Record<string, string> = {
  philippines: '#c1272d',
  thailand: '#2d3a8c',
  vietnam: '#c17f00',
  indonesia: '#c1272d',
  malaysia: '#00457c',
};

export function accentFor(countrySlug?: string): string {
  return (countrySlug && ACCENTS[countrySlug]) || '#c9a84c';
}

interface OgCardProps {
  tag: string;
  title: string;
  subtitle: string;
  accent: string;
}

// Satori (next/og) requires explicit display:flex on multi-child elements
// and can't load web fonts or emoji at build time, so the card sticks to
// the bundled sans font and draws the logo diamond as a rotated square.
export function ogCard({ tag, title, subtitle, accent }: OgCardProps): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #060f09 0%, #0d2018 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 18,
              height: 18,
              background: '#c9a84c',
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 8,
              color: '#c9a84c',
            }}
          >
            SEA TAX
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#c9a84c',
            }}
          >
            {tag}
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1,
              color: '#f2ede3',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 120, height: 10, background: accent }} />
          <div style={{ fontSize: 26, color: '#6db88a' }}>{subtitle}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
