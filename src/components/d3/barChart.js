import React from "react";

import * as d3 from "d3";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart() {
    const node = this.node;
    const dataMax = d3.max(this.props.data);
    const xScale = d3
      .scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);
    d3.select(node)
      .selectAll("rect")
      .data(this.props.data)
      .enter()
      .append("rect");

    d3.select(node)
      .selectAll("rect")
      .data(this.props.data)
      .exit()
      .remove();

    d3.select(node)
      .selectAll("rect")
      .data(this.props.data)
      .style("fill", "#fe9922")
      .attr("y", (d, i) => i * 25)
      .attr("x", d => this.props.size[1] - xScale(d))
      .attr("width", d => xScale(d))
      .attr("height", 25);
  }
  render() {
    return <svg ref={node => (this.node = node)} width={500} height={500} />;
  }
}
export default BarChart;
