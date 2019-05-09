import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { colors } from "styles/const";
import Button from "components/atoms/button";
import Modal from "components/molecules/modal";
import Sidebar from "components/molecules/sidebar/sidebar";
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
import pollution from "scripts/average_air";
import {
  underground,
  filters,
  pollutionButtons,
  zoomButtons,
  traficButtons,
  toiletsButtons,
  accessibilityButtons,
} from "scripts/mapOptions";
import {
  MapWrapper,
  ButtonsMap,
  ButtonFiltersOptions,
  ButtonWrapper,
  AllMapOptions,
} from "./style";
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
      stationName: "",
      currentPollutionIndex: "",
      pollutionButtons: pollutionButtons,
      traficButtons: traficButtons,
      toiletsButtons: toiletsButtons,
      accessibilityButtons: accessibilityButtons,
      underground: underground,
      filters: filters,
      zoomButtons: zoomButtons,
      activatedFiltersLines: [],
      activatedFiltersCriteria: [],
      filteredStations: [],
      active: false,
    };
  }

  getPropsLines = props => {
    this.setState({ activatedFiltersLines: props }, () => {
      this.filterStations();
    });
  };

  getPropsCriteria = props => {
    this.setState({ activatedFiltersCriteria: props });
  };

  // <----------------------------- MODAL HANDLER ------------------------------------>

  showModal = marker => {
    this.setState({ show: true, stationName: marker.properties.nom_gare });
  };

  hideModal = () => {
    this.setState({ show: false, stationName: "" });
  };

  // <----------------------------- MAP METHODS ------------------------------------>

  handleZoom = zoom => {
    if (zoom === "plus") {
      this.setState({
        zoom: this.state.zoom * 2,
      });
    } else if (zoom === "minus") {
      this.setState({
        zoom: this.state.zoom / 2,
      });
    } else {
      this.setState({
        center: [2.35, 48.85],
        zoom: 1,
      });
    }
  };

  // <----------------------------- FILTERS ------------------------------------>

  changePollutionIndex(button, index) {
    this.setState({
      currentPollutionIndex: index,
    });
    button.active === false ? (button.active = true) : (button.active = false);
    if (button.active === false) {
      this.setState({ currentPollutionIndex: false });
    }
    // Reset other indexes active property
    const otherIndexes = this.state.pollutionButtons.filter(el => el !== button);
    return otherIndexes.map(index => (index.active = false));
  }

  compareAirAverage = marker => {
    const average = this.getAirAverage(marker);
    if (average > 30 && average < 31) {
      return colors.yellow;
    } else if (average < 30) {
      return colors.background;
    } else {
      return colors.red;
    }
  };

  getAirAverage = marker => {
    const indexes = [
      marker.properties.fields["pm10"],
      marker.properties.fields["no2"],
      marker.properties.fields["o3"],
    ];
    return indexes.reduce((total, acc) => total + acc) / indexes.length;
  };

  filterStations = () => {
    const filteredStations = [];
    this.state.stations.objects.stations.geometries.map(station => {
      this.state.activatedFiltersLines.filter(filter => {
        if (station.properties.ligne === filter.line) {
          filteredStations.push(station);
        }
      });
    });
    this.setState({ filteredStations: filteredStations });
  };

  // <----------------------------- RENDER ------------------------------------>

  render() {
    return (
      <MapWrapper>
        <Sidebar
          transports={this.state.underground}
          filters={this.state.filters}
          activatedFiltersLines={this.getPropsLines}
          activatedFiltersCriteria={this.getPropsCriteria}
        />
        <ButtonsMap>
          <ButtonWrapper>
            {this.state.zoomButtons.map(button => (
              <Button
                key={button.icon}
                mapButton={true}
                icon={button.icon}
                iconColor={button.iconColor}
                onClick={() => {
                  this.handleZoom(button.id);
                }}
              />
            ))}
          </ButtonWrapper>
        </ButtonsMap>
        <AllMapOptions>
          {filters[0].active && (
            <ButtonFiltersOptions>
              <h3 className="Button-label">Indices de l'air</h3>
              <ButtonWrapper>
                {this.state.pollutionButtons.map(button => (
                  <Button
                    key={button.index}
                    text={button.text}
                    onClick={() => {
                      this.changePollutionIndex(button, button.index);
                    }}
                    active={button.active}
                    color={colors.secondary}
                  />
                ))}
              </ButtonWrapper>
            </ButtonFiltersOptions>
          )}
          {filters[1].active && (
            <ButtonFiltersOptions>
              <h3 className="Button-label">Trafic</h3>
              <ButtonWrapper>
                {this.state.traficButtons.map(button => (
                  <Button
                    key={button.index}
                    text={button.text}
                    onClick={() => {}}
                    active={button.active}
                    color={colors.secondary}
                  />
                ))}
              </ButtonWrapper>
            </ButtonFiltersOptions>
          )}
          {filters[2].active && (
            <ButtonFiltersOptions>
              <h3 className="Button-label">Toilettes</h3>
              <ButtonWrapper>
                {this.state.toiletsButtons.map(button => (
                  <Button
                    key={button.index}
                    text={button.text}
                    onClick={() => {}}
                    active={button.active}
                    color={colors.secondary}
                  />
                ))}
              </ButtonWrapper>
            </ButtonFiltersOptions>
          )}
          {filters[3].active && (
            <ButtonFiltersOptions>
              <h3 className="Button-label">Accessibilité</h3>
              <ButtonWrapper>
                {this.state.accessibilityButtons.map(button => (
                  <Button
                    key={button.index}
                    text={button.text}
                    onClick={() => {}}
                    active={button.active}
                    color={colors.secondary}
                  />
                ))}
              </ButtonWrapper>
            </ButtonFiltersOptions>
          )}
        </AllMapOptions>
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
                            fill: colors.primary,
                            stroke: colors.secondary,
                            outline: "none",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {filters[0].active && (
                  <Markers>
                    {this.state.pollution.objects.citeair_average.geometries.map((marker, i) => (
                      <Marker
                        key={i}
                        marker={marker}
                        style={{
                          default: {
                            fill: this.compareAirAverage(marker),
                            cursor: "pointer",
                            opacity: 1,
                          },
                          hover: {
                            fill: this.compareAirAverage(marker),
                            cursor: "pointer",
                            opacity: 1,
                          },
                          pressed: {
                            fill: this.compareAirAverage(marker),
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
                            this.state.currentPollutionIndex
                              ? marker.properties.fields[this.state.currentPollutionIndex]
                              : this.getAirAverage(marker)
                          }
                          style={{
                            stroke: this.compareAirAverage(marker),
                            strokeWidth: 1,
                            opacity: 0.7,
                          }}
                        />
                      </Marker>
                    ))}
                  </Markers>
                )}

                <Markers>
                  {(this.state.filteredStations.length > 0
                    ? this.state.filteredStations
                    : this.state.stations.objects.stations.geometries
                  ).map((marker, j) => (
                    <Marker
                      key={j}
                      marker={marker}
                      onMouseEnter={() => {
                        this.showModal(marker);
                      }}
                      onMouseLeave={() => {
                        this.hideModal();
                      }}
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
                          default: { stroke: colors.tertiary, strokeWidth: 4, opacity: 1 },
                          hover: { stroke: colors.text, width: 90, strokeWidth: 9, opacity: 1 },
                          pressed: { stroke: colors.tertiary, strokeWidth: 4, opacity: 0.9 },
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

        {this.state.show && <Modal title={this.state.stationName} />}
      </MapWrapper>
    );
  }
}

export default withRouter(MapComponent);
