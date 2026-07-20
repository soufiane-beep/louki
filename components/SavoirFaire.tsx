import Image from "next/image";

const points = [
  { title: "Produits frais", body: "Chaque rouleau est préparé à la commande, avec des ingrédients sélectionnés chaque matin. Pas de stock, pas de compromis." },
  { title: "Technique maîtrisée", body: "Le riz vinaigré, la découpe du saumon, le croustillant du tempura — chaque geste compte. On ne fait pas du sushi vite fait." },
  { title: "Âme street food", body: "Des recettes directes, des saveurs franches, une générosité qu'on assume. Le Japon revisité à la bruxelloise." },
];

export default function SavoirFaire() {
  return (
    <section className="bg-ink overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
        <div className="relative min-h-[420px] md:min-h-[600px]">
          <Image
            src="/assets/photos/savoir-faire-team.jpg"
            alt="L'équipe Louki Sushi"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/60 hidden md:block" />
        </div>

        <div className="flex flex-col justify-center px-8 py-16 md:px-14 lg:px-20">
          <p className="font-display text-sm uppercase tracking-widest text-peach">
            Notre savoir-faire
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-tight tracking-wide text-white md:text-5xl">
            Fait avec<br />intention
          </h2>

          <ul className="mt-10 space-y-8">
            {points.map((p) => (
              <li key={p.title} className="flex gap-5">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-peach" />
                <div>
                  <p className="font-display text-base uppercase tracking-wide text-white">
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
