import styled from "styled-components";
import { colors } from "constants/colors";

export const Wrapper = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-top: 1px solid ${colors.borderSubtle};
  border-bottom: 1px solid ${colors.borderSubtle};
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MidPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const SecondaryPrice = styled.span`
  color: ${colors.textTertiary};
  font-variant-numeric: tabular-nums;
`;

export const NavButton = styled.button`
  color: ${colors.textTertiary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${colors.textPrimary};
  }
`;
