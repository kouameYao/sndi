/**
 * Diagnostic d'une page : niveaux de titres et éléments qui débordent.
 * Usage : node scripts/inspect-page.mjs <chemin> <largeur>
 */
import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const [route = "/", widthArg = "1440"] = process.argv.slice(2);
const width = Number(widthArg);

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });

  const headings = await page
    .locator("h1, h2, h3, h4, h5, h6")
    .evaluateAll((nodes) =>
      nodes.map(
        (node) => `${node.tagName} ${node.textContent?.trim().slice(0, 50)}`,
      ),
    );
  console.log(`Titres (${route}) :\n  ${headings.join("\n  ")}`);

  const overflowing = await page.evaluate(() => {
    const limit = window.innerWidth;
    return Array.from(document.querySelectorAll("body *"))
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 0 && rect.right > limit + 0.5)
      .slice(0, 12)
      .map(
        ({ element, rect }) =>
          `${element.tagName.toLowerCase()}.${String(element.className).slice(0, 70)} → droite ${Math.round(rect.right)}px`,
      );
  });
  console.log(
    `\nÉléments dépassant ${width}px :\n  ${overflowing.join("\n  ") || "aucun"}`,
  );
} finally {
  await browser.close();
}
