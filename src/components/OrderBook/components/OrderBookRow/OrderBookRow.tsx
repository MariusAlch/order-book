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
  highlighted: boolean;
  dashedBorder: "top" | "bottom" | "none";
  onMouseEnter: () => void;
}

const ROW_COLORS = {
  ask: colors.sell,
  bid: colors.buy,
} as const;

export function OrderBookRow({
  entry,
  type,
  maxTotal,
  depthVisualization,
  aggregation,
  rounding,
  highlighted,
  dashedBorder,
  onMouseEnter,
}: OrderBookRowProps) {
  const depthValue =
    depthVisualization === "cumulative"
      ? entry.total
      : entry.amount * entry.price;
  const depthPercentage = Math.min((depthValue / maxTotal) * 100, 100);
  const color = ROW_COLORS[type];

  return (
    <RowWrapper
      $highlighted={highlighted}
      $dashedBorder={dashedBorder}
      onMouseEnter={onMouseEnter}
    >
      <DepthBar
        style={{
          width: `${depthPercentage}%`,
          backgroundColor: color,
          opacity: 0.1,
        }}
      />
      <Content>
        <PriceCell style={{ color: color }}>
          {formatAggregatedPrice(entry.price, aggregation)}
        </PriceCell>
        <AmountCell>{entry.amount.toFixed(5).replace(/\.?0+$/, "")}</AmountCell>
        <TotalCell>{formatTotal(entry.total, rounding)}</TotalCell>
      </Content>
    </RowWrapper>
  );
}
