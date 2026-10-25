"use client";

import { useEffect, useRef } from "react";

const GAP = 26; // px between dots
const DOT = 1.1; // px dot radius
const PARALLAX = 0.55; // the lattice scrolls at this fraction of the page
const LENS = 160; // px pointer reach
const LIFT = 8; // px a dot is pushed away at the pointer's centre
const BASE_ALPHA = 0.32;

type Rgb = [number, number, number];

function readToken(name: string, fallback: Rgb): Rgb {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : fallback;
}

const rgba = ([r, g, b]: Rgb, a: number) => `rgb(${r} ${g} ${b} / ${a})`;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * A quiet dot lattice behind the hero. A slow wave breathes through it; dots near the
 * pointer lift away and turn accent; scrolling drifts it at parallax depth while it opens
 * up and fades. One viewport-sized canvas (sticky inside the hero), paused offscreen.
 * Reduced motion: one still frame.
 */
export function HeroBackdrop() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = host.current;
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!box || !el || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ink: Rgb = [71, 85, 105];
    let accent: Rgb = [29, 78, 216];
    const readColors = () => {
      ink = readToken("--mute", ink);
      accent = readToken("--accent", accent);
    };
    readColors();

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, on: 0, target: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.target = 1;
      if (pointer.on === 0) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.target = 0;
    };

    const draw = (t: number) => {
      const area = box.getBoundingClientRect();
      const view = el.getBoundingClientRect();
      const progress = clamp01(-area.top / Math.max(1, area.height - h));

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      pointer.on += (pointer.target - pointer.on) * 0.08;
      const px = pointer.x - view.left;
      const py = pointer.y - view.top;

      // The lit region sits by the proof card, then slides down-left as the hero leaves.
      const fx = w * (0.72 - 0.3 * progress);
      const fy = h * (0.35 + 0.4 * progress);
      const reach = Math.max(w, h) * 0.85;

      const gap = GAP * (1 + 0.4 * progress);
      const offX = (((w / 2) % gap) + gap) % gap;
      const offY = ((((area.top * PARALLAX - view.top) % gap) + gap) % gap) - gap;
      const fade = BASE_ALPHA * (1 - 0.75 * progress);

      ctx.clearRect(0, 0, w, h);
      for (let y = offY; y < h + gap; y += gap) {
        for (let x = offX - gap; x < w + gap; x += gap) {
          const dx = x - fx;
          const dy = y - fy;
          const lit = clamp01(1 - Math.sqrt(dx * dx + dy * dy) / reach) ** 1.4;
          const wave = 0.55 + 0.45 * Math.sin(x * 0.011 + y * 0.008 - t * 0.0007);
          let alpha = fade * (0.18 + 0.82 * lit) * wave;
          let dotX = x;
          let dotY = y;
          let r = DOT;
          let near = 0;

          if (pointer.on > 0.01) {
            const ox = x - px;
            const oy = y - py;
            const d = Math.sqrt(ox * ox + oy * oy);
            if (d < LENS) {
              near = (1 - d / LENS) ** 2 * pointer.on;
              const push = (LIFT * near) / Math.max(d, 1);
              dotX += ox * push;
              dotY += oy * push;
              r = DOT * (1 + 0.9 * near);
              alpha = Math.min(1, alpha + 0.65 * near);
            }
          }

          if (alpha < 0.01) continue;
          ctx.fillStyle = rgba(near > 0.05 ? accent : ink, alpha);
          ctx.fillRect(dotX - r, dotY - r, r * 2, r * 2);
        }
      }
    };

    let raf = 0;
    let visible = false;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (still) draw(0);
      else if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    resize();
    const sizer = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    sizer.observe(el);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    seen.observe(box);
    const theme = new MutationObserver(() => {
      readColors();
      if (still) draw(0);
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readColors();
      if (still) draw(0);
    };
    scheme.addEventListener("change", onScheme);
    document.addEventListener("visibilitychange", sync);
    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      sizer.disconnect();
      seen.disconnect();
      theme.disconnect();
      scheme.removeEventListener("change", onScheme);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-clip">
      <canvas ref={canvas} className="sticky top-0 block h-svh w-full" />
    </div>
  );
}
