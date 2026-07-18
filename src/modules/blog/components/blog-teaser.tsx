'use client';

import { Chip, RevealOnScroll } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/components/section-shell';
import { TransitionLink } from '@/components/page-transition';
import type { Locale } from '@/content';
import { usePosts } from '../use-cases/get-posts';
import { formatPostDate } from '../utils';

export function BlogTeaser() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { data: posts } = usePosts(locale);
  const latest = posts?.slice(0, 3) ?? [];

  return (
    <SectionShell id="blog" number="08" eyebrow={t('sections.blog.eyebrow')} title={t('sections.blog.title')}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {latest.map((post, i) => (
          <RevealOnScroll key={post.slug} delay={i * 80}>
            <TransitionLink
              href={`/blog/${post.slug}`}
              transitionLabel="blog"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(90px, auto) 1fr auto',
                gap: 'var(--space-5)',
                alignItems: 'baseline',
                padding: 'var(--space-5) 0',
                borderBottom: 'var(--border-width) solid var(--border)',
                color: 'inherit',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-label)',
                  letterSpacing: 'var(--tracking-label)',
                  color: 'var(--text-secondary)',
                }}
              >
                {formatPostDate(post.date, locale)}
              </span>
              <div>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-2) 0 0' }}>
                  {post.excerpt}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {post.tags.slice(0, 2).map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            </TransitionLink>
          </RevealOnScroll>
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-6)' }}>
        <TransitionLink href="/blog" transitionLabel="blog" className="eyebrow">
          {t('blog.readAll')} <i className="ph ph-arrow-right" aria-hidden="true" />
        </TransitionLink>
      </div>
    </SectionShell>
  );
}
