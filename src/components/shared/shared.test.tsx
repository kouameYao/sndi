import { render, renderHook, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useMediaQuery } from "@/lib/use-media-query";
import { ContactCta } from "./contact-cta";
import { DetailSection } from "./detail-section";
import { OnThisPage } from "./on-this-page";
import { Prose } from "./prose";
import { SectionHeading } from "./section-heading";
import { SourceLine } from "./source-line";
import { SplitSection } from "./split-section";
import { TextLink } from "./text-link";

describe("SectionHeading", () => {
  test("expose un titre de niveau 2 identifiable, sa description et son lien", () => {
    render(
      <SectionHeading
        id="solutions-title"
        title="Nos solutions"
        description="Des systèmes d’information pour la gestion publique."
        action={<a href="/realisations">Toutes les réalisations</a>}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Nos solutions" }),
    ).toHaveAttribute("id", "solutions-title");
    expect(
      screen.getByText("Des systèmes d’information pour la gestion publique."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Toutes les réalisations" }),
    ).toBeInTheDocument();
  });

  test("n’affiche ni description ni lien lorsqu’ils sont absents", () => {
    render(<SectionHeading id="titre" title="Actualités" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });
});

describe("TextLink", () => {
  test("rend un lien interne dans le même onglet", () => {
    render(<TextLink href="/institution">Présentation</TextLink>);

    const link = screen.getByRole("link", { name: "Présentation" });
    expect(link).toHaveAttribute("href", "/institution");
    expect(link).not.toHaveAttribute("target");
  });

  test("ouvre un lien externe dans un nouvel onglet, de façon sûre et annoncée", () => {
    render(
      <TextLink href="https://web.sndi.ci/" isExternal>
        Site institutionnel
      </TextLink>,
    );

    // jsdom n'applique pas le CSS : l'espace entre les éléments du lien y est facultatif.
    const link = screen.getByRole("link", {
      name: /Site institutionnel\s*\(nouvel onglet\)/,
    });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("SourceLine", () => {
  test("accorde l’intitulé et liste chaque source", () => {
    render(
      <SourceLine
        sources={[
          { label: "Notre histoire", url: "https://web.sndi.ci/histoire/" },
          { label: "Présentation", url: "https://www.sndi.ci/presentation" },
        ]}
      />,
    );

    expect(screen.getByText(/Sources :/)).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  test("utilise le singulier pour une source unique", () => {
    render(
      <SourceLine
        sources={[{ label: "Contact", url: "https://web.sndi.ci/contact/" }]}
      />,
    );

    expect(screen.getByText(/Source :/)).toBeInTheDocument();
    expect(screen.queryByText(/Sources :/)).not.toBeInTheDocument();
  });
});

describe("OnThisPage", () => {
  test("propose un lien d’ancre par section", () => {
    render(
      <OnThisPage
        anchors={[
          { id: "presentation", label: "Présentation" },
          { id: "questions", label: "Questions fréquentes" },
        ]}
      />,
    );

    const nav = screen.getByRole("navigation", { name: "Sur cette page" });
    expect(
      within(nav).getByRole("link", { name: "Questions fréquentes" }),
    ).toHaveAttribute("href", "#questions");
    expect(within(nav).getAllByRole("listitem")).toHaveLength(2);
  });
});

describe("DetailSection", () => {
  test("relie la section à son titre et affiche son introduction", () => {
    render(
      <DetailSection
        id="prestations"
        title="Prestations"
        intro="Trois prestations."
      >
        <p>Contenu de la section</p>
      </DetailSection>,
    );

    const section = screen.getByRole("region", { name: "Prestations" });
    expect(section).toHaveAttribute("id", "prestations");
    expect(within(section).getByText("Trois prestations.")).toBeInTheDocument();
    expect(
      within(section).getByText("Contenu de la section"),
    ).toBeInTheDocument();
  });
});

describe("SplitSection", () => {
  test("nomme la section par son titre de niveau 2", () => {
    render(
      <SplitSection id="mission-title" title="Mission">
        <p>Accompagner l’État.</p>
      </SplitSection>,
    );

    const section = screen.getByRole("region", { name: "Mission" });
    expect(
      within(section).getByRole("heading", { level: 2, name: "Mission" }),
    ).toBeInTheDocument();
    expect(
      within(section).getByText("Accompagner l’État."),
    ).toBeInTheDocument();
  });
});

describe("Prose", () => {
  test("rend le contenu rédactionnel fourni", () => {
    render(
      <Prose>
        <h2>Nature du projet</h2>
        <p>Initiative indépendante.</p>
      </Prose>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Nature du projet" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Initiative indépendante.")).toBeInTheDocument();
  });
});

describe("ContactCta", () => {
  test("invite à contacter la SNDI par le formulaire ou par téléphone", () => {
    render(<ContactCta />);

    const section = screen.getByRole("region", {
      name: /Un projet de transformation numérique/,
    });
    expect(
      within(section).getByRole("link", { name: "Nous contacter" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      within(section).getByRole("link", { name: "(+225) 27 20 21 78 63" }),
    ).toHaveAttribute("href", "tel:+2252720217863");
  });
});

describe("useMediaQuery", () => {
  test("reflète l’état de la requête média et s’y abonne", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.mocked(window.matchMedia).mockImplementation(
      (query: string) =>
        ({
          matches: query === "(min-width: 64rem)",
          media: query,
          addEventListener,
          removeEventListener,
        }) as unknown as MediaQueryList,
    );

    const wide = renderHook(() => useMediaQuery("(min-width: 64rem)"));
    const narrow = renderHook(() => useMediaQuery("(min-width: 200rem)"));

    expect(wide.result.current).toBe(true);
    expect(narrow.result.current).toBe(false);
    expect(addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    wide.unmount();
    expect(removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});
