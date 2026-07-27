import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers';
import { PageTransitionProvider } from '@/components/page-transition';
import { CursorDot } from '@/components/cursor-dot';
import { SiteNavbar } from '@/components/site-navbar';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/libs/site';
import { getContent, type Locale } from '@/content';
import '../globals.css';

/* Clash Display is self-hosted (see globals.css); Inter/JetBrains Mono and
   the Phosphor icon font still ride their CDNs. */
const FONT_LINKS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css',
];

const CLASH_PRELOADS = ['/fonts/clash-display-600.woff2', '/fonts/clash-display-700.woff2'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { profile } = getContent(locale as Locale);
  const title = { default: `${profile.name} — ${profile.role}`, template: `%s — ${profile.shortName}` };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: profile.tagline,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}`])),
    },
    openGraph: {
      title: title.default,
      description: profile.tagline,
      type: 'website',
      locale,
      url: `${SITE_URL}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title.default,
      description: profile.tagline,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {CLASH_PRELOADS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        {FONT_LINKS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <PageTransitionProvider>
              <a href="#main-content" className="skip-link">
                {locale === 'id' ? 'Lompat ke konten' : 'Skip to content'}
              </a>
              <SiteNavbar />
              <div id="main-content" tabIndex={-1}>
                {children}
              </div>
              <SiteFooter />
              <CursorDot />
            </PageTransitionProvider>
          </Providers>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
