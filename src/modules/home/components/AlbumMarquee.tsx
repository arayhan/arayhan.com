"use client";

import { useEffect, useRef } from "react";

const SHAPES = ["aspect-[4/5]", "aspect-[16/10]", "aspect-square", "aspect-[16/10]", "aspect-[4/5]", "aspect-square", "aspect-[16/10]"];
const BASE_SPEED = 0.035; // px per ms
const MAX_BOOST = 10;

type Row = { el: HTMLDivElement; track: HTMLDivElement; x: number; dir: 1 | -1; paused: boolean };

/**
 * Two rows running in opposite directions. Scrolling the page speeds them up and briefly
 * flips their direction (scrollY sampled once per frame, no scroll listener). Hovering a
 * row pauses it. Reduced motion: static rows that scroll sideways by hand.
 */
export function AlbumMarquee({ count = 7 }: { count?: number }) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rows = useRef<Row[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    rows.current = rowRefs.current.flatMap((el, n) => {
      const track = el?.firstElementChild as HTMLDivElement | null;
      return el && track ? [{ el, track, x: 0, dir: n === 0 ? -1 : 1, paused: false } as Row] : [];
    });

    let raf = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let boost = 0;
    let flip = 1;

    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (Math.abs(dy) > 1) {
        boost = Math.min(MAX_BOOST, boost + Math.abs(dy) * 0.08);
        flip = dy > 0 ? 1 : -1;
      }
      boost *= 0.94;
      for (const row of rows.current) {
        if (row.paused) continue;
        const half = row.track.scrollWidth / 2;
        row.x += row.dir * flip * (BASE_SPEED + boost * 0.05) * dt;
        if (row.x <= -half) row.x += half;
        if (row.x > 0) row.x -= half;
        row.track.style.transform = `translate3d(${row.x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const setPaused = (n: number, paused: boolean) => {
    const row = rows.current[n];
    if (row) row.paused = paused;
  };

  return (
    <div aria-label="Album" role="region" className="marquee-mask relative grid gap-3.5">
      {[0, 5].map((offset, n) => (
        <div
          key={offset}
          ref={(node) => {
            rowRefs.current[n] = node;
          }}
          onPointerEnter={() => setPaused(n, true)}
          onPointerLeave={() => setPaused(n, false)}
          className="group/row overflow-x-auto py-2 [scrollbar-width:none] motion-safe:overflow-hidden"
        >
          <div className="flex w-max gap-3.5 will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-3.5" aria-hidden={copy === 1 || undefined}>
                {SHAPES.slice(0, count).map((shape, i) => (
                  // TODO(content): album photos with event and year.
                  <figure
                    key={i}
                    className={`photo-slot relative m-0 h-[clamp(120px,15vw,190px)] flex-none rounded-xl transition-[transform,opacity] duration-300 ease-out-soft group-hover/row:opacity-70 hover:!opacity-100 hover:-translate-y-1.5 hover:-rotate-[1.5deg] ${shape}`}
                  >
                    Photo {((i + offset) % 12) + 1}
                    <figcaption className="absolute bottom-2 left-2.5 text-[11px] whitespace-nowrap">[Event, year]</figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
