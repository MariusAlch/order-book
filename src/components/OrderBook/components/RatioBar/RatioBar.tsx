import {
  Wrapper,
  BidLabel,
  AskLabel,
  Letter,
  BarTrack,
  BidBar,
  AskBar,
} from "./RatioBar.styled";

interface RatioBarProps {
  bidPct: number;
  askPct: number;
  visible: boolean;
}

export function RatioBar({ bidPct, askPct, visible }: RatioBarProps) {
  if (!visible) return null;

  return (
    <Wrapper>
      <BidLabel>
        <Letter>B</Letter> {bidPct.toFixed(2)}%
      </BidLabel>
      <BarTrack>
        <BidBar style={{ width: `${bidPct}%` }} />
        <AskBar style={{ width: `${askPct}%` }} />
      </BarTrack>
      <AskLabel>
        {askPct.toFixed(2)}% <Letter>S</Letter>
      </AskLabel>
    </Wrapper>
  );
}
