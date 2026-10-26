"use client";

import { useRef, type CSSProperties } from "react";
import type { Hue } from "@/domain/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion, useFrameLoop, usePointer } from "../backdrops/loop";
import { hueVar, type ShapeProps } from "./common";

type Kind = "circle" | "half" | "quarter" | "square" | "triangle" | "bar";
type Spot = { x: number; y: number; r: number; s: number };

// Six flat primitives. `depth` is how far each leans with the pointer (nearer moves more).
const PIECES: { kind: Kind; hue: Hue; className: string; depth: number; spin?: number }[] = [
  { kind: "circle", hue: "blue", className: "size-32", depth: 22, spin: 48 },
  { kind: "half", hue: "amber", className: "h-18 w-36", depth: 14 },
  { kind: "quarter", hue: "violet", className: "size-28", depth: 18 },
  { kind: "square", hue: "green", className: "size-16", depth: 26 },
  { kind: "triangle", hue: "violet", className: "size-24", depth: 10, spin: -70 },
  { kind: "bar", hue: "amber", className: "h-5 w-44", depth: 16 },
];

// One composition per /term (works, talks, products): centre in % of the column, rotation, scale.
// The card covers roughly x 12-88%, y 28-74%, so each piece peeks from behind an edge.
const LAYOUTS: Spot[][] = [
  [
    { x: 78, y: 16, r: 0, s: 1 },
    { x: 12, y: 22, r: -90, s: 1 },
    { x: 90, y: 74, r: 0, s: 1 },
    { x: 8, y: 80, r: 14, s: 1 },
    { x: 44, y: 10, r: 8, s: 1 },
    { x: 46, y: 88, r: -6, s: 1 },
  ],
  [
    { x: 14, y: 76, r: 0, s: 1.1 },
    { x: 84, y: 20, r: 180, s: 1 },
    { x: 18, y: 18, r: 90, s: 0.9 },
    { x: 92, y: 60, r: -18, s: 1 },
    { x: 70, y: 88, r: 30, s: 1.1 },
    { x: 50, y: 8, r: 4, s: 1 },
  ],
  [
    { x: 86, y: 82, r: 0, s: 0.95 },
    { x: 50, y: 87, r: 0, s: 1.1 },
    { x: 86, y: 14, r: 180, s: 1 },
    { x: 14, y: 14, r: 45, s: 1.1 },
    { x: 8, y: 56, r: -20, s: 0.9 },
    { x: 30, y: 12, r: 90, s: 0.9 },
  ],
];

function Piece({ kind, hue }: { kind: Kind; hue: Hue }) {
  const fill = { background: hueVar(hue) } as CSSProperties;
  switch (kind) {
    case "circle":
      // A small off-centre dot so the slow spin reads.
      return (
        <span className="relative block size-full rounded-full" style={fill}>
          <i className="absolute top-[18%] left-[22%] size-[18%] rounded-full bg-white/85" />
        </span>
      );
    case "half":
      return <span className="block size-full rounded-t-full" style={fill} />;
    case "quarter":
      return <span className="block size-full rounded-tl-full" style={fill} />;
    case "square":
      return <span className="block size-full rounded-[10px]" style={fill} />;
    case "bar":
      return <span className="block size-full rounded-full" style={fill} />;
    case "triangle":
      return (
        <svg viewBox="0 0 100 100" className="size-full">
          <polygon points="50,6 96,92 4,92" style={{ fill: hueVar(hue) }} />
        </svg>
      );
  }
}

/**
 * Shape 3, "Bauhaus": six flat primitives in the category hues sit behind and around the
 * proof card. Each /term has its own composition; switching terms rearranges them with a
 * staggered, slightly springy settle. The circle and triangle turn very slowly, and every
 * piece leans with the pointer at its own depth.
 */
export function Bauhaus({ index }: ShapeProps) {
  const root = useRef<HTMLDivElement>(null);
  const pointer = usePointer();
  const lean = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      for (const el of gsap.utils.toArray<HTMLElement>("[data-spin]", root.current)) {
        gsap.to(el, { rotation: `+=${360 * Math.sign(Number(el.dataset.spin))}`, duration: Math.abs(Number(el.dataset.spin)), ease: "none", repeat: -1 });
      }
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const layout = LAYOUTS[index % LAYOUTS.length];
      const spots = gsap.utils.toArray<HTMLElement>("[data-spot]", root.current);
      spots.forEach((el, i) => {
        const to = { left: `${layout[i].x}%`, top: `${layout[i].y}%`, rotation: layout[i].r, scale: layout[i].s };
        if (prefersReducedMotion()) gsap.set(el, to);
        else gsap.to(el, { ...to, duration: 1.1, ease: "back.out(1.3)", delay: i * 0.05, overwrite: true });
      });
    },
    { scope: root, dependencies: [index] },
  );

  useFrameLoop(root, () => {
    const p = pointer.current;
    const tx = p.active ? p.x / window.innerWidth - 0.5 : 0;
    const ty = p.active ? p.y / window.innerHeight - 0.5 : 0;
    lean.current.x += (tx - lean.current.x) * 0.06;
    lean.current.y += (ty - lean.current.y) * 0.06;
    root.current?.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
      const d = Number(el.dataset.depth);
      el.style.transform = `translate3d(${(lean.current.x * d).toFixed(2)}px, ${(lean.current.y * d).toFixed(2)}px, 0)`;
    });
  });

  return (
    <div ref={root} className="absolute inset-0">
      {PIECES.map((piece) => (
        // Outer: pointer lean. Middle: the composition slot (left/top, rotation, scale), centred on its point. Inner: idle spin.
        <div key={piece.kind} data-depth={piece.depth} className="absolute inset-0">
          <div data-spot="" className={`absolute -translate-x-1/2 -translate-y-1/2 ${piece.className}`} style={{ left: "50%", top: "50%" }}>
            <div data-spin={piece.spin} className="size-full">
              <Piece kind={piece.kind} hue={piece.hue} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
