"use client";

import { useEffect, useRef } from "react";

type Blob = {
  /** Resting centre, as a fraction of the stage. */
  x: number;
  y: number;
  /** How far it leans toward the pointer (negative leans away, for depth). */
  follow: number;
  /** Drift period in ms; each blob gets its own so they never sync up. */
  period: number;
  /** Rise across the hero's scroll, as a fraction of the stage height. */
  rise: number;
  /** Opacity at the top of the hero and once it has scrolled away. */
  from: number;
  to: number;
};

const BLOBS: Blob[] = [
  { x: 0.74, y: 0.32, follow: 0.16, period: 23000, rise: 0.35, from: 1, to: 0.35 },
  { x: 0.18, y: 0.62, follow: -0.08, period: 31000, rise: 0.15, from: 0.75, to: 0.5 },
  { x: 0.52, y: 0.95, follow: 0.06, period: 37000, rise: 0.55, from: 0.35, to: 1 },
];
const DRIFT = 0.05; // drift radius, as a fraction of the stage's longer side
const EASE = 0.06; // pointer smoothing per frame

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Soft aurora behind the hero: three blurred light shapes in the accent family. They drift
 * on slow, unsynced loops, lean toward the pointer at different depths, and rise and trade
 * places as the hero scrolls away, so the colour shifts from blue to sky. Transform and
 * opacity only, on a viewport-sized stage that sticks inside the hero; paused offscreen.
 * Reduced motion: the resting composition, still.
 */
export function HeroBackdrop() {
  const host = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const box = host.current;
    if (!box || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };

    const frame = (t: number) => {
      const area = box.getBoundingClientRect();
      const w = window.innerWidth;
      const h = window.innerHeight;
      const progress = clamp01(-area.top / Math.max(1, area.height - h));
      pointer.x += (pointer.tx - pointer.x) * EASE;
      pointer.y += (pointer.ty - pointer.y) * EASE;
      const drift = Math.max(w, h) * DRIFT;

      BLOBS.forEach((b, i) => {
        const el = blobRefs.current[i];
        if (!el) return;
        const phase = (t / b.period) * Math.PI * 2;
        const x = Math.cos(phase) * drift + pointer.x * w * b.follow;
        const y = Math.sin(phase * 0.8) * drift + pointer.y * h * b.follow - b.rise * h * progress;
        const scale = 1 + 0.06 * Math.sin(phase * 0.6);
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = (b.from + (b.to - b.from) * progress).toFixed(3);
      });
    };

    let raf = 0;
    let visible = false;
    const loop = (t: number) => {
      frame(t);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    seen.observe(box);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      seen.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={host} aria-hidden="true" className="aurora-fade pointer-events-none absolute inset-0 -z-10 overflow-clip">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {BLOBS.map((b, i) => (
          <div
            key={i}
            ref={(node) => {
              blobRefs.current[i] = node;
            }}
            className={`aurora-blob aurora-blob-${i + 1}`}
            style={{ left: `${b.x * 100}%`, top: `${b.y * 100}%`, opacity: b.from }}
          />
        ))}
        <div className="aurora-grain absolute inset-0" />
      </div>
    </div>
  );
}
