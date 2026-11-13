import type { NextConfig } from "next";

/**
 * En-têtes de sécurité statiques. Une CSP à nonce impose un rendu dynamique :
 * elle est volontairement laissée à la mise en production (voir docs/technical.md).
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * Proposition indépendante : tant que `ALLOW_INDEXING` n'est pas activé, chaque
 * réponse demande aux moteurs de recherche de ne pas l'indexer.
 */
const isIndexingAllowed = process.env.ALLOW_INDEXING === "true";
const NO_INDEX_HEADER = { key: "X-Robots-Tag", value: "noindex, nofollow" };

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const headers = isIndexingAllowed
      ? SECURITY_HEADERS
      : [...SECURITY_HEADERS, NO_INDEX_HEADER];
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
