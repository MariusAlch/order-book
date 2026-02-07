import { Label, Circle, Dot, LabelText } from "./RadioOption.styled";

interface RadioOptionProps {
  checked: boolean;
  label: string;
}

export function RadioOption({ checked, label }: RadioOptionProps) {
  return (
    <Label>
      <Circle $checked={checked}>{checked && <Dot />}</Circle>
      <LabelText>{label}</LabelText>
    </Label>
  );
}
