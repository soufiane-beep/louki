import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SavoirFaire from "@/components/SavoirFaire";
import MenuTeaser from "@/components/MenuTeaser";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Info from "@/components/Info";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <SavoirFaire />
        <MenuTeaser />
        <Gallery />
        <Reviews />
        <Info />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
