import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors, font } from "styles/const";
import Icon from "components/atoms/icon";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activatedFilters: [],
    };
    this.handleButton = this.handleButton.bind(this);
  }

  render() {
    return (
      <SidebarContainer>
        <TransportsContainer>
          <h3 className="Section-label">Listes des métro / RER</h3>
          <div className="Transport-icons-container">
            {this.props.transports.map(transport => (
              <div
                key={transport.id}
                onClick={() => {
                  this.handleButton(transport);
                }}
                className={`Transport-icon ${
                  this.state.activatedFilters.filter(e => e === transport).length > 0
                    ? ""
                    : "disable"
                }`}
              >
                <img src={transport.src} alt="" />
              </div>
            ))}
          </div>
        </TransportsContainer>
        <FiltersContainer>
          <h3 className="Section-label">Filtrer par critères</h3>
          {this.props.filters.map(filter => (
            <div key={filter.id} className="Filter-wrapper">
              <div
                onClick={() => this.handleButton(filter)}
                className={` Filter-icon ${
                  this.state.activatedFilters.filter(e => e === filter).length > 0 ? "" : "disable"
                }`}
              >
                <Icon color={colors.text} icon={filter.icon} alt="" />
              </div>
              <div className="Filter-label">{filter.label}</div>
            </div>
          ))}
        </FiltersContainer>
      </SidebarContainer>
    );
  }

  handleButton = obj => {
    this.state.activatedFilters.push(obj);
    this.props.test(this.state.activatedFilters);
  };
}

Sidebar.propTypes = {
  title: PropTypes.string,
  transport: PropTypes.array,
  filter: PropTypes.array,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

const SidebarContainer = styled.div`
  width: 20%;
  height: 100vh;
  background: linear-gradient(197.74deg, #ffffff 1.38%, #d1e5ec 100%);
  position: absolute;
  left: 0;
  top: 0;
  padding: 2vh 1rem 1rem 1rem;

  .Section-label {
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
    color: ${colors.primary};
    margin-bottom: 2rem;
  }
`;

const TransportsContainer = styled.div`
  width: 85%;
  margin: 3rem auto;

  .Transport-icons-container {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
  }

  .Transport-icon {
    width: 3rem;
    margin: 1rem 2rem 1rem 0;
    cursor: pointer;
    img {
      width: 100%;
    }
  }

  .disable {
    opacity: 0.3;
  }
`;

const FiltersContainer = styled.div`
  width: 90%;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  
  .Filter-wrapper {
    height: auto;
    display: flex;
    align-items: center;
    
  }
  
  .Filter-label {
    color: ${colors.primary}
    font-size: 1.2rem;
    font-weight: ${font.weight.bolder};
    margin-bottom: 1rem;
  
  }
 
  
  .Filter-icon {
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    background: ${colors.primary};
    border-radius: 0.2rem;
    margin: 1rem 1.5rem 2rem 0;
  }
  
  .disable {
    background: ${colors.grey};
  }
 
`;

export default Sidebar;
