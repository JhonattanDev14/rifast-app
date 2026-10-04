export function formatNumber(value: number) {
  return new Intl.NumberFormat("es-CO").format(value);
}