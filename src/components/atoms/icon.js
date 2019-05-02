import React from "react";
import PropTypes from "prop-types";
import icons from "images/icons/icons";

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeElement: this.props.size,
    };
  }

  render() {
    return (
      <svg
        style={{
          fill: this.props.color,
          maxWidth: "999px",
          ...this.props.style,
        }}
        width={this.state.sizeElement}
        height={this.state.sizeElement}
        viewBox={icons[this.props.icon].viewBox}
      >
        {icons[this.props.icon].path.map((path, index) => {
          const style = icons[this.props.icon].style ? icons[this.props.icon].style(index) : {};
          return <path style={style} d={path} key={index} />;
        })}
      </svg>
    );
  }
}

Icon.defaultProps = {
  isVisible: true,
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  viewBox: PropTypes.string,
  mobileSize: PropTypes.number,
  isVisible: PropTypes.bool,
};

export default Icon;
