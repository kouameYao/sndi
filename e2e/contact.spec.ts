import { expect, test } from "@playwright/test";
import { DESKTOP_VIEWPORT } from "./support";

test.use({ viewport: DESKTOP_VIEWPORT });

test.describe("formulaire de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("un envoi vide affiche un résumé d’erreurs qui reçoit le focus", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Préparer mon message" }).click();

    const summary = page.locator("form").getByRole("alert");
    await expect(summary).toContainText("4 champs sont à corriger");
    await expect(summary).toBeFocused();
    await expect(
      page.getByLabel("Nom et prénom (obligatoire)"),
    ).toHaveAttribute("aria-invalid", "true");
  });

  test("un lien du résumé d’erreurs place le focus dans le champ concerné", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Préparer mon message" }).click();

    await page
      .locator("form")
      .getByRole("alert")
      .getByRole("link", { name: /Adresse e-mail/ })
      .click();

    await expect(page.getByLabel("Adresse e-mail (obligatoire)")).toBeFocused();
  });

  test("un message valide est préparé sans être envoyé", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") {
        requests.push(`${request.method()} ${request.url()}`);
      }
    });

    await page.getByLabel("Nom et prénom (obligatoire)").fill("Aya Koné");
    await page.getByLabel("Organisation").fill("Mairie de Bouaké");
    await page
      .getByLabel("Adresse e-mail (obligatoire)")
      .fill("aya.kone@example.ci");
    await page
      .getByLabel("Objet de la demande (obligatoire)")
      .selectOption("Cybersécurité");
    await page
      .getByLabel("Votre message (obligatoire)")
      .fill("Nous souhaitons auditer la sécurité de notre réseau interne.");
    await page.getByRole("button", { name: "Préparer mon message" }).click();

    const ready = page.getByRole("region", { name: "Votre message est prêt" });
    await expect(ready).toBeFocused();
    await expect(ready).toContainText("Rien n’a encore été envoyé");
    await expect(ready).toContainText("Mairie de Bouaké");
    await expect(
      page.getByRole("link", { name: "Ouvrir ma messagerie" }),
    ).toHaveAttribute("href", /^mailto:info@sndi\.ci\?subject=/);

    // Aucune donnée ne quitte le navigateur.
    expect(requests).toEqual([]);
  });

  test("revenir modifier le message conserve la saisie et replace le focus", async ({
    page,
  }) => {
    const message =
      "Nous souhaitons auditer la sécurité de notre réseau interne.";
    await page.getByLabel("Nom et prénom (obligatoire)").fill("Aya Koné");
    await page
      .getByLabel("Adresse e-mail (obligatoire)")
      .fill("aya.kone@example.ci");
    await page
      .getByLabel("Objet de la demande (obligatoire)")
      .selectOption("Cybersécurité");
    await page.getByLabel("Votre message (obligatoire)").fill(message);
    await page.getByRole("button", { name: "Préparer mon message" }).click();

    await page.getByRole("button", { name: "Modifier mon message" }).click();

    const name = page.getByLabel("Nom et prénom (obligatoire)");
    await expect(name).toHaveValue("Aya Koné");
    await expect(name).toBeFocused();
    await expect(page.getByLabel("Votre message (obligatoire)")).toHaveValue(
      message,
    );
  });

  test("les coordonnées publiées sont présentes et cliquables", async ({
    page,
  }) => {
    await expect(
      page.getByRole("main").getByRole("link", { name: "info@sndi.ci" }),
    ).toHaveAttribute("href", "mailto:info@sndi.ci");
    await expect(
      page
        .getByRole("main")
        .getByRole("link", { name: "(+225) 27 20 21 78 63" }),
    ).toHaveAttribute("href", "tel:+2252720217863");
  });
});

test.describe("page Études et conseils", () => {
  test("la foire aux questions s’ouvre et se referme au clavier", async ({
    page,
  }) => {
    await page.goto("/expertises/etudes-et-conseils");
    const question = page.getByRole("button", {
      name: "Sur quels référentiels la SNDI s’appuie-t-elle ?",
    });

    await question.focus();
    await page.keyboard.press("Enter");
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(/Sur COBIT pour l’analyse/)).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(question).toHaveAttribute("aria-expanded", "false");
  });

  test("le sommaire mène aux sections de la page", async ({ page }) => {
    await page.goto("/expertises/etudes-et-conseils");

    await page
      .getByRole("navigation", { name: "Sur cette page" })
      .getByRole("link", { name: "Questions fréquentes" })
      .click();

    await expect(page).toHaveURL(/#questions$/);
    await expect(
      page.getByRole("heading", { level: 2, name: "Questions fréquentes" }),
    ).toBeInViewport();
  });
});
