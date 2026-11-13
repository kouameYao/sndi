import { expect, test } from "@playwright/test";
import { MOBILE_VIEWPORT } from "./support";

test.use({ viewport: MOBILE_VIEWPORT, hasTouch: true });

const TAB_PRESSES = 24;

test.describe("menu mobile", () => {
  test("remplace la navigation de bureau sous 1024 px", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeHidden();
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
  });

  test("s’ouvre dans une boîte de dialogue nommée et liste les rubriques", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    for (const label of [
      "Accueil",
      "Institution",
      "Expertises",
      "Solutions",
      "Réalisations",
      "Actualités",
    ]) {
      await expect(
        dialog.getByRole("link", { name: label, exact: false }).first(),
      ).toBeVisible();
    }
    await expect(
      dialog.getByRole("link", { name: "Nous contacter" }),
    ).toBeVisible();
  });

  test("garde le focus à l’intérieur du menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();

    for (let press = 0; press < TAB_PRESSES; press += 1) {
      await page.keyboard.press("Tab");
      const isInside = await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      );
      expect(isInside).toBe(true);
    }
  });

  test("Échap ferme le menu et rend le focus au bouton d’ouverture", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Menu" });
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("choisir une rubrique navigue et referme le menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();

    await page
      .getByRole("dialog", { name: "Menu" })
      .getByRole("link", { name: /Solutions/ })
      .click();

    await expect(page).toHaveURL("/solutions");
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("marque la sous-rubrique affichée et sa rubrique parente", async ({
    page,
  }) => {
    await page.goto("/expertises/infogerance");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });

    const current = dialog.getByRole("link", { name: "Infogérance" });
    await expect(current).toHaveAttribute("aria-current", "page");
    await expect(current).toHaveCSS("border-left-color", "rgb(245, 132, 42)");
    await expect(
      dialog.getByRole("link", { name: "Expertises", exact: true }),
    ).toHaveAttribute("aria-current", "true");
    await expect(
      dialog.getByRole("link", { name: "Big Data" }),
    ).not.toHaveAttribute("aria-current");
  });

  test("le bouton Retour du navigateur referme le menu", async ({ page }) => {
    await page.goto("/");
    await page.goto("/solutions");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();

    await page.goBack();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  });

  test("passer en mise en page de bureau referme le menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 800 });

    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
    await expect(
      page.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeVisible();
  });

  test("les cibles tactiles du menu font au moins 44 px de haut", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();

    const heights = await dialog
      .locator("a, button")
      .evaluateAll((elements) =>
        elements.map((element) => element.getBoundingClientRect().height),
      );

    expect(heights.length).toBeGreaterThan(0);
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
  });
});
