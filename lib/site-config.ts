// Numéro WhatsApp qui reçoit les commandes, format wa.me : international, chiffres uniquement,
// sans "+", sans "00", sans espaces (ex. un 04XX XX XX XX belge devient "324XXXXXXXX").
// C'est le numéro du restaurant affiché sur le site (0492 75 39 39).
export const WHATSAPP_ORDER_NUMBER = "32492753939";

export const ORDER_TYPES = ["À emporter", "Livraison à domicile"] as const;

export type OrderType = (typeof ORDER_TYPES)[number];

// Montant minimum (en euros) pour une commande en livraison à domicile.
export const MIN_DELIVERY_ORDER = 15;
