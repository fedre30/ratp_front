import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { colors } from "styles/const";

import { Icon, Input, Label } from "components/atoms";

const StationChoice = styled.div`
  background: #fff;
  width: ${rem(313)};
  height: ${rem(93)};
  padding: ${rem(21)} ${rem(35)};
  border-right: 1px solid grey;
`;

const StationPlus = styled.div`
  background: #fff;
  width: ${rem(103)};
  height: ${rem(93)};
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
  height: ${rem(93)};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: ${rem(39)} 0;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    background: #009982;
  }
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
      addingSearch: false,
      station: {
        field1: {
          value: "",
        },
        field2: {
          value: "",
        },
        field3: {
          value: "",
        },
      },
    };
  }

  onChange = fieldName => event => {
    event = event.target.value;
    this.setState(currentState => {
      return {
        station: {
          ...currentState.station,
          [fieldName]: {
            ...currentState.station[fieldName],
            value: event,
          },
        },
      };
    });
  };

  addStationSearch = () => {
    this.setState({ addingSearch: true });
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <StationChoice>
          <Label>STATION</Label>
          <InputWrapper>
            <Icon icon="search" size={14} style={{ marginRight: rem(4), opacity: 0.6 }} />
            <Input
              // value={this.state.station.field1.value}
              placeholder="Choisissez une station"
              onChange={this.onChange("field1")}
            />
          </InputWrapper>
        </StationChoice>
        <StationChoice>
          <Label>STATION</Label>
          <InputWrapper>
            <Icon icon="search" size={14} style={{ marginRight: rem(4), opacity: 0.6 }} />
            <Input
              value={this.state.station.field2.value}
              placeholder="Choisissez une station"
              onChange={this.onChange("field2")}
            />
          </InputWrapper>
        </StationChoice>
        {this.state.addingSearch && (
          <StationChoice>
            <Label>STATION</Label>
            <InputWrapper>
              <Icon icon="search" size={14} style={{ marginRight: rem(4), opacity: 0.6 }} />
              <Input
                value={this.state.station.field3.value}
                placeholder="Choisissez une station"
                onChange={this.onChange("field3")}
              />
            </InputWrapper>
          </StationChoice>
        )}
        {!this.state.addingSearch ? (
          <StationPlus onClick={this.addStationSearch}>
            <Icon icon="plus" size={16} color={colors.tertiary} />
          </StationPlus>
        ) : null}

        <SearchBtn>
          <p>Rechercher</p>
        </SearchBtn>
      </div>
    );
  }
}

export default StationSearch;
