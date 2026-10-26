"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export type Pointer = { x: number; y: number; active: boolean };

/**
 * Calls `frame(t)` every animation frame while `target` is on screen and the tab is visible.
 * Under reduced motion it renders one still frame (again on resize) and never loops.
 */
export function useFrameLoop(target: RefObject<HTMLElement | null>, frame: (t: number) => void) {
  const latest = useRef(frame);
  useLayoutEffect(() => {
    latest.current = frame;
  });

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      const still = () => latest.current(performance.now());
      const id = requestAnimationFrame(still);
      window.addEventListener("resize", still);
      return () => {
        cancelAnimationFrame(id);
        window.removeEventListener("resize", still);
      };
    }

    let raf = 0;
    let visible = false;
    const loop = (t: number) => {
      latest.current(t);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    seen.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(raf);
      seen.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [target]);
}

/** The mouse position in client coordinates; `active` is false until a mouse moves, and after it leaves the page. */
export function usePointer(): RefObject<Pointer> {
  const pointer = useRef<Pointer>({ x: 0, y: 0, active: false });
  useEffect(() => {
    const p = pointer.current;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      p.x = e.clientX;
      p.y = e.clientY;
      p.active = true;
    };
    const onLeave = () => {
      p.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return pointer;
}

/** Calls `onChange` whenever the colour theme flips (toggle or OS); returns the cleanup. */
export function watchTheme(onChange: () => void): () => void {
  const attr = new MutationObserver(onChange);
  attr.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const media = matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  return () => {
    attr.disconnect();
    media.removeEventListener("change", onChange);
  };
}

export const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** `el`'s box relative to `root`, or null when it is not rendered (display: none). */
export function boxIn(el: Element | null, root: DOMRect) {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return null;
  return { x: r.left - root.left, y: r.top - root.top, w: r.width, h: r.height, cx: r.left - root.left + r.width / 2, cy: r.top - root.top + r.height / 2 };
}

export type Box = NonNullable<ReturnType<typeof boxIn>>;
