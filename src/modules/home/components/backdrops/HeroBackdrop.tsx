"use client";

import { CommitField } from "./CommitField";

/** The layer behind the hero: the Commit field the owner picked from five variants. */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <CommitField />
    </div>
  );
}
