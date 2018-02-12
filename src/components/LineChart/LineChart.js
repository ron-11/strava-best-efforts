import React from 'react';
import * as d3 from 'd3';
import ScatterPlot from './ScatterPlot.js';
import './lineChart.css';

const settings = {
  width: 300,
  height: 300,
  padding: 30,
  numDataPoints: 50,
  maxRange: () => Math.random() * 1000
};

class LineChart extends React.Component {
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
        <ScatterPlot data={this.state.data} {...settings} />
        <div className="controls">
          <button className="btn randomize" onClick={this.randomizeData.bind(this)}>Randomize Data</button>
        </div>
      </div>
    );
  }
}

export default LineChart;