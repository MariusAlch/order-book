import type {
  BinanceDepthUpdateEvent,
  OrderBookEntry,
  AggregationLevel,
  OrderBookSummary,
  BinanceDepthSnapshot,
} from "types/orderbook";
import type { OrderBook } from "types/orderbook";

export function createEmptyBook(): OrderBook {
  return { bids: new Map(), asks: new Map(), lastUpdateId: 0 };
}

function applySideUpdates(
  side: Map<string, string>,
  updates: [string, string][],
): void {
  for (const [price, quantity] of updates) {
    if (quantity === "0" || parseFloat(quantity) === 0) {
      side.delete(price);
    } else {
      side.set(price, quantity);
    }
  }
}

export function applyDepthUpdate(
  book: OrderBook,
  event: BinanceDepthUpdateEvent,
): "ok" | "stale" | "gap" {
  if (event.u <= book.lastUpdateId) return "stale";
  if (event.U > book.lastUpdateId + 1) return "gap";

  applySideUpdates(book.bids, event.b);
  applySideUpdates(book.asks, event.a);
  book.lastUpdateId = event.u;
  return "ok";
}

function aggregateOrders(
  orders: Map<string, string>,
  aggregation: number,
  isAsk: boolean,
): OrderBookEntry[] {
  const buckets = new Map<number, number>();

  for (const [priceStr, quantityString] of orders) {
    const price = parseFloat(priceStr);
    const quantity = parseFloat(quantityString);
    if (quantity === 0) continue;

    const bucket = isAsk
      ? Math.ceil(price / aggregation) * aggregation
      : Math.floor(price / aggregation) * aggregation;

    buckets.set(bucket, (buckets.get(bucket) ?? 0) + quantity);
  }

  const result = Array.from(buckets, ([price, amount]) => ({
    price,
    amount,
    total: 0,
  }));
  result.sort((a, b) => (isAsk ? a.price - b.price : b.price - a.price));

  let cumulative = 0;
  for (const entry of result) {
    cumulative += entry.amount * entry.price;
    entry.total = cumulative;
  }

  return result;
}

function computeRatio(bids: OrderBookEntry[], asks: OrderBookEntry[]) {
  const bidVol = bids.reduce((sum, bid) => sum + bid.amount, 0);
  const askVol = asks.reduce((sum, ask) => sum + ask.amount, 0);
  const total = bidVol + askVol;

  const bidPercentage = total > 0 ? (bidVol / total) * 100 : 50;
  return { bidPercentage, askPercentage: 100 - bidPercentage };
}

export function summarizeOrderBook(
  book: OrderBook,
  aggregation: AggregationLevel,
  prevMidPrice: number,
): OrderBookSummary {
  const aggValue = parseFloat(aggregation);
  const asks = aggregateOrders(book.asks, aggValue, true);
  const bids = aggregateOrders(book.bids, aggValue, false);

  const bestBid = bids[0]?.price ?? 0;
  const bestAsk = asks[0]?.price ?? 0;
  const midPrice = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : 0;
  const direction = midPrice >= prevMidPrice ? "up" : "down";

  return {
    asks: [...asks].reverse(),
    bids,
    mid: { price: midPrice, direction },
    stats: computeRatio(bids, asks),
  };
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function buildBookFromSnapshot(
  snapshot: BinanceDepthSnapshot,
): OrderBook {
  const book = createEmptyBook();
  book.lastUpdateId = snapshot.lastUpdateId;
  for (const [price, quantity] of snapshot.bids) book.bids.set(price, quantity);
  for (const [price, quantity] of snapshot.asks) book.asks.set(price, quantity);
  return book;
}
