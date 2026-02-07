import styled from "styled-components";
import { colors } from "constants/colors";

export const Wrapper = styled.div`
  position: relative;
`;

export const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  color: ${colors.textSecondary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;
  font-variant-numeric: tabular-nums;

  & > span {
    color: ${colors.textPrimary};
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  z-index: 50;
  background-color: ${colors.bgElevated};
  border-radius: 8px;
  box-shadow: ${colors.dropShadow};
  padding: 8px 0;
  min-width: 100px;
`;

export const MenuItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 12px 12px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? colors.textPrimary : colors.textSecondary};

  &:hover {
    background-color: ${colors.hoverBg};
    color: ${colors.textPrimary};
  }
`;
