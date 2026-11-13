import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { TextLink } from "@/components/shared/text-link";
import { ContactForm } from "@/features/contact/components/contact-form";
import { getExpertises } from "@/features/expertises/expertise-repository";
import { CONTACT } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Coordonnées de la SNDI et formulaire de contact.",
};

const OTHER_SUBJECT = "Autre demande";

const CONTACT_LINK_CLASSES =
  "inline-flex min-h-11 items-center font-medium underline decoration-1 underline-offset-4 hover:decoration-2";

export default async function ContactPage() {
  const expertises = await getExpertises();
  const subjects = [
    ...expertises.map((expertise) => expertise.title),
    OTHER_SUBJECT,
  ];

  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        title="Nous contacter"
        lead="Une question, un projet, une demande de formation : écrivez-nous ou appelez-nous."
      />

      <div className="container-page grid-page gap-y-12 section-y">
        <section
          aria-labelledby="coordinates-title"
          className="col-span-full lg:col-span-4"
        >
          <h2 id="coordinates-title" className="text-h2 font-semibold">
            Coordonnées
          </h2>

          <dl className="mt-6 border-b border-border">
            <div className="border-t border-border py-4">
              <dt className="text-small text-muted">Adresse</dt>
              <dd className="mt-1">
                <address className="not-italic">
                  {CONTACT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
            <div className="border-t border-border py-4">
              <dt className="text-small text-muted">Téléphone</dt>
              <dd className="flex flex-col">
                {CONTACT.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className={CONTACT_LINK_CLASSES}
                  >
                    {phone.label}
                  </a>
                ))}
              </dd>
            </div>
            <div className="border-t border-border py-4">
              <dt className="text-small text-muted">Courriel</dt>
              <dd>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={CONTACT_LINK_CLASSES}
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div className="border-t border-border py-4">
              <dt className="text-small text-muted">Réseaux sociaux</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5">
                  {CONTACT.socials.map((social) => (
                    <li key={social.url}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={CONTACT_LINK_CLASSES}
                      >
                        {social.label}
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <TextLink href={CONTACT.orderUrl} isExternal className="mt-4">
            Commander une prestation
          </TextLink>
        </section>

        <div className="col-span-full lg:col-span-7 lg:col-start-6">
          <ContactForm recipient={CONTACT.email} subjects={subjects} />
        </div>
      </div>
    </main>
  );
}
