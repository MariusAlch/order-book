import type {
  OrderBookEntry,
  AggregationLevel,
  DepthVisualization,
} from "types/orderbook";
import { formatPrice, formatTotal } from "utils/format";
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
    text: "#FF4D57",
    bar: "rgba(255, 77, 87, 0.18)",
  },
  bid: {
    text: "#2ED3A7",
    bar: "rgba(46, 211, 167, 0.16)",
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
          {formatPrice(entry.price, aggregation)}
        </PriceCell>
        <AmountCell>{entry.amount.toFixed(5).replace(/\.?0+$/, "")}</AmountCell>
        <TotalCell>{formatTotal(entry.total, rounding)}</TotalCell>
      </Content>
    </RowWrapper>
  );
}
