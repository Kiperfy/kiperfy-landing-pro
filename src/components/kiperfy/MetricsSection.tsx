import { useLang } from "@/hooks/use-lang";
import { useCountUp, formatMetricValue } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";
import type { CopyKey } from "@/lib/kiperfy-copy";
import { cn } from "@/lib/utils";

type MetricDef = {
  value: number;
  labelKey: CopyKey;
  duration?: number;
  format?: "count" | "percent";
};

const METRICS: MetricDef[] = [
  { value: 70_000, labelKey: "metric_statements" },
  { value: 50_000, labelKey: "metric_users" },
  { value: 124_999, labelKey: "metric_maintenance" },
  { value: 1_799_989, labelKey: "metric_access", duration: 2800 },
  { value: 10_000, labelKey: "metric_cashback" },
  { value: 85, labelKey: "metric_retention", format: "percent" },
];

function MetricItem({
  value,
  labelKey,
  duration,
  format = "count",
  active,
  className,
}: {
  value: number;
  labelKey: CopyKey;
  duration?: number;
  format?: "count" | "percent";
  active: boolean;
  className?: string;
}) {
  const { t } = useLang();
  const count = useCountUp(value, active, duration);
  const display = format === "percent" ? `${count}%` : formatMetricValue(count);

  return (
    <div className={cn("stats-strip-item metric-item", className)}>
      <p className="stats-strip-number">{display}</p>
      <p className="stats-strip-label">{t(labelKey)}</p>
    </div>
  );
}

export function MetricsSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`metrics-section w-full ${inView ? "metrics-section--visible" : ""}`}
    >
      <div className="stats-strip">
        {METRICS.map((m, i) => (
          <MetricItem
            key={m.labelKey}
            value={m.value}
            labelKey={m.labelKey}
            duration={m.duration}
            format={m.format}
            active={inView}
            className={METRICS.length % 2 === 1 && i === METRICS.length - 1 ? "stats-strip-item--span" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
