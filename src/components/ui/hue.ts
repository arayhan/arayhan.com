import type { Hue } from "@/domain/portfolio";

export const HUES: readonly Hue[] = ["blue", "violet", "teal", "amber", "rose"];

// Literal class names per hue, so Tailwind can see them.
export const HUE_FILL: Record<Hue, string> = { blue: "bg-hue-blue", violet: "bg-hue-violet", teal: "bg-hue-teal", amber: "bg-hue-amber", rose: "bg-hue-rose" };
export const HUE_SOFT: Record<Hue, string> = { blue: "bg-hue-blue-soft", violet: "bg-hue-violet-soft", teal: "bg-hue-teal-soft", amber: "bg-hue-amber-soft", rose: "bg-hue-rose-soft" };
export const HUE_TEXT: Record<Hue, string> = { blue: "text-hue-blue", violet: "text-hue-violet", teal: "text-hue-teal", amber: "text-hue-amber", rose: "text-hue-rose" };

/** The hues in turn, for list items that have none of their own. */
export const hueAt = (i: number, from = 0): Hue => HUES[(i + from) % HUES.length];
