"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cx } from "@/utils/cx";
import { prefersReducedMotion } from "./loop";

type Props = {
  as?: ElementType;
  /** Seconds before it starts once in view. */
  delay?: number;
  duration?: number;
  /** Where it comes from, in px. */
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * Fades and slides into place the first time it scrolls into view. Hidden only once JS has
 * marked the page (`html.js`), so without JS everything simply shows; instant under reduced
 * motion.
 */
export function Reveal({ as: Tag = "div", delay = 0, duration = 0.7, x = 0, y = 30, className, style, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.setAttribute("data-shown", "");
      return;
    }
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-shown", "");
        seen.disconnect();
      },
      { rootMargin: "50px" },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  const vars = { "--reveal-delay": `${delay}s`, "--reveal-dur": `${duration}s`, "--reveal-x": `${x}px`, "--reveal-y": `${y}px` } as CSSProperties;
  return (
    <Tag ref={ref} className={cx("reveal", className)} style={{ ...vars, ...style }}>
      {children}
    </Tag>
  );
}
