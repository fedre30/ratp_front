import React from "react";
import StationImg from "images/test.jpg";
import styled from "styled-components";
import { rem } from "polished";
// import _ from "lodash";

import { Title, Icon } from "components/atoms";
// import BarChart from "components/d3/barChart";
import BubbleChart from "components/d3/bubbleChart";
import { colors } from "styles/const";

const Hero = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${rem(200)} ${rem(110)} ${rem(20)};
  background: url(${StationImg});
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: ${rem(82)};
`;

const StationContainer = styled.div`
  padding: 0 ${rem(117)};
  & > :first-child {
    display: flex;
    justify-content: space-between;
  }
  & > :not(:last-child) {
    margin-bottom: ${rem(30)};
  }
`;

const Text = styled.p`
  color: #fff;
  width: ${rem(580)};
  line-height: 1.5;
  font-size: ${rem(15)};
  margin-bottom: ${rem(75)};
`;

const NavContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${rem(160)};
  position: relative;
  & > li {
    display: flex;
    align-items: center;
  }
  & > li > a {
    color: #fff;
    text-decoration: none;
  }
  & > li:not(:last-child):after {
    content: "•";
    font-size: 25px;
    color: #fff;
    margin-left: 15px;
  }
`;

const Card = styled.div`
  position: absolute;
  right: ${rem(117)};
  bottom: ${rem(-40)};
  display: flex;
  align-content: center;
  justify-content: space-between;
  background: #fff;
  width: ${rem(360)};
  height: ${rem(100)};
  padding: ${rem(29)} ${rem(40)};
  border-radius: 2px;
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.118065);
  z-index: 2;
`;

const CardContent = styled.div`
  & > span {
    color: #3a3d60;
    &:first-child {
      text-transform: uppercase;
      font-size: ${rem(13)};
      font-weight: 700;
      line-height: ${rem(25)};
    }
  }
  &:nth-child(2) {
    background: #3a3d60;
    width: ${rem(1)};
    height: ${rem(40)};
  }
`;

const CategoryIcon = styled.div`
  cursor: pointer;
  background: ${colors.primary};
  opacity: ${props => (props.active ? "1" : "0.3")};
  border-radius: 4px;
  display: inline-block;
  padding: ${rem(20)};
  margin-bottom: ${rem(12)};
  .active {
  }
`;

const SubjectFilter = styled.div`
  min-width: ${rem(336)};
  & > p {
    margin-bottom: ${rem(27)};
  }
  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

const SubjectFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    color: #3a3d60;
    font-size: ${rem(10)};
    font-weight: 700;
  }
`;

const LocalisationContainer = styled.div`
  min-width: ${rem(336)};
  & > :first-child {
    margin-bottom: ${rem(10)};
  }
`;

const CustomTitle = styled(Title)`
  color: black;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
`;

class StationVue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategoryActive: "trafic",
      category: {
        trafic: {
          title: "Traffic",
          icon: "trafic",
          active: true,
        },
        airQuality: {
          title: "Qualité de l'air",
          icon: "air",
          active: false,
        },
        toilets: {
          title: "Toilettes",
          icon: "toilets",
          active: false,
        },
        wheelchair: {
          title: "Accéssibilité",
          icon: "wheelchair",
          active: false,
        },
      },
    };
  }

  changeFilter = key => {
    const currentActive = this.state.currentCategoryActive;
    if (key === currentActive) return;
    this.setState(currentState => {
      return {
        category: {
          ...currentState.category,
          [currentActive]: {
            ...currentState.category[currentActive],
            active: !currentState.category[currentActive].active,
          },
          [key]: { ...currentState.category[key], active: !currentState.category[key].active },
        },
        currentCategoryActive: key,
      };
    });
  };

  render() {
    const currentCategoryActiveCopy = this.state.currentCategoryActive;
    return (
      <>
        <Hero>
          <Title style={{ marginBottom: rem(16) }}>Charles de Gaulle Etoile</Title>
          <Text>
            Charles de Gaulle - Étoile est une station des lignes 1, 2 et 6 du métro de Paris,
            implantée sous la place Charles-de-Gaulle. Initialement appelée Étoile, elle est située
            à la limite des 8e, 16e et 17e arrondissements de Paris.
          </Text>

          <NavContainer>
            <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="#">A propos</a>
            </li>
          </NavContainer>
          <Card>
            <CardContent>
              <span>Mise en service</span>
              <br />
              <span>1.09.1900</span>
            </CardContent>
            <CardContent />
            <CardContent>
              <span>Correspondance</span>
              <br />
              <span>ligne de métro</span>
            </CardContent>
          </Card>
        </Hero>
        <StationContainer>
          <div>
            <SubjectFilter>
              <p>Les differents sujets</p>
              <div>
                <SubjectFilterWrapper onClick={() => this.changeFilter("trafic")}>
                  <CategoryIcon active={this.state.category.trafic.active}>
                    <Icon icon={this.state.category.trafic.icon} size={30} color="#fff" />
                  </CategoryIcon>
                  {this.state.category.trafic.active && <p>{this.state.category.trafic.title}</p>}
                </SubjectFilterWrapper>
                <SubjectFilterWrapper onClick={() => this.changeFilter("airQuality")}>
                  <CategoryIcon active={this.state.category.airQuality.active}>
                    <Icon icon={this.state.category.airQuality.icon} size={30} color="#fff" />
                  </CategoryIcon>
                  {this.state.category.airQuality.active && (
                    <p>{this.state.category.airQuality.title}</p>
                  )}
                </SubjectFilterWrapper>
                <SubjectFilterWrapper onClick={() => this.changeFilter("toilets")}>
                  <CategoryIcon active={this.state.category.toilets.active}>
                    <Icon icon={this.state.category.toilets.icon} size={30} color="#fff" />
                  </CategoryIcon>
                  {this.state.category.toilets.active && <p>{this.state.category.toilets.title}</p>}
                </SubjectFilterWrapper>
                <SubjectFilterWrapper onClick={() => this.changeFilter("wheelchair")}>
                  <CategoryIcon active={this.state.category.wheelchair.active}>
                    <Icon icon={this.state.category.wheelchair.icon} size={30} color="#fff" />
                  </CategoryIcon>
                  {this.state.category.wheelchair.active && (
                    <p>{this.state.category.wheelchair.title}</p>
                  )}
                </SubjectFilterWrapper>
              </div>
            </SubjectFilter>

            <LocalisationContainer>
              <p>Localisation</p>

              <CustomTitle size={112}>Paris</CustomTitle>
            </LocalisationContainer>
          </div>
          <div>
            <p>{this.state.category[currentCategoryActiveCopy].title}</p>
          </div>
          {/* <BarChart data={[5, 10, 1, 3]} size={[500, 500]} /> */}

          <BubbleChart useLabels data={[{ v: 5 }, { v: 10 }, { v: 100 }]} />
        </StationContainer>
      </>
    );
  }
}

export default StationVue;
