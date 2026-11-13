# SNDI — proposition de refonte

Proposition indépendante de refonte du site de la Société Nationale de Développement
Informatique (SNDI), Côte d'Ivoire.

> **Ce projet n'est pas le site officiel de la SNDI.** Il a été réalisé sans mandat,
> à partir des contenus publics de <https://web.sndi.ci/> et <https://www.sndi.ci/>.
> Le logo et les contenus cités appartiennent à la SNDI. Un avis le rappelle en tête
> de chaque page, et le site n'est pas indexable.

## Démarrer

Prérequis : Node.js 24 et pnpm 11. Le premier build télécharge la police Inter,
ensuite servie par le site.

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Build de production :

```bash
pnpm build
pnpm start
```

## Commandes

| Commande                            | Rôle                                                    |
| ----------------------------------- | ------------------------------------------------------- |
| `pnpm dev`                          | Serveur de développement                                |
| `pnpm build` / `pnpm start`         | Build et serveur de production                          |
| `pnpm lint`                         | ESLint                                                  |
| `pnpm typecheck`                    | Types de routes et TypeScript strict                    |
| `pnpm format` / `pnpm format:check` | Prettier                                                |
| `pnpm test`                         | Tests unitaires et de composants (Vitest)               |
| `pnpm test:e2e`                     | Tests de bout en bout (Playwright) — après `pnpm build` |

Les tests de bout en bout utilisent le navigateur Chrome installé sur la machine.

## Contenu du site

| Page                                 | Adresse                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------- |
| Accueil                              | `/`                                                                        |
| Institution                          | `/institution`                                                             |
| Expertises                           | `/expertises`                                                              |
| Détail d'une expertise (onze pages)  | `/expertises/[slug]` — page prioritaire : `/expertises/etudes-et-conseils` |
| Solutions                            | `/solutions`                                                               |
| Détail d'une solution (quatre pages) | `/solutions/[slug]`                                                        |
| Réalisations                         | `/realisations`                                                            |
| Actualités                           | `/actualites`                                                              |
| Contact                              | `/contact`                                                                 |
| Mentions légales, Confidentialité    | `/mentions-legales`, `/confidentialite`                                    |

## Organisation

```text
src/app          Routes (App Router)
src/components   Composants transverses : brand, layout, shared, ui
src/features     Fonctionnalités : home, expertises, solutions, news, contact, institution
src/lib          Configuration et utilitaires
src/styles       Tokens de design, base, mouvement
src/types        Modèles de contenu
e2e              Tests de bout en bout
scripts          Captures, diagnostic, mesure des Web Vitals
docs             Documentation
```

Les contenus vivent dans `src/features/*/data` et sont lus par des fonctions d'accès
asynchrones : les remplacer par des appels à un CMS ne demande aucun changement dans
les pages.

## Documentation

| Document                                                       | Contenu                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------ |
| [`docs/content-audit.md`](docs/content-audit.md)               | Sources, informations vérifiées, hypothèses, contenus exclus |
| [`docs/validation-checklist.md`](docs/validation-checklist.md) | Ce que la SNDI doit valider avant toute diffusion            |
| [`docs/design-system.md`](docs/design-system.md)               | Direction artistique, tokens, composants, mouvement          |
| [`docs/technical.md`](docs/technical.md)                       | Architecture, rendu, styles, sécurité, limites               |
| [`docs/quality-report.md`](docs/quality-report.md)             | Contrôles exécutés et résultats                              |

## Avant toute diffusion

1. Obtenir l'accord de la SNDI pour l'usage de son logo et de ses contenus.
2. Faire valider les textes, coordonnées et références
   ([liste complète](docs/validation-checklist.md)).
3. Compléter les mentions légales : éditeur et hébergeur.
