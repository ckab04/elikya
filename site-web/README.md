# Site web institutionnel – Centre de santé Elikya (Phase 1)

Site vitrine du centre : présentation, services, tarifs, partenaires et contact.
Il ne gère **aucune donnée médicale**. La gestion des patients et du laboratoire (LIMS) se fera dans
une application séparée, comme le recommande l'analyse du SI.

## Stack

- Angular 22 (composants standalone, signals, sans zone.js, Signal Forms)
- Prérendu statique (SSG) au build, pour le référencement et des pages légères
- SCSS et polices système : aucune dépendance UI, aucun téléchargement de police

## Commandes

```bash
npm start          # serveur de développement : http://localhost:4200
npm run build      # build de production + prérendu → dist/site-web/browser
npm test           # tests unitaires (Vitest)
```

## Modifier le contenu

| Quoi | Fichier |
|---|---|
| Nom, adresse, téléphone, WhatsApp, e-mail, horaires, réseaux sociaux | `src/app/core/site.config.ts` |
| Liste des services et grille tarifaire | `src/app/core/content.ts` |
| Titres et descriptions des pages (SEO) | `src/app/app.routes.ts` |
| Couleurs et styles globaux | `src/styles.scss` |

Les valeurs « à confirmer » et les tarifs `null` sont à remplacer avant la mise en ligne.

## Déploiement

Le dossier `dist/site-web/browser` contient un site **100 % statique**. On peut l'héberger sur
Netlify, Cloudflare Pages, GitHub Pages ou un simple serveur nginx. Le serveur Node (SSR)
n'est pas nécessaire.

## Formulaire de contact

Le site n'a pas de serveur, donc aucune donnée n'est stockée. Le formulaire prépare un message et
ouvre WhatsApp ou le logiciel de messagerie du visiteur.
