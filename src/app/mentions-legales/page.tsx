import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/shared/prose";
import { LEGACY_SITE_URL, OFFICIAL_SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Nature du projet, propriété intellectuelle et informations d’édition de cette proposition de refonte.",
};

export default function LegalNoticePage() {
  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Mentions légales" },
        ]}
        title="Mentions légales"
        lead="Ce site est une proposition indépendante de refonte. Il n’est ni édité, ni validé, ni hébergé par la SNDI."
      />

      <div className="container-page section-y">
        <Prose>
          <h2>Nature du projet</h2>
          <p>
            Cette maquette est une initiative spontanée, réalisée sans mandat de
            la Société Nationale de Développement Informatique (SNDI). Elle a
            pour seul objet d’illustrer une piste de modernisation de sa
            présence en ligne.
          </p>
          <p>
            Les sites officiels de la SNDI sont accessibles aux adresses{" "}
            <a href={OFFICIAL_SITE_URL}>web.sndi.ci</a> et{" "}
            <a href={LEGACY_SITE_URL}>www.sndi.ci</a>.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            Le logo, la dénomination «&nbsp;SNDI&nbsp;», les noms de solutions
            et les contenus institutionnels cités appartiennent à la SNDI ou à
            leurs titulaires respectifs. Ils sont reproduits à des fins de
            démonstration uniquement ; leur accès public ne vaut pas
            autorisation de réutilisation.
          </p>
          <p>
            Toute diffusion publique de cette proposition suppose l’accord
            préalable de la SNDI.
          </p>

          <h2>Contenus</h2>
          <p>
            Les informations présentées proviennent des pages publiques de la
            SNDI, consultées le 12 novembre 2026. Elles peuvent ne plus être à
            jour et doivent être validées par la SNDI avant toute publication.
          </p>

          <h2>Éditeur et hébergeur</h2>
          <p>
            Identité de l’auteur de la proposition et de l’hébergeur : à
            compléter avant toute mise en ligne.
          </p>
        </Prose>
      </div>
    </main>
  );
}
