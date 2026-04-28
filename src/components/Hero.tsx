"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MapPin, Pause, Play, Radio, BatteryCharging, Zap } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CompactToggle from "./CompactToggle";

const pillars = [
  {
    icon: <Radio size={15} />,
    title: "Alcance Regional Extraurbano",
    description: "Cobertura estratégica en zonas remotas y terrenos difíciles donde la telefonía convencional falla.",
  },
  {
    icon: <BatteryCharging size={15} />,
    title: "Respaldo de Energía Ininterrumpido",
    description: "Baterías de alto rendimiento con activación inmediata ante cortes eléctricos. Cero segundos de interrupción.",
  },
  {
    icon: <Zap size={15} />,
    title: "Infraestructura con Plantas Eléctricas",
    description: "Redundancia física con generadores propios. Servicio activo de forma indefinida durante contingencias prolongadas.",
  },
];

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

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [paused, setPaused] = useState(false);
  const [currentSector, setCurrentSector] = useState(sectors[0].name);
  const [showWhyUs, setShowWhyUs] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSector(sectors[emblaApi.selectedScrollSnap()].name);
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

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

  const [vh, setVh] = useState<string>("100dvh");

  useEffect(() => {
    // Lock height on initial load to prevent "jumping" when mobile browser bars hide/show
    const setRealVh = () => {
      const height = window.innerHeight;
      setVh(`${height}px`);
    };

    setRealVh();
    // We only update on orientation change, not on every scroll resize
    window.addEventListener("orientationchange", () => {
      // Small delay to let the browser update its innerHeight
      setTimeout(setRealVh, 200);
    });

    return () => window.removeEventListener("orientationchange", setRealVh);
  }, []);

  return (
    <section className="relative bg-navy overflow-hidden">
      {/* ── UPPER SECTION: Hero with background image ──────────────────── */}
      <div 
        className="relative flex flex-col justify-center"
        style={{ minHeight: vh }}
      >
        <Image
          src="/images/hero-bg-antenna.webp"
          alt="Antenas parabólicas de radiocomunicación profesional montadas en mástil"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-navy/80" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #4A7FBA 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
          <p className="text-cta text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Radiocomunicaciones · Nororiente Venezolano
          </p>

          <h1
            className="font-[family-name:var(--font-bodoni)] text-white leading-[1.3] mb-6 max-w-4xl"
            style={{ fontSize: "clamp(3.2rem, 9.5vw, 8rem)" }}
          >
            Liderazgo{" "}
            <span className="italic">sin interferencias.</span>
          </h1>

          <p className="text-white/70 text-lg font-light max-w-xl mb-10 leading-relaxed">
            Único Distribuidor Certificado y Centro de Servicio Autorizado Motorola (SAM) en el nororiente venezolano.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-cta hover:bg-cta-hover text-white font-semibold rounded-md transition-colors duration-200 text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Solicitar Cotización
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 hover:border-white/60 text-white font-medium rounded-md transition-colors duration-200 text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* Gradient fade from hero to nosotros section — seamless connection */}
        <div
          className="absolute bottom-0 inset-x-0 h-96 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(11,31,58,0.08) 15%, rgba(11,31,58,0.2) 30%, rgba(11,31,58,0.4) 50%, rgba(11,31,58,0.65) 70%, rgb(11,31,58) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── LOWER SECTION: Stats & Sectors (integrated as nosotros extension) ──────── */}
      <div className="relative z-10 py-10 lg:py-12 overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-3 lg:gap-4 items-stretch">

            {/* Left: info card with toggle */}
            <div
              className="relative rounded-2xl p-5 sm:p-8 lg:p-10 flex flex-col justify-between
                          shadow-[0_0_0_1px_rgba(255,255,255,0.09),_0_24px_60px_-8px_rgba(0,0,0,0.5)]"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              {/* Animated text content and Toggle */}
              <div className="relative">
                {/* Invisible spacer to maintain static height based on the taller of the two views */}
                <div aria-hidden="true" className="invisible pointer-events-none select-none grid overflow-hidden">
                  {/* View 1: Trayectoria */}
                  <div className="col-start-1 row-start-1">
                    <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-3 mb-3">
                      <p className="text-[11px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase flex flex-wrap gap-x-1.5 leading-relaxed mt-1 flex-1">
                        <span className="whitespace-nowrap">Fundada en 1996 ·</span>
                        <span className="whitespace-nowrap">Maturín, Monagas</span>
                      </p>
                      <div className="flex-shrink-0 relative z-20">
                        <CompactToggle isActive={showWhyUs} onToggle={() => {}} ariaLabel="Toggle" />
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="font-extrabold leading-none tracking-tight" style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}>30</span>
                      <div className="flex flex-col justify-start gap-1.5 pt-1">
                        <span className="font-bold leading-none" style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}>años</span>
                        <p className="font-medium leading-none" style={{ fontSize: "clamp(0.8rem, 1.4vw, 1rem)" }}>operando sin interrupciones</p>
                      </div>
                    </div>
                    <div className="space-y-4 text-sm leading-relaxed max-w-lg">
                      <p>Cuando la comunicación es crítica, la disponibilidad no es una opción. Como el único Distribuidor Certificado y Centro de Servicio Autorizado Motorola (SAM) en el oriente del país, somos el enlace vital para su operación.</p>
                      <p>Diseñamos infraestructura resiliente que garantiza una conectividad sin interrupciones, operando con máxima eficiencia incluso en las ubicaciones más remotas o bajo las condiciones climáticas más extremas.</p>
                    </div>
                  </div>

                  {/* View 2: Pillars (Confianza) */}
                  <div className="col-start-1 row-start-1">
                    <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-3 mb-5">
                      <p className="text-[11px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-1 flex-1">
                        ¿Por qué confiar en nuestra red?
                      </p>
                      <div className="flex-shrink-0 relative z-20">
                        <CompactToggle isActive={showWhyUs} onToggle={() => {}} ariaLabel="Toggle" />
                      </div>
                    </div>
                    <div className="divide-y divide-white/10">
                      {pillars.map((pillar, i) => (
                        <div key={`spacer-${i}`} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                          <div className="w-7 h-7 flex-shrink-0 mt-0.5"></div>
                          <div>
                            <p className="font-semibold text-sm leading-tight mb-1">{pillar.title}</p>
                            <p className="text-sm leading-relaxed">{pillar.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 top-0">
                  <AnimatePresence mode="wait">
                    {!showWhyUs ? (
                      <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-3 mb-3">
                          <p className="text-white/65 text-[11px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase flex flex-wrap gap-x-1.5 leading-relaxed mt-1 flex-1">
                            <span className="whitespace-nowrap">Fundada en 1996 ·</span>
                            <span className="whitespace-nowrap">Maturín, Monagas</span>
                          </p>
                          <div className="flex-shrink-0 relative z-20 pointer-events-auto">
                            <CompactToggle
                              isActive={showWhyUs}
                              onToggle={setShowWhyUs}
                              ariaLabel="Toggle between information and why choose us"
                            />
                          </div>
                        </div>

                        <div className="flex items-start gap-4 mb-4" aria-label="30 años operando sin interrupciones">
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

                        <div className="space-y-4 text-white/70 text-sm leading-relaxed max-w-lg">
                          <p>
                            Cuando la comunicación es crítica, la disponibilidad no es una opción. Como el único <strong className="text-white font-semibold">Distribuidor Certificado y Centro de Servicio Autorizado Motorola (SAM)</strong> en el oriente del país, somos el enlace vital para su operación.
                          </p>
                          <p>
                            Diseñamos infraestructura resiliente que garantiza una conectividad sin interrupciones, operando con máxima eficiencia incluso en las ubicaciones más remotas o bajo las condiciones climáticas más extremas.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="why-us"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-3 mb-5">
                          <p className="text-white/65 text-[11px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-1 flex-1">
                            ¿Por qué confiar en nuestra red?
                          </p>
                          <div className="flex-shrink-0 relative z-20 pointer-events-auto">
                            <CompactToggle
                              isActive={showWhyUs}
                              onToggle={setShowWhyUs}
                              ariaLabel="Toggle between information and why choose us"
                            />
                          </div>
                        </div>
                        <div className="divide-y divide-white/10">
                          {pillars.map((pillar, i) => (
                            <div key={i} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                                {pillar.icon}
                              </div>
                              <div>
                                <p className="text-white font-semibold text-sm leading-tight mb-1">
                                  {pillar.title}
                                </p>
                                <p className="text-white/65 text-sm leading-relaxed">
                                  {pillar.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Static section - always visible */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="flex items-center gap-1.5 text-white/55 text-xs font-semibold tracking-widest uppercase mb-3">
                  <MapPin size={11} className="text-cta" aria-hidden="true" />
                  3 estados con cobertura activa
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {states.map((state) => (
                    <div
                      key={state.name}
                      className="relative rounded-xl overflow-hidden h-[96px] bg-navy group"
                    >
                      <Image
                        src={state.image}
                        alt={`Estado ${state.name}`}
                        fill
                        loading="lazy"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 30vw, 210px"
                      />
                      
                      {/* Sombreado inferior para asegurar contraste del texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-3 pointer-events-none">
                        {state.highlight && (
                          <div className="w-3.5 h-[3px] bg-cta mb-1.5 rounded-full" aria-hidden="true" />
                        )}
                        <p className="text-white text-sm font-semibold leading-tight drop-shadow-md">
                          {state.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: carousel card */}
            <div
              className="relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-[420px]
                          shadow-[0_0_0_1px_rgba(255,255,255,0.07),_0_24px_60px_-8px_rgba(0,0,0,0.5)]"
            >
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
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy/70 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

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

              <p aria-live="polite" className="sr-only">{currentSector}</p>

              <div className="absolute top-5 left-5 z-10">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full
                             bg-navy/55 border border-white/12 backdrop-blur-sm
                             text-white/80 text-[10px] font-semibold tracking-[0.2em] uppercase"
                >
                  Sectores que atendemos
                </span>
              </div>

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
      </div>
    </section>
  );
}
