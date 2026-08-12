"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { IconCart } from "@/components/SocialIcons";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/#avis", label: "Avis" },
  { href: "/#infos", label: "Infos" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only the homepage has a dark hero behind the header, so only there
  // can the header start transparent with white text — every other page
  // has a light background at the top and needs the solid/dark treatment.
  const hasDarkHero = pathname === "/";
  const solid = !hasDarkHero || scrolled || open;

  useEffect(() => {
    if (!hasDarkHero) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid ? "bg-cream/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <nav className="relative z-[60] mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setOpen(false);
            }}
            className="flex items-center gap-2"
          >
            <Image
              src="/assets/logo-panda.png"
              alt="Louki Sushi"
              width={48}
              height={48}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-8 font-display text-sm uppercase tracking-wide md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`transition-colors hover:text-red ${
                    solid ? "text-ink" : "text-white drop-shadow"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Voir mon panier"
              onClick={openDrawer}
              className={`relative z-[70] flex h-11 w-11 items-center justify-center transition-colors ${
                solid ? "text-ink" : "text-white drop-shadow"
              }`}
            >
              <IconCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red font-display text-[11px] text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[70] flex h-11 w-11 items-center justify-center md:hidden"
            >
              <span
                className={`absolute h-0.5 w-6 rounded-full transition-all duration-300 ${
                  solid || open ? "bg-ink" : "bg-white"
                } ${open ? "rotate-45" : "-translate-y-[5px]"}`}
              />
              <span
                className={`absolute h-0.5 w-6 rounded-full transition-all duration-300 ${
                  solid || open ? "bg-ink" : "bg-white"
                } ${open ? "-rotate-45" : "translate-y-[5px]"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[45] bg-cream transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] md:hidden ${
          open
            ? "[clip-path:circle(2000px_at_calc(100%-5.625rem)_2.125rem)]"
            : "pointer-events-none [clip-path:circle(0px_at_calc(100%-5.625rem)_2.125rem)]"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-7 font-display text-3xl uppercase tracking-wide text-ink">
          {links.map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="relative inline-block px-2 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
