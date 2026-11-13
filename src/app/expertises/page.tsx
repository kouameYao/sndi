import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/shared/contact-cta";
import { SourceLine } from "@/components/shared/source-line";
import { ServiceCardGrid } from "@/features/expertises/components/service-card";
import { getExpertises } from "@/features/expertises/expertise-repository";

export const metadata: Metadata = {
  title: "Expertises",
  description:
    "Les prestations de la SNDI : études et conseils, développement, réseaux, cybersécurité, cloud, formation.",
};

export default async function ExpertisesPage() {
  const expertises = await getExpertises();

  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Expertises" }]}
        title="Nos expertises"
        lead="De l’élaboration de stratégies à la maintenance des systèmes d’information, les prestations de la SNDI par domaine."
      />

      <section aria-labelledby="catalogue-title" className="section-y">
        <div className="container-page">
          <h2 id="catalogue-title" className="sr-only">
            Tous les domaines d’expertise
          </h2>
          <ServiceCardGrid expertises={expertises} headingLevel="h3" />
          <SourceLine
            className="mt-8"
            sources={[
              {
                label: "Nos prestations, web.sndi.ci",
                url: "https://web.sndi.ci/nos-prestations/",
              },
            ]}
          />
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
