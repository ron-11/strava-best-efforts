import React from 'react';
import * as firebase from 'firebase';
import config from '../../config';
import { Container } from 'react-grid-system';
import Block from '../Block/Block.js';

class App extends React.Component {
	constructor () {
		super()
		firebase.initializeApp(config)
	}

	render () {
		return (
			<Container fluid>
				<h1>App Best Efforts Strava</h1>
			  <Block distance='400m'/>
			  <Block distance='805m'/>
				<Block distance='1000m'/>
			  <Block distance='1609m'/>
			  <Block distance='3219m'/>
			  <Block distance='5000m'/>
				<Block distance='10000m'/>
			  <Block distance='15000m'/>
			</Container>
		)
	}
}

export default App;