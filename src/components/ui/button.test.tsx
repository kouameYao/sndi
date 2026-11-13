import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  test("rend un bouton cliquable avec son libellé", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Envoyer</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Envoyer" }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  test("applique la variante et la taille demandées", () => {
    render(
      <Button variant="outline" size="lg">
        Détails
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Détails" });
    expect(button.className).toContain("border-foreground");
    expect(button.className).toContain("h-13");
  });

  test("bloque l’interaction lorsqu’il est désactivé", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Envoyer
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Envoyer" }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("signale le chargement et bloque l’interaction", async () => {
    const handleClick = vi.fn();
    render(
      <Button isLoading onClick={handleClick}>
        Envoyer
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Envoyer" });
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("donne l’apparence du bouton à un lien avec asChild", () => {
    render(
      <Button asChild>
        <a href="/contact">Nous contacter</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Nous contacter" });
    expect(link).toHaveAttribute("href", "/contact");
    expect(link.className).toContain("bg-primary");
  });
});
