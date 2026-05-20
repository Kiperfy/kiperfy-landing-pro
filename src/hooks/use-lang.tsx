import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type CopyKey, type Lang } from "@/lib/kiperfy-copy";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: CopyKey) => string };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("kiperfy_lang")) as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("kiperfy_lang", l); } catch {}
  };

  const t = (k: CopyKey) => copy[lang][k] ?? k;
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be used within LangProvider");
  return c;
}
