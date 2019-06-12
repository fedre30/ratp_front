import React from "react";

import * as d3 from "d3";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart = () => {
    const node = this.node;
    const dataMax = d3.max(i => this.props.data[i]);

    const xScale = d3
      .scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);

    d3.select(node)
      .selectAll("rect")
      .data(i => this.props.data[i])
      .enter()
      .append("rect");

    d3.select(node)
      .selectAll("text")
      .data(i => this.props.data[i])
      .enter()
      .append("text");

    d3.select(node)
      .selectAll("rect")
      .data(i => this.props.data[i])
      .exit()
      .remove();

    d3.select(node)
      .selectAll("rect")
      .data(i => this.props.data[i])
      .style("fill", (d, i) => (d % i === 0 ? "#3B3F6C" : "#A4CBD8  "))
      .attr("y", (d, i) => i * 50)
      .attr("x", 0)
      .attr("width", d => xScale(d))
      .attr("height", 50);

    d3.select(node)
      .selectAll("text")
      .text("hello")
      .style("fill", "#fff")
      .attr("dy", (d, i) => (i + 1) * 25);
  };
  render() {
    console.log(this.props.data[0].value);
    return <svg ref={node => (this.node = node)} width={500} height={500} />;
  }
}
export default BarChart;
