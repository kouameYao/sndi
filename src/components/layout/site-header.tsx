import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  getFeaturedExpertises,
  getSecondaryExpertises,
} from "@/features/expertises/expertise-repository";
import { CONTACT_NAV, MAIN_NAV, SITE } from "@/lib/site-config";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import type { NavigationData } from "./navigation-types";

const EXPERTISES_HREF = "/expertises";

async function getNavigationData(): Promise<NavigationData> {
  const [featured, secondary] = await Promise.all([
    getFeaturedExpertises(),
    getSecondaryExpertises(),
  ]);

  return {
    items: MAIN_NAV,
    megaMenuHref: EXPERTISES_HREF,
    featured: featured.map((expertise) => ({
      href: `${EXPERTISES_HREF}/${expertise.slug}`,
      title: expertise.title,
      summary: expertise.summary,
    })),
    secondary: secondary.map((expertise) => ({
      href: `${EXPERTISES_HREF}/${expertise.slug}`,
      label: expertise.title,
    })),
  };
}

/**
 * En-tête collant. Composant serveur : seules les deux navigations
 * (méga-menu et menu mobile) sont hydratées côté client.
 */
export async function SiteHeader() {
  const navigation = await getNavigationData();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container-page flex h-(--header-height) items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${SITE.shortName} — retour à l’accueil`}
          className="shrink-0"
        >
          <Logo isEager className="h-12 xl:h-14" />
        </Link>

        <DesktopNavigation {...navigation} className="hidden lg:flex" />

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={CONTACT_NAV.href}>Nous contacter</Link>
          </Button>
          <MobileNavigation {...navigation} className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
