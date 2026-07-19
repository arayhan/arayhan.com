'use client';

import { RevealOnScroll } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/components/section-shell';
import { getContent, type Locale } from '@/content';
import { WorkCard } from './work-card';

export function WorkSection() {
  const t = useTranslations('sections.work');
  const locale = useLocale() as Locale;
  const { projects } = getContent(locale);

  return (
    <SectionShell id="work" number="02" eyebrow={t('eyebrow')} title={t('title')}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {projects.map((project, i) => (
          <RevealOnScroll key={project.slug} delay={(i % 2) * 100}>
            <WorkCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </SectionShell>
  );
}
