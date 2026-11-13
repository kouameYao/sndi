import type { KeyFact, Milestone, SourceRef } from "@/types/content";

/**
 * Contenus institutionnels. Chaque affirmation provient d'une page publique
 * de la SNDI ; les pages sources ne sont pas datées et doivent être confirmées
 * (voir docs/content-audit.md).
 */

export const INSTITUTION_SOURCES: readonly SourceRef[] = [
  {
    label: "La présentation de l’entreprise, web.sndi.ci",
    url: "https://web.sndi.ci/notre-entreprise/la-presentation-de-lentreprise/",
  },
  {
    label: "Notre histoire, web.sndi.ci",
    url: "https://web.sndi.ci/notre-entreprise/notre-histoire/",
  },
  {
    label: "Présentation, www.sndi.ci",
    url: "https://www.sndi.ci/index.php/presentation.html",
  },
];

export const MISSION = {
  statement:
    "La SNDI accompagne l’État ivoirien dans la modernisation de son administration grâce aux technologies de l’information.",
  role: "Elle est maître d’œuvre de projets informatiques structurants de l’administration ivoirienne.",
  vision: "Une administration publique numérique et efficace.",
  commitment:
    "Proposer des solutions informatiques adaptées aux besoins de l’administration.",
} as const;

/** Repères de l'encart du hero : faits stables, publiés par la SNDI. */
export const KEY_FACTS: readonly KeyFact[] = [
  { label: "Statut", value: "Société d’État" },
  { label: "Création", value: "10 mars 1999" },
  { label: "Siège", value: "Abidjan-Plateau, Cité Financière" },
];

export const AUDIENCES: readonly string[] = [
  "Administration publique",
  "Structures parapubliques",
  "Organismes et institutions",
  "Collectivités territoriales",
  "Entreprises privées",
];

export const EXPERTISE_DOMAINS: readonly string[] = [
  "Assistance et conseil",
  "Réseaux et télécommunications",
  "Service Internet",
  "Administration de datacenter",
  "Développement et intégration de solutions orientées métiers",
  "Cybersécurité",
  "Archivage numérique",
  "Formation continue",
];

export const MILESTONES: readonly Milestone[] = [
  {
    year: "1999",
    title: "Création de la SNDI",
    description:
      "La société est créée par le décret n° 99-220 du 10 mars 1999, à la suite de la dissolution de l’Office Central de la Mécanographie (OCM), pour accompagner l’informatisation de l’administration publique.",
  },
  {
    year: "2011",
    title: "Rattachement à la Primature",
    description:
      "En septembre 2011, la SNDI, jusque-là rattachée au ministère de l’Économie et des Finances, est placée sous la tutelle de la Primature.",
  },
  {
    year: "2012",
    title: "Création du Centre de Formation SNDI",
    description:
      "En mai 2012, la société se dote d’un centre de formation dédié au renforcement des compétences informatiques.",
  },
  {
    year: "2017",
    title: "Tutelle du ministère de l’Économie numérique",
    description:
      "En janvier 2017, la SNDI est placée sous la tutelle du ministère de l’Économie numérique et de la Poste.",
  },
  {
    year: "2021",
    title: "Retour sous la tutelle de la Primature",
    description:
      "En juillet 2021, la SNDI est de nouveau rattachée à la Primature.",
  },
];
