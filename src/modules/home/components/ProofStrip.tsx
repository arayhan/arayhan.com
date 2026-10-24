import { formatMetric, type Metric } from "@/domain/portfolio";
import { cx } from "@/utils/cx";
import { countProps } from "../home.motion";

type Item = { label: string; value: string; metric?: Metric };

export function ProofStrip({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="grid content-start gap-0.5 bg-card p-4">
          <span
            className={cx("font-display text-proof font-bold tabular-nums", item.metric?.improvement && "text-plus")}
            {...(item.metric ? countProps(item.metric) : {})}
          >
            {item.value}
          </span>
          <span className="text-sm text-mute">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function metricItems(metrics: Metric[]): Item[] {
  return metrics.map((metric) => ({ label: metric.label, value: formatMetric(metric), metric }));
}
