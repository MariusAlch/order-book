import { useState, useCallback } from "react";
import type {
  OrderBookEntry,
  ViewMode,
  AggregationLevel,
  OrderBookSettings,
  MarketSymbol,
} from "types/orderbook";
import { parseMarketSymbol } from "utils/orderbook";
import { useBinanceOrderBook } from "hooks/useBinanceOrderBook";
import {
  Container,
  Header,
  HeaderLeft,
  Title,
  ConnectingBadge,
  Controls,
  ColumnHeaders,
  ColPrice,
  ColAmount,
  ColTotal,
  BookContent,
  AsksSection,
  BidsSection,
} from "./OrderBook.styled";
import {
  AggregationDropdown,
  MarketSelector,
  MidPriceSection,
  OrderBookRow,
  RatioBar,
  SettingsDropdown,
  ViewModeSelector,
} from "./components";
const DEFAULT_SETTINGS: OrderBookSettings = {
  showBuySellRatio: true,
  rounding: true,
  depthVisualization: "amount",
};

export function OrderBook() {
  const [viewMode, setViewMode] = useState<ViewMode>("both");
  const [aggregation, setAggregation] = useState<AggregationLevel>("0.01");
  const [market, setMarket] = useState<MarketSymbol>("BTC/USDT");
  const [settings, setSettings] = useState<OrderBookSettings>(DEFAULT_SETTINGS);

  const { data, isConnected } = useBinanceOrderBook({
    symbol: market,
    aggregation,
  });

  const { base, quote } = parseMarketSymbol(market);

  const getMaxTotal = useCallback(
    (entries: OrderBookEntry[]) => {
      if (!entries.length) return 1;
      if (settings.depthVisualization === "cumulative") {
        return Math.max(...entries.map((entry) => entry.total));
      }
      return Math.max(...entries.map((entry) => entry.amount * entry.price));
    },
    [settings.depthVisualization],
  );

  const maxRows = viewMode === "both" ? 14 : 28;
  const displayedAsks = data?.asks.slice(-maxRows) ?? [];
  const displayedBids = data?.bids.slice(0, maxRows) ?? [];
  const rawMaxAsk = getMaxTotal(displayedAsks);
  const rawMaxBid = getMaxTotal(displayedBids);
  const sharedMax = viewMode === "both" ? Math.max(rawMaxAsk, rawMaxBid) : 0;
  const maxAskTotal = sharedMax || rawMaxAsk;
  const maxBidTotal = sharedMax || rawMaxBid;

  const showAsks = viewMode === "both" || viewMode === "asks";
  const showBids = viewMode === "both" || viewMode === "bids";

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Title>Order Book</Title>
          <MarketSelector value={market} onChange={setMarket} />
          {!isConnected && <ConnectingBadge>Connecting...</ConnectingBadge>}
        </HeaderLeft>
        <SettingsDropdown settings={settings} onSettingsChange={setSettings} />
      </Header>

      <Controls>
        <ViewModeSelector value={viewMode} onChange={setViewMode} />
        <AggregationDropdown value={aggregation} onChange={setAggregation} />
      </Controls>

      <ColumnHeaders>
        <ColPrice>Price ({quote})</ColPrice>
        <ColAmount>Amount ({base})</ColAmount>
        <ColTotal>Total</ColTotal>
      </ColumnHeaders>

      <BookContent>
        {showAsks && (
          <AsksSection>
            {displayedAsks.map((entry, index) => (
              <OrderBookRow
                key={index}
                entry={entry}
                type="ask"
                maxTotal={maxAskTotal}
                depthVisualization={settings.depthVisualization}
                aggregation={aggregation}
                rounding={settings.rounding}
              />
            ))}
          </AsksSection>
        )}

        <MidPriceSection
          midPrice={data?.mid.price ?? "--"}
          direction={data?.mid.direction ?? "up"}
          secondaryPrice={data?.mid.priceFormattedSecondary ?? "--"}
        />

        {showBids && (
          <BidsSection>
            {displayedBids.map((entry, index) => (
              <OrderBookRow
                key={index}
                entry={entry}
                type="bid"
                maxTotal={maxBidTotal}
                depthVisualization={settings.depthVisualization}
                aggregation={aggregation}
                rounding={settings.rounding}
              />
            ))}
          </BidsSection>
        )}
      </BookContent>

      <RatioBar
        bidPct={data?.stats.bidPct ?? 50}
        askPct={data?.stats.askPct ?? 50}
        visible={settings.showBuySellRatio}
      />
    </Container>
  );
}
