import { IconInstagram, IconTikTok, IconSnapchat, IconPhone } from "@/components/SocialIcons";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/loukisushi", Icon: IconInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@loukisushi", Icon: IconTikTok },
  { label: "Snapchat", href: "https://www.snapchat.com/@loukisushi", Icon: IconSnapchat },
];

const options = ["À emporter", "Livraison à domicile"];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink px-5 py-24 text-cream"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(245,244,242,0.04) 0px, rgba(245,244,242,0.04) 1px, transparent 1px, transparent 15px)",
      }}
    >
      <div className="pointer-events-none absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-red/30 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-peach/20 blur-[110px]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="relative mb-5 inline-block">
          <span className="absolute inset-0 -skew-x-3 bg-peach" />
          <p className="relative px-4 py-1 font-display text-sm uppercase tracking-widest text-ink">
            Une envie de sushi ?
          </p>
        </div>
        <h2 className="font-display text-4xl uppercase tracking-wide text-white md:text-6xl">
          On vous prépare ça
        </h2>
        <p className="mx-auto mt-4 max-w-md text-cream/60">
          Appelez-nous pour commander : à emporter ou livré chez vous, tout est préparé frais à
          la commande.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {options.map((option) => (
            <span
              key={option}
              className="rounded-full border border-cream/20 px-4 py-1.5 font-display text-xs uppercase tracking-wide text-cream/80"
            >
              {option}
            </span>
          ))}
        </div>

        <a
          href="tel:0492753939"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-red px-8 py-4 font-display text-xl uppercase tracking-wide text-white shadow-lg shadow-red/40 transition-transform hover:scale-105 md:text-2xl"
        >
          <IconPhone className="h-6 w-6" />
          0492 75 39 39
        </a>

        <p className="mt-6 font-body text-sm text-cream/50">
          Rue Érasme 66, 1070 Anderlecht · Tous les jours — 18h à 04h
        </p>

        <div className="mt-12 flex items-center justify-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-peach hover:bg-peach hover:text-ink"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
