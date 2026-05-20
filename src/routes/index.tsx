import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Receipt,
  CreditCard,
  FileText,
  Gift,
  ClipboardList,
  Package,
  QrCode,
  Wrench,
  Bell,
  FileSpreadsheet,
  MousePointer2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [appView, setAppView] = useState<"mobile" | "web">("mobile");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* mint gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#a8eccf] via-[#7fdfbe] to-[#6dd5b0]" />
        {/* clouds */}
        <Clouds />

        {/* floating pill nav */}
        <Navbar />

        <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-32 text-center">
          <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-[88px]">
            Sistema App y Web para operar el sector inmobiliario.
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-lg text-slate-800 sm:text-xl">
            Finanzas, comunicación, seguridad y mantenimientos todo en un mismo
            lugar con una app intuitiva.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full bg-[#6d28d9] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(109,40,217,0.6)] transition hover:bg-[#5b21b6]">
              Inicia Gratis
            </button>
            <button className="rounded-full bg-white px-8 py-4 text-base font-semibold text-[#6d28d9] shadow-sm transition hover:bg-slate-50">
              Quiero información
            </button>
          </div>

          <div className="mt-8 flex justify-center">
            <button className="rounded-full bg-white/70 px-6 py-3 text-sm font-medium text-slate-700 backdrop-blur transition hover:bg-white">
              ¿Que incluye?
            </button>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-lg text-slate-500">
            Operando a escala real desde 2018
          </p>
          <div className="mt-12 grid grid-cols-2 gap-12 md:grid-cols-3">
            <Stat number="70,000+" label="Estados de Cuenta" />
            <Stat number="50,000+" label="Usuarios" />
            <Stat number="125,000+" label="Mantenimientos" />
            <Stat number="1,800,000+" label="Accesos" />
            <Stat number="10,000+" label="Puntos / Cashback" />
            <Stat number="11" label="Países" />
          </div>
        </div>
      </section>

      {/* ===== ¿QUÉ ES KIPERFY? ===== */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-[#22c1d6]">¿Qué es Kiperfy?</span>
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-slate-700 sm:text-2xl">
            Kiperfy es el sistema / app gratuito que te da Puntos y Cashback por
            organizar, pagar y operar tu propiedad de forma fácil.
          </p>
        </div>
      </section>

      {/* ===== APP VIEW TOGGLE ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#eef7f1] py-16">
        <div className="mx-auto flex max-w-6xl justify-center px-6">
          <div className="inline-flex rounded-full bg-white p-1.5 shadow-md ring-1 ring-slate-200">
            <button
              onClick={() => setAppView("mobile")}
              className={`rounded-full px-8 py-3 text-sm font-semibold transition ${
                appView === "mobile"
                  ? "bg-[#ec4899] text-white shadow"
                  : "text-slate-700"
              }`}
            >
              Mobile App
            </button>
            <button
              onClick={() => setAppView("web")}
              className={`rounded-full px-8 py-3 text-sm font-semibold transition ${
                appView === "web"
                  ? "bg-[#ec4899] text-white shadow"
                  : "text-slate-700"
              }`}
            >
              Web App
            </button>
          </div>
        </div>
      </section>

      {/* ===== 3-COLUMN MODULES ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-3">
          <ModuleCol
            tag="Administración"
            heading="Lleva todo lo financiero y la comunicación en orden:"
            items={[
              "Estados de cuenta y pagos en línea",
              "Avisos y comunicación con usuarios",
              "Reservas de áreas comunes",
              "Reportes fáciles de consultar",
            ]}
          />
          <ModuleCol
            tag="Seguridad"
            heading="Controla quién entra y sale de tu propiedad:"
            items={[
              "Registro de visitas y accesos",
              "Códigos QR para entradas",
              "Control de paquetería",
              "Notificaciones en tiempo real",
            ]}
          />
          <ModuleCol
            tag="Mantenimiento"
            heading="Organiza tareas y da seguimiento sin perder control:"
            items={[
              "Reporte y seguimiento de trabajos",
              "Asignación a proveedores o staff",
              "Mantenimientos programados",
              "Control de equipos y áreas",
            ]}
          />
        </div>
      </section>

      {/* ===== SE ADAPTA ===== */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Se adapta a tu propiedad
            </h2>
            <p className="mt-8 text-lg text-slate-600">
              No importa el tipo o tamaño, puedes usar solo las funciones que
              necesites.
            </p>
            <div className="mt-10">
              <button className="rounded-full bg-[#6d28d9] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(109,40,217,0.6)] transition hover:bg-[#5b21b6]">
                Agenda una Demo
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3">
              <FeaturePill icon={<Receipt className="h-4 w-4" />} label="Avisos de Cobro" />
              <FeaturePill icon={<CreditCard className="h-4 w-4" />} label="Pagos con Tarjeta" />
              <FeaturePill icon={<FileText className="h-4 w-4" />} label="Facturacíon" />
              <FeaturePill icon={<Gift className="h-4 w-4" />} label="Puntos / Cashback" />
              <FeaturePill icon={<ClipboardList className="h-4 w-4" />} label="Bitacora digital" />
              <FeaturePill icon={<Package className="h-4 w-4" />} label="Paqueteria" />
              <FeaturePill icon={<QrCode className="h-4 w-4" />} label="Visitas con QR" />
              <FeaturePill icon={<Wrench className="h-4 w-4" />} label="Mantenimientos" />
              <FeaturePill icon={<Bell className="h-4 w-4" />} label="Solicitudes" />
              <FeaturePill icon={<FileSpreadsheet className="h-4 w-4" />} label="Reportes" />
              <div className="col-span-2 flex justify-center">
                <FeaturePill icon={<MousePointer2 className="h-4 w-4" />} label="y más" />
              </div>
            </div>
          </div>

          <PhoneCollage />
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <blockquote className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            &ldquo;Me encanta poder ver todo lo que pasa en la propiedad en
            tiempo real&rdquo;
          </blockquote>
          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-300 to-slate-500" />
            <p className="text-base text-slate-700">— Andrés Navarro</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm">
          © {new Date().getFullYear()} Kiperfy. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

/* ---------- subcomponents ---------- */

function Navbar() {
  return (
    <div className="absolute inset-x-0 top-6 z-20 flex justify-center px-4">
      <nav className="flex w-full max-w-4xl items-center justify-between rounded-full bg-white/50 px-3 py-2 shadow-lg ring-1 ring-white/60 backdrop-blur-xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#22c1d6] to-[#3ddc97] text-white shadow-md">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18V6m0 6l8-6m-8 6l8 6" />
          </svg>
        </div>
        <ul className="hidden items-center gap-10 text-[15px] font-medium text-slate-800 md:flex">
          <li><a href="#features" className="transition hover:text-slate-950">Features</a></li>
          <li><a href="#benefits" className="transition hover:text-slate-950">Benefits</a></li>
          <li><a href="#pricing" className="transition hover:text-slate-950">Pricing</a></li>
          <li><a href="#contact" className="transition hover:text-slate-950">Contact Us</a></li>
        </ul>
        <button className="rounded-full bg-[#ec4899] px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-md transition hover:bg-[#db2777]">
          LOG IN
        </button>
      </nav>
    </div>
  );
}

function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Cloud className="left-[5%] top-[30%] h-12 w-32 opacity-90" />
      <Cloud className="left-[15%] top-[55%] h-10 w-24 opacity-70" />
      <Cloud className="right-[8%] top-[28%] h-14 w-36 opacity-90" />
      <Cloud className="right-[18%] top-[60%] h-10 w-28 opacity-75" />
      <Cloud className="left-[40%] top-[12%] h-8 w-20 opacity-60" />
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

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl font-semibold tracking-tight text-slate-300 sm:text-6xl">
        {number}
      </div>
      <div className="mt-3 text-lg font-medium text-slate-900">{label}</div>
    </div>
  );
}

function ModuleCol({
  tag,
  heading,
  items,
}: {
  tag: string;
  heading: string;
  items: string[];
}) {
  return (
    <div>
      <div className="mb-6 rounded-md bg-slate-400 py-3 text-center text-2xl font-semibold text-white">
        {tag}
      </div>
      <h3 className="text-2xl font-semibold leading-snug text-slate-900">
        {heading}
      </h3>
      <ul className="mt-6 space-y-3 text-lg text-slate-700">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="text-slate-400">•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:shadow">
      <span className="text-slate-500">{icon}</span>
      {label}
    </button>
  );
}

function PhoneCollage() {
  const phones = [
    { tilt: -12, bg: "from-[#22c1d6] to-[#3ddc97]", top: "0%", left: "5%" },
    { tilt: 8, bg: "from-[#3ddc97] to-[#a8eccf]", top: "10%", left: "35%" },
    { tilt: -6, bg: "from-slate-700 to-slate-900", top: "5%", left: "62%" },
    { tilt: 14, bg: "from-[#22c1d6] to-[#22d3ee]", top: "45%", left: "20%" },
    { tilt: -10, bg: "from-[#a8eccf] to-[#22c1d6]", top: "50%", left: "55%" },
  ];
  return (
    <div className="relative h-[520px] w-full">
      {phones.map((p, i) => (
        <div
          key={i}
          className={`absolute h-64 w-36 rounded-[2rem] bg-gradient-to-br ${p.bg} p-2 shadow-2xl ring-1 ring-black/10`}
          style={{
            top: p.top,
            left: p.left,
            transform: `rotate(${p.tilt}deg)`,
          }}
        >
          <div className="flex h-full w-full flex-col gap-2 rounded-[1.6rem] bg-white/15 p-3 backdrop-blur-sm">
            <div className="h-2 w-12 rounded-full bg-white/60" />
            <div className="h-3 w-20 rounded-full bg-white/70" />
            <div className="mt-2 flex-1 rounded-xl bg-white/30" />
            <div className="h-8 rounded-lg bg-white/40" />
            <div className="h-8 rounded-lg bg-white/30" />
          </div>
        </div>
      ))}
    </div>
  );
}
