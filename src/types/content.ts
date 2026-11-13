/**
 * Modèles de contenu. Ils décrivent ce qu'un futur CMS devra fournir :
 * les composants ne dépendent que de ces formes, jamais de la source.
 */

export interface SourceRef {
  label: string;
  url: string;
}

/**
 * Niveau de détail disponible dans les sources officielles :
 * - detailed : page complète rédigée dans cette proposition ;
 * - summary : prestations listées par la source, reprises en synthèse ;
 * - definition : la source ne publie qu'une définition générale du domaine.
 */
export type ContentDepth = "detailed" | "summary" | "definition";

export interface NamedReference {
  name: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ExternalItem {
  title: string;
  url: string;
  meta?: string;
}

export interface ExpertiseDetail {
  presentation: readonly string[];
  domains: readonly NamedReference[];
  detailedServices: readonly NamedReference[];
  frameworks: readonly NamedReference[];
  relatedWork: readonly ExternalItem[];
  faq: readonly FaqItem[];
}

export interface Expertise {
  slug: string;
  title: string;
  /** Intitulé(s) exact(s) sur le site institutionnel. */
  officialTitle: string;
  summary: string;
  intro: string;
  featured: boolean;
  depth: ContentDepth;
  services: readonly string[];
  strengths: readonly string[];
  references: readonly string[];
  sources: readonly SourceRef[];
  detail?: ExpertiseDetail;
}

export interface SolutionFact {
  label: string;
  value: string;
}

export interface Solution {
  slug: string;
  acronym: string;
  /** Développé du sigle, uniquement s'il est publié par la source. */
  name: string | null;
  domain: string;
  summary: string;
  scope: readonly string[];
  facts: readonly SolutionFact[];
  source: SourceRef;
}

export type RealisationCategory =
  "applications" | "infrastructures" | "etudes" | "formation";

export interface Realisation {
  title: string;
  acronym?: string;
  category: RealisationCategory;
  theme?: string;
  url: string;
}

export interface RealisationGroup {
  category: RealisationCategory;
  label: string;
  description: string;
  sourceUrl: string;
  items: readonly Realisation[];
}

export interface NewsItem {
  id: string;
  title: string;
  /** Date de publication ISO 8601 (AAAA-MM-JJ). */
  publishedAt: string;
  /** Rubrique fournie par la source éditoriale, si elle en publie une. */
  category?: string;
  url: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface KeyFact {
  label: string;
  value: string;
}
