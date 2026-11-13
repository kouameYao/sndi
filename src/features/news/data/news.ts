import type { NewsItem } from "@/types/content";

export const NEWS_SOURCE_URL = "https://web.sndi.ci/news-infos/";

/**
 * Publications de la rubrique « Actualités » du site institutionnel, relevées
 * le 12 novembre 2026. Seuls le titre, la date et l'adresse sont repris :
 * ni résumé ni visuel n'est ajouté. À remplacer par la source éditoriale (CMS).
 */
export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    id: "forum-african-digital-week-2021",
    title: "Forum African Digital Week 2021",
    publishedAt: "2021-09-17",
    url: "https://web.sndi.ci/forum-african-digital-week-2021/",
  },
  {
    id: "tchologo-renforcement-des-capacites",
    title:
      "Tchologo : renforcement des capacités de 187 fonctionnaires et agents de l’État à l’usage des outils informatiques",
    publishedAt: "2021-07-27",
    url: "https://web.sndi.ci/tchologo-renforcement-des-capacites-de-187-fonctionnaires-et-agents-de-letat-a-lusage-des-outils-informatiques/",
  },
  {
    id: "inauguration-case-du-numerique",
    title: "Inauguration de la case du numérique",
    publishedAt: "2021-06-26",
    url: "https://web.sndi.ci/inauguration-de-la-case-du-numerique/",
  },
  {
    id: "lancement-schema-directeur-communication",
    title:
      "Lancement du schéma directeur du système d’information du ministère de la Communication, des Médias et de la Francophonie",
    publishedAt: "2021-03-26",
    url: "https://web.sndi.ci/lancement-du-schema-directeur-du-systeme-dinformation-du-ministere-de-la-communication-des-medias-et-de-la-francophonie/",
  },
  {
    id: "journee-internationale-de-la-femme",
    title: "Journée internationale de la femme",
    publishedAt: "2021-03-08",
    url: "https://web.sndi.ci/journee-internationale-de-la-femme/",
  },
  {
    id: "assises-du-numerique-2021",
    title: "Les Assises du numérique 2021",
    publishedAt: "2021-02-19",
    url: "https://web.sndi.ci/les-assises-du-numerique-2021/",
  },
  {
    id: "seminaire-formation-dtsi",
    title:
      "Séminaire de formation à l’endroit des policiers de la DTSI du ministère de la Sécurité",
    publishedAt: "2020-11-16",
    url: "https://web.sndi.ci/seminaire-de-formation-a-lendroit-des-policiers-de-la-dtsi-du-ministere-de-la-securite/",
  },
  {
    id: "it-forum-senegal-2016",
    title: "La SNDI à la 6e édition de l’IT Forum Sénégal 2016",
    publishedAt: "2016-02-19",
    url: "https://web.sndi.ci/la-sndi-a-la-6eme-edition-de-lit-forum-senegal-2016/",
  },
  {
    id: "attestations-formation-des-formateurs",
    title: "Cérémonie de remise des attestations de formation des formateurs",
    publishedAt: "2016-02-05",
    url: "https://web.sndi.ci/ceremonie-de-remise-des-attestations-de-formation-des-formateurs/",
  },
  {
    id: "refonte-systeme-information-budgetaire",
    title:
      "Séminaire de validation des documents de référence du projet de refonte du système d’information budgétaire",
    publishedAt: "2015-12-15",
    url: "https://web.sndi.ci/seminaire-de-validation-des-documents-de-reference-du-projet-de-refonte-du-systeme-dinformation-budgetaire/",
  },
];
