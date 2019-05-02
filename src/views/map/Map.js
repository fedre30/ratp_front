import React from "react";
import styled from "styled-components";
import MapComponent from "components/map/map";
import { Header } from "components/molecules";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
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
    <Header subTitle />
    <MapComponent />
  </MapContainer>
);
export default Map;
