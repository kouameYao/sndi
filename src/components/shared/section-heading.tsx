import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Identifiant du titre, à relier à la section par `aria-labelledby`. */
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Lien secondaire aligné à droite du titre (« tout voir »). */
  action?: ReactNode;
  className?: string;
}

/** En-tête de section : titre de niveau 2, description et lien éventuels. */
export function SectionHeading({
  id,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-x-10 gap-y-3 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2 id={id} className="text-h2 font-semibold">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-lead text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
