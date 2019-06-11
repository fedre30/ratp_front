import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import { colors } from "styles/const";
import { SubTitle } from "components/atoms";
import { Header } from "components/molecules";

import background from "images/background.jpg";

import StationSearch from "./station-search";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
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

const Highlight = styled.span`
  color: ${colors.tertiary};
`;

const Home = () => (
  <HomeContainer>
    <Background src={background} alt="" />
    <Header subTitle />

    <SubTitle size={40} bold style={{ marginBottom: rem(61) }}>
      Découvrez <Highlight>les stations</Highlight> qui font partie de votre quotidien.
    </SubTitle>
    <StationSearch />
  </HomeContainer>
);
export default Home;
