import styled from "styled-components";
import { colors } from "constants/colors";

export const Wrapper = styled.div`
  position: relative;
`;

export const ToggleButton = styled.button`
  color: ${colors.textTertiary};
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

export const Panel = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  z-index: 50;
  width: 208px;
  background-color: ${colors.bgElevated};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: ${colors.dropShadow};
  padding: 8px 0;
`;

export const SectionHeader = styled.div`
  padding: 6px 12px;
  color: ${colors.textTertiary};
  font-size: 12px;
  font-weight: 500;
`;

export const OptionRow = styled.div`
  padding: 6px 12px;
`;

export const Divider = styled.div`
  border-top: 1px solid ${colors.border};
  margin: 8px 0;
`;
