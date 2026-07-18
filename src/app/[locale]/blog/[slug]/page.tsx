import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getContent, type Locale } from '@/content';
import { BlogDetailPage } from '@/modules/blog/components/blog-detail-page';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getContent(locale).posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getContent(locale as Locale).posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getContent(locale as Locale).posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <BlogDetailPage slug={slug} />;
}
