import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "styles/const";

const MapKey = ({ items }) => (
  <MapKeyContainer>
    {" "}
    {items.map(item => (
      <div key={item}>
        <div className="bar" style={{ backgroundColor: item.color }} />
        <div className="description"> {item.text} </div>{" "}
      </div>
    ))}{" "}
  </MapKeyContainer>
);

MapKey.propTypes = {
  items: PropTypes.array,
};

const MapKeyContainer = styled.div`
  display: flex;

  .bar {
    width: 150px;
    height: 35px;
    border-radius: 0.1rem;
  }

  .description {
    width: 140px;
    color: ${colors.text};
    font-family: "Roboto", sans-serif;
    line-height: 1.5rem;
    margin-top: 0.5rem;
  }
`;
export default MapKey;
