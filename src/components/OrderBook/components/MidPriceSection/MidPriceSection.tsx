import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import {
  Wrapper,
  LeftGroup,
  MidPrice,
  SecondaryPrice,
  NavButton,
} from "./MidPriceSection.styled";

interface MidPriceSectionProps {
  midPrice: string;
  direction: "up" | "down";
  secondaryPrice: string;
}

export function MidPriceSection({
  midPrice,
  direction,
  secondaryPrice,
}: MidPriceSectionProps) {
  const color = direction === "up" ? "#2ED3A7" : "#FF4D57";

  return (
    <Wrapper>
      <LeftGroup>
        <MidPrice style={{ color }}>{midPrice}</MidPrice>
        <span style={{ color }}>
          {direction === "up" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        </span>
        <SecondaryPrice>{secondaryPrice}</SecondaryPrice>
      </LeftGroup>
      <NavButton>
        <ChevronRight size={18} />
      </NavButton>
    </Wrapper>
  );
}
