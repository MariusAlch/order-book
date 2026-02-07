import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  background-color: #0f141b;
  border-radius: 6px;
  padding: 2px;
`;

export const ModeButton = styled.button<{ $active: boolean }>`
  padding: 6px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? "#1A2029" : "transparent")};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition:
    background-color 0.15s,
    opacity 0.15s;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "#1A2029" : "rgba(255, 255, 255, 0.05)"};
  }
`;
