import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { colors } from "styles/const";

import { Icon, Input, Label } from "components/atoms";

const StationChoice = styled.div`
  background: #fff;
  width: ${rem(313)};
  height: ${rem(103)};
  padding: ${rem(21)} ${rem(35)};
  border-right: 1px solid grey;
`;

const StationPlus = styled.div`
  background: #fff;
  width: ${rem(103)};
  height: ${rem(103)};
  padding: ${rem(39)} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.tertiary};
  width: ${rem(241)};
  height: ${rem(103)};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: ${rem(39)} 0;
  cursor: pointer;
  & > p {
    color: #fff;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

class StationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBtn: 2,
    };
  }
  render() {
    return (
      <div style={{ display: "flex" }}>
        <StationChoice>
          <Label>STATION</Label>
          <InputWrapper>
            <Icon icon="search" size={16} style={{ marginRight: rem(4), opacity: 0.6 }} />
            <Input placeholder="Choisissez une station" />
          </InputWrapper>
        </StationChoice>
        <StationChoice>
          <Label>STATION</Label>
          <InputWrapper>
            <Icon icon="search" size={16} style={{ marginRight: rem(4), opacity: 0.6 }} />
            <Input placeholder="Choisissez une station" />
          </InputWrapper>
        </StationChoice>
        <StationPlus>
          <Icon icon="plus" size={16} color={colors.tertiary} />
        </StationPlus>
        <SearchBtn>
          <p>Rechercher</p>
        </SearchBtn>
      </div>
    );
  }
}

export default StationSearch;
