import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  /** Absent pour la page courante, dernier élément du fil. */
  href?: string;
}

interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * Fil d'Ariane : liste ordonnée, page courante signalée par `aria-current`.
 *
 * Le fil tient toujours sur une ligne : la page courante est tronquée si la
 * place manque (son titre complet figure juste en dessous). Un fil qui
 * passerait sur deux lignes au chargement de la police décalerait la page.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d’Ariane" className={className}>
      <ol className="flex min-w-0 items-center gap-x-2 text-small whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.label}
              className={cn(
                "flex items-center gap-x-2",
                isLast ? "min-w-0" : "shrink-0",
              )}
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-muted underline underline-offset-4 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "min-h-11 truncate leading-[2.75rem]",
                    isLast ? "font-medium" : "text-muted",
                  )}
                >
                  {item.label}
                </span>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="text-muted">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
