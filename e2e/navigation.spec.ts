import { expect, test } from "@playwright/test";
import { DESKTOP_VIEWPORT } from "./support";

test.use({ viewport: DESKTOP_VIEWPORT });

test.describe("accueil", () => {
  test("affiche le titre principal, le logo et l’avis de proposition", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "L’expertise numérique au service de la nation",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("banner").getByRole("img", { name: /SNDI/ }),
    ).toBeVisible();
    await expect(
      page.getByText("Ce site n’est pas le site officiel de la SNDI."),
    ).toBeVisible();
  });

  test("les deux actions du hero mènent aux bonnes pages", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Découvrir nos expertises" }).click();
    await expect(page).toHaveURL("/expertises");

    await page.goto("/");
    await page.getByRole("link", { name: "Découvrir la SNDI" }).click();
    await expect(page).toHaveURL("/institution");
  });

  test("n’est pas indexable : la proposition ne concurrence pas le site officiel", async ({
    page,
  }) => {
    const response = await page.goto("/");

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
  });
});

test.describe("navigation au clavier", () => {
  test("le lien d’évitement est le premier élément focalisable et mène au contenu", async ({
    page,
  }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Aller au contenu" });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#contenu$/);
  });

  test("le focus clavier est visible sur les liens de navigation", async ({
    page,
  }) => {
    await page.goto("/");

    const link = page
      .getByRole("navigation", { name: "Navigation principale" })
      .getByRole("link", { name: "Institution" });
    await link.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");

    await expect(link).toBeFocused();
    await expect(link).toHaveCSS("outline-style", "solid");
    await expect(link).toHaveCSS("outline-width", "2px");
  });

  test("le méga-menu s’ouvre au clavier et mène à la page d’une expertise", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    const trigger = nav.getByRole("button", { name: "Expertises" });

    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const entry = nav.getByRole("link", {
      name: /Études et conseils en informatique/,
    });
    await expect(entry).toBeVisible();
    await entry.click();

    await expect(page).toHaveURL("/expertises/etudes-et-conseils");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Études et conseils en informatique",
      }),
    ).toBeVisible();
  });

  test("Échap ferme le méga-menu et rend le focus au déclencheur", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page
      .getByRole("navigation", { name: "Navigation principale" })
      .getByRole("button", { name: "Expertises" });

    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");

    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });
});

test.describe("repères de navigation", () => {
  test("la rubrique courante est signalée, y compris sur une sous-page", async ({
    page,
  }) => {
    await page.goto("/solutions/sigfip");

    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    await expect(nav.getByRole("link", { name: "Solutions" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    await expect(
      nav.getByRole("link", { name: "Institution" }),
    ).not.toHaveAttribute("aria-current");
  });

  test("le méga-menu marque l’expertise affichée d’un filet orange", async ({
    page,
  }) => {
    await page.goto("/expertises/infogerance");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    const trigger = nav.getByRole("button", { name: "Expertises" });

    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const current = nav.getByRole("link", { name: "Infogérance" });
    await expect(current).toHaveAttribute("aria-current", "page");
    await expect(current).toHaveCSS("border-left-color", "rgb(245, 132, 42)");
    await expect(current).toHaveCSS("font-weight", "600");

    const other = nav.getByRole("link", { name: "Big Data" });
    await expect(other).not.toHaveAttribute("aria-current");
    await expect(other).toHaveCSS("border-left-color", "rgba(0, 0, 0, 0)");
  });

  test("le méga-menu marque aussi une expertise mise en avant", async ({
    page,
  }) => {
    await page.goto("/expertises/cybersecurite");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    await nav.getByRole("button", { name: "Expertises" }).focus();
    await page.keyboard.press("Enter");

    const current = nav.getByRole("link", { name: /^Cybersécurité/ });
    await expect(current).toHaveAttribute("aria-current", "page");
    await expect(current).toHaveCSS("border-left-color", "rgb(245, 132, 42)");
  });

  test("le fil d’Ariane situe la page et permet de remonter", async ({
    page,
  }) => {
    await page.goto("/expertises/etudes-et-conseils");
    const breadcrumb = page.getByRole("navigation", { name: "Fil d’Ariane" });

    await expect(
      breadcrumb.getByText("Études et conseils en informatique"),
    ).toHaveAttribute("aria-current", "page");

    await breadcrumb.getByRole("link", { name: "Expertises" }).click();
    await expect(page).toHaveURL("/expertises");
  });

  test("naviguer entre les pages ne produit aucune erreur JavaScript", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") {
        errors.push(message.text());
      }
    });

    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    for (const label of [
      "Institution",
      "Solutions",
      "Réalisations",
      "Actualités",
    ]) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }

    expect(errors).toEqual([]);
  });
});

test.describe("pages introuvables", () => {
  test("une adresse inconnue renvoie une page 404 utile", async ({ page }) => {
    const response = await page.goto("/page-inexistante");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Page introuvable",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Retour à l’accueil", exact: true }),
    ).toBeVisible();
  });

  test("une expertise inconnue renvoie une page 404", async ({ page }) => {
    await page.goto("/expertises/inexistante");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Page introuvable",
      }),
    ).toBeVisible();
  });
});
