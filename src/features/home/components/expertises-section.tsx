import { Reveal } from "@/components/shared/reveal";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { TextLink } from "@/components/shared/text-link";
import { ServiceCardGrid } from "@/features/expertises/components/service-card";
import {
  getFeaturedExpertises,
  getSecondaryExpertises,
} from "@/features/expertises/expertise-repository";

/** Les six expertises mises en avant, puis les autres prestations en liste. */
export async function ExpertisesSection() {
  const [featured, secondary] = await Promise.all([
    getFeaturedExpertises(),
    getSecondaryExpertises(),
  ]);

  return (
    <section
      aria-labelledby="expertises-title"
      className="border-b border-border section-y"
    >
      <Reveal className="container-page">
        <SectionHeading
          id="expertises-title"
          title="Nos expertises"
          description="Du conseil stratégique à la formation, la SNDI couvre l’ensemble du cycle des projets informatiques."
          action={<TextLink href="/expertises">Toutes les expertises</TextLink>}
        />

        <div className="mt-8 md:mt-10">
          <ServiceCardGrid expertises={featured} />
        </div>

        <div className="mt-8 flex flex-col gap-x-3 gap-y-1 md:flex-row md:flex-wrap md:items-baseline">
          <h3 className="font-semibold">Autres prestations :</h3>
          <ul className="flex flex-col md:flex-row md:flex-wrap md:gap-x-6">
            {secondary.map((expertise) => (
              <li key={expertise.slug}>
                <Link
                  href={`/expertises/${expertise.slug}`}
                  className="inline-flex min-h-11 items-center underline underline-offset-4 hover:decoration-2"
                >
                  {expertise.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
