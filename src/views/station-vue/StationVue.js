import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { fetchStations } from "services";
import { slugify } from "utils";

// import _ from "lodash";
import pollution from "scripts/average_air";
import { Title, Icon, Loading } from "components/atoms";
import BarChart from "components/station-visu/barChart";
import BubbleChart from "components/station-visu/bubbleChart";
import Toilets from "components/station-visu/toilets";
import Accesibility from "components/station-visu/accesibility";
import { colors } from "styles/const";

const Hero = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: ${rem(650)};
  padding: ${rem(200)} ${rem(110)} ${rem(20)};
  background: url(${props => props.StationImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
  max-width: ${rem(120)};
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
  & > p {
    margin-bottom: ${rem(15)};
    color: #3a3d60;
    text-transform: uppercase;
    font-size: ${rem(13)};
    font-weight: 700;
  }
`;

const CategoryIcon = styled.div`
  cursor: pointer;
  background: ${colors.primary};
  opacity: ${props => (props.active ? "1" : "0.3")};
  border-radius: 4px;
  display: inline-block;
  padding: ${rem(30)};
  margin-bottom: ${rem(12)};
`;

const SubjectFilter = styled.div`
  min-width: ${rem(500)};
  & > p {
    margin-bottom: ${rem(27)};
    font-size: 1.5rem;
    color: ${colors.primary};
    text-transform: uppercase;
    font-weight: 400;
    font-weight: bold;
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

  .Category-name {
    font-size: 1em;
  }

  & > p {
    color: #3a3d60;
    font-size: 1.9rem;
    font-size: ${rem(10)};
    font-weight: 700;
  }
`;

const LocalisationContainer = styled.div`
  min-width: ${rem(336)};
  & > p {
    color: ${colors.primary};
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: bold;
  }
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

const DataContainer = styled.div`
  width: 100%;
  margin-top: ${rem(100)};
  .title {
    color: ${colors.primary};
    font-size: ${rem(27)};
    font-weight: bold;
    margin: 0 0 2rem 0;
  }
`;

const StationLinesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 1rem 0;
`;

const StationLine = styled.div`
  width: 2rem;
  margin: 0 0.5rem 0 0;
  display: block;
  img {
    width: 100%;
  }
`;

class StationVue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: null,
      stationLines: null,
      stationFromUrl: null,
      currentCategoryActive: "trafic",
      pollution: pollution,
      currentAir: null,
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
          [key]: {
            ...currentState.category[key],
            active: !currentState.category[key].active,
          },
        },
        currentCategoryActive: key,
      };
    });
  };

  componentDidMount = () => {
    const stationFromUrl = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );

    fetchStations().then(stations =>
      this.setState(
        {
          stations: stations["hydra:member"],
          stationFromUrl: stationFromUrl,
        },
        () => this.getCurrentStation()
      )
    );
  };

  getCurrentStation = () => {
    const currentStation = this.state.stations.filter(
      station => slugify(station.nomGare) === this.state.stationFromUrl
    )[0];
    this.setState(
      {
        currentStation: currentStation,
      },
      () => {
        this.getCorrespondingStation();
        this.getAverageAir();
      }
    );
  };

  getAverageAir = () => {
    const curr = this.state.currentStation;
    const air = this.state.pollution.objects.citeair_average.geometries.filter(
      air => curr.codeInsee === Math.floor(air.properties.fields.ninsee)
    );
    this.setState({
      currentAir: air,
    });
  };

  getCorrespondingStation = () => {
    const { currentStation } = this.state;

    if (currentStation.trafic.length > 0) {
      const lines = [
        currentStation.trafic[0].correspondance1,
        currentStation.trafic[0].correspondance2,
        currentStation.trafic[0].correspondance3,
        currentStation.trafic[0].correspondance4,
        currentStation.trafic[0].correspondance5,
      ];
      const newLines = lines.filter(line => line !== "");
      const linesIcons = newLines.map(line => {
        return `M_${line}`;
      });
      this.setState({
        stationLines: linesIcons,
      });
    } else {
      const lines = [currentStation.indiceLig];
      const linesIcons = lines.map(line => {
        return `M_${line}`;
      });
      this.setState({
        stationLines: linesIcons,
      });
    }
  };

  render() {
    const currentCategoryActiveCopy = this.state.currentCategoryActive;

    const { currentStation, stationLines, currentAir } = this.state;

    return currentStation && stationLines ? (
      <>
        <Hero StationImg={currentStation.image}>
          <Title
            style={{
              marginBottom: rem(16),
            }}
          >
            {currentStation.nomGare}
          </Title>
          <Text> {currentStation.description} </Text>
          <NavContainer>
            <li>
              <a href="/"> Accueil </a>
            </li>
            <li>
              <a href="/map"> Map </a>
            </li>
          </NavContainer>
          <Card>
            <CardContent>
              <p> Correspondance </p>
              <StationLinesContainer>
                {stationLines.map(line => (
                  <StationLine key={line}>
                    <img src={require(`../../images/lines/${line}.png`)} alt={line} />
                  </StationLine>
                ))}
              </StationLinesContainer>
            </CardContent>
          </Card>
        </Hero>
        <StationContainer>
          <div>
            <SubjectFilter>
              <p className="subtitle"> Les differents sujets </p>
              <div>
                <SubjectFilterWrapper onClick={() => this.changeFilter("trafic")}>
                  <CategoryIcon active={this.state.category.trafic.active}>
                    <Icon icon={this.state.category.trafic.icon} size={50} color="#fff" />
                  </CategoryIcon>
                  {this.state.category.trafic.active && (
                    <p className="Category-name"> {this.state.category.trafic.title} </p>
                  )}
                </SubjectFilterWrapper>
                <SubjectFilterWrapper onClick={() => this.changeFilter("airQuality")}>
                  <CategoryIcon active={this.state.category.airQuality.active}>
                    <Icon icon={this.state.category.airQuality.icon} size={50} color="#fff" />
                  </CategoryIcon>
                  {this.state.category.airQuality.active && (
                    <p className="Category-name"> {this.state.category.airQuality.title} </p>
                  )}
                </SubjectFilterWrapper>
                <SubjectFilterWrapper onClick={() => this.changeFilter("toilets")}>
                  <CategoryIcon active={this.state.category.toilets.active}>
                    <Icon icon={this.state.category.toilets.icon} size={50} color="#fff" />
                  </CategoryIcon>
                  {this.state.category.toilets.active && (
                    <p className="Category-name"> {this.state.category.toilets.title} </p>
                  )}
                </SubjectFilterWrapper>
                <SubjectFilterWrapper onClick={() => this.changeFilter("wheelchair")}>
                  <CategoryIcon active={this.state.category.wheelchair.active}>
                    <Icon icon={this.state.category.wheelchair.icon} size={50} color="#fff" />
                  </CategoryIcon>
                  {this.state.category.wheelchair.active && (
                    <p className="Category-name"> {this.state.category.wheelchair.title} </p>
                  )}
                </SubjectFilterWrapper>
              </div>
            </SubjectFilter>

            <LocalisationContainer>
              <p className="subtitle"> Localisation </p>
              <CustomTitle size={112}> {this.state.currentStation.trafic[0].ville} </CustomTitle>
            </LocalisationContainer>
          </div>
          <DataContainer>
            <p className="title"> {this.state.category[currentCategoryActiveCopy].title} </p>
            {this.state.currentCategoryActive === "trafic" && (
              <BarChart
                data={[
                  { value: 400000, text: "moyenne voyageurs" },
                  { value: 5897178, text: "voyageur max" },
                ]}
                size={[200, 800]}
              />
            )}
            {this.state.currentCategoryActive === "airQuality" && (
              <BubbleChart
                useLabels
                data={[
                  {
                    v: currentAir.lenght ? currentAir[0].properties.fields["pm10"] : 27.8,
                    measure: "µg/m3",
                    text: "PM10",
                  },
                  {
                    v: currentAir.lenght ? currentAir[0].properties.fields["no2"] : 10.3,
                    measure: "µg/m3",
                    text: "NO2",
                  },
                  {
                    v: currentAir.lenght ? currentAir[0].properties.fields["o3"] : 31.9,
                    measure: "µg/m3",
                    text: "O3",
                  },
                ]}
              />
            )}
            {this.state.currentCategoryActive === "toilets" && (
              <Toilets toilet={currentStation.sanitaire[0]} />
            )}
            {this.state.currentCategoryActive === "wheelchair" && (
              <Accesibility accesibility={currentStation.access[0]} />
            )}
          </DataContainer>
        </StationContainer>
      </>
    ) : (
      <Loading />
    );
  }
}

export default StationVue;
