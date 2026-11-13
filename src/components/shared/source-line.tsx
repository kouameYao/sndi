import type { SourceRef } from "@/types/content";
import { cn } from "@/lib/utils";

interface SourceLineProps {
  sources: readonly SourceRef[];
  className?: string;
}

/** Mention de source en fin de page : d'où provient le contenu présenté. */
export function SourceLine({ sources, className }: SourceLineProps) {
  return (
    <p className={cn("text-small text-muted", className)}>
      {sources.length > 1 ? "Sources : " : "Source : "}
      {sources.map((source, index) => (
        <span key={source.url}>
          {index > 0 ? " ; " : null}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            {source.label}
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </span>
      ))}
    </p>
  );
}
