import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  /** Applique la grille de page (4 / 8 / 12 colonnes). */
  hasGrid?: boolean;
} & Omit<ComponentProps<T>, "as">;

/** Conteneur de page : 1280 px de contenu maximum et gouttières fluides. */
export function Container<T extends ElementType = "div">({
  as,
  hasGrid = false,
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn("container-page", hasGrid && "grid-page", className)}
      {...props}
    />
  );
}
