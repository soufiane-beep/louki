import Image from "next/image";
import Link from "next/link";

const highlights = [
  { slug: "special-rolls", label: "Spécial Rolls", image: "/assets/menu/special-rolls.jpg" },
  { slug: "poke-bowls", label: "Poke Bowls", image: "/assets/menu/poke-bowls.jpg" },
  { slug: "baos-burger", label: "Baos Burger", image: "/assets/menu/baos-burger.jpg" },
  { slug: "plateaux", label: "Plateaux", image: "/assets/menu/plateaux.jpg" },
];

export default function MenuTeaser() {
  return (
    <section className="bg-cream px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-center font-display text-sm uppercase tracking-widest text-red">
          La carte
        </p>
        <h2 className="mt-2 text-center font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
          Un avant-goût du menu
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center font-body text-sm text-ink/60 md:text-base">
          Rolls généreux, baos gourmands, poke bowls frais et plateaux à partager — découvrez
          toute la carte Louki Sushi.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {highlights.map((item) => (
            <Link
              key={item.slug}
              href={`/menu?cat=${item.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-3 font-display text-sm uppercase leading-tight tracking-wide text-white md:text-base">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/menu"
            className="rounded-full bg-red px-8 py-3 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            Voir toute la carte
          </Link>
        </div>
      </div>
    </section>
  );
}
