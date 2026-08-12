import { menuCategories } from "@/lib/menu-data";
import { formatPrice, parsePrice } from "@/lib/money";
import { WHATSAPP_ORDER_NUMBER, type OrderType } from "@/lib/site-config";
import type { CartLine } from "@/lib/cart-context";

export interface ContactInfo {
  name: string;
  phone: string;
  orderType: OrderType;
  address: string;
  notes: string;
}

export function buildOrderMessage(cart: CartLine[], contact: ContactInfo): string {
  const total = cart.reduce((sum, l) => sum + parsePrice(l.price) * l.quantity, 0);

  const sections = menuCategories
    .map((category) => {
      const categoryLines = cart.filter((l) => l.categorySlug === category.slug);
      if (categoryLines.length === 0) return null;
      const rows = categoryLines
        .map((l) => {
          const lineTotal = formatPrice(parsePrice(l.price) * l.quantity);
          return `${l.quantity}x ${l.itemName} — ${lineTotal}`;
        })
        .join("\n");
      return `${category.label.toUpperCase()}\n${rows}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const lines = [
    "🍣 Nouvelle commande — Louki Sushi",
    "",
    sections,
    "",
    `Total : ${formatPrice(total)}`,
    "",
    "--- Infos client ---",
    `Nom : ${contact.name}`,
    `Téléphone : ${contact.phone}`,
    `Type : ${contact.orderType}`,
  ];

  if (contact.orderType === "Livraison à domicile") {
    lines.push(`Adresse : ${contact.address}`);
  }
  if (contact.notes.trim()) {
    lines.push(`Note : ${contact.notes}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(message)}`;
}
