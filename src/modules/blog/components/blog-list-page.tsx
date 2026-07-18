'use client';

import { BlogList, Spinner } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { useTransitionRouter } from '@/components/page-transition';
import type { Locale } from '@/content';
import { usePosts } from '../use-cases/get-posts';
import { formatPostDate } from '../utils';

export function BlogListPage() {
  const t = useTranslations('blog');
  const locale = useLocale() as Locale;
  const { data: posts, isLoading } = usePosts(locale);
  const { navigate } = useTransitionRouter();

  // BlogList renders plain anchors; route them through the transition overlay.
  const interceptClicks = (event: MouseEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || !href.startsWith('/')) return;
    event.preventDefault();
    // Strip the locale prefix — our navigate() re-adds it.
    navigate(href.replace(`/${locale}`, '') || '/', 'blog');
  };

  return (
    <main
      style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--container-pad) var(--section-gap)',
        minHeight: '60svh',
      }}
    >
      <header style={{ marginBottom: 'var(--space-7)' }}>
        <span className="eyebrow">{`// ${t('title').toUpperCase()}`}</span>
        <h1 style={{ margin: 'var(--space-3) 0 0' }}>{t('title')}</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '55ch', margin: 'var(--space-4) 0 0' }}>
          {t('description')} <em>{t('dummyNote')}</em>
        </p>
      </header>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-9) 0' }}>
          <Spinner />
        </div>
      ) : posts && posts.length > 0 ? (
        <div onClick={interceptClicks}>
          <BlogList
            posts={posts.map((post) => ({
              date: formatPostDate(post.date, locale),
              title: post.title,
              description: post.excerpt,
              tags: post.tags,
              readTime: t('minRead', { minutes: post.readingTimeMin }).toUpperCase(),
              href: `/${locale}/blog/${post.slug}`,
            }))}
          />
        </div>
      ) : (
        <p style={{ color: 'var(--text-secondary)' }}>{t('empty')}</p>
      )}
    </main>
  );
}
