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


export default function Drzava() {
	let { name } = useParams();

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
				console.log(res.data.timeline)
				setGraphRequest({graph: res.data.timeline})
			})
			.catch(err => {
				console.log(err)
			})
			.then(() => {
			});
	}, [])

	const {drzava} = DrzavaRequest;
	const {graph} = GraphRequest;

	return (
		<div className="Subpage">
			<div className="Subpage-country">
				<h2 className="Subpage-country__title">{drzava ? drzava.country : 'ni podatka'}</h2>

				<div className="Subpage-country__data">
					<div className="data-points">
						<div className="data-point">
							<h3>{drzava.cases ? drzava.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<span>Primerov</span>
						</div>
						<div className="data-point">
							<h3>{drzava.deaths ? drzava.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<span>Smrti</span>
						</div>
						<div className="data-point">
							<h3>{drzava.recovered ? drzava.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''}</h3>
							<span>Okrevanih</span>
						</div>
					</div>
				</div>

				<div className="Subpage-country__graph">
					<GraphCounrty data={graph} />
				</div>
			</div>
		</div>
	);
}