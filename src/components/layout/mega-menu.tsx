"use client";

import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import type { NavItem } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { MegaMenuEntry } from "./navigation-types";

interface MegaMenuProps {
  /** Chemin de la page affichée : son entrée est marquée dans le menu. */
  currentPath: string;
  overviewHref: string;
  featured: readonly MegaMenuEntry[];
  secondary: readonly NavItem[];
}

/**
 * Marqueur de l'entrée active : filet orange à gauche et fond gris, le même
 * code que le filet orange de la rubrique courante dans l'en-tête.
 */
const ACTIVE_MARKER_CLASSES =
  "border-l-4 border-transparent aria-[current=page]:border-primary aria-[current=page]:bg-surface-muted";

const SECONDARY_LINK_CLASSES = cn(
  ACTIVE_MARKER_CLASSES,
  "flex min-h-11 items-center pl-4 underline-offset-4 hover:underline aria-[current=page]:font-semibold",
);

function ariaCurrent(currentPath: string, href: string) {
  return currentPath === href ? "page" : undefined;
}

/** Contenu du méga-menu « Expertises » : six domaines et prestations complémentaires. */
export function MegaMenu({
  currentPath,
  overviewHref,
  featured,
  secondary,
}: MegaMenuProps) {
  return (
    <div className="grid grid-cols-12 gap-x-4 p-6">
      <ul className="col-span-9 grid grid-cols-3 gap-x-4 gap-y-2">
        {featured.map((entry) => (
          <li key={entry.href}>
            <NavigationMenuLink asChild>
              <Link
                href={entry.href}
                aria-current={ariaCurrent(currentPath, entry.href)}
                className={cn(
                  ACTIVE_MARKER_CLASSES,
                  "group/entry block py-3 pr-3 pl-4",
                )}
              >
                <span className="block font-semibold underline-offset-4 group-hover/entry:underline">
                  {entry.title}
                </span>
                <span className="mt-1 block text-small text-muted">
                  {entry.summary}
                </span>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>

      <div className="col-span-3 border-l border-border pl-4">
        <p className="py-3 pl-5 font-semibold">Autres prestations</p>
        <ul className="text-small">
          {secondary.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  aria-current={ariaCurrent(currentPath, item.href)}
                  className={SECONDARY_LINK_CLASSES}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
        <NavigationMenuLink asChild>
          <Link
            href={overviewHref}
            aria-current={ariaCurrent(currentPath, overviewHref)}
            className={cn(
              ACTIVE_MARKER_CLASSES,
              "mt-4 flex min-h-11 items-center pl-4 font-semibold underline underline-offset-4 hover:decoration-2",
            )}
          >
            Toutes les expertises
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}
