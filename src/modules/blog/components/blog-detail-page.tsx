'use client';

import { BlogDetail, Spinner } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { useTransitionRouter } from '@/components/page-transition';
import type { Locale } from '@/content';
import { usePost } from '../use-cases/get-posts';
import { formatPostDate } from '../utils';

export function BlogDetailPage({ slug }: { slug: string }) {
  const t = useTranslations('blog');
  const locale = useLocale() as Locale;
  const { data: post, isLoading } = usePost(locale, slug);
  const { navigate } = useTransitionRouter();

  const interceptBack = (event: MouseEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || !href.startsWith('/')) return;
    event.preventDefault();
    navigate(href.replace(`/${locale}`, '') || '/', 'blog');
  };

  if (isLoading) {
    return (
      <main style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-9) 0', minHeight: '60svh' }}>
        <Spinner />
      </main>
    );
  }

  if (!post) return null;

  return (
    <main
      style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: 'var(--space-8) var(--container-pad) var(--section-gap)',
      }}
      onClick={interceptBack}
    >
      <BlogDetail
        date={formatPostDate(post.date, locale)}
        title={post.title}
        lede={post.excerpt}
        tags={post.tags}
        readTime={t('minRead', { minutes: post.readingTimeMin }).toUpperCase()}
        backHref={`/${locale}/blog`}
        backLabel={t('backToList').toUpperCase()}
      >
        {post.body.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </BlogDetail>
    </main>
  );
}
