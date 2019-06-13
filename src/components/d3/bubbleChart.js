import React from "react";
import * as d3 from "d3";
import _ from "lodash";

class BubbleChart extends React.Component {
  static defaultProps = {
    data: [],
    useLabels: false,
    width: 800,
    height: 550,
  };

  constructor(props) {
    super(props);

    this.minValue = 1;
    this.maxValue = 100;
    this.mounted = false;

    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.minValue = 50;

      this.maxValue = 200;

      this.simulatePositions(this.props.data);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .domain([this.minValue, this.maxValue])
      .range([150, 250]);

    return fx(value);
  };

  simulatePositions = data => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.5)
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05))
      .force(
        "collide",
        d3.forceCollide(d => {
          return this.radiusScale(d.v) + 2;
        })
      )
      .on("tick", () => {
        if (this.mounted) {
          this.setState({
            data,
          });
        }
      });
  };

  renderBubbles = data => {
    const minValue = 15;

    const maxValue = 36;

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      .range(["pink", "red"]);

    const texts = _.map(data, (item, index) => {
      const props = this.props;
      const fontSize = this.radiusScale(item.v) / 2;
      return (
        <g
          key={index}
          transform={`translate(${props.width / 2 + item.x}, ${props.height / 2 + item.y})`}
        >
          <circle r={this.radiusScale(item.v)} fill={color(item.v)} />
          <text dy="6" fill="#fff" textAnchor="middle" fontSize={`${fontSize}px`} fontWeight="bold">
            {" "}
            {item.v}{" "}
          </text>{" "}
          <text dy="50" dx="-20" fontSize="1.2rem" fill="#fff">
            {item.text}
          </text>
        </g>
      );
    });

    return texts;
  };

  render() {
    if (this.state.data.length) {
      return (
        <svg width={this.props.width} height={this.props.height}>
          {" "}
          {this.renderBubbles(this.state.data)}{" "}
        </svg>
      );
    }

    return <div> Loading </div>;
  }
}

export default BubbleChart;
