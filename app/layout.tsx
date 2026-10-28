import type { Metadata } from "next";
import { Oswald, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";

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
  title: "Louki Sushi — Rolls, Baos & Poke Bowls à Bruxelles",
  description:
    "Louki Sushi, cuisine japonaise accessible et street food moderne à Bruxelles. Rolls généreux, baos, poke bowls et plus encore.",
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
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
