import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Le Menu — Louki Sushi",
  description:
    "Découvrez la carte de Louki Sushi : rolls, baos, poke bowls et plus encore.",
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Suspense>
          <Menu />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
