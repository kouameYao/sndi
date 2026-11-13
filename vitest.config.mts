import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/** Seuil de couverture exigé pour les tests unitaires et de composants. */
const COVERAGE_THRESHOLD = 80;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text-summary", "text"],
      include: ["src/**/*.{ts,tsx}"],
      // Les routes (`src/app`) sont couvertes par les tests de bout en bout.
      exclude: ["src/**/*.test.{ts,tsx}", "src/app/**", "src/types/**"],
      thresholds: {
        statements: COVERAGE_THRESHOLD,
        branches: COVERAGE_THRESHOLD,
        functions: COVERAGE_THRESHOLD,
        lines: COVERAGE_THRESHOLD,
      },
    },
  },
});
