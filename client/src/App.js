import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect
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

	axios.get("https://corona.vidakovic.si/api/ip", {crossDomain: true})
		.then(res => {
			console.log(res.data);
	})

	return (
		<BrowserRouter>
			<div className="App dark">
				<Header />

				<Switch>
					<Route exact path="/">
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
					<Route path="/admin" component={admin} />
					<Route path="/404" component={notFound} />
					<Redirect to="/404" />
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

function admin() {
	return (
		<div className="admin">
			<h1>Admin</h1>
		</div>
	);
}

function notFound() {
	return (
		<div className="notFound">
			<h1>Ta stran ni bila najdena :(</h1>
		</div>
	);
}
