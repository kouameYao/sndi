import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Logo } from "@/components/brand/logo";
import { Container } from "./container";
import { MobileNavigation } from "./mobile-navigation";
import type { NavigationData } from "./navigation-types";
import { PageHero } from "./page-hero";
import { ProposalNotice } from "./proposal-notice";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const navigationState = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}));

const NAVIGATION: NavigationData = {
  items: [
    { label: "Accueil", href: "/" },
    { label: "Expertises", href: "/expertises" },
    { label: "Solutions", href: "/solutions" },
  ],
  megaMenuHref: "/expertises",
  featured: [
    {
      href: "/expertises/cybersecurite",
      title: "Cybersécurité",
      summary: "Sécurisation des données.",
    },
  ],
  secondary: [{ label: "Infogérance", href: "/expertises/infogerance" }],
};

beforeEach(() => {
  navigationState.pathname = "/";
});

describe("ProposalNotice", () => {
  test("rappelle que le site n’est pas officiel et renvoie vers le site de la SNDI", () => {
    render(<ProposalNotice />);

    const notice = screen.getByRole("complementary", {
      name: "Avis sur la nature de ce site",
    });
    expect(notice).toHaveTextContent(
      "Ce site n’est pas le site officiel de la SNDI.",
    );
    expect(
      within(notice).getByRole("link", { name: /Consulter le site officiel/ }),
    ).toHaveAttribute("href", "https://web.sndi.ci/");
  });
});

describe("Logo", () => {
  test("affiche le fichier officiel avec une alternative textuelle complète", () => {
    render(<Logo />);

    const logo = screen.getByRole("img", {
      name: "SNDI — Société Nationale de Développement Informatique",
    });
    expect(logo).toHaveAttribute("src", "/brand/logo-sndi.png");
    expect(logo).toHaveAttribute("width", "351");
    expect(logo).toHaveAttribute("height", "100");
  });

  test("est chargé sans attente lorsqu’il est au-dessus de la ligne de flottaison", () => {
    render(<Logo isEager />);

    expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
  });
});

describe("Container", () => {
  test("rend l’élément demandé avec la grille de page", () => {
    render(
      <Container as="section" hasGrid aria-label="Zone de test">
        contenu
      </Container>,
    );

    const region = screen.getByRole("region", { name: "Zone de test" });
    expect(region.className).toContain("container-page");
    expect(region.className).toContain("grid-page");
  });
});

describe("PageHero", () => {
  test("expose le fil d’Ariane, le titre de niveau 1, le chapeau et les actions", () => {
    render(
      <PageHero
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        title="Nous contacter"
        lead="Écrivez-nous ou appelez-nous."
        actions={<a href="#formulaire">Écrire</a>}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Fil d’Ariane" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Nous contacter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Écrivez-nous ou appelez-nous."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Écrire" })).toBeInTheDocument();
  });

  test("se limite au titre lorsque chapeau et actions sont absents", () => {
    render(
      <PageHero
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Solutions" }]}
        title="Nos solutions"
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});

describe("SiteHeader", () => {
  test("relie le logo à l’accueil et propose la navigation principale", async () => {
    render(await SiteHeader());

    const header = screen.getByRole("banner");
    expect(
      within(header).getByRole("link", { name: "SNDI — retour à l’accueil" }),
    ).toHaveAttribute("href", "/");

    const nav = within(header).getByRole("navigation", {
      name: "Navigation principale",
    });
    for (const label of ["Institution", "Solutions", "Actualités"]) {
      expect(
        within(nav).getByRole("link", { name: label }),
      ).toBeInTheDocument();
    }
    expect(
      within(nav).getByRole("button", { name: "Expertises" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      within(header).getByRole("link", { name: "Nous contacter" }),
    ).toHaveAttribute("href", "/contact");
  });

  test("signale la rubrique courante dans la navigation", async () => {
    navigationState.pathname = "/solutions/sigfip";

    render(await SiteHeader());

    const nav = screen.getByRole("navigation", {
      name: "Navigation principale",
    });
    // Sur une sous-page, la rubrique parente est signalée sans être « la page ».
    expect(
      within(nav).getByRole("link", { name: "Solutions" }),
    ).toHaveAttribute("aria-current", "true");
    expect(
      within(nav).getByRole("link", { name: "Institution" }),
    ).not.toHaveAttribute("aria-current");
  });

  test("désigne la page affichée lorsqu’elle est une rubrique", async () => {
    navigationState.pathname = "/solutions";

    render(await SiteHeader());

    expect(
      within(
        screen.getByRole("navigation", { name: "Navigation principale" }),
      ).getByRole("link", { name: "Solutions" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("marque dans le méga-menu l’expertise affichée, et elle seule", async () => {
    navigationState.pathname = "/expertises/infogerance";
    const user = userEvent.setup();
    render(await SiteHeader());
    const trigger = screen.getByRole("button", { name: "Expertises" });

    expect(trigger).toHaveAttribute("aria-current", "true");
    await user.click(trigger);

    expect(
      await screen.findByRole("link", { name: "Infogérance" }),
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Big Data" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(
      screen.getByRole("link", { name: /Cybersécurité/ }),
    ).not.toHaveAttribute("aria-current");
    expect(
      screen.getByRole("link", { name: "Toutes les expertises" }),
    ).not.toHaveAttribute("aria-current");
  });

  test("marque « Toutes les expertises » sur la page du catalogue", async () => {
    navigationState.pathname = "/expertises";
    const user = userEvent.setup();
    render(await SiteHeader());

    await user.click(screen.getByRole("button", { name: "Expertises" }));

    expect(
      await screen.findByRole("link", { name: "Toutes les expertises" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("ouvre le méga-menu des expertises au clic", async () => {
    const user = userEvent.setup();
    render(await SiteHeader());
    const trigger = screen.getByRole("button", { name: "Expertises" });

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      await screen.findByRole("link", { name: "Toutes les expertises" }),
    ).toHaveAttribute("href", "/expertises");
    expect(
      screen.getByRole("link", { name: /Études et conseils en informatique/ }),
    ).toHaveAttribute("href", "/expertises/etudes-et-conseils");
    expect(screen.getByRole("link", { name: "Infogérance" })).toHaveAttribute(
      "href",
      "/expertises/infogerance",
    );
  });
});

describe("MobileNavigation", () => {
  test("reste fermé tant que le bouton n’est pas activé", () => {
    render(<MobileNavigation {...NAVIGATION} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("ouvre un dialogue listant les rubriques et les expertises phares", async () => {
    const user = userEvent.setup();
    render(<MobileNavigation {...NAVIGATION} />);

    await user.click(screen.getByRole("button", { name: "Menu" }));

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(
      within(dialog).getByRole("link", { name: "Accueil" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(dialog).getByRole("link", { name: "Cybersécurité" }),
    ).toHaveAttribute("href", "/expertises/cybersecurite");
    expect(
      within(dialog).getByRole("link", { name: "Nous contacter" }),
    ).toHaveAttribute("href", "/contact");
  });

  test("liste toutes les expertises et marque celle qui est affichée", async () => {
    navigationState.pathname = "/expertises/infogerance";
    const user = userEvent.setup();
    render(<MobileNavigation {...NAVIGATION} />);

    await user.click(screen.getByRole("button", { name: "Menu" }));

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(
      within(dialog).getByRole("link", { name: "Infogérance" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(dialog).getByRole("link", { name: "Cybersécurité" }),
    ).not.toHaveAttribute("aria-current");
    expect(
      within(dialog).getByRole("link", { name: "Expertises" }),
    ).toHaveAttribute("aria-current", "true");
  });

  test("se referme lorsqu’une rubrique est choisie", async () => {
    const user = userEvent.setup();
    render(<MobileNavigation {...NAVIGATION} />);
    await user.click(screen.getByRole("button", { name: "Menu" }));

    await user.click(
      within(screen.getByRole("dialog")).getByRole("link", {
        name: "Solutions",
      }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("se referme avec le bouton de fermeture", async () => {
    const user = userEvent.setup();
    render(<MobileNavigation {...NAVIGATION} />);
    await user.click(screen.getByRole("button", { name: "Menu" }));

    await user.click(screen.getByRole("button", { name: "Fermer" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  test("réunit navigation, prestations, coordonnées et mentions", async () => {
    render(await SiteFooter());

    const footer = screen.getByRole("contentinfo");
    for (const title of ["Navigation", "Prestations", "Contact"]) {
      expect(
        within(footer).getByRole("heading", { level: 2, name: title }),
      ).toBeInTheDocument();
    }
    expect(
      within(footer).getByRole("link", { name: "info@sndi.ci" }),
    ).toHaveAttribute("href", "mailto:info@sndi.ci");
    expect(
      within(footer).getByRole("link", { name: "Mentions légales" }),
    ).toHaveAttribute("href", "/mentions-legales");
    expect(
      within(footer).getByRole("link", { name: "Confidentialité" }),
    ).toHaveAttribute("href", "/confidentialite");
    expect(footer).toHaveTextContent("Proposition indépendante");
  });

  test("liste les six expertises mises en avant", async () => {
    render(await SiteFooter());

    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByRole("link", { name: "Cybersécurité" }),
    ).toHaveAttribute("href", "/expertises/cybersecurite");
    expect(
      within(footer).getByRole("link", { name: "Formation continue" }),
    ).toHaveAttribute("href", "/expertises/formation");
  });
});
