import styled from "styled-components";
import { colors } from "constants/colors";

export const Wrapper = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BidLabel = styled.span`
  color: ${colors.buy};
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

export const AskLabel = styled.span`
  color: ${colors.sell};
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

export const Letter = styled.span`
  color: ${colors.textMuted};
`;

export const BarTrack = styled.div`
  flex: 1;
  height: 6px;
  display: flex;
  border-radius: 9999px;
  overflow: hidden;
`;

export const BidBar = styled.div`
  background-color: ${colors.buy};
  transition: width 0.3s;
`;

export const AskBar = styled.div`
  background-color: ${colors.sell};
  transition: width 0.3s;
`;
