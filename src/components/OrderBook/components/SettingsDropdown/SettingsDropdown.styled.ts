import styled from "styled-components";
import { colors } from "constants/colors";

export const Wrapper = styled.div`
  position: relative;
`;

export const Label = styled.span`
  color: ${colors.textTertiary};

  &:hover {
    color: ${colors.textPrimary};
  }
`;

export const DropdownToggle = styled.button`
  color: ${colors.textTertiary};
  background: none;
  border: none;
  &:hover {
    color: ${colors.textPrimary};
  }
  cursor: pointer;
`;

export const Panel = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  z-index: 50;
  width: 200px;
  background-color: ${colors.bgElevated};
  border-radius: 8px;
  box-shadow: ${colors.dropShadow};
  padding: 8px 0;
`;

export const SectionHeader = styled.div`
  padding: 8px 12px;
  color: ${colors.textTertiary};
  font-size: 12px;
  font-weight: 500;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;

  padding: 12px;
  &:hover {
    background-color: ${colors.hoverBg};
  }
`;

export const Divider = styled.div`
  border-top: 1px solid ${colors.border};
  margin: 8px 0;
`;
