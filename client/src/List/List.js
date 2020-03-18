import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/sl';
import 'moment-timezone';

const sortTypes = {
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
		currentSort: 'default'
	}


	componentDidMount() {
		axios.get(process.env.REACT_APP_BASE_URL + '/api/data')
		.then(res => {
			const items = res.data.data;
			this.setState({items});
			this.setState({loading: false});
		});
	}

	onSortChange = () => {
		const { currentSort } = this.state;
		let nextSort;

		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'down';

		this.setState({
			currentSort: nextSort
		});

		console.log("klik");
	};


	render() {
		const { currentSort } = this.state;
		if (this.state.loading === true) {
			return (
				<div>
					<div className="list">
						<div className="list__head">
							<div><span>Država</span></div>
							<div onClick={this.onSortChange}>
								<span>Smrti</span>
								<i className={`fas fa-${sortTypes[currentSort].class}`} />
							</div>
							<div><span>Potrjenih primerov</span></div>
							<div><span>Okrevanih pacientov</span></div>
							<div><span>Posodobljeno</span></div>
						</div>
					</div>
					<div className="loading"></div>
				</div>
			)
		} else {
			return (
				<div className="list">
					<div className="list__head">
						<div><span>Država</span></div>
						<div onClick={this.onSortChange}>
							<span>Smrti</span>
							<i className={`fas fa-${sortTypes[currentSort].class}`} />
						</div>
						<div><span>Potrjenih primerov</span></div>
						<div><span>Okrevanih pacientov</span></div>
						<div><span>Posodobljeno</span></div>
					</div>
					<div className="items">
						{[...this.state.items].sort(sortTypes[currentSort].fn).map(item => 
							<div className="item">
								<div className="item__cell item__state">
									<span>{item.region}</span> 
									{item.state.length > 0 && <span>{item.state}</span>}
								</div>
								<div className="item__cell item__deaths">{item.deaths}</div>
								<div className="item__cell item__confirmed">{item.confirmed}</div>
								<div className="item__cell item__recovered">{item.recovered}</div>
								<div className="item__cell item__date" hidden title={item.last_update}><Moment fromNow locale="sl">{item.last_update}</Moment></div>
							</div>
						)}
					</div>
				</div>
			)
		}
	}
}