export default function CtaBanner() {
  return (
    <section id="cotizacion" className="bg-navy py-10 lg:py-12 relative overflow-hidden">
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
          className="text-white font-bold leading-tight mx-auto max-w-3xl"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        >
          ¿Necesitas comunicaciones que no fallen?
        </h2>
      </div>
    </section>
  );
}
