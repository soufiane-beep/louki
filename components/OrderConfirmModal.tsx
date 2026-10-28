"use client";

import { useEffect, useRef, useState } from "react";
import type { CartLine } from "@/lib/cart-context";
import { formatPrice, parsePrice } from "@/lib/money";
import type { ContactInfo } from "@/lib/whatsapp";
import { ORDER_COOLDOWN_MS, getRemainingCooldownMs, markOrderSent } from "@/lib/use-order-cooldown";

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  lines: CartLine[];
  contact: ContactInfo;
  total: number;
  waUrl: string;
  onConfirmed: () => void;
}

export default function OrderConfirmModal({
  isOpen,
  onClose,
  lines,
  contact,
  total,
  waUrl,
  onConfirmed,
}: OrderConfirmModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hasSentRef = useRef(false);
  const [cooldownMs, setCooldownMs] = useState(0);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.scrollTo(0, 0);
      hasSentRef.current = false;
      setCooldownMs(getRemainingCooldownMs());
    }
  }, [isOpen]);

  const handleConfirmClick = (e: React.MouseEvent) => {
    if (!waUrl) {
      e.preventDefault();
      return;
    }
    if (hasSentRef.current) return;
    hasSentRef.current = true;
    markOrderSent();
    onConfirmed();
    onClose();
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
              Dernière vérification
            </p>
            <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-ink">
              Vérifiez votre commande
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

        <div className="mt-5 space-y-2">
          {lines.map((line) => (
            <div
              key={`${line.categorySlug}::${line.itemName}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-3"
            >
              <p className="min-w-0 flex-1 truncate font-body text-sm text-ink">
                {line.quantity}x {line.itemName}
              </p>
              <p className="font-body text-xs text-ink/50">
                {formatPrice(parsePrice(line.price) * line.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="font-display text-sm uppercase tracking-wide text-ink/60">Total</span>
          <span className="font-display text-2xl text-ink">{formatPrice(total)}</span>
        </div>

        <div className="mt-4 space-y-1 rounded-2xl border border-ink/10 bg-white p-3 font-body text-sm text-ink/80">
          <p>{contact.name}</p>
          <p>{contact.phone}</p>
          <p>{contact.orderType}</p>
          {contact.orderType === "Livraison à domicile" && contact.address && (
            <p>{contact.address}</p>
          )}
          {contact.notes.trim() && <p className="text-ink/60">{contact.notes}</p>}
        </div>

        {cooldownMs > 0 && (
          <p className="mt-4 rounded-xl bg-peach/40 px-4 py-3 font-body text-xs text-ink/70">
            Vous avez déjà envoyé une commande il y a moins de{" "}
            {Math.ceil(ORDER_COOLDOWN_MS / 60_000)} minutes. Envoyer quand même ?
          </p>
        )}

        <a
          href={waUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleConfirmClick}
          aria-disabled={!waUrl}
          className={`mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-lg uppercase tracking-wide text-white shadow-lg transition-transform ${
            waUrl ? "bg-red shadow-red/40 hover:scale-105" : "pointer-events-none bg-ink/20 shadow-none"
          }`}
        >
          Confirmer et envoyer via WhatsApp
        </a>
      </div>
    </div>
  );
}
