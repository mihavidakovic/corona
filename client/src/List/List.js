import React from 'react';
import axios from 'axios';

import ListItem from './ListItem.js';

export default class List extends React.Component {
	state = {
		loading: true,
		data: [],
		lastUpdate: "",
		sort: {
			column: null,
			direction: 'desc',
		},
	}


	componentDidMount() {
		axios.get("https://corona.lmao.ninja/countries")
		.then(res => {
			console.log(res.data)
			const data = res.data;
			this.setState({data});
			this.setState({loading: false});
		});
	}

	onSort = (column) => (e) => {
	  const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
	  const sortedData = this.state.data.sort((a, b) => {
	    if (column === 'country') {
			const nameA = a.country.toUpperCase();
			const nameB = b.country.toUpperCase();

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;

	    } else if (column === 'confirmed') {
			const nameA = a.confirmed;
			const nameB = b.confirmed;

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;

	    } else if (column === 'deaths') {
			const nameA = a.deaths;
			const nameB = b.deaths;

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;

	    } else if (column === 'recovered') {
			const nameA = a.recovered;
			const nameB = b.recovered;

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;

	    } else if (column === 'crititcal') {
			const nameA = a.crititcal;
			const nameB = b.crititcal;

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;

	    } else {
	    	return a.contractValue - b.contractValue;
	    }

	  });

	  if (direction === 'desc') {
	    sortedData.reverse();
	  }

	  this.setState({
	    data: sortedData,
	    sort: {
	      column,
	      direction,
	    }
	  });
	};

	render() {
		let newdata = this.state.data;

		if (this.state.loading) {
			return (
				<div className="list">
					<div className="list__head">
						<div className="list__head--state"><span>Država</span></div>
						<div className="list__head--confirmed"><span>Potrjenih</span></div>
						<div className="list__head--deaths" onClick={this.onSortDeathsChange}>
							<span>Smrti</span>
						</div>
						<div className="list__head--recovered"><span>Okrevanih</span></div>
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
						<div className="list__head--state" onClick={this.onSort('country')}>
							<span>Država</span>
							<i className="fa fa-sort" />
						</div>
						<div className="list__head--confirmed" onClick={this.onSort('confirmed')}>
							<span>Potrjenih</span>
							<i className="fa fa-sort" />
						</div>
						<div className="list__head--deaths" onClick={this.onSort('deaths')}>
							<span>Smrti</span>
							<i className="fa fa-sort" />
						</div>
						<div className="list__head--recovered" onClick={this.onSort('recovered')}>
							<span>Okrevanih</span>
							<i className="fa fa-sort" />
						</div>
						<div className="list__head--critical" onClick={this.onSort('critical')}>
							<span>Kritični</span>
							<i className="fa fa-sort" />
						</div>
					</div>
					<div className="items">
						{newdata.map((item, index) => 
							<ListItem key={index}  id={item.id} country={item.country} cases={item.cases} todayCases={item.todayCases} deaths={item.deaths} todayDeaths={item.todayDeaths} recovered={item.recovered} critical={item.critical} />
						)}
					</div>
				</div>
			)
		}
	}
}