import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Moment from 'moment';
import Time from '../Time/Time.js';
import './top10.css';

class Top10 extends React.Component {
	componentWillMount() {
		this.getTop10();
	}

	getTop10() {
		const efforts = this.props.activities
			.sort(function(x, y) {
				return x.elapsed_time - y.elapsed_time;
			})
			.slice(0,10);

    this.setState({ efforts: efforts });
	}

	render () {
		const style = {
		  height: 30
		};

		Moment.locale('fr');

		return (
      <Paper>
	      <Table>
          <TableHead>
	          <TableRow>
	            <TableCell>#</TableCell>
	            <TableCell>Temps</TableCell>
	            <TableCell>Date</TableCell>
	          </TableRow>
	        </TableHead>
	        <TableBody>
	          {this.state.efforts.map((data, idx) => { 
	          	return (
	          		<TableRow key={idx + 1} style={style}>
				          <TableCell>{idx + 1}</TableCell>

				          <TableCell>
				          	<Time time={data.elapsed_time}/>
				          </TableCell>
				          
				          <TableCell>
				          	{Moment(data.start_date).format('DD/MM/YYYY')}
				          </TableCell>
				        </TableRow>
				      );
	          })}
	        </TableBody>
	      </Table>
      </Paper>
		);
	}
}

export default Top10;