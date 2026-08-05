import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      <Image
        src="/assets/photos/hero-spread.jpg"
        alt="Spread de plats Louki Sushi"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/50" />

      <div className="relative z-10 flex flex-col items-center px-5 text-center fade-in">
        <Image
          src="/assets/logo-panda.png"
          alt="Louki Sushi"
          width={340}
          height={340}
          priority
          className="h-44 w-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.55)] md:h-64"
        />

        <h1 className="mt-6 font-display text-lg font-normal uppercase tracking-widest text-white md:text-xl">
          <span className="sr-only">Louki Sushi — </span>Rolls, Baos &amp; Poke Bowls · Bruxelles
        </h1>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/menu"
            className="rounded-full bg-red px-7 py-3 font-display text-sm uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            Voir le menu
          </a>
          <a
            href="/#infos"
            className="rounded-full border border-white px-7 py-3 font-display text-sm uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink"
          >
            Nous trouver
          </a>
        </div>
      </div>
    </section>
  );
}
