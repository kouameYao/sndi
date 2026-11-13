import type { MetadataRoute } from "next";

/**
 * L'exploration reste ouverte : c'est la consigne `noindex` (balise `robots`
 * du layout et en-tête `X-Robots-Tag` de `next.config.ts`) qui tient la
 * proposition hors des moteurs de recherche. Interdire l'exploration
 * empêcherait les robots de lire cette consigne.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
