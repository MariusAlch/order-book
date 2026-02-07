import type { MarketSymbol } from "types/orderbook";

export function toApiSymbol(symbol: MarketSymbol): string {
  return symbol.replace("/", "");
}

export function parseMarketSymbol(symbol: MarketSymbol): {
  base: string;
  quote: string;
} {
  const [base, quote] = symbol.split("/");
  return { base, quote };
}
