import styled from "styled-components";
import { colors } from "styles/const";

// <----------------------------- STYLE ------------------------------------>

export const MapWrapper = styled.div`
  width: 100%;
  position: relative;
`;
export const AllMapOptions = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem auto;
`;

export const ButtonsMap = styled.div`
  position: absolute;
  right: 5rem;
  top: 80vh;
  justify-content: flex-end;
`;

export const ButtonFiltersOptions = styled.div`
  width: 100%;
  position: absolute;
  top: 5rem;
  left: 25%;

  .Button-label {
    font-weight: bold;
    font-size: 1.5rem;
    text-transform: uppercase;
    color: ${colors.text};
  }
`;
