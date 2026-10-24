"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { THEME_STORAGE_KEY } from "@/utils/theme";

function currentTheme(): "light" | "dark" {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Which icon shows is decided in CSS (globals.css .theme-sun/.theme-moon), so the
// server render and the first client paint always agree.
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still applies for this visit.
    }
  }

  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode" className={className}>
      <MoonIcon size={20} className="theme-moon" aria-hidden="true" />
      <SunIcon size={20} className="theme-sun" aria-hidden="true" />
    </button>
  );
}

