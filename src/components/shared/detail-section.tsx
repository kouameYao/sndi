import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface DetailSectionProps {
  /** Ancre de la section, reprise par le sommaire « Sur cette page ». */
  id: string;
  title: string;
  /** Phrase d'introduction sous le titre. */
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Section d'une page de détail : titre de niveau 2 ancré et contenu. La
 * section monte en fondu lorsqu'elle entre à l'écran.
 */
export function DetailSection({
  id,
  title,
  intro,
  className,
  children,
}: DetailSectionProps) {
  const titleId = `${id}-titre`;

  return (
    <Reveal
      as="section"
      id={id}
      aria-labelledby={titleId}
      className={cn(
        "scroll-mt-28 border-t border-border py-10 first:border-t-0 first:pt-0 md:py-12",
        className,
      )}
    >
      <h2 id={titleId} className="text-h2 font-semibold">
        {title}
      </h2>
      {intro ? <p className="mt-3 max-w-2xl text-muted">{intro}</p> : null}
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}
