"use client";

import { Fragment, useRef, type CSSProperties, type FocusEvent, type ReactNode } from "react";
import type { Profile } from "@/domain/portfolio";
import { useActiveTerm } from "./ActiveTerm";

type Props = {
  intro: Profile["intro"];
  terms: Profile["terms"];
  badge: ReactNode;
  children: ReactNode;
};

/**
 * The hero's centered copy: name, then a muted sentence whose /terms light up in their hue and
 * switch the shelf below (ActiveTerm). Pointer or focus inside here holds the term still.
 */
export function HeroIntro({ intro, terms, badge, children }: Props) {
  const { active, pick, holdHero } = useActiveTerm();
  const root = useRef<HTMLDivElement>(null);

  const onBlur = (e: FocusEvent) => {
    if (!root.current?.contains(e.relatedTarget as Node | null)) holdHero(false);
  };

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && holdHero(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && holdHero(false)}
      onFocus={() => holdHero(true)}
      onBlur={onBlur}
      className="relative mx-auto grid w-full max-w-[46rem] grid-cols-[minmax(0,1fr)] justify-items-center gap-7 px-4 text-center sm:px-8"
    >
      {badge}
      <h1 id="hero-title" className="fade-rise text-display font-bold tracking-[-0.045em]" style={{ "--i": 1 } as CSSProperties}>
        {intro.name}
      </h1>
      <p className="fade-rise -mt-2 max-w-[30ch] text-lede tracking-[-0.02em] text-pretty text-mute" style={{ "--i": 2 } as CSSProperties}>
        {intro.lead} {intro.invite}{" "}
        {terms.map((t, i) => (
          <Fragment key={t.term}>
            {i > 0 && (i === terms.length - 1 ? " and " : ", ")}
            <button
              type="button"
              aria-pressed={i === active}
              aria-controls="shelf-grid"
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
      {children}
    </div>
  );
}
