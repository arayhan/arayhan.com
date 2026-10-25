import { formatMetric } from "@/domain/portfolio";
import { sectionIntros } from "./navigation";
import { profile } from "./profile";
import { projects } from "./projects";
import { community, roles } from "./roles";
import { sitePages } from "./routes";
import { site } from "./site";

const line = (text: string) => `- ${text}`;

/** llms.txt (https://llmstxt.org): a plain Markdown brief for AI assistants, built from site content. */
export function buildLlmsTxt(): string {
  const work = projects
    .filter((p) => !p.impactPending || p.metric)
    .map((p) => {
      const metric = p.metric ? ` ${formatMetric(p.metric)} ${p.metric.label}${p.metric.detail ? ` (${p.metric.detail})` : ""}.` : "";
      return line(`**${p.name}** (${p.role}, ${p.client}, ${p.years}).${metric} ${p.lines.join(" ")}`);
    });

  const links = profile.socials.flatMap((s) => (s.url ? [line(`${s.label}: ${s.url.replace("mailto:", "")}`)] : []));

  return [
    `# ${profile.name}`,
    "",
    `> ${site.description}`,
    "",
    `Also known as ${profile.shortName} and "arayhan". ${profile.role}. ${profile.bio}`,
    "",
    "## Selected work",
    ...work,
    "",
    "## Roles",
    ...roles.map((r) => line(`${r.company}: ${r.title} (${r.years})`)),
    "",
    "## Community",
    ...community.map((c) => line(`${c.value} ${c.label}`)),
    "",
    "## Pages",
    ...sitePages.map((p) => line(`[${p.title}](${site.url}${p.path === "/" ? "" : p.path})${sectionIntros[p.path] ? `: ${sectionIntros[p.path]}` : ""}`)),
    "",
    "## Contact",
    ...links,
    "",
  ].join("\n");
}
