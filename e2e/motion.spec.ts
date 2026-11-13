import { expect, test, type Page } from "@playwright/test";
import { DESKTOP_VIEWPORT } from "./support";

const SCROLL_STEP = 300;
const SCROLL_PAUSE_MS = 60;
/** Positions intermédiaires à partir desquelles le défilement est jugé progressif. */
const MIN_SMOOTH_SCROLL_STEPS = 5;
/** Distance minimale à remonter pour que le nombre de positions soit significatif. */
const MIN_SCROLL_DISTANCE = 500;

interface ScrollRecord {
  /** Positions relevées à chaque événement de défilement. */
  positions: number[];
  /** Position de la fenêtre à l'instant où la nouvelle page s'affiche. */
  atPageChange: number | null;
  /** Opacité du titre de la nouvelle page à ce même instant. */
  titleOpacityAtPageChange: number | null;
}

type RecordingWindow = Window & {
  scrollRecord?: ScrollRecord;
  /** Nombre de blocs (re)marqués `data-reveal` depuis l'installation du relevé. */
  revealMarkCount?: number;
};

function mainNavigation(page: Page) {
  return page.getByRole("navigation", { name: "Navigation principale" });
}

async function scrollThroughPage(page: Page) {
  await page.evaluate(
    async ({ step, pause }) => {
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((resolve) => setTimeout(resolve, pause));
      }
    },
    { step: SCROLL_STEP, pause: SCROLL_PAUSE_MS },
  );
}

function footerLink(page: Page, name: string) {
  return page.getByRole("contentinfo").getByRole("link", { name, exact: true });
}

async function scrollToBottom(page: Page) {
  await page.evaluate(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    });
  });
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
}

/**
 * Relève les positions de défilement, ainsi que celle de la fenêtre au moment
 * où le titre affiché change, c'est-à-dire où la nouvelle page remplace
 * l'ancienne. Le document n'étant pas rechargé, le relevé survit à la
 * navigation.
 */
async function recordScroll(page: Page) {
  await page.evaluate(() => {
    const findVisibleTitle = () =>
      [...document.querySelectorAll("h1")].find(
        (heading) => heading.getClientRects().length > 0,
      );

    const record: ScrollRecord = {
      positions: [],
      atPageChange: null,
      titleOpacityAtPageChange: null,
    };
    const initialTitle = findVisibleTitle()?.textContent;

    window.addEventListener("scroll", () => {
      record.positions.push(window.scrollY);
    });
    new MutationObserver(() => {
      const title = findVisibleTitle();
      if (
        record.atPageChange === null &&
        title &&
        title.textContent !== initialTitle
      ) {
        record.atPageChange = window.scrollY;
        record.titleOpacityAtPageChange = Number(
          getComputedStyle(title).opacity,
        );
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    (window as RecordingWindow).scrollRecord = record;
  });
}

async function readScrollRecord(page: Page): Promise<ScrollRecord> {
  return page.evaluate(() => {
    const record = (window as RecordingWindow).scrollRecord;
    if (!record) {
      throw new Error("Le relevé de défilement n’a pas été installé.");
    }
    return record;
  });
}

test.describe("changement de page", () => {
  test.use({ viewport: DESKTOP_VIEWPORT });

  test("la nouvelle page remplace l’ancienne sans rechargement du document", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.dataset.sameDocument = "true";
    });

    await mainNavigation(page)
      .getByRole("link", { name: "Institution" })
      .click();

    await expect(
      page.getByRole("heading", { level: 1, name: "L’institution" }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute(
      "data-same-document",
      "true",
    );
  });

  test("le titre de la nouvelle page se pose, lisible dès la première image", async ({
    page,
  }) => {
    await page.goto("/");

    await mainNavigation(page).getByRole("link", { name: "Solutions" }).click();

    const title = page.getByRole("heading", {
      level: 1,
      name: "Nos solutions",
    });
    await expect(title).toHaveCSS("animation-name", "settle-right");
    const opacity = await title.evaluate((element) =>
      Number(getComputedStyle(element).opacity),
    );
    expect(opacity).toBeGreaterThanOrEqual(0.6);
  });

  test("l’entrée de page se rejoue entre deux pages du même gabarit", async ({
    page,
  }) => {
    await page.goto("/expertises/cybersecurite");
    await page.getByRole("heading", { level: 1 }).evaluate((element) => {
      element.setAttribute("data-previous-page", "true");
    });

    const nav = mainNavigation(page);
    await nav.getByRole("button", { name: "Expertises" }).focus();
    await page.keyboard.press("Enter");
    await nav.getByRole("link", { name: "Infogérance" }).click();

    const title = page.getByRole("heading", { level: 1, name: "Infogérance" });
    await expect(title).toBeVisible();
    // Le titre est un nouvel élément : son animation d'entrée repart de zéro.
    await expect(title).not.toHaveAttribute("data-previous-page");
    await expect(title).toHaveCSS("animation-name", "settle-right");
  });

  test("depuis le bas d’une page, la nouvelle page arrive en bas puis remonte en douceur", async ({
    page,
  }) => {
    await page.goto("/");
    await scrollToBottom(page);
    await recordScroll(page);

    await footerLink(page, "Institution").click();

    await expect(
      page.getByRole("heading", { level: 1, name: "L’institution" }),
    ).toBeAttached();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

    const { positions, atPageChange, titleOpacityAtPageChange } =
      await readScrollRecord(page);
    // La nouvelle page s'affiche là où l'on se trouvait, pas en haut…
    expect(atPageChange).toBeGreaterThanOrEqual(MIN_SCROLL_DISTANCE);
    // … et son animation d'entrée commence au même instant.
    expect(titleOpacityAtPageChange).toBeLessThan(1);
    // La fenêtre passe ensuite par des positions intermédiaires : elle ne saute pas.
    const intermediatePositions = new Set(
      positions.filter(
        (position) => position > 0 && position < (atPageChange ?? 0),
      ),
    );
    expect(intermediatePositions.size).toBeGreaterThanOrEqual(
      MIN_SMOOTH_SCROLL_STEPS,
    );
  });
});

test.describe("changement de page — animations réduites", () => {
  test.use({ viewport: DESKTOP_VIEWPORT, reducedMotion: "reduce" });

  test("depuis le bas d’une page, la nouvelle page s’affiche directement en haut", async ({
    page,
  }) => {
    await page.goto("/");
    await scrollToBottom(page);
    await recordScroll(page);

    await footerLink(page, "Institution").click();

    await expect(
      page.getByRole("heading", { level: 1, name: "L’institution" }),
    ).toBeInViewport();
    const { atPageChange } = await readScrollRecord(page);
    expect(atPageChange).toBe(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
});

test.describe("apparition au défilement", () => {
  test.use({ viewport: DESKTOP_VIEWPORT });

  test("les blocs sous l’écran attendent, puis montent en fondu une seule fois", async ({
    page,
  }) => {
    await page.goto("/");

    const pending = page.locator('[data-reveal="pending"]');
    await expect(pending.first()).toBeAttached();
    // Le haut de page n'est jamais mis en attente.
    await expect(
      page.locator("main > section").first().locator("[data-reveal]"),
    ).toHaveCount(0);

    // Le premier bloc en attente entre à l'écran : il monte en fondu.
    const firstBlock = page.locator("[data-reveal]").first();
    await firstBlock.scrollIntoViewIfNeeded();
    await expect(firstBlock).toHaveCSS("animation-name", "fade-up");

    await scrollThroughPage(page);

    // Une fois l'animation jouée, plus aucun bloc n'est en attente ni marqué.
    await expect(page.locator("[data-reveal]")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { level: 2, name: "Actualités" }),
    ).toHaveCSS("opacity", "1");
  });

  test("au retour arrière, les blocs déjà révélés ne sont pas remasqués", async ({
    page,
  }) => {
    await page.goto("/");
    await scrollThroughPage(page);
    await expect(page.locator("[data-reveal]")).toHaveCount(0);
    const positionBeforeLeaving = await page.evaluate(() => window.scrollY);

    await footerLink(page, "Institution").click();
    await expect(
      page.getByRole("heading", { level: 1, name: "L’institution" }),
    ).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await page.evaluate(() => {
      const recordingWindow = window as RecordingWindow;
      recordingWindow.revealMarkCount = 0;
      new MutationObserver((records) => {
        const marked = records.filter(
          (record) =>
            record.target instanceof HTMLElement &&
            record.target.hasAttribute("data-reveal"),
        );
        recordingWindow.revealMarkCount =
          (recordingWindow.revealMarkCount ?? 0) + marked.length;
      }).observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ["data-reveal"],
      });
    });

    await page.goBack();

    // L'accueil revient à l'endroit où il avait été quitté…
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBe(positionBeforeLeaving);
    // … sans qu'aucun de ses blocs repasse par l'attente ou le fondu.
    expect(
      await page.evaluate(() => (window as RecordingWindow).revealMarkCount),
    ).toBe(0);
    await expect(page.locator("[data-reveal]")).toHaveCount(0);
  });

  test("un lien d’ancre révèle la section visée", async ({ page }) => {
    await page.goto("/expertises/etudes-et-conseils");

    await page
      .getByRole("navigation", { name: "Sur cette page" })
      .getByRole("link", { name: "Questions fréquentes" })
      .click();

    const section = page.locator("#questions");
    await expect(section).toBeInViewport();
    await expect(section).toHaveCSS("opacity", "1");
  });
});

test.describe("apparition au défilement — animations réduites", () => {
  test.use({ viewport: DESKTOP_VIEWPORT, reducedMotion: "reduce" });

  test("rien n’est masqué ni animé", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 2, name: "Actualités" }),
    ).toBeVisible();
    await expect(page.locator("[data-reveal]")).toHaveCount(0);
  });
});

test.describe("apparition au défilement — sans JavaScript", () => {
  test.use({ viewport: DESKTOP_VIEWPORT, javaScriptEnabled: false });

  test("tout le contenu reste visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-reveal]")).toHaveCount(0);
    const news = page.getByRole("heading", { level: 2, name: "Actualités" });
    await expect(news).toBeVisible();
    await expect(news).toHaveCSS("opacity", "1");
  });
});
