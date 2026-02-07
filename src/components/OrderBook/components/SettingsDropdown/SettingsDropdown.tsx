import { useState, useRef } from "react";
import type { OrderBookSettings } from "types/orderbook";
import { MARKETS } from "constants/markets";
import { useClickOutside } from "hooks/useClickOutside";
import { Ellipsis } from "lucide-react";
import {
  Wrapper,
  Panel,
  SectionHeader,
  ToggleButton,
  Divider,
  DropdownToggle,
} from "./SettingsDropdown.styled";
import { RadioOption } from "../RadioOption";
import { CheckboxOption } from "../CheckboxOption";

interface SettingsDropdownProps {
  settings: OrderBookSettings;
  onSettingsChange: (settings: OrderBookSettings) => void;
}

export function SettingsDropdown({
  settings,
  onSettingsChange,
}: SettingsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false), isOpen);

  const update = (patch: Partial<OrderBookSettings>) =>
    onSettingsChange({ ...settings, ...patch });

  return (
    <Wrapper ref={ref}>
      <DropdownToggle onClick={() => setIsOpen((prev) => !prev)}>
        <Ellipsis size={20} />
      </DropdownToggle>

      {isOpen && (
        <Panel>
          <SectionHeader>Market</SectionHeader>
          {MARKETS.map((market) => (
            <ToggleButton onClick={() => update({ market })} key={market}>
              <RadioOption
                checked={settings.market === market}
                label={market}
              />
            </ToggleButton>
          ))}

          <Divider />

          <SectionHeader>Order Book Display</SectionHeader>

          <ToggleButton
            onClick={() =>
              update({ showBuySellRatio: !settings.showBuySellRatio })
            }
          >
            <CheckboxOption
              checked={settings.showBuySellRatio}
              label="Show Buy/Sell Ratio"
            />
          </ToggleButton>
          <ToggleButton
            onClick={() => update({ rounding: !settings.rounding })}
          >
            <CheckboxOption checked={settings.rounding} label="Rounding" />
          </ToggleButton>

          <Divider />

          <SectionHeader>Book Depth Visualization</SectionHeader>
          <ToggleButton
            onClick={() => update({ depthVisualization: "amount" })}
          >
            <RadioOption
              checked={settings.depthVisualization === "amount"}
              label="Amount"
            />
          </ToggleButton>
          <ToggleButton
            onClick={() => update({ depthVisualization: "cumulative" })}
          >
            <RadioOption
              checked={settings.depthVisualization === "cumulative"}
              label="Cumulative"
            />
          </ToggleButton>
        </Panel>
      )}
    </Wrapper>
  );
}
