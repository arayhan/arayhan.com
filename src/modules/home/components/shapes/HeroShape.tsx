"use client";

import type { ShapeProps } from "./common";
import { OrbitSystem } from "./OrbitSystem";

/** The motion shape around the proof card: the Orbit the owner picked from four. Desktop only. */
export function HeroShape(props: ShapeProps) {
  return (
    // No z-index or transform here: the orbit draws one layer behind the card and one in front.
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <OrbitSystem {...props} />
    </div>
  );
}
