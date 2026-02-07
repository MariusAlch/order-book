import { useState, useRef } from "react";
import type { AggregationLevel } from "types/orderbook";
import { useClickOutside } from "hooks/useClickOutside";
import { Check, ChevronDown } from "lucide-react";
import {
  Wrapper,
  TriggerButton,
  Menu,
  MenuItem,
} from "./AggregationDropdown.styled";

const LEVELS: AggregationLevel[] = ["0.01", "0.1", "1", "10", "50", "100"];

interface AggregationDropdownProps {
  value: AggregationLevel;
  onChange: (value: AggregationLevel) => void;
}

export function AggregationDropdown({
  value,
  onChange,
}: AggregationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
    <Wrapper ref={ref}>
      <TriggerButton onClick={() => setIsOpen(!isOpen)}>
        <span>{value}</span>
        <ChevronDown size={12} />
      </TriggerButton>

      {isOpen && (
        <Menu>
          {LEVELS.map((level) => (
            <MenuItem
              key={level}
              $active={level === value}
              onClick={() => {
                onChange(level);
                setIsOpen(false);
              }}
            >
              {level === value && <Check size={14} />}
              {level}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}
