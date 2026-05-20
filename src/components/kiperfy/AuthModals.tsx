import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Eye, EyeOff, Lock, X, Check } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";

export type ModuleId = "pro" | "property" | "facility" | "security";

/* ============ Shared modal shell ============ */
function ModalShell({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const focusables = ref.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    setTimeout(() => ref.current?.querySelector<HTMLElement>("input, button")?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-screen w-full flex-col overflow-y-auto bg-white p-6 shadow-2xl sm:max-h-[92vh] sm:w-[480px] sm:max-w-full sm:rounded-2xl sm:p-8"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

function CloseBtn({ onClose, label }: { onClose: () => void; label: string }) {
  return (
    <button
      onClick={onClose}
      aria-label={label}
      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
    >
      <X className="h-5 w-5" />
    </button>
  );
}

function GoogleBtn({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {/* OAuth placeholder */}}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.99.66-2.26 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.42 3.44 1.18 4.94l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.45 2.1 14.96 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"/>
      </svg>
      {label}
    </button>
  );
}

function PasswordInput({
  placeholder,
  showLabel,
  value,
  onChange,
}: {
  placeholder: string;
  showLabel: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20"
      />
      <button
        type="button"
        aria-label={showLabel}
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
      >
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20 ${props.className ?? ""}`}
    />
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs text-slate-500">{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

/* ============ LOGIN MODAL ============ */
export function LoginModal({
  open,
  onClose,
  onSwitchToSignup,
}: {
  open: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}) {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <ModalShell open={open} onClose={onClose} labelledBy="login-title">
      <CloseBtn onClose={onClose} label={t("modal_close")} />
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#22c1d6] to-[#3ddc97] text-white">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M6 18V6m0 6l8-6m-8 6l8 6"/></svg>
      </div>
      <h2 id="login-title" className="text-center text-2xl font-semibold text-slate-900">{t("login_headline")}</h2>
      <p className="mt-1 text-center text-sm text-slate-600">{t("login_sub")}</p>

      <div className="mt-6 space-y-4">
        <Divider label={t("login_or")} />
        <GoogleBtn label={t("login_google")} />
        <div className="space-y-3">
          <TextInput type="email" placeholder={t("login_email_ph")} value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput placeholder={t("login_password_ph")} showLabel={t("show_password")} value={pass} onChange={setPass} />
          <div className="text-right">
            <a href="#" className="text-xs font-medium text-[#1D9E75] hover:underline">{t("login_forgot")}</a>
          </div>
        </div>
        <button className="h-12 w-full rounded-xl bg-[#1D9E75] text-sm font-semibold text-white shadow-md transition hover:bg-[#0F6E56]">
          {t("login_cta")}
        </button>
        <p className="text-center text-sm text-slate-600">
          {t("login_footer")}{" "}
          <button onClick={onSwitchToSignup} className="font-semibold text-[#1D9E75] hover:underline">
            {t("login_footer_link")}
          </button>
        </p>
      </div>
    </ModalShell>
  );
}

/* ============ SIGNUP MODAL ============ */
const PLANS: { id: ModuleId; nameKey: CopyKey; f: [CopyKey, CopyKey, CopyKey] }[] = [
  { id: "pro", nameKey: "plan_pro", f: ["plan_pro_f1", "plan_pro_f2", "plan_pro_f3"] },
  { id: "property", nameKey: "plan_property", f: ["plan_property_f1", "plan_property_f2", "plan_property_f3"] },
  { id: "facility", nameKey: "plan_facility", f: ["plan_facility_f1", "plan_facility_f2", "plan_facility_f3"] },
  { id: "security", nameKey: "plan_security", f: ["plan_security_f1", "plan_security_f2", "plan_security_f3"] },
];

export function SignupModal({
  open,
  onClose,
  initialModule,
  onSwitchToLogin,
}: {
  open: boolean;
  onClose: () => void;
  initialModule: ModuleId;
  onSwitchToLogin: () => void;
}) {
  const { t } = useLang();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<ModuleId>(initialModule);

  // form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [propName, setPropName] = useState("");
  const [propCount, setPropCount] = useState("1");
  const [units, setUnits] = useState("");

  // Reset on open with new module
  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedPlan(initialModule);
    }
  }, [open, initialModule]);

  return (
    <ModalShell open={open} onClose={onClose} labelledBy="signup-title">
      <CloseBtn onClose={onClose} label={t("modal_close")} />

      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step >= n ? "bg-[#1D9E75] text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {step > n ? <Check className="h-4 w-4" /> : n}
            </div>
            {n < 3 && (
              <div className={`h-1 flex-1 rounded-full ${step > n ? "bg-[#1D9E75]" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <>
          <h2 id="signup-title" className="text-2xl font-semibold text-slate-900">{t("signup_step1_title")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("signup_step1_sub")}</p>
          <div className="mt-6 space-y-4">
            <GoogleBtn label={t("signup_step1_google")} />
            <Divider label={t("signup_step1_or")} />
            <TextInput placeholder={t("signup_step1_name")} value={name} onChange={(e) => setName(e.target.value)} />
            <TextInput type="email" placeholder={t("signup_step1_email")} value={email} onChange={(e) => setEmail(e.target.value)} />
            <div>
              <PasswordInput placeholder={t("signup_step1_password")} showLabel={t("show_password")} value={pass} onChange={setPass} />
              <p className="mt-1 pl-1 text-xs text-slate-500">{t("signup_step1_password_hint")}</p>
            </div>
            <PasswordInput placeholder={t("signup_step1_confirm")} showLabel={t("show_password")} value={confirm} onChange={setConfirm} />
            <button onClick={() => setStep(2)} className="h-12 w-full rounded-xl bg-[#1D9E75] text-sm font-semibold text-white shadow-md transition hover:bg-[#0F6E56]">
              {t("signup_continue")}
            </button>
            <p className="text-center text-sm text-slate-600">
              {t("signup_step1_footer")}{" "}
              <button onClick={onSwitchToLogin} className="font-semibold text-[#1D9E75] hover:underline">
                {t("signup_step1_footer_link")}
              </button>
            </p>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 id="signup-title" className="text-2xl font-semibold text-slate-900">{t("signup_step2_title")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("signup_step2_sub")}</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">{t("signup_step2_propname")}</label>
              <TextInput placeholder={t("signup_step2_propname_ph")} value={propName} onChange={(e) => setPropName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">{t("signup_step2_propcount")}</label>
                <TextInput type="number" min={1} value={propCount} onChange={(e) => setPropCount(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">{t("signup_step2_units")}</label>
                <TextInput type="number" min={1} placeholder={t("signup_step2_units_ph")} value={units} onChange={(e) => setUnits(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">{t("signup_step2_role")}</label>
              <div className="flex h-12 items-center justify-between rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-700" title={t("signup_step2_role_tip")}>
                <span>{t("signup_step2_role_val")}</span>
                <Lock className="h-4 w-4 text-slate-500" />
              </div>
              <p className="mt-1 pl-1 text-xs text-slate-500">{t("signup_step2_role_tip")}</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(1)} className="h-12 rounded-xl px-5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                {t("signup_back")}
              </button>
              <button onClick={() => setStep(3)} className="h-12 flex-1 rounded-xl bg-[#1D9E75] text-sm font-semibold text-white shadow-md transition hover:bg-[#0F6E56]">
                {t("signup_continue")}
              </button>
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 id="signup-title" className="text-2xl font-semibold text-slate-900">{t("signup_step3_title")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("signup_step3_sub")}</p>
          <div role="radiogroup" className="mt-6 grid grid-cols-2 gap-3">
            {PLANS.map((p) => {
              const selected = selectedPlan === p.id;
              const isPro = p.id === "pro";
              return (
                <button
                  key={p.id}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`relative flex flex-col rounded-2xl border-2 p-4 text-left transition ${
                    selected
                      ? "border-[#1D9E75] bg-[#E1F5EE] shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  {isPro && (
                    <span className="absolute -top-2 right-3 rounded-full bg-[#1D9E75] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {t("signup_step3_recommended")}
                    </span>
                  )}
                  <div className="text-sm font-bold text-slate-900">{t(p.nameKey)}</div>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600">
                    {p.f.map((k) => (
                      <li key={k} className="flex gap-1">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#1D9E75]" />
                        <span>{t(k)}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-3 inline-flex w-fit rounded-full bg-[#1D9E75]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0F6E56]">
                    {t("signup_step3_trial_badge")}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 space-y-3">
            <button className="h-12 w-full rounded-xl bg-[#1D9E75] text-sm font-semibold text-white shadow-md transition hover:bg-[#0F6E56]">
              {t("signup_step3_cta")}
            </button>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(2)} className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                {t("signup_back")}
              </button>
              <p className="text-xs text-slate-500">{t("signup_step3_fineprint")}</p>
            </div>
          </div>
        </>
      )}
    </ModalShell>
  );
}
