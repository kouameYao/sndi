import type { ReactNode } from "react";

/**
 * Le template est remonté à chaque navigation, y compris entre deux pages du
 * même gabarit (d'une expertise à une autre). Les animations d'entrée de page,
 * écrites en CSS, se rejouent donc à chaque changement de page sans JavaScript.
 */
export default function Template({ children }: { children: ReactNode }) {
  return children;
}
