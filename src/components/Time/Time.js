import React from 'react';

class Time extends React.Component {

	getAllure() {
		const heures = Math.trunc(this.props.time / 3600);
		const minutes = Math.trunc(this.props.time / 60 - heures * 60);
		const seconds = Math.trunc(this.props.time - minutes*60 - heures*3600);

		if (heures === 0) {
			return minutes + ':' + this.format(seconds);
		}
		else {
			return heures + ':' + this.format(minutes) + ':' + this.format(seconds);
		}
	}

	format(number) {
		if (number < 10){
			return '0' + number;
		}
		else {
			return number;
		}
	}

	render() {
		const time = this.getAllure();

		return (
			<span>{time}</span>
		);
	}
}

export default Time;