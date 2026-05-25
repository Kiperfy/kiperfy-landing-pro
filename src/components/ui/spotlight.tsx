import { cn } from "@/lib/utils";

type SpotlightAnchor = "left" | "center" | "right";

const ANCHORS: Record<SpotlightAnchor, { primary: string; secondary: string }> = {
  left: { primary: "34% 44%", secondary: "58% 36%" },
  center: { primary: "48% 42%", secondary: "52% 52%" },
  right: { primary: "66% 46%", secondary: "74% 38%" },
};

function clampOpacity(value: number, intensity: number) {
  return Math.min(0.38, value * intensity);
}

/**
 * Lightweight spotlight inspired by Aceternity UI (ui.aceternity.com/components/spotlight).
 * CSS radial gradients only — no SVG feGaussianBlur for Lighthouse/GPU efficiency.
 */
export function Spotlight({
  className,
  fill = "#ffffff",
  anchor = "left",
  /** ~1.25 ≈ 25% more visible while staying enterprise-subtle */
  intensity = 1.25,
  enter = "default",
}: {
  className?: string;
  fill?: string;
  anchor?: SpotlightAnchor;
  intensity?: number;
  enter?: "default" | "delayed";
}) {
  const { primary, secondary } = ANCHORS[anchor];
  const primaryMix = Math.round(clampOpacity(0.18, intensity) * 100);
  const cyanMix = Math.round(clampOpacity(0.1, intensity) * 100);
  const whiteGlow = clampOpacity(0.12, intensity);
  const cyanGlow = clampOpacity(0.05, intensity);
  const washGlow = clampOpacity(0.07, intensity);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-0 overflow-hidden opacity-0 will-change-transform motion-reduce:animate-none motion-reduce:opacity-100",
        enter === "delayed" ? "animate-hero-spotlight-in-delayed" : "animate-hero-spotlight-in",
        className,
      )}
    >
      <div
        className="absolute inset-0 animate-hero-spotlight-drift will-change-transform motion-reduce:animate-none"
        style={{
          background: `radial-gradient(ellipse 74% 60% at ${primary}, color-mix(in srgb, ${fill} ${primaryMix}%, transparent) 0%, color-mix(in srgb, #00cfff ${cyanMix}%, transparent) 30%, transparent 66%)`,
        }}
      />
      <div
        className="absolute inset-0 animate-hero-spotlight-drift-alt will-change-transform motion-reduce:animate-none"
        style={{
          background: `radial-gradient(ellipse 58% 48% at ${secondary}, rgba(255,255,255,${whiteGlow}) 0%, rgba(0,207,255,${cyanGlow}) 38%, transparent 70%)`,
          opacity: clampOpacity(0.72, intensity),
        }}
      />
      <div
        className="absolute inset-0 animate-hero-spotlight-drift will-change-transform motion-reduce:animate-none"
        style={{
          background: `radial-gradient(ellipse 90% 70% at ${primary}, rgba(232,249,255,${washGlow}) 0%, transparent 55%)`,
        }}
      />
    </div>
  );
}
