"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

/** Le bloc se révèle dès qu'il dépasse de cette marge le bas de l'écran. */
const REVEAL_ROOT_MARGIN = "0px 0px -40px 0px";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
/** Nom des images clés de l'apparition, défini dans `styles/motion.css`. */
const REVEAL_ANIMATION_NAME = "fade-up";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section";
  children: ReactNode;
}

/**
 * Apparition sobre au défilement : le bloc monte de 20 px en fondu lorsqu'il
 * entre à l'écran, une seule fois (styles dans `styles/motion.css`).
 *
 * Le rendu serveur ne masque rien. Après hydratation, seuls les blocs encore
 * sous l'écran sont mis en attente : un bloc déjà visible n'est jamais caché,
 * et sans JavaScript tout le contenu reste affiché. La préférence « réduire
 * les animations » désactive l'effet.
 *
 * Next.js conserve les pages précédentes dans le document : masquées, elles
 * nettoient leurs effets ; réaffichées au retour arrière, elles les relancent
 * sans perdre leur état. Un bloc déjà vu n'est donc plus jamais mis en attente,
 * et l'attribut `data-reveal` est retiré dès que l'animation est terminée ou
 * que la page est masquée.
 */
export function Reveal({ as: Tag = "div", children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasBeenSeenRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      hasBeenSeenRef.current ||
      window.matchMedia(REDUCED_MOTION_QUERY).matches
    ) {
      return;
    }

    const isBelowViewport =
      element.getBoundingClientRect().top >= window.innerHeight;
    if (!isBelowViewport) {
      hasBeenSeenRef.current = true;
      return;
    }

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (
        event.target === element &&
        event.animationName === REVEAL_ANIMATION_NAME
      ) {
        delete element.dataset.reveal;
      }
    };

    element.dataset.reveal = "pending";
    element.addEventListener("animationend", handleAnimationEnd);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          hasBeenSeenRef.current = true;
          element.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { rootMargin: REVEAL_ROOT_MARGIN },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.removeEventListener("animationend", handleAnimationEnd);
      delete element.dataset.reveal;
    };
  }, []);

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
}
