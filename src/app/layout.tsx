import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { menuGroups, quickLinks, showcaseLinks } from "@/content/navigation";
import { profile } from "@/content/profile";
import { themeInitScript } from "@/utils/theme";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Ahmed Rayhan Primadedas, Senior Frontend Engineer", template: "%s · A Rayhan P" },
  // TODO(content): description, settled with the phase 0 copy
  description: "TODO(content)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme is set before paint by themeInitScript, so the server markup cannot match it.
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
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
