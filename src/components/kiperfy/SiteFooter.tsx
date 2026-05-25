import { Instagram, MessageCircle } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { STORE_LINKS } from "@/lib/store-links";

function FooterPattern() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.14]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.6'%3E%3Cpath d='M0 120c40-30 80-30 120 0s80 30 120 0'/%3E%3Cpath d='M0 60c40-30 80-30 120 0s80 30 120 0'/%3E%3Cpath d='M0 180c40-30 80-30 120 0s80 30 120 0'/%3E%3Cpath d='M120 0c30 40 30 80 0 120s-30 80 0 120'/%3E%3Cpath d='M60 0c30 40 30 80 0 120s-30 80 0 120'/%3E%3Cpath d='M180 0c30 40 30 80 0 120s-30 80 0 120'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "280px 280px",
      }}
    />
  );
}

export function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const navCol1 = [
    { href: "#features", label: t("footer_link_features") },
    { href: "#hero", label: t("footer_link_modules") },
    { href: "#app", label: t("footer_link_app") },
  ];

  const navCol2 = [
    { href: "#", label: t("footer_privacy") },
    { href: "#", label: t("footer_terms") },
    { href: `mailto:${t("footer_email")}`, label: t("footer_contact") },
  ];

  return (
    <section className="bg-white px-4 sm:px-6">
      <footer className="relative overflow-hidden rounded-[2rem] bg-[#232628] text-white shadow-2xl sm:rounded-[2.5rem]">
        <FooterPattern />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-6 pb-5 sm:px-10 md:pt-8 md:pb-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <h3 className="text-lg font-bold text-white">{t("footer_contact")}</h3>
              <address className="mt-3 space-y-1 not-italic text-[13px] leading-relaxed text-white/70">
                <p>{t("footer_address")}</p>
                <p>
                  <a href={`tel:${t("footer_phone").replace(/\s/g, "")}`} className="hover:text-white">
                    {t("footer_phone")}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${t("footer_email")}`} className="hover:text-white">
                    {t("footer_email")}
                  </a>
                </p>
              </address>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium">
                <a
                  href={STORE_LINKS.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition hover:text-kiperfy-cyan"
                >
                  App Store
                </a>
                <a
                  href={STORE_LINKS.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition hover:text-kiperfy-cyan"
                >
                  Google Play
                </a>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="#"
                  aria-label={t("footer_social_whatsapp")}
                  className="text-white/80 transition hover:text-white"
                >
                  <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
                <a
                  href="#"
                  aria-label={t("footer_social_instagram")}
                  className="text-white/80 transition hover:text-white"
                >
                  <Instagram className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
              </div>
            </div>

            <div className="max-md:mt-0 sm:text-right">
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:ml-auto sm:max-w-xs">
                <ul className="space-y-1.5">
                  {navCol1.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="text-[13px] text-white/70 transition hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1.5">
                  {navCol2.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="text-[13px] text-white/70 transition hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-6 border-t border-white/10 pt-4 text-center text-[13px] leading-relaxed text-white/50 sm:text-right">
            <a href="#" className="transition hover:text-white/80">
              {t("footer_cookies")}
            </a>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            <a href="#" className="transition hover:text-white/80">
              {t("footer_privacy")}
            </a>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            <span>
              © {year} Kiperfy. {t("footer_rights")}
            </span>
          </p>
        </div>
      </footer>
    </section>
  );
}
