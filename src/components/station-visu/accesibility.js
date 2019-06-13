import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import tick from "images/icons/tick.svg";
import cross from "images/icons/cross.svg";

const AccesibilityContainer = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: ${rem(1400)};
  margin: 0 auto;

  flex-wrap: wrap;
`;

const AccesibilityContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${rem(600)};
  padding: ${rem(35)};
  & p {
    font-size: ${rem(25)};
    color: ${props => (props.access > 0 ? "green" : "red")};
  }
`;
const AccesibilityInfo = styled.div`
  font-size: ${rem(25)};
  color: ${props => (props.access > 0 ? "green" : "red")};
`;

const Accessibility = ({ accesibility }) => (
  <AccesibilityContainer>
    <AccesibilityContent>
      <AccesibilityInfo access={accesibility.ufr}>Accessibilité UFR</AccesibilityInfo>
      <img src={accesibility.ufr ? tick : cross} alt="" />
    </AccesibilityContent>
    <AccesibilityContent>
      <AccesibilityInfo access={accesibility.annonceSonoreProchainPassage}>
        Annonce sonore prochain arrêt
      </AccesibilityInfo>
      <img src={accesibility.annonceSonoreProchainPassage ? tick : cross} alt="" />
    </AccesibilityContent>
    <AccesibilityContent>
      <AccesibilityInfo access={accesibility.paqt}>Rampe</AccesibilityInfo>
      <img src={accesibility.paqt ? tick : cross} alt="" />
    </AccesibilityContent>
    <AccesibilityContent>
      <AccesibilityInfo access={accesibility.annonceVisuelleProchainPassage}>
        Annonce visuelle prochain arrêt
      </AccesibilityInfo>
      <img src={accesibility.annonceVisuelleProchainPassage ? tick : cross} alt="" />
    </AccesibilityContent>
  </AccesibilityContainer>
);

export default Accessibility;
