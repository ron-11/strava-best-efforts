import React from 'react';
import * as d3 from 'd3';

class GraphPoints extends React.Component {
	constructor(props){
	  super(props)
	  this.createScatterPlotChart = this.createScatterPlotChart.bind(this)
	 }

 	componentDidMount() {
    this.createScatterPlotChart()
 	}

 	componentDidUpdate() {
    this.createScatterPlotChart()
 	}

 	createScatterPlotChart() {
    const node = this.node;

    const xScale = d3.scaleTime()
    	.range([0, this.props.width])
    	.domain(
    		d3.extent(this.props.data, function(d) {
    			return d.x;
    		})
    	);

    const yScale = d3.scaleLinear()
         .domain([0, 300])
         .range([0, this.props.height])


    d3.select(node)
    	.selectAll("circle")
			.data(this.props.data)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				console.log(d);
				return xScale(d.x);
			})
			.attr("cy", function(d) {
				return yScale(d.y);
			})
			.attr("r", 3)
			.style('fill', 'none')
			.style('stroke', 'grey')
			.style('stroke-width', '2px');
  }

	render() {

		return (
			<svg ref={node => this.node = node} width={this.props.width} height={this.props.height}>
      </svg>
		);
	}
}

export default GraphPoints;