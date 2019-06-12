import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import { colors } from "styles/const";
import { SubTitle } from "components/atoms";
import { Header } from "components/molecules";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Highlight = styled.span`
  color: ${colors.tertiary};
`;

const Home = () => (
  <HomeContainer>
    <Header subTitle />

    <SubTitle size={40} bold style={{ marginBottom: rem(61) }}>
      Découvrez <Highlight>les stations</Highlight> qui font partie de votre quotidien.
    </SubTitle>
  </HomeContainer>
);
export default Home;
