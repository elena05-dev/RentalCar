// lib/format.ts
export function formatMileage(m: number): string {
  // вставляє пробіли як thousands separator та додає " km"
  return new Intl.NumberFormat("ru-RU").format(m) + " km";
}
