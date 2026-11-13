import { ArrowUpRight } from "lucide-react";
import { useId } from "react";
import type { NewsItem } from "@/types/content";
import { cn, formatDateParts } from "@/lib/utils";

interface NewsCardProps {
  item: NewsItem;
  /** Niveau du titre selon le contexte de la page. */
  headingLevel?: "h2" | "h3";
  className?: string;
}

/**
 * Actualité présentée comme une ligne de communiqué : date puis titre.
 * Le lien ouvre l'article sur le site institutionnel ; ni texte ni
 * photographie n'en sont repris.
 */
export function NewsCard({
  item,
  headingLevel: Heading = "h3",
  className,
}: NewsCardProps) {
  const date = formatDateParts(item.publishedAt);
  const hintId = useId();

  return (
    <article
      className={cn(
        "group/news relative grid gap-x-8 gap-y-1 border-t border-border py-5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring md:grid-cols-[11rem_minmax(0,1fr)_auto]",
        className,
      )}
    >
      <time
        dateTime={date.iso}
        className="text-small text-muted tabular-nums md:pt-1"
      >
        {date.full}
      </time>

      <Heading className="text-[1.0625rem] leading-snug font-semibold">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby={hintId}
          className="underline-offset-4 outline-none group-hover/news:underline after:absolute after:inset-0"
        >
          {item.title}
        </a>
      </Heading>

      <p
        id={hintId}
        aria-hidden="true"
        className="hidden items-center gap-1 text-small text-muted md:flex"
      >
        web.sndi.ci
        <ArrowUpRight className="size-4" strokeWidth={2} />
        <span className="sr-only"> (nouvel onglet)</span>
      </p>
    </article>
  );
}
