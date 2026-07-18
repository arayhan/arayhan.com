import type { Locale } from '@/content';

/** "2026-06-12" → "JUN 2026" (locale-aware month). */
export function formatPostDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    year: 'numeric',
  })
    .format(new Date(iso))
    .toUpperCase();
}
