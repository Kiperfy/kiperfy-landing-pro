import { useLang } from "@/hooks/use-lang";
import { useCountUp, formatMetricValue } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";
import type { CopyKey } from "@/lib/kiperfy-copy";

const METRICS: { value: number; labelKey: CopyKey; duration?: number }[] = [
  { value: 70_000, labelKey: "metric_statements" },
  { value: 50_000, labelKey: "metric_users" },
  { value: 124_999, labelKey: "metric_maintenance" },
  { value: 1_799_989, labelKey: "metric_access", duration: 2800 },
  { value: 10_000, labelKey: "metric_cashback" },
];

const ROW_1 = METRICS.slice(0, 3);
const ROW_2 = METRICS.slice(3);

function MetricItem({
  value,
  labelKey,
  duration,
  active,
  delayMs,
}: {
  value: number;
  labelKey: CopyKey;
  duration?: number;
  active: boolean;
  delayMs: number;
}) {
  const { t } = useLang();
  const count = useCountUp(value, active, duration);

  return (
    <div
      className="metric-item flex flex-col items-center text-center"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <p className="text-4xl font-bold tracking-tight text-kiperfy-grey sm:text-5xl lg:text-[3.25rem] lg:leading-none">
        {formatMetricValue(count)}
      </p>
      <p className="mt-2 text-sm font-bold text-kiperfy-text sm:text-base">{t(labelKey)}</p>
    </div>
  );
}

export function MetricsSection() {
  const { t } = useLang();
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`metrics-section border-y border-kiperfy-button/30 bg-white py-16 sm:py-20 ${inView ? "metrics-section--visible" : ""}`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="metric-item text-center text-sm font-medium text-kiperfy-grey sm:text-base">
          {t("metrics_title")}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {ROW_1.map((m, i) => (
            <MetricItem
              key={m.labelKey}
              value={m.value}
              labelKey={m.labelKey}
              duration={m.duration}
              active={inView}
              delayMs={i * 120}
            />
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
          {ROW_2.map((m, i) => (
            <MetricItem
              key={m.labelKey}
              value={m.value}
              labelKey={m.labelKey}
              duration={m.duration}
              active={inView}
              delayMs={360 + i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
