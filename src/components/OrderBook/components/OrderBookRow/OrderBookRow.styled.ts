import styled from 'styled-components';

export const RowWrapper = styled.div`
  position: relative;
  height: 26px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
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
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`;

export const PriceCell = styled.div`
  width: 40%;
  text-align: left;
`;

export const AmountCell = styled.div`
  width: 30%;
  text-align: right;
  color: #E6EDF6;
`;

export const TotalCell = styled.div`
  width: 30%;
  text-align: right;
  color: #E6EDF6;
`;
