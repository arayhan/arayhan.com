"use client";

import { useRef } from "react";
import { boxIn, prefersReducedMotion, useFrameLoop, usePointer, type Box } from "./loop";

const LINES = 4;
const PULSE_MS = 1300;
const RIPPLE_MS = 650;

// Blobs lean away from the pointer by `depth` px at the viewport edge.
const BLOBS = [
  { className: "top-[-12%] right-[-6%] size-[46vmax] [--blob:var(--hue-blue)]", depth: 26 },
  { className: "bottom-[-24%] left-[-10%] size-[40vmax] [--blob:var(--hue-violet)]", depth: 18 },
  { className: "bottom-[-30%] right-[18%] size-[34vmax] [--blob:var(--hue-amber)]", depth: 12 },
];

const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2);

// Where the segment from a box's centre toward `to` leaves the box.
function exitPoint(b: Box, toX: number, toY: number) {
  const dx = toX - b.cx;
  const dy = toY - b.cy;
  const s = Math.min(Math.abs(dx) > 0.01 ? b.w / 2 / Math.abs(dx) : Infinity, Math.abs(dy) > 0.01 ? b.h / 2 / Math.abs(dy) : Infinity, 1);
  return { x: b.cx + dx * s, y: b.cy + dy * s };
}

/**
 * Variant 1, "Flow canvas": a dot-grid workspace, three soft hue shapes that lean away from
 * the pointer, and dashed connectors from each floating card into the proof card. The
 * connectors follow the cards as they drift; every few seconds a pulse runs down one and
 * lands with a ripple.
 */
export function FlowCanvas() {
  const root = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const pulse = useRef<SVGCircleElement>(null);
  const ripple = useRef<SVGCircleElement>(null);
  const blobs = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = usePointer();
  const state = useRef({ lean: { x: 0, y: 0 }, line: -1, start: 0, next: 1600, ripple: { x: 0, y: 0, start: -1e9 } });

  useFrameLoop(root, (t) => {
    const el = root.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    const s = state.current;
    const box = el.getBoundingClientRect();
    const still = prefersReducedMotion();

    const p = pointer.current;
    const tx = p.active ? p.x / window.innerWidth - 0.5 : 0;
    const ty = p.active ? p.y / window.innerHeight - 0.5 : 0;
    s.lean.x += (tx - s.lean.x) * 0.05;
    s.lean.y += (ty - s.lean.y) * 0.05;
    BLOBS.forEach((b, i) => {
      const node = blobs.current[i];
      if (node) node.style.transform = `translate3d(${(-s.lean.x * b.depth).toFixed(1)}px, ${(-s.lean.y * b.depth).toFixed(1)}px, 0)`;
    });

    const card = boxIn(section.querySelector("#hero-proof"), box);
    const floats = Array.from(section.querySelectorAll("[data-float]"), (f) => boxIn(f, box));
    const live: number[] = [];
    for (let i = 0; i < LINES; i++) {
      const path = paths.current[i];
      const f = floats[i];
      if (!path) continue;
      if (!card || !f) {
        path.style.opacity = "0";
        continue;
      }
      const a = exitPoint(f, card.cx, card.cy);
      const b = exitPoint(card, f.cx, f.cy);
      const mx = a.x + (b.x - a.x) * 0.5;
      path.setAttribute("d", `M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${mx.toFixed(1)} ${a.y.toFixed(1)} ${mx.toFixed(1)} ${b.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
      path.style.opacity = "1";
      path.style.strokeDashoffset = still ? "0" : String(-((t * 0.012) % 20));
      live.push(i);
    }

    const dot = pulse.current;
    const ring = ripple.current;
    if (!dot || !ring || still) return;

    if (s.line < 0 && t > s.next && live.length) {
      s.line = live[Math.floor(Math.random() * live.length)];
      s.start = t;
    }
    const path = s.line >= 0 ? paths.current[s.line] : null;
    if (path && live.includes(s.line)) {
      const q = Math.min(1, (t - s.start) / PULSE_MS);
      const pt = path.getPointAtLength(ease(q) * path.getTotalLength());
      dot.setAttribute("cx", pt.x.toFixed(1));
      dot.setAttribute("cy", pt.y.toFixed(1));
      dot.style.opacity = String(Math.min(1, q * 6, (1 - q) * 6 + 0.4));
      if (q >= 1) {
        s.ripple = { x: pt.x, y: pt.y, start: t };
        s.line = -1;
        s.next = t + 1200 + Math.random() * 1600;
      }
    } else {
      dot.style.opacity = "0";
      s.line = -1;
    }

    const r = (t - s.ripple.start) / RIPPLE_MS;
    if (r >= 0 && r <= 1) {
      ring.setAttribute("cx", s.ripple.x.toFixed(1));
      ring.setAttribute("cy", s.ripple.y.toFixed(1));
      ring.setAttribute("r", (4 + 16 * ease(r)).toFixed(1));
      ring.style.opacity = String(0.55 * (1 - r));
    } else {
      ring.style.opacity = "0";
    }
  });

  return (
    <div ref={root} className="absolute inset-0">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(node) => {
            blobs.current[i] = node;
          }}
          className={`bd-blob absolute ${b.className}`}
        />
      ))}
      <div className="bd-dots absolute inset-0" />
      <svg className="absolute inset-0 hidden size-full lg:block">
        {Array.from({ length: LINES }, (_, i) => (
          <path
            key={i}
            ref={(node) => {
              paths.current[i] = node;
            }}
            fill="none"
            stroke="var(--mute)"
            strokeOpacity="0.4"
            strokeWidth="1.25"
            strokeDasharray="4 6"
            strokeLinecap="round"
            style={{ opacity: 0 }}
          />
        ))}
        <circle ref={ripple} r="4" fill="none" stroke="var(--accent)" strokeWidth="1.5" style={{ opacity: 0 }} />
        <circle ref={pulse} r="3.5" fill="var(--accent)" style={{ opacity: 0, filter: "drop-shadow(0 0 4px var(--accent))" }} />
      </svg>
    </div>
  );
}
