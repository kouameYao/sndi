import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KEY_FACTS } from "@/features/institution/data/institution";
import { SITE } from "@/lib/site-config";

/**
 * Hero de l'accueil : le message, deux actions, et un encart « en bref »
 * aux couleurs du logo. Aucune image : les droits d'usage de photographies
 * institutionnelles ne sont pas établis.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-border">
      <div className="container-page grid-page gap-y-10 py-12 md:py-16 lg:py-20">
        <div className="col-span-full flex flex-col justify-center lg:col-span-7 lg:pr-10">
          <h1
            id="hero-title"
            className="animate-settle-right text-display font-semibold"
          >
            L’expertise numérique au service de la&nbsp;nation
          </h1>
          <p className="mt-6 max-w-xl animate-settle-up text-lead text-muted [animation-delay:100ms]">
            La Société Nationale de Développement Informatique accompagne l’État
            ivoirien dans la modernisation de son administration et conduit des
            projets informatiques structurants du service public.
          </p>
          <div className="mt-8 flex animate-settle-up flex-wrap gap-3 [animation-delay:200ms]">
            <Button asChild size="lg">
              <Link href="/expertises">Découvrir nos expertises</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/institution">Découvrir la SNDI</Link>
            </Button>
          </div>
        </div>

        <aside
          aria-labelledby="hero-brief-title"
          data-surface="inverse"
          className="col-span-full flex animate-settle-in flex-col border-t-[12px] border-primary p-6 [animation-delay:200ms] md:p-8 lg:col-span-5 lg:p-10"
        >
          <h2 id="hero-brief-title" className="text-small font-medium">
            La SNDI en bref
          </h2>
          <p className="mt-4 text-[1.5rem] leading-snug font-semibold md:text-[1.75rem]">
            «&nbsp;{SITE.motto}&nbsp;»
          </p>
          <dl className="mt-auto pt-10">
            {KEY_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 border-t border-border py-3"
              >
                <dt className="text-muted">{fact.label}</dt>
                <dd className="font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
