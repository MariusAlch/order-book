import { Label, Circle, Dot, LabelText } from "./RadioOption.styled";

interface RadioOptionProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export function RadioOption({ checked, onChange, label }: RadioOptionProps) {
  return (
    <Label onClick={onChange}>
      <Circle $checked={checked}>{checked && <Dot />}</Circle>
      <LabelText>{label}</LabelText>
    </Label>
  );
}
