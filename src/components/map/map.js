import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps";
import geography from "scripts/citeair.json";
// import { Motion, spring } from "react-motion";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      center: [0, 0],
      zoom: 1,
      modal: "",
      show: false,
      currentID: undefined,
    };

    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleCityClick = this.handleCityClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  // RENDER

  render() {
    return (
      <MapWrapper>
        <ComposableMap
          projectionConfig={{
            scale: 100000,
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          projection="mercator"
        >
          <ZoomableGroup center={[2.3, 48.85]} zoom={this.state.zoom}>
            <Geographies geography={geography}>
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: "#000",
                        stroke: "#fff",
                        strokeWidth: 1,
                        outline: "none",
                      },
                      hover: {
                        fill: "red",
                        stroke: "#000",
                        strokeWidth: 0.3,
                      },
                      pressed: {
                        fill: "#CEA6E9",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
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
      center: [0, 20],
      zoom: 1,
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
  margin: 0 auto;
`;

export default withRouter(MapComponent);
