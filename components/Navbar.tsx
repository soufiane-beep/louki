"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/#avis", label: "Avis" },
  { href: "/#infos", label: "Infos" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only the homepage has a dark hero behind the header, so only there
  // can the header start transparent with white text — every other page
  // has a light background at the top and needs the solid/dark treatment.
  const hasDarkHero = pathname === "/";
  const solid = !hasDarkHero || scrolled;

  useEffect(() => {
    if (!hasDarkHero) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-cream/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
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

        <button
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span
            className={`h-0.5 w-6 transition-colors ${
              solid || open ? "bg-ink" : "bg-white"
            }`}
          />
          <span
            className={`h-0.5 w-6 transition-colors ${
              solid || open ? "bg-ink" : "bg-white"
            }`}
          />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 bg-cream px-5 pb-4 font-display text-sm uppercase tracking-wide md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-ink hover:bg-peach/30"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
