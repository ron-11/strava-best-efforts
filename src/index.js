import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase';
import config from './config';
import AppChart from './chart.js';

class App extends Component {
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
				<AppChart />
				<ul>
					{activities}
				</ul>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));