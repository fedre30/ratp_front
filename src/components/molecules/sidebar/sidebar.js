import React from "react";
import { SidebarContainer, TransportsContainer, FiltersContainer } from "./style";
import PropTypes from "prop-types";
import { colors } from "styles/const";
import Icon from "components/atoms/icon";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activatedFiltersLines: [],
      activatedFiltersCriteria: [],
    };
  }

  handleButton = obj => {
    if (obj.active === false) {
      obj.active = true;
      const activatedFiltersLines = [...this.state.activatedFiltersLines];
      activatedFiltersLines.push(obj);
      this.setState(
        {
          activatedFiltersLines: activatedFiltersLines,
        },
        this.props.activatedFiltersLines(activatedFiltersLines)
      );
    } else {
      obj.active = false;
      const activatedFiltersLines = this.state.activatedFiltersLines.filter(f => f !== obj);
      this.setState(
        {
          activatedFiltersLines,
        },
        this.props.activatedFiltersLines(activatedFiltersLines)
      );
    }
  };

  singleFilter = obj => {
    if (obj.active === false) {
      obj.active = true;
      const otherFilters = this.props.filters.filter(filter => filter !== obj);
      const finalArray = otherFilters.map(f => (f.active = false));
      this.setState(
        {
          activatedFiltersCriteria: finalArray,
        },
        this.props.activatedFiltersCriteria(finalArray)
      );
    }
  };

  render() {
    return (
      <SidebarContainer>
        <TransportsContainer>
          <h3 className="Section-label"> Filtrer par ligne métro / RER </h3>{" "}
          <div className="Transport-icons-container">
            {" "}
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
            ))}{" "}
          </div>{" "}
        </TransportsContainer>{" "}
        <FiltersContainer>
          <h3 className="Section-label"> Filtrer par critères </h3>{" "}
          {this.props.filters.map(filter => (
            <div
              key={filter.id}
              className="Filter-wrapper"
              onClick={() => this.singleFilter(filter)}
            >
              <div className={` Filter-icon ${filter.active ? "" : "disable"}`}>
                <Icon color={colors.text} icon={filter.icon} alt="" />
              </div>{" "}
              <div className="Filter-label"> {filter.label} </div>{" "}
            </div>
          ))}{" "}
        </FiltersContainer>{" "}
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
