"use client";

import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfonos",
    items: [
      { text: "0291-641.95.28", href: "tel:02916419528" },
      { text: "0424-970.82.38", href: "tel:04249708238" },
      { text: "0414-865.49.06", href: "tel:04148654906" },
    ],
  },
  {
    icon: Mail,
    label: "Correos",
    items: [
      { text: "seteceloriente@gmail.com", href: "mailto:seteceloriente@gmail.com" },
      { text: "seteceladmon@gmail.com",   href: "mailto:seteceladmon@gmail.com"   },
    ],
  },
  {
    icon: MapPin,
    label: "Dirección",
    items: [
      { text: "Vía Viboral, C.C. Las Colinas",    href: null },
      { text: "Locales 16, 17 y 18, Sector Tipuro", href: null },
      { text: "Maturín, Edo. Monagas",             href: null },
    ],
  },
];

const serviceOptions = [
  "Venta de radios", "Alquiler de radios", "Mantenimiento y reparación",
  "Taller Motorola", "Accesorios", "Repetidoras", "Planes de repetidor",
  "Ingeniería y proyectos", "Torres y mástiles", "Programación de equipos", "Otro",
];

const inputClass =
  "w-full border-b border-border focus:border-cta bg-transparent py-3 text-ink text-sm outline-none focus-visible:outline-none focus-visible:ring-0 transition-colors duration-200 placeholder:text-ink-faint";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formsubmit.co/ajax/seteceloriente@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
          empresa: (form.elements.namedItem("empresa") as HTMLInputElement).value,
          telefono: (form.elements.namedItem("telefono") as HTMLInputElement).value,
          servicio: (form.elements.namedItem("servicio") as HTMLSelectElement).value,
          mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value,
          _subject: "Nueva solicitud de cotización — SETECEL ORIENTE",
          _captcha: "false",
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="bg-surface py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-cta text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Contacto
          </p>
          <h2
            className="text-ink font-bold leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Hablemos de tu operación.
          </h2>
        </div>

        {/* Main container with inner structure */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-0">
            {/* Left: Contact info container */}
            <div className="bg-navy text-white p-8 lg:p-10 flex flex-col justify-center">
              <div className="mb-8">
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  Estamos aquí para resolver tus operaciones críticas. Escríbenos y te cotizaremos en 24 horas.
                </p>
              </div>
              <div className="space-y-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon size={18} className="text-white" strokeWidth={1.5} aria-hidden="true" />
                        <p className="text-white/70 text-xs font-semibold tracking-widest uppercase">
                          {item.label}
                        </p>
                      </div>
                      <div className="pl-7 space-y-2">
                        {item.items.map(({ text, href }) =>
                          href ? (
                            <a
                              key={text}
                              href={href}
                              className="block text-white text-sm leading-relaxed hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                            >
                              {text}
                            </a>
                          ) : (
                            <p key={text} className="text-white/90 text-sm leading-relaxed">{text}</p>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Form container */}
            <div className="bg-white p-8 lg:p-16 flex flex-col justify-center">
              {sent ? (
                <div className="flex flex-col items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center" aria-hidden="true">
                    <Send size={18} className="text-cta" />
                  </div>
                  <div>
                    <h3 className="text-ink text-lg font-bold mb-2">Mensaje enviado</h3>
                    <p className="text-ink-subtle text-sm leading-relaxed max-w-xs">
                      Recibimos tu solicitud. Nuestro equipo técnico te contactará para preparar una cotización personalizada.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-cta text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-ink-muted text-xs font-semibold tracking-widest uppercase mb-3">
                        Nombre <span aria-label="requerido" className="text-cta">*</span>
                      </label>
                      <input
                        id="nombre" type="text" required autoComplete="name"
                        placeholder="Tu nombre completo"
                        className={inputClass}
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-ink-muted text-xs font-semibold tracking-widest uppercase mb-3">
                        Empresa
                      </label>
                      <input
                        id="empresa" type="text" autoComplete="organization"
                        placeholder="Nombre de tu empresa"
                        className={inputClass}
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-ink-muted text-xs font-semibold tracking-widest uppercase mb-3">
                      Teléfono <span aria-label="requerido" className="text-cta">*</span>
                    </label>
                    <input
                      id="telefono" type="tel" required autoComplete="tel"
                      placeholder="04XX-XXX.XX.XX"
                      className={inputClass}
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-ink-muted text-xs font-semibold tracking-widest uppercase mb-3">
                      Servicio de interés
                    </label>
                    <select
                      id="servicio"
                      className={`${inputClass} cursor-pointer`}
                      suppressHydrationWarning
                    >
                      <option value="" disabled>Selecciona un servicio</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-ink-muted text-xs font-semibold tracking-widest uppercase mb-3">
                      Mensaje <span aria-label="requerido" className="text-cta">*</span>
                    </label>
                    <textarea
                      id="mensaje" required rows={4}
                      placeholder="Cuéntanos tu operación y lo que necesitas..."
                      className={`${inputClass} resize-none`}
                      suppressHydrationWarning
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    suppressHydrationWarning
                    className="w-full py-3 bg-cta hover:bg-cta-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded transition-colors duration-200 text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
                  >
                    {submitting ? (
                      <>
                        Enviando...
                        <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Enviar solicitud
                        <Send size={14} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  {error && (
                    <p role="alert" className="text-red-500 text-xs">
                      No se pudo enviar el mensaje. Intenta de nuevo o escríbenos directamente a seteceloriente@gmail.com
                    </p>
                  )}

                  <p className="text-ink-faint text-xs">
                    * Campos requeridos. Tu información es confidencial.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
