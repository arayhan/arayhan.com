"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ADVANCE_MS = 8000;

type ActiveTerm = {
  /** Index of the /term driving the hero card, the orbit and the shelf. */
  active: number;
  /** False until the first change, so the card's number only counts up after a swap. */
  swapped: boolean;
  pick: (i: number) => void;
  /** The hero reports pointer or focus inside it. */
  holdHero: (held: boolean) => void;
  /** The shelf reports being on screen. */
  holdShelf: (held: boolean) => void;
};

const Ctx = createContext<ActiveTerm | null>(null);

/**
 * One active /term for the whole home page. Left alone it walks the terms every 8s, but never
 * while someone is in the hero, while the shelf (the term's full list) is on screen, or under
 * reduced motion, so nothing reshuffles under a reader.
 */
export function ActiveTermProvider({ count, children }: { count: number; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const [heroHeld, holdHero] = useState(false);
  const [shelfHeld, holdShelf] = useState(false);
  const reduced = useReducedMotion();
  const cycling = !reduced && !heroHeld && !shelfHeld;

  const pick = useCallback((i: number) => {
    setSwapped(true);
    setActive(i);
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(() => {
      setSwapped(true);
      setActive((i) => (i + 1) % count);
    }, ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, cycling, count]);

  const value = useMemo(() => ({ active, swapped, pick, holdHero, holdShelf }), [active, swapped, pick]);
  return <Ctx value={value}>{children}</Ctx>;
}

export function useActiveTerm(): ActiveTerm {
  const value = useContext(Ctx);
  if (!value) throw new Error("useActiveTerm must be used inside ActiveTermProvider");
  return value;
}
