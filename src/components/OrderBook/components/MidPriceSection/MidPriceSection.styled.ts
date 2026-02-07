import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MidPrice = styled.span`
  font-size: 22px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const SecondaryPrice = styled.span`
  font-size: 12px;
  color: #6E7B87;
  font-variant-numeric: tabular-nums;
`;

export const NavButton = styled.button`
  color: #6E7B87;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #E6EDF6;
  }
`;
