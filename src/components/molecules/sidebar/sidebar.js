import React from "react";
import { SidebarContainer, TransportsContainer, FiltersContainer } from "./style";
import PropTypes from "prop-types";
import { colors } from "styles/const";
import Icon from "components/atoms/icon";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activatedFilters: [],
    };
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton = obj => {
    if (obj.active === false) {
      this.state.activatedFilters.push(obj);
      obj.active = true;
      console.log(true);
      this.setState(
        { activatedFilters: [...this.state.activatedFilters] },
        this.props.activatedFilters(this.state.activatedFilters)
      );
    } else {
      obj.active = false;
      this.state.activatedFilters.splice(obj, 1);
      console.log(this.state.activatedFilters);
      this.setState(
        { activatedFilters: [...this.state.activatedFilters] },
        this.props.activatedFilters(this.state.activatedFilters)
      );
    }
  };

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
                className={`Transport-icon ${transport.active ? "" : "disable"}`}
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
                className={` Filter-icon ${filter.active ? "" : "disable"}`}
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
}

Sidebar.propTypes = {
  title: PropTypes.string,
  transport: PropTypes.array,
  filter: PropTypes.array,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default Sidebar;
