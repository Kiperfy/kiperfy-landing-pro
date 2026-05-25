import { Check } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";
import { cn } from "@/lib/utils";

const TOASTS: { key: CopyKey; position: string; delay: string }[] = [
  { key: "hero_toast_payment", position: "top-4 -left-2 sm:-left-12 lg:top-6", delay: "0s" },
  { key: "hero_toast_access", position: "top-[30%] -right-2 sm:-right-10", delay: "1.2s" },
  { key: "hero_toast_maintenance", position: "bottom-6 left-0 sm:bottom-8", delay: "2.4s" },
];

export function HeroOperationalToasts() {
  const { t } = useLang();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {TOASTS.map(({ key, position, delay }) => (
        <div
          key={key}
          className={cn(
            "absolute max-w-[11.5rem] rounded-xl border border-white/80 bg-white/95 px-3 py-2 shadow-md shadow-kiperfy-cyan/10 ring-1 ring-kiperfy-button/15 backdrop-blur-[2px] sm:max-w-[12.5rem]",
            "opacity-0 animate-hero-toast-in motion-reduce:animate-none motion-reduce:opacity-90",
            position,
          )}
          style={{ animationDelay: delay }}
        >
          <div
            className="animate-hero-toast-float motion-reduce:animate-none"
            style={{ animationDelay: delay }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-kiperfy-green/25">
                <Check className="h-3 w-3 text-kiperfy-chart-green" strokeWidth={2.5} />
              </span>
              <span className="text-xs font-medium leading-snug text-kiperfy-text">{t(key)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
