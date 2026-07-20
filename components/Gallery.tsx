"use client";

import Image from "next/image";
import { useState } from "react";

const photos = [
  { src: "/assets/photos/gallery-plateau.jpg", alt: "Plateau de rolls", span: "row-span-2" },
  { src: "/assets/photos/gallery-rolls-drizzle.jpg", alt: "Roll nappé de sauce", span: "" },
  { src: "/assets/photos/gallery-poke.jpg", alt: "Poke bowl saumon", span: "" },
  { src: "/assets/photos/gallery-bao-burger.jpg", alt: "Bao burger et frites de patate douce", span: "row-span-2" },
  { src: "/assets/photos/gallery-mojito.jpg", alt: "Mojito fraise", span: "" },
  { src: "/assets/photos/gallery-bao-bite.jpg", alt: "Bao croqué", span: "" },
  { src: "/assets/photos/gallery-udon.jpg", alt: "Udon aux scampis", span: "row-span-2" },
  { src: "/assets/photos/gallery-gyoza.jpg", alt: "Gyozas nappés de sauce", span: "" },
  { src: "/assets/photos/gallery-entree-pick.jpg", alt: "Entrée croustillante", span: "" },
  { src: "/assets/photos/gallery-accompagnements.jpg", alt: "Accompagnements partagés", span: "row-span-2" },
  { src: "/assets/photos/gallery-roll-leaf.jpg", alt: "Rolls sur feuille de bananier", span: "" },
  { src: "/assets/photos/gallery-dessert.jpg", alt: "Tiramisu du jour", span: "" },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galerie" className="bg-cream px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-display text-sm uppercase tracking-widest text-red">
          Instants
        </p>
        <h2 className="mt-2 text-center font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
          Galerie
        </h2>

        <div className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4 md:gap-4">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-xl ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-5"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Fermer"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 font-display text-3xl text-white"
          >
            ×
          </button>
          <div className="relative h-[80vh] w-full max-w-3xl">
            <Image
              src={photos[active].src}
              alt={photos[active].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
