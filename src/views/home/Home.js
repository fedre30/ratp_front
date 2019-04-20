import React from "react";
import styled from "styled-components";
import { colors } from "styles/const";

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.background};
  position: relative;
  overflow: hidden;
  .Home-title {
    font-size: 3rem;
    color: ${colors.text};
    text-align: center;
    margin: 2rem 0;
    font-weight: 900;
  }
  a {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Home = () => (
  <HomeContainer>
    <h1 className="Home-title">Tube is coming</h1>
  </HomeContainer>
);
export default Home;
