import type { Metadata } from "next";
import Link from "next/link";
import { TextLink } from "@/components/shared/text-link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main id="contenu">
      <div className="container-page section-y">
        <p className="font-semibold text-muted">Erreur 404</p>
        <h1 className="mt-3 max-w-2xl text-h1 font-semibold">
          Page introuvable
        </h1>
        <p className="mt-4 max-w-xl text-lead text-muted">
          La page demandée n’existe pas ou a été déplacée. Vérifiez l’adresse
          saisie, ou repartez de l’accueil.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button asChild size="lg">
            <Link href="/">Retour à l’accueil</Link>
          </Button>
          <TextLink href="/expertises">Voir les expertises</TextLink>
        </div>
      </div>
    </main>
  );
}
