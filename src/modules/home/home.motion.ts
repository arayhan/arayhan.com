import type { Metric } from "@/domain/portfolio";

// Counting 0 -> 1 reads as a glitch, so small values render static.
const MIN_COUNTED = 10;

export function countProps(metric: Metric) {
  if (metric.value < MIN_COUNTED) return {};
  return { "data-count": metric.value, "data-prefix": metric.prefix ?? "", "data-suffix": metric.suffix ?? "" };
}
