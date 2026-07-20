import type { Metadata } from "next";
import { Oswald, DM_Sans } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
