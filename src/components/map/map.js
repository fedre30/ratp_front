import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/const";
import Button from "components/button/button";
import Modal from "components/modal/modal";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps";
import geography from "scripts/citeair_april.json";
import { Motion, spring } from "react-motion";
import stations from "scripts/positions-geographiques-des-stations-du-reseau-ratp";
import pollution from "scripts/citeair_pollution";

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
    };

    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleCityClick = this.handleCityClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.showModal = this.showModal.bind(this);
    this.changePollutionIndex = this.changePollutionIndex.bind(this);
  }

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
    }
  }

  // RENDER

  render() {
    return (
      <MapWrapper>
        <ButtonWrapper>
          <Button text={"Zoom in"} color={colors.secondary} onClick={this.handleZoomIn} />
          <Button text={"Zoom out"} onClick={this.handleZoomOut} color={colors.secondary} />
          <Button text={"Reset"} onClick={this.handleReset} color={colors.secondary} />
          <Button
            text={"PM10"}
            handleClick={() => {
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
              width={1240}
              height={700}
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
                        default: { fill: colors.text, cursor: "pointer", opacity: 0.1 },
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
                        r={marker.fields[this.state.currentPollutionIndex]}
                        style={{
                          stroke: colors.text,
                          strokeWidth: 3,
                          opacity: 0.3,
                        }}
                      />
                    </Marker>
                  ))}
                </Markers>

                <Markers>
                  {this.state.stations.map((marker, j) => (
                    <Marker
                      key={j}
                      marker={marker.geometry}
                      style={{
                        default: { fill: colors.tertiary, cursor: "pointer" },
                        hover: { fill: colors.primary, cursor: "pointer" },
                        pressed: { fill: "#FFFFFF", cursor: "pointer", outline: "none" },
                      }}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={3}
                        style={{
                          stroke: colors.tertiary,
                          strokeWidth: 3,
                          opacity: 0.9,
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
          <Modal title={stations[this.state.currentID].fields.stop_name} />
        ) : (
          <div />
        )}
      </MapWrapper>
    );
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
}

const MapWrapper = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 2rem auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 980px;
  display: flex;
`;

export default withRouter(MapComponent);
