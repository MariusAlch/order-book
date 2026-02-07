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

export function useBinanceOrderBook({ symbol, aggregation }: Options) {
  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(
    null,
  );

  const bookRef = useRef<BinanceOrderBook | null>(null);

  useEffect(() => {
    bookRef.current?.setAggregation(aggregation);
  }, [aggregation]);

  useEffect(() => {
    const book = new BinanceOrderBook(symbol, aggregation, {
      onOrderBookDataPublish: setOrderBookData,
    });

    bookRef.current = book;

    return () => {
      book.dispose();
      bookRef.current = null;
      setOrderBookData(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  return { orderBookData };
}
