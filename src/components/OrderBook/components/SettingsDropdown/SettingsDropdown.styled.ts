import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const ToggleButton = styled.button`
  color: #6e7b87;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #e6edf6;
  }
`;

export const Panel = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  z-index: 50;
  width: 208px;
  background-color: #1a2029;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
`;

export const SectionHeader = styled.div`
  padding: 6px 12px;
  color: #6e7b87;
  font-size: 12px;
  font-weight: 500;
`;

export const OptionRow = styled.div`
  padding: 6px 12px;
`;

export const Divider = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 8px 0;
`;
