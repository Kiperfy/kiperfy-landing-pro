import { useState } from "react";
import { useLang } from "@/hooks/use-lang";

type PreviewMode = "mobile" | "web";

export function PreviewSection() {
  const { t } = useLang();
  const [mode, setMode] = useState<PreviewMode>("mobile");

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-kiperfy-text shadow-xl ring-1 ring-kiperfy-button/20 sm:aspect-[2/1]">
          <img
            src="/preview-mobile.png"
            alt={t("preview_mobile_alt")}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              mode === "mobile" ? "opacity-100" : "opacity-0"
            }`}
          />
          <img
            src="/preview-web.png"
            alt={t("preview_web_alt")}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              mode === "web" ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent pointer-events-none"
            aria-hidden
          />

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/15 p-1.5 shadow-lg backdrop-blur-md ring-1 ring-white/25">
            <ToggleButton
              active={mode === "mobile"}
              onClick={() => setMode("mobile")}
              label={t("preview_mobile")}
            />
            <ToggleButton
              active={mode === "web"}
              onClick={() => setMode("web")}
              label={t("preview_web")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
        active
          ? "bg-kiperfy-pink text-white shadow-md"
          : "bg-transparent text-white hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
