import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { rem } from "polished";

import { Input } from "components/atoms";

const Suggestion = styled.ul`
  position: absolute;
  z-index: 2;
  width: ${rem(270)};
  max-height: ${rem(400)};
  overflow: hidden;
  overflow-y: scroll;

  .no-suggestions {
    padding: ${rem(10)};
    background: #fff;
  }

  & > li {
    padding: ${rem(10)};
    background: #fff;
    cursor: pointer;
  }

  .active,
  & > li:hover {
    border-left: 3px solid #00aa91;
    font-weight: 700;
  }

  .suggestions li:not(:last-of-type) {
    border-bottom: 1px solid #999;
  }
`;

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("click", event => this.closeAutocomplete(event));
  }

  componentWillUnmount() {
    window.removeEventListener("click", () => this.closeAutocomplete());
  }

  closeAutocomplete = e => {
    if (e.target === this.inputRef.current) {
      return;
    }
    this.setState({
      showSuggestions: false,
    });
  };

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState(
        {
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion],
        },
        () => this.props.history.push("station/" + this.state.userInput.split(" ").join("_"))
      );
    } else if (e.keyCode === 27) {
      this.setState({
        showSuggestions: false,
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeSuggestion, filteredSuggestions, showSuggestions, userInput },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <Suggestion>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion.charAt(0).toUpperCase() + suggestion.slice(1).toLowerCase()}
                </li>
              );
            })}
          </Suggestion>
        );
      } else {
        suggestionsListComponent = (
          <Suggestion>
            <p className="no-suggestions">Aucune station ne correspond à la recherche</p>
          </Suggestion>
        );
      }
    }

    return (
      <Fragment>
        <Input
          ref={this.inputRef}
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder="Auber, Châtelet... "
          style={{ marginBottom: rem(10) }}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
