import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { colors } from "styles/const";
import { Link } from "react-router-dom";
import { SubTitle, Button } from "components/atoms";
import { Header } from "components/molecules";
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
  left: 0;
  top: 0;
  right: 0;
`;

const MainTitle = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Highlight = styled.span`
  color: ${colors.tertiary};
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

const Home = () => (
  <HomeContainer>
    <Background src={background} alt="" />
    <Header subTitle />
    <MainTitle>
      <SubTitle size={60} bold style={{ marginBottom: rem(61) }} width={500}>
        Découvrez <Highlight>les stations</Highlight> qui font partie de votre quotidien.
      </SubTitle>
      <CustomLink to="/map">
        <Button text="Commencer l'éxpérience" background={colors.tertiary} active="true" />
      </CustomLink>
    </MainTitle>
  </HomeContainer>
);
export default Home;
