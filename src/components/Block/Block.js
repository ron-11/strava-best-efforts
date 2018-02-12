import React from 'react';
import * as firebase from 'firebase';
import { Row, Col } from 'react-grid-system';
import { ScatterplotChart } from 'react-easy-chart';
import Top10 from '../Top10/Top10.js';
import moment from 'moment';

class Block extends React.Component {
	constructor () {
		super()
		this.state = {
			efforts: [],
			isLoading: true
		}
	}

	componentWillMount() {
		this.getBestEfforts(this.props.distance);
	}

	getBestEfforts(distance) {
		const ref = firebase.database().ref('best_efforts_'+ distance)

		ref.once('value', snapshot => {
			var efforts = [];

			snapshot.forEach(function(data) {
				var effort = {
					id: data.val().activity,
					moving_time: data.val().moving_time,
					elapsed_time: data.val().elapsed_time,
					start_date: new Date(data.val().start_date)
				}
				efforts.push(effort);
			})

			return this.setState({
				efforts: efforts,
				isLoading: false
			});
		})
	}

	render() {
		if (this.state.isLoading) {
			return <p>Chargement ...</p>
		}

		const activities = this.state.efforts;
		let min_value = null;
		let max_value = null;

		const scatterplot_data = activities.map(function(value, key) {
			if (value.elapsed_time < min_value || min_value === null) {
				min_value = value.elapsed_time;
			}
			if (max_value < value.elapsed_time || max_value === null) {
				max_value = value.elapsed_time;
			}

		  return {
		  	x: moment(value.start_date).format('DD-MMM-YY'),
		  	y: value.elapsed_time
		 	};
		});

		return (
			<div>
				<h2>{this.props.distance}</h2>
				<Row>
			    <Col sm={7}>
			    	<ScatterplotChart
					    data={scatterplot_data}
					    axes
					    width={750}
					    height={400}
					    dotRadius={4}
	    				xType="time"
	    				yDomainRange={[max_value, min_value]} />
			    </Col>
			    <Col sm={5}>
						<Top10 activities={this.state.efforts}/>
			    </Col>
			  </Row>
			</div>
		);
	}
}

export default Block;