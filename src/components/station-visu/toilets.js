import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import { capitalize } from "utils";
import { colors } from "styles/const";

import toilets from "images/icons/toilets.svg";

const ToiletsContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 auto;
  margin-left: ${rem(300)};
`;

const ToiletsCircle = styled.div`
  display: inline-block;
  padding: ${rem(80)};
  background: ${colors.primary};
  border-radius: 50%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25);
  font-family: "roboto";
`;

const ToiletsLocalisation = styled.div`
  position: absolute;
  z-index: -1;
  bottom: ${rem(-100)};
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: ${rem(220)};
  display: inline-block;
  background: ${colors.lightgrey};
  padding: ${rem(100)} ${rem(15)} ${rem(15)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  & p:first-child {
    margin-bottom: ${rem(10)};
  }
  & p {
    text-align: center;
    color: ${colors.primary};
  }
`;

const ToiletsFree = styled.div`
  position: absolute;
  z-index: -1;
  top: ${rem(65)};
  right: ${rem(-190)};
  width: ${rem(220)};
  display: inline-block;
  padding: ${rem(15)} ${rem(40)};
  background: ${colors.secondary};
  font-weight: bold;
  text-align: center;
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ToiletsButton = styled.div`
  position: absolute;
  z-index: -1;
  bottom: ${rem(70)};
  left: ${rem(-200)};
  width: ${rem(220)};
  display: inline-block;
  padding: ${rem(15)} ${rem(20)};
  background: ${colors.secondary};
  font-weight: bold;
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Toilets = ({ toilet }) => (
  <>
    {toilet ? (
      <ToiletsContainer>
        <ToiletsCircle>
          <img src={toilets} alt="" />
        </ToiletsCircle>
        <ToiletsLocalisation>
          <p>Où?</p>
          <p>{toilet.localisation}</p>
        </ToiletsLocalisation>
        <ToiletsFree>{capitalize(toilet.tarifGratuitPayant)}</ToiletsFree>
        <ToiletsButton>
          {toilet.accesBoutonpoussoir === "oui" ? "Accès bouton poussoir" : "Aucun bouton poussoir"}
        </ToiletsButton>
      </ToiletsContainer>
    ) : (
      <ToiletsContainer>
        <ToiletsCircle>
          <img src={toilets} alt="" />
        </ToiletsCircle>
        <ToiletsLocalisation>
          <p>Il n'y a aucun sanitaire dans cette station</p>
        </ToiletsLocalisation>
      </ToiletsContainer>
    )}
  </>
);

export default Toilets;
