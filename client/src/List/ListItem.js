import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/sl';
import 'moment-timezone';



export default class ListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state  = {
			item: []
		}
	}

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