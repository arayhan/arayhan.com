'use client';

import { MagneticButton } from '@arayhan/prima-ui';
import { useTranslations } from 'next-intl';

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('error');

  return (
    <main
      style={{
        minHeight: '70svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-8) var(--container-pad)',
        gap: 'var(--space-5)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(48px, 10vw, 120px)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--error)',
          lineHeight: 1,
        }}
      >
        {'//500'}
      </div>
      <h1 style={{ fontSize: 'var(--text-h2)', margin: 0 }}>{t('title')}</h1>
      <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{t('body')}</p>
      <MagneticButton onClick={reset}>{t('retry')}</MagneticButton>
    </main>
  );
}
