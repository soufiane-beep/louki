// Numéro WhatsApp qui reçoit les commandes, format wa.me : international, chiffres uniquement,
// sans "+", sans "00", sans espaces (ex. un 04XX XX XX XX belge devient "324XXXXXXXX").
//
// ⚠️ NUMÉRO DE TEST (personnel, pour valider le flux) — à remplacer par le numéro WhatsApp
// officiel du restaurant avant la mise en ligne. C'est le SEUL endroit à modifier : pas de
// fichier .env, pas de rebuild particulier, juste changer la valeur ci-dessous puis `npm run build`.
export const WHATSAPP_ORDER_NUMBER = "32487655595";

export const ORDER_TYPES = ["À emporter", "Livraison à domicile"] as const;

export type OrderType = (typeof ORDER_TYPES)[number];

// Catégorie proposée en upsell juste après l'ajout d'un plat au panier.
export const SIDES_CATEGORY_SLUG = "accompagnements";

// Catégories pour lesquelles on ne propose pas de sides (l'article ajouté en fait déjà partie).
export const CATEGORIES_WITHOUT_SIDES_UPSELL = ["accompagnements", "boissons", "desserts"];
