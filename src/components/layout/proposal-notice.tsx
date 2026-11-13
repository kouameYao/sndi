import { OFFICIAL_SITE_URL } from "@/lib/site-config";

/**
 * Avis permanent : cette maquette n'est pas le site officiel de la SNDI.
 * Placé en tête de page pour lever toute ambiguïté dès l'arrivée.
 */
export function ProposalNotice() {
  return (
    <aside
      data-surface="inverse"
      aria-label="Avis sur la nature de ce site"
      className="text-small"
    >
      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <p>
          <strong className="font-semibold">
            Proposition indépendante de refonte.
          </strong>{" "}
          Ce site n’est pas le site officiel de la SNDI.
        </p>
        <a
          href={OFFICIAL_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center font-medium underline underline-offset-4 hover:decoration-2"
        >
          Consulter le site officiel
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      </div>
    </aside>
  );
}
