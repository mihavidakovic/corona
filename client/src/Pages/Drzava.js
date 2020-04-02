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

const countries = require('../Graph/countries.json');

const  Drzava = (props) => {
	let { name } = useParams();
	let countrySlo = "";

	const [DrzavaRequest, setDrzavaRequest] = useState({
		drzava: []
	});

	const [GraphRequest, setGraphRequest] = useState({
		graph: []
	});

	useEffect(() => {

		axios.get("https://corona.lmao.ninja/countries/" + name)
			.then(res => {
				setDrzavaRequest({drzava: res.data})
			})
			.catch(err => {
				console.log(err)
			})
			.then(() => {
			});

		//data for graph
		axios.get("https://corona.lmao.ninja/v2/historical/" + name)
			.then(res => {
				const final = {};


				const casesKeys = Object.keys(res.data.timeline.cases);
				const deathsValues = Object.values(res.data.timeline.deaths);
				const cases = Object.entries(res.data.timeline.cases).map(([date, Primerov]) => ({date,Primerov}));

				for (var key in cases) {
				    // skip loop if the property is from prototype
				    if (!cases.hasOwnProperty(key)) continue;


				    var obj = cases[key];
				    Object.assign(obj, {smrti: deathsValues[key]})

				}

				setGraphRequest({graph: cases})
			})
			.catch(err => {
				console.log(err)
			})
			.then(() => {
			});
	}, [])

	const {drzava} = DrzavaRequest;
	const {graph} = GraphRequest;
	setInterval(() => {
		const {graph} = GraphRequest;

	}, 500)

	if (name !== "slovenia") {
		const selectedName = {"name": name}
		const getPrevod = _.find(countries, _.matches(selectedName))
		countrySlo = getPrevod.prevod;
		document.title = countrySlo + " - Zadnji podatki o posledicah virusa!"
	} else {
		countrySlo = "Slovenija";
		document.title = countrySlo + " - Zadnji podatki o posledicah virusa!"
	}

	return (
		<div className="Subpage">
			<div className="Subpage-country">
				<Link to="/" className="Subpage-country__back">
					<i className="fa fa-arrow-left"></i>
					<span>Nazaj</span>
				</Link>
				<h2 className="Subpage-country__title">
					{countrySlo}
				</h2>

				<div className="Subpage-country__data">
					<div className="data-points">
						<div className="data-point">
							<h3>{drzava.cases ? drzava.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<div className={drzava.todayCases > 0 ? 'data-point__new negative' : 'data-point__new positive'}>{drzava.todayCases > 0 ? '+' + drzava.todayCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'}</div>
							<span className="data-point__title">Primerov</span>
						</div>
						<div className="data-point">
							<h3>{drzava.deaths ? drzava.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<div className={drzava.todayDeaths > 0 ? 'data-point__new negative' : 'data-point__new positive'}>{drzava.todayDeaths > 0 ? ('+' + drzava.todayDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')) : '0'}</div>
							<span className="data-point__title">Smrti</span>
						</div>
						<div className="data-point">
							<h3>{drzava.recovered ? drzava.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<div className={drzava.todayRecovered > 0 ? 'data-point__new negative' : 'data-point__new positive'}>{drzava.todayRecovered ? '+' + drzava.todayRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'}</div>
							<span className="data-point__title">Okrevanih</span>
						</div>
					</div>
				</div>

				<div className="Subpage-country__graph">
					<h2 className="Graph__title">Graf statistike primerov in smrti</h2>
					<GraphCounrty data={graph ? graph : ''} />
				</div>
			</div>
		</div>
	);
}

export default Drzava;