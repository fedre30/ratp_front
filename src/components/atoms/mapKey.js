import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "styles/const";

const MapKey = ({ items }) => (
  <>
    {items.map(item => (
      <div>
        <div key={item} style={item.color} />
        <div>{item.text}</div>
      </div>
    ))}
  </>
);

MapKey.PropTypes = {
  items: PropTypes.array,
};

export default MapKey;
