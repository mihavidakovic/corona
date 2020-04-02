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


// Style
import './assets/style/main.scss';

// Layout
import Header from './Components/Header.js';


//Compontents
import List from './List/List.js';
import All from './Components/All.js';
import Graph from './Graph/Graph.js';


// Pages
import AdminPage from './Pages/Admin/AdminPage.js';
import AdminPageIp from './Pages/Admin/AdminPageIp.js';

import Drzava from './Pages/Drzava.js';

export default function App() {
	if (process.env.NODE_ENV !== "development") {

		axios.get("https://corona.vidakovic.si/api/ip", {headers: {"Access-Control-Allow-Origin": "*"}})
			.then(res => {
				console.log("logged");

		})

	}

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
					<Route path="/drzava/:name" render={() => <Drzava />} />
					<Route path="/admin" render={() => <AdminPage />} />
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

function notFound() {
	return (
		<div className="notFound">
			<h1>Ta stran ni bila najdena :(</h1>
		</div>
	);
}
