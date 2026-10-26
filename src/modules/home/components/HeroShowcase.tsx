"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MedalIcon, MicrophoneStageIcon, RocketLaunchIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type FocusEvent, type ReactNode } from "react";
import type { Portrait as PortraitData, Profile, ShowcaseIcon, ShowcaseStat } from "@/domain/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CountUp } from "./CountUp";

type Props = {
  intro: Profile["intro"];
  terms: Profile["terms"];
  portrait: Profile["portrait"];
  badge: ReactNode;
  children: ReactNode;
};

const ADVANCE_MS = 8000;

const pad = (n: number) => String(n).padStart(2, "0");

const ICONS: Record<ShowcaseIcon, Icon> = { team: UsersThreeIcon, startup: RocketLaunchIcon, talk: MicrophoneStageIcon, award: MedalIcon };

function StatMark({ stat }: { stat: ShowcaseStat }) {
  if (stat.logo) {
    // eslint-disable-next-line @next/next/no-img-element -- tiny local SVG logos; the image optimizer adds nothing.
    return <img src={stat.logo} alt="" width={28} height={28} className="size-7 rounded-lg" />;
  }
  if (!stat.icon) return null;
  const Glyph = ICONS[stat.icon];
  return (
    <span className="grid size-7 place-items-center rounded-lg bg-soft text-accent">
      <Glyph size={16} weight="duotone" aria-hidden="true" />
    </span>
  );
}

function Portrait({ portrait }: { portrait: PortraitData }) {
  return (
    // Phones: above the card, which overlaps its lower part. Desktop: standing on the hero's bottom edge.
    <div className="portrait-fade fade-rise relative mx-auto -mb-28 w-[min(80%,22rem)] lg:absolute lg:right-0 lg:bottom-0 lg:m-0 lg:w-auto" style={{ "--i": 1 } as CSSProperties}>
      <Image src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} priority sizes="(min-width: 1024px) 460px, min(80vw, 352px)" className="h-auto w-full lg:h-[min(84svh,46rem)] lg:w-auto lg:max-w-none" />
    </div>
  );
}

/**
 * Name first, then a muted dwinawan-style sentence: hovering, focusing or tapping a /term
 * lights it in the accent and swaps the proof card, whose big number counts up. Left alone,
 * the card walks the terms; it holds still while the pointer or focus is inside.
 */
export function HeroShowcase({ intro, terms, portrait, badge, children }: Props) {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const cycling = !reduced && !engaged;

  const pick = (i: number) => {
    setSwapped(true);
    setActive(i);
  };

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(() => {
      setSwapped(true);
      setActive((i) => (i + 1) % terms.length);
    }, ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, cycling, terms.length]);

  const onBlur = (e: FocusEvent) => {
    if (!root.current?.contains(e.relatedTarget as Node | null)) setEngaged(false);
  };

  const current = terms[active];

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setEngaged(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={onBlur}
      className="relative mx-auto grid w-full max-w-page gap-10 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16 lg:px-14"
    >
      <div className="relative grid min-w-0 grid-cols-[minmax(0,1fr)] justify-items-start gap-7 lg:self-center lg:py-16">
        {badge}
        <h1 id="hero-title" className="fade-rise text-display font-semibold tracking-[-0.045em]" style={{ "--i": 1 } as CSSProperties}>
          {intro.name}
        </h1>
        <p className="fade-rise -mt-2 max-w-[30ch] text-lede font-light tracking-[-0.02em] text-pretty text-mute" style={{ "--i": 2 } as CSSProperties}>
          {intro.lead} {intro.invite}{" "}
          {terms.map((t, i) => (
            <Fragment key={t.term}>
              {i > 0 && (i === terms.length - 1 ? " and " : ", ")}
              <button
                type="button"
                aria-pressed={i === active}
                aria-controls="hero-proof"
                onPointerEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                className="hero-term"
              >
                {t.term}
              </button>
            </Fragment>
          ))}
          .
        </p>
        {children}
      </div>

      <div className="relative grid min-w-0 lg:block lg:min-h-[34rem]">
        {portrait && <Portrait portrait={portrait} />}
        <article
          id="hero-proof"
          aria-live="polite"
          className="fade-rise relative z-10 min-w-0 overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-[0_24px_60px_-32px_rgb(15_23_42/0.35)] backdrop-blur-md lg:absolute lg:bottom-[8%] lg:-left-24 lg:w-[20rem]"
          style={{ "--i": 2 } as CSSProperties}
        >
          <div key={current.term} className="fade-rise grid gap-4 p-5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-accent">{current.term}</span>
              <span className="text-mute">
                {pad(active + 1)} / {pad(terms.length)}
              </span>
            </div>

            <div className="grid gap-1.5">
              <p className="text-[clamp(2.5rem,2.1rem+1.2vw,3.25rem)] leading-[0.95] font-semibold tracking-[-0.055em] tabular-nums">
                <CountUp value={current.lead.value} animate={swapped} />
              </p>
              <p className="text-[15px] text-ink">{current.lead.label}</p>
              {current.lead.detail && <p className="font-mono text-xs text-mute">{current.lead.detail}</p>}
            </div>

            <dl className="grid auto-cols-fr grid-flow-col border-t border-line">
              {current.more.map((s, i) => (
                <div key={s.value} className={`flex min-w-0 flex-col-reverse justify-end gap-1 pt-3.5 ${i > 0 ? "border-l border-line pl-3" : ""} ${i < current.more.length - 1 ? "pr-3" : ""}`}>
                  <dt className="text-xs leading-snug text-mute">{s.label}</dt>
                  <dd className="grid justify-items-start gap-2 text-base font-semibold tracking-tight">
                    <StatMark stat={s} />
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex items-center justify-between gap-4 border-t border-line pt-3.5">
              <p className="min-w-0 truncate text-sm text-mute">{current.title}</p>
              <Link href={current.href} className="group inline-flex flex-none items-center gap-1.5 text-sm font-medium text-accent">
                Open {current.term}
                <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
