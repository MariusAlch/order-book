import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  font-size: 12px;
  color: #9aa6b2;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;
  font-variant-numeric: tabular-nums;

  & > span {
    color: #e6edf6;
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  z-index: 50;
  background-color: #1a2029;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  min-width: 60px;
`;

export const MenuItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 6px 12px;
  text-align: right;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#E6EDF6" : "#9AA6B2")};

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;
