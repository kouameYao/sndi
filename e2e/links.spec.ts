import { expect, test } from "@playwright/test";
import { ROUTES } from "./support";

test("tous les liens internes mènent à une page existante", async ({
  page,
  request,
}) => {
  const internalLinks = new Set<string>();

  for (const route of ROUTES) {
    await page.goto(route);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
      );
    hrefs.forEach((href) => internalLinks.add(href.split("#")[0]));
  }

  expect(internalLinks.size).toBeGreaterThan(ROUTES.length);

  const broken: string[] = [];
  for (const href of internalLinks) {
    const response = await request.get(href);
    if (response.status() !== 200) {
      broken.push(`${href} → ${response.status()}`);
    }
  }

  expect(broken).toEqual([]);
});

test("les liens externes s’ouvrent dans un nouvel onglet de façon sûre", async ({
  page,
}) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const unsafe = await page
      .locator('a[target="_blank"]')
      .evaluateAll((anchors) =>
        anchors
          .filter((anchor) => {
            const rel = anchor.getAttribute("rel") ?? "";
            return !rel.includes("noopener") || !rel.includes("noreferrer");
          })
          .map((anchor) => anchor.getAttribute("href")),
      );

    expect(unsafe, `liens non sécurisés sur ${route}`).toEqual([]);
  }
});

test("les liens externes pointent vers des adresses HTTPS", async ({
  page,
}) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const insecure = await page
      .locator('a[href^="http"]')
      .evaluateAll((anchors) =>
        anchors
          .map((anchor) => anchor.getAttribute("href") ?? "")
          .filter((href) => !href.startsWith("https://")),
      );

    expect(insecure, `liens non HTTPS sur ${route}`).toEqual([]);
  }
});
