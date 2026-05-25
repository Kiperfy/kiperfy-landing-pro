import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Receipt,
  Gift,
  Wrench,
  Bell,
  QrCode,
  Smartphone,
  Check,
  ChevronDown,
  Instagram,
  MessageCircleMore,
} from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";
import { LoginModal, SignupModal, type ModuleId } from "@/components/kiperfy/AuthModals";
import { MetricsSection } from "@/components/kiperfy/MetricsSection";
import { PreviewSection } from "@/components/kiperfy/PreviewSection";
import { ModuleFeaturesSection } from "@/components/kiperfy/ModuleFeaturesSection";
import { ReviewsSection } from "@/components/kiperfy/ReviewsSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, lang, setLang } = useLang();
  const [activeTab, setActiveTab] = useState<ModuleId>("pro");
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
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-kiperfy-cyan/10 via-kiperfy-green/15 to-white" />
        <Clouds />

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Tabs */}
          <div role="tablist" aria-label="Modules" className="mx-auto mb-10 flex w-fit flex-wrap items-center justify-center gap-2 rounded-full bg-white/80 p-2 shadow-md ring-1 ring-white/60 backdrop-blur-md">
            {(["pro", "property", "facility", "security"] as const).map((id) => {
              const isActive = activeTab === id;
              const isPro = id === "pro";
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(id)}
                  onKeyDown={(e) => {
                    const order: ModuleId[] = ["pro", "property", "facility", "security"];
                    const i = order.indexOf(id);
                    if (e.key === "ArrowRight") setActiveTab(order[(i + 1) % 4]);
                    if (e.key === "ArrowLeft") setActiveTab(order[(i + 3) % 4]);
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

          <TabPanel
            id={activeTab}
            onCta={() => openSignup(activeTab)}
            onLogin={() => setLoginOpen(true)}
          />
        </div>
      </section>

      {/* ===== METRICS ===== */}
      <MetricsSection />

      {/* ===== FEATURES (synced with hero tab) ===== */}
      <ModuleFeaturesSection moduleId={activeTab} />

      {/* ===== APP PREVIEW ===== */}
      <PreviewSection />

      {/* ===== REVIEWS ===== */}
      <ReviewsSection />

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-kiperfy-chat-cyan/10 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-kiperfy-text sm:text-5xl">
            {t("how_title")}
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[t("how_step1"), t("how_step2"), t("how_step3")].map((s, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-kiperfy-cyan to-kiperfy-green text-lg font-bold text-white">
                  {i + 1}
                </div>
                <p className="mt-5 text-lg font-semibold text-kiperfy-text">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APP DOWNLOAD ===== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-kiperfy-text sm:text-4xl">
            {t("download_title")}
          </h2>
          <p className="mt-4 text-base text-kiperfy-grey">{t("download_sub")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <StoreBtn label="App Store" sub="Download on the" />
            <StoreBtn label="Google Play" sub="Get it on" />
            <StoreBtn label="AppGallery" sub="Explore it on" />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-kiperfy-text py-12 text-kiperfy-button/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-kiperfy-cyan to-kiperfy-green text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M6 18V6m0 6l8-6m-8 6l8 6"/></svg>
            </div>
            <span className="text-sm font-semibold text-white">Kiperfy</span>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <a href="#" aria-label="WhatsApp" className="hover:text-white"><MessageCircleMore className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-white">{t("footer_privacy")}</a>
            <a href="#" className="hover:text-white">{t("footer_terms")}</a>
            <div className="relative">
              <select className="appearance-none rounded-md border border-kiperfy-grey bg-kiperfy-grey py-1.5 pl-3 pr-8 text-xs text-white">
                <option>México</option><option>USA</option><option>Colombia</option><option>Chile</option><option>Perú</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-kiperfy-button/30" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-6 text-center text-xs text-kiperfy-button/30">
          © {new Date().getFullYear()} Kiperfy. {t("footer_rights")}
        </div>
      </footer>

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
        <nav className={`flex items-center justify-between gap-3 rounded-full bg-white/80 px-3 py-2 backdrop-blur-xl transition-all ${scrolled ? "shadow-lg ring-1 ring-kiperfy-button/30" : "shadow-md ring-1 ring-white/60"}`}>
          <a href="#" className="flex shrink-0 items-center pl-1">
            <img
              src="/kiperfy-logo.png"
              alt="Kiperfy"
              className="h-10 w-10 rounded-xl"
              width={40}
              height={40}
            />
          </a>

          <ul className="hidden items-center gap-7 text-sm font-medium text-kiperfy-text lg:flex">
            <li><a href="#" className="hover:text-kiperfy-cyan">{t("nav_home")}</a></li>
            <li><a href="#features" className="hover:text-kiperfy-cyan">{t("nav_about")}</a></li>
            <li><a href="#features" className="hover:text-kiperfy-cyan">{t("nav_app")}</a></li>
            <li><a href="#features" className="hover:text-kiperfy-cyan">{t("nav_cities")}</a></li>
            <li><a href="#features" className="hover:text-kiperfy-cyan">{t("nav_download")}</a></li>
          </ul>

          <div className="flex items-center gap-2">
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

/* ----- Hero tab panel ----- */
function TabPanel({ id, onCta, onLogin }: { id: ModuleId; onCta: () => void; onLogin: () => void }) {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const tm = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(tm);
  }, [id]);

  const heading = t(`${id}_heading` as CopyKey);
  const hook = t(`${id}_hook` as CopyKey);
  const sub = t(`${id}_sub` as CopyKey);
  const cta = t(`${id}_cta` as CopyKey);
  const features = [1, 2, 3, 4].map((n) => t(`${id}_f${n}` as CopyKey));

  return (
    <div
      role="tabpanel"
      className={`grid items-center gap-12 transition-opacity duration-200 md:grid-cols-2 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div>
        {heading ? (
          <h1 className="text-3xl font-semibold leading-[1.05] tracking-tight text-kiperfy-text sm:text-4xl lg:text-5xl">
            {heading}
          </h1>
        ) : null}
        <p className={`text-xl font-semibold leading-snug text-kiperfy-text sm:text-2xl ${heading ? "mt-5" : ""}`}>{hook}</p>
        <p className="mt-4 text-base leading-relaxed text-kiperfy-grey sm:text-lg">{sub}</p>
        <ul className="mt-7 grid grid-cols-2 gap-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm font-medium text-kiperfy-text">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-kiperfy-green" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <button
            onClick={onCta}
            className="rounded-full bg-kiperfy-button px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-kiperfy-button/30 transition hover:bg-kiperfy-grey"
          >
            {cta}
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-kiperfy-purple shadow-sm ring-1 ring-kiperfy-button/30 transition hover:bg-kiperfy-purple/10"
          >
            {t("nav_login")}
          </button>
        </div>
      </div>

      <MockupCard id={id} />
    </div>
  );
}

function MockupCard({ id }: { id: ModuleId }) {
  const gradient: Record<ModuleId, string> = {
    pro: "from-kiperfy-cyan to-kiperfy-green",
    property: "from-kiperfy-cyan to-kiperfy-chart-green",
    facility: "from-kiperfy-chart-yellow to-kiperfy-pink",
    security: "from-kiperfy-chart-blue to-kiperfy-chart-purple",
  };
  const Icon = id === "pro" ? Gift : id === "property" ? Receipt : id === "facility" ? Wrench : QrCode;

  return (
    <div className="relative flex aspect-[4/5] w-full max-w-md justify-self-center">
      <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${gradient[id]} shadow-2xl ring-1 ring-black/5`} />
      <div className="relative m-3 flex w-full flex-col rounded-[2rem] bg-white/15 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/30 text-white">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-white capitalize">{id}</span>
          </div>
          <Bell className="h-5 w-5 text-white/80" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-3 w-3/4 rounded-full bg-white/70" />
          <div className="h-3 w-1/2 rounded-full bg-white/50" />
        </div>
        <div className="mt-5 grid flex-1 grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-white/25 p-3">
              <div className="h-6 w-6 rounded-lg bg-white/60" />
              <div className="mt-3 h-2 w-3/4 rounded-full bg-white/70" />
              <div className="mt-1.5 h-2 w-1/2 rounded-full bg-white/40" />
            </div>
          ))}
        </div>
        <div className="mt-4 h-10 rounded-xl bg-white/80" />
      </div>
    </div>
  );
}

function StoreBtn({ label, sub }: { label: string; sub: string }) {
  return (
    <button className="flex items-center gap-3 rounded-xl bg-kiperfy-text px-5 py-3 text-left text-white transition hover:bg-kiperfy-grey">
      <Smartphone className="h-6 w-6" />
      <div>
        <div className="text-[10px] uppercase tracking-wide text-kiperfy-button/30">{sub}</div>
        <div className="text-sm font-bold">{label}</div>
      </div>
    </button>
  );
}
