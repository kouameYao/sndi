# Rapport de contrôle

Contrôles exécutés le 13 novembre 2026 sur le build de production, en local (macOS,
Node.js 24, Chrome installé sur la machine), après l'ajout de la remontée fluide au
changement de page, le passage à la police Inter et au texte blanc des boutons
principaux. Seuls les contrôles réellement exécutés figurent ici ; ce qui n'a pas été
vérifié est listé en fin de document.

## Résultats

| Contrôle                         | Commande             | Résultat                                                           |
| -------------------------------- | -------------------- | ------------------------------------------------------------------ |
| Build de production              | `pnpm build`         | Réussi — 30 pages prérendues                                       |
| Lint                             | `pnpm lint`          | Aucune erreur, aucun avertissement                                 |
| Typage strict                    | `pnpm typecheck`     | Aucune erreur                                                      |
| Formatage                        | `pnpm format:check`  | Conforme                                                           |
| Tests unitaires et de composants | `pnpm test`          | 142 tests réussis sur 142 (14 fichiers)                            |
| Couverture                       | `pnpm test:coverage` | 98,8 % des instructions, 95,8 % des branches (seuil imposé : 80 %) |
| Tests de bout en bout            | `pnpm test:e2e`      | 179 tests réussis sur 179                                          |

La couverture porte sur `src/` hors routes (`src/app`), elles-mêmes exercées par les
tests de bout en bout.

## Détail des tests de bout en bout

| Domaine                       | Tests | Ce qui est vérifié                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigation                    | 14    | Titre, logo et avis de l'accueil ; actions du hero ; lien d'évitement ; focus visible ; méga-menu au clavier ; touche Échap ; rubrique courante ; fil d'Ariane ; absence d'erreur JavaScript en navigation ; pages 404 ; consigne `noindex` ; entrée active du méga-menu marquée                                                                                                                                                          |
| Menu mobile                   | 9     | Ouverture, contenu, piège de focus, Échap et retour du focus, fermeture à la navigation, au bouton Retour et au passage en mise en page de bureau, cibles d'au moins 44 px ; sous-rubrique affichée marquée                                                                                                                                                                                                                               |
| Formulaire et page prestation | 7     | Résumé d'erreurs focalisé, lien vers le champ fautif, message préparé sans aucune requête sortante, retour au formulaire avec saisie conservée, coordonnées, accordéon au clavier, sommaire                                                                                                                                                                                                                                               |
| Accessibilité                 | 46    | axe-core (règles WCAG A et AA jusqu'à 2.2) sur 14 pages en 1440 px et en 390 px, méga-menu ouvert, menu mobile ouvert, formulaire en erreur, contraste contrôlé hors boutons principaux ; écart de contraste limité aux boutons principaux ; un seul titre de niveau 1 et aucun saut de niveau sur 14 pages                                                                                                                               |
| Responsive                    | 90    | Aucun débordement horizontal sur 14 pages à 320, 375, 390, 768, 1024 et 1440 px ; titre principal entièrement visible à chaque largeur                                                                                                                                                                                                                                                                                                    |
| Liens                         | 3     | Tous les liens internes répondent 200 ; liens externes en HTTPS, avec `rel="noopener noreferrer"`                                                                                                                                                                                                                                                                                                                                         |
| Mouvement                     | 10    | Changement de page sans rechargement ; titre qui se pose, lisible dès la première image ; entrée rejouée entre deux pages du même gabarit ; depuis le bas d'une page, arrivée à la position courante puis remontée progressive ; arrivée directe en haut avec les animations réduites ; blocs sous l'écran révélés une seule fois ; blocs déjà révélés laissés visibles au retour arrière ; ancre ; animations réduites ; sans JavaScript |

**Accessibilité automatique : une non-conformité connue, aucune autre violation
détectée.** Le texte blanc des boutons principaux sur l'orange du logo a un contraste
de 2,6 : 1, sous le seuil AA de 4,5 : 1 ; axe le signale sur toutes les pages. Ces
boutons sont exclus de la règle de contraste dans les tests, et un test vérifie qu'ils
sont les seuls concernés. Autre exclusion documentée : le relais de focus interne de
Radix NavigationMenu (voir [`technical.md`](technical.md), § Limites connues).

## Performance

Lighthouse n'a pas pu être exécuté dans cette session : son lancement par
`pnpm dlx` a été refusé par l'environnement d'exécution. Les objectifs Lighthouse du
cahier des charges ne sont donc **pas mesurés**.

À la place, les métriques brutes du navigateur ont été relevées avec
`scripts/measure-vitals.mjs`, sous une émulation proche du profil mobile de
Lighthouse : écran 412 × 823, réseau « Slow 4G » (150 ms de latence, 1,6 Mbit/s),
processeur ralenti 4×. Ce ne sont pas des scores Lighthouse.

| Page               | FCP     | LCP     | TBT      | CLS   | Poids transféré                    |
| ------------------ | ------- | ------- | -------- | ----- | ---------------------------------- |
| Accueil            | 0,72 s  | 0,72 s  | 95 ms    | 0,001 | 269 Ko, dont JS 181 Ko et CSS 8 Ko |
| Études et conseils | 0,72 s  | 0,72 s  | 84 ms    | 0,000 | 281 Ko, dont JS 189 Ko             |
| Contact            | 0,67 s  | 0,67 s  | 94 ms    | 0,000 | 266 Ko, dont JS 185 Ko             |
| Cible              | < 1,5 s | < 2,5 s | < 200 ms | < 0,1 | —                                  |

- Les quatre métriques sont dans les cibles sur les trois pages ; le décalage de mise
  en page a aussi été relevé à 0,001 ou moins sur cinq autres pages.
- Le HTML de l'accueil pèse 75 Ko, 11 Ko une fois compressé.
- Une seule ressource de police est téléchargée : Inter, 48 Ko.
- **Point d'attention : le JavaScript.** Environ 180 Ko compressés, dont près de
  160 Ko pour React et le routeur de Next.js. Un budget de 150 Ko n'est pas atteignable
  avec cette pile ; le temps de blocage reste faible.

Pour mesurer Lighthouse, serveur de production démarré :

```bash
pnpm dlx lighthouse http://localhost:3000 --view
```

Le score SEO sera pénalisé par la consigne `noindex`, volontaire pour cette
proposition.

### Changement de page

Temps entre le clic et l'affichage de la nouvelle page, mesuré sur le build de
production en local, sans bridage :

| Parcours                 | Délai  | Requête au clic          |
| ------------------------ | ------ | ------------------------ |
| Accueil → Institution    | 115 ms | Aucune : page préchargée |
| Institution → Solutions  | 67 ms  | Aucune : page préchargée |
| Solutions → fiche SIGFiP | 64 ms  | Une charge de données    |

À titre de comparaison, le site de référence cyber.ee affiche sa nouvelle page en
100 ms environ dans les mêmes conditions, avec une charge de données au clic. Ces
délais dépendront de l'hébergement réel.

### Remontée au changement de page

Position de la fenêtre relevée à chaque image après un clic, sur le build de
production en local :

| Départ                                        | Nouvelle page affichée             | Haut de page atteint |
| --------------------------------------------- | ---------------------------------- | -------------------- |
| Bas de l'accueil → Institution, 1280 × 720    | 64 ms après le clic, sans remonter | 0,85 s après le clic |
| Accueil à 1 500 px → Institution, 1440 × 900  | à la position courante             | 0,68 s après le clic |
| Bas de l'accueil → Institution, mobile 390 px | à la position courante             | 1,07 s après le clic |
| Haut de l'accueil → Solutions                 | en haut                            | aucun défilement     |

Quand la nouvelle page est plus courte que la position courante, elle s'affiche à son
propre bas de page, puis remonte.

- **Retour arrière et avance** : la position d'origine est restaurée exactement
  (1 500 → 1 500 px, 2 600 → 2 600 px), par le même défilement fluide, en 0,4 à 0,7 s.
- **Animations réduites** : la nouvelle page est affichée en haut dès la première
  image ; au retour arrière la position est restaurée sans défilement.
- **Ancres et lien d'évitement** : comportement inchangé.

Le site de référence cyber.ee remonte de 5 272 px en 1,2 s environ ; la durée est
celle du défilement fluide de Chrome et croît avec la distance.

## Défauts trouvés et corrigés pendant les contrôles

| Défaut                                                                                                                           | Détecté par                                 | Correction                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Le squelette de chargement était servi à la place du contenu, injecté ensuite par script                                         | Test de structure des titres instable       | Suppression du `loading.tsx` racine : le HTML est servi complet                              |
| Débordement de 32 px à 1024 px sur toutes les pages                                                                              | Test responsive                             | En-tête allégé entre 1024 et 1279 px                                                         |
| Feuille de style périmée servie après refonte                                                                                    | Capture d'écran                             | Purge du cache `.next`                                                                       |
| « Modifier le message » effaçait la saisie et perdait le focus                                                                   | Relecture indépendante                      | Saisie conservée, focus replacé sur le premier champ                                         |
| Lien `mailto:` fragile pour les longs messages                                                                                   | Relecture indépendante                      | Sauts de ligne CRLF, bouton « Copier le message », avertissement au-delà d'une longueur sûre |
| Menu mobile resté ouvert après le bouton Retour ou un redimensionnement                                                          | Relecture indépendante                      | État d'ouverture lié à la page et à la largeur d'écran                                       |
| Mention « nouvel onglet » accolée au libellé des liens externes                                                                  | Test de composant                           | Espace ajoutée                                                                               |
| Aspect « généré » : sur-titres numérotés, pilules, cartes arrondies, motif abstrait, apparitions animées, formules de précaution | Retour utilisateur                          | Direction artistique reprise (voir [`design-system.md`](design-system.md))                   |
| Page décalée de 44 px au chargement de la police (fil d'Ariane passant sur deux lignes)                                          | Mesure des Web Vitals                       | Fil d'Ariane maintenu sur une ligne                                                          |
| Avertissement du mode développement sur les routes `[slug]`                                                                      | Journal du serveur de développement         | Routes déclarées bloquantes (`instant = false`)                                              |
| La nouvelle page s'affichait directement en haut, sans la remontée fluide du site de référence                                   | Retour utilisateur                          | Défilement fluide appliqué aux changements de page (voir [`technical.md`](technical.md))     |
| Un bloc déjà révélé gardait son marqueur d'animation dans les pages que Next conserve masquées                                   | Sonde Playwright                            | Marqueur retiré en fin d'animation et au masquage de la page                                 |
| Au retour arrière, des blocs déjà vus redevenaient invisibles puis rejouaient leur fondu                                         | Relecture indépendante, confirmée par sonde | Un bloc déjà vu n'est plus jamais remis en attente                                           |
| Un second fichier de police de 85 Ko téléchargé sur chaque page pour un seul caractère (« ᵉ » de « 4ᵉ étage »)                   | Mesure du poids transféré                   | Ordinaux écrits « 4e », « 6e »                                                               |

## Ce qui n'a pas été vérifié

- **Lighthouse** (voir plus haut).
- **Firefox et Safari.** Tous les tests ont tourné sur Chrome. Les animations
  d'entrée et d'apparition sont en CSS standard, mais leur rendu n'a pas été observé
  sur ces navigateurs. La remontée au changement de page repose sur le défilement
  fluide de chaque navigateur : sa durée et sa courbe y différeront.
- **Lecteurs d'écran.** Aucun parcours avec VoiceOver, NVDA ou TalkBack. Les contrôles
  automatiques ne couvrent qu'une partie des critères WCAG : ils ne valent pas
  déclaration de conformité.
- **Appareils réels.** Les largeurs mobiles sont émulées.
- **Zoom à 200 % et agrandissement du texte.**
- **Clients de messagerie.** L'ouverture du lien `mailto:` n'a pas été essayée dans
  Outlook, Gmail ou Mail.
- **Qualité perçue des animations.** Leur présence, leur réglage et leur vitesse sont
  testés ; l'appréciation à l'œil reste à faire sur écran réel.
- **Impression.**
- **Relecture indépendante du code** après la reprise de la direction artistique : la
  première portait sur la version antérieure, la seconde uniquement sur la remontée
  au changement de page et le composant `Reveal`.
