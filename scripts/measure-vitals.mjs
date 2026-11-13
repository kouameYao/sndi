/**
 * Mesure des Core Web Vitals en conditions mobiles dégradées.
 *
 * Ce script n'est PAS Lighthouse : il relève les métriques brutes du navigateur
 * (PerformanceObserver) sous une émulation proche du profil mobile de
 * Lighthouse — réseau « Slow 4G » et processeur ralenti 4×. Il ne produit pas
 * de score sur 100.
 *
 * Usage : node scripts/measure-vitals.mjs [chemin ...]
 * Prérequis : `pnpm build && pnpm start -p 3100`, Chrome installé.
 */
import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const routes = process.argv.slice(2);
const targets = routes.length > 0 ? routes : ["/"];

const MOBILE_VIEWPORT = { width: 412, height: 823 };
const DEVICE_SCALE_FACTOR = 1.75;
const CPU_SLOWDOWN = 4;
/** Profil « Slow 4G » de Lighthouse : 150 ms de latence, 1,6 Mbit/s descendant. */
const NETWORK = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
};
const LONG_TASK_BUDGET_MS = 50;
const SETTLE_MS = 3000;

const TARGETS = { fcp: 1500, lcp: 2500, tbt: 200, cls: 0.1 };

function verdict(value, target) {
  return value <= target ? "ok" : "AU-DESSUS";
}

const browser = await chromium.launch({ channel: "chrome" });

try {
  for (const route of targets) {
    const context = await browser.newContext({
      viewport: MOBILE_VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      isMobile: true,
      hasTouch: true,
      locale: "fr-FR",
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", NETWORK);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU_SLOWDOWN });

    let transferred = 0;
    let scriptBytes = 0;
    let styleBytes = 0;
    const types = new Map();
    cdp.on("Network.responseReceived", ({ requestId, type }) => {
      types.set(requestId, type);
    });
    cdp.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
      transferred += encodedDataLength;
      const type = types.get(requestId);
      if (type === "Script") scriptBytes += encodedDataLength;
      if (type === "Stylesheet") styleBytes += encodedDataLength;
    });

    await page.addInitScript((budget) => {
      window.__vitals = { lcp: 0, lcpElement: "", cls: 0, tbt: 0 };
      new PerformanceObserver((list) => {
        const entry = list.getEntries().at(-1);
        window.__vitals.lcp = entry.startTime;
        window.__vitals.lcpElement = entry.element
          ? `${entry.element.tagName.toLowerCase()} « ${(entry.element.textContent ?? "").trim().slice(0, 40)} »`
          : "";
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__vitals.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__vitals.tbt += Math.max(0, entry.duration - budget);
        }
      }).observe({ type: "longtask", buffered: true });
    }, LONG_TASK_BUDGET_MS);

    await page.goto(`${BASE_URL}${route}`, { waitUntil: "load" });
    await page.waitForTimeout(SETTLE_MS);

    const vitals = await page.evaluate(() => {
      const paint = performance.getEntriesByName("first-contentful-paint")[0];
      return { ...window.__vitals, fcp: paint ? paint.startTime : 0 };
    });

    const kb = (bytes) => `${(bytes / 1024).toFixed(1)} Ko`;
    console.log(`\n${route}`);
    console.log(
      `  FCP  ${Math.round(vitals.fcp)} ms  (cible < ${TARGETS.fcp}) ${verdict(vitals.fcp, TARGETS.fcp)}`,
    );
    console.log(
      `  LCP  ${Math.round(vitals.lcp)} ms  (cible < ${TARGETS.lcp}) ${verdict(vitals.lcp, TARGETS.lcp)} — ${vitals.lcpElement}`,
    );
    console.log(
      `  TBT  ${Math.round(vitals.tbt)} ms  (cible < ${TARGETS.tbt}) ${verdict(vitals.tbt, TARGETS.tbt)}`,
    );
    console.log(
      `  CLS  ${vitals.cls.toFixed(3)}  (cible < ${TARGETS.cls}) ${verdict(vitals.cls, TARGETS.cls)}`,
    );
    console.log(
      `  Poids transféré  ${kb(transferred)} — JS ${kb(scriptBytes)}, CSS ${kb(styleBytes)}`,
    );

    await context.close();
  }
} finally {
  await browser.close();
}
