import { defineConfig } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Les tests de bout en bout s'exécutent contre le build de production
 * (`pnpm build` au préalable) avec le Chrome installé sur la machine.
 */
export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    channel: "chrome",
    locale: "fr-FR",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `pnpm exec next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
