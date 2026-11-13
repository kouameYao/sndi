import { ContactCta } from "@/components/shared/contact-cta";
import { ExpertisesSection } from "@/features/home/components/expertises-section";
import { Hero } from "@/features/home/components/hero";
import { MissionSection } from "@/features/home/components/mission-section";
import { NewsSection } from "@/features/home/components/news-section";
import { SolutionsSection } from "@/features/home/components/solutions-section";

export default function HomePage() {
  return (
    <main id="contenu">
      <Hero />
      <MissionSection />
      <ExpertisesSection />
      <SolutionsSection />
      <NewsSection />
      <ContactCta />
    </main>
  );
}
