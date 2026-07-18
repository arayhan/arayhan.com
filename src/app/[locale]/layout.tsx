import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers';
import { PageTransitionProvider } from '@/components/page-transition';
import { CursorDot } from '@/components/cursor-dot';
import { SiteNavbar } from '@/components/site-navbar';
import { SiteFooter } from '@/components/site-footer';
import '../globals.css';

const FONT_LINKS = [
  'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css',
];

export const metadata: Metadata = {
  title: {
    default: 'Ahmed Rayhan Primadedas — Frontend Engineer',
    template: '%s — Rayhan Primadedas',
  },
  description:
    'Frontend engineer with 7+ years in React and Next.js. Design systems, clean architecture, national-scale platforms, and developer community work.',
};

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
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {FONT_LINKS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <PageTransitionProvider>
              <SiteNavbar />
              {children}
              <SiteFooter />
              <CursorDot />
            </PageTransitionProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
