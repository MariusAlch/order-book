import type {
  OrderBookSummary,
  MarketSymbol,
  AggregationLevel,
  BinanceDepthSnapshot,
  BinanceDepthUpdateEvent,
  OrderBook,
} from "types/orderbook";
import { toApiSymbol } from "utils/orderbook";
import {
  createEmptyBook,
  applyDepthUpdate,
  summarizeOrderBook,
  delay,
  buildBookFromSnapshot,
} from "./util";

const WS_BASE = "wss://stream.binance.com:9443/ws";
const REST_URL = "https://api.binance.com/api/v3/depth";
const RECONNECT_DELAY_MS = 3000;
const MAX_SNAPSHOT_RETRIES = 5;

interface OrderBookCallbacks {
  onOrderBookPublish: (data: OrderBookSummary) => void;
}

/**
 * Manages a live order book using Binance WebSocket and REST APIs.
 *
 * Flow: connect → buffer depth events → fetch snapshot → replay buffer → go live
 */
export class BinanceOrderBook {
  private readonly symbol: MarketSymbol;
  private aggregation: AggregationLevel;
  private readonly callbacks: OrderBookCallbacks;

  private ws: WebSocket | null = null;
  private reconnectTimer: number | null = null;
  private disposed = false;

  private book: OrderBook = createEmptyBook();
  private prevMidPrice = 0;
  private buffer: BinanceDepthUpdateEvent[] | null = [];

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
    if (this.book.lastUpdateId > 0) this.publish();
  }

  dispose(): void {
    this.disposed = true;
    this.clearReconnectTimer();
    this.closeConnection();
  }

  private connect(): void {
    this.closeConnection();
    this.clearReconnectTimer();
    this.book = createEmptyBook();
    this.buffer = [];

    const symbol = toApiSymbol(this.symbol).toLowerCase();
    const ws = new WebSocket(WS_BASE);
    this.ws = ws;

    ws.onopen = () => {
      if (this.disposed) return;
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${symbol}@depth@1000ms`],
          id: 1,
        }),
      );
    };

    ws.onmessage = (event) => {
      if (this.disposed) return;
      try {
        const msg = JSON.parse(event.data);
        if (msg.e === "depthUpdate") this.handleDepthUpdate(msg);
      } catch (e) {
        console.error("WS parse error:", e);
      }
    };

    ws.onerror = () => {
      if (!this.disposed) console.error("WebSocket connection error");
    };

    ws.onclose = () => {
      if (this.disposed) return;
      this.reconnectTimer = window.setTimeout(() => {
        if (!this.disposed) this.connect();
      }, RECONNECT_DELAY_MS);
    };

    this.fetchSnapshotAndGoLive();
  }

  private closeConnection(): void {
    if (this.ws) {
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
    }
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private async fetchSnapshotAndGoLive(): Promise<void> {
    while (!this.disposed && this.buffer?.length === 0) {
      await delay(50);
    }
    if (this.disposed || !this.buffer) return;

    const firstUpdateId = this.buffer[0]!.U;
    const snapshot = await this.fetchSnapshotWithRetry(firstUpdateId);
    if (this.disposed || !snapshot) return;

    this.book = buildBookFromSnapshot(snapshot);

    /**
     * Discard buffered events that are older than the snapshot.
     * Binance guarantees that any event with u <= lastUpdateId is included in the snapshot.
     */
    while (
      this.buffer.length > 0 &&
      this.buffer[0]!.u <= snapshot.lastUpdateId
    ) {
      this.buffer.shift();
    }

    for (const event of this.buffer) {
      const appliedSuccessfully = applyDepthUpdate(this.book, event);
      if (!appliedSuccessfully) return;
    }

    this.buffer = null;
    this.publish();
  }

  private handleDepthUpdate(event: BinanceDepthUpdateEvent): void {
    if (this.buffer !== null) {
      this.buffer.push(event);
      return;
    }

    const appliedSuccessfully = this.applyDepthUpdate(event);
    if (appliedSuccessfully) this.publish();
  }

  private applyDepthUpdate(event: BinanceDepthUpdateEvent): boolean {
    const result = applyDepthUpdate(this.book, event);
    if (result === "gap") {
      console.warn("Gap detected, restarting...");
      this.connect();
      return false;
    }
    return result === "ok";
  }

  private async fetchDepthSnapshot(): Promise<BinanceDepthSnapshot | null> {
    try {
      const url = `${REST_URL}?symbol=${toApiSymbol(this.symbol)}&limit=5000`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as BinanceDepthSnapshot;
    } catch (e) {
      console.error("Snapshot fetch error:", e);
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

  private publish(): void {
    const summarizedOrderBook = summarizeOrderBook(
      this.book,
      this.aggregation,
      this.prevMidPrice,
    );
    this.prevMidPrice = summarizedOrderBook.mid.price;
    this.callbacks.onOrderBookPublish(summarizedOrderBook);
  }
}
