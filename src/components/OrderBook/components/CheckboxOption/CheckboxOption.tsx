import { Check } from "lucide-react";
import { Label, Box, LabelText } from "./CheckboxOption.styled";

interface CheckboxOptionProps {
  checked: boolean;
  label: string;
}

export function CheckboxOption({ checked, label }: CheckboxOptionProps) {
  return (
    <Label>
      <Box $checked={checked}>{checked && <Check size={14} />}</Box>
      <LabelText>{label}</LabelText>
    </Label>
  );
}
