import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { colors } from "styles/const";

const WrapperFooter = styled.div`
  z-index: 0;
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

  .MapFooter-allstations {
    width: 80%;
    display: flex;
    justify-content: flex-end;
  }

  .tooltip {
    width: 200px;
    font-size: 1rem;
    text-align: 2.2rem;
    margin-bottom: 1rem;
  }

  .MapFooter-title {
    font-size: 1.4rem;
    color: ${colors.tertiary};
    font-weight: bold;
    width: 12%;
    margin-left: 1rem;
  }

  .bold {
    font-weight: bold;
  }
`;

const WrapperStations = styled.div`
  display: flex;
  width: 50%;
  margin: 0 1rem 0 0;
  justify-content: flex-end;
  .MapFooter-label {
    margin-right: 1rem;
    font-weight: 800;
    font-size: 1.2rem;
    line-height: 25px;
  }
  .MapFooter-station {
    margin: 0 1rem 1rem 0;
    line-height: 25px;
  }
`;

const MapFooter = ({ bestStations, worstStations }) => (
  <WrapperFooter>
    <div className="MapFooter-allstations">
      <span className="MapFooter-title" data-for="quality" data-tip href="#">
        Taux de qualité
      </span>
      <ReactTooltip place="top" type="light" effect="float" id="quality">
        <div className="tooltip">
          Le taux de qualité est calculé selon une moyenne entre la{" "}
          <span className="bold">qualité de l'air</span> de la station, la présence de{" "}
          <span className="bold">toilettes</span> et de{" "}
          <span className="bold">rampe pour l'accessibilité</span> et le{" "}
          <span className="bold">trafic</span>.
        </div>
        <div className="tooltip">
          Ex. une station qui a des toilettes, des rampes et pas beaucoup de trafic ou pollution est
          une station de bonne qualité
        </div>
      </ReactTooltip>
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
    </div>
  </WrapperFooter>
);

export default MapFooter;
