import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

import GraphCounrty from '../Graph/GraphCounrty.js';
import MapCountry from '../Components/MapCountry.js';


import {
  Link,
  useParams
} from "react-router-dom";

const countries = require('../Graph/countries.json');
const countriesInfo = require('./countries.json');



function Drzava(props) {
	let { name } = useParams();
	let countrySlo = "";
	let correctName = _.find(countries, {url: name})

	const [DrzavaRequest, setDrzavaRequest] = useState({
		drzava: []
	});

	const [CountryInfoRequest, setCountryInfoRequest] = useState({
		countryInfo: []
	});

	const [GraphRequest, setGraphRequest] = useState({
		graph: []
	});

	const [RangeRequest, setRangeRequest] = useState({
		range: 10
	});

	const [CoordinatesRequest, setCoordinatesRequest] = useState({
		infoLat: 0,
		infoLong: 0
	});

	const getCountryInfo = async () => {
		await fetch("https://corona.lmao.ninja/v2/countries/" + correctName.name)
			.then(res => res.json())
			.then(response => {
				setDrzavaRequest({drzava: response})
				setCoordinatesRequest({
					infoLat: response.countryInfo.lat,
					infoLong: response.countryInfo.long
				})
			})
			.catch(err => {
				console.log(err)
			})

		await fetch("https://restcountries.eu/rest/v2/name/" + correctName.name)
			.then(res => res.json())
			.then(response => {
				setCountryInfoRequest({countryInfo: response[0]})
			})
			.catch(err => {
				console.log(err)
			})
	}

	let getGraphData = async (name, rangeNum) => {
		//data for graph
		await axios.get("https://corona.lmao.ninja/v2/historical/" + name + "/?lastdays=" + rangeNum)
			.then(res => {
				console.log(res.data.timeline)
			})
			.catch(err => {
				console.log(err)
			})
			.then(() => {
			});
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		getGraphData(correctName.name, "all");
		getCountryInfo();

	}, [])


	function changeRange(event) {
		setRangeRequest({range: event.target.value})
		getGraphData(event.target.value)
	}

	if (name !== "slovenija") {
		const selectedName = {"url": name}
		const getPrevod = _.find(countries, _.matches(selectedName))
		countrySlo = getPrevod.prevod;
		document.title = countrySlo + " - Zadnji podatki o posledicah virusa!"
	} else {
		countrySlo = "Slovenija";
		document.title = countrySlo + " - Zadnji podatki o posledicah virusa!"
	}

	const {drzava} = DrzavaRequest;
	const {range} = RangeRequest;
	let {infoLat, infoLong} = CoordinatesRequest;
	const {graph} = GraphRequest;
	const {countryInfo} = CountryInfoRequest;
	console.log(graph)

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
							<h3>{drzava.recovered >= 0 ? drzava.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<div className={drzava.todayRecovered > 0 ? 'data-point__new good' : 'data-point__new positive'}>{drzava.todayRecovered > 0 ? ('+' + drzava.todayRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')) : '0'}</div>
							<span className="data-point__title">Okrevanih</span>
						</div>
						<div className="data-point">
							<h3>{drzava.active ? drzava.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<span className="data-point__title">Aktivnih primerov</span>
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
					<div className="country__info">
						<svg className="country__info--icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
						<h3 className="country__info--title">Zanimive informacije</h3>
						<p className="country__info--item">Ime v maternem jeziku: <span>{countryInfo.nativeName}</span></p>
						<p className="country__info--item">Glavno mesto: <span>{countryInfo.capital}</span></p>
						<p className="country__info--item">Število prebivalcev: <span>{countryInfo.population ? countryInfo.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</span></p>
						<p className="country__info--item">Ginijev koeficient: <span>{countryInfo.gini}</span>
							<a 
								data-tip
								data-for="tooltip"
								data-event='click'
								data-event-off='dblclick'
								className="item--question">
								<svg className="item--question__icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
							</a>
							<ReactTooltip id="tooltip" place="bottom" globalEventOff='click' className="item--question__tooltip">
								<b>Ginijev koeficient</b> je merilo za statistično disperzijo, največkrat uporabljeno kot merilo neenakomerne porazdelitve dohodka in premoženja. Definiran je kot razmerje z vrednostmi med 0 in 100, pri čemer velja, da nižji ko je koeficient, bolj enakomerna je porazdelitev, in višji kot je koeficient, bolj neenakomerna je porazdelitev. Število 0 predstavlja popolno enakost (vsakdo ima popolnoma enaki prihodek in premoženje), število 100 pa predstavlja popolno neenakost (nobeden nima enakega prihodka in premoženja).
							</ReactTooltip>
						</p>
					</div>
				</div>

				<div className="Subpage-country__graph">
					<div className="Graph__head">
						<h2 className="Graph__head--title">Graf statistike primerov in smrti</h2>
					</div>
					<GraphCounrty data={graph} name={countrySlo} range={range} isDarkMode={props.isDarkMode} />
				</div>

				<div className="Subpage-country__map">
					<MapCountry lat={infoLat ? infoLat : '555'} long={infoLong ? infoLong : '55555555'} name={countrySlo} flag={_.get(drzava, 'countryInfo.flag')} />
				</div>
			</div>
		</div>
	);
}

export default Drzava;