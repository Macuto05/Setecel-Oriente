"use client";

import { useEffect, useRef } from "react";

const differentiators = [
  {
    ordinal: "01",
    tag: "Operación de campo",
    claim: "Comunicación Instantánea (Push-to-Talk)",
    description:
      "Un solo botón para conectar a todo su equipo de trabajo. Sin marcaciones ni esperas: respuesta inmediata y coordinada en entornos críticos donde cada segundo cuenta.",
  },
  {
    ordinal: "02",
    tag: "Resiliencia energética",
    claim: "Independencia Total de la Red",
    description:
      "Garantice su operatividad incluso durante fallas eléctricas. Nuestras repetidoras funcionan con sistemas de energía independientes, asegurando señal cuando la telefonía comercial colapsa.",
  },
  {
    ordinal: "03",
    tag: "Cobertura personalizada",
    claim: "Señal donde otros no llegan",
    description:
      "Diseñamos infraestructura privada ajustada exactamente a su área de trabajo. Eliminamos las \"zonas muertas\" en campos remotos, fincas o instalaciones industriales de alta complejidad.",
  },
  {
    ordinal: "04",
    tag: "Eficiencia financiera",
    claim: "Costo Fijo y Grado Industrial",
    description:
      "Elimine cargos por datos, minutos o planes mensuales. Invierta en equipos robustos de larga duración con un costo operativo predecible, sin vencimientos ni sorpresas en su factura.",
  },
];

const cellBorders = [
  "border-b border-white/10 lg:border-r",
  "border-b border-white/10",
  "border-b border-white/10 lg:border-b-0 lg:border-r",
  "",
];

const cellPadding = [
  "py-10 lg:pt-0 lg:pb-14 lg:pl-8 lg:pr-14",
  "py-10 lg:pt-0 lg:pb-14 lg:pl-14 lg:pr-0",
  "py-10 lg:pt-14 lg:pb-0 lg:pl-8 lg:pr-14",
  "py-10 lg:pt-14 lg:pb-0 lg:pl-14 lg:pr-0",
];

export default function WhyRadio() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="bg-navy py-16 lg:py-24 relative overflow-hidden"
      aria-labelledby="why-radio-heading"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 55% 45% at 10% 90%, rgba(15,82,232,0.13) 0%, transparent 65%)",
          "radial-gradient(ellipse 45% 40% at 90% 8%, rgba(15,82,232,0.07) 0%, transparent 60%)",
        ].join(", "),
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ────────────────────────────────────────── */}
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <p className="text-cta text-xs font-semibold tracking-[0.28em] uppercase mb-5">
            ¿Por qué radio?
          </p>
          <h2
            id="why-radio-heading"
            className="text-white leading-[1.2] mb-6"
            style={{
              fontFamily: "var(--font-bodoni)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 4vw, 3.1rem)",
            }}
          >
            Cuando falla el celular,<br className="hidden sm:block" /> el radio{" "}
            <span style={{ color: "var(--color-cta)" }}>trabaja.</span>
          </h2>
          <p
            className="text-white/60 leading-relaxed"
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              maxWidth: "54ch",
            }}
          >
            Mientras la red celular es un servicio de consumo, la radio privada
            es una herramienta industrial diseñada para la alta disponibilidad.
            Garantizamos conectividad total donde la señal comercial no tiene alcance.
          </p>
        </div>

        {/* ── 2×2 grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2" role="list">
          {differentiators.map((item, i) => (
            <div
              key={item.tag}
              ref={(el) => { itemRefs.current[i] = el; }}
              role="listitem"
              className={`relative overflow-hidden transition-[box-shadow] duration-300 hover:shadow-[inset_0_0_0_1px_rgba(15,82,232,0.5)] ${cellPadding[i]} ${cellBorders[i]}`}
            >
              {/* Ordinal decorativo — depth sin competir con el contenido */}
              <span
                aria-hidden="true"
                className="absolute bottom-1 right-8 select-none pointer-events-none leading-none"
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontWeight: 700,
                  fontSize: "clamp(5.5rem, 9vw, 8rem)",
                  color: "rgba(255,255,255,0.042)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {item.ordinal}
              </span>

              {/* Tag con dash editorial */}
              <p className="flex items-center gap-2.5 mb-5">
                <span
                  aria-hidden="true"
                  className="shrink-0 inline-block"
                  style={{
                    width: "16px",
                    height: "1px",
                    background: "var(--color-cta)",
                    opacity: 0.75,
                  }}
                />
                <span
                  className="text-cta font-bold tracking-[0.3em] uppercase"
                  style={{ fontSize: "0.6rem" }}
                >
                  {item.tag}
                </span>
              </p>

              {/* Claim */}
              <p
                className="text-white font-bold leading-snug mb-4"
                style={{ fontSize: "clamp(1.1rem, 1.9vw, 1.4rem)" }}
              >
                {item.claim}
              </p>

              {/* Description */}
              <p
                className="text-white/55 leading-relaxed"
                style={{
                  fontSize: "clamp(0.8rem, 1.1vw, 0.875rem)",
                  maxWidth: "40ch",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Pie de sección ────────────────────────────────── */}
        <div className="mt-12 lg:mt-14 pt-8 border-t border-white/10 flex items-center justify-center gap-2.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-cta shrink-0"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p
            className="text-white/60 text-center font-medium"
            style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)", letterSpacing: "0.04em" }}
          >
            Equipos con certificación industrial y máxima resistencia al impacto.
          </p>
        </div>

      </div>
    </section>
  );
}
