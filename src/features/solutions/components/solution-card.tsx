import Link from "next/link";
import type { Solution } from "@/types/content";

interface SolutionCardProps {
  solution: Solution;
  /** Niveau du titre selon le contexte de la page. */
  headingLevel?: "h2" | "h3";
}

/**
 * Solution présentée comme une ligne de registre : sigle, dénomination et
 * périmètre, domaine. Toute la ligne mène à la fiche de la solution.
 */
export function SolutionCard({
  solution,
  headingLevel: Heading = "h3",
}: SolutionCardProps) {
  return (
    <article className="group/solution relative grid gap-x-8 gap-y-1 border-t border-border py-5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring md:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[10rem_minmax(0,1fr)_15rem]">
      <Heading className="text-h3 font-semibold">
        <Link
          href={`/solutions/${solution.slug}`}
          className="underline-offset-4 outline-none group-hover/solution:underline after:absolute after:inset-0"
        >
          {solution.acronym}
        </Link>
      </Heading>
      <div>
        {solution.name ? <p className="font-medium">{solution.name}</p> : null}
        <p className="text-muted">{solution.summary}</p>
      </div>
      <p className="text-small text-muted md:col-start-2 lg:col-start-3 lg:text-right">
        {solution.domain}
      </p>
    </article>
  );
}
