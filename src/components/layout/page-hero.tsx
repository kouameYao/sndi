import type { ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";

interface PageHeroProps {
  breadcrumb: readonly BreadcrumbItem[];
  title: ReactNode;
  lead?: ReactNode;
  /** Actions principales de la page (boutons, liens). */
  actions?: ReactNode;
}

/**
 * En-tête des pages internes : fil d'Ariane, titre de niveau 1 et chapeau.
 *
 * À chaque changement de page, le titre et le chapeau « se posent » : ils sont
 * lisibles dès la première image.
 */
export function PageHero({ breadcrumb, title, lead, actions }: PageHeroProps) {
  return (
    <section data-surface="muted" className="border-b border-border">
      <div className="container-page pt-3 pb-10 md:pb-14">
        <Breadcrumb items={breadcrumb} />
        <h1 className="mt-6 max-w-3xl animate-settle-right text-h1 font-semibold md:mt-8">
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 max-w-2xl animate-settle-up text-lead text-muted [animation-delay:100ms]">
            {lead}
          </p>
        ) : null}
        {actions ? (
          <div className="mt-6 flex animate-settle-up flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:200ms]">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
}
