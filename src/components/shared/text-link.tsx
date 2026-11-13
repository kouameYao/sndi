import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  /** Lien vers un autre site : nouvel onglet, pictogramme, mention lue. */
  isExternal?: boolean;
  className?: string;
}

const LINK_CLASSES =
  "inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2";

/** Lien textuel souligné, interne ou externe. */
export function TextLink({
  href,
  children,
  isExternal = false,
  className,
}: TextLinkProps) {
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(LINK_CLASSES, className)}
      >
        <span>{children}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0"
          strokeWidth={2}
        />
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cn(LINK_CLASSES, className)}>
      {children}
    </Link>
  );
}
