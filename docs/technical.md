# Documentation technique

Pour les développeurs qui reprennent le projet. L'installation et les commandes
courantes sont dans le [`README`](../README.md).

## Pile

| Brique                          | Version        | Rôle                                                                   |
| ------------------------------- | -------------- | ---------------------------------------------------------------------- |
| Next.js (App Router, Turbopack) | 16.4.6         | Cadre applicatif, prérendu statique                                    |
| React                           | 19.3           | Interface                                                              |
| TypeScript                      | 5, mode strict | Typage                                                                 |
| Tailwind CSS                    | 4.3            | Styles utilitaires, tokens en CSS                                      |
| Radix UI                        | —              | Primitives accessibles : menu de navigation, dialogue, accordéon, slot |
| Lucide React                    | 1              | Pictogrammes                                                           |
| Vitest, Testing Library         | 5 / 16         | Tests unitaires et de composants                                       |
| Playwright, axe-core            | 1.65 / 4.14    | Tests de bout en bout et d'accessibilité                               |

> Cette version de Next.js diffère des précédentes. Avant de modifier une convention
> de fichier ou une API, lire le guide correspondant dans `node_modules/next/dist/docs/`.
> Exemples rencontrés : `error.tsx` reçoit `retry` ; `PageProps` et `LayoutProps` sont
> des types globaux ; `dynamicParams` n'existe plus avec Cache Components ; l'attribut
> `priority` de `next/image` est remplacé par `preload`.

## Arborescence

```text
src/
├── app/                  Routes, layout, template, erreurs, robots
├── components/
│   ├── brand/            Logo officiel
│   ├── layout/           En-tête, navigations, pied de page, fil d'Ariane…
│   ├── shared/           Sections, liens, états vides
│   └── ui/               Primitives : bouton, champs, accordéon, menu…
├── features/
│   ├── home/             Sections de l'accueil
│   ├── expertises/       Données, accès, cartes et sections de détail
│   ├── solutions/        Solutions et réalisations
│   ├── news/             Actualités
│   ├── contact/          Formulaire et logique de message
│   └── institution/      Contenus institutionnels
├── lib/                  Configuration du site, utilitaires
├── styles/               Tokens, base, mouvement
└── types/                Modèles de contenu
e2e/                      Tests Playwright
scripts/                  Captures, diagnostic, mesure des Web Vitals
docs/                     Audit, design system, qualité, validations
public/brand/             Logo officiel
```

Les fichiers sont nommés en kebab-case. Les tests unitaires sont placés à côté du
code qu'ils couvrent (`*.test.ts(x)`).

## Contenus et intégration d'un CMS

Les contenus sont séparés des composants :

- `src/types/content.ts` décrit les modèles (`Expertise`, `Solution`, `NewsItem`…) ;
- `src/features/*/data/*.ts` contient les données locales, avec leurs sources ;
- `src/features/*/*-repository.ts` expose des fonctions asynchrones (`getExpertises`,
  `getNews`…) : les pages ne lisent jamais les données directement.

Pour brancher un CMS, remplacer le corps des fonctions d'accès par un appel réseau en
conservant leur signature. Avec Cache Components, une lecture distante doit être mise
en cache (`"use cache"` et `cacheLife`) ou placée derrière un `<Suspense>` ; voir
`node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.

Chaque expertise porte un niveau de détail (`depth`) :

| Valeur       | Signification                         | Rendu                                  |
| ------------ | ------------------------------------- | -------------------------------------- |
| `detailed`   | Page complète (Études et conseils)    | Toutes les sections                    |
| `summary`    | Prestations listées par la source     | Présentation, prestations, références  |
| `definition` | La source ne publie qu'une définition | Présentation et encadré « à préciser » |

Le test `src/features/content-integrity.test.ts` vérifie l'unicité des identifiants,
la présence d'une source officielle par contenu et la validité des dates.

## Rendu

- **Tout est statique.** Les 14 gabarits (30 pages) sont prérendus à la construction.
  Les routes dynamiques `expertises/[slug]` et `solutions/[slug]` déclarent leurs
  valeurs avec `generateStaticParams` ; une valeur inconnue renvoie la page 404.
- **Composants serveur par défaut.** Sont côté client uniquement : les deux
  navigations, l'accordéon, le formulaire, les apparitions au défilement (`Reveal`)
  et la limite d'erreur.
- **Pas de `loading.tsx` à la racine.** Un `loading.tsx` enveloppe la page dans une
  frontière Suspense ; React diffère alors l'affichage des contenus volumineux et
  émet d'abord le squelette. Sur des pages statiques, cela dégrade le premier
  affichage et prive de contenu un visiteur sans JavaScript. Le composant
  `LoadingSkeleton` est à réserver aux segments qui chargeront des données à la
  demande.
- **Routes `[slug]` déclarées bloquantes.** Elles exportent `instant = false` :
  toutes leurs valeurs sont prérendues, une frontière Suspense n'apporterait
  qu'un clignotement de squelette.
- **Millésime figé.** `SITE.proposalYear` remplace tout appel à l'horloge : avec Cache
  Components, `new Date()` pendant le prérendu est une erreur.
- **Changement de page.** Aucune transition de sortie : la navigation côté client
  remplace la page immédiatement. `src/app/template.tsx` est remonté à chaque
  navigation, ce qui rejoue les animations CSS d'entrée de l'en-tête de page, y
  compris entre deux pages du même gabarit.
- **Remontée fluide au changement de page.** La nouvelle page s'affiche à la position
  de défilement courante, puis la fenêtre remonte en douceur. Deux réglages de
  `src/styles/base.css` suffisent, sans JavaScript :
  - `html { scroll-behavior: smooth }`, hors `prefers-reduced-motion`. Depuis
    Next 16, le routeur ne neutralise ce réglage pendant ses navigations que si
    `<html>` porte `data-scroll-behavior="smooth"` : l'attribut est **volontairement
    absent**. En développement, Next le signale une fois dans la console du
    navigateur (« Detected `scroll-behavior: smooth`… ») ; cet avertissement est
    attendu et n'existe pas en production.
  - `main { scroll-margin-top: 100vh }`. Le routeur fait défiler jusqu'au premier
    élément de la page, le `<main>` ; cette marge fait aboutir le défilement tout en
    haut du document, au-dessus de l'en-tête et du bandeau d'avis.
- **Pages précédentes conservées dans le document.** Après une navigation côté
  client, Next garde les pages déjà visitées dans le DOM, masquées
  (`display: none`). Un sélecteur global peut donc atteindre une page masquée :
  les tests ciblent les éléments visibles ou accessibles. Une page
  masquée nettoie ses effets et les relance à son réaffichage, sans perdre son
  état : `Reveal` retient donc qu'un bloc a déjà été vu et ne le remet jamais en
  attente, et retire son attribut `data-reveal` en fin d'animation et lorsque sa
  page est masquée. Au retour arrière, rien ne clignote.

## Styles

Tailwind CSS 4 est compilé par le chargeur `@tailwindcss/turbopack`, déclaré dans
`next.config.ts` (configuration générée par `create-next-app`).

- `src/app/globals.css` importe Tailwind puis les trois fichiers de `src/styles`.
- `tokens.css` : primitives, rôles sémantiques, surfaces, `@theme` (couleurs,
  typographies, échelle de texte, ombres, courbes, animations) et utilitaires de mise
  en page (`container-page`, `grid-page`, `section-y`).
- La palette par défaut de Tailwind est retirée (`--color-*: initial`) : seules les
  couleurs du design system produisent des classes.
- `base.css` : styles d'éléments, focus visible, surfaces.
- `motion.css` : entrée de page, apparition au défilement, retour d'interface,
  préférence de mouvement réduit, impression.

**Piège rencontré.** Après un changement profond des fichiers CSS, le cache de
Turbopack peut servir une feuille de style périmée. En cas de rendu incohérent :
`rm -rf .next` puis reconstruire.

## Logo

`public/brand/logo-sndi.png` est le fichier officiel, servi sans optimisation
(`unoptimized`) pour n'être ni recompressé ni redimensionné côté serveur. Le composant
`Logo` ne fait varier que sa hauteur d'affichage. Dans le pied de page sombre, il est
posé sur un cartouche blanc plutôt que recoloré.

## Formulaire de contact

`src/features/contact/lib/contact-message.ts` contient la logique, en fonctions pures :
lecture et nettoyage des champs, validation (longueurs, format du courriel, objet
appartenant à la liste proposée), construction du corps du message et du lien
`mailto:` (objet et corps encodés, sauts de ligne en CRLF). Le composant n'effectue
aucune requête : aucune donnée ne quitte le navigateur.

Après validation, l'étape de relecture (`contact-message-ready.tsx`) propose d'ouvrir
la messagerie, de copier le message ou de revenir le modifier, saisie conservée. Un
lien `mailto:` très long peut être tronqué par certaines messageries : au-delà de
`MAILTO_SAFE_LENGTH`, la copie est recommandée à l'écran.

Pour passer à un envoi réel : créer une action serveur qui rejoue `validateContact`
côté serveur, ajouter une limitation de débit et une protection anti-abus, puis
remplacer l'état « message prêt » par un état « message envoyé ».

## Sécurité

- En-têtes envoyés sur toutes les routes (`next.config.ts`) : `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`. L'en-tête
  `X-Powered-By` est désactivé.
- Liens externes : `target="_blank"` toujours accompagné de `rel="noopener noreferrer"`
  (vérifié par un test de bout en bout).
- Aucun secret, aucune variable d'environnement sensible, aucun script tiers.
- **À faire avant production** : politique de sécurité du contenu (CSP). Une CSP à
  nonce impose un rendu dynamique ; elle est à arbitrer avec l'hébergement, de même
  que l'en-tête HSTS.

## Indexation

La proposition n'est pas indexable : chaque page porte la balise `robots` en
`noindex, nofollow` et chaque réponse l'en-tête `X-Robots-Tag` correspondant.
L'exploration reste ouverte dans `robots.txt`, sans quoi les robots ne pourraient pas
lire cette consigne. La variable `ALLOW_INDEXING=true` lève les deux protections ; elle
n'a de sens que si la SNDI reprend le projet.

## Déploiement

Le site se déploie sur Vercel depuis la branche `main`. `vercel.json` déclare le
framework (`"framework": "nextjs"`) : sans lui, un projet Vercel dont le réglage
« Framework Preset » vaut « Other » lance bien `next build`, mais ne publie que le
dossier `public/` — toutes les pages répondent alors 404, seul le logo est servi.

## Tests et contrôles

| Commande            | Contenu                                                             |
| ------------------- | ------------------------------------------------------------------- |
| `pnpm lint`         | ESLint (règles Next, React, accessibilité JSX)                      |
| `pnpm typecheck`    | Génération des types de routes puis `tsc --noEmit`                  |
| `pnpm format:check` | Prettier, classes Tailwind triées                                   |
| `pnpm test`         | Vitest : utilitaires, données, composants, formulaire               |
| `pnpm test:e2e`     | Playwright sur le build de production, avec le Chrome de la machine |

Les tests de bout en bout couvrent la navigation au clavier, le méga-menu, le menu
mobile, le formulaire, l'accessibilité (axe, règles WCAG A et AA jusqu'à 2.2, bureau et
mobile), l'absence de débordement à six largeurs, la structure des titres, la
validité des liens internes et le mouvement (entrée de page, remontée fluide,
apparitions au défilement). Ils démarrent `next start` sur le port 3100 : lancer
`pnpm build` au préalable.

Scripts d'appoint, serveur de production démarré :

```bash
node scripts/capture.mjs /contact 390,1440 docs/qa   # captures pleine page, dossier ignoré par git
node scripts/inspect-page.mjs /institution 320       # titres et débordements
node scripts/measure-vitals.mjs / /contact           # FCP, LCP, TBT, CLS, poids
```

**Piège rencontré.** Sur un élément collant comme l'en-tête, `locator.click()` de
Playwright fait d'abord défiler la page (462 px dans nos mesures) avant de cliquer.
Pour mesurer une position de défilement autour d'un clic dans l'en-tête, cliquer aux
coordonnées avec `page.mouse.click()`. Les liens du pied de page ne sont pas concernés.

## Limites connues

- **Contraste du bouton principal.** Texte blanc sur l'orange du logo : 2,6 : 1, sous
  le seuil AA de 4,5 : 1. Les tests d'accessibilité excluent ces boutons, et eux
  seuls, de la règle de contraste (`PRIMARY_BUTTON` dans
  `e2e/accessibility.spec.ts`) ; un test vérifie que l'écart ne touche rien d'autre.

- **Poids du JavaScript.** Environ 180 Ko compressés sur l'accueil, dont près de
  160 Ko pour React et le routeur de Next. Le code propre au site (menus Radix,
  formulaire) représente le reste.
- **Relais de focus de Radix.** Menu ouvert, Radix NavigationMenu insère un élément
  invisible et focalisable qu'axe signale (`aria-hidden-focus`). Il renvoie aussitôt
  le focus dans le panneau ; il est exclu de l'analyse automatique, et lui seul.
- **Logo en basse définition** (351 × 100 px) : une version vectorielle est à obtenir.
- **Lighthouse** n'a pas été exécuté dans cette session ; voir
  [`quality-report.md`](quality-report.md).
