"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 900;
const FIRST_NUMBER = /^(\D*)(\d[\d,]*)(.*)$/;

/**
 * Shows value as written. With animate set, its first figure counts up from zero once, on
 * mount. The moving digits are hidden from assistive tech, which reads the final value.
 */
export function CountUp({ value, animate }: { value: string; animate: boolean }) {
  const shown = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = shown.current;
    const match = value.match(FIRST_NUMBER);
    if (!animate || !node || !match || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, before, digits, after] = match;
    const target = Number(digits.replaceAll(",", ""));
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - (1 - t) ** 3;
      node.textContent = `${before}${Math.round(target * eased).toLocaleString("en-US")}${after}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      node.textContent = value;
    };
  }, [value, animate]);

  return (
    <>
      <span ref={shown} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
