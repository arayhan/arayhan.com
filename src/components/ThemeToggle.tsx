"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import type { MouseEvent } from "react";
import { THEME_STORAGE_KEY } from "@/utils/theme";

const REVEAL_MS = 520;

// Dark-first: without a saved choice the site is dark, whatever the OS prefers.
function currentTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// Which icon shows is decided in CSS (globals.css .theme-sun/.theme-moon), so the
// server render and the first client paint always agree.
export function ThemeToggle({ className }: { className?: string }) {
  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = currentTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Private mode or blocked storage: the switch still applies for this visit.
      }
    };

    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    // The new theme grows as a circle out of the button (its centre, so keyboard toggles work too).
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: REVEAL_MS, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {
        // A skipped transition still applied the theme.
      });
  }

  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode" className={className}>
      <MoonIcon size={20} className="theme-moon" aria-hidden="true" />
      <SunIcon size={20} className="theme-sun" aria-hidden="true" />
    </button>
  );
}
