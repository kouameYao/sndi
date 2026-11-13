import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: ReactNode;
  /** Action proposée pour sortir de l'état vide. */
  action?: ReactNode;
  className?: string;
}

/** État vide : absence de contenu expliquée, avec une issue proposée. */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "border-l-4 border-border-strong bg-surface-muted px-6 py-8 md:px-8",
        className,
      )}
    >
      <h2 className="text-h3 font-semibold">{title}</h2>
      <p className="mt-2 max-w-xl text-muted">{description}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
