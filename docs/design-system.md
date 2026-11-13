# Design system — proposition SNDI

Ce document décrit la direction artistique, les tokens et les composants de la
proposition. Il s'adresse aux designers et aux développeurs qui la feront évoluer.

## 1. Direction artistique

**Intention.** Un site d'institution, sobre et direct : il informe avant de séduire.
Le parti pris est typographique et structurel, dans la lignée des systèmes de design
publics.

**Principes.**

- **Angles droits.** Boutons, champs, cartes et encarts sont rectangulaires. Aucun
  arrondi, aucune ombre hors du menu déroulant.
- **Filets plutôt que boîtes.** Les contenus sont rangés en listes et en registres
  séparés par des filets fins : sigle, dénomination, domaine ; date, titre.
- **Aplats du logo.** L'orange et le vert sont utilisés en aplats francs : filet
  orange de la page courante, bouton principal, vert institutionnel de l'encart
  « en bref », du bandeau d'avis et du pied de page.
- **Titres qui nomment.** « Nos expertises », « Actualités », « Nous contacter » : un
  titre dit ce que contient la section, sans slogan.
- **Voix de l'institution.** Les textes parlent au nom de la SNDI, au présent, sans
  formule de précaution à l'écran.

**Ce que la proposition écarte délibérément.** Sur-titres en capitales, numérotation
décorative des sections, boutons en pilule, flèches systématiques, pictogrammes dans
des tuiles, cartes arrondies, grilles en mosaïque, motifs abstraits, dégradés, effets
de verre, animations en cascade, compteurs, témoignages et photographies
sans droits.

> La palette étendue, la police et l'accroche sont des hypothèses de conception. Elles
> ne font pas partie de la charte officielle de la SNDI.

## 2. Couleurs

### Primitives

Seuls l'orange 500 et le vert 500 proviennent du logo officiel ; les autres teintes en
sont dérivées (`src/styles/tokens.css`).

| Famille | Teintes                                                                      |
| ------- | ---------------------------------------------------------------------------- |
| Orange  | 300 `#FAB274` · **500 `#F5842A` (logo)** · 600 `#E2731B` · 700 `#AD4E08`     |
| Vert    | 100 `#DCEFE4` · **500 `#00A854` (logo)** · 700 `#00703A` · 800 `#00552C`     |
| Gris    | 950 `#0B1410` · 500 `#5A6861` · 400 `#84918A` · 200 `#DCE1DE` · 50 `#F4F5F4` |

### Rôles sémantiques

Les composants n'utilisent que ces rôles, exposés en classes Tailwind (`bg-primary`,
`text-muted`…).

| Rôle                                | Surface claire                 | Usage                            |
| ----------------------------------- | ------------------------------ | -------------------------------- |
| `background` / `foreground`         | blanc / gris 950               | Fond et texte de page            |
| `surface` / `surface-muted`         | blanc / gris 50                | Cartes, bandes alternées         |
| `primary` / `primary-foreground`    | orange 500 / blanc             | Action principale, page courante |
| `primary-hover`                     | orange 600                     | Survol de l'action principale    |
| `primary-strong`                    | orange 700                     | Orange lisible en texte          |
| `secondary`                         | vert 700                       | Vert lisible                     |
| `accent` / `accent-strong`          | vert 500 / vert 700            | Accent / accent en texte         |
| `border` / `border-strong`          | gris 200 / gris 400            | Filets / contours de champs      |
| `muted`                             | gris 500                       | Texte secondaire                 |
| `success`, `warning`, `destructive` | vert 700, `#8A5A00`, `#B3261E` | États                            |
| `ring`                              | gris 950                       | Anneau de focus                  |

### Surfaces

L'attribut `data-surface` redéfinit localement les rôles : un composant posé sur fond
vert s'adapte sans variante dédiée.

| Surface   | Fond     | Utilisée pour                                                   |
| --------- | -------- | --------------------------------------------------------------- |
| `default` | blanc    | Pages                                                           |
| `muted`   | gris 50  | En-têtes de pages internes, section Solutions, appel au contact |
| `inverse` | vert 800 | Bandeau d'avis, encart « en bref », pied de page                |

### Contrastes mesurés (WCAG 2.2, niveau AA)

| Paire                                  | Rapport                               | Usage                                   |
| -------------------------------------- | ------------------------------------- | --------------------------------------- |
| Gris 950 sur blanc                     | 18,7 : 1                              | Texte courant                           |
| Gris 500 sur blanc / sur gris 50       | 5,9 : 1 / 5,4 : 1                     | Texte secondaire                        |
| Blanc sur orange 500 / orange 600      | 2,6 : 1 / 3,1 : 1 — **sous le seuil** | Bouton principal, au repos et au survol |
| Blanc sur vert 800                     | 9,0 : 1                               | Texte sur fond vert                     |
| Vert 100 sur vert 800                  | 7,5 : 1                               | Texte secondaire sur fond vert          |
| Orange 700 sur blanc                   | 5,4 : 1                               | Orange en texte                         |
| Vert 700 sur blanc / sur gris 50       | 6,2 : 1 / 5,7 : 1                     | Message de succès                       |
| Rouge d'erreur sur blanc / sur gris 50 | 6,5 : 1 / 6,0 : 1                     | Messages d'erreur                       |
| Gris 400 sur blanc                     | 3,3 : 1                               | Contours de champs (seuil 3 : 1)        |

**Règle.** L'orange 500 (2,6 : 1 sur blanc) et le vert 500 (3,1 : 1) du logo ne sont
jamais utilisés en couleur de texte sur fond clair : ils servent d'aplats et de filets.

**Écart connu : le bouton principal.** Son texte est blanc sur l'orange du logo, à la
demande du porteur du projet. Le rapport de 2,6 : 1 est sous le seuil AA de 4,5 : 1
(3,1 : 1 au survol) : c'est le seul contraste du site hors norme, et les contrôles
automatiques le signalent. Deux réglages rétablissent la conformité, chacun en
changeant un seul token de `src/styles/tokens.css` :

| Réglage                          | Token                  | Rapport |
| -------------------------------- | ---------------------- | ------- |
| Texte gris 950 sur orange 500    | `--primary-foreground` | 7,3 : 1 |
| Texte blanc sur orange 700 foncé | `--primary`            | 5,4 : 1 |

## 3. Typographie

Une seule famille : **Inter**, chargée par `next/font`, auto-hébergée, en
`display: swap`. C'est une police variable : un seul fichier de 48 Ko couvre les trois
graisses utilisées. Les ordinaux s'écrivent « 4e », sans lettre supérieure Unicode
(« ᵉ »), qui ferait télécharger un second fichier de 85 Ko pour un seul caractère.

| Classe         | Taille     | Interlignage | Usage                       |
| -------------- | ---------- | ------------ | --------------------------- |
| `text-display` | 36 → 60 px | 1,08         | Titre de l'accueil          |
| `text-h1`      | 32 → 48 px | 1,12         | Titre des pages internes    |
| `text-h2`      | 26 → 36 px | 1,2          | Titres de section           |
| `text-h3`      | 18 → 21 px | 1,35         | Titres de ligne et de carte |
| `text-lead`    | 17 → 20 px | 1,55         | Chapeaux                    |
| `text-body`    | 16 px      | 1,6          | Texte courant               |
| `text-small`   | 14 px      | 1,5          | Dates, mentions, légendes   |

Graisses : 400 pour le texte, 500 pour les liens et libellés, 600 pour les titres et
les boutons. Aucun texte en capitales espacées, aucun texte sous 14 px. Les titres
utilisent `text-wrap: balance`. Les espaces insécables de la typographie française
sont posées dans les contenus.

## 4. Mise en page

- **Conteneur** : 1280 px de contenu, gouttières de 20 px (mobile), 32 px (tablette),
  48 px (bureau) — classe `container-page`.
- **Grille** : 4 colonnes sous 768 px, 8 jusqu'à 1024 px, 12 au-delà — classe
  `grid-page`.
- **Sections en deux colonnes** : titre sur 4 colonnes, contenu sur 8
  (`SplitSection`). Sur mobile, le titre passe au-dessus.
- **Rythme vertical** : 56 → 96 px entre sections (`section-y`), échelle Tailwind de
  4 px à l'intérieur.
- **Points de rupture** : 640, 768, 1024 et 1280 px. La navigation de bureau apparaît
  à 1024 px.

## 5. Composants

Tous les composants sont dans `src/components` (transverses) ou `src/features`
(métier). Sauf mention contraire, ce sont des composants serveur.

### Structure

| Composant           | Fichier                                    | Notes                                                                    |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| `SiteHeader`        | `components/layout/site-header.tsx`        | En-tête collant ; seules les navigations sont hydratées                  |
| `DesktopNavigation` | `components/layout/desktop-navigation.tsx` | Client. Radix NavigationMenu, page courante soulignée d'un filet orange  |
| `MegaMenu`          | `components/layout/mega-menu.tsx`          | Client. Six expertises en colonnes, autres prestations, lien de synthèse |
| `MobileNavigation`  | `components/layout/mobile-navigation.tsx`  | Client. Radix Dialog plein écran : focus piégé, Échap, retour du focus   |
| `SiteFooter`        | `components/layout/site-footer.tsx`        | Logo sur fond blanc, navigation, prestations, coordonnées, mentions      |
| `ProposalNotice`    | `components/layout/proposal-notice.tsx`    | Avis « proposition indépendante », en tête de chaque page                |
| `Container`         | `components/layout/container.tsx`          | Conteneur et grille de page                                              |
| `Breadcrumb`        | `components/layout/breadcrumb.tsx`         | Liste ordonnée sur une ligne, `aria-current="page"`                      |
| `PageHero`          | `components/layout/page-hero.tsx`          | En-tête des pages internes                                               |

### Contenu

| Composant                        | Fichier                                           | Notes                                                    |
| -------------------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| `SectionHeading`                 | `components/shared/section-heading.tsx`           | Titre de niveau 2, description, lien « tout voir »       |
| `SplitSection`                   | `components/shared/split-section.tsx`             | Section titre à gauche, contenu à droite                 |
| `ServiceCard`, `ServiceCardGrid` | `features/expertises/components/service-card.tsx` | Carte à filets communs : titre et phrase                 |
| `SolutionCard`                   | `features/solutions/components/solution-card.tsx` | Ligne de registre : sigle, dénomination, domaine         |
| `NewsCard`                       | `features/news/components/news-card.tsx`          | Ligne de communiqué : date en `<time>`, titre            |
| `ContactForm`                    | `features/contact/components/contact-form.tsx`    | Client. Validation, résumé d'erreurs, étape de relecture |
| `ContactCta`                     | `components/shared/contact-cta.tsx`               | Appel au contact de fin de page                          |
| `EmptyState`                     | `components/shared/empty-state.tsx`               | Absence de contenu expliquée, issue proposée             |
| `LoadingSkeleton`                | `components/shared/loading-skeleton.tsx`          | Squelette de page, `role="status"`                       |
| `SourceLine`                     | `components/shared/source-line.tsx`               | Mention de source en pied de page                        |
| `TextLink`                       | `components/shared/text-link.tsx`                 | Lien souligné, interne ou externe                        |
| `DetailSection`, `OnThisPage`    | `components/shared/`                              | Sections ancrées et sommaire latéral                     |
| `Reveal`                         | `components/shared/reveal.tsx`                    | Client. Apparition sobre d'une section au défilement     |

### Primitives (`components/ui`)

`Button`, `Accordion`, `NavigationMenu`, `Sheet`, `TextField`, `TextareaField`,
`SelectField`, `Skeleton`. Elles suivent les conventions shadcn/ui — primitives Radix,
variantes `cva`, utilitaire `cn`, attribut `data-slot` — et sont écrites à la main pour
consommer directement les tokens du projet. `components.json` est en place :
`shadcn add` peut compléter le jeu de primitives.

### États

| Composant         | États prévus                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `Button`          | Défaut, survol, focus visible, désactivé, chargement (`isLoading` : indicateur, `aria-busy`)    |
| Liens             | Défaut (soulignés), survol (soulignement épaissi), focus visible, page courante                 |
| Cartes et lignes  | Défaut, survol (fond ou titre souligné), focus visible sur toute la carte                       |
| Champs            | Défaut, survol, focus visible, erreur (`aria-invalid`, message relié), désactivé                |
| `ContactForm`     | Saisie, erreur (résumé focalisé, liens vers les champs), message prêt, copie réussie ou échouée |
| Menus             | Fermé, ouvert, rubrique courante, sous-rubrique affichée                                        |
| Listes de contenu | Remplie, vide (`EmptyState`), en chargement (`LoadingSkeleton`)                                 |

**Repérage dans la navigation.** La rubrique courante porte un filet orange au bas de
l'en-tête. Dans le méga-menu et le menu mobile, l'entrée de la page affichée porte le
même orange en filet gauche, sur fond gris, et passe en gras. Côté accessibilité, la
page affichée est signalée par `aria-current="page"` et sa rubrique parente par
`aria-current="true"`.

Les cartes et les lignes cliquables utilisent un lien étiré : le titre porte le lien,
un pseudo-élément couvre l'ensemble. Chacune expose donc une seule cible, pour le
clavier comme pour les lecteurs d'écran.

`LoadingSkeleton` n'est monté sur aucune route aujourd'hui : toutes les pages sont
statiques. Il est destiné aux segments qui chargeront des données à la demande (voir
[`technical.md`](technical.md), § Rendu).

## 6. Mouvement

Le mouvement est sobre, bref et jamais bloquant. Sa grammaire reprend celle observée
sur cyber.ee, réécrite pour ce projet (`src/styles/motion.css`).

**Changement de page.** Aucun effet de sortie, aucun fondu enchaîné : la nouvelle page
remplace l'ancienne immédiatement (navigation côté client, pages préchargées). C'est
l'en-tête de la nouvelle page qui porte le mouvement :

| Élément                         | Animation                                                              | Réglage                                     |
| ------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| Titre de page                   | `settle-right` : opacité 0,6 → 1, glissement de 20 px depuis la gauche | 0,7 s, `ease-out`                           |
| Chapeau, actions                | `settle-up` : opacité 0,6 → 1, montée de 20 px                         | 0,7 s, `ease-out`, décalés de 100 et 200 ms |
| Encart « en bref » de l'accueil | `settle-in` : opacité 0,6 → 1                                          | 1 s, `ease-out`, décalé de 200 ms           |

Le contenu part d'une opacité de 0,6 et non de 0 : il est lisible dès la première
image, il « se pose » au lieu d'apparaître. L'affichage principal n'est donc jamais
retardé. Le template (`src/app/template.tsx`) étant remonté à chaque navigation, ces
animations CSS se rejouent à chaque changement de page, sans JavaScript.

**Position à l'arrivée.** La nouvelle page s'affiche à la hauteur où l'on se trouvait,
puis la fenêtre remonte en douceur jusqu'en haut pendant que l'en-tête se pose. Depuis
le bas d'une page, le changement se lit ainsi comme un seul mouvement continu, sans
saut.

- La remontée est le défilement fluide du navigateur : 0,7 à 1 s selon la distance.
- Depuis le haut d'une page, rien ne défile.
- Au retour arrière, la page précédente revient de la même façon à l'endroit où elle
  avait été quittée.
- Avec `prefers-reduced-motion`, la nouvelle page s'affiche directement en haut.

**Au défilement.** Chaque section située sous l'écran monte de 20 px en fondu
lorsqu'elle entre à l'écran, une seule fois (`fade-up`, 0,7 s, `ease-out`) — composant
`Reveal`. Pas de cascade ni de décalage entre éléments.

- Le rendu serveur ne masque rien : sans JavaScript, tout le contenu est visible.
- Un bloc déjà visible au chargement n'est jamais masqué ni animé. C'est aussi le cas
  des blocs traversés par la remontée qui suit un changement de page.
- Un bloc déjà vu n'est jamais remasqué : au retour arrière, la page revient telle
  qu'elle avait été quittée.
- `prefers-reduced-motion` désactive les apparitions et ramène les animations d'entrée
  à leur état final.

**Retour d'interface.** Survols en 150 ms ; menu déroulant, menu mobile et accordéon en
120 à 200 ms, pilotés par l'état Radix.

Seules `transform` et `opacity` sont animées, hors hauteur de l'accordéon. Aucune
bibliothèque d'animation n'est chargée.

## 7. Accessibilité

Objectif : WCAG 2.2, niveau AA. Un écart connu : le contraste du texte du bouton
principal (voir § 2).

- Lien d'évitement en premier élément focalisable.
- Un seul titre de niveau 1 par page, niveaux sans saut.
- Repères `header`, `nav` (nommées), `main`, `footer`, `aside`.
- Focus visible partout : anneau de 2 px, adapté à chaque surface.
- Cibles interactives d'au moins 44 px de haut ; boutons de menu libellés en toutes
  lettres (« Menu », « Fermer »).
- Formulaire : libellés visibles, mention « obligatoire » en toutes lettres, erreurs
  reliées aux champs, résumé d'erreurs annoncé et focalisé.
- Liens externes : mention « nouvel onglet » lue par les lecteurs d'écran.

Les contrôles réalisés et leurs limites sont décrits dans
[`quality-report.md`](quality-report.md).
