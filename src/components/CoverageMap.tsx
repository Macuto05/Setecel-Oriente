"use client";

import dynamic from "next/dynamic";

// Leaflet must be loaded client-side only — no SSR
const CoverageMapInner = dynamic(() => import("./CoverageMapInner"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center bg-black/20 rounded-lg">
      <span className="text-white/40 text-sm">Cargando mapa interactivo...</span>
    </div>
  ),
});

export default function CoverageMap() {
  return <CoverageMapInner />;
}
