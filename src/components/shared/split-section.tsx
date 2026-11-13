import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SplitSectionProps {
  /** Identifiant du titre, relié à la section par `aria-labelledby`. */
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}

/**
 * Section en deux colonnes : titre de niveau 2 à gauche, contenu à droite.
 * Sur mobile, le titre passe au-dessus du contenu. La section monte en fondu
 * lorsqu'elle entre à l'écran.
 */
export function SplitSection({
  id,
  title,
  className,
  children,
}: SplitSectionProps) {
  return (
    <Reveal
      as="section"
      aria-labelledby={id}
      className={cn(
        "grid-page gap-y-5 border-t border-border py-10 first:border-t-0 first:pt-0 md:py-12",
        className,
      )}
    >
      <h2 id={id} className="col-span-full text-h2 font-semibold lg:col-span-4">
        {title}
      </h2>
      <div className="col-span-full lg:col-span-8">{children}</div>
    </Reveal>
  );
}
