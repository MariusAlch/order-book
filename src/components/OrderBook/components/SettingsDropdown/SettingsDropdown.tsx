import { useState, useRef } from "react";
import type { OrderBookSettings } from "types/orderbook";
import { MARKETS } from "constants/markets";
import { useClickOutside } from "hooks/useClickOutside";
import { Ellipsis } from "lucide-react";
import { CheckboxOption } from "components/common/CheckboxOption";
import { RadioOption } from "components/common/RadioOption";
import {
  Wrapper,
  Panel,
  SectionHeader,
  ToggleButton,
  Divider,
  DropdownToggle,
} from "./SettingsDropdown.styled";

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
            <ToggleButton key={market}>
              <RadioOption
                checked={settings.market === market}
                onChange={() => update({ market: market })}
                label={market}
              />
            </ToggleButton>
          ))}

          <Divider />

          <SectionHeader>Order Book Display</SectionHeader>

          <ToggleButton>
            <CheckboxOption
              checked={settings.showBuySellRatio}
              onChange={(checked) => update({ showBuySellRatio: checked })}
              label="Show Buy/Sell Ratio"
            />
          </ToggleButton>
          <ToggleButton>
            <CheckboxOption
              checked={settings.rounding}
              onChange={(checked) => update({ rounding: checked })}
              label="Rounding"
            />
          </ToggleButton>

          <Divider />

          <SectionHeader>Book Depth Visualization</SectionHeader>
          <ToggleButton>
            <RadioOption
              checked={settings.depthVisualization === "amount"}
              onChange={() => update({ depthVisualization: "amount" })}
              label="Amount"
            />
          </ToggleButton>
          <ToggleButton>
            <RadioOption
              checked={settings.depthVisualization === "cumulative"}
              onChange={() => update({ depthVisualization: "cumulative" })}
              label="Cumulative"
            />
          </ToggleButton>
        </Panel>
      )}
    </Wrapper>
  );
}
