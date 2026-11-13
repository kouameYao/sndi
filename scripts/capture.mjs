/**
 * Captures d'écran de contrôle visuel.
 *
 * Usage : node scripts/capture.mjs [chemin] [largeurs séparées par des virgules] [dossier]
 * Exemple : node scripts/capture.mjs / 320,768,1440 docs/qa
 *
 * Nécessite le serveur de production (`pnpm build && pnpm start -p 3100`)
 * et le navigateur Chrome installé sur la machine.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const DEFAULT_WIDTHS = [320, 375, 390, 768, 1024, 1440];
const VIEWPORT_HEIGHT = 900;

const [route = "/", widthsArg, outDir = "docs/qa"] = process.argv.slice(2);
const widths = widthsArg ? widthsArg.split(",").map(Number) : DEFAULT_WIDTHS;
const isFullPage = process.env.FULL_PAGE !== "false";
const slug =
  route === "/"
    ? "accueil"
    : route.replace(/^\/|\/$/g, "").replaceAll("/", "-");

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: VIEWPORT_HEIGHT },
      deviceScaleFactor: 1,
      locale: "fr-FR",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });

    // Fait défiler la page pour déclencher les apparitions au défilement.
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(900);

    const file = path.join(outDir, `${slug}-${width}.png`);
    await page.screenshot({ path: file, fullPage: isFullPage });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    process.stdout.write(
      `${file} — débordement horizontal : ${overflow > 0 ? `${overflow}px` : "aucun"}\n`,
    );
    await context.close();
  }
} finally {
  await browser.close();
}
