import { Reveal } from "@/components/shared/reveal";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/shared/section-heading";
import { TextLink } from "@/components/shared/text-link";
import { NewsCard } from "@/features/news/components/news-card";
import { NEWS_SOURCE_URL } from "@/features/news/data/news";
import { getNews } from "@/features/news/news-repository";

const HOME_NEWS_COUNT = 3;

/** Dernières publications du site institutionnel, datées. */
export async function NewsSection() {
  const news = await getNews(HOME_NEWS_COUNT);

  return (
    <section aria-labelledby="news-title" className="section-y">
      <Reveal className="container-page">
        <SectionHeading
          id="news-title"
          title="Actualités"
          action={<TextLink href="/actualites">Toutes les actualités</TextLink>}
        />

        {news.length > 0 ? (
          <ul className="mt-8 border-b border-border md:mt-10">
            {news.map((item) => (
              <li key={item.id}>
                <NewsCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            className="mt-8"
            title="Aucune actualité pour le moment"
            description="Les publications de la SNDI apparaîtront ici."
            action={
              <TextLink href={NEWS_SOURCE_URL} isExternal>
                Consulter le site institutionnel
              </TextLink>
            }
          />
        )}
      </Reveal>
    </section>
  );
}
