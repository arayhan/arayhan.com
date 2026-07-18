import type { Metadata } from 'next';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {FONT_LINKS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
