"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/utils/cx";
import { prefersReducedMotion } from "./loop";

type Props = {
  /** How far outside its box (px) the pointer starts pulling it. */
  padding?: number;
  /** Higher is weaker: it moves by the pointer's offset divided by this. */
  strength?: number;
  className?: string;
  children: ReactNode;
};

/**
 * A magnetic pull toward the mouse: inside `padding` px of the box, it follows the pointer
 * at 1/strength of its offset (0.3s ease-out), and eases home when it leaves (0.6s). Mouse
 * only; still under reduced motion.
 */
export function Magnet({ padding = 150, strength = 3, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let active = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = el.getBoundingClientRect();
      const dx = e.clientX - (box.left + box.width / 2);
      const dy = e.clientY - (box.top + box.height / 2);
      const near = Math.abs(dx) < box.width / 2 + padding && Math.abs(dy) < box.height / 2 + padding;
      if (near) {
        active = true;
        el.style.transition = "transform 0.3s ease-out";
        el.style.transform = `translate3d(${(dx / strength).toFixed(1)}px, ${(dy / strength).toFixed(1)}px, 0)`;
      } else if (active) {
        active = false;
        el.style.transition = "transform 0.6s ease-in-out";
        el.style.transform = "translate3d(0, 0, 0)";
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [padding, strength]);

  return (
    <div ref={ref} className={cx("will-change-transform", className)}>
      {children}
    </div>
  );
}
