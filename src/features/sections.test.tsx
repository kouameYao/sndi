import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import {
  DomainsSection,
  FaqSection,
  getExpertiseAnchors,
  PresentationSection,
  ReferencesSection,
  RelatedWorkSection,
  ServicesSection,
} from "./expertises/components/expertise-detail-sections";
import { EXPERTISES } from "./expertises/data/expertises";
import { ExpertisesSection } from "./home/components/expertises-section";
import { Hero } from "./home/components/hero";
import { MissionSection } from "./home/components/mission-section";
import { NewsSection } from "./home/components/news-section";
import { SolutionsSection } from "./home/components/solutions-section";
import { getRealisationGroups } from "./solutions/solution-repository";

function findExpertise(slug: string) {
  const expertise = EXPERTISES.find((item) => item.slug === slug);
  if (!expertise) {
    throw new Error(`Expertise de test introuvable : ${slug}`);
  }
  return expertise;
}

const studies = findExpertise("etudes-et-conseils");
const networks = findExpertise("reseaux-et-telecommunications");
const cybersecurity = findExpertise("cybersecurite");
const bigData = findExpertise("big-data");

describe("accueil — Hero", () => {
  test("porte le titre principal et les deux actions", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /L’expertise numérique au service de la\snation/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Découvrir nos expertises" }),
    ).toHaveAttribute("href", "/expertises");
    expect(
      screen.getByRole("link", { name: "Découvrir la SNDI" }),
    ).toHaveAttribute("href", "/institution");
  });

  test("résume l’institution : devise officielle, statut, création, siège", () => {
    render(<Hero />);

    const brief = screen.getByRole("complementary", {
      name: "La SNDI en bref",
    });
    expect(brief).toHaveTextContent(
      "Pour une administration numérique et efficace",
    );
    for (const [term, value] of [
      ["Statut", "Société d’État"],
      ["Création", "10 mars 1999"],
      ["Siège", "Abidjan-Plateau, Cité Financière"],
    ]) {
      expect(within(brief).getByText(term)).toBeInTheDocument();
      expect(within(brief).getByText(value)).toBeInTheDocument();
    }
  });
});

describe("accueil — Mission", () => {
  test("énonce la mission, la vision et les publics, sans chiffre", () => {
    render(<MissionSection />);

    const section = screen.getByRole("region", { name: "Notre mission" });
    expect(section).toHaveTextContent(
      "La SNDI accompagne l’État ivoirien dans la modernisation de son administration",
    );
    expect(within(section).getByText("Notre vision")).toBeInTheDocument();
    expect(within(section).getByText("Nos publics")).toBeInTheDocument();
    expect(section).not.toHaveTextContent(/\d/);
    expect(
      within(section).getByRole("link", {
        name: "Présentation de l’institution",
      }),
    ).toHaveAttribute("href", "/institution");
  });
});

describe("accueil — Expertises", () => {
  test("présente les six expertises phares et les autres prestations", async () => {
    render(await ExpertisesSection());

    const section = screen.getByRole("region", { name: "Nos expertises" });
    for (const expertise of EXPERTISES) {
      expect(
        within(section).getByRole("link", { name: expertise.title }),
      ).toHaveAttribute("href", `/expertises/${expertise.slug}`);
    }
    expect(
      within(section).getByRole("link", { name: "Toutes les expertises" }),
    ).toHaveAttribute("href", "/expertises");
  });
});

describe("accueil — Solutions", () => {
  test("liste les quatre solutions documentées", async () => {
    render(await SolutionsSection());

    const section = screen.getByRole("region", { name: "Nos solutions" });
    for (const acronym of ["SIGFiP", "SIGMAP", "SIGFAE", "RICI-EPN"]) {
      expect(
        within(section).getByRole("link", { name: acronym }),
      ).toBeInTheDocument();
    }
    expect(
      within(section).getByRole("link", { name: "Toutes les réalisations" }),
    ).toHaveAttribute("href", "/realisations");
  });
});

describe("accueil — Actualités", () => {
  test("affiche les trois publications les plus récentes, datées", async () => {
    render(await NewsSection());

    const section = screen.getByRole("region", { name: "Actualités" });
    expect(within(section).getAllByRole("article")).toHaveLength(3);
    expect(within(section).getByText("17 septembre 2021")).toBeInTheDocument();
    expect(
      within(section).getByRole("link", { name: "Toutes les actualités" }),
    ).toHaveAttribute("href", "/actualites");
  });
});

describe("détail d’une expertise — sommaire", () => {
  test("propose toutes les sections de la page détaillée", () => {
    expect(getExpertiseAnchors(studies).map((anchor) => anchor.id)).toEqual([
      "presentation",
      "domaines",
      "prestations",
      "references",
      "realisations",
      "questions",
    ]);
  });

  test("se limite aux sections présentes pour une synthèse", () => {
    expect(getExpertiseAnchors(networks).map((anchor) => anchor.id)).toEqual([
      "presentation",
      "prestations",
      "references",
    ]);
    expect(
      getExpertiseAnchors(cybersecurity).map((anchor) => anchor.id),
    ).toEqual(["presentation", "prestations"]);
  });

  test("se réduit à la présentation quand la source ne publie qu’une définition", () => {
    expect(getExpertiseAnchors(bigData).map((anchor) => anchor.id)).toEqual([
      "presentation",
    ]);
  });
});

describe("détail d’une expertise — sections", () => {
  test("la présentation liste les atouts", () => {
    render(<PresentationSection expertise={studies} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Nos atouts" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Une longue expérience du métier"),
    ).toBeInTheDocument();
  });

  test("un domaine sans offre publiée renvoie vers le contact, sans rien inventer", () => {
    render(
      <>
        <PresentationSection expertise={bigData} />
        <DomainsSection expertise={bigData} />
        <ServicesSection expertise={bigData} />
        <ReferencesSection expertise={bigData} />
        <RelatedWorkSection expertise={bigData} />
        <FaqSection expertise={bigData} />
      </>,
    );

    expect(
      screen.getByRole("link", { name: "contactez la SNDI" }),
    ).toHaveAttribute("href", "/contact");
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });

  test("les domaines d’intervention sont titrés", () => {
    render(<DomainsSection expertise={studies} />);

    const section = screen.getByRole("region", {
      name: "Domaines d’intervention",
    });
    expect(within(section).getAllByRole("listitem")).toHaveLength(3);
    expect(
      within(section).getByRole("heading", {
        level: 3,
        name: "Pilotage des projets",
      }),
    ).toBeInTheDocument();
  });

  test("la page détaillée décrit chacune de ses prestations", () => {
    render(<ServicesSection expertise={studies} />);

    const section = screen.getByRole("region", { name: "Prestations" });
    expect(within(section).getAllByRole("heading", { level: 3 })).toHaveLength(
      3,
    );
  });

  test("une synthèse liste les prestations publiées", () => {
    render(<ServicesSection expertise={networks} />);

    const section = screen.getByRole("region", { name: "Prestations" });
    expect(within(section).getAllByRole("listitem")).toHaveLength(
      networks.services.length,
    );
  });

  test("les référentiels détaillés sont définis un à un", () => {
    render(<ReferencesSection expertise={studies} />);

    const section = screen.getByRole("region", {
      name: "Référentiels et technologies",
    });
    expect(within(section).getByText("COBIT")).toBeInTheDocument();
    expect(within(section).getByText("RACINES")).toBeInTheDocument();
  });

  test("les technologies d’une synthèse sont citées en une phrase", () => {
    render(<ReferencesSection expertise={networks} />);

    expect(
      screen.getByText("Cisco, Juniper, BLR, Wi-Fi, WiMAX, DVB-S2."),
    ).toBeInTheDocument();
  });

  test("les réalisations liées ouvrent le site institutionnel de façon sûre", () => {
    render(<RelatedWorkSection expertise={studies} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  test("la foire aux questions révèle la réponse à l’ouverture", async () => {
    const user = userEvent.setup();
    render(<FaqSection expertise={studies} />);
    const question = screen.getByRole("button", {
      name: "Sur quels référentiels la SNDI s’appuie-t-elle ?",
    });

    expect(question).toHaveAttribute("aria-expanded", "false");
    await user.click(question);

    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Sur COBIT pour l’analyse/)).toBeInTheDocument();
  });
});

describe("réalisations", () => {
  test("sont regroupées en quatre catégories non vides", async () => {
    const groups = await getRealisationGroups();

    expect(groups.map((group) => group.category)).toEqual([
      "applications",
      "infrastructures",
      "etudes",
      "formation",
    ]);
    expect(groups.every((group) => group.items.length > 0)).toBe(true);
  });
});
