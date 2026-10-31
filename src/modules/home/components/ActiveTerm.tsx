"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ComponentPropsWithoutRef, type FocusEvent, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ADVANCE_MS = 8000;

type ActiveTerm = {
  /** Index of the /term lit in the hero sentence and shown by the showcase. */
  active: number;
  pick: (i: number) => void;
  /** Pointer or focus is inside the hero. */
  hold: (held: boolean) => void;
};

const Ctx = createContext<ActiveTerm | null>(null);

/**
 * One active /term for the hero. Left alone it walks the terms every 8s, but never while
 * someone is in the hero or under reduced motion, so nothing reshuffles under a reader.
 */
export function ActiveTermProvider({ count, children }: { count: number; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [held, hold] = useState(false);
  const reduced = useReducedMotion();
  const cycling = !reduced && !held;

  const pick = useCallback((i: number) => setActive(i), []);

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, cycling, count]);

  const value = useMemo(() => ({ active, pick, hold }), [active, pick]);
  return <Ctx value={value}>{children}</Ctx>;
}

export function useActiveTerm(): ActiveTerm {
  const value = useContext(Ctx);
  if (!value) throw new Error("useActiveTerm must be used inside ActiveTermProvider");
  return value;
}

/** The hero's own element: a mouse or focus inside it holds the active term still. */
export function HoldZone({ children, ...rest }: ComponentPropsWithoutRef<"section">) {
  const { hold } = useActiveTerm();
  const root = useRef<HTMLElement>(null);

  const onBlur = (e: FocusEvent) => {
    if (!root.current?.contains(e.relatedTarget as Node | null)) hold(false);
  };

  return (
    <section
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && hold(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && hold(false)}
      onFocus={() => hold(true)}
      onBlur={onBlur}
      {...rest}
    >
      {children}
    </section>
  );
}
