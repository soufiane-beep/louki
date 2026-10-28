// Single source of truth for business info used in metadata, JSON-LD and llms.txt.
// When the custom domain is live, update SITE_URL and redeploy — everything follows.
export const SITE_URL = "https://louki-sushi.web.app";

export const BUSINESS = {
  name: "Louki Sushi",
  description:
    "Louki Sushi, cuisine japonaise accessible et street food moderne à Bruxelles. Rolls généreux, baos, poke bowls, donburi et udon — à emporter ou livrés gratuitement dans tout Bruxelles, tous les jours de 18h00 à 04h00.",
  phone: "+32492753939",
  phoneDisplay: "0492 75 39 39",
  address: {
    street: "Rue Érasme 66",
    postalCode: "1070",
    city: "Anderlecht",
    region: "Bruxelles-Capitale",
    country: "BE",
  },
  // Daily overnight service: opens 18:00, closes 04:00 the next day.
  hours: { opens: "18:00", closes: "04:00" },
  hoursDisplay: "Tous les jours — 18h00 à 04h00",
  priceRange: "€€",
  cuisine: ["Japonaise", "Street food"],
  socials: [
    "https://www.instagram.com/loukisushi",
    "https://www.tiktok.com/@loukisushi",
    "https://www.snapchat.com/@loukisushi",
  ],
} as const;
