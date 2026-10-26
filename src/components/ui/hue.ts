import type { Hue } from "@/domain/portfolio";

// Literal class names per hue, so Tailwind can see them.
export const HUE_FILL: Record<Hue, string> = { blue: "bg-hue-blue", violet: "bg-hue-violet", amber: "bg-hue-amber", green: "bg-hue-green" };
export const HUE_SOFT: Record<Hue, string> = { blue: "bg-hue-blue-soft", violet: "bg-hue-violet-soft", amber: "bg-hue-amber-soft", green: "bg-hue-green-soft" };
export const HUE_TEXT: Record<Hue, string> = { blue: "text-hue-blue-text", violet: "text-hue-violet-text", amber: "text-hue-amber-text", green: "text-hue-green-text" };
