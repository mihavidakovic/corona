import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import _ from 'lodash';
import FilterResults from 'react-filter-search';


import ListItem from './ListItem.js';
import countries from '../Graph/countries.json';

export default class List extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			loading: true,
			data: [],
			value: "",
			expanded: false,
			updated: new Date(),
			sort: {
				column: null,
				direction: 'desc',
			},
			search: ""
		};
	}

	updateProps(data) {
		_.map(data, function(obj) {

		    // add the properties from second array matching the userID
		    // to the object from first array and return the updated object
		   return _.assign(obj, _.find(countries, {name: obj.country}));
		});

		_.map(data, function(obj) {

		    // add the properties from second array matching the userID
		    // to the object from first array and return the updated object
		   return _.assign(obj, _.find(countries, {url: obj.url}));
		});


		this.setState({data: data})
		this.setState({loading: false})
	}



	componentDidUpdate(prevProps) {
	  if (prevProps.data !== this.props.data) {
	    this.updateProps(this.props.data)
	  }
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

	handleChange = event => {
		const { value } = event.target;
		this.setState({ value });
	};

	searchSpace=(event)=>{
		let keyword = event.target.value;
		this.setState({search:keyword})
	}

	render() {
		const { steps } = this.state;
		const { data, value } = this.state;
	    const items = data.filter((data)=>{
	      if(this.state.search == null)
	          return data
	      else if(data.prevod.toLowerCase().includes(this.state.search.toLowerCase())){
	      	return data
	          // if(data.prevod == undefined) {
	          // 	console.log(data.country)
	          // }
	      }
	    }).map(data=>{
	      return(
			<ListItem id={data.id} country={data.country} url={data.url}  ime={data.prevod} flag={data.countryInfo.flag} cases={data.cases} todayCases={data.todayCases} deaths={data.deaths} todayDeaths={data.todayDeaths} recovered={data.recovered} critical={data.critical} />
	      )
    	})

		if (this.state.loading) {
			return (
				<>
					<header className="section__header">
						<h3>Podatki po državah</h3>
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
						<div class="search__country">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
							<input type="text" placeholder="Poišči državo" onChange={(e)=>this.searchSpace(e)}  />
						</div>
					</header>

					<div className='list expanded'>
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
							{items}
						</div>
					</div>
				</>
			)
		}
	}
}