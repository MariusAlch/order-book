import { useState, useRef } from "react";
import type { MarketSymbol } from "types/orderbook";
import { MARKETS } from "types/orderbook";
import { useClickOutside } from "hooks/useClickOutside";
import { ChevronDown, Check } from "lucide-react";
import {
  Wrapper,
  TriggerButton,
  Menu,
  MenuItem,
} from "./MarketSelector.styled";

interface MarketSelectorProps {
  value: MarketSymbol;
  onChange: (value: MarketSymbol) => void;
}

export function MarketSelector({ value, onChange }: MarketSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
    <Wrapper ref={ref}>
      <TriggerButton onClick={() => setIsOpen((prev) => !prev)}>
        {value}
        <ChevronDown size={12} />
      </TriggerButton>

      {isOpen && (
        <Menu>
          {MARKETS.map((market) => (
            <MenuItem
              key={market}
              $active={market === value}
              onClick={() => {
                onChange(market);
                setIsOpen(false);
              }}
            >
              {market}
              {market === value && <Check size={14} />}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}
