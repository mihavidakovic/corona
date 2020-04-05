import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import GraphCounrty from '../Graph/GraphCounrty.js';

import {
  Link,
  useParams
} from "react-router-dom";

const countries = require('../Graph/countries.json');

function Drzava(props) {
	window.scrollTo(0, 0);
	let { name } = useParams();
	let countrySlo = "";
	let correctName = _.find(countries, {url: name})

	const [DrzavaRequest, setDrzavaRequest] = useState({
		drzava: []
	});

	const [GraphRequest, setGraphRequest] = useState({
		graph: []
	});

	const [RangeRequest, setRangeRequest] = useState({
		range: 10
	});

	useEffect(() => {

		axios.get("https://corona.lmao.ninja/countries/" + correctName.name)
			.then(res => {
				setDrzavaRequest({drzava: res.data})
			})
			.catch(err => {
				console.log(err)
			})
			.then(() => {
			});

			getGraphData("all")

	}, [])


	const {drzava} = DrzavaRequest;
	const {range} = RangeRequest;
	setInterval(() => {
		const {graph} = GraphRequest;

	}, 500)

	if (name !== "slovenija") {
		const selectedName = {"url": name}
		const getPrevod = _.find(countries, _.matches(selectedName))
		countrySlo = getPrevod.prevod;
		document.title = countrySlo + " - Zadnji podatki o posledicah virusa!"
	} else {
		countrySlo = "Slovenija";
		document.title = countrySlo + " - Zadnji podatki o posledicah virusa!"
	}

	function getGraphData(rangeNum) {
		//data for graph
		axios.get("https://corona.lmao.ninja/v2/historical/" + correctName.name + "/?lastdays=" + rangeNum)
			.then(res => {
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
	}

	function change(event) {
		setRangeRequest({range: event.target.value})
		getGraphData(event.target.value)
	}
	const {graph} = GraphRequest;

	return (
		<div className="Subpage">
			<div className="Subpage-country">
				<Link to="/" className="Subpage-country__back">
					<i className="fa fa-arrow-left"></i>
					<span>Nazaj</span>
				</Link>
				<div className="Subpage-country__head">
					<img src={_.get(drzava, 'countryInfo.flag')} alt={countrySlo} />
					<h2 className="Subpage-country__title">
						{countrySlo}
					</h2>
				</div>
				<div className="Subpage-country__data">
					<div className="data-points multiple">
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
							<span className="data-point__title">Okrevanih</span>
						</div>
						<div className="data-point">
							<h3>{drzava.active ? drzava.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<span className="data-point__title">Aktivnih</span>
						</div>
						<div className="data-point">
							<h3>{drzava.critical ? drzava.critical.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<span className="data-point__title">Kritičnih</span>
						</div>
						<div className="data-point">
							<h3>{drzava.deathsPerOneMillion ? drzava.deathsPerOneMillion.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<span className="data-point__title">Primerov na miljon ljudi</span>
						</div>
					</div>
				</div>

				<div className="Subpage-country__graph">
					<div className="Graph__head">
						<h2 className="Graph__head--title">Graf statistike primerov in smrti</h2>
						<div className="Graph__select" style={{display: 'none'}}>
							<p>Zadnjih:</p>
							<div className="select_range">
								<select className="select_range--select" onChange={change} value="10">
									<option value="10">10 dni</option>
									<option value="15">15 dni</option>
									<option value="20">20 dni</option>
									<option value="25">25 dni</option>
									<option value="all">Vse dni</option>
								</select>
								<div className="select_range--icon">
									<i className="fa fa-chevron-down"></i>
								</div>
							</div>
						</div>
					</div>
					<GraphCounrty data={graph ? graph : ''} range={range} />
				</div>
			</div>
		</div>
	);
}

export default Drzava;