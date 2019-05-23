import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { colors } from "styles/const";
import Button from "components/atoms/button";
import Modal from "components/molecules/modal";
import Icon from "components/atoms/icon";
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
import stations from "scripts/getAllStation.json";
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
const apiURL = "http://127.0.0.1:8000/api/stations";
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
      stationLines: [],
      stationPlace: "",
      currentPollutionIndex: "",
      currentToiletsIndex: "",
      currentAccessIndex: "",
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

  /* componentDidMount() {
    this.getAPI();
  }
  */

  getPropsLines = props => {
    this.setState({ activatedFiltersLines: props }, () => {
      this.filterStations();
    });
  };

  getPropsCriteria = props => {
    this.setState({ activatedFiltersCriteria: props });
  };

  /*getAPI = async () => {
    const stationsResponse = await fetch(apiURL);
    const { stations } = await stationsResponse.json();
    console.log(stationsResponse);

    //this.setState({ stations });
  };*/

  // <----------------------------- MODAL HANDLER ------------------------------------>

  showModal = marker => {
    if (marker.trafic.length > 0) {
      const lines = [
        marker.trafic[0].correspondance1,
        marker.trafic[0].correspondance2,
        marker.trafic[0].correspondance3,
        marker.trafic[0].correspondance4,
        marker.trafic[0].correspondance5,
      ];
      const newLines = lines.filter(line => line != "");
      const linesIcons = newLines.map(line => {
        if (marker.mode === "Metro") {
          return `M_${line}`;
        }
        if (marker.mode === "RER") {
          return `RER_${line}`;
        }
      });
      this.setState({
        show: true,
        stationName: marker.nomGare,
        stationLines: linesIcons,
        stationPlace: marker.trafic[0].ville,
      });
    } else {
      const lines = [marker.indiceLig];
      const linesIcons = lines.map(line => {
        if (marker.mode === "Metro") {
          return `M_${line}`;
        }
        if (marker.mode === "RER") {
          return `RER_${line}`;
        }
      });
      this.setState({
        show: true,
        stationName: marker.nomGare,
        stationLines: linesIcons,
        stationPlace: "",
      });
    }
  };

  hideModal = () => {
    this.setState({ show: false, stationName: "", stationLines: [], stationPlace: "" });
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

  filterByCategory = (button, index, currentFilter, buttonsOptions) => {
    this.setState({
      [currentFilter]: index,
    });

    button.active === false ? (button.active = true) : (button.active = false);
    if (button.active === false) {
      this.setState({ [currentFilter]: false });
    }
    // Reset other indexes active property
    const otherIndexes = buttonsOptions.filter(el => el !== button);
    return otherIndexes.map(index => (index.active = false));
  };

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
    this.state.stations.stations.map(station => {
      this.state.activatedFiltersLines.filter(filter => {
        if (station.ligne === filter.line) {
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
                    value={"currentPollutionIndex"}
                    onClick={() => {
                      this.filterByCategory(
                        button,
                        button.index,
                        "currentPollutionIndex",
                        this.state.pollutionButtons
                      );
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
                    value={"currentToiletsIndex"}
                    onClick={() => {
                      this.filterByCategory(
                        button,
                        button.index,
                        "currentToiletsIndex",
                        this.state.toiletsButtons
                      );
                    }}
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
                    value={"currentAccessIndex"}
                    onClick={() => {
                      this.filterByCategory(
                        button,
                        button.index,
                        "currentAccessIndex",
                        this.state.accessibilityButtons
                      );
                    }}
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
                {filters[1].active && (
                  <Markers>
                    {(this.state.filteredStations.length > 0
                      ? this.state.filteredStations
                      : this.state.stations.stations
                    ).map((marker, j) => (
                      <Marker
                        key={j}
                        marker={marker}
                        style={{
                          default: {
                            fill:
                              marker.trafic.length > 0 && marker.trafic[0].trafic > 4000000
                                ? colors.red
                                : colors.secondary,
                            cursor: "pointer",
                          },
                          hover: {
                            fill:
                              marker.trafic.length > 0 && marker.trafic[0].trafic > 4000000
                                ? colors.red
                                : colors.secondary,
                            cursor: "pointer",
                            outline: "none",
                          },
                          pressed: {
                            fill:
                              marker.trafic.length > 0 && marker.trafic[0].trafic > 4000000
                                ? colors.red
                                : colors.secondaryry,
                            cursor: "pointer",
                            outline: "none",
                          },
                        }}
                      >
                        <circle
                          cx={0}
                          cy={0}
                          r={marker.trafic.length > 0 && marker.trafic[0].trafic / 150000}
                          style={{
                            stroke:
                              marker.trafic.length > 0 && marker.trafic[0].trafic > 4000000
                                ? colors.red
                                : colors.secondary,
                            strokeWidth: 1,
                            opacity: 0.7,
                          }}
                        />
                      </Marker>
                    ))}
                  </Markers>
                )}
                {filters[2].active && (
                  <Markers>
                    {(this.state.filteredStations.length > 0
                      ? this.state.filteredStations
                      : this.state.stations.stations
                    ).map((marker, j) => (
                      <Marker
                        key={j}
                        marker={marker}
                        style={{
                          default: { fill: colors.tertiary, cursor: "pointer" },
                          hover: { fill: colors.text, cursor: "pointer", outline: "none" },
                          pressed: { fill: "#FFFFFF", cursor: "pointer", outline: "none" },
                        }}
                      >
                        {marker.sanitaire.length > 0 && !this.state.currentToiletsIndex && (
                          <Icon color={colors.text} icon="toilets" size={40} alt="" />
                        )}
                        {marker.sanitaire.length > 0 &&
                          marker.sanitaire[0].tarifGratuitPayant === "gratuit" &&
                          this.state.currentToiletsIndex === "gratuit" && (
                            <Icon color={colors.text} icon="free" size={40} alt="" />
                          )}
                        {marker.sanitaire.length > 0 &&
                          marker.sanitaire[0].tarifGratuitPayant === "payant" &&
                          this.state.currentToiletsIndex === "payant" && (
                            <Icon color={colors.text} icon="euro" size={40} alt="" />
                          )}
                        {marker.sanitaire.length > 0 &&
                          marker.sanitaire[0].accesBoutonpoussoir === "oui" &&
                          this.state.currentToiletsIndex === "accesBoutonpoussoir" && (
                            <Icon color={colors.text} icon="button" size={40} alt="" />
                          )}
                      </Marker>
                    ))}
                  </Markers>
                )}
                {filters[3].active && (
                  <Markers>
                    {(this.state.filteredStations.length > 0
                      ? this.state.filteredStations
                      : this.state.stations.stations
                    ).map((marker, j) => (
                      <Marker
                        key={j}
                        marker={marker}
                        style={{
                          default: { fill: colors.tertiary, cursor: "pointer" },
                          hover: { fill: colors.text, cursor: "pointer", outline: "none" },
                          pressed: { fill: "#FFFFFF", cursor: "pointer", outline: "none" },
                        }}
                      >
                        {marker.access.length > 0 && !this.state.currentAccessIndex && (
                          <Icon color={colors.text} icon="wheelchair" size={40} alt="" />
                        )}
                        {marker.access.length > 0 &&
                          marker.access[0].pmr === 1 &&
                          this.state.currentAccessIndex === "pmr" && (
                            <Icon color={colors.text} icon="pmr" size={40} alt="" />
                          )}
                        {marker.access.length > 0 &&
                          marker.access[0].ufr === 1 &&
                          this.state.currentAccessIndex === "ufr" && (
                            <Icon color={colors.text} icon="wheelchair" size={40} alt="" />
                          )}
                        {marker.access.length > 0 &&
                          marker.access[0].annonceSonoreProchainPassage === 1 &&
                          this.state.currentAccessIndex === "annonceSonoreProchainPassage" && (
                            <Icon color={colors.text} icon="ear" size={40} alt="" />
                          )}
                        {marker.access.length > 0 &&
                          marker.access[0].annonceVisuelleProchainPassage === 1 &&
                          this.state.currentAccessIndex === "annonceVisuelleProchainPassage" && (
                            <Icon color={colors.text} icon="eye" size={40} alt="" />
                          )}
                      </Marker>
                    ))}
                  </Markers>
                )}

                <Markers>
                  {(this.state.filteredStations.length > 0
                    ? this.state.filteredStations
                    : this.state.stations.stations
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

        {this.state.show && (
          <Modal
            title={this.state.stationName}
            lines={this.state.stationLines}
            place={this.state.stationPlace}
          />
        )}
      </MapWrapper>
    );
  }
}

export default withRouter(MapComponent);
