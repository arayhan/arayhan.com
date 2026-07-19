'use client';

import { Chip, RevealOnScroll } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { TransitionLink } from '@/components/page-transition';
import { getContent, type Locale } from '@/content';

function MetaCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow">{`// ${label}`}</div>
      <div style={{ marginTop: 'var(--space-1)' }}>{children}</div>
    </div>
  );
}

export function CaseStudy({ slug }: { slug: string }) {
  const t = useTranslations('work');
  const locale = useLocale() as Locale;
  const { projects } = getContent(locale);
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) return null;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article
      style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--container-pad) var(--section-gap)',
      }}
    >
      <TransitionLink
        href="/#work"
        transitionLabel="home"
        className="eyebrow"
        style={{ display: 'inline-block', marginBottom: 'var(--space-6)' }}
      >
        <i className="ph ph-arrow-left" aria-hidden="true" /> {t('backToWork')}
      </TransitionLink>

      <RevealOnScroll>
        <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 64px)', margin: 0 }}>{project.title}</h1>
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--text-secondary)',
            maxWidth: '60ch',
            margin: 'var(--space-5) 0 0',
          }}
        >
          {project.summary}
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: 'var(--space-5)',
            borderTop: 'var(--border-width-rule) solid var(--border-strong)',
            marginTop: 'var(--space-7)',
            paddingTop: 'var(--space-5)',
          }}
        >
          <MetaCell label={t('client')}>{project.client}</MetaCell>
          <MetaCell label={t('role')}>{project.role}</MetaCell>
          <MetaCell label={t('period')}>{project.period}</MetaCell>
          <MetaCell label={t('stack')}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {project.technologies.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </MetaCell>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={140}>
        <section style={{ marginTop: 'var(--space-8)' }}>
          <div className="eyebrow">{`// ${t('highlights')}`}</div>
          <ul
            style={{
              margin: 'var(--space-4) 0 0',
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            {project.highlights.map((h) => (
              <li key={h} style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>—</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      </RevealOnScroll>

      {project.sections.map((section, i) => (
        <RevealOnScroll key={section.heading} delay={80}>
          <section
            style={{
              marginTop: 'var(--space-8)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: 'var(--space-5)',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-label)',
                  letterSpacing: 'var(--tracking-label)',
                  color: 'var(--text-secondary)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 style={{ fontSize: 'var(--text-h2)', marginTop: 'var(--space-2)' }}>
                {section.heading}
              </h2>
            </div>
            <p style={{ margin: 0, lineHeight: 'var(--leading-body)' }}>{section.body}</p>
          </section>
        </RevealOnScroll>
      ))}

      <nav
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 'var(--space-5)',
          borderTop: 'var(--border-width) solid var(--border)',
          marginTop: 'var(--space-9)',
          paddingTop: 'var(--space-5)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-label)',
          letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase',
        }}
      >
        <TransitionLink href={`/work/${prev.slug}`} transitionLabel="work">
          <i className="ph ph-arrow-left" aria-hidden="true" /> {t('prevProject')}: {prev.title}
        </TransitionLink>
        <TransitionLink href={`/work/${next.slug}`} transitionLabel="work" style={{ textAlign: 'right' }}>
          {t('nextProject')}: {next.title} <i className="ph ph-arrow-right" aria-hidden="true" />
        </TransitionLink>
      </nav>
    </article>
  );
}
