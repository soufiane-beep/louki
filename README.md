# Louki Sushi

Site vitrine de [Louki Sushi](https://louki-sushi.web.app) — restaurant de cuisine japonaise et street food à Anderlecht (Bruxelles).

## Stack

- [Next.js 14](https://nextjs.org) (App Router, `output: "export"` — site 100 % statique)
- Tailwind CSS
- Hébergement : Firebase Hosting (projet `louki-sushi`)

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & déploiement

```bash
npm run build    # exporte le site statique dans out/
firebase deploy  # déploie out/ sur Firebase Hosting
```

## SEO

- L'URL canonique du site est définie dans `lib/site.ts` (`SITE_URL`) — à mettre à jour lors du passage à un domaine personnalisé, puis rebuild + redeploy.
- Les infos business (adresse, téléphone, horaires) vivent aussi dans `lib/site.ts` et alimentent les métadonnées et le balisage schema.org (`components/JsonLd.tsx`).
- Le menu (`lib/menu-data.ts`) génère automatiquement le balisage `Menu`/`MenuItem` schema.org de la page `/menu`.
- `app/robots.ts`, `app/sitemap.ts` et `public/llms.txt` génèrent robots.txt, sitemap.xml et llms.txt.
