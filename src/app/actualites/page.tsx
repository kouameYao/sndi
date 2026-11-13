import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCta } from "@/components/shared/contact-cta";
import { EmptyState } from "@/components/shared/empty-state";
import { SourceLine } from "@/components/shared/source-line";
import { SplitSection } from "@/components/shared/split-section";
import { TextLink } from "@/components/shared/text-link";
import { NewsCard } from "@/features/news/components/news-card";
import { NEWS_SOURCE_URL } from "@/features/news/data/news";
import { getNews, groupNewsByYear } from "@/features/news/news-repository";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Les actualités de la SNDI, classées par année.",
};

export default async function NewsPage() {
  const news = await getNews();
  const years = groupNewsByYear(news);

  return (
    <main id="contenu">
      <PageHero
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
        title="Actualités"
        lead="Événements, projets et formations : les publications de la SNDI, par année."
      />

      <div className="container-page section-y">
        {years.length > 0 ? (
          years.map(({ year, items }) => (
            <SplitSection key={year} id={`actualites-${year}`} title={year}>
              <ul className="border-b border-border">
                {items.map((item) => (
                  <li key={item.id}>
                    <NewsCard item={item} />
                  </li>
                ))}
              </ul>
            </SplitSection>
          ))
        ) : (
          <EmptyState
            title="Aucune actualité pour le moment"
            description="Les publications de la SNDI apparaîtront ici."
            action={
              <TextLink href={NEWS_SOURCE_URL} isExternal>
                Consulter le site institutionnel
              </TextLink>
            }
          />
        )}

        <SourceLine
          className="mt-6"
          sources={[{ label: "Actualités, web.sndi.ci", url: NEWS_SOURCE_URL }]}
        />
      </div>

      <ContactCta />
    </main>
  );
}
