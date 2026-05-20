import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Receipt,
  CreditCard,
  Gift,
  Wrench,
  Bell,
  QrCode,
  Smartphone,
  BarChart3,
  MessageCircle,
  Boxes,
  Check,
  ChevronDown,
  Instagram,
  MessageCircleMore,
} from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";
import { LoginModal, SignupModal, type ModuleId } from "@/components/kiperfy/AuthModals";

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
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Navbar
        lang={lang}
        setLang={setLang}
        onLogin={() => setLoginOpen(true)}
        onSignup={() => openSignup("pro")}
        scrolled={scrolled}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E1F5EE] via-[#cfeede] to-white" />
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
                      ? "bg-[#1D9E75] text-white shadow"
                      : "text-slate-700 hover:bg-white"
                  } ${isPro && !isActive ? "ring-2 ring-[#1D9E75]/40" : ""}`}
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

          <TabPanel id={activeTab} onCta={() => openSignup(activeTab)} />
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="border-y border-slate-100 bg-white py-6">
        <p className="mx-auto max-w-4xl px-6 text-center text-sm font-medium text-slate-600 sm:text-base">
          {t("social_proof")}
        </p>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section id="features" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {t("features_title")}
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<Receipt />} title={t("feature_finance_t")} desc={t("feature_finance_d")} />
            <FeatureCard icon={<CreditCard />} title={t("feature_payments_t")} desc={t("feature_payments_d")} />
            <FeatureCard icon={<QrCode />} title={t("feature_access_t")} desc={t("feature_access_d")} />
            <FeatureCard icon={<Wrench />} title={t("feature_tickets_t")} desc={t("feature_tickets_d")} />
            <FeatureCard icon={<Boxes />} title={t("feature_assets_t")} desc={t("feature_assets_d")} />
            <FeatureCard icon={<MessageCircle />} title={t("feature_comms_t")} desc={t("feature_comms_d")} />
            <FeatureCard icon={<BarChart3 />} title={t("feature_reports_t")} desc={t("feature_reports_d")} />
            <FeatureCard icon={<Smartphone />} title={t("feature_mobile_t")} desc={t("feature_mobile_d")} />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-[#E1F5EE]/60 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {t("how_title")}
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[t("how_step1"), t("how_step2"), t("how_step3")].map((s, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1D9E75] text-lg font-bold text-white">
                  {i + 1}
                </div>
                <p className="mt-5 text-lg font-semibold text-slate-900">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APP DOWNLOAD ===== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {t("download_title")}
          </h2>
          <p className="mt-4 text-base text-slate-600">{t("download_sub")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <StoreBtn label="App Store" sub="Download on the" />
            <StoreBtn label="Google Play" sub="Get it on" />
            <StoreBtn label="AppGallery" sub="Explore it on" />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#22c1d6] to-[#3ddc97] text-white">
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
              <select className="appearance-none rounded-md border border-slate-700 bg-slate-800 py-1.5 pl-3 pr-8 text-xs text-slate-200">
                <option>México</option><option>USA</option><option>Colombia</option><option>Chile</option><option>Perú</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-6 text-center text-xs text-slate-500">
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
        <nav className={`flex items-center justify-between gap-3 rounded-full bg-white/80 px-3 py-2 backdrop-blur-xl transition-all ${scrolled ? "shadow-lg ring-1 ring-slate-200" : "shadow-md ring-1 ring-white/60"}`}>
          <div className="flex items-center gap-2 pl-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#22c1d6] to-[#3ddc97] text-white shadow">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M6 18V6m0 6l8-6m-8 6l8 6"/></svg>
            </div>
            <span className="hidden text-sm font-bold text-slate-900 sm:inline">Kiperfy</span>
          </div>

          <ul className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
            <li><a href="#" className="hover:text-slate-950">{t("nav_home")}</a></li>
            <li><a href="#features" className="hover:text-slate-950">{t("nav_about")}</a></li>
            <li><a href="#features" className="hover:text-slate-950">{t("nav_app")}</a></li>
            <li><a href="#features" className="hover:text-slate-950">{t("nav_cities")}</a></li>
            <li><a href="#features" className="hover:text-slate-950">{t("nav_download")}</a></li>
          </ul>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full bg-slate-100 p-0.5 text-xs font-bold">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-3 py-1 uppercase transition ${
                    lang === l ? "bg-white text-[#0F6E56] shadow-sm" : "text-slate-500"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button onClick={onLogin} className="hidden rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:inline-flex">
              {t("nav_login")}
            </button>
            <button onClick={onSignup} className="rounded-full bg-[#1D9E75] px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-[#0F6E56]">
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
function TabPanel({ id, onCta }: { id: ModuleId; onCta: () => void }) {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const tm = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(tm);
  }, [id]);

  const title = t(`${id}_title` as CopyKey);
  const sub = t(`${id}_sub` as CopyKey);
  const cta = t(`${id}_cta` as CopyKey);
  const features = [1, 2, 3, 4].map((n) => t(`${id}_f${n}` as CopyKey));

  return (
    <div
      role="tabpanel"
      className={`grid items-center gap-12 transition-opacity duration-200 md:grid-cols-2 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 text-lg text-slate-700">{sub}</p>
        <ul className="mt-7 grid grid-cols-2 gap-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm font-medium text-slate-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1D9E75]" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <button
            onClick={onCta}
            className="rounded-full bg-[#1D9E75] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1D9E75]/30 transition hover:bg-[#0F6E56]"
          >
            {cta}
          </button>
          <button className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0F6E56] shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50">
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
    pro: "from-[#1D9E75] to-[#0F6E56]",
    property: "from-[#22c1d6] to-[#3ddc97]",
    facility: "from-[#f59e0b] to-[#ef4444]",
    security: "from-[#6366f1] to-[#0f172a]",
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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#1D9E75]/40 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E1F5EE] text-[#0F6E56] transition group-hover:bg-[#1D9E75] group-hover:text-white [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}

function StoreBtn({ label, sub }: { label: string; sub: string }) {
  return (
    <button className="flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-left text-white transition hover:bg-slate-800">
      <Smartphone className="h-6 w-6" />
      <div>
        <div className="text-[10px] uppercase tracking-wide text-slate-300">{sub}</div>
        <div className="text-sm font-bold">{label}</div>
      </div>
    </button>
  );
}
