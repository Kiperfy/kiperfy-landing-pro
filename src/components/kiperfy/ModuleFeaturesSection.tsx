import { useEffect, useState } from "react";
import { useLang } from "@/hooks/use-lang";
import type { ModuleId } from "@/components/kiperfy/AuthModals";
import type { CopyKey } from "@/lib/kiperfy-copy";
import { cn } from "@/lib/utils";

const CYCLE_ORDER: ModuleId[] = ["pro", "property", "facility", "security"];

export function ModuleFeaturesSection({
  activeTab,
  tabTitleLocked,
}: {
  activeTab: ModuleId;
  tabTitleLocked: boolean;
}) {
  const { t } = useLang();
  const [cycleIndex, setCycleIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (tabTitleLocked) {
      setFadeIn(true);
      return;
    }

    let fadeTimeout: ReturnType<typeof setTimeout>;
    const interval = window.setInterval(() => {
      setFadeIn(false);
      fadeTimeout = setTimeout(() => {
        setCycleIndex((i) => (i + 1) % CYCLE_ORDER.length);
        setFadeIn(true);
      }, 400);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [tabTitleLocked]);

  const displayId = tabTitleLocked ? activeTab : CYCLE_ORDER[cycleIndex];
  const displayName = t(`hero_tab_${displayId}` as CopyKey);

  return (
    <section id="features" className="bg-white pt-12 pb-6 md:pt-20 md:pb-8">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="space-y-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-kiperfy-cyan leading-tight">
            {t("features_title")}
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-kiperfy-text sm:text-5xl leading-tight">
            <span
              className={cn(
                "inline-block transition-opacity duration-[400ms] ease-in-out",
                fadeIn ? "opacity-100" : "opacity-0",
              )}
              aria-live={tabTitleLocked ? "polite" : "off"}
            >
              {displayName}
            </span>
          </h2>
        </div>
        <p className="mt-6 text-lg leading-relaxed text-kiperfy-grey sm:text-xl">
          {t("features_pro_body")}
        </p>
      </div>
    </section>
  );
}
