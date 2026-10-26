"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MedalIcon, MicrophoneStageIcon, RocketLaunchIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FocusEvent, type ReactNode } from "react";
import type { Profile, ShowcaseIcon, ShowcaseStat } from "@/domain/portfolio";
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
const GLOW_SIZE = 560;

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

/**
 * dwinawan-style sentence: hovering, focusing or tapping a /term moves the glow behind it
 * and swaps the proof card, whose big number counts up. Left alone, the card walks the
 * terms; it holds still while the pointer or focus is inside.
 */
export function HeroShowcase({ intro, terms, portrait, badge, children }: Props) {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const termRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  const placeGlow = useCallback(() => {
    const box = root.current?.getBoundingClientRect();
    const term = termRefs.current[active]?.getBoundingClientRect();
    if (!box || !term || !glow.current) return;
    const x = term.left - box.left + term.width / 2 - GLOW_SIZE / 2;
    const y = term.top - box.top + term.height / 2 - GLOW_SIZE / 2;
    glow.current.style.transform = `translate(${x}px, ${y}px)`;
  }, [active]);

  useLayoutEffect(() => {
    placeGlow();
    const observer = new ResizeObserver(placeGlow);
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, [placeGlow]);

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
      className="relative mx-auto grid w-full max-w-page gap-10 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-center lg:gap-16 lg:px-14"
    >
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 size-[560px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] transition-transform duration-1000 ease-out-soft"
      />

      <div className="relative grid min-w-0 grid-cols-[minmax(0,1fr)] justify-items-start gap-7">
        {badge}
        <h1 id="hero-title" className="fade-rise text-hero font-medium tracking-[-0.035em] text-pretty" style={{ "--i": 1 } as CSSProperties}>
          {intro.lead} {intro.invite}{" "}
          {terms.map((t, i) => (
            <Fragment key={t.term}>
              {i > 0 && (i === terms.length - 1 ? " and " : ", ")}
              <button
                ref={(node) => {
                  termRefs.current[i] = node;
                }}
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
        </h1>
        {children}
      </div>

      <div className="relative grid min-w-0">
        {portrait && (
          // The cut-out rises behind the card, which overlaps its lower part; the bottom fades into the page.
          <div className="portrait-fade fade-rise relative mx-auto -mb-28 w-[min(80%,22rem)] lg:-mb-44 lg:w-auto" style={{ "--i": 1 } as CSSProperties}>
            <Image src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} priority sizes="(min-width: 1024px) 330px, min(80vw, 352px)" className="h-auto w-full lg:h-[min(52svh,34rem)] lg:w-auto" />
          </div>
        )}
        <article
          id="hero-proof"
          aria-live="polite"
          className="fade-rise relative z-10 min-w-0 overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-[0_24px_60px_-32px_rgb(15_23_42/0.35)] backdrop-blur-md"
          style={{ "--i": 2 } as CSSProperties}
        >
          <div key={current.term} className="fade-rise grid gap-7 p-6 sm:p-7">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-accent">{current.term}</span>
              <span className="text-mute">
                {pad(active + 1)} / {pad(terms.length)}
              </span>
            </div>

            <div className="grid gap-2">
              <p className="text-[clamp(3.25rem,2.4rem+2.6vw,4.75rem)] leading-[0.95] font-semibold tracking-[-0.055em] tabular-nums">
                <CountUp value={current.lead.value} animate={swapped} />
              </p>
              <p className="text-[15px] text-ink">{current.lead.label}</p>
              {current.lead.detail && <p className="font-mono text-xs text-mute">{current.lead.detail}</p>}
            </div>

            <dl className="grid auto-cols-fr grid-flow-col border-t border-line">
              {current.more.map((s, i) => (
                <div key={s.value} className={`flex min-w-0 flex-col-reverse justify-end gap-1 pt-4 ${i > 0 ? "border-l border-line pl-4" : ""} ${i < current.more.length - 1 ? "pr-4" : ""}`}>
                  <dt className="text-[13px] leading-snug text-mute">{s.label}</dt>
                  <dd className="grid justify-items-start gap-2.5 text-lg font-semibold tracking-tight">
                    <StatMark stat={s} />
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
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
