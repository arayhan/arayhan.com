export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail?: string;
  /** After/before ratio (0-1) for a before/after bar. */
  ratio?: number;
  /** Only a measured improvement is drawn in the accent colour; scale facts stay ink. */
  improvement?: boolean;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  role: string;
  tag: string;
  years: string;
  lines: string[];
  stack: string[];
  metric: Metric | null;
  impactPending: boolean;
};

export type Role = {
  company: string;
  title: string;
  years: string;
};

export type CommunityStat = {
  value: string;
  label: string;
};

export type SocialKey = "github" | "linkedin" | "email" | "instagram" | "medium" | "youtube" | "threads";

export type Social = {
  key: SocialKey;
  label: string;
  /** null until the owner confirms the account; unconfirmed links are not rendered. */
  url: string | null;
};

export type NavLink = { label: string; href: string };

export type NavGroup = { label: string; links: NavLink[]; extra?: NavLink[] };

/** Icons a proof fact can carry; the UI maps each to a glyph. */
export type ShowcaseIcon = "team" | "startup" | "talk" | "award";

export type ShowcaseStat = {
  value: string;
  label: string;
  icon?: ShowcaseIcon;
  /** A product's own logo (public path), shown instead of an icon. */
  logo?: string;
};

export type ShowcaseTerm = {
  term: string;
  title: string;
  href: string;
  /** The card's big number; its first figure counts up when the card swaps in. */
  lead: ShowcaseStat & { detail?: string };
  /** Supporting facts in the row under the big number. */
  more: ShowcaseStat[];
};

export type AlbumPhoto = { src: string; alt: string; event: string; year: string };

/** A cut-out (transparent background) photo of the owner for the hero. */
export type Portrait = { src: string; alt: string; width: number; height: number };

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  email: string;
  socials: Social[];
  cvPath: string | null;
  /** The status badge, set as a terminal line: `$ whoami → role @ org`. */
  status: { prompt: string; role: string; org: string };
  intro: { name: string; lead: string; invite: string };
  terms: ShowcaseTerm[];
  bio: string;
  /** The hero marquee stays hidden until real photos are listed here. */
  album: AlbumPhoto[];
  /** null until the cut-out exists; the hero then shows the proof card alone. */
  portrait: Portrait | null;
};

export function formatMetric(metric: Metric): string {
  return `${metric.prefix ?? ""}${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}`;
}
