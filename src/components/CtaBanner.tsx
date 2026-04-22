export default function CtaBanner() {
  return (
    <section id="cotizacion" className="bg-navy py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #4A7FBA 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2
          className="text-white font-bold leading-tight mb-6 mx-auto"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", maxWidth: "700px" }}
        >
          ¿Necesitas comunicaciones
          que no fallen?
        </h2>
        <p className="text-white/60 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
          Cuéntanos tu operación. Diseñamos la solución técnica exacta
          que tu empresa necesita.
        </p>
        <a
          href="#contacto"
          className="inline-flex items-center justify-center px-10 py-4 bg-cta hover:bg-cta-hover text-white font-semibold rounded-md transition-colors duration-200 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
          Solicitar Cotización
        </a>
      </div>
    </section>
  );
}
