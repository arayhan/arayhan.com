"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cx } from "@/utils/cx";
import { prefersReducedMotion, useFrameLoop, usePointer } from "./loop";

type Key = { label: string; x: string; y: string; r: number; wide?: boolean; accent?: boolean };

// Two loose bands that stay clear of the copy: shortcuts above the status chip, "SHIP ⏎" under the socials.
const KEYS: Key[] = [
  { label: "Esc", x: "4%", y: "6%", r: -10 },
  { label: "⌘", x: "13%", y: "12%", r: 6 },
  { label: "K", x: "21%", y: "5%", r: -4 },
  { label: "/", x: "32%", y: "11%", r: 9 },
  { label: "S", x: "6%", y: "80%", r: -6 },
  { label: "H", x: "13%", y: "83%", r: 4 },
  { label: "I", x: "20%", y: "79%", r: -3 },
  { label: "P", x: "27%", y: "84%", r: 7 },
  { label: "⏎", x: "34.5%", y: "80%", r: -5, wide: true, accent: true },
];
const WORD = ["S", "H", "I", "P", "⏎"];
const STEP_MS = 230;
const HOLD_MS = 130;
const LOOP_MS = 3800;
const CHORD_MS = 240;

/**
 * Variant 5, "Tactile keycaps": keycaps in the design system's slab-and-lip style float at
 * the hero's edges. On a loop they type S H I P ⏎ (a caption types along), the cursor presses
 * any key it passes over, and Ctrl/Cmd K presses ⌘ and K together, the same chord that opens
 * the menu. Desktop only, so the keys never sit on the copy.
 */
export function Keycaps() {
  const root = useRef<HTMLDivElement>(null);
  const keys = useRef<(HTMLSpanElement | null)[]>([]);
  const caption = useRef<HTMLSpanElement>(null);
  const pointer = usePointer();
  const chord = useRef(-1e9);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") chord.current = performance.now();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useFrameLoop(root, (t) => {
    const still = prefersReducedMotion();
    const phase = t % LOOP_MS;
    const typed = still ? WORD.length : WORD.filter((_, i) => phase >= i * STEP_MS).length;
    const p = pointer.current;

    KEYS.forEach((k, i) => {
      const node = keys.current[i];
      if (!node) return;
      const seq = WORD.indexOf(k.label);
      const bySeq = !still && seq >= 0 && phase >= seq * STEP_MS && phase < seq * STEP_MS + HOLD_MS;
      const byChord = (k.label === "⌘" || k.label === "K") && t - chord.current < CHORD_MS;
      let byPointer = false;
      if (p.active) {
        const r = node.getBoundingClientRect();
        byPointer = p.x >= r.left - 4 && p.x <= r.right + 4 && p.y >= r.top - 4 && p.y <= r.bottom + 4;
      }
      const pressed = bySeq || byChord || byPointer;
      if (node.hasAttribute("data-pressed") !== pressed) node.toggleAttribute("data-pressed", pressed);
    });

    const text = `> ${WORD.slice(0, Math.min(typed, 4)).join("").toLowerCase()}${typed >= 5 ? " ✓" : ""}`;
    if (caption.current && caption.current.textContent !== text) caption.current.textContent = text;
  });

  return (
    <div ref={root} className="absolute inset-0 hidden lg:block">
      <span ref={caption} className="absolute font-mono text-xs text-mute" style={{ left: "6%", top: "74%" }} />
      {KEYS.map((k, i) => (
        <span key={k.label} className="bd-bob absolute" style={{ left: k.x, top: k.y, "--bob-s": `${4 + (i % 4) * 0.7}s`, "--bob-delay": `${-i * 0.6}s` } as CSSProperties}>
          <span
            ref={(node) => {
              keys.current[i] = node;
            }}
            className={cx("bd-key", k.wide && "bd-key-wide", k.accent && "bd-key-accent")}
            style={{ "--r": `${k.r}deg` } as CSSProperties}
          >
            {k.label}
          </span>
        </span>
      ))}
    </div>
  );
}
