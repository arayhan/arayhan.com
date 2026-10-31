"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { actionClass } from "@/components/ui/action";
import type { Profile } from "@/domain/portfolio";
import { useActiveTerm } from "./ActiveTerm";

type Props = {
  intro: Profile["intro"];
  terms: Profile["terms"];
  email: string;
  badge: ReactNode;
};

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The hero's copy: name, then a muted sentence whose /terms light up in their hue and switch the
 * showcase beside and below it (ActiveTerm). The second action follows the active term.
 */
export function HeroIntro({ intro, terms, email, badge }: Props) {
  const { active, pick } = useActiveTerm();
  const term = terms[active];

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-center justify-items-start gap-7 rounded-card border border-line bg-surface p-6 shadow-card sm:p-10">
      {badge}
      <h1 id="hero-title" className="fade-rise text-[clamp(3.25rem,2rem+5vw,6rem)] leading-[0.95] font-bold tracking-[-0.05em]" style={step(1)}>
        {intro.name}
      </h1>
      <p className="fade-rise max-w-[30ch] text-lede tracking-[-0.02em] text-pretty text-mute" style={step(2)}>
        {intro.lead} {intro.invite}{" "}
        {terms.map((t, i) => (
          <Fragment key={t.term}>
            {i > 0 && (i === terms.length - 1 ? " and " : ", ")}
            <button
              type="button"
              aria-pressed={i === active}
              aria-controls="hero-showcase"
              onPointerEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
              className="hero-term"
              style={{ "--term-hue": `var(--hue-${t.hue})` } as CSSProperties}
            >
              {t.term}
            </button>
          </Fragment>
        ))}
        .
      </p>
      <div className="fade-rise flex flex-wrap gap-2.5 pt-1" style={step(3)}>
        <a href={`mailto:${email}`} className={actionClass("primary")}>
          Email me
        </a>
        <Link href={term.href} className={actionClass("secondary")}>
          Open {term.term}
          <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
