import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { getFeaturedExpertises } from "@/features/expertises/expertise-repository";
import {
  CONTACT,
  CONTACT_NAV,
  LEGAL_NAV,
  MAIN_NAV,
  OFFICIAL_SITE_URL,
  SITE,
} from "@/lib/site-config";

const FOOTER_LINK_CLASSES =
  "inline-flex min-h-11 items-center underline-offset-4 hover:underline";

interface FooterColumnProps {
  title: string;
  className?: string;
  children: ReactNode;
}

function FooterColumn({ title, className, children }: FooterColumnProps) {
  return (
    <div className={className}>
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export async function SiteFooter() {
  const expertises = await getFeaturedExpertises();
  const navigation = [...MAIN_NAV, CONTACT_NAV];

  return (
    <footer
      data-surface="inverse"
      className="border-t-8 border-primary text-[0.9375rem]"
    >
      <div className="container-page pt-12 pb-8 md:pt-16">
        <div className="grid-page gap-y-10">
          <div className="col-span-full lg:col-span-4">
            {/* Le logo garde son fond clair d'origine : il n'est jamais recoloré. */}
            <span className="inline-flex bg-white px-4 py-3">
              <Logo />
            </span>
            <p className="mt-5 max-w-sm text-muted">
              Société Nationale de Développement Informatique.
              <br />
              {SITE.motto}.
            </p>
          </div>

          <FooterColumn
            title="Navigation"
            className="col-span-2 md:col-span-2 lg:col-start-5"
          >
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={FOOTER_LINK_CLASSES}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn
            title="Prestations"
            className="col-span-2 md:col-span-3"
          >
            <ul>
              {expertises.map((expertise) => (
                <li key={expertise.slug}>
                  <Link
                    href={`/expertises/${expertise.slug}`}
                    className={FOOTER_LINK_CLASSES}
                  >
                    {expertise.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact" className="col-span-full md:col-span-3">
            <address className="not-italic">
              <p className="py-2.5">
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <ul>
                {CONTACT.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className={FOOTER_LINK_CLASSES}>
                      {phone.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className={FOOTER_LINK_CLASSES}
                  >
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </address>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-5 text-small lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-muted">
            © {SITE.proposalYear} — Proposition indépendante, sans lien avec la
            SNDI. Logo, dénominations et contenus cités restent la propriété de
            la SNDI.
          </p>
          <ul className="flex flex-wrap gap-x-6">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={FOOTER_LINK_CLASSES}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={OFFICIAL_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK_CLASSES}
              >
                Site officiel
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
