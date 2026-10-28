import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 pt-24 text-center">
        <p className="font-display text-sm uppercase tracking-widest text-red">Erreur 404</p>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
          Page introuvable
        </h1>
        <p className="mt-4 max-w-md text-lg text-ink/70">
          Cette page n&apos;existe pas ou a été déplacée. Pas de panique, le menu est toujours là.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-red px-7 py-3 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-ink px-7 py-3 font-display text-sm uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Voir le menu
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
