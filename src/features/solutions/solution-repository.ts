import type { RealisationGroup, Solution } from "@/types/content";
import { REALISATION_GROUPS } from "./data/realisations";
import { SOLUTIONS } from "./data/solutions";

export async function getSolutions(): Promise<readonly Solution[]> {
  return SOLUTIONS;
}

export async function getSolutionBySlug(
  slug: string,
): Promise<Solution | null> {
  return SOLUTIONS.find((solution) => solution.slug === slug) ?? null;
}

export async function getRealisationGroups(): Promise<
  readonly RealisationGroup[]
> {
  return REALISATION_GROUPS;
}
