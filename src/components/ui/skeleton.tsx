import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Bloc de substitution affiché pendant un chargement. */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse-soft bg-surface-muted", className)}
      {...props}
    />
  );
}
