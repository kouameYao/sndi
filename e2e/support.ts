/** Pages représentatives : chaque gabarit et chaque niveau de contenu. */
export const ROUTES = [
  "/",
  "/institution",
  "/expertises",
  "/expertises/etudes-et-conseils",
  "/expertises/cybersecurite",
  "/expertises/big-data",
  "/solutions",
  "/solutions/sigfip",
  "/solutions/sigmap",
  "/realisations",
  "/actualites",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
] as const;

/** Largeurs de contrôle demandées par le cahier des charges. */
export const VIEWPORT_WIDTHS = [320, 375, 390, 768, 1024, 1440] as const;

export const DESKTOP_VIEWPORT = { width: 1440, height: 900 } as const;
export const MOBILE_VIEWPORT = { width: 390, height: 844 } as const;
