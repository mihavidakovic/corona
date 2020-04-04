import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/sl';
import _ from 'lodash';

import GraphCounrty from '../Graph/GraphCounrty.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

// Layout
import Header from '../Components/Header.js';


//Compontents
import List from '../List/List.js';
import All from '../Components/All.js';
import Graph from '../Graph/Graph.js';


const countries = require('../Graph/countries.json');

export default class Domov extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			all: [],
			countries: []
		}
	}

	componentDidMount() {
		document.title = "Covid19.si - Zadnji podatki o posledicah virusa!";

		let all = "https://corona.lmao.ninja/all";
		let countries = "https://corona.lmao.ninja/countries";

		const requestAll = axios.get(all);
		const requestCountries = axios.get(countries);

		axios.all([requestAll, requestCountries], {crossDomain: true})
			.then(axios.spread((...responses) => {
				let all = responses[0];
				let countries = responses[1];
				
				this.setState({
					all: all.data,
					countries: countries.data
				})
			}))
			.catch(err => {
				console.log(err)
			})
			.then(() => {
			});
	}

	render() {
		return (
			<section>
				<div className="two">
					<div className="graf">
						<Graph />
					</div>
					<div className="all">
						<All data={this.state.all} />
					</div>
				</div>
				<div className="podatki">
					<List data={this.state.countries} />
				</div>
			</section>

	);

	}
}