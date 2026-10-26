"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion, useFrameLoop, usePointer } from "../backdrops/loop";
import { hueVar, lipVar, type ShapeProps } from "./common";

// One glyph per /term, each drawn as filled shapes in a 200 x 200 box: braces for /works, a
// speech bubble for /talks, an isometric cube (three faces with gaps) for /products.
const GLYPHS = [
  "M78 30C58 30 52 40 52 58L52 82C52 92 46 98 34 100C46 102 52 108 52 118L52 142C52 160 58 170 78 170L84 170L84 156L80 156C70 156 68 151 68 140L68 116C68 106 63 101 56 100C63 99 68 94 68 84L68 60C68 49 70 44 80 44L84 44L84 30Z" +
    "M122 30C142 30 148 40 148 58L148 82C148 92 154 98 166 100C154 102 148 108 148 118L148 142C148 160 142 170 122 170L116 170L116 156L120 156C130 156 132 151 132 140L132 116C132 106 137 101 144 100C137 99 132 94 132 84L132 60C132 49 130 44 120 44L116 44L116 30Z",
  "M44 36L156 36C170 36 180 46 180 60L180 116C180 130 170 140 156 140L102 140L66 170L72 140L44 140C30 140 20 130 20 116L20 60C20 46 30 36 44 36Z",
  "M100 20L172 58L100 96L28 58Z" + "M24 68L94 106L94 182L24 144Z" + "M106 106L176 68L176 144L106 182Z",
];

const LEAN_PX = 14;

/**
 * Shape 1, "Glyph": one big tactile shape behind the card's top-right corner that morphs into
 * the active term's symbol, in that term's hue, standing on a darker lip like the buttons.
 * Idle, it breathes and sways; it leans a little with the pointer. Reduced motion: the
 * active glyph, still.
 */
export function ShapeShifter({ index, hues }: ShapeProps) {
  const root = useRef<HTMLDivElement>(null);
  const lean = useRef<HTMLDivElement>(null);
  const body = useRef<SVGGElement>(null);
  const face = useRef<SVGPathElement>(null);
  const lip = useRef<SVGPathElement>(null);
  const pointer = usePointer();
  const at = useRef({ x: 0, y: 0 });
  const hue = hues[index] ?? "blue";

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(body.current, { scale: 1.03, rotation: 2, svgOrigin: "100 100", duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const d = GLYPHS[index % GLYPHS.length];
      const paths = [face.current, lip.current];
      if (prefersReducedMotion()) {
        paths.forEach((p) => p?.setAttribute("d", d));
        return;
      }
      gsap.to(paths, { morphSVG: d, duration: 0.9, ease: "power3.inOut", overwrite: true });
    },
    { scope: root, dependencies: [index] },
  );

  useFrameLoop(root, () => {
    const p = pointer.current;
    const tx = p.active ? (p.x / window.innerWidth - 0.5) * LEAN_PX : 0;
    const ty = p.active ? (p.y / window.innerHeight - 0.5) * LEAN_PX : 0;
    at.current.x += (tx - at.current.x) * 0.06;
    at.current.y += (ty - at.current.y) * 0.06;
    if (lean.current) lean.current.style.transform = `translate3d(${at.current.x.toFixed(2)}px, ${at.current.y.toFixed(2)}px, 0)`;
  });

  return (
    <div ref={root} className="absolute top-[1%] right-[-12%] aspect-square w-[19rem]">
      <div ref={lean} className="size-full">
        <svg viewBox="0 0 200 200" className="size-full overflow-visible">
          <g ref={body}>
            <path ref={lip} d={GLYPHS[0]} transform="translate(0 7)" style={{ fill: lipVar(hue), transition: "fill 600ms ease" }} />
            <path ref={face} d={GLYPHS[0]} style={{ fill: hueVar(hue), transition: "fill 600ms ease" }} />
          </g>
        </svg>
      </div>
    </div>
  );
}
