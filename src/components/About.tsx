"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Shield, Lightbulb, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: "mision" | "vision" | "valores";
  title: string;
  description: string | Section["values"];
  image: string;
  alt: string;
  icon: React.ReactNode;
  values?: Array<{ title: string; description: string }>;
}

const sections: Section[] = [
  {
    id: "mision",
    title: "Misión",
    description: "Conectar el oriente venezolano con una infraestructura inquebrantable, dominando el espectro mediante tecnología de vanguardia para garantizar comunicaciones críticas donde otros no llegan.",
    image: "/images/about-mision.webp",
    alt: "Misión SETECEL",
    icon: <Shield size={20} />,
  },
  {
    id: "vision",
    title: "Visión",
    description: "Ser el referente indiscutible en radiocomunicaciones corporativas del nororiente venezolano, liderando con tecnología de vanguardia y presencia expansiva, conectando industrias críticas en las condiciones más extremas con infraestructura inquebrantable.",
    image: "/images/about-vision.webp",
    alt: "Visión SETECEL",
    icon: <Lightbulb size={20} />,
  },
  {
    id: "valores",
    title: "Valores",
    description: "",
    image: "/images/about-valores.webp",
    alt: "Valores SETECEL",
    icon: <Target size={20} />,
    values: [
      {
        title: "Dominio Tecnológico:",
        description: "Operamos con la tecnología más avanzada.",
      },
      {
        title: "Agilidad Disruptiva:",
        description: "Respondemos más rápido que la competencia.",
      },
      {
        title: "Precisión Absoluta:",
        description: "Exactitud quirúrgica en cada proyecto.",
      },
      {
        title: "Determinación Regional:",
        description: "La fuerza que mueve al nororiente con resultados imbatibles.",
      },
    ],
  },
];

const sectionIds = ["mision", "vision", "valores"] as const;

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export default function About() {
  const [selectedId, setSelectedId] = useState<"mision" | "vision" | "valores">("mision");
  const selected = sections.find((s) => s.id === selectedId)!;

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedId((prev) => {
        const currentIndex = sectionIds.indexOf(prev);
        const nextIndex = (currentIndex + 1) % sectionIds.length;
        return sectionIds[nextIndex];
      });
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="nosotros" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-ink mb-4">
            Nosotros
          </h2>
          <p className="text-ink-muted text-lg max-w-2xl mx-auto">
            Conectando el nororiente con infraestructura inquebrantable y tecnología de vanguardia
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1.8fr] gap-8 lg:gap-16 items-start">

          {/* ── Left Column: Selectable Tabs ──────────────────────── */}
          <div className="flex flex-col gap-4" role="tablist" aria-label="Selecciona una sección: Misión, Visión o Valores">
            <AnimatePresence mode="sync">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  id={`tab-${section.id}`}
                  onClick={() => setSelectedId(section.id)}
                  suppressHydrationWarning
                  role="tab"
                  aria-selected={selectedId === section.id}
                  aria-controls={`panel-${section.id}`}
                  className={`text-left px-5 py-4 rounded-2xl border-2 transition-all flex items-center gap-4 min-h-[44px] ${
                    selectedId === section.id
                      ? "border-cta bg-white shadow-md"
                      : "border-border bg-surface hover:border-border/60"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      selectedId === section.id
                        ? "bg-cta text-white"
                        : "bg-ink-faint/10 text-ink-faint"
                    }`}
                    animate={{
                      backgroundColor: selectedId === section.id ? "#0F52E8" : "rgba(148, 163, 184, 0.1)",
                      color: selectedId === section.id ? "#ffffff" : "rgba(148, 163, 184, 1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.icon}
                  </motion.div>
                  {/* Title */}
                  <p
                    className={`font-bold text-sm lg:text-base transition-colors ${
                      selectedId === section.id ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {section.title}
                  </p>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Right Column: Main Content Card ────────────────────── */}
          <div
            className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm h-full lg:min-h-[500px]"
            role="tabpanel"
            id={`panel-${selected.id}`}
            aria-labelledby={`tab-${selected.id}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch h-full">

              {/* Left Content */}
              <div className="relative p-8 lg:p-12 overflow-hidden min-h-96 lg:min-h-[500px]">
                {/* Invisible spacer (Valores) to enforce static container height */}
                <div aria-hidden="true" className="invisible pointer-events-none select-none flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-cta/10 flex items-center justify-center text-cta mb-6 flex-shrink-0">
                    {sections[2].icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-ink mb-6 leading-tight">
                      {sections[2].title}
                    </h3>
                    <div className="space-y-4">
                      {sections[2].values?.map((value, idx) => (
                        <div key={idx} className="text-ink-muted text-base leading-relaxed">
                          <span className="font-bold text-ink">{value.title}</span>{" "}
                          {value.description}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 p-8 lg:p-12 flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selected.id}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex-1 flex flex-col"
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-cta/10 flex items-center justify-center text-cta mb-6 flex-shrink-0">
                        {selected.icon}
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1">
                        <h3 className="text-3xl lg:text-4xl font-bold text-ink mb-6 leading-tight">
                          {selected.title}
                        </h3>

                        {/* Regular description */}
                        {typeof selected.description === "string" && selected.description && (
                          <p className="text-ink-muted text-base leading-relaxed">
                            {selected.description}
                          </p>
                        )}

                        {/* Values list */}
                        {selected.values && (
                          <div className="space-y-4">
                            {selected.values.map((value, idx) => (
                              <div key={idx} className="text-ink-muted text-base leading-relaxed">
                                <span className="font-bold text-ink">{value.title}</span>{" "}
                                {value.description}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Image Container */}
              <div className="p-8 lg:p-10 flex items-center justify-center bg-surface">
                <div className="relative w-full aspect-square lg:aspect-auto lg:h-full max-w-sm rounded-2xl overflow-hidden shadow-md">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selected.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={selected.image}
                        alt={selected.alt}
                        fill
                        priority={false}
                        loading="lazy"
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
