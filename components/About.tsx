import Image from "next/image";

export default function About() {
  return (
    <section className="bg-cream px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div className="fade-in">
          <p className="font-display text-sm uppercase tracking-widest text-red">
            Notre histoire
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
            Louki Sushi
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            Louki Sushi est né d&apos;une idée simple : proposer à Bruxelles
            des sushis frais et savoureux lorsque les autres restaurants
            ferment leurs portes. Nous avons d&apos;abord travaillé
            exclusivement de nuit pour accompagner vos soirées et satisfaire
            vos envies jusqu&apos;au petit matin.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">
            Aujourd&apos;hui, l&apos;aventure continue : tous les jours, de
            18h00 à 04h00, notre engagement reste le même — des produits
            frais, des préparations à la demande et le bonheur de vous
            régaler jusqu&apos;au bout de la nuit.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">
            Et pour prolonger ce plaisir jusque chez vous, nous vous livrons
            gratuitement dans tout Bruxelles.
          </p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl fade-in">
          <Image
            src="/assets/photos/about-rolls-platter.jpg"
            alt="Plateau de rolls Louki Sushi"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
