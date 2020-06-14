import React from 'react';
import {
  Link
} from "react-router-dom";

import { Event } from '../Components/Tracking';

export default class ListItem extends React.Component {

	render() {
		return(
			<Link 
				to={{pathname: '/drzava/' + this.props.url}}
				onClick={() => Event("LIST", "Clicked on country " + this.props.ime, "COUNTRY")}>
				<div className="listItem">
					<div className="listItem__cell item__state">
						<img className="item__state--flag" src={this.props.flag}  alt={this.props.country} />
						<div className="item__state--name" title={this.props.ime}>{this.props.ime}</div> 
					</div>
					<div className="listItem__cell item__confirmed">
						<span>{this.props.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
						<span className={ this.props.todayCases > 0 ? 'new_cases positive' : 'new_cases negative' }>{ this.props.todayCases > 0 ? '+' + this.props.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '' }</span>
					</div>
					<div className="listItem__cell item__deaths">
						<span>{this.props.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
						<span className={ this.props.todayDeaths > 0 ? 'new_cases positive' : 'new_cases negative' }>{ this.props.todayDeaths > 0 ? '+' + this.props.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '' }</span>
					</div>
					<div className="listItem__cell item__recovered">{this.props.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
					<div className="listItem__cell item__critical">{this.props.critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
				</div>
			</Link>
		)
	}
}