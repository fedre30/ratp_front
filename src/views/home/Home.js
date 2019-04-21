import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import background from "images/background.jpg";
import ratp from "images/ratp.svg";
import { Title, SubTitle } from "components/atoms";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding: ${rem(55)} ${rem(110)};
`;
const Background = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
`;
const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Home = () => (
  <HomeContainer>
    <Background src={background} />
    <WrapperHeader>
      <div>
        <Title>Tube.</Title>
        <SubTitle>Transport urbains pour les besoins environnementaux </SubTitle>
      </div>
      <img src={ratp} />
    </WrapperHeader>
  </HomeContainer>
);
export default Home;
