type ClassValue = string | number | null | undefined | false;

/**
 * Lightweight className combiner (no external dependency needed).
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
