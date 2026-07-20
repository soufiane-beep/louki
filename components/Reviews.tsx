function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.6l-5.18 2.85.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

function IconGoogle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.61 20.08H42V20H24v8h11.3c-1.65 4.66-6.08 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.85 1.15 7.96 3.04l5.66-5.66C34.46 6.05 29.5 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92z"
      />
      <path
        fill="#FF3D00"
        d="M6.31 14.69l6.57 4.82C14.66 15.9 18.99 13 24 13c3.06 0 5.85 1.15 7.96 3.04l5.66-5.66C34.46 6.05 29.5 4 24 4c-7.6 0-14.19 4.34-17.69 10.69z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.29-2.07 13.98-5.44l-6.45-5.46C29.44 34.66 26.86 35.6 24 35.6c-5.2 0-9.61-3.31-11.28-7.94l-6.51 5.02C9.44 39.6 16.16 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.61 20.08H42V20H24v8h11.3c-.78 2.21-2.24 4.09-4.11 5.4l6.45 5.46C40.99 36.3 44 30.65 44 24c0-1.34-.14-2.65-.39-3.92z"
      />
    </svg>
  );
}

const reviews = [
  {
    name: "Chaima El Karimi",
    rating: 5,
    text: "Super restaurant, avec une ambiance familiale et chaleureuse. Je recommande vivement ! Les plats étaient tous délicieux. L'accueil est au top et l'équipe est très sympathique.",
    time: "il y a un mois",
  },
  {
    name: "Sirine Atghaninti",
    rating: 5,
    text: "Incroyable ! J'ai passé un très bon moment et me suis régalé du début à la fin !",
    time: "il y a un mois",
  },
  {
    name: "Ines",
    rating: 5,
    text: "Super endroit ! Les plats sont délicieux et préparés avec des produits frais.",
    time: "il y a un mois",
  },
  {
    name: "Samia Msp",
    rating: 5,
    text: "Très chouette restaurant ! Les produits sont frais, le service est au top et la cuisine est excellente. Une très belle adresse que je recommande sans hésiter.",
    time: "il y a un mois",
  },
  {
    name: "Hin Fet",
    rating: 5,
    text: "Un restaurant halal qui propose de la cuisine japonaise avec du choix : sushis, nouilles, bao, etc. Il vaut vraiment le détour, des plats délicieux.",
    time: "il y a 4 semaines",
  },
  {
    name: "Leila",
    rating: 5,
    text: "Excellent restaurant asiatique avec une superbe présentation et des plats de qualité ! Le service était rapide et le personnel super accueillant et agréable. Une très belle découverte que je recommande vivement !",
    time: "il y a un mois",
  },
];

const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Louki+Sushi+Rue+Erasme+66+1070+Anderlecht";

const googleWriteReviewUrl = googleReviewsUrl;

export default function Reviews() {
  return (
    <section id="avis" className="bg-cream px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-display text-sm uppercase tracking-widest text-red">
            Avis clients
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
            Ce qu&apos;ils en pensent
          </h2>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1 text-red">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar key={i} className="h-5 w-5" />
              ))}
            </div>
            <span className="font-display text-lg text-ink">5,0 sur 5</span>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-ink/60 underline-offset-2 transition-colors hover:text-red hover:underline"
            >
              <IconGoogle className="h-4 w-4" />
              Avis Google
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-md fade-in"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-red">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <IconGoogle className="h-4 w-4" />
              </div>
              <p className="mt-4 flex-1 text-ink/80">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-display text-sm uppercase tracking-wide text-ink">
                  {review.name}
                </p>
                <p className="text-xs text-ink/50">{review.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl bg-ink px-8 py-12 text-center fade-in">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-red/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-peach/20 blur-[100px]" />

          <p className="relative font-display text-sm uppercase tracking-widest text-peach">
            Satisfait du resto ?
          </p>
          <h3 className="relative mx-auto mt-2 max-w-xl font-display text-3xl uppercase tracking-wide text-white md:text-4xl">
            N&apos;hésitez pas à laisser un avis sur Google
          </h3>

          <a
            href={googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-red px-8 py-3.5 font-display text-sm uppercase tracking-wide text-white shadow-lg shadow-red/40 transition-transform hover:scale-105"
          >
            <IconGoogle className="h-4 w-4" />
            Laisser un avis
          </a>
        </div>
      </div>
    </section>
  );
}
