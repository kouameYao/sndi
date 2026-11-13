import type { Solution } from "@/types/content";

const PRODUCTS_URL = "https://www.sndi.ci/index.php/nos-produits";

/**
 * Solutions présentées par la SNDI dans la rubrique « Nos produits » de son
 * site historique (www.sndi.ci). Seul le périmètre publié est repris ; les
 * points à faire confirmer sont listés dans docs/validation-checklist.md.
 */
export const SOLUTIONS: readonly Solution[] = [
  {
    slug: "sigfip",
    acronym: "SIGFiP",
    name: "Système Intégré de Gestion des Finances Publiques",
    domain: "Finances publiques",
    summary:
      "Gestion du budget de l’État : administration des données budgétaires et exécution du budget.",
    scope: [
      "Administration des données budgétaires",
      "Exécution du budget de l’État",
      "Sécurisation de la dépense et appui à la planification budgétaire",
    ],
    facts: [
      { label: "Domaine", value: "Finances publiques" },
      { label: "Première mise en service", value: "1999" },
      {
        label: "Structure bénéficiaire",
        value: "Direction Générale du Budget et des Finances (DGBF)",
      },
    ],
    source: {
      label: "SIGFiP, www.sndi.ci",
      url: `${PRODUCTS_URL}/78.html`,
    },
  },
  {
    slug: "sigmap",
    acronym: "SIGMAP",
    name: null,
    domain: "Marchés publics",
    summary:
      "Gestion des opérations de marchés publics : coordination des acteurs, traçabilité des procédures et suivi en temps réel.",
    scope: [
      "Coordination des acteurs de la gestion des marchés publics",
      "Centralisation, diffusion et archivage de l’information",
      "Suivi en temps réel et traçabilité des procédures",
      "Couverture du cycle, du démarrage des prestations au paiement",
      "Suivi et évaluation des performances du système",
    ],
    facts: [
      { label: "Domaine", value: "Marchés publics" },
      {
        label: "Structure bénéficiaire",
        value: "Direction des Marchés Publics (DMP)",
      },
    ],
    source: {
      label: "SIGMAP, www.sndi.ci",
      url: `${PRODUCTS_URL}/74.html`,
    },
  },
  {
    slug: "sigfae",
    acronym: "SIGFAE",
    name: "Système Intégré de Gestion des Fonctionnaires et Agents de l’État",
    domain: "Ressources humaines de l’État",
    summary:
      "Gestion des ressources humaines de l’administration : planification des ressources et réduction des délais de traitement.",
    scope: [
      "Gestion des ressources humaines de l’administration",
      "Planification des ressources",
      "Réduction des délais de traitement des procédures",
    ],
    facts: [
      { label: "Domaine", value: "Ressources humaines de l’État" },
      {
        label: "Structures bénéficiaires",
        value:
          "Ministère de la Fonction publique, ministères, institutions et établissements publics nationaux",
      },
    ],
    source: {
      label: "SIGFAE, www.sndi.ci",
      url: `${PRODUCTS_URL}/75.html`,
    },
  },
  {
    slug: "rici-epn",
    acronym: "RICI-EPN",
    name: "Réseau Informatique de Comptabilité Intégré",
    domain: "Budget et comptabilité des EPN",
    summary:
      "Gestion budgétaire et comptable des établissements publics nationaux (EPN).",
    scope: [
      "Élaboration et exécution budgétaires",
      "Édition des états comptables",
    ],
    facts: [
      { label: "Domaine", value: "Budget et comptabilité des EPN" },
      {
        label: "Structure bénéficiaire",
        value: "Direction Générale du Budget et des Finances (DGBF)",
      },
    ],
    source: {
      label: "RICI-EPN, www.sndi.ci",
      url: `${PRODUCTS_URL}/76.html`,
    },
  },
];
