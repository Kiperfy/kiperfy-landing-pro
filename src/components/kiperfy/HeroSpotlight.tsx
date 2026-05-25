import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

const INTENSITY = 1.28;

/** Ambient grid + radial base — operational infrastructure feel, GPU-friendly */
function HeroAtmosphere() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 animate-hero-ambient-breathe will-change-opacity motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(ellipse 92% 68% at 50% 32%, rgba(0,207,255,0.1) 0%, rgba(122,233,169,0.06) 38%, rgba(255,255,255,0.04) 55%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 animate-hero-radial-shift will-change-transform motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 72% 48%, rgba(0,207,255,0.07) 0%, rgba(255,255,255,0.05) 42%, transparent 68%)",
        }}
      />
      <div className="absolute inset-0 opacity-0 animate-hero-spotlight-in motion-reduce:animate-none motion-reduce:opacity-100">
        <div className="hero-grid-texture absolute inset-0 animate-hero-grid-pulse will-change-opacity motion-reduce:animate-none" />
      </div>
    </div>
  );
}

/**
 * Hero atmosphere: Aceternity-inspired spotlight + soft grid/radial depth.
 * Light cyan/white only — Stripe/Linear calm, no dark or crypto aesthetic.
 */
export function HeroSpotlight() {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10")}>
      <HeroAtmosphere />

      {/* Headline depth */}
      <Spotlight
        anchor="left"
        intensity={INTENSITY}
        fill="#e8f9ff"
        className="-left-[14%] top-[4%] h-[min(560px,88vw)] w-[min(760px,98vw)] md:-left-[8%] md:top-0"
      />

      {/* Bridge glow across hero content */}
      <Spotlight
        anchor="center"
        intensity={INTENSITY * 0.92}
        fill="#ffffff"
        className="left-[8%] top-[10%] h-[min(440px,72vw)] w-[min(620px,88vw)] md:left-[12%]"
      />

      {/* Desktop: extra headline wash */}
      <Spotlight
        anchor="left"
        enter="delayed"
        intensity={INTENSITY * 0.85}
        fill="#f5fcff"
        className="left-[18%] top-[22%] hidden h-[min(360px,55vw)] w-[min(500px,65vw)] md:block motion-reduce:opacity-80"
      />

      {/* Dashboard mockup atmospheric light */}
      <Spotlight
        anchor="right"
        intensity={INTENSITY}
        fill="#dff6ff"
        className="top-[14%] right-[-12%] h-[min(500px,78vw)] w-[min(560px,82vw)] md:right-[-6%] md:top-[10%]"
      />
    </div>
  );
}
