import type {
  OrderBookEntry,
  AggregationLevel,
  DepthVisualization,
} from "types/orderbook";
import { formatAggregatedPrice, formatTotal } from "utils/format";
import { colors } from "constants/colors";
import {
  RowWrapper,
  DepthBar,
  Content,
  PriceCell,
  AmountCell,
  TotalCell,
} from "./OrderBookRow.styled";

interface OrderBookRowProps {
  entry: OrderBookEntry;
  type: "ask" | "bid";
  maxTotal: number;
  depthVisualization: DepthVisualization;
  aggregation: AggregationLevel;
  rounding: boolean;
}

const ROW_COLORS = {
  ask: {
    text: colors.sell,
    bar: colors.sellBarBg,
  },
  bid: {
    text: colors.buy,
    bar: colors.buyBarBg,
  },
} as const;

export function OrderBookRow({
  entry,
  type,
  maxTotal,
  depthVisualization,
  aggregation,
  rounding,
}: OrderBookRowProps) {
  const depthValue =
    depthVisualization === "cumulative"
      ? entry.total
      : entry.amount * entry.price;
  const depthPct = Math.min((depthValue / maxTotal) * 100, 100);
  const color = ROW_COLORS[type];

  return (
    <RowWrapper>
      <DepthBar style={{ width: `${depthPct}%`, backgroundColor: color.bar }} />
      <Content>
        <PriceCell style={{ color: color.text }}>
          {formatAggregatedPrice(entry.price, aggregation)}
        </PriceCell>
        <AmountCell>{entry.amount.toFixed(5).replace(/\.?0+$/, "")}</AmountCell>
        <TotalCell>{formatTotal(entry.total, rounding)}</TotalCell>
      </Content>
    </RowWrapper>
  );
}
