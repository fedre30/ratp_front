import React from "react";
import StationImg from "images/test.jpg";
import styled from "styled-components";
import { rem } from "polished";

import { Title } from "components/atoms";

const Hero = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: ${rem(200)} ${rem(110)};
  background: url(${StationImg});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Text = styled.p`
  color: #fff;
  width: ${rem(580)};
  line-height: 1.5;
  font-size: ${rem(15)};
`;

const StationVue = () => (
  <>
    <Hero>
      <Title style={{ marginBottom: rem(16) }}>Charles de Gaulle Etoile</Title>
      <Text>
        Charles de Gaulle - Étoile est une station des lignes 1, 2 et 6 du métro de Paris, implantée
        sous la place Charles-de-Gaulle. Initialement appelée Étoile, elle est située à la limite
        des 8e, 16e et 17e arrondissements de Paris.
      </Text>
    </Hero>
  </>
);
export default StationVue;
