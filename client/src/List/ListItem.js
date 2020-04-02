import React from 'react';
import {
  Link
} from "react-router-dom";

export default class ListItem extends React.Component {

	render() {
		return(
			<Link to={{
				pathname: '/drzava/' + this.props.country,
			}}>
				<div className="listItem">
					<div className="listItem__cell item__state">
						<img className="item__state--flag" src={this.props.flag}  alt={this.props.country} />
						<span><b>{this.props.country}</b></span> 
					</div>
					<div className="listItem__cell item__confirmed">
						<span>{this.props.cases}</span>
						<span className={ this.props.todayCases > 0 ? 'new_cases positive' : 'new_cases negative' }>{ this.props.todayCases > 0 ? '+' + this.props.todayCases : '' }</span>
					</div>
					<div className="listItem__cell item__deaths">
						<span>{this.props.deaths}</span>
						<span className={ this.props.todayDeaths > 0 ? 'new_cases positive' : 'new_cases negative' }>{ this.props.todayDeaths > 0 ? '+' + this.props.todayDeaths : '' }</span>
					</div>
					<div className="listItem__cell item__recovered">{this.props.recovered}</div>
					<div className="listItem__cell item__critical">{this.props.critical}</div>
				</div>
			</Link>
		)
	}
}