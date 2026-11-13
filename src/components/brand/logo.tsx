import Image from "next/image";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Dimensions intrinsèques du fichier officiel (Logo-SNDI-officiel.png). */
const LOGO_WIDTH = 351;
const LOGO_HEIGHT = 100;

interface LogoProps {
  className?: string;
  /** Logo au-dessus de la ligne de flottaison : chargé sans attente. */
  isEager?: boolean;
}

/**
 * Logo officiel de la SNDI, servi tel quel : ni recadré, ni recoloré,
 * ni recompressé (`unoptimized`). Seule sa taille d'affichage varie.
 */
export function Logo({ className, isEager = false }: LogoProps) {
  return (
    <Image
      src="/brand/logo-sndi.png"
      alt={`${SITE.shortName} — ${SITE.legalName}`}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      unoptimized
      loading={isEager ? "eager" : "lazy"}
      className={cn("h-11 w-auto", className)}
    />
  );
}
