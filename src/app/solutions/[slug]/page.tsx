import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/shared/contact-cta";
import { SourceLine } from "@/components/shared/source-line";
import { SplitSection } from "@/components/shared/split-section";
import {
  getSolutionBySlug,
  getSolutions,
} from "@/features/solutions/solution-repository";

/**
 * Toutes les valeurs de `slug` sont connues et prérendues à la construction.
 * La page lit donc le paramètre d'URL sans frontière Suspense : un squelette
 * de chargement n'apporterait qu'un clignotement sur des pages statiques.
 */
export const instant = false;

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) {
    return { title: "Solution introuvable" };
  }
  return { title: solution.acronym, description: solution.summary };
}

export default async function SolutionPage({
  params,
}: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const [solution, solutions] = await Promise.all([
    getSolutionBySlug(slug),
    getSolutions(),
  ]);
  if (!solution) {
    notFound();
  }

  const otherSolutions = solutions.filter((item) => item.slug !== slug);
  const lead = solution.name
    ? `${solution.name}. ${solution.summary}`
    : solution.summary;

  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.acronym },
        ]}
        title={solution.acronym}
        lead={lead}
      />

      <div className="container-page section-y">
        <SplitSection id="scope-title" title="Périmètre fonctionnel">
          <ul className="flex max-w-2xl list-disc flex-col gap-2 pl-5">
            {solution.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SplitSection>

        <SplitSection id="facts-title" title="Repères">
          <dl className="border-b border-border">
            {solution.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-x-8 gap-y-1 border-t border-border py-4 md:grid-cols-[14rem_minmax(0,1fr)]"
              >
                <dt className="text-muted">{fact.label}</dt>
                <dd className="font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <SourceLine sources={[solution.source]} className="mt-5" />
        </SplitSection>

        <SplitSection id="other-solutions-title" title="Autres solutions">
          <ul className="border-b border-border">
            {otherSolutions.map((item) => (
              <li key={item.slug} className="border-t border-border">
                <Link
                  href={`/solutions/${item.slug}`}
                  className="group/other grid min-h-14 items-center gap-x-8 py-3 md:grid-cols-[10rem_minmax(0,1fr)]"
                >
                  <span className="font-semibold underline-offset-4 group-hover/other:underline">
                    {item.acronym}
                  </span>
                  <span className="text-muted">{item.domain}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SplitSection>
      </div>

      <ContactCta />
    </main>
  );
}
