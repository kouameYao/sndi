# Contenus à valider avant toute diffusion

Cette maquette est une proposition indépendante. Avant de la présenter comme un site
de la SNDI, ou de la mettre en ligne, chaque point ci-dessous doit être validé par la
SNDI. Le détail des sources figure dans [`content-audit.md`](content-audit.md).

## Identité

- [ ] Autorisation d'utiliser le logo, la dénomination et les contenus publics.
- [ ] Logo en haute définition (idéalement vectoriel) et règles d'usage.
- [ ] Charte graphique officielle : couleurs, typographies, zones de protection.
- [ ] Devise « Pour une administration numérique et efficace » : toujours en vigueur ?
- [ ] Accroche « L'expertise numérique au service de la nation » : proposition à
      accepter, amender ou remplacer.

## Institution

- [ ] Statut juridique et tutelle actuelle.
- [ ] Repères historiques (1999, 2011, 2012, 2017, 2021) et leur formulation.
- [ ] Énoncés de mission, de rôle et de vision.
- [ ] Liste des publics accompagnés et des huit domaines d'expertise.
- [ ] Chiffres clés à jour, si la SNDI souhaite en publier (aucun n'est affiché).

## Expertises

- [ ] Nomenclature officielle des prestations et intitulés retenus.
- [ ] Regroupement « Cloud et datacenter » (deux prestations officielles réunies).
- [ ] Choix des six expertises mises en avant.
- [ ] Page Études et conseils : présentation, domaines, prestations, référentiels
      COBIT et RACINES, questions fréquentes.
- [ ] Périmètre de l'assistance à maîtrise d'ouvrage (non décrit par la source).
- [ ] Synthèses des dix autres pages d'expertise.
- [ ] Offres Big Data, Blockchain et Internet des objets : contenu à fournir.
- [ ] Certifications, agréments et partenariats à mentionner, le cas échéant.

## Solutions et réalisations

- [ ] Statut actuel et version en service de SIGFiP, SIGMAP, SIGFAE et RICI-EPN.
- [ ] Rôle exact de la SNDI pour chaque solution.
- [ ] Développé officiel du sigle SIGMAP.
- [ ] Pays utilisateurs de SIGFiP (les sources ne concordent pas).
- [ ] Liste complète des réalisations, avec bénéficiaires et dates publiables.
- [ ] Accord des structures bénéficiaires pour être citées.

## Actualités

- [ ] Source éditoriale à connecter (CMS) et responsable de publication.
- [ ] Actualités récentes : aucune publication postérieure à septembre 2021 n'a été
      trouvée.
- [ ] Droits sur les photographies et les textes.

## Contact et mentions

- [ ] Adresse, téléphones, courriel et comptes de réseaux sociaux.
- [ ] Devenir du formulaire : préparation d'un courriel (état actuel) ou envoi réel
      par un service de la SNDI.
- [ ] Mentions légales : éditeur, directeur de publication, hébergeur.
- [ ] Politique de confidentialité, si des données sont collectées.

## Technique, avant mise en production

- [ ] Nom de domaine et hébergement.
- [ ] Politique de sécurité du contenu (CSP) et en-tête HSTS.
- [ ] Levée de l'interdiction d'indexation (`ALLOW_INDEXING=true`) et retrait de
      l'avis « proposition indépendante ».
- [ ] Contraste du bouton principal : texte blanc sur l'orange du logo, 2,6 : 1 pour
      un seuil AA de 4,5 : 1. À arbitrer avant toute déclaration de conformité (voir
      [`design-system.md`](design-system.md), § 2).
- [ ] Recette d'accessibilité humaine : lecteur d'écran, zoom 200 %, navigation vocale.
- [ ] Mesure Lighthouse sur l'environnement cible.
