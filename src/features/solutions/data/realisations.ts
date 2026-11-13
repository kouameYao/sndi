import type { RealisationGroup } from "@/types/content";

const REALISATIONS_URL = "https://web.sndi.ci/nos-realisations";
const PROJECTS_URL = `${REALISATIONS_URL}/projets`;

/**
 * Réalisations référencées par le site institutionnel (web.sndi.ci).
 * La source ne publie que des intitulés : aucune description, date ou
 * bénéficiaire n'est ajouté. La liste des applications métiers reprend la
 * première page de la rubrique (les pages suivantes restent à intégrer).
 */
export const REALISATION_GROUPS: readonly RealisationGroup[] = [
  {
    category: "applications",
    label: "Applications métiers",
    description:
      "Systèmes d’information conçus pour les métiers de l’administration.",
    sourceUrl: `${REALISATIONS_URL}/nos-applications-metiers/`,
    items: [
      {
        acronym: "SIGFIP",
        title: "Système Intégré de Gestion des Finances Publiques",
        category: "applications",
        theme: "Finances publiques",
        url: `${PROJECTS_URL}/sigfip-systeme-integre-de-gestion-des-finances-publiques/`,
      },
      {
        acronym: "SIGFP",
        title: "Système d’Information de Gestion des Finances Publiques",
        category: "applications",
        theme: "Finances publiques",
        url: `${PROJECTS_URL}/systeme-dinformation-de-gestion-des-finances-publiques-sigfp/`,
      },
      {
        acronym: "IMMAT",
        title: "Immatriculation des contribuables",
        category: "applications",
        theme: "Finances publiques",
        url: `${PROJECTS_URL}/immat-immatriculation-des-contribuables-personnes-physiques-ou-morales/`,
      },
      {
        acronym: "GUOAR",
        title:
          "Gestion Unifiée des Opérations d’Assiette et de Recette des Impôts",
        category: "applications",
        theme: "Finances publiques",
        url: `${PROJECTS_URL}/guoar-gestion-unifiee-des-operations-dassiette-et-de-recette-des-impots/`,
      },
      {
        acronym: "SIGA-DPE",
        title:
          "Système Intégré de Gestion des Activités de la Direction du Patrimoine de l’État",
        category: "applications",
        theme: "Finances publiques",
        url: `${PROJECTS_URL}/siga-dpe-systeme-integre-de-gestion-des-activites-de-la-direction-du-patrimoine-de-letat/`,
      },
      {
        acronym: "SIGP",
        title:
          "Système d’information pour la gestion des procédures judiciaires, pénales et d’émission des actes administratifs",
        category: "applications",
        theme: "Bonne gouvernance",
        url: `${PROJECTS_URL}/systeme-dinformation-pour-la-gestion-des-procedures-judiciaires-penales-et-demission-des-actes-administratifs-du-ministere-de-la-justice-et-des-droits-de-lhomme-sigp/`,
      },
      {
        acronym: "SIGESCOD",
        title: "Système Intégré de Gestion des Collectivités Décentralisées",
        category: "applications",
        theme: "Bonne gouvernance",
        url: `${PROJECTS_URL}/systeme-integre-de-gestion-des-collectivites-decentralisees-sigescod/`,
      },
      {
        acronym: "BDC",
        title: "Répertoire ou Base de Données des Compétences",
        category: "applications",
        theme: "Bonne gouvernance",
        url: `${PROJECTS_URL}/repertoire-des-competences-ou-base-de-donnees-des-competences-bdc/`,
      },
      {
        acronym: "CEPICI",
        title: "Guichet Unique de Création d’Entreprises",
        category: "applications",
        theme: "Guichet unique",
        url: `${PROJECTS_URL}/guichet-unique-de-creation-dentreprises-cepici/`,
      },
      {
        acronym: "GUPC",
        title: "Guichet Unique d’octroi du Permis de Construire",
        category: "applications",
        theme: "Guichet unique",
        url: `${PROJECTS_URL}/gupc-guichet-unique-doctroi-du-permis-de-construire/`,
      },
      {
        acronym: "SIGSUP",
        title: "Système Intégré de Gestion et de Suivi de Programme",
        category: "applications",
        theme: "Équipements et entretien routier",
        url: `${PROJECTS_URL}/systeme-integre-de-gestion-et-de-suivi-de-programme-sigsup/`,
      },
    ],
  },
  {
    category: "infrastructures",
    label: "Infrastructures",
    description:
      "Réseaux, hébergement et socles techniques de l’administration.",
    sourceUrl: `${REALISATIONS_URL}/nos-realisations-dinfrastructures/`,
    items: [
      {
        title: "Hub satellitaire de l’intranet de l’administration ivoirienne",
        category: "infrastructures",
        url: `${REALISATIONS_URL}/nos-realisations-dinfrastructures/`,
      },
      {
        title: "Data center de l’administration ivoirienne",
        category: "infrastructures",
        url: `${REALISATIONS_URL}/nos-realisations-dinfrastructures/`,
      },
      {
        title: "Support E-GOUV",
        category: "infrastructures",
        url: `${REALISATIONS_URL}/nos-realisations-dinfrastructures/`,
      },
    ],
  },
  {
    category: "etudes",
    label: "Études et conseils",
    description: "Missions de cadrage stratégique et d’audit.",
    sourceUrl: `${REALISATIONS_URL}/nos-realisations-detudes-et-de-conseils/`,
    items: [
      {
        title: "Audit informatique",
        category: "etudes",
        url: `${PROJECTS_URL}/audit-informatique/`,
      },
      {
        acronym: "SDSI",
        title: "Schéma Directeur des Systèmes d’Information",
        category: "etudes",
        url: `${PROJECTS_URL}/schema-directeur-des-systemes-dinformations-sdsi/`,
      },
    ],
  },
  {
    category: "formation",
    label: "Formation continue",
    description: "Actions du Centre de Formation SNDI.",
    sourceUrl: `${REALISATIONS_URL}/nos-realisations-en-formation-continue/`,
    items: [
      {
        title: "Formation à l’intérieur du pays",
        category: "formation",
        url: `${REALISATIONS_URL}/nos-realisations-en-formation-continue/`,
      },
      {
        title: "Formation spécifique",
        category: "formation",
        url: `${REALISATIONS_URL}/nos-realisations-en-formation-continue/`,
      },
    ],
  },
];
