import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps";
import geography from "../../scripts/citeair.json";
import { Motion, spring } from "react-motion";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      center: [0, 0],
      zoom: 0,
      modal: "",
      show: false,
      currentID: undefined,
    };

    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleCityClick = this.handleCityClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    for (let i = 0; i < document.querySelectorAll(".rsm-marker").length; i++) {
      document.querySelectorAll(".rsm-marker")[i].setAttribute("data-id", i);
      document.querySelectorAll(".rsm-marker")[i].addEventListener("mouseover", e => {
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
                scale: 250,
              }}
              width={1200}
              height={800}
              projection="robinson"
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}>
                <Geographies geography={geography}>
                  {(geographies, projection) =>
                    geographies.map(geography => (
                      <Geography
                        key={geography.properties.commune.concat("-", geography.properties.date)}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#000",
                            stroke: "#000",
                            strokeWidth: 1,
                            outline: "none",
                          },
                          hover: {
                            fill: "#000",
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
          )}
        </Motion>
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
`;

export default withRouter(MapComponent);
