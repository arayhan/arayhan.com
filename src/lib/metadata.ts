import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = { title: string; path: string; description?: string };

// The image app/opengraph-image.tsx renders. Named explicitly because a page that sets its own
// openGraph replaces the parent's object, file-convention image included.
const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: site.title };

/** Per-page metadata with a canonical URL and the shared card, title and description per page. */
export function pageMetadata({ title, path, description }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en_US", title, description, url: path, images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}
