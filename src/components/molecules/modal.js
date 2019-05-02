import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "styles/const";

const ModalContainer = styled.div`
  width: 400px;
  height: 350px;
  background: ${colors.text};
  padding: 1rem;
  position: absolute;
  left: 30%;
  bottom: 4rem;
  border-radius: 0.3rem;
  .Modal-title {
    font-size: 1.5rem;
    line-height: 3rem;
    text-align: center;
    margin: 2rem 0;
    font-weight: 500;
    color: ${colors.primary};
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
