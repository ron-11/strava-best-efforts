import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Moment from 'moment';
import Time from '../Time/Time.js';
import FiberManualRecord from 'material-ui-icons/FiberManualRecord';
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

		this.addGoldMedal(efforts);
		this.addSilverMedal(efforts);
		this.addBronzeMedal(efforts);

    this.setState({ efforts: efforts });
	}

	addGoldMedal(data) {
		if (data[0]) {
			return data[0].medal = 'gold';
		}
	}

	addSilverMedal(data) {
		if (data[1]) {
			return data[1].medal = 'silver';
		}
	}

	addBronzeMedal(data) {
		if (data[2]) {
			return data[2].medal = 'bronze';
		}
	}

	render () {
		const default_style = {
		  height: 30
		};

		const medal_style = {
			height: 40,
		  fontWeight: 'bold'
		};


		function WhichColor(medal) {
			const goldMedal = '#fec835';
			const silverMedal = '#999999'
			const bronzeMedal = '#e5820a';

			switch (medal) {
				case 'gold':
					return {color: goldMedal, fontSize: '16px'};

				case 'silver': 
					return {color: silverMedal, fontSize: '16px'};

				case 'bronze': 
					return {color: bronzeMedal, fontSize: '16px'};
			}
		}

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
	          { this.state.efforts.map((data, idx) => {
	          	if (data.medal) {
	          		return (
	          			<TableRow key={idx + 1} style={medal_style}>
					          <TableCell style={WhichColor(data.medal)}>
								      <FiberManualRecord />
					          </TableCell>

					          <TableCell style={WhichColor(data.medal)}>
					          	<Time time={data.elapsed_time}/>
					          </TableCell>
					          
					          <TableCell style={WhichColor(data.medal)}>
					          	{ Moment(data.start_date).format('DD/MM/YYYY') }
					          </TableCell>
					        </TableRow>
	          		);
	          	}
	          	else {
		          	return (
		          		<TableRow key={idx + 1} style={default_style}>
					          <TableCell>{idx + 1}</TableCell>

					          <TableCell>
					          	<Time time={data.elapsed_time}/>
					          </TableCell>
					          
					          <TableCell>
					          	{ Moment(data.start_date).format('DD/MM/YYYY') }
					          </TableCell>
					        </TableRow>
					      );
					    }
	          }) }
	        </TableBody>
	      </Table>
      </Paper>
		);
	}
}

export default Top10;