import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/sl';
import _ from 'lodash';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import editJsonFile from "edit-json-file";

import AdminPageIp from './AdminPageIp.js';
const countries = require('./countries.json');

export default function AdminPage() {
	let { path, url } = useRouteMatch();
	const [DeleteCountry, setDeleteCountry] = useState();

	useEffect(() => {


	}, [])


	return (
		<div className="AdminPage">
			<Switch>
				<Route exact path={path}>
					<h2>Admin</h2>
					<div className="AdminPage-drzave">
						{countries.map(el => {
							return(
								<div className="AdminPage-drzave__drzava">
									<div className="drzava-ime">
										<span>{el.name}</span>
										<small>{el.prevod}</small>
									</div>
									<div className="drzava-actions">
										<span className="drzava-uredi">Uredi</span>
										<span className="drzava-izbrisi">Izbriši</span>
									</div>
								</div>
							)
						})}
					</div>
				</Route>
			</Switch>
		</div>
	);
}