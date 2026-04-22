"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      firstLinkRef.current?.focus();
    } else {
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-navy shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 py-4">
        <a
          href="#"
          className="text-white font-bold tracking-widest text-sm uppercase"
        >
          SETECEL<span className="text-cta">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-10" aria-label="Navegación principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-cta text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-cta hover:bg-cta-hover text-white text-sm font-semibold rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
          Solicitar Cotización
        </a>

        <button
          ref={menuButtonRef}
          className="md:hidden text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="md:hidden fixed inset-0 bg-navy z-40 flex flex-col items-center justify-center gap-10"
        >
          <button
            className="absolute top-5 right-6 text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={26} />
          </button>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              ref={i === 0 ? firstLinkRef : undefined}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-semibold tracking-wide hover:text-cta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-cta hover:bg-cta-hover text-white font-semibold rounded-md text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Solicitar Cotización
          </a>
        </div>
      )}
    </header>
  );
}
