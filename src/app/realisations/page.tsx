import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/shared/contact-cta";
import { SourceLine } from "@/components/shared/source-line";
import { SplitSection } from "@/components/shared/split-section";
import { getRealisationGroups } from "@/features/solutions/solution-repository";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Applications métiers, infrastructures, études et formations réalisées par la SNDI.",
};

export default async function RealisationsPage() {
  const groups = await getRealisationGroups();

  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Réalisations" },
        ]}
        title="Nos réalisations"
        lead="Applications métiers, infrastructures, études et formations menées pour l’administration ivoirienne."
      />

      <div className="container-page section-y">
        {groups.map((group) => (
          <SplitSection
            key={group.category}
            id={`realisations-${group.category}`}
            title={group.label}
          >
            <p className="max-w-2xl text-muted">{group.description}</p>
            <ul className="mt-5 border-b border-border">
              {group.items.map((item) => (
                <li key={item.title} className="border-t border-border">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/item grid min-h-14 items-baseline gap-x-8 gap-y-1 py-3.5 md:grid-cols-[7rem_minmax(0,1fr)_12rem]"
                  >
                    <span className="font-semibold">
                      {item.acronym ?? <span aria-hidden="true">—</span>}
                    </span>
                    <span className="underline-offset-4 group-hover/item:underline">
                      {item.title}
                    </span>
                    <span className="text-small text-muted md:text-right">
                      {item.theme}
                    </span>
                    <span className="sr-only">
                      {" "}
                      (site institutionnel, nouvel onglet)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </SplitSection>
        ))}

        <SourceLine
          className="mt-4"
          sources={[
            {
              label: "Nos réalisations, web.sndi.ci",
              url: "https://web.sndi.ci/nos-realisations/",
            },
          ]}
        />
      </div>

      <ContactCta />
    </main>
  );
}
