import React from "react";
import styled from "styled-components";
import background from "images/background.jpg";

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
    <h1>Tube is coming</h1>
  </HomeContainer>
);
export default Home;
