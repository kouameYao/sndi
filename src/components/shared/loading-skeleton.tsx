import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

const ROW_PLACEHOLDERS = ["a", "b", "c", "d"] as const;

/** Squelette de page affiché pendant un chargement de route. */
export function LoadingSkeleton() {
  return (
    <Container className="section-y" role="status" aria-live="polite">
      <span className="sr-only">Chargement de la page…</span>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-12 w-full max-w-2xl" />
      <Skeleton className="mt-4 h-5 w-full max-w-lg" />
      <div className="mt-12 border-t border-border">
        {ROW_PLACEHOLDERS.map((key) => (
          <div key={key} className="border-b border-border py-5">
            <Skeleton className="h-5 w-2/3 max-w-md" />
            <Skeleton className="mt-3 h-4 w-full max-w-xl" />
          </div>
        ))}
      </div>
    </Container>
  );
}
