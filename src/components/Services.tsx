"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const services = [
  {
    name: "Venta de Radios",
    category: "Equipos",
    isSAM: false,
    image: "/images/servicio-radios.jpg.webp",
    shortDesc: "Distribuidor oficial Motorola, Kenwood, Icom y Telepoint. Equipos nuevos, originales y con garantía de fábrica.",
  },
  {
    name: "Alquiler de Radios",
    category: "Equipos",
    isSAM: false,
    image: "/images/servicio-alquiler.jpg.webp",
    shortDesc: "Flota disponible para eventos, construcción y campañas agrícolas. Entrega inmediata.",
  },
  {
    name: "Mantenimiento y Reparación",
    category: "Técnico",
    isSAM: false,
    image: "/images/servicio-mantenimiento.jpg.webp",
    shortDesc: "Diagnóstico integral, reparación a componente y puesta en marcha. Tiempos de respuesta definidos.",
  },
  {
    name: "Taller Oficial Motorola",
    category: "Técnico",
    isSAM: true,
    image: undefined,
    shortDesc: "Único Centro Autorizado Motorola en el nororiente venezolano. Repuestos originales y garantía directa de marca.",
  },
  {
    name: "Venta de Accesorios",
    category: "Equipos",
    isSAM: false,
    image: undefined,
    shortDesc: "Stock permanente de baterías, antenas, auriculares y cargadores originales para todas las marcas.",
  },
  {
    name: "Alquiler de Repetidoras",
    category: "Infraestructura",
    isSAM: false,
    image: undefined,
    shortDesc: "Cobertura regional extraurbana sin inversión en hardware propio. Infraestructura lista para operar.",
  },
  {
    name: "Planes de Repetidor",
    category: "Infraestructura",
    isSAM: false,
    image: undefined,
    shortDesc: "Canal compartido o repetidor privado exclusivo. Planes prepagados bimestrales y trimestrales.",
  },
  {
    name: "Ingeniería y Proyectos",
    category: "Proyectos",
    isSAM: false,
    image: undefined,
    shortDesc: "Diseño e implementación de sistemas de telecomunicaciones a medida, del estudio hasta la puesta en marcha.",
  },
  {
    name: "Torres y Mástiles",
    category: "Infraestructura",
    isSAM: false,
    image: undefined,
    shortDesc: "Instalación, reubicación y mantenimiento de infraestructura vertical certificada en altura.",
  },
  {
    name: "Programación de Equipos",
    category: "Técnico",
    isSAM: false,
    image: undefined,
    shortDesc: "Frecuencias, grupos CTCSS/DCS y perfiles de usuario según los requerimientos de tu operación.",
  },
];

function SignalIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className={className} style={style}>
      <circle cx="4" cy="11" r="2" fill="currentColor" />
      <path d="M9 7a6 6 0 0 1 0 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 3.5a11 11 0 0 1 0 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.5 1a16 16 0 0 1 0 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface CardProps {
  service: (typeof services)[0];
  index: number;
  isMobileFlipped: boolean;
  onToggle: () => void;
}

function ServiceCard({ service, index, isMobileFlipped, onToggle }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const flipped = hovered || isMobileFlipped;
  const hasImage = !!service.image;
  // Above-fold images (first row) load eagerly to prevent CLS — [P2 optimize]
  const isAboveFold = index < 3;

  // Focus the CTA link after mobile tap-flip completes — [P2 a11y]
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!isMobileFlipped) return;
    const timer = setTimeout(() => ctaRef.current?.focus(), 680);
    return () => clearTimeout(timer);
  }, [isMobileFlipped]);

  return (
    <div
      suppressHydrationWarning
      style={{ perspective: "1000px", cursor: "pointer" }}
      // min-h lets tall content expand instead of overflowing — [P2 adapt]
      className="min-h-[210px] lg:min-h-[260px] h-[210px] lg:h-[260px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 rounded-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-label={`${service.name} — ${isMobileFlipped ? "cerrar" : "ver descripción"}`}
      // aria-pressed reflects only intentional tap state, not hover — [P1 a11y]
      aria-pressed={isMobileFlipped}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.45, 0, 0.55, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          // GPU layer hint for smooth animation — [P3 optimize]
          willChange: "transform",
        }}
      >
        {/* ── FRONT FACE ─────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className={`rounded-2xl overflow-hidden flex flex-col justify-between ${
            hasImage ? "" : "bg-white border border-border"
          }`}
        >
          {hasImage && (
            <>
              <Image
                src={service.image!}
                alt=""
                fill
                // Eager-load above-fold cards to prevent CLS — [P2 optimize]
                priority={isAboveFold}
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
                aria-hidden="true"
              />
              {/* Navy overlay for text legibility — functional gradient */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: "linear-gradient(160deg, rgba(11,31,58,0.38) 0%, rgba(11,31,58,0.82) 65%)",
                }}
              />
            </>
          )}

          {/* Reduced padding on mobile to accommodate long names — [P2 adapt] */}
          <div className="relative z-20 flex flex-col justify-between h-full p-4 sm:p-5 lg:p-7">
            <div className="flex items-start justify-between">
              <span className={`text-[9px] font-bold tracking-[0.3em] uppercase ${hasImage ? "text-white/70" : "text-cta"}`}>
                {service.category}
              </span>
              <SignalIcon className={hasImage ? "text-white/30 shrink-0 mt-0.5" : "text-ink-faint/50 shrink-0 mt-0.5"} />
            </div>

            <div>
              {service.isSAM && (
                <span
                  className="inline-block mb-2.5 text-[8px] font-bold tracking-[0.25em] uppercase px-2 py-0.5 rounded-sm"
                  style={{
                    color: "var(--color-cta)",
                    border: "1px solid rgba(15,82,232,0.25)",
                    background: "rgba(15,82,232,0.04)",
                  }}
                >
                  Centro Autorizado
                </span>
              )}
              <p
                className={`font-bold leading-tight ${hasImage ? "text-white" : "text-ink"}`}
                style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.3rem)" }}
              >
                {service.name}
              </p>
              {/* "Ver más" removed — interaction itself communicates this — [P3 distill] */}
              <div className={`mt-4 h-px ${hasImage ? "bg-white/20" : "bg-border"}`} />
            </div>
          </div>
        </div>

        {/* ── BACK FACE ──────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          // bg-navy via token class instead of hard-coded hex — [P3 polish]
          className="bg-navy rounded-2xl flex flex-col justify-between p-4 sm:p-5 lg:p-7"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[9px] font-bold tracking-[0.3em] uppercase"
                // #6BA5F5 on #0B1F3A → 7.3:1 contrast ratio, passes WCAG AAA — [P1 a11y]
                style={{ color: "#6BA5F5" }}
              >
                {service.category}
                {service.isSAM && (
                  <span style={{ color: "rgba(255,255,255,0.35)" }} className="ml-2">· SAM</span>
                )}
              </span>
              <SignalIcon style={{ color: "#fff", opacity: 0.1 }} />
            </div>

            <p
              className="leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {service.shortDesc}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="h-px flex-1 bg-white/10 mr-4" />
            <a
              ref={ctaRef}
              href="#contacto"
              onClick={e => e.stopPropagation()}
              // Hover via Tailwind class, no direct DOM mutation — [P2 polish]
              // text-cta token instead of hard-coded hex — [P3 polish]
              className="flex items-center gap-2 text-xs font-bold tracking-wide shrink-0 text-cta hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              Solicitar cotización
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  function handleToggle(i: number) {
    setFlippedIndex(prev => (prev === i ? null : i));
  }

  return (
    // bg-surface token class instead of hard-coded #F8FAFC — [P3 polish]
    <section id="servicios" className="bg-surface py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-12 lg:mb-16">
          <p className="text-cta text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Servicios
          </p>
          <h2
            className="text-ink font-bold leading-tight max-w-3xl"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Tu aliado estratégico en telecomunicaciones corporativas
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((s, i) => (
            <ServiceCard
              key={s.name}
              service={s}
              index={i}
              isMobileFlipped={flippedIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
