# Site web institutionnel – Centre de santé Elikya (Phase 1)

Site vitrine du centre, en français et en lingala : présentation, examens, tarifs, partenaires et contact.
Il ne gère **aucune donnée médicale**. La gestion des patients et du laboratoire (LIMS) se fera dans
une application séparée, comme le recommande l'analyse du SI.

## Stack

- Angular 22 (composants standalone, signals, sans zone.js, Signal Forms)
- Prérendu statique (SSG) au build, pour le référencement et des pages légères
- Tailwind CSS 4, police Switzer hébergée avec le site (aucune requête vers un service tiers)
- Deux langues : français (source) et lingala sous `/ln/`

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
| Examens, délais, tubes et prix | `src/app/core/content.ts` |
| Traduction lingala (« phrase française → phrase lingala ») | `src/app/core/i18n.ln.ts` |
| Photos, textes alternatifs et crédits | `src/app/core/photos.ts` |
| Titres et descriptions des pages (SEO) | `src/app/app.routes.ts` |
| Couleurs, tailles de texte, cartes, boutons | `src/styles.css` |

Avant la mise en ligne : remplacer les valeurs « à confirmer » (adresse, téléphone, e-mail), confirmer les prix
(puis passer `PRICES_CONFIRMED` à `true`), et faire relire la traduction lingala par une personne de langue maternelle.
Tout nouveau texte visible doit passer par `| tr` et être ajouté à `i18n.ln.ts`, sinon il s'affiche en français
sur la version lingala.

## Déploiement (Netlify)

Le site est **100 % statique** : `npm run build` prérend les 14 pages (français, et lingala sous `/ln/`)
dans `dist/site-web/browser` et écrit `404.html`. Aucun serveur n'est nécessaire.
La configuration est dans `netlify.toml` (commande de build, dossier publié, Node 22, pages 404
en français et en lingala, cache et en-têtes de sécurité).

**Option 1 — depuis un dépôt Git (recommandé : redéploiement automatique à chaque modification)**

1. Mettre le projet dans un dépôt GitHub, GitLab ou Bitbucket.
2. Sur Netlify : *Add new site → Import an existing project*, choisir le dépôt.
3. Si le dépôt contient tout le dossier `elikya`, indiquer **Base directory : `site-web`**.
   Les autres réglages (commande, dossier publié, version de Node) viennent de `netlify.toml`.
4. *Deploy*.

**Option 2 — sans Git, avec la ligne de commande Netlify**

```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --dir=dist/site-web/browser          # aperçu
netlify deploy --dir=dist/site-web/browser --prod   # mise en ligne
```

**Option 3 — glisser-déposer** : lancer `npm run build`, puis déposer le dossier `dist/site-web/browser`
sur https://app.netlify.com/drop. (Dans ce cas, les en-têtes de `netlify.toml` ne sont pas appliqués.)

Après la mise en ligne : brancher le nom de domaine (*Domain management*) ; HTTPS est activé automatiquement.

## Formulaire de contact

Le site n'a pas de serveur, donc aucune donnée n'est stockée. Le formulaire prépare un message et
ouvre WhatsApp ou le logiciel de messagerie du visiteur.
