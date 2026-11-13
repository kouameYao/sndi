import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Breadcrumb } from "./breadcrumb";

const ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Expertises", href: "/expertises" },
  { label: "Cybersécurité" },
];

describe("Breadcrumb", () => {
  test("expose une navigation nommée contenant une liste ordonnée", () => {
    render(<Breadcrumb items={ITEMS} />);

    const nav = screen.getByRole("navigation", { name: "Fil d’Ariane" });
    expect(within(nav).getAllByRole("listitem")).toHaveLength(3);
  });

  test("rend les pages parentes sous forme de liens", () => {
    render(<Breadcrumb items={ITEMS} />);

    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Expertises" })).toHaveAttribute(
      "href",
      "/expertises",
    );
  });

  test("signale la page courante sans en faire un lien", () => {
    render(<Breadcrumb items={ITEMS} />);

    const current = screen.getByText("Cybersécurité");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(
      screen.queryByRole("link", { name: "Cybersécurité" }),
    ).not.toBeInTheDocument();
  });
});
