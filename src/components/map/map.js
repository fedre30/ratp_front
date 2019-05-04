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
import underground from "scripts/underground";
import filters from "scripts/criteria";
import pollutionButtons from "scripts/pollutionButtons";
import { MapWrapper, ButtonsMap, ButtonFiltersOptions, ButtonWrapper } from "./style";
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
      underground: underground,
      filters: filters,
      activatedFilters: [],
      filteredStations: [],
      active: false,
    };

    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleCityClick = this.handleCityClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  getProps = props => {
    this.setState({ activatedFilters: props }, () => {
      this.filterStations();
    });
  };

  // <----------------------------- MODAL HANDLER ------------------------------------>

  showModal = marker => {
    this.setState({ show: true, stationName: marker.properties.nom_gare });
  };

  hideModal = () => {
    this.setState({ show: false, stationName: "" });
  };

  // <----------------------------- MAP METHODS ------------------------------------>

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
      this.state.activatedFilters.filter(filter => {
        if (station.properties.ligne === filter.line) {
          filteredStations.push(station);
        }
      });
    });
    console.log(filteredStations);
    this.setState({ filteredStations: filteredStations });
  };

  // <----------------------------- RENDER ------------------------------------>

  render() {
    return (
      <MapWrapper>
        <Sidebar
          transports={this.state.underground}
          filters={this.state.filters}
          activatedFilters={this.getProps}
          /* onClick={this.filterStations}*/
        />
        <ButtonsMap>
          <ButtonWrapper>
            <Button
              mapButton={true}
              icon="zoomIn"
              iconColor={colors.primary}
              onClick={this.handleZoomIn}
            />
            <Button
              mapButton={true}
              icon="zoomOut"
              iconColor={colors.primary}
              onClick={this.handleZoomOut}
            />
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
                          pressed: { fill: colors.secondary, outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
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
