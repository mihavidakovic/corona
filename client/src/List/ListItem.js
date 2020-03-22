import React from 'react';

export default class ListItem extends React.Component {
	render() {
		return(
			<div className="listItem">
				<div className="listItem__cell item__state">
					<span>{this.props.region}</span> 
				</div>
				<div className="listItem__cell item__confirmed">{this.props.confirmed}</div>
				<div className="listItem__cell item__deaths">{this.props.deaths}</div>
				<div className="listItem__cell item__recovered">{this.props.recovered}</div>
			</div>
		)
	}
}