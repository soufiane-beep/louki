import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { MenuJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Le Menu — Louki Sushi | Rolls, Baos, Poke Bowls à Anderlecht (Bruxelles)",
  description:
    "La carte complète de Louki Sushi à Anderlecht : rolls, baos, poke bowls, donburi, udon, plateaux et desserts. À emporter ou livraison gratuite dans tout Bruxelles, tous les jours de 18h à 4h.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Le Menu — Louki Sushi",
    description:
      "Rolls, baos, poke bowls, donburi, udon, plateaux et desserts — la carte complète de Louki Sushi à Bruxelles.",
    url: "/menu",
  },
};

export default function MenuPage() {
  return (
    <>
      <MenuJsonLd />
      <Navbar />
      <main className="pt-24">
        <Menu />
      </main>
      <Footer />
    </>
  );
}
