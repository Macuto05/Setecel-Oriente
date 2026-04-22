import { Mail, Globe, Phone, MessageCircle } from "lucide-react";

const navigationLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const solutions = [
  "Radiocomunicaciones críticas",
  "Cobertura de espectro",
  "Reparación Motorola",
  "Ingeniería de telecomunicaciones",
];

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:seteceloriente@gmail.com" },
  { icon: Phone, label: "Teléfono", href: "tel:02916419528" },
  { icon: Globe, label: "Web", href: "#" },
  { icon: MessageCircle, label: "Chat", href: "#contacto" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10">
          {/* Quality fixes applied */}
          {/* Brand section */}
          <div className="flex flex-col gap-4">
            <a href="#" className="text-white font-bold tracking-widest text-sm inline-block w-fit">
              SETECEL<span className="text-cta">.</span>
            </a>
            <p className="text-white/80 text-sm leading-relaxed">
              Infraestructura inquebrantable para comunicaciones críticas en el nororiente venezolano.
            </p>
          </div>

          {/* Solutions */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Soluciones</h3>
            <nav className="flex flex-col gap-3" aria-label="Soluciones">
              {solutions.map((solution) => (
                <a
                  key={solution}
                  href="#"
                  className="text-white/80 hover:text-white/90 text-sm transition-colors duration-200"
                >
                  {solution}
                </a>
              ))}
            </nav>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Navegación</h3>
            <nav className="flex flex-col gap-3" aria-label="Navegación principal">
              {navigationLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-white/80 hover:text-white/90 text-sm transition-colors duration-200"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Redes Sociales</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded flex items-center justify-center bg-white/10 hover:bg-cta hover:text-white text-white/80 transition-colors duration-200"
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80">
          <p>
            © {currentYear} SETECEL ORIENTE, C.A. RIF J-30340763-3
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/80 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white/80 transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
