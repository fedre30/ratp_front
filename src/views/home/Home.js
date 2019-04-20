import React from "react";
import styled from "styled-components";
import background from "images/background.jpg";

import { Title } from "components/atoms";

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
`;

const Home = () => (
  <HomeContainer>
    <Background src={background} />
    <Title>Tube.</Title>
  </HomeContainer>
);
export default Home;
