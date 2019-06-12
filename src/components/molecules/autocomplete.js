import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { withRouter } from "react-router-dom";

import { slugify } from "utils";

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

const Autocomplete = ({ suggestions }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [onSelect, setOnSelect] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("click", event => closeAutocomplete(event));
    return () => {
      window.removeEventListener("click", () => closeAutocomplete());
    };
  }, []);

  useEffect(() => {
    if (onSelect.length) {
      document.location = "/station/" + slugify(onSelect);
    }
  }, [onSelect]);

  const closeAutocomplete = e => {
    if (e.target === inputRef.current) {
      return;
    }
    setShowSuggestions(false);
  };

  const onChange = e => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(-1);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };

  const onClick = e => {
    setActiveSuggestion(-1);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13 && activeSuggestion > -1) {
      setActiveSuggestion(-1);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
      setOnSelect(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 27) {
      setShowSuggestions(false);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(-1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1);
    }
  };

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
    <>
      <Input
        ref={inputRef}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        placeholder="Auber, Châtelet... "
        style={{ marginBottom: rem(10) }}
      />
      {suggestionsListComponent}
    </>
  );
};

export default withRouter(Autocomplete);
