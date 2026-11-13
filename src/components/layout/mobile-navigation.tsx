"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CONTACT_NAV, getAriaCurrent, isActivePath } from "@/lib/site-config";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import type { NavigationData } from "./navigation-types";

const MENU_BUTTON_CLASSES =
  "inline-flex h-11 items-center gap-2 border border-foreground px-3 text-[0.9375rem] font-semibold hover:bg-foreground hover:text-background";

/** Seuil d'apparition de la navigation de bureau (point de rupture `lg`). */
const DESKTOP_QUERY = "(min-width: 64rem)";

interface MobileNavigationProps extends NavigationData {
  className?: string;
}

/**
 * Menu mobile plein écran (< 1024 px). Radix Dialog gère le piège de focus,
 * la touche Échap et le retour du focus sur le bouton d'ouverture.
 */
export function MobileNavigation({
  items,
  megaMenuHref,
  featured,
  secondary,
  className,
}: MobileNavigationProps) {
  const subItems = [
    ...featured.map((entry) => ({ href: entry.href, label: entry.title })),
    ...secondary,
  ];
  const pathname = usePathname();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  // Le menu est « ouvert sur une page » : tout changement de route (lien,
  // bouton Retour du navigateur) le referme sans effet de bord.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const isOpen = openPath === pathname && !isDesktop;
  const handleOpenChange = (open: boolean) =>
    setOpenPath(open ? pathname : null);
  const handleNavigate = () => setOpenPath(null);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger className={cn(MENU_BUTTON_CLASSES, className)}>
        <Menu aria-hidden="true" className="size-5" strokeWidth={2} />
        Menu
      </SheetTrigger>

      <SheetContent aria-describedby={undefined}>
        <div className="container-page flex h-(--header-height) shrink-0 items-center justify-between border-b border-border">
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          <SheetClose className={MENU_BUTTON_CLASSES}>
            <X aria-hidden="true" className="size-5" strokeWidth={2} />
            Fermer
          </SheetClose>
        </div>

        <nav aria-label="Navigation mobile" className="container-page flex-1">
          <ul>
            {items.map((item) => {
              const isCurrent = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={handleNavigate}
                    aria-current={getAriaCurrent(pathname, item.href)}
                    className={cn(
                      "flex min-h-14 items-center border-l-4 pl-3 text-lg font-semibold",
                      isCurrent ? "border-primary" : "border-transparent",
                    )}
                  >
                    {item.label}
                  </Link>

                  {item.href === megaMenuHref ? (
                    <ul className="pb-3 pl-4">
                      {subItems.map((subItem) => {
                        const isShown = pathname === subItem.href;
                        return (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              onClick={handleNavigate}
                              aria-current={isShown ? "page" : undefined}
                              className={cn(
                                "flex min-h-11 items-center border-l-4 pl-3 hover:underline",
                                isShown
                                  ? "border-primary font-semibold"
                                  : "border-transparent text-muted hover:text-foreground",
                              )}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="container-page shrink-0 py-6">
          <Button asChild size="lg" className="w-full">
            <Link href={CONTACT_NAV.href} onClick={handleNavigate}>
              Nous contacter
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
