import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SETECEL ORIENTE | Radiocomunicaciones · Nororiente Venezolano",
  description:
    "30 años conectando industrias críticas en Monagas, Anzoátegui y Bolívar. Único taller certificado Motorola en el nororiente venezolano. Ventas, alquiler, mantenimiento y proyectos de telecomunicaciones.",
  keywords:
    "radiocomunicaciones Maturín, radios Motorola Venezuela, repetidoras Monagas, telecomunicaciones Anzoátegui, taller Motorola Maturín, SETECEL ORIENTE",
  openGraph: {
    title: "SETECEL ORIENTE | Radiocomunicaciones",
    description:
      "Comunicaciones críticas donde otros no llegan. 30 años en el nororiente venezolano.",
    type: "website",
    locale: "es_VE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${bodoniModa.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
