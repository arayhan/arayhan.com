import type { Locale } from '@/content';

/* Real-world flag imagery for the locale switcher. Flag colors are the
   flags' own, not palette tokens — they're pictures, not UI color. */

function IndonesiaFlag() {
  return (
    <svg viewBox="0 0 60 40" width="20" height="14" aria-hidden="true" style={{ display: 'block' }}>
      <rect width="60" height="20" fill="#CE1126" />
      <rect y="20" width="60" height="20" fill="#FFFFFF" />
    </svg>
  );
}

function UnitedKingdomFlag() {
  return (
    <svg viewBox="0 0 60 40" width="20" height="14" aria-hidden="true" style={{ display: 'block' }}>
      <clipPath id="uk-clip">
        <rect width="60" height="40" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" strokeWidth="13" />
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
      </g>
    </svg>
  );
}

export function FlagIcon({ locale }: { locale: Locale }) {
  const flag = locale === 'id' ? <IndonesiaFlag /> : <UnitedKingdomFlag />;
  return (
    <span
      style={{
        display: 'inline-flex',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        lineHeight: 0,
      }}
    >
      {flag}
    </span>
  );
}
