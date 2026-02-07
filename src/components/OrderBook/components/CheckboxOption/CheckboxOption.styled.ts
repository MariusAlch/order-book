import styled from "styled-components";
import { colors } from "constants/colors";

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

export const Box = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid
    ${({ $checked }) => ($checked ? colors.textPrimary : colors.textTertiary)};
  background-color: ${({ $checked }) =>
    $checked ? colors.textPrimary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.15s,
    border-color 0.15s;
`;

export const LabelText = styled.span`
  color: ${colors.textPrimary};
`;
