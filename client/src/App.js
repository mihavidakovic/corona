import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";


import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';

import './assets/style/main.scss';

import Header from './Components/Header.js';

import List from './List/List.js';
import All from './Components/All.js';
import Graph from './Graph/Graph.js';


export default function App() {

	axios.get("https://corona.vidakovic.si/api/ip")
		.then(res => {
			console.log(res.data);
	})

	return (
		<BrowserRouter>
			<div className="App dark">
				<Header />

				<Switch>
					<Route path="/">
						<section>
							<div className="two">
								<div className="graf">
									<Graph />
								</div>
								<div className="all">
									<All />
								</div>
							</div>
							<div className="podatki">
								<List />
							</div>
						</section>
					</Route>
					<Route path="/admin">
						<p>lol</p>
					</Route>
				</Switch>

			</div>
		</BrowserRouter>
	);
}

function Home() {
	return (
		<section>
			<div className="two">
				<div className="graf">
					<Graph />
				</div>
				<div className="all">
					<All />
				</div>
			</div>
			<div className="podatki">
				<List />
			</div>
		</section>
	);
}
function Admin() {
	return (<h2>Admin</h2>);
}
