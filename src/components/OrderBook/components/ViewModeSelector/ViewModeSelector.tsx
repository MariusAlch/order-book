import type { ViewMode } from "types/orderbook";
import {
  OrderBookBothIcon,
  OrderBookBidsIcon,
  OrderBookAsksIcon,
} from "components/icons";
import { ButtonGroup, ModeButton } from "./ViewModeSelector.styled";

interface ViewModeSelectorProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

const modes: { mode: ViewMode; Icon: typeof OrderBookBothIcon }[] = [
  { mode: "both", Icon: OrderBookBothIcon },
  { mode: "bids", Icon: OrderBookBidsIcon },
  { mode: "asks", Icon: OrderBookAsksIcon },
];

export function ViewModeSelector({ value, onChange }: ViewModeSelectorProps) {
  return (
    <ButtonGroup>
      {modes.map(({ mode, Icon }) => (
        <ModeButton
          key={mode}
          $active={value === mode}
          onClick={() => onChange(mode)}
        >
          <Icon />
        </ModeButton>
      ))}
    </ButtonGroup>
  );
}
