import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { DESKTOP_VIEWPORT, MOBILE_VIEWPORT, ROUTES } from "./support";

/** Règles automatisables des niveaux A et AA, jusqu'à WCAG 2.2. */
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

/**
 * Radix NavigationMenu insère, menu ouvert, un relais de focus invisible
 * (`span[aria-hidden][tabindex="0"]`) qui renvoie aussitôt le focus dans le
 * panneau. axe le signale (aria-hidden-focus) alors qu'aucun utilisateur ne
 * peut s'y arrêter : il est exclu de l'analyse, et lui seul.
 */
const RADIX_FOCUS_PROXY =
  'nav[aria-label="Navigation principale"] span[aria-hidden="true"][tabindex="0"]';

const CONTRAST_RULE = "color-contrast";

/**
 * Écart connu — boutons principaux : texte blanc sur l'orange du logo, soit
 * 2,6 : 1 au repos pour un seuil AA de 4,5 : 1. Choix de direction artistique
 * du 13 novembre 2026, consigné dans `docs/design-system.md` et à arbitrer
 * (`docs/validation-checklist.md`). Seuls ces boutons échappent à la règle de
 * contraste ; un test ci-dessous vérifie que l'écart ne s'étend à rien d'autre.
 */
const PRIMARY_BUTTON = ".bg-primary";

type AxeViolations = Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"];

function summarise(violations: AxeViolations) {
  return violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    nodes: violation.nodes.map((node) => node.target.join(" ")),
  }));
}

/** Toutes les règles, le contraste étant contrôlé hors boutons principaux. */
async function findViolations(page: Page) {
  const general = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .disableRules([CONTRAST_RULE])
    .exclude(RADIX_FOCUS_PROXY)
    .analyze();
  const contrast = await new AxeBuilder({ page })
    .withRules([CONTRAST_RULE])
    .exclude(PRIMARY_BUTTON)
    .analyze();
  return summarise([...general.violations, ...contrast.violations]);
}

test.use({ reducedMotion: "reduce" });

test.describe("accessibilité — bureau", () => {
  test.use({ viewport: DESKTOP_VIEWPORT });

  for (const route of ROUTES) {
    test(`${route} ne présente aucune violation WCAG A/AA détectable`, async ({
      page,
    }) => {
      await page.goto(route);

      expect(await findViolations(page)).toEqual([]);
    });
  }

  test("le méga-menu ouvert ne présente aucune violation", async ({ page }) => {
    await page.goto("/");
    const trigger = page
      .getByRole("navigation", { name: "Navigation principale" })
      .getByRole("button", { name: "Expertises" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    expect(await findViolations(page)).toEqual([]);
  });

  test("le formulaire en erreur ne présente aucune violation", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Préparer mon message" }).click();
    await expect(page.locator("form").getByRole("alert")).toBeVisible();

    expect(await findViolations(page)).toEqual([]);
  });
});

test.describe("accessibilité — mobile", () => {
  test.use({ viewport: MOBILE_VIEWPORT });

  for (const route of ROUTES) {
    test(`${route} ne présente aucune violation WCAG A/AA détectable`, async ({
      page,
    }) => {
      await page.goto(route);

      expect(await findViolations(page)).toEqual([]);
    });
  }

  test("le menu mobile ouvert ne présente aucune violation", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();

    expect(await findViolations(page)).toEqual([]);
  });
});

test.describe("écart de contraste connu", () => {
  test.use({ viewport: DESKTOP_VIEWPORT });

  test("seuls les boutons principaux sont sous le seuil de contraste AA", async ({
    page,
  }) => {
    await page.goto("/");

    const { violations } = await new AxeBuilder({ page })
      .withRules([CONTRAST_RULE])
      .analyze();
    const selectors = violations.flatMap((violation) =>
      violation.nodes.map((node) => node.target.join(" ")),
    );

    // L'écart existe : si ce test échoue ici, l'exception n'a plus lieu d'être.
    expect(selectors.length).toBeGreaterThan(0);
    for (const selector of selectors) {
      await expect(page.locator(selector)).toHaveClass(
        /(^|\s)bg-primary(\s|$)/,
      );
    }
  });
});

test.describe("structure des pages", () => {
  test.use({ viewport: DESKTOP_VIEWPORT });

  for (const route of ROUTES) {
    test(`${route} a un seul titre de niveau 1 et des niveaux sans saut`, async ({
      page,
    }) => {
      await page.goto(route);

      const headings = await page
        .locator("h1, h2, h3, h4, h5, h6")
        .evaluateAll((nodes) =>
          nodes.map((node) => ({
            level: Number(node.tagName.slice(1)),
            text: node.textContent?.trim().slice(0, 60) ?? "",
          })),
        );

      const levelOnes = headings.filter((heading) => heading.level === 1);
      const skips = headings.filter((heading, index) => {
        const previousLevel = index === 0 ? 0 : headings[index - 1].level;
        return heading.level - previousLevel > 1;
      });

      expect(levelOnes).toHaveLength(1);
      expect(skips).toEqual([]);
    });
  }
});
