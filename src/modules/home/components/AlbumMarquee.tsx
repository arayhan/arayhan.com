"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { AlbumPhoto } from "@/domain/portfolio";

const SHAPES = ["aspect-[4/5]", "aspect-[16/10]", "aspect-square", "aspect-[16/10]", "aspect-[4/5]", "aspect-square", "aspect-[16/10]"];
const ROW_OFFSETS = [0, 3];
const BASE_SPEED = 0.035; // px per ms
const MAX_BOOST = 10;

type Row = { el: HTMLDivElement; track: HTMLDivElement; x: number; dir: 1 | -1; paused: boolean };

/**
 * Two rows running in opposite directions. Scrolling the page speeds them up and briefly
 * flips their direction (scrollY sampled once per frame, no scroll listener). Hovering a
 * row pauses it. Reduced motion: static rows that scroll sideways by hand. The second row
 * starts further into the list so the two rows never line up.
 */
export function AlbumMarquee({ photos }: { photos: AlbumPhoto[] }) {
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
      {ROW_OFFSETS.map((offset, n) => (
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
                {photos.map((_, i) => {
                  const photo = photos[(i + offset) % photos.length];
                  return (
                    <figure
                      key={i}
                      className={`relative m-0 h-[clamp(120px,15vw,190px)] flex-none overflow-hidden rounded-xl bg-soft transition-[transform,opacity] duration-300 ease-out-soft group-hover/row:opacity-70 hover:!opacity-100 hover:-translate-y-1.5 hover:-rotate-[1.5deg] ${SHAPES[i % SHAPES.length]}`}
                    >
                      <Image src={photo.src} alt={copy === 1 ? "" : photo.alt} fill sizes="320px" className="object-cover" />
                      <figcaption className="absolute bottom-2 left-2.5 rounded-md bg-canvas/80 px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap backdrop-blur-sm">
                        {photo.event}, {photo.year}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
