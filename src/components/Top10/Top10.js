import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Time from '../Time/Time.js';
import './top10.css';

class Top10 extends React.Component {
	componentWillMount() {
		this.getTop10();
	}

	getTop10() {
		return this.props.activities
			.sort(function(x, y) {
				return x.elapsed_time - y.elapsed_time;
			});
	}

	render () {
		const activities = this.props.activities.map((data, idx) => { 
      return (
      	<TableRow key={idx + 1}>
          <TableRowColumn>{idx + 1}</TableRowColumn>
          <TableRowColumn><Time time={data.elapsed_time}/></TableRowColumn>
          <TableRowColumn><Time time={data.moving_time}/></TableRowColumn>
          <TableRowColumn>{data.start_date}</TableRowColumn>
        </TableRow>
      )
    });

		return (
      <MuiThemeProvider>
	      <Table>
          <TableHeader>
	          <TableRow>
	            <TableHeaderColumn>#</TableHeaderColumn>
	            <TableHeaderColumn>Temps en mouvement</TableHeaderColumn>
	            <TableHeaderColumn>Temps Total</TableHeaderColumn>
	            <TableHeaderColumn>Date</TableHeaderColumn>
	          </TableRow>
	        </TableHeader>
	        <TableBody>
	          {activities}
	        </TableBody>
	      </Table>
      </MuiThemeProvider>
		);
	}
}

export default Top10;