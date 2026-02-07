import styled, { keyframes } from "styled-components";
import { colors } from "constants/colors";

export const Container = styled.div`
  height: 860px;
  width: 280px;
  background-color: ${colors.bgPanel};
  border: 1px solid ${colors.borderSubtle};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px 0;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  letter-spacing: 0.025em;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const ConnectingBadge = styled.span`
  font-size: 10px;
  color: ${colors.sell};
  animation: ${pulse} 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const Controls = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  margin-top: 12px;
`;

export const ColumnHeaders = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  margin-top: 8px;
  font-size: 12px;
  color: ${colors.textSecondary};
`;

export const ColPrice = styled.div`
  width: 40%;
  text-align: left;
`;

export const ColAmount = styled.div`
  width: 30%;
  text-align: right;
`;

export const ColTotal = styled.div`
  width: 30%;
  text-align: right;
`;

export const BookContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AsksSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
`;

export const BidsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`;
