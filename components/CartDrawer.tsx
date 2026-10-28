"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, parsePrice } from "@/lib/money";
import { isValidPhone } from "@/lib/phone";
import { MIN_DELIVERY_ORDER, ORDER_TYPES, type OrderType } from "@/lib/site-config";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import QuantityStepper from "@/components/QuantityStepper";
import OrderConfirmModal from "@/components/OrderConfirmModal";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import RecommendationModal from "@/components/RecommendationModal";

export default function CartDrawer() {
  const { lines, total, isDrawerOpen, closeDrawer, setQuantity, removeItem, clearCart } =
    useCart();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const [justSent, setJustSent] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRecommendOpen, setIsRecommendOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      panelRef.current?.scrollTo(0, 0);
      setJustSent(false);
      setIsConfirmOpen(false);
      setIsRecommendOpen(false);
    }
  }, [isDrawerOpen]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("Livraison à domicile");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const isDelivery = orderType === "Livraison à domicile";
  const meetsMinDeliveryOrder = !isDelivery || total >= MIN_DELIVERY_ORDER;

  const isValid =
    lines.length > 0 &&
    name.trim().length > 0 &&
    isValidPhone(phone) &&
    (!isDelivery || address.trim().length >= 5) &&
    meetsMinDeliveryOrder;

  const waUrl = useMemo(() => {
    if (!isValid) return "";
    const message = buildOrderMessage(lines, { name, phone, orderType, address, notes });
    return buildWhatsAppUrl(message);
  }, [isValid, lines, name, phone, orderType, address, notes]);

  const handleSend = () => {
    setJustSent(true);
  };

  const handleNewOrder = () => {
    clearCart();
    closeDrawer();
    setJustSent(false);
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
        ref={panelRef}
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

          {justSent ? (
            <div className="mt-8 text-center">
              <p className="font-display text-xl uppercase tracking-wide text-ink">
                Presque terminé !
              </p>
              <p className="mt-3 font-body text-ink/70">
                WhatsApp vient de s&apos;ouvrir avec votre commande pré-remplie. Vérifiez le
                message et appuyez sur <strong>Envoyer</strong> dans WhatsApp pour la transmettre
                au restaurant.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setJustSent(false)}
                  className="rounded-full border border-ink/20 px-6 py-3 font-display text-sm uppercase tracking-wide text-ink transition-colors hover:bg-ink/5"
                >
                  Revoir ma commande
                </button>
                <button
                  type="button"
                  onClick={handleNewOrder}
                  className="rounded-full bg-red px-6 py-3 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-105"
                >
                  Nouvelle commande
                </button>
              </div>
            </div>
          ) : lines.length === 0 ? (
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

              {!meetsMinDeliveryOrder && (
                <p className="mt-2 rounded-xl bg-peach/40 px-4 py-3 font-body text-xs text-ink/70">
                  Minimum de commande pour la livraison : {formatPrice(MIN_DELIVERY_ORDER)}. Il
                  manque {formatPrice(MIN_DELIVERY_ORDER - total)}.
                </p>
              )}

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
                <div>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink/40"
                  />
                  {phone.trim().length > 0 && !isValidPhone(phone) && (
                    <p className="mt-1 px-1 font-body text-xs text-red">
                      Numéro de téléphone invalide.
                    </p>
                  )}
                </div>
                {isDelivery && (
                  <AddressAutocomplete
                    placeholder="Adresse de livraison"
                    value={address}
                    onChange={setAddress}
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

              <button
                type="button"
                disabled={!isValid}
                onClick={() => setIsRecommendOpen(true)}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-lg uppercase tracking-wide text-white shadow-lg transition-transform ${
                  isValid
                    ? "bg-red shadow-red/40 hover:scale-105"
                    : "pointer-events-none bg-ink/20 shadow-none"
                }`}
              >
                Commander via WhatsApp
              </button>
            </>
          )}
        </div>
      </div>

      <RecommendationModal
        isOpen={isRecommendOpen}
        onClose={() => setIsRecommendOpen(false)}
        onContinue={() => {
          setIsRecommendOpen(false);
          // Retirer un dessert/une boisson peut repasser sous le minimum de livraison :
          // on revient alors au panier, où le message d'erreur s'affiche.
          if (isValid) setIsConfirmOpen(true);
        }}
      />

      <OrderConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        lines={lines}
        contact={{ name, phone, orderType, address, notes }}
        total={total}
        waUrl={waUrl}
        onConfirmed={handleSend}
      />
    </>
  );
}
