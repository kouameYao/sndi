import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { EmptyState } from "@/components/shared/empty-state";
import {
  ServiceCard,
  ServiceCardGrid,
} from "./expertises/components/service-card";
import { EXPERTISES } from "./expertises/data/expertises";
import { NewsCard } from "./news/components/news-card";
import { NEWS_ITEMS } from "./news/data/news";
import { SolutionCard } from "./solutions/components/solution-card";
import { SOLUTIONS } from "./solutions/data/solutions";

const [, development] = EXPERTISES;
const [sigfip, sigmap] = SOLUTIONS;
const [latestNews] = NEWS_ITEMS;

describe("ServiceCard", () => {
  test("lie le titre de l’expertise à sa page détaillée", () => {
    render(<ServiceCard expertise={development} />);

    expect(
      screen.getByRole("link", { name: development.title }),
    ).toHaveAttribute("href", `/expertises/${development.slug}`);
    expect(
      screen.getByRole("heading", { level: 3, name: development.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(development.summary)).toBeInTheDocument();
  });

  test("n’expose qu’un seul lien : toute la carte est une cible unique", () => {
    render(<ServiceCard expertise={development} />);

    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  test("adapte le niveau de titre au contexte de la page", () => {
    render(<ServiceCard expertise={development} headingLevel="h2" />);

    expect(
      screen.getByRole("heading", { level: 2, name: development.title }),
    ).toBeInTheDocument();
  });
});

describe("ServiceCardGrid", () => {
  test("présente chaque expertise dans une liste", () => {
    render(<ServiceCardGrid expertises={EXPERTISES} />);

    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(EXPERTISES.length);
  });
});

describe("SolutionCard", () => {
  test("lie le sigle à la fiche de la solution et affiche son domaine", () => {
    render(<SolutionCard solution={sigfip} />);

    expect(screen.getByRole("link", { name: "SIGFiP" })).toHaveAttribute(
      "href",
      "/solutions/sigfip",
    );
    expect(screen.getByText(sigfip.domain)).toBeInTheDocument();
    expect(screen.getByText(sigfip.name ?? "")).toBeInTheDocument();
  });

  test("n’invente pas de dénomination quand la source n’en publie pas", () => {
    render(<SolutionCard solution={sigmap} />);

    expect(sigmap.name).toBeNull();
    expect(screen.getByText(sigmap.summary)).toBeInTheDocument();
  });
});

describe("NewsCard", () => {
  test("expose la date en clair et dans un élément lisible par les machines", () => {
    render(<NewsCard item={latestNews} />);

    const date = screen.getByText("17 septembre 2021");
    expect(date.tagName).toBe("TIME");
    expect(date).toHaveAttribute("datetime", latestNews.publishedAt);
  });

  test("ouvre l’article officiel dans un nouvel onglet, de façon sûre", () => {
    render(<NewsCard item={latestNews} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", latestNews.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAccessibleName(latestNews.title);
    expect(link).toHaveAccessibleDescription(/nouvel onglet/);
  });
});

describe("EmptyState", () => {
  test("explique l’absence de contenu et propose une issue", () => {
    render(
      <EmptyState
        title="Aucune actualité pour le moment"
        description="Les publications apparaîtront ici."
        action={<a href="#rubrique">Voir la rubrique</a>}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Aucune actualité pour le moment" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Les publications apparaîtront ici."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voir la rubrique" }),
    ).toBeInTheDocument();
  });
});
