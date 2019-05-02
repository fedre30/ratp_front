import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "styles/const";

const ModalContainer = styled.div`
  width: 300px;
  height: 200px;
  background: ${colors.background};
  padding: 1rem;
  position: absolute;
  left: 30%;
  bottom: 4rem;
  .Modal-title {
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0;
    font-weight: 900;
    color: white;
    text-transform: capitalize;
  }
`;

const Modal = ({ title }) => (
  <ModalContainer>
    <h2 className="Modal-title">{title}</h2>
  </ModalContainer>
);

Modal.propTypes = {
  title: PropTypes.string,
};
export default Modal;
