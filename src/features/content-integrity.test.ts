import { describe, expect, test } from "vitest";
import { EXPERTISES } from "./expertises/data/expertises";
import {
  getExpertiseBySlug,
  getFeaturedExpertises,
  getSecondaryExpertises,
} from "./expertises/expertise-repository";
import { MILESTONES } from "./institution/data/institution";
import { NEWS_ITEMS } from "./news/data/news";
import {
  getNews,
  groupNewsByYear,
  sortNewsByDate,
} from "./news/news-repository";
import { REALISATION_GROUPS } from "./solutions/data/realisations";
import { SOLUTIONS } from "./solutions/data/solutions";
import { getSolutionBySlug } from "./solutions/solution-repository";

const OFFICIAL_HOSTS = ["web.sndi.ci", "www.sndi.ci"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isOfficialUrl(url: string): boolean {
  const parsed = new URL(url);
  return parsed.protocol === "https:" && OFFICIAL_HOSTS.includes(parsed.host);
}

describe("expertises", () => {
  test("chaque expertise a un identifiant d’URL unique et bien formé", () => {
    const slugs = EXPERTISES.map((expertise) => expertise.slug);

    expect(slugs.every((slug) => SLUG_PATTERN.test(slug))).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("chaque expertise cite au moins une source officielle", () => {
    for (const expertise of EXPERTISES) {
      expect(expertise.sources.length).toBeGreaterThan(0);
      expect(
        expertise.sources.every((source) => isOfficialUrl(source.url)),
      ).toBe(true);
    }
  });

  test("six expertises sont mises en avant sur l’accueil", async () => {
    const featured = await getFeaturedExpertises();
    const secondary = await getSecondaryExpertises();

    expect(featured).toHaveLength(6);
    expect(featured.length + secondary.length).toBe(EXPERTISES.length);
  });

  test("la page prioritaire « Études et conseils » est détaillée", async () => {
    const expertise = await getExpertiseBySlug("etudes-et-conseils");

    expect(expertise?.depth).toBe("detailed");
    expect(expertise?.detail?.detailedServices).toHaveLength(3);
    expect(expertise?.detail?.faq.length).toBeGreaterThan(0);
  });

  test("une expertise réduite à une définition ne liste aucune prestation", () => {
    const definitions = EXPERTISES.filter(
      (expertise) => expertise.depth === "definition",
    );

    expect(definitions.length).toBeGreaterThan(0);
    expect(
      definitions.every((expertise) => expertise.services.length === 0),
    ).toBe(true);
  });

  test("retourne null pour une expertise inconnue", async () => {
    expect(await getExpertiseBySlug("inexistante")).toBeNull();
  });
});

describe("solutions", () => {
  test("chaque solution a un identifiant unique et une source officielle", () => {
    const slugs = SOLUTIONS.map((solution) => solution.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(
      SOLUTIONS.every((solution) => isOfficialUrl(solution.source.url)),
    ).toBe(true);
  });

  test("retourne null pour une solution inconnue", async () => {
    expect(await getSolutionBySlug("inexistante")).toBeNull();
  });
});

describe("réalisations", () => {
  test("chaque réalisation renvoie vers le site institutionnel", () => {
    const items = REALISATION_GROUPS.flatMap((group) => group.items);

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => isOfficialUrl(item.url))).toBe(true);
  });

  test("chaque réalisation appartient au groupe qui la contient", () => {
    for (const group of REALISATION_GROUPS) {
      expect(
        group.items.every((item) => item.category === group.category),
      ).toBe(true);
    }
  });
});

describe("actualités", () => {
  test("chaque actualité a une date ISO valide et un lien officiel", () => {
    for (const item of NEWS_ITEMS) {
      expect(item.publishedAt).toMatch(ISO_DATE_PATTERN);
      expect(Number.isNaN(Date.parse(item.publishedAt))).toBe(false);
      expect(isOfficialUrl(item.url)).toBe(true);
    }
  });

  test("les identifiants d’actualité sont uniques", () => {
    const ids = NEWS_ITEMS.map((item) => item.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  test("trie du plus récent au plus ancien sans modifier la source", () => {
    const shuffled = [NEWS_ITEMS[3], NEWS_ITEMS[0], NEWS_ITEMS[9]];
    const sorted = sortNewsByDate(shuffled);

    expect(sorted.map((item) => item.id)).toEqual([
      NEWS_ITEMS[0].id,
      NEWS_ITEMS[3].id,
      NEWS_ITEMS[9].id,
    ]);
    expect(shuffled[0]).toBe(NEWS_ITEMS[3]);
  });

  test("limite le nombre d’actualités retournées", async () => {
    const latest = await getNews(3);
    const all = await getNews();

    expect(latest).toHaveLength(3);
    expect(latest[0].publishedAt).toBe("2021-09-17");
    expect(all).toHaveLength(NEWS_ITEMS.length);
  });
});

describe("actualités par année", () => {
  test("regroupe les actualités par année, de la plus récente à la plus ancienne", () => {
    const years = groupNewsByYear(NEWS_ITEMS);

    expect(years.map((group) => group.year)).toEqual([
      "2021",
      "2020",
      "2016",
      "2015",
    ]);
    expect(years[0].items).toHaveLength(6);
    expect(years.reduce((total, group) => total + group.items.length, 0)).toBe(
      NEWS_ITEMS.length,
    );
  });

  test("retourne une liste vide sans actualité", () => {
    expect(groupNewsByYear([])).toEqual([]);
  });
});

describe("repères historiques", () => {
  test("sont classés par ordre chronologique", () => {
    const years = MILESTONES.map((milestone) => Number(milestone.year));

    expect(years).toEqual([...years].sort((a, b) => a - b));
  });
});
