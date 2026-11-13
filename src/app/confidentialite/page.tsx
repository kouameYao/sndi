import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/shared/prose";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Cette proposition ne collecte, ne transmet et ne conserve aucune donnée personnelle.",
};

export default function PrivacyPage() {
  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Confidentialité" },
        ]}
        title="Confidentialité"
        lead="Cette proposition ne collecte, ne transmet et ne conserve aucune donnée personnelle."
      />

      <div className="container-page section-y">
        <Prose>
          <h2>Aucune collecte</h2>
          <ul>
            <li>Aucun cookie n’est déposé par ce site.</li>
            <li>Aucun outil de mesure d’audience n’est installé.</li>
            <li>
              Les polices de caractères sont servies depuis ce site : aucune
              requête n’est adressée à un service tiers à l’affichage.
            </li>
          </ul>

          <h2>Formulaire de contact</h2>
          <p>
            Le <Link href="/contact">formulaire de contact</Link> fonctionne
            entièrement dans votre navigateur. Il vérifie les champs, puis
            prépare un message que vous choisissez d’envoyer, ou non, depuis
            votre propre messagerie. Rien n’est transmis à ce site ni
            enregistré.
          </p>

          <h2>Liens externes</h2>
          <p>
            Les liens vers les sites de la SNDI et vers les réseaux sociaux
            ouvrent des services tiers, soumis à leur propre politique de
            confidentialité.
          </p>

          <h2>En cas de mise en production</h2>
          <p>
            Si ce site devait être publié par la SNDI, une politique de
            confidentialité complète devrait être rédigée : responsable du
            traitement, finalités, durées de conservation et modalités
            d’exercice des droits.
          </p>
        </Prose>
      </div>
    </main>
  );
}
