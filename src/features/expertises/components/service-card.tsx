import Link from "next/link";
import type { Expertise } from "@/types/content";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  expertise: Expertise;
  /** Niveau du titre selon le contexte de la page. */
  headingLevel?: "h2" | "h3";
  className?: string;
}

/**
 * Carte d'expertise : un titre, une phrase. Toute la carte est cliquable
 * grâce au lien étiré du titre — une seule cible pour le clavier et les
 * lecteurs d'écran.
 */
export function ServiceCard({
  expertise,
  headingLevel: Heading = "h3",
  className,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col border border-border bg-surface p-6 transition-colors duration-150 md:p-7",
        "hover:bg-surface-muted",
        "has-[a:focus-visible]:z-10 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring",
        className,
      )}
    >
      <Heading className="text-h3 font-semibold">
        <Link
          href={`/expertises/${expertise.slug}`}
          className="underline-offset-4 outline-none group-hover/card:underline after:absolute after:inset-0"
        >
          {expertise.title}
        </Link>
      </Heading>
      <p className="mt-2 text-muted">{expertise.summary}</p>
    </article>
  );
}

interface ServiceCardGridProps {
  expertises: readonly Expertise[];
  headingLevel?: "h2" | "h3";
}

/** Grille de cartes à filets communs, sur une, deux ou trois colonnes. */
export function ServiceCardGrid({
  expertises,
  headingLevel,
}: ServiceCardGridProps) {
  return (
    <ul className="grid pt-px pl-px md:grid-cols-2 lg:grid-cols-3">
      {expertises.map((expertise) => (
        <li key={expertise.slug} className="-mt-px -ml-px">
          <ServiceCard expertise={expertise} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
