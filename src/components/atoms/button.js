import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "styles/const";
import Icon from "./icon";

const Button = ({ text, onClick, icon, iconColor, mapButton, active }) => (
  <>
    {mapButton ? (
      <ButtonMap onClick={onClick}>
        <div className="Button-icon">
          {icon && <Icon color={iconColor} icon={icon} size={24} />}
        </div>
      </ButtonMap>
    ) : (
      <ButtonContainer>
        <div className={active ? "active" : "disable"}>
          <h2 className="Button-title" onClick={onClick}>
            {text}
          </h2>
          {icon && <Icon color={iconColor} icon={icon} size={32} />}
        </div>
      </ButtonContainer>
    )}
  </>
);

Button.propTypes = {
  mapButton: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  active: PropTypes.bool,
};

Button.defaultProps = {
  mapButton: false,
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

const ButtonMap = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 2rem;
  background: ${colors.text};
  cursor: pointer;
  margin: 1rem 1rem 1rem 0;
  padding: 0.5rem 0.8rem;

  .Button-icon {
    line-height: 50px;
  }
`;
export default Button;
