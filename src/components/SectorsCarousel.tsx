"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

const sectors = [
  { name: "Petróleo & Gas", image: "/images/sector-petroleo.jpg", alt: "Operaciones en campo petrolero" },
  { name: "Agricultura", image: "/images/sector-agricultura.jpg", alt: "Comunicaciones en fincas y campos agrícolas" },
  { name: "Transporte", image: "/images/sector-transporte.jpg", alt: "Flota de transporte y logística" },
  { name: "Construcción", image: "/images/sector-construccion.jpg", alt: "Obra de construcción industrial" },
  { name: "Seguridad", image: "/images/sector-seguridad.jpg", alt: "Operaciones de seguridad" },
  { name: "Industrial", image: "/images/sector-industrial.jpg", alt: "Planta industrial" },
  { name: "Corporativo", image: "/images/sector-corporativo.jpg", alt: "Entorno corporativo y empresarial" },
  { name: "Privado", image: "/images/sector-privado.jpg", alt: "Uso residencial y privado" },
];

export default function SectorsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-surface py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2
            className="text-ink font-bold leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Industrias que no pueden
            <br />
            permitirse perder señal.
          </h2>

          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="min-h-[44px] min-w-[44px] rounded-full border border-border hover:border-cta hover:text-cta text-ink-muted flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-1"
              aria-label="Sector anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="min-h-[44px] min-w-[44px] rounded-full border border-border hover:border-cta hover:text-cta text-ink-muted flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-1"
              aria-label="Sector siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={emblaRef}
        className="overflow-hidden"
        role="region"
        aria-label="Carrusel de sectores atendidos"
        aria-roledescription="carrusel"
      >
        <div
          className="flex gap-4"
          style={{ paddingLeft: "max(1.5rem, calc((100vw - 1152px) / 2 + 3rem))" }}
        >
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className="relative flex-shrink-0 w-[260px] md:w-[320px] h-[380px] md:h-[440px] rounded-xl overflow-hidden group"
              style={{ flex: "0 0 auto" }}
            >
              <Image
                src={sector.image}
                alt={sector.alt}
                fill
                loading="lazy"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105 will-change-transform"
                sizes="(max-width: 768px) 260px, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute inset-0 bg-cta/0 group-hover:bg-cta/10 transition-colors duration-300" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="w-8 h-0.5 bg-cta mb-3 transition-all duration-300 group-hover:w-12" aria-hidden="true" />
                <p className="text-white font-semibold text-lg">{sector.name}</p>
              </div>
            </div>
          ))}
          <div
            className="flex-shrink-0 w-6"
            style={{ width: "max(1.5rem, calc((100vw - 1152px) / 2 + 3rem))" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
