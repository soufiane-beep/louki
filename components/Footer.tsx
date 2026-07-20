import Image from "next/image";
import { IconInstagram, IconTikTok, IconSnapchat } from "@/components/SocialIcons";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/#infos", label: "Infos" },
  { href: "/#contact", label: "Contact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/loukisushi", Icon: IconInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@loukisushi", Icon: IconTikTok },
  { label: "Snapchat", href: "https://www.snapchat.com/@loukisushi", Icon: IconSnapchat },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cream/95 p-2">
            <Image
              src="/assets/logo-panda.png"
              alt="Louki Sushi"
              width={64}
              height={64}
              priority
              className="h-full w-auto"
            />
          </div>
          <p className="font-display text-lg uppercase tracking-wide">
            Louki Sushi
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-display text-sm uppercase tracking-wider text-peach">
            Liens rapides
          </p>
          <ul className="flex flex-col gap-2 text-sm text-cream/80">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-display text-sm uppercase tracking-wider text-peach">
            Suivez-nous
          </p>
          <ul className="flex flex-col gap-4">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-cream/70 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-display text-sm uppercase tracking-wider text-peach">
            Contact
          </p>
          <ul className="flex flex-col gap-2 text-sm text-cream/80">
            <li>
              <a href="tel:0492753939" className="transition-colors hover:text-white">
                0492 75 39 39
              </a>
            </li>
            <li>Rue Érasme 66, 1070 Anderlecht</li>
            <li className="pt-1 text-cream/50">Tous les jours — 18h à 04h</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Louki Sushi — Tous droits réservés.
      </div>
    </footer>
  );
}
