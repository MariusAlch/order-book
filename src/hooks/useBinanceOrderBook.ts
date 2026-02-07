import { useState, useEffect, useRef } from "react";
import type {
  OrderBookData,
  MarketSymbol,
  AggregationLevel,
} from "types/orderbook";
import { BinanceOrderBook } from "services/BinanceOrderBook";

interface Options {
  symbol: MarketSymbol;
  aggregation: AggregationLevel;
}

interface Result {
  data: OrderBookData | null;
  isConnected: boolean;
}

export function useBinanceOrderBook({ symbol, aggregation }: Options): Result {
  const [data, setData] = useState<OrderBookData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const bookRef = useRef<BinanceOrderBook | null>(null);

  useEffect(() => {
    bookRef.current?.setAggregation(aggregation);
  }, [aggregation]);

  useEffect(() => {
    const book = new BinanceOrderBook(symbol, aggregation, {
      onData: setData,
      onConnectionChange: setIsConnected,
    });

    bookRef.current = book;

    return () => {
      book.dispose();
      bookRef.current = null;
      setData(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  return { data, isConnected };
}
