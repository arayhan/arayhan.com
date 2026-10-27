"use client";

import { useRef } from "react";
import { cssVar, prefersReducedMotion, useFrameLoop, usePointer } from "./loop";

const PITCH = 24;
const CELL = 17;
const RADIUS = 5;
const LIFE_MS = 3200;
const RIPPLE_R = 170;
// Kept soft: the field is texture under the copy, never louder than it.
const BASE_ALPHA = 0.85;
const RIPPLE_ALPHA = 0.3;
// Commit intensity in discrete steps, like a contribution graph: three levels.
const LEVELS = [0.22, 0.4, 0.62];
// The five same-brightness hues; blue twice, so the field leans toward the brand.
const HUE_VARS = ["--hue-blue", "--hue-blue", "--hue-violet", "--hue-teal", "--hue-amber", "--hue-rose"];
const STEPS = 4;

type Commit = { i: number; level: number; hue: number; start: number };

// Thins the field out behind the copy (left on desktop, top on phones) so the text stays the
// loudest thing. Stepped, not smooth, so the field reads as flat bands rather than a gradient;
// baked into each cell's alpha because a CSS mask would repaint every frame.
function fade(x: number, y: number, w: number, h: number) {
  const f = w >= 1024 ? 0.25 + 0.75 * (x / (w * 0.55)) : y / (h * 0.35);
  return Math.max(0, Math.min(1, Math.ceil(f * STEPS) / STEPS));
}

function cell(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, RADIUS);
  ctx.fill();
}

/**
 * "Commit field": the hero sits on a soft field of rounded squares, a
 * contribution graph seen from far away. Cells "commit" at random, popping into one of the
 * hues at one of three levels and fading back, and the cursor sends a soft ripple through the cells around it. Texture only:
 * no labels, no data. One canvas, the static grid cached offscreen, only live cells redrawn.
 */
export function CommitField() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = usePointer();
  const st = useRef({
    key: "",
    dpr: 1,
    cols: 0,
    rows: 0,
    base: null as HTMLCanvasElement | null,
    accent: "",
    hues: [] as string[],
    commits: [] as Commit[],
    next: 0,
  });

  useFrameLoop(root, (t) => {
    const el = root.current;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!el || !c || !ctx) return;
    const s = st.current;
    const rect = el.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const key = `${Math.round(rect.width)}x${Math.round(rect.height)}@${dpr}`;

    if (s.key !== key) {
      s.key = key;
      s.dpr = dpr;
      s.cols = Math.ceil(rect.width / PITCH);
      s.rows = Math.ceil(rect.height / PITCH);
      c.width = Math.round(rect.width * dpr);
      c.height = Math.round(rect.height * dpr);
      s.accent = cssVar("--accent");
      s.hues = HUE_VARS.map(cssVar);
      const base = document.createElement("canvas");
      base.width = c.width;
      base.height = c.height;
      const b = base.getContext("2d");
      if (b) {
        b.setTransform(dpr, 0, 0, dpr, 0, 0);
        b.clearRect(0, 0, rect.width, rect.height);
        b.fillStyle = cssVar("--grid");
        for (let r = 0; r < s.rows; r++) {
          for (let q = 0; q < s.cols; q++) {
            b.globalAlpha = BASE_ALPHA * fade(q * PITCH, r * PITCH, rect.width, rect.height);
            cell(b, q * PITCH, r * PITCH, CELL);
          }
        }
      }
      s.base = base;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    if (s.base) ctx.drawImage(s.base, 0, 0);
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    const total = s.cols * s.rows;

    if (prefersReducedMotion()) {
      // A still, evenly scattered set of commits.
      for (let i = 0; i < total; i += 37) {
        const x = (i % s.cols) * PITCH;
        const y = Math.floor(i / s.cols) * PITCH;
        ctx.fillStyle = s.hues[i % s.hues.length];
        ctx.globalAlpha = LEVELS[i % LEVELS.length] * fade(x, y, rect.width, rect.height);
        cell(ctx, x, y, CELL);
      }
      ctx.globalAlpha = 1;
      return;
    }

    if (t > s.next && total) {
      s.commits.push({ i: Math.floor(Math.random() * total), level: Math.floor(Math.random() * LEVELS.length), hue: Math.floor(Math.random() * HUE_VARS.length), start: t });
      s.next = t + 260 + Math.random() * 360;
    }
    s.commits = s.commits.filter((m) => t - m.start < LIFE_MS);
    for (const m of s.commits) {
      const q = (t - m.start) / LIFE_MS;
      const pop = q < 0.12 ? q / 0.12 : 1;
      const size = CELL * (1 + 0.2 * (1 - pop));
      const off = (CELL - size) / 2;
      const x = (m.i % s.cols) * PITCH;
      const y = Math.floor(m.i / s.cols) * PITCH;
      ctx.globalAlpha = (q < 0.12 ? pop : 1 - (q - 0.12) / 0.88) * LEVELS[m.level] * fade(x, y, rect.width, rect.height);
      ctx.fillStyle = s.hues[m.hue];
      cell(ctx, x + off, y + off, size);
    }

    const p = pointer.current;
    const px = p.x - rect.left;
    const py = p.y - rect.top;
    ctx.fillStyle = s.accent;
    if (p.active && px > -RIPPLE_R && py > -RIPPLE_R && px < rect.width + RIPPLE_R && py < rect.height + RIPPLE_R) {
      const c0 = Math.max(0, Math.floor((px - RIPPLE_R) / PITCH));
      const c1 = Math.min(s.cols - 1, Math.ceil((px + RIPPLE_R) / PITCH));
      const r0 = Math.max(0, Math.floor((py - RIPPLE_R) / PITCH));
      const r1 = Math.min(s.rows - 1, Math.ceil((py + RIPPLE_R) / PITCH));
      for (let r = r0; r <= r1; r++) {
        for (let q = c0; q <= c1; q++) {
          const cx = q * PITCH + CELL / 2;
          const cy = r * PITCH + CELL / 2;
          const d = Math.hypot(cx - px, cy - py);
          if (d > RIPPLE_R) continue;
          const wave = 0.5 + 0.5 * Math.sin(d * 0.07 - t * 0.006);
          ctx.globalAlpha = (1 - d / RIPPLE_R) ** 2 * RIPPLE_ALPHA * (0.35 + 0.65 * wave) * fade(q * PITCH, r * PITCH, rect.width, rect.height);
          cell(ctx, q * PITCH, r * PITCH, CELL);
        }
      }
    }
    ctx.globalAlpha = 1;
  });

  return (
    <div ref={root} className="absolute inset-0">
      <canvas ref={canvas} className="absolute inset-0 size-full" />
    </div>
  );
}
