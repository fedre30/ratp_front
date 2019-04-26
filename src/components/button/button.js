import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.div`
  width: 150px;
  height: 50px;
  background: black;
  border-radius: 0.3rem;
  cursor: pointer;
  margin: 1rem 1rem;
  .Button-title {
    line-height: 50px;
    font-size: 1rem;
    text-align: center;
    font-weight: 900;
    color: white;
  }
`;

const Button = ({ text, color, textColor, onClick }) => (
  <ButtonContainer style={{ background: color }}>
    <h2 className="Button-title" style={{ color: textColor }} onClick={onClick}>
      {text}
    </h2>
  </ButtonContainer>
);

Button.propTypes = {
  title: PropTypes.string,
};
export default Button;
