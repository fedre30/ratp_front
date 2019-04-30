import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "styles/const";

const Button = ({ text, onClick }) => (
  <ButtonContainer>
    <h2 className="Button-title" onClick={onClick}>
      {text}
    </h2>
  </ButtonContainer>
);

Button.propTypes = {
  title: PropTypes.string,
};

const ButtonContainer = styled.div`
  width: 150px;
  height: 50px;
  background: ${colors.secondary};
  border-radius: 0.3rem;
  cursor: pointer;
  margin: 1rem 1rem 1rem 0;

  &:hover {
    background: ${colors.primary};
  }
  .Button-title {
    line-height: 50px;
    font-size: 1rem;
    text-align: center;
    font-weight: 900;
    color: ${props => (props.textColor ? props.color : "white")};
  }
`;
export default Button;
