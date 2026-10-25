import { profile } from "./profile";
import { site } from "./site";

const personId = `${site.url}/#person`;

/** Person + WebSite graph for search engines and AI assistants. Only confirmed facts and links. */
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: [profile.shortName, "arayhan", "Rayhan Primadedas"],
      jobTitle: profile.role,
      description: site.description,
      url: site.url,
      // TODO(content): switch to the portrait once it exists.
      image: `${site.url}/opengraph-image`,
      email: `mailto:${profile.email}`,
      sameAs: profile.socials.flatMap((s) => (s.url && !s.url.startsWith("mailto:") ? [s.url] : [])),
      knowsAbout: ["React", "Next.js", "TypeScript", "Frontend architecture", "Design systems", "Firebase"],
      worksFor: { "@type": "Organization", name: "Badr Interactive" },
      memberOf: { "@type": "Organization", name: "GDG Depok" },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "en",
      author: { "@id": personId },
    },
  ],
};
