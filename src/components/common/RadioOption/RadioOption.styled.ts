import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

export const Circle = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ $checked }) => ($checked ? "#2ED3A7" : "#6E7B87")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #2ed3a7;
`;

export const LabelText = styled.span`
  color: #e6edf6;
  font-size: 12px;
`;
