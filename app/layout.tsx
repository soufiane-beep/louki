import type { Metadata, Viewport } from "next";
import { Oswald, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { SiteJsonLd } from "@/components/JsonLd";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Louki Sushi — Rolls, Baos & Poke Bowls à Bruxelles (Anderlecht)",
  description:
    "Louki Sushi, cuisine japonaise accessible et street food moderne à Bruxelles. Rolls généreux, baos, poke bowls, donburi et udon. À emporter ou livraison gratuite dans tout Bruxelles, tous les jours de 18h à 4h.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "/",
    siteName: BUSINESS.name,
    title: "Louki Sushi — Rolls, Baos & Poke Bowls à Bruxelles",
    description:
      "Cuisine japonaise et street food moderne à Anderlecht. À emporter ou livraison gratuite dans tout Bruxelles, tous les jours de 18h à 4h.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Plats Louki Sushi — rolls, baos et poke bowls",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Louki Sushi — Rolls, Baos & Poke Bowls à Bruxelles",
    description:
      "Cuisine japonaise et street food moderne à Anderlecht. Livraison gratuite dans tout Bruxelles, tous les jours de 18h à 4h.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#F5F4F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${oswald.variable} ${dmSans.variable} font-body bg-cream text-ink antialiased`}>
        {/* Retient un tap sur le burger fait avant l'hydratation (sinon il est perdu) ; la Navbar le rejoue au montage. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function h(e){var t=e.target;if(t&&t.closest&&t.closest("[data-menu-toggle]")){window.__loukiMenuPending=!window.__loukiMenuPending;}}window.__loukiMenuEarly=h;document.addEventListener("click",h,true);})();`,
          }}
        />
        <SiteJsonLd />
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
