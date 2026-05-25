/**
 * Hero product media — drop files into /public to enable automatically.
 * Priority: WebM → MP4 → GIF → poster image fallback.
 */
export const HERO_MEDIA = {
  poster: "/preview-web.png",
  webm: "/hero-product.webm",
  mp4: "/hero-product.mp4",
  gif: "/hero-product.gif",
} as const;

export type HeroMediaKind = "video" | "gif" | "image";
