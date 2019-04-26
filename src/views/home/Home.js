import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { colors } from "styles/const";

import background from "images/background.jpg";
import ratp from "images/ratp.svg";
import StationSearch from "./station-search";
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
  margin-bottom: ${rem(126)};
`;

const Highlight = styled.span`
  color: ${colors.tertiary};
`;

const Home = () => (
  <HomeContainer>
    <Background src={background} alt="" />
    <WrapperHeader>
      <div>
        <Title>Tube.</Title>
        <SubTitle italic>Transport urbains pour les besoins environnementaux </SubTitle>
      </div>
      <img src={ratp} alt="" />
    </WrapperHeader>

    <SubTitle size={40} bold style={{ marginBottom: rem(61) }}>
      Découvrez <Highlight>les stations</Highlight> qui font partie de votre quotidien.
    </SubTitle>
    <StationSearch />
  </HomeContainer>
);
export default Home;
