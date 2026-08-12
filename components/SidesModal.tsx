"use client";

import Image from "next/image";
import { menuCategories } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { SIDES_CATEGORY_SLUG } from "@/lib/site-config";
import QuantityStepper from "@/components/QuantityStepper";

const sidesCategory = menuCategories.find((c) => c.slug === SIDES_CATEGORY_SLUG);

export default function SidesModal() {
  const { isSidesModalOpen, closeSidesModal, addItem, setQuantity, quantityOf } = useCart();

  if (!sidesCategory) return null;

  return (
    <div
      aria-hidden={!isSidesModalOpen}
      className={`fixed inset-0 z-[100] flex items-end justify-center bg-ink/50 p-0 transition-opacity duration-300 sm:items-center sm:p-5 ${
        isSidesModalOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={closeSidesModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-h-[80vh] max-w-md overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-2xl transition-transform duration-300 sm:rounded-3xl ${
          isSidesModalOpen ? "translate-y-0" : "translate-y-full sm:translate-y-0"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-sm uppercase tracking-widest text-red">
              Envie d&apos;un petit plus ?
            </p>
            <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-ink">
              Ajoutez un accompagnement
            </h3>
          </div>
          <button
            type="button"
            aria-label="Fermer"
            onClick={closeSidesModal}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {sidesCategory.items.map((item) => {
            const qty = quantityOf(sidesCategory.slug, item.name);
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3"
              >
                {item.image && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm uppercase tracking-wide text-ink">
                    {item.name}
                  </p>
                  <p className="font-body text-xs text-ink/50">{item.price}</p>
                </div>
                {qty > 0 ? (
                  <QuantityStepper
                    size="sm"
                    quantity={qty}
                    onIncrement={() => addItem(sidesCategory.slug, item.name, item.price)}
                    onDecrement={() => setQuantity(sidesCategory.slug, item.name, qty - 1)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => addItem(sidesCategory.slug, item.name, item.price)}
                    className="rounded-full bg-red px-3 py-1 font-display text-xs uppercase tracking-wide text-white transition-transform hover:scale-105"
                  >
                    + Ajouter
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={closeSidesModal}
          className="mt-6 w-full rounded-full bg-ink px-6 py-3 font-display text-sm uppercase tracking-wide text-cream transition-transform hover:scale-105"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
