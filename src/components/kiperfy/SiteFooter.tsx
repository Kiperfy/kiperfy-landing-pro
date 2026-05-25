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
    <section className="bg-white px-4 pb-10 pt-10 sm:px-6 sm:pb-12">
      <footer className="relative overflow-hidden rounded-[2rem] bg-[#232628] text-white shadow-2xl sm:rounded-[2.5rem]">
        <FooterPattern />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            {/* Contact + stores + social */}
            <div>
              <h3 className="text-lg font-bold text-white">{t("footer_contact")}</h3>
              <address className="mt-4 space-y-1.5 text-sm not-italic leading-relaxed text-white/70">
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

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
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

              <div className="mt-6 flex items-center gap-4">
                <a
                  href="#"
                  aria-label={t("footer_social_whatsapp")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-kiperfy-cyan/40 hover:bg-white/10 hover:text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label={t("footer_social_instagram")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-kiperfy-cyan/40 hover:bg-white/10 hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="sm:text-right">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:ml-auto sm:max-w-xs">
                <ul className="space-y-2">
                  {navCol1.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="text-sm text-white/70 transition hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {navCol2.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="text-sm text-white/70 transition hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs leading-relaxed text-white/50 sm:text-right">
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
