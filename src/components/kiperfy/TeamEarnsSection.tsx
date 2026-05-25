import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";

const COLUMNS: { titleKey: CopyKey; bodyKey: CopyKey }[] = [
  { titleKey: "team_col1_title", bodyKey: "team_col1_body" },
  { titleKey: "team_col2_title", bodyKey: "team_col2_body" },
  { titleKey: "team_col3_title", bodyKey: "team_col3_body" },
];

/** Tabler Icons: coin (ti-coin) — inline SVG, 16px */
function TablerCoinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M14.8 9a2 2 0 0 0 -1.8-1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8-1" />
      <path d="M12 7v10" />
    </svg>
  );
}

export function TeamEarnsSection() {
  const { t } = useLang();

  return (
    <section className="bg-gradient-to-b from-kiperfy-cyan/12 via-kiperfy-green/10 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-kiperfy-text sm:text-4xl">
            {t("team_title")}
          </h2>
          <p className="mt-2 text-2xl font-semibold text-kiperfy-grey sm:text-3xl">{t("team_subtitle")}</p>
          <div className="mt-4 mb-10 inline-flex items-center gap-2 rounded-full border border-kiperfy-cyan bg-white px-4 py-2 text-sm font-medium text-kiperfy-cyan">
            <TablerCoinIcon className="shrink-0 text-kiperfy-cyan" />
            <span>{t("team_stat_pill")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {COLUMNS.map(({ titleKey, bodyKey }) => (
            <div key={titleKey} className="text-center md:text-left">
              <h3 className="text-lg font-bold text-kiperfy-text">{t(titleKey)}</h3>
              <p className="mt-3 text-base leading-relaxed text-kiperfy-grey">{t(bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
