'use client';

import { useState } from 'react';

const AVATAR_SRC = '/images/avatar.jpg';

/**
 * Portrait in Prima color-block framing: ink hairline card offset by a solid
 * cobalt block. Drop the real photo at public/images/avatar.jpg — until it
 * exists, a Prima-styled monogram placeholder renders instead.
 */
export function AvatarFrame({ alt }: { alt: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <div style={{ position: 'relative', width: 'min(300px, 100%)' }}>
      {/* cobalt offset block */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate(12px, 12px)',
          background: 'var(--primary)',
          borderRadius: 'var(--radius-md)',
        }}
      />
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          border: 'var(--border-width-emphasis) solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          background: 'var(--background)',
        }}
      >
        {missing ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-3)',
              backgroundImage:
                'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--primary)',
              }}
            >
              AR
            </span>
            <span className="eyebrow">{'// AVATAR.JPG'}</span>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={AVATAR_SRC}
            alt={alt}
            onError={() => setMissing(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>
    </div>
  );
}
