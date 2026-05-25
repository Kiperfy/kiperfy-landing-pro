import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";
import type { ModuleId } from "@/components/kiperfy/AuthModals";
import { cn } from "@/lib/utils";

type TierId = "free" | "pillar" | "pro";

const TIERS: {
  id: TierId;
  nameKey: CopyKey;
  priceKey: CopyKey;
  descKey: CopyKey;
  ctaKey: CopyKey;
  signupModule: ModuleId;
  recommended?: boolean;
}[] = [
  {
    id: "free",
    nameKey: "pricing_free",
    priceKey: "pricing_free_price",
    descKey: "pricing_free_desc",
    ctaKey: "pricing_cta_free",
    signupModule: "pro",
  },
  {
    id: "pillar",
    nameKey: "pricing_pillar",
    priceKey: "pricing_pillar_price",
    descKey: "pricing_pillar_desc",
    ctaKey: "pricing_cta_pillar",
    signupModule: "property",
  },
  {
    id: "pro",
    nameKey: "pricing_pro",
    priceKey: "pricing_pro_price",
    descKey: "pricing_pro_desc",
    ctaKey: "pricing_cta_pro",
    signupModule: "pro",
    recommended: true,
  },
];

function TierPrice({ tierId }: { tierId: TierId }) {
  const { t, lang } = useLang();
  const period = lang === "es" ? "/mes" : "/mo";

  if (tierId === "free") {
    return (
      <div className="mt-2">
        <p className="text-3xl font-bold tracking-tight text-kiperfy-grey">{t("pricing_free_price")}</p>
        <p className="mt-1 text-sm text-kiperfy-grey/80">{t("pricing_free_note")}</p>
      </div>
    );
  }

  const amount = tierId === "pillar" ? "$150" : "$350";
  const colorClass = tierId === "pillar" || tierId === "pro" ? "text-white" : "text-kiperfy-grey";

  return (
    <p className={cn("mt-2 text-3xl font-bold tracking-tight", colorClass)}>
      {amount}{" "}
      <span className="text-[14px] font-normal">USD</span>
      {period}
    </p>
  );
}

export function PricingSection({ onSignup }: { onSignup: (module: ModuleId) => void }) {
  const { t } = useLang();

  return (
    <section id="pricing" className="bg-white pb-12 pt-0 md:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 overflow-visible md:grid-cols-3 md:gap-5">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "relative flex min-h-[320px] flex-col rounded-2xl p-6 transition-transform duration-200 ease-out hover:scale-[1.02] sm:min-h-[340px] sm:p-7",
                tier.id === "free" && "border border-kiperfy-button/20 border-l-[3px] border-l-kiperfy-green bg-white",
                tier.id === "pillar" && "overflow-visible bg-gradient-to-r from-kiperfy-cyan to-kiperfy-green",
                tier.id === "pro" &&
                  "mt-6 overflow-visible bg-gradient-to-br from-kiperfy-purple to-kiperfy-chart-blue",
              )}
            >
              {tier.recommended && (
                <span className="absolute top-[-16px] left-1/2 z-[2] -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-kiperfy-purple to-kiperfy-chart-blue px-4 py-[5px] text-[11px] font-medium tracking-[0.05em] text-white">
                  {t("hero_pro_badge")}
                </span>
              )}

              <div className="flex flex-1 flex-col justify-between gap-6">
                <div>
                  <h3
                    className={cn(
                      "text-xl font-bold",
                      tier.id === "pillar" && "text-white",
                      tier.id === "pro" && "text-white",
                      tier.id === "free" && "text-kiperfy-text",
                    )}
                  >
                    {t(tier.nameKey)}
                  </h3>
                  <TierPrice tierId={tier.id} />
                  <p
                    className={cn(
                      "mt-4 text-sm leading-relaxed",
                      tier.id === "pillar" && "text-[rgba(255,255,255,0.85)]",
                      tier.id === "pro" && "text-white/90",
                      tier.id === "free" && "text-kiperfy-grey",
                    )}
                  >
                    {t(tier.descKey)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSignup(tier.signupModule)}
                  className={cn(
                    "h-11 w-full rounded-full text-sm font-medium transition",
                    tier.id === "free" &&
                      "border border-kiperfy-green bg-transparent text-kiperfy-cyan hover:bg-kiperfy-green hover:text-white",
                    tier.id === "pillar" &&
                      "border-0 bg-white font-medium text-kiperfy-cyan hover:bg-white/[0.88]",
                    tier.id === "pro" && "border-0 bg-white font-medium text-kiperfy-purple hover:bg-white/85",
                  )}
                >
                  {t(tier.ctaKey)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
