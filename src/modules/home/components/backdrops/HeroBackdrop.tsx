"use client";

import type { ComponentType } from "react";
import { Card } from "@/components/ui/Card";
import { actionClass } from "@/components/ui/action";
import { Blueprint } from "./Blueprint";
import { CommitField } from "./CommitField";
import { FlowCanvas } from "./FlowCanvas";
import { Keycaps } from "./Keycaps";
import { KineticType } from "./KineticType";
import { useHeroVariant } from "./useHeroVariant";

const VARIANTS: { name: string; Backdrop: ComponentType }[] = [
  { name: "Flow", Backdrop: FlowCanvas },
  { name: "Blueprint", Backdrop: Blueprint },
  { name: "Commits", Backdrop: CommitField },
  { name: "Type", Backdrop: KineticType },
  { name: "Keys", Backdrop: Keycaps },
];

/**
 * The layer behind the hero. TODO(owner-pick): five variants are live for comparison via
 * ?hero=1..5 and the switcher pill; keep the chosen one, delete the rest and the switcher.
 */
export function HeroBackdrop() {
  const [variant, choose] = useHeroVariant(VARIANTS.length);
  const { Backdrop } = VARIANTS[variant - 1];

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Backdrop key={variant} />
      </div>

      {/* Card is relative by design, so the fixed position lives on a wrapper. */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <Card role="group" aria-label="Hero backdrop variant" className="flex items-center gap-1 rounded-control p-1.5">
          <span className="hidden px-2 font-mono text-xs text-mute sm:inline">Hero</span>
          {VARIANTS.map((v, i) => (
            <button key={v.name} type="button" aria-pressed={variant === i + 1} onClick={() => choose(i + 1)} className={actionClass(variant === i + 1 ? "primary" : "secondary", "sm")}>
              {i + 1}
              <span className="hidden sm:inline">{v.name}</span>
            </button>
          ))}
        </Card>
      </div>
    </>
  );
}
