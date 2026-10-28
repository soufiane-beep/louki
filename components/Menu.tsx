"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { menuCategories } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import QuantityStepper from "@/components/QuantityStepper";

const NAVBAR_HEIGHT = 68; // fixed site header height

export default function Menu() {
  const { addItem, setQuantity, quantityOf } = useCart();
  const searchParams = useSearchParams();
  const initialSlug = menuCategories.find((c) => c.slug === searchParams.get("cat"))?.slug;
  const [active, setActive] = useState(initialSlug ?? menuCategories[0].slug);
  const [scrollOffset, setScrollOffset] = useState(NAVBAR_HEIGHT + 56);

  const barRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const suspendObserver = useRef(false);
  const suspendTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const updateOffset = () => {
      if (barRef.current) setScrollOffset(NAVBAR_HEIGHT + barRef.current.offsetHeight);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const scrollToCategory = (slug: string, behavior: ScrollBehavior = "smooth") => {
    const section = sectionRefs.current[slug];
    if (!section) return;
    suspendObserver.current = true;
    setActive(slug);
    const top = section.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top, behavior });
    clearTimeout(suspendTimeout.current);
    suspendTimeout.current = setTimeout(() => {
      suspendObserver.current = false;
    }, 600);
  };

  useEffect(() => {
    if (!initialSlug) return;
    const t = setTimeout(() => scrollToCategory(initialSlug, "auto"), 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suspendObserver.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: `-${scrollOffset}px 0px -60% 0px`, threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [scrollOffset]);

  return (
    <section className="bg-cream px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-center font-display text-sm uppercase tracking-widest text-red">
          La carte
        </p>
        <h2 className="mt-2 text-center font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
          Le menu
        </h2>

        <div ref={barRef} className="sticky top-[68px] z-40 -mx-5 mt-10 bg-cream/95 backdrop-blur-sm">
          <div className="flex flex-wrap justify-center gap-2 px-5 py-3">
            {menuCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => scrollToCategory(cat.slug)}
                className={`shrink-0 rounded-full px-4 py-2 font-display text-xs uppercase tracking-wide transition-colors md:text-sm ${
                  active === cat.slug
                    ? "bg-red text-white"
                    : "bg-white text-ink hover:bg-peach/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-16">
          {menuCategories.map((category) => (
            <div
              key={category.slug}
              id={category.slug}
              ref={(el) => {
                sectionRefs.current[category.slug] = el;
              }}
              style={{ scrollMarginTop: scrollOffset }}
            >
              <div className="relative mb-6 inline-block">
                <span className="absolute inset-0 -skew-x-3 bg-peach" />
                <h3 className="relative px-4 py-1 font-display text-2xl uppercase tracking-wide text-ink">
                  {category.label}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => {
                  const qty = quantityOf(category.slug, item.name);
                  const cartControl =
                    qty > 0 ? (
                      <QuantityStepper
                        size="sm"
                        quantity={qty}
                        onIncrement={() => addItem(category.slug, item.name, item.price)}
                        onDecrement={() => setQuantity(category.slug, item.name, qty - 1)}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => addItem(category.slug, item.name, item.price)}
                        className="rounded-full bg-red px-3 py-1 font-display text-xs uppercase tracking-wide text-white transition-transform hover:scale-105"
                      >
                        + Ajouter
                      </button>
                    );

                  return item.image ? (
                    <div
                      key={`${category.slug}::${item.name}`}
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
                        <div className="mt-3 flex justify-end">{cartControl}</div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={`${category.slug}::${item.name}`}
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
                      <div className="mt-3 flex justify-end">{cartControl}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
