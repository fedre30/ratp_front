import React from "react";
import styled from "styled-components";
import MapComponent from "../../components/map/map";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .Map-title {
    font-size: 3rem;
    text-align: center;
    margin: 2rem 0;
    font-weight: 900;
  }
  a {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Map = () => (
  <MapContainer>
    <h1 className="Map-title">Les Stations</h1>
    <MapComponent />
  </MapContainer>
);
export default Map;
