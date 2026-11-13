import { Reveal } from "@/components/shared/reveal";
import { TextLink } from "@/components/shared/text-link";
import { MISSION } from "@/features/institution/data/institution";

/** Mission institutionnelle : un paragraphe, deux repères, aucun chiffre. */
export function MissionSection() {
  return (
    <section
      aria-labelledby="mission-title"
      className="border-b border-border section-y"
    >
      <Reveal className="container-page grid-page gap-y-6">
        <h2
          id="mission-title"
          className="col-span-full text-h2 font-semibold lg:col-span-4"
        >
          Notre mission
        </h2>

        <div className="col-span-full lg:col-span-8">
          <p className="max-w-3xl text-lead">
            {MISSION.statement} {MISSION.role}
          </p>

          <dl className="mt-8 grid gap-x-8 md:grid-cols-2">
            <div className="border-t border-border py-4">
              <dt className="font-semibold">Notre vision</dt>
              <dd className="mt-1 text-muted">{MISSION.vision}</dd>
            </div>
            <div className="border-t border-border py-4">
              <dt className="font-semibold">Nos publics</dt>
              <dd className="mt-1 text-muted">
                Administration publique, structures parapubliques, institutions,
                collectivités territoriales et entreprises.
              </dd>
            </div>
          </dl>

          <TextLink href="/institution" className="mt-4">
            Présentation de l’institution
          </TextLink>
        </div>
      </Reveal>
    </section>
  );
}
