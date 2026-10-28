export function parsePrice(price: string): number {
  const normalized = price.replace(/[^\d,.-]/g, "").replace(",", ".");
  return parseFloat(normalized) || 0;
}

export function formatPrice(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} €`;
}
