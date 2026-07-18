'use client';

import { Navbar } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransitionRouter } from '@/components/page-transition';
import { getContent, type Locale } from '@/content';

const SECTION_ANCHORS = [
  { key: 'about', id: 'about' },
  { key: 'work', id: 'work' },
  { key: 'experience', id: 'experience' },
  { key: 'speaking', id: 'speaking' },
  { key: 'contact', id: 'contact' },
] as const;

export function SiteNavbar() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { navigate } = useTransitionRouter();
  const { profile } = getContent(locale);

  const goToSection = (id: string) => {
    if (pathname === '/') {
      const target = document.getElementById(id);
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    } else {
      navigate(`/#${id}`, id);
    }
  };

  const otherLocale: Locale = locale === 'en' ? 'id' : 'en';

  return (
    <Navbar
      sticky
      logo="RAYHAN.DEV"
      logoHref={`/${locale}`}
      links={[
        ...SECTION_ANCHORS.map(({ key, id }) => ({
          label: t(key),
          onClick: () => goToSection(id),
        })),
        { label: t('blog'), onClick: () => navigate('/blog', 'blog') },
        {
          label: otherLocale.toUpperCase(),
          onClick: () => router.replace(pathname, { locale: otherLocale }),
        },
      ]}
      action={{ label: t('downloadCv'), href: profile.cvPath }}
      style={{
        zIndex: 80,
        // Prima's Navbar has no inner container — center its content to the
        // site container width while the bar + rule stay full-bleed.
        padding: 'var(--space-5) max(var(--container-pad), calc((100% - var(--container-max)) / 2))',
      }}
    />
  );
}
