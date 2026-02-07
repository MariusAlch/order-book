import styled from "styled-components";
import { colors } from "constants/colors";

export const RowWrapper = styled.div`
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.rowHoverBg};
  }
`;

export const DepthBar = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  font-variant-numeric: tabular-nums;
`;

export const PriceCell = styled.div`
  width: 40%;
  text-align: left;
`;

export const AmountCell = styled.div`
  width: 30%;
  text-align: right;
  color: ${colors.textPrimary};
`;

export const TotalCell = styled.div`
  width: 30%;
  text-align: right;
  color: ${colors.textPrimary};
`;
