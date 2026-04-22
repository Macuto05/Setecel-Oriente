"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MapPin, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const states = [
  { name: "Monagas",    image: "/images/estado-monagas.webp",    highlight: true  },
  { name: "Anzoátegui", image: "/images/estado-anzoategui.webp", highlight: false },
  { name: "Bolívar",    image: "/images/estado-bolivar.webp",    highlight: false },
];

const sectors = [
  { name: "Petróleo & Gas", image: "/images/sector-petroleo.jpg",    alt: "Operaciones en campo petrolero" },
  { name: "Agricultura",    image: "/images/sector-agricultura.jpg",  alt: "Comunicaciones en fincas y campos agrícolas" },
  { name: "Transporte",     image: "/images/sector-transporte.jpg",   alt: "Flota de transporte y logística" },
  { name: "Construcción",   image: "/images/sector-construccion.jpg", alt: "Obra de construcción industrial" },
  { name: "Seguridad",      image: "/images/sector-seguridad.jpg",    alt: "Operaciones de seguridad" },
  { name: "Industrial",     image: "/images/sector-industrial.jpg",   alt: "Planta industrial" },
  { name: "Corporativo",    image: "/images/sector-corporativo.jpg",  alt: "Entorno corporativo y empresarial" },
  { name: "Privado",        image: "/images/sector-privado.jpg",      alt: "Uso residencial y privado" },
];

export default function StatsAndSectors() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [paused, setPaused] = useState(false);
  const [currentSector, setCurrentSector] = useState(sectors[0].name);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /* Track active slide for aria-live announcement */
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSector(sectors[emblaApi.selectedScrollSnap()].name);
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  /* Autoplay — skips if reduced-motion or user paused; pauses on drag */
  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;

    let timerId: ReturnType<typeof setInterval>;
    const start = () => { timerId = setInterval(() => emblaApi.scrollNext(), 4500); };
    const stop  = () => clearInterval(timerId);

    emblaApi.on("pointerDown", stop);
    emblaApi.on("pointerUp",   start);
    start();

    return () => {
      stop();
      emblaApi.off("pointerDown", stop);
      emblaApi.off("pointerUp",   start);
    };
  }, [emblaApi, paused]);

  return (
    <section
      id="nosotros"
      aria-label="Nosotros y sectores que atendemos"
      className="relative bg-navy py-10 lg:py-12 overflow-hidden"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-dot) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow top-right */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--color-cta) 18%, transparent) 0%, transparent 65%)",
        }}
      />
      {/* Glow bottom-left */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--color-cta) 10%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* 65/35 — items-stretch makes both cards share the same height */}
        <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-3 lg:gap-4 items-stretch">

          {/* ── Left: info card ───────────────────────────────── */}
          <div
            className="rounded-2xl p-8 lg:p-10 flex flex-col justify-between
                        shadow-[0_0_0_1px_rgba(255,255,255,0.09),_0_24px_60px_-8px_rgba(0,0,0,0.5)]"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            {/* Top */}
            <div>
              <p className="text-white/65 text-xs font-medium tracking-[0.3em] uppercase mb-5">
                Fundada en 1996 · Maturín, Monagas
              </p>

              {/* "30" + columna derecha alineada al tope */}
              <div className="flex items-start gap-4 mb-6" aria-label="30 años operando sin interrupciones">
                <span
                  className="font-extrabold text-white leading-none tracking-tight"
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                >
                  30
                </span>
                <div className="flex flex-col justify-start gap-1.5 pt-1">
                  <span
                    className="font-bold text-white leading-none"
                    style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
                  >
                    años
                  </span>
                  <p
                    className="text-white/75 font-medium leading-none"
                    style={{ fontSize: "clamp(0.8rem, 1.4vw, 1rem)" }}
                  >
                    operando sin interrupciones
                  </p>
                </div>
              </div>

              <p className="text-white/65 text-sm leading-relaxed max-w-md">
                Somos el{" "}
                <strong className="text-white font-semibold">
                  único Distribuidor Certificado y Centro de Servicio Autorizado Motorola (SAM)
                </strong>{" "}
                en el nororiente venezolano.
                <br />
                <br />
                Nuestro estatus oficial le garantiza soporte técnico
                especializado, repuestos originales y el respaldo directo de la marca, asegurando
                la máxima confiabilidad y rendimiento para sus equipos.
              </p>
            </div>

            {/* Bottom: state mini-images */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="flex items-center gap-1.5 text-white/55 text-xs font-semibold tracking-widest uppercase mb-3">
                <MapPin size={11} className="text-cta" aria-hidden="true" />
                3 estados con cobertura activa
              </p>
              <div className="grid grid-cols-3 gap-3">
                {states.map((state) => (
                  <div
                    key={state.name}
                    className="relative rounded-xl overflow-hidden h-[68px] bg-navy"
                    style={{ aspectRatio: "210/68" }}
                  >
                    <Image
                      src={state.image}
                      alt={`Estado ${state.name}`}
                      fill
                      loading="lazy"
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 30vw, 210px"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-2.5">
                      {state.highlight && (
                        <div className="w-3 h-0.5 bg-cta mb-1" aria-hidden="true" />
                      )}
                      <p className="text-white text-xs font-semibold leading-tight drop-shadow-sm">
                        {state.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: carousel card ──────────────────────────── */}
          <div
            className="relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-[420px]
                        shadow-[0_0_0_1px_rgba(255,255,255,0.07),_0_24px_60px_-8px_rgba(0,0,0,0.5)]"
          >
            {/* Embla fills the card */}
            <div
              ref={emblaRef}
              className="absolute inset-0 overflow-hidden"
              aria-label="Carrusel de sectores atendidos"
            >
              <div className="flex h-full">
                {sectors.map((sector) => (
                  <div
                    key={sector.name}
                    className="relative flex-[0_0_100%]"
                    role="group"
                    aria-label={sector.name}
                  >
                    <Image
                      src={sector.image}
                      alt={sector.alt}
                      fill
                      loading="lazy"
                      className="object-cover object-center transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                    {/* Top scrim — badge legibility */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy/70 to-transparent" />
                    {/* Bottom scrim — sector text contrast */}
                    <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

                    {/* Sector label */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 pb-5">
                      <p className="text-cta text-[10px] font-semibold tracking-[0.25em] uppercase mb-1">
                        Sector
                      </p>
                      <p className="text-white font-semibold text-lg leading-snug">
                        {sector.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screen-reader live region — announces slide changes */}
            <p aria-live="polite" className="sr-only">{currentSector}</p>

            {/* "Sectores que atendemos" badge */}
            <div className="absolute top-5 left-5 z-10">
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full
                           bg-navy/55 border border-white/12 backdrop-blur-sm
                           text-white/80 text-[10px] font-semibold tracking-[0.2em] uppercase"
              >
                Sectores que atendemos
              </span>
            </div>

            {/* Nav controls + pause toggle */}
            <div className="absolute bottom-5 right-5 z-10 flex gap-2">
              <button
                onClick={scrollPrev}
                aria-label="Sector anterior"
                suppressHydrationWarning
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20
                           text-white flex items-center justify-center transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
                suppressHydrationWarning
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20
                           text-white flex items-center justify-center transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {paused ? <Play size={13} /> : <Pause size={13} />}
              </button>
              <button
                onClick={scrollNext}
                aria-label="Sector siguiente"
                suppressHydrationWarning
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20
                           text-white flex items-center justify-center transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
