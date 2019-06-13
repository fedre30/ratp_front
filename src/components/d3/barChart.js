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
    const dataValue = this.props.data.map(v => v.value);
    const dataText = this.props.data.map(v => v.text);
    const dataMax = d3.max(dataValue);

    const xScale = d3
      .scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);

    d3.select(node)
      .selectAll("rect")
      .data(dataValue)
      .enter()
      .append("rect");

    d3.select(node)
      .selectAll("text")
      .data(dataValue)
      .enter()
      .append("text");

    d3.select(node)
      .selectAll("rect")
      .data(dataValue)
      .exit()
      .remove();

    d3.select(node)
      .selectAll("rect")
      .data(dataValue)
      .style("fill", (d, i) => (d % i === 0 ? "#3B3F6C" : "#A4CBD8  "))
      .attr("y", (d, i) => i * 50)
      .attr("x", 0)
      .attr("width", d => xScale(d))
      .attr("height", 50);

    d3.select(node)
      .selectAll("text")
      .text((d, i) => dataValue[i] + " " + dataText[i])
      .style("fill", "#fff")
      .attr("dy", (d, i) => (i + 1) * 40)
      .attr("dx", d => this.props.size[3] - xScale(d) / 2);
  };
  render() {
    return <svg ref={node => (this.node = node)} width={800} height={200} />;
  }
}
export default BarChart;
