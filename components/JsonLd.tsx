import { BUSINESS, SITE_URL } from "@/lib/site";
import { menuCategories } from "@/lib/menu-data";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: BUSINESS.name,
  url: SITE_URL,
  description: BUSINESS.description,
  image: `${SITE_URL}/assets/og-image.jpg`,
  logo: `${SITE_URL}/assets/logo-panda.png`,
  telephone: BUSINESS.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    postalCode: BUSINESS.address.postalCode,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  servesCuisine: BUSINESS.cuisine,
  priceRange: BUSINESS.priceRange,
  currenciesAccepted: "EUR",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: BUSINESS.hours.opens,
    closes: BUSINESS.hours.closes,
  },
  hasMenu: `${SITE_URL}/menu`,
  sameAs: BUSINESS.socials,
  potentialAction: {
    "@type": "OrderAction",
    target: `tel:${BUSINESS.phone}`,
    deliveryMethod: [
      "http://purl.org/goodrelations/v1#DeliveryModePickUp",
      "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    ],
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: BUSINESS.name,
  url: SITE_URL,
  inLanguage: "fr-BE",
  publisher: { "@id": `${SITE_URL}/#restaurant` },
};

export function SiteJsonLd() {
  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={webSiteSchema} />
    </>
  );
}

function parsePrice(price: string): string {
  // "13,70 €" → "13.70"
  return price.replace("€", "").trim().replace(",", ".");
}

const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${SITE_URL}/menu#menu`,
  name: `Menu — ${BUSINESS.name}`,
  inLanguage: "fr-BE",
  mainEntityOfPage: `${SITE_URL}/menu`,
  hasMenuSection: menuCategories.map((category) => ({
    "@type": "MenuSection",
    name: category.label,
    hasMenuItem: category.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: `${SITE_URL}${item.image}` } : {}),
      offers: {
        "@type": "Offer",
        price: parsePrice(item.price),
        priceCurrency: "EUR",
      },
    })),
  })),
};

export function MenuJsonLd() {
  return <JsonLd data={menuSchema} />;
}
