import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Normalise l'affichage d'un nom de praticien : première lettre de chaque mot en majuscule, reste en minuscule. */
export function toTitleCase(str: string): string {
  if (!str) return str;
  return str
    .toLowerCase()
    .replace(/(?:^|\s|-)[a-zàâäéèêëîïôùûüç]/g, (c) => c.toUpperCase());
}
