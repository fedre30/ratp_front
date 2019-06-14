import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { colors } from "styles/const";
import { Link } from "react-router-dom";
import { Title, SubTitle, Button } from "components/atoms";
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
  animation: focus-in-expand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  .margin {
    margin: 2rem 0;
  }

  @-webkit-keyframes focus-in-expand {
    0% {
      letter-spacing: -0.5em;
      -webkit-filter: blur(12px);
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0px);
      filter: blur(0px);
      opacity: 1;
    }
  }
  @keyframes focus-in-expand {
    0% {
      letter-spacing: -0.5em;
      -webkit-filter: blur(12px);
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0px);
      filter: blur(0px);
      opacity: 1;
    }
  }
`;

const Highlight = styled.span`
  color: ${colors.tertiary};
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

const Source = styled.div`
  margin-top: 10rem;
  color: ${colors.text};
  font-family: "Roboto";
  a {
    color: ${colors.secondary};
    text-decoration: none;
  }
`;

const Home = () => (
  <HomeContainer>
    <Background src={background} alt="" />
    <Header subTitle />
    <MainTitle>
      <Title size={80} italic>
        Tube.
      </Title>
      <div className="margin" />
      <SubTitle
        size={40}
        bold
        style={{
          marginBottom: rem(61),
        }}
        width={500}
      >
        Découvrez <Highlight> les stations </Highlight> qui font partie de votre quotidien.
      </SubTitle>
      <CustomLink to="/map">
        <Button text="Commencer l'éxpérience" background={colors.tertiary} active="true" />
      </CustomLink>
      <Source>
        Source:
        <a href="https://data.ratp.fr/explore/?sort=modified"> Open Data RATP</a>
      </Source>
    </MainTitle>
  </HomeContainer>
);
export default Home;
