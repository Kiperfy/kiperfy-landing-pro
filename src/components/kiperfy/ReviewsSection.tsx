import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { STORE_LINKS } from "@/lib/store-links";
import { useInView } from "@/hooks/use-in-view";
import { FEATURED_REVIEW_INDEX, REVIEWS, type Review } from "@/lib/kiperfy-reviews";

const AUTO_ADVANCE_MS = 3000;
const RATING_TARGET = 4.7;
const DOWNLOADS_TARGET = 25000;
const RATING_DURATION_MS = 1200;

function FeaturedReview({
  review,
  lang,
  slideDirection,
  onPrev,
  onNext,
}: {
  review: Review;
  lang: "es" | "en";
  slideDirection: "next" | "prev";
  onPrev: () => void;
  onNext: () => void;
}) {
  const quote = review.quote[lang];

  return (
    <div className="relative mx-auto max-w-3xl px-14 sm:px-16">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous review"
        className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-kiperfy-button/30 text-kiperfy-grey transition hover:border-kiperfy-cyan hover:text-kiperfy-cyan"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next review"
        className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-kiperfy-button/30 text-kiperfy-grey transition hover:border-kiperfy-cyan hover:text-kiperfy-cyan"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure
        key={review.id}
        className={`review-carousel-slide review-carousel-slide--${slideDirection} text-center`}
      >
        <blockquote className="text-2xl font-bold italic leading-snug tracking-tight text-kiperfy-text sm:text-3xl lg:text-4xl">
          “{quote}”
        </blockquote>
        <figcaption className="mt-8">
          <p className="text-sm font-medium not-italic text-kiperfy-grey">— {review.name}</p>
        </figcaption>
      </figure>
    </div>
  );
}

export function ReviewsSection() {
  const { t, lang } = useLang();
  const { ref, inView } = useInView<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(FEATURED_REVIEW_INDEX);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [ratingScore, setRatingScore] = useState(0);
  const [downloadsCount, setDownloadsCount] = useState(0);
  const ratingAnimated = useRef(false);

  const go = useCallback((delta: number) => {
    setSlideDirection(delta > 0 ? "next" : "prev");
    setActiveIndex((i) => (i + delta + REVIEWS.length) % REVIEWS.length);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [inView, go]);

  useEffect(() => {
    if (!inView || ratingAnimated.current) return;
    ratingAnimated.current = true;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / RATING_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRatingScore(eased * RATING_TARGET);
      setDownloadsCount(Math.round(eased * DOWNLOADS_TARGET));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const active = REVIEWS[activeIndex];

  return (
    <section
      id="app"
      ref={ref}
      className={`reviews-section bg-white py-20 sm:py-24 ${inView ? "reviews-section--visible" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="metric-item mb-14 text-center">
          <p
            className="text-center tabular-nums"
            style={{ fontSize: 32, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}
          >
            {downloadsCount.toLocaleString("en-US")}
            <span>+</span> {t("reviews_downloads_suffix")}
          </p>
          <p
            className="text-center"
            style={{ fontSize: 13, color: "#808184", marginBottom: 16 }}
          >
            {t("reviews_downloads_platform")}
          </p>
          <p className="text-4xl font-bold tracking-tight text-kiperfy-text sm:text-5xl">
            <span className="tabular-nums">{ratingScore.toFixed(1)}</span>
            <span>/5</span>
          </p>
          <div className="reviews-rating-stars mt-4 flex items-center justify-center gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="reviews-star h-6 w-6 fill-kiperfy-chart-yellow text-kiperfy-chart-yellow sm:h-7 sm:w-7"
              />
            ))}
          </div>
          <p className="mt-4 text-base font-medium text-kiperfy-grey sm:text-lg">
            {t("reviews_rating_subtitle")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={STORE_LINKS.appStore}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("reviews_app_store_alt")}
            >
              <img
                src="/badge-app-store.png"
                alt={t("reviews_app_store_alt")}
                className="h-12 w-auto"
                width={156}
                height={48}
              />
            </a>
            <a
              href={STORE_LINKS.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("reviews_google_play_alt")}
            >
              <img
                src="/badge-google-play.png"
                alt={t("reviews_google_play_alt")}
                className="h-12 w-auto"
                width={156}
                height={48}
              />
            </a>
          </div>
        </div>
        <div className="metric-item">
          <FeaturedReview
            review={active}
            lang={lang}
            slideDirection={slideDirection}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        </div>
      </div>
    </section>
  );
}
