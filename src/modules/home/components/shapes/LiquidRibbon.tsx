"use client";

import { useId, useRef } from "react";
import { boxIn, prefersReducedMotion, useFrameLoop, usePointer } from "../backdrops/loop";
import { hueVar, lipVar, type ShapeProps } from "./common";

const POINTS = 40;
const TILT = (-16 * Math.PI) / 180;
const PULL_R = 140;
const PULL_PX = 34;

// Closed Catmull-Rom spline through the points, as cubic Beziers.
function smoothLoop(pts: [number, number][]) {
  const n = pts.length;
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = pts[(i - 1 + n) % n];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    const [x3, y3] = pts[(i + 2) % n];
    d += `C${(x1 + (x2 - x0) / 6).toFixed(1)} ${(y1 + (y2 - y0) / 6).toFixed(1)} ${(x2 - (x3 - x1) / 6).toFixed(1)} ${(y2 - (y3 - y1) / 6).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return `${d}Z`;
}

/**
 * Shape 4, "Ribbon": one thick glossy ribbon loops behind the proof card in a figure eight
 * that never stops flowing, made of slow sine waves. Its gradient leads with the active
 * term's hue, it stands on a darker lip like the buttons, and the pointer pulls the nearby
 * part of the ribbon toward it.
 */
export function LiquidRibbon({ index, hues }: ShapeProps) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const pointer = usePointer();
  const id = useId().replace(/:/g, "");
  const order = hues.map((_, i) => hues[(index + i) % hues.length]);

  useFrameLoop(root, (t) => {
    const el = root.current;
    const s = svg.current;
    const column = el?.parentElement?.parentElement;
    if (!el || !s || !column) return;
    const box = el.getBoundingClientRect();
    const card = boxIn(column.querySelector("#hero-proof"), box);
    if (!card) return;
    const time = prefersReducedMotion() ? 0 : t;

    const R = box.width * 0.6; // wider would cross the headline column
    const cos = Math.cos(TILT);
    const sin = Math.sin(TILT);
    const p = pointer.current;
    const px = p.x - box.left;
    const py = p.y - box.top;
    const pts: [number, number][] = [];
    for (let i = 0; i < POINTS; i++) {
      const a = (i / POINTS) * Math.PI * 2 + time * 0.00012;
      // A figure eight, tilted, with two slow waves running through it.
      const lx = R * Math.sin(a) + 12 * Math.cos(2 * a + time * 0.0009);
      const ly = R * 0.62 * Math.sin(2 * a) + 18 * Math.sin(3 * a + time * 0.0011);
      let x = card.cx + lx * cos - ly * sin;
      let y = card.cy + lx * sin + ly * cos;
      if (p.active) {
        const d = Math.hypot(px - x, py - y);
        if (d < PULL_R) {
          // Never past the pointer itself.
          const k = Math.min(1, ((1 - d / PULL_R) ** 2 * PULL_PX) / Math.max(d, 1));
          x += (px - x) * k;
          y += (py - y) * k;
        }
      }
      pts.push([x, y]);
    }
    const d = smoothLoop(pts);
    s.querySelectorAll("[data-ribbon]").forEach((path) => path.setAttribute("d", d));
    const grad = s.querySelector("linearGradient");
    grad?.setAttribute("x1", (card.cx - R).toFixed(0));
    grad?.setAttribute("x2", (card.cx + R).toFixed(0));
  });

  return (
    <div ref={root} className="absolute inset-0">
      <svg ref={svg} className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id={`${id}-ribbon`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
            {order.map((h, i) => (
              <stop key={i} offset={`${(i / Math.max(order.length - 1, 1)) * 100}%`} style={{ stopColor: hueVar(h), transition: "stop-color 700ms ease" }} />
            ))}
          </linearGradient>
        </defs>
        <path data-ribbon="" fill="none" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 7)" style={{ stroke: lipVar(order[0] ?? "blue"), transition: "stroke 700ms ease" }} />
        <path data-ribbon="" fill="none" stroke={`url(#${id}-ribbon)`} strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
        <path data-ribbon="" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="6" strokeLinecap="round" transform="translate(0 -11)" />
      </svg>
    </div>
  );
}
