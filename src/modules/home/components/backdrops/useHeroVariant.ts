"use client";

import { useSyncExternalStore } from "react";

// TODO(owner-pick): the owner is comparing hero backdrops via ?hero=1..5. Remove this hook,
// the switcher and the losing variants once one is chosen.
const EVENT = "hero-variant";

function read(count: number): number {
  const n = Number(new URLSearchParams(window.location.search).get("hero"));
  return Number.isInteger(n) && n >= 1 && n <= count ? n : 1;
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** The chosen backdrop (1-based, from `?hero=`), and a setter that rewrites the URL in place. */
export function useHeroVariant(count: number): [number, (n: number) => void] {
  const variant = useSyncExternalStore(
    subscribe,
    () => read(count),
    () => 1,
  );
  const choose = (n: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("hero", String(n));
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(EVENT));
  };
  return [variant, choose];
}
