import { Check } from "lucide-react";
import { Label, Box, LabelText } from "./CheckboxOption.styled";

interface CheckboxOptionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function CheckboxOption({
  checked,
  onChange,
  label,
}: CheckboxOptionProps) {
  return (
    <Label onClick={() => onChange(!checked)}>
      <Box $checked={checked}>{checked && <Check size={14} />}</Box>
      <LabelText>{label}</LabelText>
    </Label>
  );
}
