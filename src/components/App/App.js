import React from 'react';
import LineChart from '../LineChart/LineChart.js';
import Top10 from '../Top10/Top10.js';
import * as firebase from 'firebase';
import config from '../../config';
import { Container, Row, Col } from 'react-grid-system';
import './app.css';

class App extends React.Component {
	constructor () {
		super()
		firebase.initializeApp(config)
		this.state = {
			isLoading: true
		}
	}

	componentWillMount() {
		this.getBestEfforts('10000m');
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
					start_date: data.val().start_date
				}
				efforts.push(effort);
			})
			
			return this.setState({
				efforts: efforts,
				isLoading: false
			});
		})
	}

	Allure(number) {
		let hours, minutes, seconds;
		
		hours = Math.trunc(number/3600);
		minutes = Math.trunc(number/60) - hours*60;
		seconds = number - minutes*60 - hours*3600;

		if (seconds < 10) {	seconds = '0' + seconds; }
		if (minutes < 10 && hours > 0) { minutes = '0' + minutes; }

		if (hours === 0) { return minutes + ':' + seconds; }
		else { return hours + ':' + minutes + ':' + seconds; }
	}

	triCroissant(x, y) {
		return x - y;
	}

	triDecroissant(x, y) {
		return y - x;
	}

	render () {
		if (this.state.isLoading) {
			return <h1>Chargement ...</h1>
		}

		const activities = this.state.efforts.map(
			(activity, i) =>
				<li key={i}>
					{activity.elapsed_time} => {activity.start_date}
				</li>
		); 

		return (
			<div>
				<h1>Hello</h1>
				<Container>
				  <Row>
				    <Col sm={7}>
							<LineChart className='LineChart'/>
				    </Col>
				    <Col sm={5}>
							<Top10 activities={activities}  className='Top10'/>
				    </Col>
				  </Row>
				</Container>
			</div>
		)
	}
}

export default App;