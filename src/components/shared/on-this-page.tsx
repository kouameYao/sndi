import { cn } from "@/lib/utils";

export interface PageAnchor {
  id: string;
  label: string;
}

interface OnThisPageProps {
  anchors: readonly PageAnchor[];
  className?: string;
}

/** Sommaire latéral d'une page de détail : liens d'ancre vers ses sections. */
export function OnThisPage({ anchors, className }: OnThisPageProps) {
  return (
    <nav aria-label="Sur cette page" className={cn("text-small", className)}>
      <p className="font-semibold">Sur cette page</p>
      <ol className="mt-3 border-l border-border">
        {anchors.map((anchor) => (
          <li key={anchor.id}>
            <a
              href={`#${anchor.id}`}
              className="-ml-px flex min-h-11 items-center border-l-2 border-transparent pl-4 text-muted hover:border-foreground hover:text-foreground"
            >
              {anchor.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
