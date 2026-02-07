import { useState, useRef } from "react";
import type { OrderBookSettings } from "types/orderbook";
import { useClickOutside } from "hooks/useClickOutside";
import { Ellipsis } from "lucide-react";
import { CheckboxOption } from "components/common/CheckboxOption";
import { RadioOption } from "components/common/RadioOption";
import {
  Wrapper,
  ToggleButton,
  Panel,
  SectionHeader,
  OptionRow,
  Divider,
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
      <ToggleButton onClick={() => setIsOpen((prev) => !prev)}>
        <Ellipsis size={20} />
      </ToggleButton>

      {isOpen && (
        <Panel>
          <SectionHeader>Order Book Display</SectionHeader>

          <OptionRow>
            <CheckboxOption
              checked={settings.showBuySellRatio}
              onChange={(checked) => update({ showBuySellRatio: checked })}
              label="Show Buy/Sell Ratio"
            />
          </OptionRow>
          <OptionRow>
            <CheckboxOption
              checked={settings.rounding}
              onChange={(checked) => update({ rounding: checked })}
              label="Rounding"
            />
          </OptionRow>

          <Divider />

          <SectionHeader>Book Depth Visualization</SectionHeader>
          <OptionRow>
            <RadioOption
              checked={settings.depthVisualization === "amount"}
              onChange={() => update({ depthVisualization: "amount" })}
              label="Amount"
            />
          </OptionRow>
          <OptionRow>
            <RadioOption
              checked={settings.depthVisualization === "cumulative"}
              onChange={() => update({ depthVisualization: "cumulative" })}
              label="Cumulative"
            />
          </OptionRow>
        </Panel>
      )}
    </Wrapper>
  );
}
