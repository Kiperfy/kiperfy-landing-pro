import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { HERO_MEDIA, type HeroMediaKind } from "@/lib/hero-media";
import { cn } from "@/lib/utils";
import { HeroOperationalToasts } from "@/components/kiperfy/HeroOperationalToasts";

export function HeroProductMedia() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [kind, setKind] = useState<HeroMediaKind>("image");
  const [videoReady, setVideoReady] = useState(false);
  const [tryGif, setTryGif] = useState(false);

  useEffect(() => {
    const root = containerRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          video.pause();
          return;
        }
        if (video.readyState < 1) video.load();
        if (kind === "video" && videoReady) video.play().catch(() => undefined);
      },
      { rootMargin: "100px", threshold: 0.15 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [kind, videoReady]);

  const showPoster = kind !== "gif" && (kind === "image" || !videoReady);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl justify-self-center lg:max-w-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-kiperfy-cyan/25 via-white to-kiperfy-green/20 opacity-80"
      />

      <HeroOperationalToasts />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-kiperfy-button/25",
          "shadow-kiperfy-cyan/15",
        )}
      >
        <div className="flex items-center gap-2 border-b border-kiperfy-button/15 bg-gradient-to-b from-white to-kiperfy-button/5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-kiperfy-pink/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-kiperfy-chart-yellow/80" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-kiperfy-green/80" aria-hidden />
          <div className="ml-2 flex min-w-0 flex-1 items-center rounded-lg bg-kiperfy-button/10 px-3 py-1.5">
            <span className="truncate text-[11px] font-medium text-kiperfy-grey">app.kiperfy.com</span>
          </div>
        </div>

        <div className="relative aspect-[16/10] bg-gradient-to-br from-kiperfy-button/10 via-white to-kiperfy-cyan/5">
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700",
              kind === "video" && videoReady ? "opacity-100" : "opacity-0",
            )}
            muted
            loop
            playsInline
            preload="none"
            poster={HERO_MEDIA.poster}
            onLoadedData={() => {
              setKind("video");
              setVideoReady(true);
            }}
            onError={() => setTryGif(true)}
          >
            <source src={HERO_MEDIA.webm} type="video/webm" />
            <source src={HERO_MEDIA.mp4} type="video/mp4" />
          </video>

          {tryGif && kind !== "video" && (
            <img
              src={HERO_MEDIA.gif}
              alt=""
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700",
                kind === "gif" ? "opacity-100" : "opacity-0",
              )}
              loading="lazy"
              decoding="async"
              onLoad={() => setKind("gif")}
              onError={() => setKind("image")}
            />
          )}

          <img
            src={HERO_MEDIA.poster}
            alt={t("hero_media_alt")}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700",
              showPoster ? "opacity-100" : "opacity-0",
            )}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          {kind === "image" && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent px-4 pb-4 pt-10 text-center">
              <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-kiperfy-button/20">
                <Play className="ml-0.5 h-4 w-4 text-kiperfy-cyan" aria-hidden />
              </span>
              <p className="text-xs font-semibold text-kiperfy-text">{t("hero_media_placeholder_title")}</p>
              <p className="mx-auto mt-1 max-w-[13rem] text-[10px] leading-relaxed text-kiperfy-grey">
                {t("hero_media_placeholder_hint")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
