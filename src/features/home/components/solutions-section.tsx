import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TextLink } from "@/components/shared/text-link";
import { SolutionCard } from "@/features/solutions/components/solution-card";
import { getSolutions } from "@/features/solutions/solution-repository";

/** Solutions de gestion publique documentées par la SNDI, en registre. */
export async function SolutionsSection() {
  const solutions = await getSolutions();

  return (
    <section
      data-surface="muted"
      aria-labelledby="solutions-title"
      className="border-b border-border section-y"
    >
      <Reveal className="container-page">
        <SectionHeading
          id="solutions-title"
          title="Nos solutions"
          description="Des systèmes d’information pour la gestion publique : finances, marchés, ressources humaines et comptabilité."
          action={
            <TextLink href="/realisations">Toutes les réalisations</TextLink>
          }
        />

        <ul className="mt-8 border-b border-border md:mt-10">
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <SolutionCard solution={solution} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
