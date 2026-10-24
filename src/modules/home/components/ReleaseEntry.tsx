import type { Project } from "@/domain/portfolio";
import { MetricCard } from "./MetricCard";

export function ReleaseEntry({ project }: { project: Project }) {
  return (
    <li className="grid gap-x-8 gap-y-3 border-b border-rule py-7 md:grid-cols-(--grid-release)">
      <div className="flex flex-wrap content-start items-center gap-2 font-mono text-xs text-mute md:flex-col md:items-start">
        {project.years}
        <span className="rounded-full border border-rule bg-card px-2 text-ink">{project.tag}</span>
      </div>
      <div className="grid min-w-0 gap-3">
        <h3 className="font-display text-h3 font-semibold tracking-tight">
          {project.name}
          <span className="mt-0.5 block font-sans text-sm font-normal tracking-normal text-mute">
            {project.client} · {project.role}
          </span>
        </h3>
        <ul className="grid gap-1.5">
          {project.lines.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden="true" className="font-mono font-medium text-plus">
                +
              </span>
              <span className="min-w-0">{line}</span>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs text-mute">{project.stack.join(" · ")}</p>
      </div>
      <MetricCard metric={project.metric} pending={project.impactPending} />
    </li>
  );
}
