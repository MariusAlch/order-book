import type {
  OrderBookData,
  OrderBookEntry,
  MarketSymbol,
  AggregationLevel,
  BinanceDepthSnapshot,
  BinanceDepthUpdateEvent,
} from "types/orderbook";
import { toApiSymbol } from "utils/orderbook";

const WS_BASE = "wss://stream.binance.com:9443/ws";
const REST_URL = "https://api.binance.com/api/v3/depth";
const RECONNECT_DELAY_MS = 3000;
const MAX_SNAPSHOT_RETRIES = 5;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface LocalOrderBook {
  bids: Map<string, string>;
  asks: Map<string, string>;
  lastUpdateId: number;
}

function createEmptyBook(): LocalOrderBook {
  return { bids: new Map(), asks: new Map(), lastUpdateId: 0 };
}

function applySideUpdates(
  side: Map<string, string>,
  updates: [string, string][],
): void {
  for (const [price, qty] of updates) {
    if (qty === "0" || parseFloat(qty) === 0) {
      side.delete(price);
    } else {
      side.set(price, qty);
    }
  }
}

function applyDepthUpdate(
  book: LocalOrderBook,
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
  entries: Map<string, string>,
  aggregation: number,
  isAsk: boolean,
): OrderBookEntry[] {
  const buckets = new Map<number, number>();

  for (const [priceStr, qtyStr] of entries) {
    const price = parseFloat(priceStr);
    const qty = parseFloat(qtyStr);
    if (qty === 0) continue;

    const bucket = isAsk
      ? Math.ceil(price / aggregation) * aggregation
      : Math.floor(price / aggregation) * aggregation;

    buckets.set(bucket, (buckets.get(bucket) ?? 0) + qty);
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

function projectOrderBookData(
  book: LocalOrderBook,
  aggregation: AggregationLevel,
  prevMidPrice: number,
): OrderBookData {
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

interface OrderBookCallbacks {
  onOrderBookDataPublish: (data: OrderBookData) => void;
}

export class BinanceOrderBook {
  private readonly symbol: MarketSymbol;
  private aggregation: AggregationLevel;
  private readonly callbacks: OrderBookCallbacks;

  private ws: WebSocket | null = null;
  private reconnectTimer: number | null = null;
  private book: LocalOrderBook = createEmptyBook();
  private prevMidPrice = 0;
  private buffer: BinanceDepthUpdateEvent[] | null = [];
  private disposed = false;

  constructor(
    symbol: MarketSymbol,
    aggregation: AggregationLevel,
    callbacks: OrderBookCallbacks,
  ) {
    this.symbol = symbol;
    this.aggregation = aggregation;
    this.callbacks = callbacks;
    this.connect();
  }

  setAggregation(aggregation: AggregationLevel): void {
    this.aggregation = aggregation;
    if (this.book.lastUpdateId > 0) {
      this.publish();
    }
  }

  dispose(): void {
    this.disposed = true;
    this.clearReconnectTimer();
    this.ws?.close();
    this.ws = null;
  }

  private connect(): void {
    this.book = createEmptyBook();
    this.buffer = [];

    const sym = toApiSymbol(this.symbol).toLowerCase();
    const ws = new WebSocket(WS_BASE);
    this.ws = ws;

    ws.onopen = () => {
      if (this.disposed) return;
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${sym}@depth@1000ms`],
          id: 1,
        }),
      );
    };

    ws.onmessage = (event) => {
      if (this.disposed) return;
      try {
        const msg = JSON.parse(event.data);
        if (msg.result !== undefined) return;
        if (msg.e === "depthUpdate") this.handleDepthMessage(msg);
      } catch (e) {
        console.error("WS parse error:", e);
      }
    };

    ws.onerror = () => {
      if (this.disposed) return;
      console.error("WebSocket connection error");
    };

    ws.onclose = () => {
      if (this.disposed) return;
      this.scheduleReconnect();
    };

    this.initializeBook();
  }

  private reconnect(): void {
    this.ws?.close();
    this.ws = null;
    this.connect();
  }

  private scheduleReconnect(): void {
    this.clearReconnectTimer();
    this.reconnectTimer = window.setTimeout(() => {
      if (!this.disposed) this.reconnect();
    }, RECONNECT_DELAY_MS);
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private async initializeBook(): Promise<void> {
    if (this.disposed || !this.buffer) return;

    while (this.buffer?.length === 0) {
      await delay(50);
    }

    const firstEvent = this.buffer[0]!;
    const snapshot = await this.fetchSnapshotWithRetry(firstEvent.U);
    if (this.disposed || !snapshot) return;

    const book = this.applySnapshot(snapshot);

    while (
      this.buffer.length > 0 &&
      this.buffer[0]!.u <= snapshot.lastUpdateId
    ) {
      this.buffer.shift();
    }

    for (const event of this.buffer) {
      if (applyDepthUpdate(book, event) === "gap") {
        console.warn("Gap detected during buffer replay, restarting...");
        if (!this.disposed) this.reconnect();
        return;
      }
    }

    this.book = book;
    this.buffer = null;
    this.publish();
  }

  private applySnapshot(snapshot: BinanceDepthSnapshot): LocalOrderBook {
    const book = createEmptyBook();
    book.lastUpdateId = snapshot.lastUpdateId;
    for (const [price, qty] of snapshot.bids) book.bids.set(price, qty);
    for (const [price, qty] of snapshot.asks) book.asks.set(price, qty);
    return book;
  }

  private async fetchDepthSnapshot(): Promise<BinanceDepthSnapshot | null> {
    try {
      const res = await fetch(
        `${REST_URL}?symbol=${toApiSymbol(this.symbol)}&limit=5000`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as BinanceDepthSnapshot;
    } catch (e) {
      console.error("Depth snapshot fetch error:", e);
      return null;
    }
  }

  private async fetchSnapshotWithRetry(
    minUpdateId: number,
  ): Promise<BinanceDepthSnapshot | null> {
    for (let i = 0; i < MAX_SNAPSHOT_RETRIES && !this.disposed; i++) {
      const snapshot = await this.fetchDepthSnapshot();
      if (!snapshot) {
        await delay(1000);
        continue;
      }
      if (snapshot.lastUpdateId >= minUpdateId) return snapshot;
      await delay(500);
    }
    return null;
  }

  private handleDepthMessage(depthEvent: BinanceDepthUpdateEvent): void {
    if (this.buffer !== null) {
      this.buffer.push(depthEvent);
      return;
    }

    const result = applyDepthUpdate(this.book, depthEvent);

    if (result === "gap") {
      console.warn("Gap detected, restarting order book...");
      this.reconnect();
      return;
    }

    if (result === "ok") {
      this.publish();
    }
  }

  private publish(): void {
    const orderBookData = projectOrderBookData(
      this.book,
      this.aggregation,
      this.prevMidPrice,
    );
    this.prevMidPrice = orderBookData.mid.price;
    this.callbacks.onOrderBookDataPublish(orderBookData);
  }
}
