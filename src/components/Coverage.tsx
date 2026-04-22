import { MapPin, Radio } from "lucide-react";
import CoverageMap from "./CoverageMap";

const zones = [
  { state: "Estado Monagas",      desc: "Cobertura completa del estado",          highlight: true  },
  { state: "Estado Anzoátegui",   desc: "Zonas estratégicas y petroleras",        highlight: false },
  { state: "Estado Bolívar",      desc: "Zonas estratégicas de alta demanda",     highlight: false },
];

const keyZones = [
  "Mesa de Guanipa", "Furrial", "Quiriquire",
  "Caripito", "Caripe", "Zonas rurales y agrícolas", "Áreas de difícil acceso",
];

export default function Coverage() {
  return (
    <section id="cobertura" className="bg-navy py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* 2-column layout: text left (40%), map right (60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-start">

          {/* ── Left: text content ─────────────────────────── */}
          <div>
            <p className="text-cta text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Infraestructura Regional
            </p>
            <h2
              className="text-white font-bold leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Cobertura donde
              <br />
              la señal importa.
            </h2>

            <div className="space-y-4 mb-10">
              {zones.map((z) => (
                <div
                  key={z.state}
                  className="flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-white/5"
                >
                  <MapPin
                    size={18}
                    className={`${z.highlight ? "text-cta" : "text-white/40"} mt-0.5 flex-shrink-0`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <p className={`font-semibold text-sm ${z.highlight ? "text-white" : "text-white/80"}`}>
                      {z.state}
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">{z.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-white/60 text-xs font-medium tracking-widest uppercase mb-4">
                Zonas estratégicas
              </p>
              <div className="flex flex-wrap gap-2" aria-label="Lista de zonas de cobertura">
                {keyZones.map((zone) => (
                  <span
                    key={zone}
                    className="px-3 py-1.5 border border-white/15 text-white/60 text-xs rounded-full"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-start gap-3 pt-8 border-t border-white/10">
              <Radio size={18} className="text-cta flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-white/60 text-sm leading-relaxed">
                Centro de repetición principal ubicado en{" "}
                <span className="text-white/80">Cerro La Cuchilla, El Palmar, Caripe</span>{" "}
                — infraestructura que garantiza señal donde otros no llegan.
              </p>
            </div>
          </div>

          {/* ── Right: interactive map ─────────────────────── */}
          <div className="w-full">
            <CoverageMap />
          </div>

        </div>
      </div>
    </section>
  );
}
