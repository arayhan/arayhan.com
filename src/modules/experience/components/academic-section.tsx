'use client';

import { Chip, RevealOnScroll } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/components/section-shell';
import { getContent, type ExperienceEntry, type Locale } from '@/content';
import { formatPeriod } from '../utils';

function EntryList({ heading, entries, nowWord }: { heading: string; entries: ExperienceEntry[]; nowWord: string }) {
  return (
    <div>
      <h3 style={{ margin: 0 }}>{heading}</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
          marginTop: 'var(--space-5)',
        }}
      >
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              borderLeft: 'var(--border-width) solid var(--border)',
              paddingLeft: 'var(--space-4)',
            }}
          >
            <span className="eyebrow">{`// ${formatPeriod(entry, nowWord).toUpperCase()}`}</span>
            <div style={{ fontWeight: 'var(--weight-semibold)', marginTop: 'var(--space-1)' }}>
              {entry.role}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-code)',
                color: 'var(--text-secondary)',
                marginTop: 'var(--space-1)',
              }}
            >
              {entry.company}
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-2) 0 0' }}>
              {entry.highlights[0]}
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
                marginTop: 'var(--space-3)',
              }}
            >
              {entry.technologies.slice(0, 4).map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AcademicSection() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { experiences } = getContent(locale);
  const nowWord = t('experience.now');

  return (
    <SectionShell
      id="academic"
      number="06"
      eyebrow={t('sections.academic.eyebrow')}
      title={t('sections.academic.title')}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'var(--space-7)',
        }}
      >
        <RevealOnScroll>
          <EntryList
            heading={t('experience.education')}
            entries={experiences.filter((e) => e.type === 'academic')}
            nowWord={nowWord}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={120}>
          <EntryList
            heading={t('experience.mentoring')}
            entries={experiences.filter((e) => e.type === 'mentoring')}
            nowWord={nowWord}
          />
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}
