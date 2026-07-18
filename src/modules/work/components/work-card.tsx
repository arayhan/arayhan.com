'use client';

import { Chip, TiltCard } from '@arayhan/prima-ui';
import { useTranslations } from 'next-intl';
import { TransitionLink } from '@/components/page-transition';
import type { Project } from '@/content';

export function WorkCard({ project }: { project: Project }) {
  const t = useTranslations('work');

  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      transitionLabel="work"
      style={{ display: 'block', color: 'inherit' }}
    >
      <TiltCard style={{ height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {project.technologies.slice(0, 3).map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
          <h3 style={{ textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
            {project.title}
          </h3>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-label)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            {project.client} · {project.period}
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: 0, flex: 1 }}>{project.summary}</p>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-label)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--primary)',
            }}
          >
            {t('viewCaseStudy')} <i className="ph ph-arrow-right" aria-hidden="true" />
          </div>
        </div>
      </TiltCard>
    </TransitionLink>
  );
}
