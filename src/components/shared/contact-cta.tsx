import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT, CONTACT_NAV } from "@/lib/site-config";
import { Reveal } from "./reveal";

const [MAIN_PHONE] = CONTACT.phones;

/** Appel à l'action institutionnel, repris en fin de page. */
export function ContactCta() {
  return (
    <section
      data-surface="muted"
      aria-labelledby="contact-cta-title"
      className="border-t border-border"
    >
      <Reveal className="container-page grid-page items-center gap-y-6 py-14 md:py-16">
        <div className="col-span-full lg:col-span-7">
          <h2 id="contact-cta-title" className="text-h2 font-semibold">
            Un projet de transformation numérique&nbsp;?
          </h2>
          <p className="mt-3 max-w-xl text-lead text-muted">
            Étude, développement, infrastructure, sécurité ou formation :
            présentez-nous votre besoin.
          </p>
        </div>
        <div className="col-span-full flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-5 lg:justify-end">
          <Button asChild size="lg">
            <Link href={CONTACT_NAV.href}>Nous contacter</Link>
          </Button>
          <a
            href={MAIN_PHONE.href}
            className="inline-flex min-h-11 items-center font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {MAIN_PHONE.label}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
