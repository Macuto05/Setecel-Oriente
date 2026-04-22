"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface Logo {
  name: string;
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { name: "Motorola", src: "/images/logos/logo-motorola-original.png", alt: "Motorola Solutions" },
  { name: "Kenwood", src: "/images/logos/logo-kenwood.png.webp", alt: "Kenwood" },
  { name: "Icom", src: "/images/logos/logo-icom.png.webp", alt: "Icom" },
  { name: "Telepoint", src: "/images/logos/logo-telepoint.png.webp", alt: "Telepoint" },
];

export default function Brands() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="marcas" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header with accent bar */}
        <div className="mb-16 flex items-start gap-4">
          <div className="w-1 h-14 bg-cta rounded-full flex-shrink-0 mt-0.5" />
          <div>
            <h2
              className="text-ink font-bold leading-tight max-w-3xl"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Equipos de las mejores marcas
              <br />
              del mundo.
            </h2>
          </div>
        </div>

        {/* Carousel Container — elevated with shadow and border */}
        <div className="relative overflow-hidden rounded-lg bg-white border border-border shadow-sm">
          <div
            ref={trackRef}
            className="flex gap-6 lg:gap-8 px-6 lg:px-12 py-8 lg:py-10"
            style={{
              willChange: "transform",
              animation: "carousel-scroll-infinite 6000ms linear infinite",
            }}
          >
            {/* Render logos twice for seamless infinite loop */}
            {[...logos, ...logos].map((logo, i) => {
              const actualIndex = i % logos.length;
              const isHovered = hoveredIndex === actualIndex;

              return (
                <div
                  key={`${logo.name}-${i}`}
                  className={`flex-shrink-0 flex items-center justify-center transition-all duration-200 rounded-lg px-3 lg:px-4 py-3 cursor-default ${
                    isHovered
                      ? "bg-surface shadow-xs"
                      : "bg-transparent"
                  }`}
                  style={{
                    minWidth: "auto",
                    height: "60px",
                  }}
                  onMouseEnter={() => setHoveredIndex(actualIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={150}
                    height={60}
                    className={`h-full w-auto object-contain transition-all duration-200 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                    priority={i < 4}
                    quality={90}
                  />
                </div>
              );
            })}
          </div>

          {/* Gradient fade-out edges */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        {/* Footer text */}
        <p className="mt-8 text-ink-subtle text-sm text-center">
          Motorola Solutions representa el 90% de nuestro catálogo — la marca
          líder en radiocomunicaciones profesionales.
        </p>
      </div>
    </section>
  );
}
