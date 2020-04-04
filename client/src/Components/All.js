import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';


class All extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				cases: 0,
				todayCases: 0,
				deaths: 0,
				todayDeaths: 0,
				recovered: 0,
				updated: 0
			},
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				data: {
					cases: this.props.data.cases,
					deaths: this.props.data.deaths,
					recovered: this.props.data.recovered
				}
			})
		}, 1000)
	}

	fetchAll() {
	}


	render() {
		return (
			<div className="all-data">
				<div className="all-data__header">
					<h2>Število vseh primerov po svetu</h2>
					<p><span>Posodobljeno: </span><Moment format="DD.MM.YYYY HH:mm" tz="Europe/Ljubljana">{this.state.updated}</Moment></p>
				</div>
				<div className="data-points">
					<div className="data-point">
						<h3>{this.state.data.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
						<span className="data-point__title">Primerov</span>
					</div>
					<div className="data-point">
						<h3>{this.state.data.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
						<span className="data-point__title">Smrti</span>
					</div>
					<div className="data-point">
						<h3>{this.state.data.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
						<span className="data-point__title">Okrevanih</span>
					</div>
				</div>
			</div>
		);

	}

}

export default All;
