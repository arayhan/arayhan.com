"use client";

import { useId, useRef } from "react";
import { boxIn, prefersReducedMotion, useFrameLoop, usePointer } from "../motion/loop";
import { hueVar, lipVar, type ShapeProps } from "./common";

// One ring per /term: tilt, size past the card's half-width, flatness, sphere radius, speed.
const RINGS = [
  { tilt: -16, reach: 0.66, flat: 0.3, r: 9, speed: 0.00042, phase: 0.4 },
  { tilt: 14, reach: 0.8, flat: 0.26, r: 7, speed: -0.00031, phase: 2.2 },
  { tilt: 68, reach: 0.74, flat: 0.22, r: 6, speed: 0.00052, phase: 4.1 },
];
const TILT_DEG = 7;

/**
 * Shape 2, "Orbit": three tilted rings around the proof card, each carrying a glossy sphere
 * in its term's hue. A sphere passes behind the card on the far half of its ring and in
 * front on the near half (a second layer above the card holds the near spheres, so the
 * depth is real; the rings stay behind so no line crosses the card's text). The active
 * term's ring lights in its hue; the system tilts toward the pointer.
 */
export function OrbitSystem({ index, hues }: ShapeProps) {
  const root = useRef<HTMLDivElement>(null);
  const back = useRef<SVGSVGElement>(null);
  const front = useRef<SVGSVGElement>(null);
  const pointer = usePointer();
  const tilt = useRef({ x: 0, y: 0 });
  const id = useId().replace(/:/g, "");

  useFrameLoop(root, (t) => {
    const el = root.current;
    const column = el?.parentElement?.parentElement;
    const b = back.current;
    const f = front.current;
    if (!el || !column || !b || !f) return;
    const box = el.getBoundingClientRect();
    const card = boxIn(column.querySelector("#hero-proof"), box);
    if (!card) return;
    const time = prefersReducedMotion() ? 0 : t;

    RINGS.forEach((ring, i) => {
      const rx = card.w * ring.reach;
      const ry = rx * ring.flat;
      const a = (ring.tilt * Math.PI) / 180;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const at = (x: number, y: number) => [card.cx + x * cos - y * sin, card.cy + x * sin + y * cos];

      const ellipse = b.querySelector<SVGEllipseElement>(`[data-ring="${i}"]`);
      ellipse?.setAttribute("cx", card.cx.toFixed(1));
      ellipse?.setAttribute("cy", card.cy.toFixed(1));
      ellipse?.setAttribute("rx", rx.toFixed(1));
      ellipse?.setAttribute("ry", ry.toFixed(1));
      ellipse?.setAttribute("transform", `rotate(${ring.tilt} ${card.cx.toFixed(1)} ${card.cy.toFixed(1)})`);

      const theta = ring.phase + time * ring.speed;
      const [sx, sy] = at(rx * Math.cos(theta), ry * Math.sin(theta));
      const near = Math.sin(theta) > 0;
      for (const [layer, show] of [
        [b, !near],
        [f, near],
      ] as const) {
        const orb = layer.querySelector<SVGCircleElement>(`[data-orb="${i}"]`);
        orb?.setAttribute("cx", sx.toFixed(1));
        orb?.setAttribute("cy", sy.toFixed(1));
        if (orb) orb.style.opacity = show ? "1" : "0";
      }
    });

    const p = pointer.current;
    const tx = p.active ? (p.x / window.innerWidth - 0.5) * TILT_DEG : 0;
    const ty = p.active ? (p.y / window.innerHeight - 0.5) * TILT_DEG : 0;
    tilt.current.x += (tx - tilt.current.x) * 0.05;
    tilt.current.y += (ty - tilt.current.y) * 0.05;
    const transform = `perspective(900px) rotateX(${(-tilt.current.y).toFixed(2)}deg) rotateY(${tilt.current.x.toFixed(2)}deg)`;
    b.style.transform = transform;
    f.style.transform = transform;
  });

  const ringStroke = (i: number) => ({
    stroke: i === index ? hueVar(hues[i] ?? "blue") : "var(--mute)",
    strokeOpacity: i === index ? 1 : 0.35,
    strokeWidth: i === index ? 2 : 1.25,
    transition: "stroke 500ms ease, stroke-opacity 500ms ease, stroke-width 500ms ease",
  });

  return (
    <div ref={root} className="absolute inset-0">
      <svg ref={back} className="absolute inset-0 size-full overflow-visible">
        <defs>
          {hues.map((h, i) => (
            <radialGradient key={i} id={`${id}-orb-${i}`} cx="35%" cy="30%" r="75%">
              <stop offset="0%" style={{ stopColor: "#fff", stopOpacity: 0.95 }} />
              <stop offset="35%" style={{ stopColor: hueVar(h) }} />
              <stop offset="100%" style={{ stopColor: lipVar(h) }} />
            </radialGradient>
          ))}
        </defs>
        {RINGS.map((_, i) => (
          <ellipse key={i} data-ring={i} fill="none" style={ringStroke(i)} />
        ))}
        {RINGS.map((ring, i) => (
          <circle key={i} data-orb={i} r={ring.r} fill={`url(#${id}-orb-${i})`} style={{ opacity: 0 }} />
        ))}
      </svg>
      {/* Above the card (z-20): the spheres on the near half of their orbits. */}
      <svg ref={front} className="absolute inset-0 z-20 size-full overflow-visible">
        {RINGS.map((ring, i) => (
          <circle key={i} data-orb={i} r={ring.r} fill={`url(#${id}-orb-${i})`} style={{ opacity: 0 }} />
        ))}
      </svg>
    </div>
  );
}
