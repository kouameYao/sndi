"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Indique si une requête média CSS est satisfaite, et se met à jour quand
 * elle change. Côté serveur et à l'hydratation, la valeur est `false`.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
