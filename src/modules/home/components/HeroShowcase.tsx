"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BriefcaseIcon, CubeIcon, MicrophoneStageIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Cover } from "@/components/ui/Cover";
import { HUE_FILL, HUE_TEXT } from "@/components/ui/hue";
import type { Hue, Portrait } from "@/domain/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cx } from "@/utils/cx";
import { useActiveTerm } from "./ActiveTerm";

export type ShowItem = { key: string; name: string; sub: string; cover?: string; hue: Hue; href: string };

/** One /term's showcase: the featured item first, then the bento's items. */
export type Showcase = {
  term: string;
  label: string;
  icon: "work" | "talk" | "product";
  hue: Hue;
  href: string;
  /** Its full count, e.g. "10 talks"; the bento shows at most BENTO of the items. */
  total: number;
  noun: string;
  items: ShowItem[];
};

const BENTO = 5;
const LEAVE_MS = 450;
const ICON = { work: BriefcaseIcon, talk: MicrophoneStageIcon, product: CubeIcon };

const tint = (hue: Hue) => ({ "--tile-hue": `var(--hue-${hue})` }) as CSSProperties;
const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Renders `children(active)` and, for a moment after a change, the previous term's layer on top
 * of it, fading out while the new tiles rise in (.show-out, .show-in). Under reduced motion the
 * swap is instant.
 */
function Swap({ active, className, children }: { active: number; className?: string; children: (i: number) => ReactNode }) {
  const reduced = useReducedMotion();
  const [state, setState] = useState<{ current: number; prev: number | null }>({ current: active, prev: null });
  if (state.current !== active) setState({ current: active, prev: reduced ? null : state.current });

  useEffect(() => {
    if (state.prev === null) return;
    const id = window.setTimeout(() => setState((s) => ({ ...s, prev: null })), LEAVE_MS);
    return () => window.clearTimeout(id);
  }, [state]);

  return (
    <div className={cx("relative", className)}>
      <div key={active} className="size-full">
        {children(active)}
      </div>
      {state.prev !== null && (
        <div key={`leaving-${state.prev}`} aria-hidden="true" inert className="show-out pointer-events-none absolute inset-0">
          {children(state.prev)}
        </div>
      )}
    </div>
  );
}

function PortraitPanel({ showcases, portrait }: { showcases: Showcase[]; portrait: Portrait | null }) {
  const { active } = useActiveTerm();
  return (
    <div className="tile-tint relative overflow-hidden rounded-card border border-line shadow-card" style={tint(showcases[active].hue)}>
      <Swap active={active} className="absolute inset-x-5 top-5 z-10 sm:inset-x-7 sm:top-7">
        {(i) => (
          <p className="show-in grid gap-1">
            <span className={cx("text-[clamp(2rem,1.2rem+2.6vw,3.5rem)] leading-none font-bold tracking-[-0.04em]", HUE_TEXT[showcases[i].hue])}>{showcases[i].label}</span>
            <span className="text-sm font-medium text-mute">
              {showcases[i].total} {showcases[i].noun}
            </span>
          </p>
        )}
      </Swap>
      {portrait && <Image src={portrait.src} alt={portrait.alt} fill priority sizes="(min-width: 1024px) 30vw, 55vw" className="object-contain object-bottom pt-24" />}
    </div>
  );
}

function Featured({ show }: { show: Showcase }) {
  const item = show.items[0];
  const Glyph = ICON[show.icon];
  return (
    <Link href={item.href} className="group show-in relative block size-full overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <Cover seed={item.key} hue={item.hue} icon={Glyph} src={item.cover} sizes="(min-width: 1024px) 22vw, 45vw" className="size-full rounded-none transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]" />
      <span className="absolute inset-x-3 bottom-3 grid gap-0.5 rounded-[16px] bg-surface/95 px-3.5 py-2.5 shadow-control">
        <span className="truncate text-sm font-semibold text-ink">{item.name}</span>
        <span className="truncate text-xs text-mute">{item.sub}</span>
      </span>
    </Link>
  );
}

// One column per item on lg (text tile over image, flipped every other column), one row of the
// two side by side below lg. The tiles rise in along a diagonal (--i = column + row).
function BentoItem({ item, col, icon }: { item: ShowItem; col: number; icon: Showcase["icon"] }) {
  const Glyph = ICON[icon];
  const flip = col % 2 === 1;
  return (
    <Link href={item.href} className="group col-span-2 grid h-40 grid-cols-2 gap-3 sm:gap-4 lg:col-span-1 lg:h-auto lg:grid-cols-1 lg:grid-rows-2">
      <span className={cx("tile-tint show-in flex flex-col justify-between rounded-card p-4 transition-[translate,box-shadow] duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:shadow-card-lift", flip && "lg:order-last")} style={{ ...tint(item.hue), ...step(col + (flip ? 1 : 0)) }}>
        <span className={cx("grid size-8 place-items-center rounded-full text-white", HUE_FILL[item.hue])}>
          <Glyph size={15} weight="fill" aria-hidden="true" />
        </span>
        <span className="grid gap-1">
          <span className="line-clamp-2 leading-tight font-semibold text-ink">{item.name}</span>
          <span className="line-clamp-2 text-xs text-mute">{item.sub}</span>
        </span>
      </span>
      <span className="show-in overflow-hidden rounded-card border border-line bg-surface shadow-card" style={step(col + (flip ? 0 : 1))}>
        <Cover seed={item.key} hue={item.hue} icon={Glyph} src={item.cover} small sizes="(min-width: 1024px) 15vw, 45vw" className="size-full rounded-none transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]" />
      </span>
    </Link>
  );
}

function Bento({ show }: { show: Showcase }) {
  const items = show.items.slice(1, 1 + BENTO);
  return (
    <div className="grid h-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))_minmax(0,0.85fr)]" style={{ "--n": items.length } as CSSProperties}>
      {items.map((item, col) => (
        <BentoItem key={item.key} item={item} col={col} icon={show.icon} />
      ))}
      <Link
        href={show.href}
        className="group show-in col-span-2 flex items-end justify-between gap-4 rounded-card bg-feature p-5 text-on-feature lg:p-4 xl:p-5 shadow-card lg:col-span-1 lg:flex-col lg:items-start"
        style={step(items.length + 1)}
      >
        <span className="grid">
          <span className="text-5xl leading-none font-bold tracking-[-0.04em] tabular-nums">{show.total}</span>
          <span className="text-sm text-feature-mute">{show.noun}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-feature-accent">
          Open {show.term}
          <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}

/**
 * The hero's images, driven by the active /term: the portrait on a panel in the term's hue, the
 * term's featured item beside it, and a bento of its next items under the hero, ending in a tile
 * that opens the full list. `display: contents`, so the two parts sit in the hero's own grid.
 */
export function HeroShowcase({ showcases, portrait }: { showcases: Showcase[]; portrait: Portrait | null }) {
  const { active } = useActiveTerm();
  const show = showcases[active];
  return (
    <div id="hero-showcase" className="contents">
      <p className="sr-only" aria-live="polite">
        Showing {show.total} {show.noun}
      </p>
      <div className="grid h-[24rem] min-w-0 grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-3 sm:h-[30rem] sm:gap-4 lg:h-auto lg:min-h-[34rem]">
        <PortraitPanel showcases={showcases} portrait={portrait} />
        <Swap active={active}>{(i) => <Featured show={showcases[i]} />}</Swap>
      </div>
      <Swap active={active} className="min-w-0 lg:col-span-2 lg:h-[clamp(18rem,25vw,23rem)]">
        {(i) => <Bento show={showcases[i]} />}
      </Swap>
    </div>
  );
}
