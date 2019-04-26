import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { colors } from "styles/const";

const StationChoice = styled.div`
  background: #fff;
  width: ${rem(313)};
  height: ${rem(103)};
  border-right: 1px solid grey;
`;

const StationPlus = styled.div`
  background: #fff;
  width: ${rem(103)};
  height: ${rem(103)};
`;

const SearchBtn = styled.div`
  background: ${colors.tertiary};
  width: ${rem(241)};
  height: ${rem(103)};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: ${rem(39)} 0;
  & > p {
    text-align: center;
  }
`;

const StationSearch = () => (
  <div style={{ display: "flex" }}>
    <StationChoice>
      <p>Station</p>
    </StationChoice>
    <StationChoice>
      <p>Station</p>
    </StationChoice>
    <StationPlus />
    <SearchBtn>Rechercher</SearchBtn>
  </div>
);

export default StationSearch;
