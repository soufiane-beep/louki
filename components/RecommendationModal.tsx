"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { menuCategories } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import QuantityStepper from "@/components/QuantityStepper";

const dessertsCategory = menuCategories.find((c) => c.slug === "desserts");
const drinksCategory = menuCategories.find((c) => c.slug === "boissons");

// Quelques boissons mises en avant plutôt que la carte complète (~30 références).
const FEATURED_DRINKS_COUNT = 6;

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function RecommendationModal({ isOpen, onClose, onContinue }: RecommendationModalProps) {
  const { addItem, setQuantity, quantityOf } = useCart();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.scrollTo(0, 0);
    }
  }, [isOpen]);

  if (!dessertsCategory || !drinksCategory) return null;
  const featuredDrinks = drinksCategory.items.slice(0, FEATURED_DRINKS_COUNT);

  const renderRow = (categorySlug: string, item: (typeof dessertsCategory.items)[number]) => {
    const qty = quantityOf(categorySlug, item.name);
    return (
      <div
        key={item.name}
        className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3"
      >
        {item.image && (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink">
            <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
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
            onIncrement={() => addItem(categorySlug, item.name, item.price)}
            onDecrement={() => setQuantity(categorySlug, item.name, qty - 1)}
          />
        ) : (
          <button
            type="button"
            onClick={() => addItem(categorySlug, item.name, item.price)}
            className="rounded-full bg-red px-3 py-1 font-display text-xs uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            + Ajouter
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[100] flex items-end justify-center bg-ink/50 p-0 transition-opacity duration-300 sm:items-center sm:p-5 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-h-[80vh] max-w-md overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-2xl transition-transform duration-300 sm:rounded-3xl ${
          isOpen ? "translate-y-0" : "translate-y-full sm:translate-y-0"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-sm uppercase tracking-widest text-red">
              Une dernière envie ?
            </p>
            <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-ink">
              Desserts &amp; boissons
            </h3>
          </div>
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            ✕
          </button>
        </div>

        <p className="mt-4 font-display text-xs uppercase tracking-widest text-ink/50">
          {dessertsCategory.label}
        </p>
        <div className="mt-2 space-y-3">
          {dessertsCategory.items.map((item) => renderRow(dessertsCategory.slug, item))}
        </div>

        <p className="mt-5 font-display text-xs uppercase tracking-widest text-ink/50">
          {drinksCategory.label}
        </p>
        <div className="mt-2 space-y-3">
          {featuredDrinks.map((item) => renderRow(drinksCategory.slug, item))}
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-6 w-full rounded-full bg-ink px-6 py-3 font-display text-sm uppercase tracking-wide text-cream transition-transform hover:scale-105"
        >
          Continuer vers la commande
        </button>
      </div>
    </div>
  );
}
