'use client';

import { Footer } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { getContent, type Locale } from '@/content';

export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { profile } = getContent(locale);

  return (
    <Footer
      name="RAYHAN.DEV"
      tagline={profile.tagline}
      links={profile.socials.map((s) => ({
        name: s.name,
        label: s.name,
        href: s.url,
      }))}
      note={`${t('footer.rights', { year: 2026 })} — ${t('footer.note')}`}
    />
  );
}
