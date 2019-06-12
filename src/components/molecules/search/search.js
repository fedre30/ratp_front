import React, { useState, useEffect, useRef } from "react";
import { rem } from "polished";
import { withRouter } from "react-router-dom";

import { slugify } from "utils";

import { Input } from "components/atoms";
import Autocomplete from "./autocomplete";

const Search = ({ suggestions }) => {
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
      <Autocomplete
        activeSuggestion={activeSuggestion}
        filteredSuggestions={filteredSuggestions}
        showSuggestions={showSuggestions}
        userInput={userInput}
        onClick={onClick}
      />
    </>
  );
};

export default withRouter(Search);
