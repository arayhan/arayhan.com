import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getContent } from '@/content';
import { SITE_URL } from '@/libs/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const { projects, posts } = getContent(locale);
    const base = `${SITE_URL}/${locale}`;

    entries.push({ url: base, changeFrequency: 'monthly', priority: 1 });
    entries.push({ url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.7 });
    for (const project of projects) {
      entries.push({ url: `${base}/work/${project.slug}`, changeFrequency: 'yearly', priority: 0.6 });
    }
    for (const post of posts) {
      entries.push({ url: `${base}/blog/${post.slug}`, changeFrequency: 'yearly', priority: 0.5 });
    }
  }

  return entries;
}
