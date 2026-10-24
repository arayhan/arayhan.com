import { formatMetric, type Metric } from "@/domain/portfolio";
import { cx } from "@/utils/cx";
import { countProps } from "../home.motion";
import { PendingChip } from "./PendingChip";

type Props = {
  metric: Metric | null;
  pending: boolean;
};

export function MetricCard({ metric, pending }: Props) {
  return (
    <div className="grid content-start gap-2 rounded-lg border border-rule bg-card p-4">
      {metric ? (
        <>
          <span
            className={cx("font-display text-metric font-bold tracking-tight tabular-nums", metric.improvement && "text-plus")}
            {...countProps(metric)}
          >
            {formatMetric(metric)}
          </span>
          <span className="text-sm text-mute">
            {metric.label}
            {metric.detail && (
              <>
                <br />
                <span className="font-mono text-xs text-ink">{metric.detail}</span>
              </>
            )}
          </span>
          {metric.ratio !== undefined && (
            <span className="block h-2 overflow-hidden rounded-sm bg-plus-bg" aria-hidden="true">
              <span
                className="block h-full origin-left rounded-sm bg-plus"
                style={{ transform: `scaleX(${metric.ratio})` }}
                data-bar={metric.ratio}
              />
            </span>
          )}
        </>
      ) : (
        <span className="text-sm text-mute">The scale and outcome for this project are still to be written.</span>
      )}
      {pending && <PendingChip />}
    </div>
  );
}
