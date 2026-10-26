"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cx } from "@/utils/cx";
import { useFrameLoop } from "./loop";

// The owner's own vocabulary: the hero's three /terms, then what and how they build.
const ROWS = [
  { words: ["/works", "/talks", "/products"], top: "4%", seconds: 70, reverse: false, depth: 0.08, terms: true },
  { words: ["frontend", "fullstack", "firebase"], top: "37%", seconds: 90, reverse: true, depth: 0.16, terms: false },
  { words: ["build", "ship", "speak"], top: "70%", seconds: 80, reverse: false, depth: 0.24, terms: false },
];
const COPIES = 2; // the track holds the set twice and slides by half, so the loop is seamless
// A set must be wider than a wide screen, but no wider: the track is one composited layer.
const repeatFor = (words: string[]) => (words.join("").length < 20 ? 2 : 1);

/**
 * Variant 4, "Kinetic type": three rows of giant outlined words slide behind the hero at
 * different speeds and directions, and drift apart in depth as the page scrolls. The top row
 * is the hero's own /terms: the one driving the proof card fills in with its hue.
 */
export function KineticType() {
  const root = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<{ index: number; color: string }>({ index: -1, color: "" });

  useEffect(() => {
    const section = root.current?.closest("section");
    if (!section) return;
    const read = () => {
      const buttons = Array.from(section.querySelectorAll<HTMLElement>(".hero-term"));
      const index = buttons.findIndex((b) => b.getAttribute("aria-pressed") === "true");
      setActive({ index, color: index >= 0 ? buttons[index].style.getPropertyValue("--term-hue") : "" });
    };
    const observer = new MutationObserver(read);
    observer.observe(section, { attributes: true, subtree: true, attributeFilter: ["aria-pressed"] });
    const first = requestAnimationFrame(read);
    return () => {
      cancelAnimationFrame(first);
      observer.disconnect();
    };
  }, []);

  useFrameLoop(root, () => {
    const y = window.scrollY;
    ROWS.forEach((row, i) => {
      const node = rows.current[i];
      if (node) node.style.transform = `translate3d(0, ${(-y * row.depth).toFixed(1)}px, 0)`;
    });
  });

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden select-none">
      {ROWS.map((row, i) => (
        <div
          key={row.words[0]}
          ref={(node) => {
            rows.current[i] = node;
          }}
          className="absolute left-0"
          style={{ top: row.top }}
        >
          <div className={cx("bd-marquee flex w-max", row.reverse && "bd-marquee-reverse")} style={{ "--marquee-s": `${row.seconds}s` } as CSSProperties}>
            {Array.from({ length: COPIES * repeatFor(row.words) }, (_, copy) =>
              row.words.map((word, w) => {
                const lit = row.terms && w === active.index;
                return (
                  <span
                    key={`${copy}-${word}`}
                    className={cx("bd-outline-word", lit && "bd-outline-word-lit")}
                    style={lit ? ({ "--word-hue": active.color } as CSSProperties) : undefined}
                  >
                    {word}
                  </span>
                );
              }),
            )}
          </div>
        </div>
      ))}
      {/* Fades as overlays, not a mask: a mask over the moving rows costs a repaint every frame. */}
      <div className="absolute inset-x-0 top-0 h-[14%] bg-linear-to-b from-canvas to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[14%] bg-linear-to-t from-canvas to-transparent" />
    </div>
  );
}
