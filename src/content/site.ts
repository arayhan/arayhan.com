/** Canonical origin. Preview deployments can override it with NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://arayhan.com").replace(/\/$/, "");

export const site = {
  url: siteUrl,
  host: new URL(siteUrl).host,
  name: "Ahmed Rayhan Primadedas",
  title: "Ahmed Rayhan Primadedas, Senior Frontend Engineer",
  description:
    "Senior frontend engineer. Seven years of React and Next.js, from a pre-seed startup to Indonesia’s national medicine logistics platform.",
  keywords: ["Ahmed Rayhan Primadedas", "A Rayhan P", "arayhan", "senior frontend engineer", "React", "Next.js", "TypeScript", "design systems", "Indonesia"],
} as const;
