"use client";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: unknown;
  retry: () => void;
}

/**
 * Limite d'erreur de route. Le détail technique n'est jamais affiché au
 * visiteur ; il reste disponible dans les journaux du serveur.
 */
export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <main id="contenu">
      <div className="container-page section-y" role="alert">
        <h1 className="max-w-2xl text-h1 font-semibold">
          Cette page n’a pas pu s’afficher
        </h1>
        <p className="mt-4 max-w-xl text-lead text-muted">
          Un incident technique est survenu. Vous pouvez réessayer ; si le
          problème persiste, revenez un peu plus tard.
        </p>
        <Button size="lg" className="mt-8" onClick={() => retry()}>
          Réessayer
        </Button>
      </div>
    </main>
  );
}
