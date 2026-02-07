import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BidLabel = styled.span`
  color: #2ed3a7;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

export const AskLabel = styled.span`
  color: #ff4d57;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

export const Letter = styled.span`
  color: #eaecef;
`;

export const BarTrack = styled.div`
  flex: 1;
  height: 6px;
  display: flex;
  border-radius: 9999px;
  overflow: hidden;
`;

export const BidBar = styled.div`
  background-color: #2ed3a7;
  transition: width 0.3s;
`;

export const AskBar = styled.div`
  background-color: #ff4d57;
  transition: width 0.3s;
`;
