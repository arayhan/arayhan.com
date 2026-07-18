'use client';

import { Card, Chip, RevealOnScroll } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/components/section-shell';
import { getContent, type Locale } from '@/content';
import { formatPeriod } from '../utils';

export function FreelanceGrid() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { experiences } = getContent(locale);
  const freelance = experiences.filter((e) => e.type === 'freelance');

  return (
    <SectionShell
      id="freelance"
      number="05"
      eyebrow={t('sections.freelance.eyebrow')}
      title={t('sections.freelance.title')}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-5)',
        }}
      >
        {freelance.map((entry, i) => (
          <RevealOnScroll key={entry.id} delay={i * 90}>
            <Card interactive style={{ height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <span className="eyebrow">{`// ${formatPeriod(entry, t('experience.now')).toUpperCase()}`}</span>
                <h3 style={{ margin: 0 }}>{entry.role}</h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-code)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {entry.company}
                </div>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{entry.highlights[0]}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {entry.technologies.slice(0, 4).map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </div>
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </SectionShell>
  );
}
