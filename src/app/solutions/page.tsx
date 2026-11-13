import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/shared/contact-cta";
import { SourceLine } from "@/components/shared/source-line";
import { TextLink } from "@/components/shared/text-link";
import { SolutionCard } from "@/features/solutions/components/solution-card";
import { getSolutions } from "@/features/solutions/solution-repository";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "SIGFiP, SIGMAP, SIGFAE, RICI-EPN : les solutions de gestion publique de la SNDI.",
};

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Solutions" }]}
        title="Nos solutions"
        lead="Finances publiques, marchés publics, ressources humaines de l’État et comptabilité des établissements publics : les systèmes d’information de la SNDI."
      />

      <section aria-labelledby="solutions-list-title" className="section-y">
        <div className="container-page">
          <h2 id="solutions-list-title" className="sr-only">
            Liste des solutions
          </h2>
          <ul className="border-b border-border">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <SolutionCard solution={solution} />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-2">
            <TextLink href="/realisations">
              Voir toutes les réalisations
            </TextLink>
            <SourceLine
              sources={[
                {
                  label: "Nos produits, www.sndi.ci",
                  url: "https://www.sndi.ci/index.php/nos-produits.html",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
