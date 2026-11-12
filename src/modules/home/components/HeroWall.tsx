"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/utils/cx";

export type WallCard = {
  key: string;
  kind: "project" | "talk" | "product";
  name: string;
  sub: string;
  cover?: string;
  href: string;
  /** Tech marks (a logo coloured with `color`), or a product's own logo when `color` is unset. */
  marks: { name: string; logo: string; color?: string }[];
};

const COLS = 4;
// A column needs more cards than the plane is tall, or the loop shows a gap; short columns repeat their own.
const MIN = 7;
const RATIOS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[5/4]", "aspect-square"];
const SPEED = [30, 24, 34, 27]; // px per second
const START = [0.15, 0.55, 0.35, 0.7];
// The globe: outer columns turn away, sit further back and lean a little.
const ROT_Y = [-30, -10, 10, 30];
const DEPTH = [-90, -15, -15, -90];
const SKEW = [-5, -1.5, 1.5, 5];
const KIND = { project: { label: "Project", dot: "bg-hue-blue" }, talk: { label: "Talk", dot: "bg-hue-violet" }, product: { label: "Product", dot: "bg-hue-teal" } };

type Col = { track: HTMLDivElement; cards: HTMLElement[]; mids: number[]; half: number; pos: number; slow: number; slowTo: number };

function Card({ card, i, dup }: { card: WallCard; i: number; dup?: boolean }) {
  const kind = KIND[card.kind];
  return (
    <Link href={card.href} aria-hidden={dup || undefined} tabIndex={dup ? -1 : undefined} className="wall-card group pointer-events-auto block">
      <span className={cx("relative block overflow-hidden rounded-card bg-feature text-white shadow-[0_1px_0_rgb(255_255_255/0.5)_inset,0_24px_48px_-28px_rgb(11_27_58/0.55)] transition-shadow duration-400 group-hover:shadow-[0_1px_0_rgb(255_255_255/0.5)_inset,0_40px_70px_-30px_rgb(37_99_235/0.55)]", RATIOS[i % RATIOS.length])}>
        {card.cover ? (
          <Image src={card.cover} alt={dup ? "" : `${card.name} cover`} fill sizes="(min-width: 1280px) 14vw, 45vw" className="object-cover transition-[transform,filter] duration-800 ease-out-soft group-hover:scale-[1.08] group-hover:saturate-110" />
        ) : (
          <span className="photo-slot absolute inset-0 rounded-none border-0">TODO(content)</span>
        )}
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(transparent_30%,rgb(11_27_58/0.6)_65%,rgb(11_27_58/0.92))]" />
        <span className="absolute top-2.5 left-2.5 z-[2] inline-flex h-6 items-center gap-1.5 rounded-full bg-surface/95 pr-2.5 pl-2 text-[10.5px] font-bold tracking-[0.04em] text-ink uppercase">
          <i className={cx("size-[7px] rounded-full", kind.dot)} />
          {kind.label}
        </span>
        <span className="absolute inset-x-0 bottom-0 z-[2] grid gap-2 p-3">
          <b className="line-clamp-2 text-sm leading-[1.2] font-bold tracking-[-0.015em]">{card.name}</b>
          <span className="line-clamp-2 text-[11.5px] leading-[1.3] text-white/80">{card.sub}</span>
          {card.marks.length > 0 && (
            <span className="flex flex-wrap gap-1.5">
              {card.marks.map((m) =>
                m.color ? (
                  <span key={m.name} role="img" aria-label={m.name} title={m.name} className="stack-mark grid size-[34px] place-items-center rounded-full bg-white shadow-[0_2px_8px_-2px_rgb(0_0_0/0.5)]" style={{ "--c": m.color, "--m": `url(${m.logo})` } as React.CSSProperties} />
                ) : (
                  <Image key={m.name} src={m.logo} alt={`${m.name} logo`} title={m.name} width={34} height={34} className="size-[34px] rounded-[9px]" />
                ),
              )}
            </span>
          )}
        </span>
        <span aria-hidden="true" className="absolute right-2.5 bottom-2.5 z-[3] grid size-8 scale-0 place-items-center rounded-full bg-white text-ink transition-transform duration-350 ease-out-soft group-hover:scale-100">
          <ArrowUpRightIcon size={15} />
        </span>
      </span>
    </Link>
  );
}

/**
 * Four columns of cards on a globe-curved plane. Columns alternate direction and loop forever
 * (two copies each, wrapped by the ticker); each card turns away toward the top and bottom and
 * comes forward in the middle, so the wall reads as a drum. Hovering a column slows it to a
 * fifth. Reduced motion: the same wall, still.
 */
export function HeroWall({ cards }: { cards: WallCard[] }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const columns = Array.from({ length: COLS }, (_, c) => {
    const own = cards.filter((_, i) => i % COLS === c);
    const out: WallCard[] = [];
    while (out.length < MIN) out.push(...own);
    return out;
  });

  useGSAP(
    () => {
      const wall = root.current;
      if (!wall) return;
      const cols: Col[] = [...wall.querySelectorAll<HTMLDivElement>(".wall-track")].map((track) => ({
        track,
        cards: [...track.querySelectorAll<HTMLElement>(".wall-card")],
        mids: [],
        half: 0,
        pos: 0,
        slow: 1,
        slowTo: 1,
      }));
      const dirs = cols.map((_, c) => (c % 2 ? -1 : 1));

      const measure = () => {
        cols.forEach((col, c) => {
          col.half = col.track.scrollHeight / 2 + 8; // + half the gap, so the seam matches
          col.mids = col.cards.map((el) => el.offsetTop + el.offsetHeight / 2);
          if (!col.pos) col.pos = -col.half * START[c];
        });
      };
      const render = () => {
        const view = wall.clientHeight;
        const planeTop = (wall.firstElementChild as HTMLElement).offsetTop;
        cols.forEach((col, c) => {
          const y = gsap.utils.wrap(-col.half, 0, col.pos);
          col.track.style.transform = `translate3d(0, ${y}px, 0)`;
          col.cards.forEach((el, k) => {
            const rel = gsap.utils.clamp(-1.5, 1.5, (planeTop + col.mids[k] + y - view / 2) / (view / 2));
            const near = 1 - Math.min(1, Math.abs(rel));
            el.style.transform = `translate3d(0, 0, ${(DEPTH[c] + near * 90).toFixed(1)}px) rotateX(${(-rel * 26).toFixed(2)}deg) rotateY(${ROT_Y[c]}deg) skewY(${SKEW[c]}deg) scale(${(0.86 + near * 0.14).toFixed(3)})`;
          });
        });
      };

      measure();
      render();
      const onResize = () => {
        measure();
        render();
      };
      window.addEventListener("resize", onResize);
      if (reduced) return () => window.removeEventListener("resize", onResize);

      gsap.from(wall, { y: 60, opacity: 0, duration: 1.6, ease: "expo.out", delay: 0.2 });
      const offs = cols.map((col) => {
        const el = col.track.parentElement!;
        const on = () => (col.slowTo = 0.2);
        const off = () => (col.slowTo = 1);
        el.addEventListener("pointerenter", on);
        el.addEventListener("pointerleave", off);
        return () => {
          el.removeEventListener("pointerenter", on);
          el.removeEventListener("pointerleave", off);
        };
      });
      const tick = (_t: number, deltaMs: number) => {
        const dt = Math.min(deltaMs, 50) / 1000;
        cols.forEach((col, c) => {
          col.slow += (col.slowTo - col.slow) * 0.08;
          col.pos += SPEED[c] * dirs[c] * col.slow * dt;
        });
        render();
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        offs.forEach((f) => f());
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} aria-label="Projects, talks and products" className="wall pointer-events-none relative z-[3] h-[60svh] min-h-[400px] md:h-[70svh] md:min-h-[440px] xl:-ml-[14vw] xl:h-[calc(100svh-var(--header-h))] xl:min-h-0">
      <div className="wall-plane absolute inset-x-[-4%] inset-y-[-30%] grid grid-cols-4 gap-2.5 px-2 md:inset-x-[-12%] md:gap-4 xl:-right-[10%] xl:left-[8%]">
        {columns.map((list, c) => (
          <div key={c} className="relative [transform-style:preserve-3d]">
            <div className="wall-track relative grid gap-2.5 will-change-transform [transform-style:preserve-3d] md:gap-4">
              {list.map((card, k) => (
                <Card key={`${card.key}-${k}`} card={card} i={k + c} />
              ))}
              {list.map((card, k) => (
                <Card key={`${card.key}-${k}-dup`} card={card} i={k + c} dup />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
