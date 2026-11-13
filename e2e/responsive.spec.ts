import { expect, test } from "@playwright/test";
import { ROUTES, VIEWPORT_WIDTHS } from "./support";

const VIEWPORT_HEIGHT = 900;

test.use({ reducedMotion: "reduce" });

for (const width of VIEWPORT_WIDTHS) {
  test.describe(`largeur ${width} px`, () => {
    test.use({ viewport: { width, height: VIEWPORT_HEIGHT } });

    for (const route of ROUTES) {
      test(`${route} ne déborde pas horizontalement`, async ({ page }) => {
        await page.goto(route);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );

        expect(overflow).toBeLessThanOrEqual(0);
      });
    }

    test("le titre principal de l’accueil reste entièrement visible", async ({
      page,
    }) => {
      await page.goto("/");

      const box = await page.getByRole("heading", { level: 1 }).boundingBox();

      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    });
  });
}
