import type { NavItem } from "@/lib/site-config";

/** Données sérialisables transmises du serveur aux menus (composants client). */
export interface MegaMenuEntry {
  href: string;
  title: string;
  summary: string;
}

export interface NavigationData {
  items: readonly NavItem[];
  /** Entrée de `items` qui ouvre le méga-menu. */
  megaMenuHref: string;
  featured: readonly MegaMenuEntry[];
  secondary: readonly NavItem[];
}
