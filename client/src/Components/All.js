import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';


class All extends React.Component {
	constructor() {
		super();

		this.state = {
			data: {
				cases: 0,
				deaths: 0,
				recovered: 0,
				updated: 0
			},
		};
	}

	componentWillMount() {
		this.fetchAll();

		setInterval(() => {
			this.fetchAll();
		}, 30000);		
	}

	fetchAll() {
		axios.get("https://corona.lmao.ninja/all")
			.then(res => {
				const data = res.data;
				this.setState({data});
		})
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
						<span>Primerov</span>
					</div>
					<div className="data-point">
						<h3>{this.state.data.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
						<span>Smrti</span>
					</div>
					<div className="data-point">
						<h3>{this.state.data.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
						<span>Okrevanih</span>
					</div>
				</div>
			</div>
		);

	}

}

export default All;
