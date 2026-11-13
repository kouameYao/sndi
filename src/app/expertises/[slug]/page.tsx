import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/shared/contact-cta";
import { OnThisPage } from "@/components/shared/on-this-page";
import { SourceLine } from "@/components/shared/source-line";
import { Button } from "@/components/ui/button";
import {
  DomainsSection,
  FaqSection,
  getExpertiseAnchors,
  PresentationSection,
  ReferencesSection,
  RelatedWorkSection,
  ServicesSection,
} from "@/features/expertises/components/expertise-detail-sections";
import {
  getExpertiseBySlug,
  getExpertises,
} from "@/features/expertises/expertise-repository";

/**
 * Toutes les valeurs de `slug` sont connues et prérendues à la construction.
 * La page lit donc le paramètre d'URL sans frontière Suspense : un squelette
 * de chargement n'apporterait qu'un clignotement sur des pages statiques.
 */
export const instant = false;

export async function generateStaticParams() {
  const expertises = await getExpertises();
  return expertises.map((expertise) => ({ slug: expertise.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/expertises/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const expertise = await getExpertiseBySlug(slug);
  if (!expertise) {
    return { title: "Expertise introuvable" };
  }
  return { title: expertise.title, description: expertise.summary };
}

export default async function ExpertisePage({
  params,
}: PageProps<"/expertises/[slug]">) {
  const { slug } = await params;
  const expertise = await getExpertiseBySlug(slug);
  if (!expertise) {
    notFound();
  }

  const anchors = getExpertiseAnchors(expertise);

  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Expertises", href: "/expertises" },
          { label: expertise.title },
        ]}
        title={expertise.title}
        lead={expertise.intro}
        actions={
          <Button asChild size="lg">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        }
      />

      <div className="container-page grid-page gap-y-10 section-y">
        {anchors.length > 1 ? (
          <aside className="col-span-full hidden lg:col-span-3 lg:block">
            <OnThisPage anchors={anchors} className="sticky top-28" />
          </aside>
        ) : null}

        <div className="col-span-full lg:col-span-9">
          <PresentationSection expertise={expertise} />
          <DomainsSection expertise={expertise} />
          <ServicesSection expertise={expertise} />
          <ReferencesSection expertise={expertise} />
          <RelatedWorkSection expertise={expertise} />
          <FaqSection expertise={expertise} />
          <SourceLine
            sources={expertise.sources}
            className="border-t border-border pt-6"
          />
        </div>
      </div>

      <ContactCta />
    </main>
  );
}
