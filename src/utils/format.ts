import type { AggregationLevel } from "types/orderbook";

function formatCompact(value: number, decimals: number = 2): string {
  const suffixes: [number, string][] = [
    [1e12, "T"],
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  const match = suffixes.find(([threshold]) => value >= threshold);
  if (!match) return value.toFixed(decimals);

  const [divisor, suffix] = match;
  return (value / divisor).toFixed(decimals) + suffix;
}

export function formatTotal(value: number, rounding: boolean): string {
  if (rounding) return formatCompact(value, 2);

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatPrice(
  value: number,
  aggregation: AggregationLevel,
): string {
  const aggValue = parseFloat(aggregation);
  const decimals = aggValue < 1 ? (aggValue === 0.01 ? 2 : 1) : 0;

  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
