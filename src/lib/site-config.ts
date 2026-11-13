/**
 * Configuration du site. Les coordonnées proviennent de la page Contact du site
 * institutionnel (https://web.sndi.ci/contactez-nous/) et restent à confirmer.
 */

export const OFFICIAL_SITE_URL = "https://web.sndi.ci/";
export const LEGACY_SITE_URL = "https://www.sndi.ci/";

export const SITE = {
  shortName: "SNDI",
  legalName: "Société Nationale de Développement Informatique",
  /** Devise présente dans le logo officiel. */
  motto: "Pour une administration numérique et efficace",
  description:
    "Proposition indépendante de refonte du site de la Société Nationale de Développement Informatique (SNDI), Côte d’Ivoire. Ce site n’est pas le site officiel.",
  /** Millésime figé : aucun appel à l'horloge pendant le prérendu. */
  proposalYear: 2026,
} as const;

export const CONTACT = {
  email: "info@sndi.ci",
  phones: [
    { label: "(+225) 27 20 21 78 63", href: "tel:+2252720217863" },
    { label: "(+225) 27 20 25 33 87", href: "tel:+2252720253387" },
  ],
  addressLines: [
    "Boulevard Angoulvant",
    "Cité Financière, Tour B, 4e étage",
    "Abidjan-Plateau, Côte d’Ivoire",
  ],
  sourceUrl: "https://web.sndi.ci/contactez-nous/",
  orderUrl: "https://web.sndi.ci/commander-une-prestation/",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/sndi" },
    {
      label: "Facebook",
      url: "https://www.facebook.com/SNDI-Soci%C3%A9t%C3%A9-Nationale-de-D%C3%A9veloppement-Informatique-101494672367023",
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/channel/UC18X24RA7ZBmQgvNJE8iasg/featured",
    },
  ],
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: readonly NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Institution", href: "/institution" },
  { label: "Expertises", href: "/expertises" },
  { label: "Solutions", href: "/solutions" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Actualités", href: "/actualites" },
];

export const CONTACT_NAV: NavItem = { label: "Contact", href: "/contact" };

export const LEGAL_NAV: readonly NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];

/** Indique si `href` correspond à la page courante ou à l'une de ses sous-pages. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Valeur d'`aria-current` d'un lien de navigation : `page` pour la page
 * affichée, `true` pour la rubrique qui la contient, rien sinon.
 */
export function getAriaCurrent(
  pathname: string,
  href: string,
): "page" | "true" | undefined {
  if (pathname === href) {
    return "page";
  }
  return isActivePath(pathname, href) ? "true" : undefined;
}
