import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/sl';
import 'moment-timezone';

const sortTypesCountries = {
	up: {
		class: 'sort-up',
		fn: (a, b) => a.countries - b.countries
	},
	down: {
		class: 'sort-down',
		fn: (a, b) => b.countries - a.countries
	},
	default: {
		class: 'sort',
		fn: (a, b) => a
	}
};

const sortTypesDeaths = {
	up: {
		class: 'sort-up',
		fn: (a, b) => a.deaths - b.deaths
	},
	down: {
		class: 'sort-down',
		fn: (a, b) => b.deaths - a.deaths
	},
	default: {
		class: 'sort',
		fn: (a, b) => a
	}
};

export default class List extends React.Component {
	state = {
		loading: true,
		items: [],
		currentDeathsSort: 'default'
	}


	componentDidMount() {
		axios.get(process.env.REACT_APP_BASE_URL + '/api/data/list')
		.then(res => {
			const items = res.data.data;
			this.setState({items});
			this.setState({loading: false});
		});
	}

	onSortDeathsChange = () => {
		const { currentDeathsSort } = this.state;
		let nextSort;

		if (currentDeathsSort === 'down') nextSort = 'up';
		else if (currentDeathsSort === 'up') nextSort = 'default';
		else if (currentDeathsSort === 'default') nextSort = 'down';

		this.setState({
			currentDeathsSort: nextSort
		});

		console.log("klik");
	};


	render() {
		const { currentDeathsSort } = this.state;
		if (this.state.loading) {
			return (
				<div className="list">
					<div className="list__head">
						<div className="list__head--state"><span>Država</span></div>
						<div className="list__head--confirmed"><span>Potrjenih</span></div>
						<div className="list__head--deaths" onClick={this.onSortDeathsChange}>
							<span>Smrti</span>
							<i className={`fas fa-${sortTypesDeaths[currentDeathsSort].class}`} />
						</div>
						<div className="list__head--recovered"><span>Okrevanih</span></div>
						<div className="list__head--date"><span>Posodobljeno</span></div>
					</div>
					<div className="loading">
						<div className="loader"></div>
					</div>
			</div>
			)
		} else {
			return (
				<div className="list">
					<div className="list__head">
						<div className="list__head--state"><span>Država</span></div>
						<div className="list__head--confirmed"><span>Potrjenih</span></div>
						<div className="list__head--deaths" onClick={this.onSortDeathsChange}>
							<span>Smrti</span>
							<i className={`fas fa-${sortTypesDeaths[currentDeathsSort].class}`} />
						</div>
						<div className="list__head--recovered"><span>Okrevanih</span></div>
						<div className="list__head--date"><span>Posodobljeno</span></div>
					</div>
					<div className="items">
						{[...this.state.items].sort(sortTypesDeaths[currentDeathsSort].fn).map(item => 
							<div className="item">
								<div className="item__cell item__state">
									<span>{item.region}</span> 
								</div>
								<div className="item__cell item__confirmed">{item.confirmed}</div>
								<div className="item__cell item__deaths">{item.deaths}</div>
								<div className="item__cell item__recovered">{item.recovered}</div>
							</div>
						)}
					</div>
				</div>
			)
		}
	}
}