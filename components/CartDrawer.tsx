"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, parsePrice } from "@/lib/money";
import { ORDER_TYPES, type OrderType } from "@/lib/site-config";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import QuantityStepper from "@/components/QuantityStepper";

export default function CartDrawer() {
  const { lines, total, isDrawerOpen, closeDrawer, setQuantity, removeItem, clearCart } =
    useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<OrderType>(ORDER_TYPES[0]);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const isValid =
    lines.length > 0 &&
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    (orderType !== "Livraison à domicile" || address.trim().length > 0);

  const waUrl = useMemo(() => {
    if (!isValid) return "";
    const message = buildOrderMessage(lines, { name, phone, orderType, address, notes });
    return buildWhatsAppUrl(message);
  }, [isValid, lines, name, phone, orderType, address, notes]);

  const handleSend = () => {
    clearCart();
    closeDrawer();
  };

  return (
    <>
      <div
        onClick={closeDrawer}
        aria-hidden={!isDrawerOpen}
        className={`fixed inset-0 z-[90] bg-ink/50 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isDrawerOpen}
        className={`fixed inset-x-0 bottom-0 z-[95] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-lg px-5 pb-8 pt-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
              Votre commande
            </h2>
            <button
              type="button"
              aria-label="Fermer"
              onClick={closeDrawer}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              ✕
            </button>
          </div>

          {lines.length === 0 ? (
            <div className="mt-8 text-center">
              <p className="font-body text-ink/60">Votre panier est vide.</p>
              <Link
                href="/menu"
                onClick={closeDrawer}
                className="mt-4 inline-block rounded-full bg-red px-6 py-3 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-105"
              >
                Voir le menu
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-6 space-y-3">
                {lines.map((line) => (
                  <div
                    key={`${line.categorySlug}::${line.itemName}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm uppercase tracking-wide text-ink">
                        {line.itemName}
                      </p>
                      <p className="font-body text-xs text-ink/50">
                        {formatPrice(parsePrice(line.price) * line.quantity)}
                      </p>
                    </div>
                    <QuantityStepper
                      size="sm"
                      quantity={line.quantity}
                      onIncrement={() =>
                        setQuantity(line.categorySlug, line.itemName, line.quantity + 1)
                      }
                      onDecrement={() =>
                        setQuantity(line.categorySlug, line.itemName, line.quantity - 1)
                      }
                    />
                    <button
                      type="button"
                      aria-label={`Retirer ${line.itemName}`}
                      onClick={() => removeItem(line.categorySlug, line.itemName)}
                      className="text-ink/40 transition-colors hover:text-red"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="font-display text-sm uppercase tracking-wide text-ink/60">
                  Total
                </span>
                <span className="font-display text-2xl text-ink">{formatPrice(total)}</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {ORDER_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`rounded-full border px-4 py-1.5 font-display text-xs uppercase tracking-wide transition-colors ${
                        orderType === type
                          ? "border-red bg-red text-white"
                          : "border-ink/20 bg-white text-ink hover:bg-peach/30"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/40"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/40"
                />
                {orderType === "Livraison à domicile" && (
                  <input
                    type="text"
                    placeholder="Adresse de livraison"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/40"
                  />
                )}
                <textarea
                  placeholder="Notes (allergies, sans oignons, ...)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-ink/10 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/40"
                />
              </div>

              <a
                href={waUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={isValid ? handleSend : (e) => e.preventDefault()}
                aria-disabled={!isValid}
                className={`mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-lg uppercase tracking-wide text-white shadow-lg transition-transform ${
                  isValid
                    ? "bg-red shadow-red/40 hover:scale-105"
                    : "pointer-events-none bg-ink/20 shadow-none"
                }`}
              >
                Commander via WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
