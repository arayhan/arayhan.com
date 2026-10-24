import type { Profile } from "@/domain/portfolio";
import { actionClass } from "../home.actions";
import { CopyEmailButton } from "./CopyEmailButton";

export function CloseBlock({ profile }: { profile: Profile }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="grid gap-5 rounded-xl bg-ink p-6 text-paper md:p-12">
      <h2 id="contact-title" className="max-w-close font-display text-close font-bold tracking-tight">
        Hiring a senior frontend engineer?
      </h2>
      <p className="font-mono text-xs text-rule">
        {profile.email} · {profile.city} · {profile.timezone}
      </p>
      <div className="flex flex-wrap gap-2.5">
        <CopyEmailButton email={profile.email} label="Copy email" variant="primary" tone="ink" />
        <a href={profile.cvPath} className={actionClass("outline", "ink")} download>
          Download CV
        </a>
        <a href={profile.linkedin} className={actionClass("outline", "ink")} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} className={actionClass("outline", "ink")} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </section>
  );
}
