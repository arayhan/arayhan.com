"use client";

import Link from "next/link";
import { ArrowRightIcon, BriefcaseIcon, CubeIcon, MedalIcon, MicrophoneStageIcon, RocketLaunchIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type FocusEvent, type ReactNode } from "react";
import { actionClass } from "@/components/ui/action";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import type { Hue, Profile, ShowcaseIcon, ShowcaseStat } from "@/domain/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CountUp } from "./CountUp";

type Props = {
  intro: Profile["intro"];
  terms: Profile["terms"];
  badge: ReactNode;
  children: ReactNode;
};

const ADVANCE_MS = 8000;

const pad = (n: number) => String(n).padStart(2, "0");

const ICONS: Record<ShowcaseIcon, Icon> = {
  work: BriefcaseIcon,
  product: CubeIcon,
  team: UsersThreeIcon,
  startup: RocketLaunchIcon,
  talk: MicrophoneStageIcon,
  award: MedalIcon,
};

// The active /term takes its category's text shade (contrast-safe on the page).
const TERM_HUE: Record<Hue, string> = {
  blue: "var(--hue-blue-text)",
  violet: "var(--hue-violet-text)",
  amber: "var(--hue-amber-text)",
  green: "var(--hue-green-text)",
};

function StatMark({ stat, hue }: { stat: ShowcaseStat; hue: Hue }) {
  if (stat.logo) {
    // eslint-disable-next-line @next/next/no-img-element -- tiny local SVG logos; the image optimizer adds nothing.
    return <img src={stat.logo} alt="" width={28} height={28} className="size-7 flex-none rounded-full" />;
  }
  if (!stat.icon) return <span className="size-7 flex-none" />;
  return <IconBadge icon={ICONS[stat.icon]} hue={stat.hue ?? hue} size="sm" />;
}

/**
 * Name first, then a muted dwinawan-style sentence: hovering, focusing or tapping a /term
 * lights it in its hue and swaps the proof card, whose big number counts up. Left alone,
 * the card walks the terms; it holds still while the pointer or focus is inside.
 */
export function HeroShowcase({ intro, terms, badge, children }: Props) {
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
                style={{ "--term-hue": TERM_HUE[t.hue] } as CSSProperties}
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
        <Card
          as="article"
          dotted
          id="hero-proof"
          aria-live="polite"
          className="fade-rise z-10 min-w-0 overflow-hidden lg:absolute lg:top-1/2 lg:left-1/2 lg:w-[21rem] lg:-translate-x-1/2 lg:-translate-y-[42%]"
          style={{ "--i": 2 } as CSSProperties}
        >
          <div key={current.term} className="fade-rise">
            <div className="flex items-center gap-3 px-5 pt-5">
              <IconBadge icon={ICONS[current.icon]} hue={current.hue} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold tracking-tight">{current.label}</p>
                <p className="truncate text-xs text-mute">{current.title}</p>
              </div>
              <span className="self-start font-mono text-xs text-mute">
                {pad(active + 1)} / {pad(terms.length)}
              </span>
            </div>

            <div className="grid gap-1 px-5 pt-4 pb-4">
              <p className="text-[clamp(2.25rem,1.95rem+1vw,2.875rem)] leading-none font-semibold tracking-[-0.05em] tabular-nums">
                <CountUp value={current.lead.value} animate={swapped} />
              </p>
              <p className="text-sm text-ink">{current.lead.label}</p>
              {current.lead.detail && <p className="font-mono text-xs text-mute">{current.lead.detail}</p>}
            </div>

            <dl>
              {current.more.map((s) => (
                <div key={s.value} className="flex items-center gap-3 border-t border-line px-5 py-2.5">
                  <StatMark stat={s} hue={current.hue} />
                  <div className="flex min-w-0 flex-col-reverse">
                    <dt className="truncate text-xs text-mute">{s.label}</dt>
                    <dd className="text-sm font-semibold tracking-tight">{s.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="border-t border-line p-4">
              <Link href={current.href} className={`${actionClass("secondary", "sm")} group w-full`}>
                Open {current.term}
                <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
