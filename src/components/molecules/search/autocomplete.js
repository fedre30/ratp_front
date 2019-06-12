import React from "react";
import styled from "styled-components";
import { rem } from "polished";

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

const Autocomplete = ({
  activeSuggestion,
  filteredSuggestions,
  showSuggestions,
  userInput,
  onClick,
}) => {
  return (
    showSuggestions &&
    userInput && (
      <>
        {filteredSuggestions.length ? (
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
        ) : (
          <Suggestion>
            <p className="no-suggestions">Aucune station ne correspond à la recherche</p>
          </Suggestion>
        )}
      </>
    )
  );
};

export default Autocomplete;
