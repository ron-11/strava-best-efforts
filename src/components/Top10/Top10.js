import React from 'react';
import './top10.css';

class Top10 extends React.Component {
	render () {
		return (
			<div className='Top10'>
				<ul>
					{this.props.activities}
				</ul>
			</div>
		);
	}
}

export default Top10;