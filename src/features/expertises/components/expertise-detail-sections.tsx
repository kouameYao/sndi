import Link from "next/link";
import { DetailSection } from "@/components/shared/detail-section";
import type { PageAnchor } from "@/components/shared/on-this-page";
import type { Expertise } from "@/types/content";
import { ExpertiseFaq } from "./expertise-faq";

const BULLET_LIST_CLASSES = "flex list-disc flex-col gap-2 pl-5";

/** Ancres du sommaire, dans l'ordre d'affichage des sections présentes. */
export function getExpertiseAnchors(expertise: Expertise): PageAnchor[] {
  const { detail } = expertise;
  const anchors: (PageAnchor | null)[] = [
    { id: "presentation", label: "Présentation" },
    detail ? { id: "domaines", label: "Domaines d’intervention" } : null,
    expertise.services.length > 0
      ? { id: "prestations", label: "Prestations" }
      : null,
    detail || expertise.references.length > 0
      ? { id: "references", label: "Référentiels et technologies" }
      : null,
    detail ? { id: "realisations", label: "Réalisations" } : null,
    detail ? { id: "questions", label: "Questions fréquentes" } : null,
  ];
  return anchors.filter((anchor): anchor is PageAnchor => anchor !== null);
}

interface SectionProps {
  expertise: Expertise;
}

export function PresentationSection({ expertise }: SectionProps) {
  const paragraphs = expertise.detail?.presentation ?? [expertise.intro];

  return (
    <DetailSection id="presentation" title="Présentation">
      <div className="flex max-w-2xl flex-col gap-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {expertise.depth === "definition" ? (
          <p>
            Pour un projet dans ce domaine,{" "}
            <Link
              href="/contact"
              className="font-semibold underline underline-offset-4 hover:decoration-2"
            >
              contactez la SNDI
            </Link>
            .
          </p>
        ) : null}
      </div>

      {expertise.strengths.length > 0 ? (
        <div className="mt-8 max-w-2xl">
          <h3 className="text-h3 font-semibold">Nos atouts</h3>
          <ul className={`mt-3 ${BULLET_LIST_CLASSES}`}>
            {expertise.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </DetailSection>
  );
}

export function DomainsSection({ expertise }: SectionProps) {
  const domains = expertise.detail?.domains;
  if (!domains) {
    return null;
  }

  return (
    <DetailSection id="domaines" title="Domaines d’intervention">
      <ul className="grid gap-x-8 md:grid-cols-3">
        {domains.map((domain) => (
          <li key={domain.name} className="border-t-2 border-foreground py-4">
            <h3 className="text-h3 font-semibold">{domain.name}</h3>
            <p className="mt-2 text-muted">{domain.description}</p>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

export function ServicesSection({ expertise }: SectionProps) {
  if (expertise.services.length === 0) {
    return null;
  }
  const detailed = expertise.detail?.detailedServices;

  return (
    <DetailSection id="prestations" title="Prestations">
      {detailed ? (
        <ul className="border-b border-border">
          {detailed.map((service) => (
            <li
              key={service.name}
              className="grid gap-x-8 gap-y-2 border-t border-border py-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
              <h3 className="text-h3 font-semibold">{service.name}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={`max-w-2xl ${BULLET_LIST_CLASSES}`}>
          {expertise.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      )}
    </DetailSection>
  );
}

export function ReferencesSection({ expertise }: SectionProps) {
  const frameworks = expertise.detail?.frameworks;
  if (!frameworks && expertise.references.length === 0) {
    return null;
  }

  return (
    <DetailSection id="references" title="Référentiels et technologies">
      {frameworks ? (
        <dl className="border-b border-border">
          {frameworks.map((framework) => (
            <div
              key={framework.name}
              className="grid gap-x-8 gap-y-1 border-t border-border py-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
              <dt className="text-h3 font-semibold">{framework.name}</dt>
              <dd>{framework.description}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="max-w-2xl">{expertise.references.join(", ")}.</p>
      )}
    </DetailSection>
  );
}

export function RelatedWorkSection({ expertise }: SectionProps) {
  const relatedWork = expertise.detail?.relatedWork;
  if (!relatedWork) {
    return null;
  }

  return (
    <DetailSection id="realisations" title="Réalisations">
      <ul className="border-b border-border">
        {relatedWork.map((item) => (
          <li
            key={item.url}
            className="grid gap-x-8 gap-y-1 border-t border-border py-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <p className="text-small text-muted md:pt-0.5">{item.meta}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              {item.title}
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

export function FaqSection({ expertise }: SectionProps) {
  const faq = expertise.detail?.faq;
  if (!faq) {
    return null;
  }

  return (
    <DetailSection id="questions" title="Questions fréquentes">
      <ExpertiseFaq items={faq} />
    </DetailSection>
  );
}
