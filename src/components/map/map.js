import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/const";
import Button from "components/atoms/button";
import Modal from "components/molecules/modal";
import Sidebar from "components/molecules/sidebar";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps";
import { Motion, spring } from "react-motion";
import geography from "scripts/geography.json";
import stations from "scripts/stations.json";
import pollution from "scripts/pollution";
import underground from "scripts/underground";
import filters from "scripts/criteria";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: stations,
      pollution: pollution,
      center: [2.35, 48.85],
      zoom: 1,
      modal: "",
      show: false,
      currentID: undefined,
      currentPollutionIndex: "pm10",
      underground: underground,
      filters: filters,
      activatedFilters: [],
      active: false,
    };

    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleCityClick = this.handleCityClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.showModal = this.showModal.bind(this);
    this.changePollutionIndex = this.changePollutionIndex.bind(this);
    this.filterStations = this.filterStations.bind(this);
  }

  // RENDER
  getProps = props => {
    this.setState({ activatedFilters: props });
  };

  render() {
    return (
      <MapWrapper>
        <Sidebar
          transports={this.state.underground}
          filters={this.state.filters}
          onClick={() => {
            this.handleButton();
          }}
          test={this.getProps}
        />
        <ButtonsMap>
          <ButtonWrapper>
            <Button
              mapButton={true}
              icon="zoomIn"
              iconColor={colors.primary}
              onClick={this.handleZoomIn}
            />
            <Button mapButton={true} icon="zoomOut" iconColor={colors.primary} />
            <Button
              mapButton={true}
              icon="reset"
              iconColor={colors.primary}
              onClick={this.handleReset}
            />
          </ButtonWrapper>
        </ButtonsMap>
        <ButtonFiltersOptions>
          <h3 className="Button-label">Indices de l'air</h3>
          <ButtonWrapper>
            <Button
              text={"PM10"}
              onClick={() => {
                this.changePollutionIndex("pm10");
              }}
              color={colors.secondary}
            />
            <Button
              text={"NO2"}
              onClick={() => {
                this.changePollutionIndex("no2");
              }}
              color={colors.secondary}
            />
            <Button
              text={"O3"}
              onClick={() => {
                this.changePollutionIndex("o3");
              }}
              color={colors.secondary}
            />
          </ButtonWrapper>
        </ButtonFiltersOptions>

        <Motion
          defaultStyle={{
            zoom: 1,
            x: 0,
            y: 20,
          }}
          style={{
            zoom: spring(this.state.zoom, { stiffness: 310, damping: 30 }),
            x: spring(this.state.center[0], { stiffness: 310, damping: 30 }),
            y: spring(this.state.center[1], { stiffness: 310, damping: 30 }),
          }}
        >
          {({ zoom, x, y }) => (
            <ComposableMap
              projectionConfig={{
                scale: 250000,
              }}
              width={2200}
              height={1250}
              projection="mercator"
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}>
                <Geographies geography={geography}>
                  {(geographies, projection) =>
                    geographies.map((geography, i) => (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: colors.primary,
                            stroke: colors.secondary,
                            strokeWidth: 0.7,
                            outline: "none",
                          },
                          hover: {
                            fill: colors.primary,
                            stroke: colors.secondary,
                            strokeWidth: 0.7,
                            outline: "none",
                          },
                          pressed: {
                            fill: colors.secondary,
                            outline: "none",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
                <Markers>
                  {this.state.pollution.map((marker, i) => (
                    <Marker
                      key={i}
                      marker={marker.geometry}
                      style={{
                        default: {
                          fill:
                            (marker.fields["pm10"] + marker.fields["no2"] + marker.fields["o3"]) /
                              3 >
                            50
                              ? "red"
                              : "blue",
                          cursor: "pointer",
                          opacity: 0.1,
                        },
                        hover: { fill: colors.text, cursor: "pointer", opacity: 0.1 },
                        pressed: {
                          fill: "#FFFFFF",
                          cursor: "pointer",
                          outline: "none",
                          opacity: 0.1,
                        },
                      }}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={
                          ((marker.fields["pm10"] + marker.fields["no2"] + marker.fields["o3"]) /
                            3) *
                          2
                        }
                        style={{
                          stroke:
                            (marker.fields["pm10"] + marker.fields["no2"] + marker.fields["o3"]) /
                              3 >
                            50
                              ? "red"
                              : "blue",
                          strokeWidth: 3,
                          opacity: 0.3,
                        }}
                      />
                    </Marker>
                  ))}
                </Markers>

                <Markers>
                  {this.state.stations.objects.stations.geometries.map((marker, j) => (
                    <Marker
                      key={j}
                      marker={marker}
                      style={{
                        default: { fill: colors.tertiary, cursor: "pointer" },
                        hover: { fill: colors.text, cursor: "pointer", outline: "none" },
                        pressed: { fill: "#FFFFFF", cursor: "pointer", outline: "none" },
                      }}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={8}
                        style={{
                          default: {
                            stroke: colors.tertiary,
                            strokeWidth: 4,
                            opacity: 0.9,
                          },
                          hover: {
                            stroke: colors.text,
                            width: 90,
                            strokeWidth: 9,
                            opacity: 1,
                          },
                          pressed: {
                            stroke: colors.tertiary,
                            strokeWidth: 4,
                            opacity: 0.9,
                          },
                        }}
                        className={"stationMarker"}
                      />
                    </Marker>
                  ))}
                </Markers>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
        {this.state.show ? (
          <Modal
            title={stations.objects.stations.geometries[this.state.currentID].properties.nom_gare}
          />
        ) : (
          <div />
        )}
      </MapWrapper>
    );
  }

  // MODAL HANDLER

  componentDidMount() {
    let stations = [];
    for (let i = 0; i < document.querySelectorAll(".rsm-marker").length; i++) {
      if (
        document.querySelectorAll(".rsm-marker")[i].childNodes[0].getAttribute("class") ===
        "stationMarker"
      ) {
        stations.push(document.querySelectorAll(".rsm-marker")[i]);
      }
    }
    for (let i = 0; i < stations.length; i++) {
      stations[i].setAttribute("data-id", i);
      stations[i].addEventListener("mouseover", e => {
        if (e.target.parentNode.getAttribute("class") === "rsm-marker rsm-marker--hover") {
          this.setState({ currentID: e.target.parentNode.getAttribute("data-id") });
          this.showModal(e.target.parentNode.getAttribute("data-id"));
        }
      });
      stations[i].addEventListener("mouseleave", e => {
        setTimeout(() => {
          this.hideModal(e.target.parentNode.getAttribute("data-id"));
        }, 1000);
      });
    }
  }

  // METHODS

  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2,
    });
  }

  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2,
    });
  }

  handleCityClick(city) {
    this.setState({
      zoom: 5,
      center: city.coordinates,
    });
  }

  handleReset() {
    this.setState({
      center: [2.35, 48.85],
      zoom: 1,
    });
  }

  changePollutionIndex(index) {
    this.setState({
      currentPollutionIndex: index,
    });
  }

  showModal = id => {
    console.log(id);
    this.setState({ show: true });
    console.log(this.state.show);
  };

  hideModal = () => {
    this.setState({ show: false });
    console.log(this.state.show);
  };

  getAir = () => {
    stations.filter();
  };

  filterStations = () => {
    this.state.stations.objects.stations.geometries.filter(station => {
      this.state.activatedFilters.map(filter => {
        return station.mode === filter.type && station.indice_lig === filter.line;
      });
    });
  };
}

const MapWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem auto;
`;

const ButtonsMap = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 3rem;
  justify-content: flex-end;
`;

const ButtonFiltersOptions = styled.div`
  width: 100%;
  position: absolute;
  top: 5rem;
  left: 25%;

  .Button-label {
    font-weight: bold;
    font-size: 1.5rem;
    text-transform: uppercase;
    color: ${colors.text};
  }
`;

export default withRouter(MapComponent);
