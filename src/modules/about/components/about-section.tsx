'use client';

import { RevealOnScroll, StatStrip } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/components/section-shell';
import { getContent, type Locale } from '@/content';

export function AboutSection() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { profile } = getContent(locale);

  return (
    <SectionShell
      id="about"
      number="01"
      eyebrow={t('sections.about.eyebrow')}
      title={t('sections.about.title')}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-7)',
          alignItems: 'start',
        }}
      >
        <RevealOnScroll>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 'var(--leading-body-lg)',
              margin: 0,
            }}
          >
            {profile.summary}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={120}>
          <div
            style={{
              borderLeft: 'var(--border-width-rule) solid var(--primary)',
              paddingLeft: 'var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{t('about.mentoringNote')}</p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-code)' }}>
              <div>
                <span className="eyebrow">{'// LOCATION'}</span>
                <div>{profile.location}</div>
              </div>
              <div style={{ marginTop: 'var(--space-3)' }}>
                <span className="eyebrow">{'// EMAIL'}</span>
                <div>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
      <div style={{ marginTop: 'var(--space-8)' }}>
        <RevealOnScroll delay={160}>
          <StatStrip
            stats={profile.stats.map((s) => ({
              value: `${s.value}${s.suffix}`,
              label: s.label,
            }))}
          />
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}
