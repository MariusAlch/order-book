import styled from "styled-components";
import { colors } from "constants/colors";

export const Wrapper = styled.div`
  position: relative;
`;

export const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${colors.white};
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  z-index: 50;
  background-color: ${colors.bgElevated};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: ${colors.dropShadow};
  padding: 4px 0;
  min-width: 120px;
`;

export const MenuItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 6px 12px;
  text-align: left;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? colors.textPrimary : colors.textSecondary};

  &:hover {
    background-color: ${colors.hoverBg};
  }
`;
