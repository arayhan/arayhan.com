import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { menuGroups, quickLinks, showcaseLinks } from "@/content/navigation";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { themeInitScript } from "@/utils/theme";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
// Display headings only; body copy stays Geist.
const kanit = Kanit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-kanit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · A Rayhan P" },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_US", url: "/", title: site.title, description: site.description },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme is set before paint by themeInitScript, so the server markup cannot match it.
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${kanit.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <SiteHeader quickLinks={quickLinks} showcase={showcaseLinks} groups={menuGroups} socials={profile.socials} email={profile.email} />
        {children}
      </body>
    </html>
  );
}
