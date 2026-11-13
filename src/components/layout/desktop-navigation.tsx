"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getAriaCurrent, isActivePath } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./mega-menu";
import type { NavigationData } from "./navigation-types";

const NAV_LINK_CLASSES = cn(
  "relative inline-flex h-(--header-height) items-center px-3 text-[0.9375rem] font-medium xl:px-4",
  "hover:bg-surface-muted data-[state=open]:bg-surface-muted",
  // Page courante : filet orange au bas de l'en-tête.
  "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary after:opacity-0",
  "data-[current=true]:font-semibold data-[current=true]:after:opacity-100",
);

interface DesktopNavigationProps extends NavigationData {
  className?: string;
}

/** Navigation principale (≥ 1024 px) avec méga-menu sur l'entrée Expertises. */
export function DesktopNavigation({
  items,
  megaMenuHref,
  featured,
  secondary,
  className,
}: DesktopNavigationProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu aria-label="Navigation principale" className={className}>
      <NavigationMenuList>
        {items.map((item) => {
          const isCurrent = isActivePath(pathname, item.href);

          if (item.href === megaMenuHref) {
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger
                  aria-current={isCurrent ? "true" : undefined}
                  data-current={isCurrent}
                  className={NAV_LINK_CLASSES}
                >
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenu
                    currentPath={pathname}
                    overviewHref={megaMenuHref}
                    featured={featured}
                    secondary={secondary}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem
              key={item.href}
              className={item.href === "/" ? "hidden xl:block" : undefined}
            >
              <NavigationMenuLink asChild active={isCurrent}>
                <Link
                  href={item.href}
                  aria-current={getAriaCurrent(pathname, item.href)}
                  data-current={isCurrent}
                  className={NAV_LINK_CLASSES}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
