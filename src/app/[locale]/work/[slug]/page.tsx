import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getContent, type Locale } from '@/content';
import { CaseStudy } from '@/modules/work/components/case-study';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getContent(locale).projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getContent(locale as Locale).projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getContent(locale as Locale).projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <CaseStudy slug={slug} />;
}
