import type { Expertise } from "@/types/content";
import { EXPERTISES } from "./data/expertises";

/**
 * Accès aux expertises. Les fonctions sont asynchrones pour qu'une source
 * distante (CMS, API) puisse remplacer les données locales sans toucher aux pages.
 */

export async function getExpertises(): Promise<readonly Expertise[]> {
  return EXPERTISES;
}

export async function getFeaturedExpertises(): Promise<readonly Expertise[]> {
  return EXPERTISES.filter((expertise) => expertise.featured);
}

export async function getSecondaryExpertises(): Promise<readonly Expertise[]> {
  return EXPERTISES.filter((expertise) => !expertise.featured);
}

export async function getExpertiseBySlug(
  slug: string,
): Promise<Expertise | null> {
  return EXPERTISES.find((expertise) => expertise.slug === slug) ?? null;
}
