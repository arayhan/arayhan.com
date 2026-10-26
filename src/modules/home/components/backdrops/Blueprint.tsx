"use client";

import { useRef } from "react";
import { boxIn, useFrameLoop, usePointer, type Box } from "./loop";

const SNAP_PX = 6;
const RULER = 20;
const H_LABELS = Array.from({ length: 33 }, (_, i) => i * 80);
const V_LABELS = Array.from({ length: 21 }, (_, i) => i * 80);

const place = (el: HTMLElement | null, x: number, y: number, w?: number, h?: number) => {
  if (!el) return;
  el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  if (w !== undefined) el.style.width = `${Math.max(0, Math.round(w))}px`;
  if (h !== undefined) el.style.height = `${Math.max(0, Math.round(h))}px`;
};

const show = (el: HTMLElement | null, on: boolean) => {
  if (el) el.style.opacity = on ? "1" : "0";
};

/**
 * Variant 2, "Blueprint": the hero as if it were being laid out in a design tool. Rulers on
 * the top and left edges track the cursor; the proof card wears a selection box with its live
 * size; dimension lines measure the real gaps; a crosshair reads out x, y; magenta guides
 * flash when the cursor lines up with a card edge.
 */
export function Blueprint() {
  const root = useRef<HTMLDivElement>(null);
  const pointer = usePointer();

  useFrameLoop(root, () => {
    const el = root.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    const box = el.getBoundingClientRect();
    // Parts are tagged data-bp (moving boxes) and data-bp-text (labels written each frame).
    const e = (key: string) => el.querySelector<HTMLElement>(`[data-bp="${key}"]`);
    const write = (key: string, value: string) => {
      const node = el.querySelector<HTMLElement>(`[data-bp-text="${key}"]`);
      if (node && node.textContent !== value) node.textContent = value;
    };

    const card = boxIn(section.querySelector("#hero-proof"), box);
    const column = boxIn(section.querySelector("#hero-title")?.parentElement ?? null, box);

    if (card) {
      place(e("select"), card.x - 4, card.y - 4, card.w + 8, card.h + 8);
      write("size", `${Math.round(card.w)} × ${Math.round(card.h)}`);
    }
    show(e("select"), !!card);

    if (card && column) {
      const gap = card.x - (column.x + column.w);
      place(e("dimX"), column.x + column.w, card.cy, gap);
      write("dimX", `${Math.round(gap)}`);
      const below = box.height - (card.y + card.h);
      place(e("dimY"), card.x + card.w + 18, card.y + card.h, undefined, below);
      write("dimY", `${Math.round(below)}`);
    }
    show(e("dimX"), !!card && !!column);
    show(e("dimY"), !!card && !!column);

    const p = pointer.current;
    const x = p.x - box.left;
    const y = p.y - box.top;
    const inside = p.active && x >= 0 && y >= 0 && x <= box.width && y <= box.height;
    place(e("markX"), x, 0);
    place(e("markY"), 0, y);
    place(e("crossX"), 0, y);
    place(e("crossY"), x, 0);
    place(e("readout"), x + 14, y + 14);
    write("readout", `x ${Math.round(x)}  y ${Math.round(y)}`);
    for (const key of ["markX", "markY", "crossX", "crossY", "readout"]) show(e(key), inside);

    // Snap guides: the nearest card edge within SNAP_PX on each axis.
    const boxes: Box[] = [card, column, ...Array.from(section.querySelectorAll("[data-float]"), (f) => boxIn(f, box))].filter((b): b is Box => !!b);
    let gx: number | null = null;
    let gy: number | null = null;
    if (inside) {
      for (const b of boxes) {
        for (const ex of [b.x, b.x + b.w]) if (Math.abs(ex - x) <= SNAP_PX && (gx === null || Math.abs(ex - x) < Math.abs(gx - x))) gx = ex;
        for (const ey of [b.y, b.y + b.h]) if (Math.abs(ey - y) <= SNAP_PX && (gy === null || Math.abs(ey - y) < Math.abs(gy - y))) gy = ey;
      }
    }
    if (gx !== null) place(e("guideX"), gx, 0);
    if (gy !== null) place(e("guideY"), 0, gy);
    show(e("guideX"), gx !== null);
    show(e("guideY"), gy !== null);
  });

  return (
    <div ref={root} className="absolute inset-0 font-mono">
      <div className="bd-blueprint-grid absolute inset-0" />

      {/* Rulers */}
      <div className="bd-ruler-x absolute inset-x-0 top-0 border-b border-line bg-canvas/85" style={{ height: RULER }}>
        {H_LABELS.map((n) => (
          <span key={n} className="absolute top-0.5 text-[9px] leading-none text-mute" style={{ left: n + 3 }}>
            {n}
          </span>
        ))}
        <span data-bp="markX" className="absolute top-0 left-0 h-full w-px bg-accent opacity-0" />
      </div>
      <div className="bd-ruler-y absolute inset-y-0 left-0 border-r border-line bg-canvas/85" style={{ width: RULER }}>
        {V_LABELS.map((n) => (
          <span key={n} className="absolute left-0.5 origin-top-left -rotate-90 text-[9px] leading-none text-mute" style={{ top: n + 22 }}>
            {n}
          </span>
        ))}
        <span data-bp="markY" className="absolute top-0 left-0 h-px w-full bg-accent opacity-0" />
      </div>

      <div className="hidden lg:block">
        {/* Selection box with handles and a live size tag */}
        <div data-bp="select" className="absolute top-0 left-0 border border-accent opacity-0">
          {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-right-1 -bottom-1"].map((pos) => (
            <i key={pos} className={`absolute size-2 border border-accent bg-surface ${pos}`} />
          ))}
          <span data-bp-text="size" className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-[4px] bg-accent px-1.5 py-0.5 text-[10px] whitespace-nowrap text-on-accent" />
        </div>

        {/* Dimension lines: the real gap to the text column and the space under the card */}
        <div data-bp="dimX" className="absolute top-0 left-0 h-px opacity-0">
          <div className="bd-draw-x relative h-px w-full bg-guide">
            <i className="absolute -top-1 left-0 h-2.5 w-px bg-guide" />
            <i className="absolute -top-1 right-0 h-2.5 w-px bg-guide" />
            <span data-bp-text="dimX" className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-[4px] bg-guide px-1 text-[10px] text-white" />
          </div>
        </div>
        <div data-bp="dimY" className="absolute top-0 left-0 w-px opacity-0">
          <div className="bd-draw-y relative h-full w-px bg-guide">
            <i className="absolute top-0 -left-1 h-px w-2.5 bg-guide" />
            <i className="absolute bottom-0 -left-1 h-px w-2.5 bg-guide" />
            <span data-bp-text="dimY" className="absolute top-1/2 left-2 -translate-y-1/2 rounded-[4px] bg-guide px-1 text-[10px] text-white" />
          </div>
        </div>

        {/* Crosshair, readout and snap guides */}
        <span data-bp="crossX" className="absolute top-0 left-0 h-px w-full bg-accent/25 opacity-0" />
        <span data-bp="crossY" className="absolute top-0 left-0 h-full w-px bg-accent/25 opacity-0" />
        <span data-bp="guideX" className="absolute top-0 left-0 h-full w-px bg-guide opacity-0" />
        <span data-bp="guideY" className="absolute top-0 left-0 h-px w-full bg-guide opacity-0" />
        <span
          data-bp="readout"
          data-bp-text="readout"
          className="absolute top-0 left-0 rounded-[4px] border border-line bg-surface px-1.5 py-0.5 text-[10px] whitespace-pre text-mute opacity-0 shadow-card" />
      </div>
    </div>
  );
}
