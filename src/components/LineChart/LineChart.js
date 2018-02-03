import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import './lineChart.css';

const settings = {
  width: 500,
  height: 300,
  padding: 30,
  numDataPoints: 50,
  maxRange: () => Math.random() * 1000
};

class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();  
  }
  
  componentDidUpdate() {
    this.renderAxis();
  }
  
  renderAxis() {
    const node = ReactDOM.findDOMNode(this.refs.axisContainer);
    const axis = d3.svg.axis()
      .orient(this.props.orient)
      .ticks(5)
      .scale(this.props.scale);
    
    d3.select(node).call(axis);
  }
  
  render() {
    return <g className="axis" ref="axisContainer" transform={this.props.translate} />
  }
}

class XYAxis extends React.Component {
  render() {
    return (
      <g className="xy-axis">
        <Axis
          translate={`translate(0, ${this.props.height - this.props.padding})`}
          scale={this.props.xScale}
          orient="bottom"
        />
        <Axis
          translate={`translate(${this.props.padding}, 0)`}
          scale={this.props.xScale}
          orient="left"
        />
      </g>
    );
  }
}

class DataCircles extends React.Component {
  renderCircle(coords) {
    return (
      <circle
       cx={this.props.xScale(coords[0])}
       cy={this.props.yScale(coords[1])}
       r={5}
       key={Math.random() * 1}
      />
    );
  }
  
  render() {
    return <g>{this.props.data.map(this.renderCircle.bind(this))}</g>
  }
}

class ScatterPlot extends React.Component {
  getXScale() {
    const xMax = d3.max(this.props.data, (d) => d[0]);
    console.log(xMax);

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

export default class AppChart extends React.Component {
  componentWillMount() {
    this.randomizeData();
  }
  
  randomizeData() {    
    const randomData = d3.range(settings.numDataPoints).map(() => {
      return [Math.floor(Math.random() * settings.maxRange()),  Math.floor(Math.random() * settings.maxRange())];
    });
    this.setState({ data: randomData });
  }
  
  render() {
    return (
      <div className='LineChart'>
        <h1>React and D3 are Friends</h1>
        <ScatterPlot data={this.state.data} {...settings} />
        <div className="controls">
          <button className="btn randomize" onClick={this.randomizeData.bind(this)}>Randomize Data</button>
        </div>
      </div>
    );
  }
}
