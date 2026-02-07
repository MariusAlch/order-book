import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { colors } from "constants/colors";
import {
  Wrapper,
  LeftGroup,
  MidPrice,
  SecondaryPrice,
  NavButton,
} from "./MidPriceSection.styled";
import { formatPrice } from "utils/format";

interface MidPriceSectionProps {
  midPrice?: number;
  direction: "up" | "down";
}

export function MidPriceSection({ midPrice, direction }: MidPriceSectionProps) {
  const color = direction === "up" ? colors.buy : colors.sell;

  return (
    <Wrapper>
      <LeftGroup>
        <MidPrice style={{ color }}>
          {midPrice ? formatPrice(midPrice) : "--"}
        </MidPrice>
        <span style={{ color }}>
          {direction === "up" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        </span>
        <SecondaryPrice>
          {midPrice ? `$${formatPrice(midPrice)}` : "--"}
        </SecondaryPrice>
      </LeftGroup>
      <NavButton>
        <ChevronRight size={18} />
      </NavButton>
    </Wrapper>
  );
}
