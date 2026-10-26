"use client";

import { useSyncExternalStore } from "react";

// For live A/B comparisons the owner runs on the site (TODO(owner-pick) where used): a
// 1-based choice read from ?<param>=, rewritten in place when changed.
const EVENT = "query-variant";

function read(param: string, count: number): number {
  const n = Number(new URLSearchParams(window.location.search).get(param));
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

/** The chosen variant (1-based, from `?<param>=`, default 1) and a setter that rewrites the URL. */
export function useQueryVariant(param: string, count: number): [number, (n: number) => void] {
  const variant = useSyncExternalStore(
    subscribe,
    () => read(param, count),
    () => 1,
  );
  const choose = (n: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, String(n));
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(EVENT));
  };
  return [variant, choose];
}
