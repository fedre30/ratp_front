import React from "react";
import * as d3 from "d3";
import _ from "lodash";

class BubbleChart extends React.Component {
  static defaultProps = {
    data: [],
    useLabels: false,
    width: 300,
    height: 300,
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

      this.maxValue = 50;

      this.simulatePositions(this.props.data);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .range([1, 50])
      .domain([this.minValue, this.maxValue]);

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
          this.setState({ data });
        }
      });
  };

  renderBubbles = data => {
    const minValue = 55;

    const maxValue = 60;

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      .range(["red", "pink"]);

    // render simple circle element
    if (!this.props.useLabels) {
      const circles = _.map(data, (item, index) => {
        return (
          <circle
            key={index}
            r={this.radiusScale(item.v)}
            cx={item.x}
            cy={item.y}
            fill={color(item.v)}
          />
        );
      });

      return (
        <g transform={`translate(${this.props.width / 2}, ${this.props.height / 2})`}>{circles}</g>
      );
    }

    // render circle and text elements inside a group
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
            {item.v}
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
          {this.renderBubbles(this.state.data)}
        </svg>
      );
    }

    return <div>Loading</div>;
  }
}

export default BubbleChart;
