import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProseProps {
  children: ReactNode;
  className?: string;
}

/** Mise en forme des contenus rédactionnels longs (pages légales). */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        "[&_h2]:mt-10 [&_h2]:text-h3 [&_h2]:font-semibold [&_h2:first-child]:mt-0",
        "[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5",
        "[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold",
        className,
      )}
    >
      {children}
    </div>
  );
}
