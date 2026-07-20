export default function Info() {
  return (
    <section id="infos" className="bg-cream px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-sm uppercase tracking-widest text-red">
          Infos pratiques
        </p>
        <h2 className="mt-2 font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
          Nous trouver
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <dl className="space-y-6 text-base">
            <div>
              <dt className="font-display text-sm uppercase tracking-wide text-red">
                Adresse
              </dt>
              <dd className="mt-1 text-ink/80">Rue Érasme 66, 1070 Anderlecht</dd>
            </div>
            <div>
              <dt className="font-display text-sm uppercase tracking-wide text-red">
                Horaires
              </dt>
              <dd className="mt-1 text-ink/80">Tous les jours — 18h00 à 04h00</dd>
            </div>
            <div>
              <dt className="font-display text-sm uppercase tracking-wide text-red">
                Téléphone
              </dt>
              <dd className="mt-1 text-ink/80">
                <a href="tel:0492753939" className="hover:text-red transition-colors">
                  0492 75 39 39
                </a>
              </dd>
            </div>
          </dl>

          <div className="overflow-hidden rounded-2xl shadow-md">
            <iframe
              title="Louki Sushi — Rue Érasme 66, Anderlecht"
              src="https://maps.google.com/maps?q=Rue+Erasme+66,+1070+Anderlecht,+Belgique&z=16&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[320px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
