import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "styles/const";
import Icon from "./icon";

const Button = ({ text, onClick, icon, iconColor, mapButton, active, value }) => (
  <>
    {" "}
    {mapButton ? (
      <ButtonMap onClick={onClick} value={value}>
        <div className="Button-icon">
          {" "}
          {icon && <Icon color={iconColor} icon={icon} size={24} />}{" "}
        </div>{" "}
      </ButtonMap>
    ) : (
      <ButtonContainer>
        <div className={active ? "" : "disable"}>
          <h2 className="Button-title" onClick={onClick}>
            {" "}
            {text}{" "}
          </h2>{" "}
          {icon && <Icon color={iconColor} icon={icon} size={32} />}{" "}
        </div>{" "}
      </ButtonContainer>
    )}{" "}
  </>
);

Button.propTypes = {
  mapButton: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  active: PropTypes.bool,
  value: PropTypes.string,
  background: PropTypes.string,
};

Button.defaultProps = {
  mapButton: false,
  value: "",
};

const ButtonContainer = styled.div`
  width: auto;
  height: 50px;
  padding: 0 1rem;
  background: ${props => (props.background ? props.background : colors.button)};
  border-radius: 0.3rem;
  cursor: pointer;
  margin: 1rem 1rem 1rem 0;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);

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

  .disable {
    opacity: 0.3;
  }
`;

const ButtonMap = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 2rem;
  background: ${props => (props.buttonColor ? props.buttonColor : colors.text)};
  cursor: pointer;
  margin: 1rem 1rem 1rem 0;
  padding: 0.5rem 0.8rem;

  .Button-icon {
    line-height: 50px;
  }
`;
export default Button;
