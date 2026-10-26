"use client";

import type { ComponentType } from "react";
import { Card } from "@/components/ui/Card";
import { actionClass } from "@/components/ui/action";
import { useQueryVariant } from "../backdrops/useQueryVariant";
import { Bauhaus } from "./Bauhaus";
import type { ShapeProps } from "./common";
import { LiquidRibbon } from "./LiquidRibbon";
import { OrbitSystem } from "./OrbitSystem";
import { ShapeShifter } from "./ShapeShifter";

const SHAPES: { name: string; Shape: ComponentType<ShapeProps> }[] = [
  { name: "Glyph", Shape: ShapeShifter },
  { name: "Orbit", Shape: OrbitSystem },
  { name: "Bauhaus", Shape: Bauhaus },
  { name: "Ribbon", Shape: LiquidRibbon },
];

/**
 * The motion shape around the proof card, reacting to the active /term. Desktop only.
 * TODO(owner-pick): four variants are live via ?shape=1..4 and the switcher pill; keep the
 * chosen one, delete the rest and the switcher.
 */
export function HeroShape(props: ShapeProps) {
  const [variant, choose] = useQueryVariant("shape", SHAPES.length);
  const { Shape } = SHAPES[variant - 1];

  return (
    <>
      {/* No z-index or transform here: the orbit draws one layer behind the card and one in front. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <Shape key={variant} {...props} />
      </div>

      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <Card role="group" aria-label="Hero shape variant" className="flex items-center gap-1 rounded-control p-1.5">
          <span className="hidden px-2 font-mono text-xs text-mute sm:inline">Shape</span>
          {SHAPES.map((s, i) => (
            <button key={s.name} type="button" aria-pressed={variant === i + 1} onClick={() => choose(i + 1)} className={actionClass(variant === i + 1 ? "primary" : "secondary", "sm")}>
              {i + 1}
              <span className="hidden sm:inline">{s.name}</span>
            </button>
          ))}
        </Card>
      </div>
    </>
  );
}
