import { useEffect, useState } from "react";
import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";
import type { ModuleId } from "@/components/kiperfy/AuthModals";

const MODULE_COPY: Record<ModuleId, { heading: CopyKey; body: CopyKey }> = {
  pro: { heading: "features_pro_heading", body: "features_pro_body" },
  property: { heading: "features_property_heading", body: "features_property_body" },
  facility: { heading: "features_facility_heading", body: "features_facility_body" },
  security: { heading: "features_security_heading", body: "features_security_body" },
};

export function ModuleFeaturesSection({ moduleId }: { moduleId: ModuleId }) {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);
  const keys = MODULE_COPY[moduleId];

  useEffect(() => {
    setVisible(false);
    const tm = window.setTimeout(() => setVisible(true), 50);
    return () => window.clearTimeout(tm);
  }, [moduleId]);

  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-kiperfy-cyan">
          {t("features_title")}
        </p>
        <div
          className={`mt-6 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-kiperfy-text sm:text-5xl">
            {t(keys.heading)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-kiperfy-grey sm:text-xl">
            {t(keys.body)}
          </p>
        </div>
      </div>
    </section>
  );
}
