"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { Profile } from "@/domain/portfolio";

type Props = {
  intro: Profile["intro"];
  terms: Profile["terms"];
  badge: ReactNode;
  children: ReactNode;
};

const ADVANCE_MS = 4000;
const PAUSE_AFTER_INPUT_MS = 9000;
const GLOW_SIZE = 560;

/**
 * dwinawan-style sentence: hovering, focusing or tapping a /term turns it blue, moves the
 * glow behind it and swaps the proof card. Idle, it walks the terms on its own.
 */
export function HeroShowcase({ intro, terms, badge, children }: Props) {
  const [active, setActive] = useState(0);
  const idleUntil = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const termRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // event.timeStamp shares performance.now()'s clock, so the idle check below needs no Date.now() in render scope.
  const pick = (i: number, at: number) => {
    idleUntil.current = at + PAUSE_AFTER_INPUT_MS;
    setActive(i);
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden || performance.now() < idleUntil.current) return;
      setActive((i) => (i + 1) % terms.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [terms.length]);

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

  const current = terms[active];

  return (
    <div ref={root} className="relative mx-auto grid w-full max-w-page gap-9 px-4 sm:px-8 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:px-14">
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 size-[560px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] transition-transform duration-1000 ease-out-soft"
      />

      <div className="relative grid min-w-0 grid-cols-[minmax(0,1fr)] justify-items-start gap-6">
        {badge}
        <h1 id="hero-title" className="fade-rise text-hero font-semibold tracking-[-0.04em] text-pretty" style={{ "--i": 1 } as React.CSSProperties}>
          {intro.lead} <span className="text-mute">{intro.aside}</span> {intro.invite}{" "}
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
                onPointerEnter={(e) => pick(i, e.timeStamp)}
                onFocus={(e) => pick(i, e.timeStamp)}
                onClick={(e) => pick(i, e.timeStamp)}
                className="cursor-pointer text-mute underline decoration-line decoration-2 underline-offset-[0.16em] transition-colors duration-300 hover:text-ink aria-pressed:text-accent aria-pressed:decoration-accent/40"
              >
                {t.term}
              </button>
            </Fragment>
          ))}
          .
        </h1>
        {children}
      </div>

      <div className="relative grid min-w-0 content-start gap-3.5">
        {/* TODO(content): portrait photo. */}
        <div className="photo-slot hidden size-22 justify-self-end rounded-full lg:grid">Portrait</div>
        <article id="hero-proof" aria-live="polite" className="overflow-hidden rounded-2xl border border-line bg-surface">
          <div key={current.term} className="fade-rise">
            {/* TODO(content): real screenshot or photo per term. */}
            <div className="photo-slot aspect-[16/10] border-0 border-b">{current.visual}</div>
            <div className="grid gap-1.5 px-[18px] pt-4 pb-[18px]">
              <span className="font-mono text-xs text-accent">{current.term}</span>
              <p className="text-lg font-semibold tracking-tight">{current.title}</p>
              <p className="text-[15px] text-mute">{current.fact}</p>
              <Link href={current.href} className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent">
                Open {current.term}
                <ArrowRightIcon size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
