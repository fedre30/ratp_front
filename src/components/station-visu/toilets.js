import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import { capitalize } from "utils";
import { colors } from "styles/const";

import toilets from "images/icons/toilets.svg";

const ToiletsContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ToiletsCircle = styled.div`
  display: inline-block;
  padding: ${rem(80)};
  background: ${colors.primary};
  border-radius: 50%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25);
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
`;

const ToiletsFree = styled.div`
  position: absolute;
  z-index: -1;
  top: ${rem(65)};
  right: ${rem(-190)};
  width: ${rem(220)};
  display: inline-block;
  padding: ${rem(10)} ${rem(0)};
  background: ${colors.secondary};
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ToiletsButton = styled.div`
  position: absolute;
  z-index: -1;
  bottom: ${rem(70)};
  left: ${rem(-195)};
  width: ${rem(220)};
  display: inline-block;
  padding: ${rem(10)} ${rem(0)};
  background: ${colors.secondary};
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Toilets = ({ toilet }) => (
  <>
    {console.log(toilet)}
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
