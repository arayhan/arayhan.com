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

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
  cvPath: string | null;
  headline: { lead: string; phrases: string[] };
  subtext: string;
};

export function formatMetric(metric: Metric): string {
  return `${metric.prefix ?? ""}${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}`;
}
