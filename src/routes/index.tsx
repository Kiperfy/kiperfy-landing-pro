import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";
import { LoginModal, SignupModal, type ModuleId } from "@/components/kiperfy/AuthModals";
import { MetricsSection } from "@/components/kiperfy/MetricsSection";
import { PreviewSection } from "@/components/kiperfy/PreviewSection";
import { ModuleFeaturesSection } from "@/components/kiperfy/ModuleFeaturesSection";
import { TeamEarnsSection } from "@/components/kiperfy/TeamEarnsSection";
import { PricingSection } from "@/components/kiperfy/PricingSection";
import { LeadQualificationSection } from "@/components/kiperfy/LeadQualificationSection";
import { ReviewsSection } from "@/components/kiperfy/ReviewsSection";
import { HeroSpotlight } from "@/components/kiperfy/HeroSpotlight";
import { HeroProductMedia } from "@/components/kiperfy/HeroProductMedia";
import { SiteFooter } from "@/components/kiperfy/SiteFooter";
import { splitHeadline } from "@/lib/headline-lines";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, lang, setLang } = useLang();
  const [activeTab, setActiveTab] = useState<ModuleId>(() => {
    if (typeof window === "undefined") return "pro";
    const saved = localStorage.getItem("kiperfy_active_tab") as ModuleId | null;
    if (saved === "pro" || saved === "property" || saved === "facility" || saved === "security") return saved;
    return "pro";
  });

  const [tabTitleLocked, setTabTitleLocked] = useState(false);

  const setActiveTabPersisted = (id: ModuleId) => {
    setTabTitleLocked(true);
    setActiveTab(id);
    try {
      localStorage.setItem("kiperfy_active_tab", id);
    } catch {
      /* ignore */
    }
  };
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupModule, setSignupModule] = useState<ModuleId>("pro");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openSignup = (m: ModuleId) => {
    setSignupModule(m);
    setSignupOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-kiperfy-text antialiased">
      <Navbar
        lang={lang}
        setLang={setLang}
        onLogin={() => setLoginOpen(true)}
        onSignup={() => openSignup("pro")}
        scrolled={scrolled}
      />

      {/* ===== HERO ===== */}
      <section id="hero" className="relative overflow-hidden pt-32 pb-12 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-kiperfy-cyan/10 via-kiperfy-green/15 to-white" />
        <Clouds />

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Modules"
            className="hero-enter hero-enter-1 mx-auto mb-10 flex w-fit flex-wrap items-center justify-center gap-2 rounded-full bg-white/80 p-2 shadow-md ring-1 ring-white/60 backdrop-blur-md"
          >
            {(["pro", "property", "facility", "security"] as const).map((id) => {
              const isActive = activeTab === id;
              const isPro = id === "pro";
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTabPersisted(id)}
                  onKeyDown={(e) => {
                    const order: ModuleId[] = ["pro", "property", "facility", "security"];
                    const i = order.indexOf(id);
                    if (e.key === "ArrowRight") setActiveTabPersisted(order[(i + 1) % 4]);
                    if (e.key === "ArrowLeft") setActiveTabPersisted(order[(i + 3) % 4]);
                  }}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-kiperfy-cyan to-kiperfy-green text-white shadow"
                      : "text-kiperfy-text hover:bg-white"
                  } ${isPro && !isActive ? "ring-2 ring-kiperfy-green/40" : ""}`}
                >
                  {t(`hero_tab_${id}` as CopyKey)}
                  {isPro && (
                    <span className="ml-2 hidden rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wide sm:inline">
                      {t("hero_pro_badge")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative isolate">
            <HeroSpotlight />
            <div className="relative z-10">
              <TabPanel
                id={activeTab}
                onCta={() => openSignup(activeTab)}
                onLogin={() => setLoginOpen(true)}
              />
            </div>
          </div>
        </div>
      </section>

      <MetricsSection />

      <TeamEarnsSection />

      <ModuleFeaturesSection activeTab={activeTab} tabTitleLocked={tabTitleLocked} />

      <PricingSection onSignup={(m) => openSignup(m)} />

      <LeadQualificationSection />

      <PreviewSection />

      <ReviewsSection />

      <SiteFooter />

      {/* Modals */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={() => { setLoginOpen(false); openSignup("pro"); }}
      />
      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        initialModule={signupModule}
        onSwitchToLogin={() => { setSignupOpen(false); setLoginOpen(true); }}
      />
    </div>
  );
}

/* ============ Subcomponents ============ */

function Navbar({
  lang,
  setLang,
  onLogin,
  onSignup,
  scrolled,
}: {
  lang: "es" | "en";
  setLang: (l: "es" | "en") => void;
  onLogin: () => void;
  onSignup: () => void;
  scrolled: boolean;
}) {
  const { t } = useLang();
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-6xl px-4">
        <nav className={`flex items-center justify-between gap-3 rounded-full bg-white/80 px-3 py-2 backdrop-blur-xl transition-all ${scrolled ? "shadow-lg ring-kiperfy-button/30" : "shadow-md ring-1 ring-white/60"}`}>
          <div className="flex min-w-0 flex-1 items-center gap-5 pl-1 lg:gap-8">
            <a href="#" className="flex shrink-0 items-center">
              <img
                src="/kiperfy-logo.png"
                alt="Kiperfy"
                className="h-10 w-10 rounded-xl"
                width={40}
                height={40}
              />
            </a>

            <ul className="hidden items-center gap-6 text-sm font-medium text-kiperfy-text lg:flex lg:gap-7">
              <li><a href="#hero" className="hover:text-kiperfy-cyan">{t("nav_modules")}</a></li>
              <li><a href="#app" className="hover:text-kiperfy-cyan">{t("nav_app")}</a></li>
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="flex items-center rounded-full bg-kiperfy-button/30 p-0.5 text-xs font-bold">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-3 py-1 uppercase transition ${
                    lang === l ? "bg-white text-kiperfy-cyan shadow-sm" : "text-kiperfy-grey"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button onClick={onLogin} className="hidden rounded-full px-3 py-2 text-sm font-semibold text-kiperfy-text hover:bg-kiperfy-button/30 sm:inline-flex">
              {t("nav_login")}
            </button>
            <button onClick={onSignup} className="rounded-full bg-kiperfy-button px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-kiperfy-grey">
              {t("nav_signup")}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Cloud className="left-[5%] top-[20%] h-12 w-32 opacity-90" />
      <Cloud className="left-[15%] top-[60%] h-10 w-24 opacity-70" />
      <Cloud className="right-[8%] top-[25%] h-14 w-36 opacity-90" />
      <Cloud className="right-[18%] top-[65%] h-10 w-28 opacity-75" />
      <Cloud className="left-[42%] top-[8%] h-8 w-20 opacity-60" />
    </div>
  );
}

function Cloud({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-full bg-white" />
        <div className="absolute bottom-1/4 left-[15%] h-3/4 w-1/2 rounded-full bg-white" />
        <div className="absolute bottom-1/3 right-[10%] h-2/3 w-2/5 rounded-full bg-white" />
      </div>
    </div>
  );
}

const HEADLINE_PRIMARY =
  "max-w-[22em] text-pretty font-bold tracking-[-0.03em] text-kiperfy-text text-[1.5rem] leading-[1.1] sm:text-[2.125rem] sm:leading-[1.08] lg:text-[2.65rem] lg:leading-[1.06] xl:text-[2.975rem] xl:leading-[1.05]";
const HEADLINE_SECONDARY =
  "mt-5 max-w-[22em] text-pretty font-semibold tracking-[-0.02em] text-kiperfy-text text-xl leading-snug sm:text-2xl lg:mt-6 lg:text-[1.75rem] lg:leading-tight";
const HEADLINE_TITLE =
  "max-w-[20em] text-pretty font-semibold tracking-[-0.025em] text-kiperfy-text text-3xl leading-[1.06] sm:text-4xl lg:text-[2.625rem] lg:leading-[1.04] xl:text-[3.5rem] xl:leading-[1.03]";

function HeroHeadline({
  text,
  variant = "primary",
  animateKey,
}: {
  text: string;
  variant?: "primary" | "secondary" | "title";
  animateKey: string;
}) {
  const lines = splitHeadline(text);
  const className =
    variant === "title" ? HEADLINE_TITLE : variant === "secondary" ? HEADLINE_SECONDARY : HEADLINE_PRIMARY;
  const Tag = variant === "secondary" ? "p" : "h1";
  const lineOffset = variant === "secondary" ? 1 : 0;

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={`${animateKey}-${i}`}
          className={cn(
            "hero-title-line",
            `hero-title-line-${Math.min(i + lineOffset, 2)}`,
            i > 0 && "mt-1 sm:mt-1.5",
          )}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}

/* ----- Hero tab panel ----- */
function TabPanel({ id, onCta, onLogin }: { id: ModuleId; onCta: () => void; onLogin: () => void }) {
  const { t } = useLang();

  const heading = t(`${id}_heading` as CopyKey);
  const hook = t(`${id}_hook` as CopyKey);
  const sub = t(`${id}_sub` as CopyKey);

  return (
    <div key={id} role="tabpanel" className="grid items-center gap-12 md:grid-cols-2">
      <div className="relative z-10 max-w-xl lg:max-w-none">
        {heading ? <HeroHeadline text={heading} variant="title" animateKey={`${id}-h`} /> : null}
        <HeroHeadline
          text={hook}
          variant={heading ? "secondary" : "primary"}
          animateKey={`${id}-hook`}
        />
        <p
          className={`hero-enter ${heading ? "hero-enter-3" : "hero-enter-2"} mt-5 max-w-lg text-pretty text-base leading-relaxed text-kiperfy-grey sm:mt-6 sm:text-lg lg:max-w-xl lg:text-xl lg:leading-relaxed`}
        >
          {sub}
        </p>
        <div className={`hero-enter ${heading ? "hero-enter-4" : "hero-enter-3"} mt-9`}>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onCta}
              className="rounded-full bg-kiperfy-button px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-kiperfy-button/30 transition hover:bg-kiperfy-grey"
            >
              {t("hero_cta")}
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-kiperfy-purple shadow-sm ring-1 ring-kiperfy-button/30 transition hover:bg-kiperfy-purple/10"
            >
              {t("nav_login")}
            </button>
          </div>
          <p className="mt-3 text-xs text-kiperfy-grey sm:text-sm">{t("hero_cta_fineprint")}</p>
        </div>
      </div>

      <div className={`hero-enter ${heading ? "hero-enter-5" : "hero-enter-4"}`}>
        <HeroProductMedia />
      </div>
    </div>
  );
}
