import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/sl';
import 'moment-timezone';

import ListItem from './ListItem.js';

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
		data: [],
		lastUpdate: "",
		sort: {
			column: null,
			direction: 'desc',
		},
	}


	componentWillMount() {
		axios.get(process.env.REACT_APP_BASE_URL + '/api/data/list')
		.then(res => {
			const data = res.data.data;
			this.setState({data});
			this.setState({loading: false});
			this.setState({lastUpdate: data[0]["created_at"]});
			console.log(data)
		});
	}

onSort = (column) => (e) => {
  const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
  const sortedData = this.state.data.sort((a, b) => {
    if (column === 'region') {
      const nameA = a.region.toUpperCase(); // ignore upper and lowercase
      const nameB = b.region.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    } else {
      return a.contractValue - b.contractValue;
    }

    if (column === 'deaths') {
      const nameA = a.deaths; // ignore upper and lowercase
      const nameB = b.deaths; // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    } else {
      return a.contractValue - b.contractValue;
    }

    if (column === 'confirmed') {
      const nameA = a.confirmed; // ignore upper and lowercase
      const nameB = b.confirmed; // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    } else {
      return a.contractValue - b.contractValue;
    }

    if (column === 'recovered') {
      const nameA = a.confirmed; // ignore upper and lowercase
      const nameB = b.recovered; // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
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
		const { currentDeathsSort } = this.state;
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
						<div className="list__head--state" onClick={this.onSort('region')}><span>Država</span></div>
						<div className="list__head--confirmed" onClick={this.onSort('confirmed')}><span>Potrjenih</span></div>
						<div className="list__head--deaths" onClick={this.onSort('deaths')}>
							<span>Smrti</span>
							<i className="fa fa-sort" />
						</div>
						<div className="list__head--recovered" onClick={this.onSort('recovered')}><span>Okrevanih</span></div>
						<div className="list__head--date"><span>Posodobljeno</span></div>
					</div>
					<div className="items">
						{newdata.map((item, index) => 
							<ListItem key={index}  id={item.id} region={item.region} confirmed={item.confirmed} deaths={item.deaths} recovered={item.recovered} />
						)}
					</div>
				</div>
			)
		}
	}
}