import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Bouton du design system (primitive de style shadcn/ui) : rectangle franc,
 * sans ornement. Les couleurs passent par les tokens sémantiques et s'adaptent
 * à la surface qui porte le bouton.
 */
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 font-semibold whitespace-nowrap select-none",
    "transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-foreground text-background hover:bg-foreground/85",
        outline:
          "border border-foreground text-foreground hover:bg-foreground hover:text-background",
        ghost:
          "text-foreground underline underline-offset-4 hover:bg-surface-muted",
      },
      size: {
        sm: "h-11 px-5 text-[0.9375rem]",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  /** Rend l'enfant (ex. `<Link>`) avec le style du bouton. */
  asChild?: boolean;
  /** Affiche un indicateur de progression et bloque l'interaction. */
  isLoading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    return (
      <Slot data-slot="button" className={classes} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      data-slot="button"
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 animate-spin"
          strokeWidth={2.25}
        />
      ) : null}
      {children}
    </button>
  );
}
