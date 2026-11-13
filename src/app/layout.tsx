import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ProposalNotice } from "@/components/layout/proposal-notice";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Proposition indépendante : l'indexation est désactivée par défaut pour ne
 * jamais concurrencer le site officiel dans les moteurs de recherche.
 */
const isIndexingAllowed = process.env.ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  title: {
    default: `${SITE.shortName} — Proposition de refonte du site institutionnel`,
    template: `%s — ${SITE.shortName} (proposition de refonte)`,
  },
  description: SITE.description,
  applicationName: `${SITE.shortName} — proposition de refonte`,
  robots: { index: isIndexingAllowed, follow: isIndexingAllowed },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only bg-foreground px-5 py-3 font-semibold text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Aller au contenu
        </a>
        <ProposalNotice />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
