import React from "react";
import styled from "styled-components";

import { colors } from "styles/const";

const WrapperFooter = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  background: ${colors.primary};
  position: absolute;
  color: ${colors.text};
  top: 90vh;
  border-top: 1px solid ${colors.background};
  padding: 0.5rem;
`;

const WrapperStations = styled.div`
  display: flex;
  margin: 0 10rem 0 6rem;
  .MapFooter-label {
    margin-right: 2rem;
    font-weight: 800;
    font-size: 1.3rem;
  }
  .MapFooter-station {
    margin-right: 1rem;
    line-height: 25px;
  }
`;

const MapFooter = ({ bestStations, worstStations }) => (
  <WrapperFooter>
    <WrapperStations>
      <div className="MapFooter-label">Meilleures stations</div>
      {bestStations.map(station => (
        <div key={station.name} className="MapFooter-station">
          {station.name}: {station.quality} %
        </div>
      ))}
    </WrapperStations>
    <WrapperStations>
      <div className="MapFooter-label">Pires stations</div>
      {worstStations.map(station => (
        <div key={station.name} className="MapFooter-station">
          {station.name}: {station.quality} %
        </div>
      ))}
    </WrapperStations>
  </WrapperFooter>
);

export default MapFooter;
