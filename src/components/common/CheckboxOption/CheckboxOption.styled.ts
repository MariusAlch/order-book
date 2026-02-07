import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

export const Box = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ $checked }) => ($checked ? "#2ED3A7" : "#6E7B87")};
  background-color: ${({ $checked }) => ($checked ? "#2ED3A7" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.15s,
    border-color 0.15s;
`;

export const LabelText = styled.span`
  color: #e6edf6;
  font-size: 12px;
`;
