import styled from "styled-components";
import { colors } from "constants/colors";

export const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.bgBody};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;
