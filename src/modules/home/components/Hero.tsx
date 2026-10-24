import type { CSSProperties } from "react";
import type { Profile } from "@/domain/portfolio";
import { actionClass } from "../home.actions";
import { CopyEmailButton } from "./CopyEmailButton";
import { metricItems, ProofStrip } from "./ProofStrip";

const rise = "animate-rise [animation-delay:calc(var(--i)*var(--stagger))]";
const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ profile }: { profile: Profile }) {
  return (
    <header className="grid gap-6 pt-3 md:pt-12">
      <p className={`flex flex-wrap items-center gap-2 font-mono text-xs text-mute ${rise}`} style={step(0)}>
        <span className="rounded-sm bg-ink px-1.5 py-0.5 text-paper">{profile.yearsBadge}</span>
        {profile.role} · {profile.city} · {profile.timezone}
      </p>
      <h1
        className={`max-w-hero font-display text-hero font-bold tracking-tight [font-variation-settings:'opsz'_96] ${rise}`}
        style={step(1)}
      >
        {profile.headline.lead} <em className="text-plus not-italic">{profile.headline.emphasis}</em>
      </h1>
      <p className={`max-w-lede text-lede text-ink-soft ${rise}`} style={step(2)}>
        {profile.lede}
      </p>
      <div className={`flex flex-wrap gap-2.5 ${rise}`} style={step(3)}>
        <a href={profile.cvPath} className={actionClass("primary")} download>
          Download CV
        </a>
        <CopyEmailButton email={profile.email} />
        <a href={profile.linkedin} className={actionClass("outline")} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      <div className={rise} style={step(4)}>
        <ProofStrip items={metricItems(profile.proof)} />
      </div>
    </header>
  );
}
