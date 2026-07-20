"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { menuCategories } from "@/lib/menu-data";

export default function Menu() {
  const searchParams = useSearchParams();
  const initialSlug = menuCategories.find((c) => c.slug === searchParams.get("cat"))?.slug;
  const [active, setActive] = useState(initialSlug ?? menuCategories[0].slug);
  const category = menuCategories.find((c) => c.slug === active)!;

  const selectCategory = (slug: string) => {
    setActive(slug);
    const section = document.getElementById("menu");
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="menu" className="bg-cream px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-center font-display text-sm uppercase tracking-widest text-red">
          La carte
        </p>
        <h2 className="mt-2 text-center font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
          Le menu
        </h2>

        <div className="sticky top-[68px] z-40 -mx-5 mt-10 flex flex-wrap justify-center gap-2 bg-cream/95 px-5 py-3 backdrop-blur-sm">
          {menuCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => selectCategory(cat.slug)}
              className={`rounded-full px-4 py-2 font-display text-xs uppercase tracking-wide transition-colors md:text-sm ${
                active === cat.slug
                  ? "bg-red text-white"
                  : "bg-white text-ink hover:bg-peach/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-12 fade-in" key={category.slug}>
          <div className="relative mb-6 inline-block">
            <span className="absolute inset-0 -skew-x-3 bg-peach" />
            <h3 className="relative px-4 py-1 font-display text-2xl uppercase tracking-wide text-ink">
              {category.label}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) =>
              item.image ? (
                <div
                  key={item.name}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="flex items-end justify-between gap-3">
                      <p className="font-display text-lg uppercase leading-tight tracking-wide text-white">
                        {item.name}
                      </p>
                      <p className="shrink-0 font-display text-lg text-peach">{item.price}</p>
                    </div>
                    {item.note && (
                      <span className="font-body text-xs uppercase tracking-normal text-peach">
                        ({item.note})
                      </span>
                    )}
                    {item.description && (
                      <p className="mt-1 font-body text-sm text-white/70">{item.description}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  key={item.name}
                  className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-lg uppercase leading-tight tracking-wide text-ink">
                      {item.name}
                      {item.note && (
                        <span className="ml-2 font-body text-xs font-normal uppercase tracking-normal text-red">
                          ({item.note})
                        </span>
                      )}
                    </p>
                    <p className="shrink-0 font-display text-lg text-red">{item.price}</p>
                  </div>
                  {item.description && (
                    <p className="mt-2 font-body text-sm text-ink/60">{item.description}</p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
