'use client';

import { MagneticButton, TextScramble } from '@arayhan/prima-ui';
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from '@/components/page-transition';

export default function NotFound() {
  const t = useTranslations('notFound');
  const { navigate } = useTransitionRouter();

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
          fontSize: 'clamp(64px, 14vw, 160px)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--primary)',
          lineHeight: 1,
        }}
      >
        {'//404'}
      </div>
      <h1 style={{ fontSize: 'var(--text-h2)', margin: 0 }}>
        <TextScramble text={t('title')} />
      </h1>
      <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{t('body')}</p>
      <MagneticButton onClick={() => navigate('/', 'home')}>{t('backHome')}</MagneticButton>
    </main>
  );
}
