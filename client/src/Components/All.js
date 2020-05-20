import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


class All extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
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

	updateProps(data) {
		this.setState({
			isLoading: false,
			data: {
				cases: data.cases,
				todayCases: data.todayCases,
				deaths: data.deaths,
				todayDeaths: data.todayDeaths,
				recovered: data.recovered,
				active: data.active,
				tests: data.tests,
				deathsPerOneMillion: data.deathsPerOneMillion,
				updated: data.updated,
			}
		})
	}

	componentDidUpdate(prevProps) {
	  if (prevProps.data !== this.props.data) {
	    this.updateProps(this.props.data)
	  }
	}

	render() {
			return (
				<div className="all-data">
					<div className="all-data__header">
						<h2>Podatki za cel svet</h2>
						<p><span>Posodobljeno: </span><Moment format="DD.MM.YYYY HH:mm" tz="Europe/Ljubljana">{this.state.updated}</Moment></p>
					</div>
					{this.state.isLoading ? 
						<div className="all-data__loading">
							<div className="loader"></div>
						</div>
					: ""}
					<div className={this.state.isLoading ? 'data-points data-points__loading' : 'data-points'} style={{marginBottom: '1rem'}}>
						<div className="data-point">
							<h3>{this.state.data.cases > 0 ? this.state.data.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "0"}</h3>
							<div className={this.state.data.todayCases > 0 ? 'data-point__new negative' : 'data-point__new positive'}>{this.state.data.todayCases > 0 ? '+' + this.state.data.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'}</div>
							<span className="data-point__title">Primerov</span>
						</div>
						<div className="data-point">
							<h3>{this.state.data.deaths > 0 ? this.state.data.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "0"}</h3>
							<div className={this.state.data.todayDeaths > 0 ? 'data-point__new negative' : 'data-point__new positive'}>{this.state.data.todayDeaths > 0 ? '+' + this.state.data.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'}</div>
							<span className="data-point__title">Smrti</span>
						</div>
						<div className="data-point">
							<h3>{this.state.data.recovered > 0 ? this.state.data.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "0"}</h3>
							<span className="data-point__title">Okrevanih</span>
						</div>
					</div>
					<div className={this.state.isLoading ? 'data-points data-points__loading' : 'data-points'}>
						<div className="data-point">
							<h3>{this.state.data.active > 0 ? this.state.data.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "0"}</h3>
							<span className="data-point__title">Aktivnih primerov</span>
						</div>
						<div className="data-point">
							<h3>{this.state.data.tests > 0 ? this.state.data.tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "0"}</h3>
							<span className="data-point__title">Testiranih</span>
						</div>
						<div className="data-point">
							<h3>{this.state.data.deathsPerOneMillion > 0 ? this.state.data.deathsPerOneMillion.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "0"}</h3>
							<span className="data-point__title">Smrti na miljon ljudi</span>
						</div>
					</div>
				</div>
			);
		}


}

export default All;
