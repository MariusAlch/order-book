export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBookSummary {
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
  mid: {
    price: number;
    direction: "up" | "down";
  };
  stats: {
    bidPercentage: number;
    askPercentage: number;
  };
}

export type ViewMode = "both" | "bids" | "asks";
export type AggregationLevel = "0.01" | "0.1" | "1" | "10" | "50" | "100";
export type DepthVisualization = "amount" | "cumulative";

export interface OrderBookSettings {
  market: MarketSymbol;
  showBuySellRatio: boolean;
  rounding: boolean;
  depthVisualization: DepthVisualization;
}

export type MarketSymbol = "BTC/USDT" | "ETH/USDT" | "PAXG/USDT";

export interface BinanceDepthSnapshot {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}

export interface BinanceDepthUpdateEvent {
  e: "depthUpdate";
  E: number;
  s: string;
  U: number;
  u: number;
  b: [string, string][];
  a: [string, string][];
}

export interface OrderBook {
  bids: Map<string, string>;
  asks: Map<string, string>;
  lastUpdateId: number;
}
