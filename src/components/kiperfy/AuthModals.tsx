import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Eye, EyeOff, X } from "lucide-react";
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
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-kiperfy-text/50 backdrop-blur-sm sm:items-center sm:p-4"
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
      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-kiperfy-grey transition hover:bg-kiperfy-button/30 hover:text-kiperfy-text"
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
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-kiperfy-button/30 bg-white px-4 py-3 text-sm font-semibold text-kiperfy-text transition hover:bg-kiperfy-button/30"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-kiperfy-cyan to-kiperfy-green text-xs font-bold text-white" aria-hidden>
        G
      </span>
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
        className="h-12 w-full rounded-xl border border-kiperfy-button/30 bg-white px-4 pr-12 text-sm text-kiperfy-text outline-none transition focus:border-kiperfy-green focus:ring-2 focus:ring-kiperfy-green/20"
      />
      <button
        type="button"
        aria-label={showLabel}
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-kiperfy-grey hover:text-kiperfy-text"
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
      className={`h-12 w-full rounded-xl border border-kiperfy-button/30 bg-white px-4 text-sm text-kiperfy-text outline-none transition focus:border-kiperfy-green focus:ring-2 focus:ring-kiperfy-green/20 ${props.className ?? ""}`}
    />
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-kiperfy-text">{label}</label>
      {children}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-kiperfy-button/30" />
      <span className="text-xs text-kiperfy-grey">{label}</span>
      <div className="h-px flex-1 bg-kiperfy-button/30" />
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
      <img
        src="/kiperfy-logo.png"
        alt="Kiperfy"
        width={48}
        height={48}
        className="mx-auto mb-5 h-12 w-12 rounded-xl"
      />
      <h2 id="login-title" className="text-center text-2xl font-semibold text-kiperfy-text">{t("login_headline")}</h2>
      <p className="mt-1 text-center text-sm text-kiperfy-grey">{t("login_sub")}</p>

      <div className="mt-6 space-y-4">
        <Divider label={t("login_or")} />
        <GoogleBtn label={t("login_google")} />
        <div className="space-y-3">
          <TextInput type="email" placeholder={t("login_email_ph")} value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput placeholder={t("login_password_ph")} showLabel={t("show_password")} value={pass} onChange={setPass} />
          <div className="text-right">
            <a href="#" className="text-xs font-medium text-kiperfy-cyan hover:underline">{t("login_forgot")}</a>
          </div>
        </div>
        <button className="h-12 w-full rounded-xl bg-kiperfy-button text-sm font-semibold text-white shadow-md transition hover:bg-kiperfy-grey">
          {t("login_cta")}
        </button>
        <p className="text-center text-sm text-kiperfy-grey">
          {t("login_footer")}{" "}
          <button onClick={onSwitchToSignup} className="font-semibold text-kiperfy-cyan hover:underline">
            {t("login_footer_link")}
          </button>
        </p>
      </div>
    </ModalShell>
  );
}

/* ============ SIGNUP MODAL ============ */
const SIGNUP_MODULES: ModuleId[] = ["pro", "property", "facility", "security"];

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
  const [selectedPlan, setSelectedPlan] = useState<ModuleId>(initialModule);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [propName, setPropName] = useState("");
  const [propCount, setPropCount] = useState("1");
  const [units, setUnits] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedPlan(initialModule);
    }
  }, [open, initialModule]);

  return (
    <ModalShell open={open} onClose={onClose} labelledBy="signup-title">
      <CloseBtn onClose={onClose} label={t("modal_close")} />

      <h2 id="signup-title" className="text-2xl font-semibold text-kiperfy-text">{t("signup_step1_title")}</h2>
      <p className="mt-1 text-sm text-kiperfy-grey">{t("signup_step1_sub")}</p>

      <div className="mt-6 space-y-4">
        <GoogleBtn label={t("signup_step1_google")} />
        <Divider label={t("signup_step1_or")} />

        <TextInput placeholder={t("signup_step1_name")} value={name} onChange={(e) => setName(e.target.value)} />
        <TextInput type="email" placeholder={t("signup_step1_email")} value={email} onChange={(e) => setEmail(e.target.value)} />
        <div>
          <PasswordInput placeholder={t("signup_step1_password")} showLabel={t("show_password")} value={pass} onChange={setPass} />
          <p className="mt-1 pl-1 text-xs text-kiperfy-grey">{t("signup_step1_password_hint")}</p>
        </div>
        <PasswordInput placeholder={t("signup_step1_confirm")} showLabel={t("show_password")} value={confirm} onChange={setConfirm} />

        <FormField label={t("signup_step2_propname")}>
          <TextInput placeholder={t("signup_step2_propname_ph")} value={propName} onChange={(e) => setPropName(e.target.value)} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label={t("signup_step2_propcount")}>
            <TextInput type="number" min={1} value={propCount} onChange={(e) => setPropCount(e.target.value)} />
          </FormField>
          <FormField label={t("signup_step2_units")}>
            <TextInput type="number" min={1} placeholder={t("signup_step2_units_ph")} value={units} onChange={(e) => setUnits(e.target.value)} />
          </FormField>
        </div>
        <FormField label={t("signup_step2_phone")}>
          <TextInput type="tel" placeholder={t("signup_step2_phone_ph")} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormField>
        <FormField label={t("signup_step2_birthdate")}>
          <TextInput type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </FormField>

        <FormField label={t("signup_step3_title")}>
          <div role="radiogroup" aria-label={t("signup_step3_title")} className="grid grid-cols-2 gap-2">
            {SIGNUP_MODULES.map((id) => {
              const selected = selectedPlan === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSelectedPlan(id)}
                  className={`rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition ${
                    selected
                      ? "border-kiperfy-green bg-kiperfy-green/10 text-kiperfy-text"
                      : "border-kiperfy-button/30 text-kiperfy-grey hover:border-kiperfy-cyan"
                  }`}
                >
                  {t(`hero_tab_${id}` as CopyKey)}
                </button>
              );
            })}
          </div>
        </FormField>

        <button type="button" className="h-12 w-full rounded-xl bg-kiperfy-button text-sm font-semibold text-white shadow-md transition hover:bg-kiperfy-grey">
          {t("signup_step3_cta")}
        </button>
        <p className="text-center text-xs text-kiperfy-text/30">{t("signup_step3_fineprint")}</p>
        <p className="text-center text-sm text-kiperfy-grey">
          {t("signup_step1_footer")}{" "}
          <button type="button" onClick={onSwitchToLogin} className="font-semibold text-kiperfy-cyan hover:underline">
            {t("signup_step1_footer_link")}
          </button>
        </p>
      </div>
    </ModalShell>
  );
}
