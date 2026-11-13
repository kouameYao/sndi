import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/shared/contact-cta";
import { SourceLine } from "@/components/shared/source-line";
import { SplitSection } from "@/components/shared/split-section";
import { TextLink } from "@/components/shared/text-link";
import {
  AUDIENCES,
  EXPERTISE_DOMAINS,
  INSTITUTION_SOURCES,
  MILESTONES,
  MISSION,
} from "@/features/institution/data/institution";

export const metadata: Metadata = {
  title: "Institution",
  description:
    "Mission, vision et repères historiques de la Société Nationale de Développement Informatique (SNDI).",
};

const BULLET_LIST_CLASSES = "flex list-disc flex-col gap-2 pl-5";

export default function InstitutionPage() {
  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Institution" }]}
        title="L’institution"
        lead="Société d’État créée en 1999, la Société Nationale de Développement Informatique accompagne l’informatisation et la modernisation de l’administration ivoirienne."
      />

      <div className="container-page section-y">
        <SplitSection id="mission-title" title="Mission">
          <p className="max-w-3xl text-lead">
            {MISSION.statement} {MISSION.role}
          </p>
          <dl className="mt-8 grid gap-x-8 md:grid-cols-2">
            <div className="border-t border-border py-4">
              <dt className="font-semibold">Vision</dt>
              <dd className="mt-1 text-muted">{MISSION.vision}</dd>
            </div>
            <div className="border-t border-border py-4">
              <dt className="font-semibold">Engagement</dt>
              <dd className="mt-1 text-muted">{MISSION.commitment}</dd>
            </div>
          </dl>
        </SplitSection>

        <SplitSection id="history-title" title="Repères historiques">
          <ol className="border-b border-border">
            {MILESTONES.map((milestone) => (
              <li
                key={milestone.year}
                className="grid gap-x-8 gap-y-1 border-t border-border py-5 md:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <p className="text-h3 font-semibold tabular-nums">
                  {milestone.year}
                </p>
                <div>
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="mt-1 text-muted">{milestone.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </SplitSection>

        <SplitSection id="domains-title" title="Domaines d’expertise">
          <ul className="grid list-disc gap-x-10 gap-y-2 pl-5 md:grid-cols-2">
            {EXPERTISE_DOMAINS.map((domain) => (
              <li key={domain}>{domain}</li>
            ))}
          </ul>
          <TextLink href="/expertises" className="mt-5">
            Voir les expertises
          </TextLink>
        </SplitSection>

        <SplitSection id="audiences-title" title="Publics accompagnés">
          <ul className={BULLET_LIST_CLASSES}>
            {AUDIENCES.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
        </SplitSection>

        <SourceLine sources={INSTITUTION_SOURCES} className="mt-4" />
      </div>

      <ContactCta />
    </main>
  );
}
