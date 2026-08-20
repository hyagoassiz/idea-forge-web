import { removeSpaces } from "@/lib/strings/removeSpaces";

export function normalizeEmail(valor: string): string {
  return removeSpaces(valor).toLowerCase();
}
