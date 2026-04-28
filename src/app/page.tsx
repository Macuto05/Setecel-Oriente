import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyRadio from "@/components/WhyRadio";
import About from "@/components/About";
import Coverage from "@/components/Coverage";
import Brands from "@/components/Brands";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyRadio />
        <About />
        <Coverage />
        <Brands />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
