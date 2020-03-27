import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';

import ListItem from './ListItem.js';

export default class List extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			loading: true,
			data: [],
			updated: new Date(),
			sort: {
				column: null,
				direction: 'desc',
			},
		};
	}

	componentWillMount() {
		this.fetchData();

		setInterval(() => {
			this.onSort(this.state.sort.column)
			this.fetchData();
		}, 10000);		

	};

	fetchData() {


		axios.get("https://corona.lmao.ninja/countries")
			.then(res => {
				const data = res.data;
				this.setState({data});
				this.setState({loading: false});
				this.setState({updated: new Date()});
				// this.giveDate(new Date( Date.now() - 1000 * 60 ), new Date( Date.now() - 4500 * 60))
		})
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

	    } else if (column === 'critical') {
			const nameA = a.critical;
			const nameB = b.critical;

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

	giveDate = (start, end) => {
		var date = new Date(+start + Math.random() * (end - start));
		this.setState({updated: date.toString()});
	}

	render() {

		if (this.state.loading) {
			return (
				<>
					<header className="section__header">
						<h3>Podatki po državah</h3>
						<div className="date">
							<i className="fa fa-refresh" onClick={() => this.fetchData}></i>
						</div>
					</header>
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
				</>
			)
		} else {
			return (
				<>
					<header className="section__header">
						<h3>Podatki po državah</h3>
						<div className="date">
							<i className="fa fa-refresh" onClick={() => this.fetchData()}></i>
							<p className="data__updated"><Moment format="DD.MM.YYYY HH:mm" tz="Europe/Ljubljana">{this.state.updated}</Moment></p>
						</div>
					</header>

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
							{this.state.data.map((item, index) => 
								<ListItem key={index}  id={item.id} country={item.country} cases={item.cases} todayCases={item.todayCases} deaths={item.deaths} todayDeaths={item.todayDeaths} recovered={item.recovered} critical={item.critical} />
							)}
						</div>
					</div>
				</>
			)
		}
	}
}