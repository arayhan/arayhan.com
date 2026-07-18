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
      style={{
        // Same treatment as the navbar: Prima's Footer has no inner container,
        // so center its content to the site container while the 3px opening
        // rule stays full-bleed via border on the padded element.
        padding:
          'var(--space-7) max(var(--container-pad), calc((100% - var(--container-max)) / 2)) var(--space-7)',
      }}
    />
  );
}
