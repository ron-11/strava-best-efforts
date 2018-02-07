import React from 'react';
import DataCircles from './DataCircles.js';
import XYAxis from './XYAxis.js';
import * as d3 from 'd3';

class ScatterPlot extends React.Component {
  getXScale() {
    const xMax = d3.max(this.props.data, (d) => d[0]);

    return d3.scale.linear()
      .domain([0, xMax])
      .range([this.props.padding, (this.props.width - this.props.padding * 2)]);
  }
  
  getYScale() {
    const yMax = d3.max(this.props.data, (d) => d[1]);
    
    return d3.scale.linear()
      .domain([0, yMax])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }
  
  render() {
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    
    return (
      <svg width={this.props.width} height={this.props.height}>
        <DataCircles xScale={xScale} yScale={yScale} {...this.props} />
        <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
      </svg>
    );
  }
}

export default ScatterPlot;