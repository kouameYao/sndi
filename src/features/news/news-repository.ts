import type { NewsItem } from "@/types/content";
import { NEWS_ITEMS } from "./data/news";

/** Trie du plus récent au plus ancien sans modifier la liste d'origine. */
export function sortNewsByDate(items: readonly NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export interface NewsYear {
  year: string;
  items: readonly NewsItem[];
}

/** Regroupe les actualités par année, de la plus récente à la plus ancienne. */
export function groupNewsByYear(items: readonly NewsItem[]): NewsYear[] {
  const years = new Map<string, NewsItem[]>();

  for (const item of sortNewsByDate(items)) {
    const year = item.publishedAt.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), item]);
  }

  return [...years.entries()].map(([year, yearItems]) => ({
    year,
    items: yearItems,
  }));
}

/**
 * Point d'entrée unique des actualités : remplacer le corps de cette fonction
 * par un appel CMS suffit à alimenter l'accueil et la page Actualités.
 */
export async function getNews(limit?: number): Promise<readonly NewsItem[]> {
  const sorted = sortNewsByDate(NEWS_ITEMS);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}
