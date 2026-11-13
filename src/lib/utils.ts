import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne des classes conditionnelles en résolvant les conflits Tailwind. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const MONTH_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  month: "short",
  timeZone: "UTC",
});

export interface DateParts {
  iso: string;
  full: string;
  day: string;
  month: string;
  year: string;
}

/** Décompose une date ISO (AAAA-MM-JJ) pour l'affichage, sans dépendre du fuseau. */
export function formatDateParts(iso: string): DateParts {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Date invalide : « ${iso} »`);
  }
  return {
    iso,
    full: DATE_FORMATTER.format(date),
    day: String(date.getUTCDate()).padStart(2, "0"),
    month: MONTH_FORMATTER.format(date).replace(".", ""),
    year: String(date.getUTCFullYear()),
  };
}

/** Numérote un élément de liste sur deux chiffres : 0 → « 01 ». */
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}
