export default function Stats() {
  return (
    <section id="nosotros" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">

          {/* Left: Primary stat — 30 años */}
          <div>
            <div className="flex items-start gap-3 mb-8">
              <span
                className="font-extrabold text-navy leading-none tracking-tight"
                style={{ fontSize: "clamp(6rem, 14vw, 11rem)" }}
              >
                30
              </span>
              <div className="pt-6">
                <span
                  className="font-bold text-cta leading-none"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  años
                </span>
                <p className="text-ink-subtle text-sm font-light mt-1 leading-snug max-w-[12ch]">
                  operando sin interrupciones
                </p>
              </div>
            </div>

            <p className="text-ink-muted text-base leading-relaxed max-w-md">
              SETECEL ORIENTE es{" "}
              <strong className="text-ink font-semibold">
                Dealer Certificado y Taller Oficial Motorola (SAM)
              </strong>{" "}
              — la única empresa autorizada para servicio técnico Motorola
              en el nororiente venezolano.
            </p>
          </div>

          {/* Right: Secondary stats — vertical stack */}
          <div className="space-y-0 divide-y divide-border">
            <div className="pb-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="font-extrabold text-navy leading-none"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                >
                  3
                </span>
                <span className="text-ink-muted text-base font-medium">estados</span>
              </div>
              <p className="text-ink-subtle text-sm">
                Monagas, Anzoátegui y Bolívar con cobertura activa.
              </p>
            </div>

            <div className="pt-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="font-extrabold text-cta leading-none"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                >
                  1
                </span>
                <span className="text-ink-muted text-base font-medium">único en la región</span>
              </div>
              <p className="text-ink-subtle text-sm">
                Taller certificado Motorola en todo el nororiente venezolano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
