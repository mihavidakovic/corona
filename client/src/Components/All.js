import React from 'react';
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
					todayCases: this.props.data.todayCases,
					deaths: this.props.data.deaths,
					todayDeaths: this.props.data.todayDeaths,
					recovered: this.props.data.recovered,
					todayRecovered: 0,
					updated: this.props.data.updated
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
						<div className={this.state.data.todayCases > 0 ? 'data-point__new negative' : 'data-point__new positive'}>{this.state.data.todayCases > 0 ? '+' + this.state.data.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'}</div>
						<span className="data-point__title">Primerov</span>
					</div>
					<div className="data-point">
						<h3>{this.state.data.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
						<div className={this.state.data.todayDeaths > 0 ? 'data-point__new negative' : 'data-point__new positive'}>{this.state.data.todayDeaths > 0 ? '+' + this.state.data.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'}</div>
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
