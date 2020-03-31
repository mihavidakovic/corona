import React, { useState } from 'react';
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

import AdminPageIp from './AdminPageIp.js';


export default function AdminPage() {
	let { path, url } = useRouteMatch();
	const [ips, setIps] = useState({ips: []});

	axios.get("https://corona.vidakovic.si/api/ip/all")
		.then(res => {
			console.log(res.data.ips)
			setIps(res.data.ips);
		});

	return (
		<div className="AdminPage">
			<Switch>
				<Route exact path={path}>
					<h2>IP-ji</h2>
					<div class="AdminPage__ips">
						{_.map(ips, function(ip) {
							return(
								<Link to={`${url}`+ '/ip/' + ip.ip}>
									<div className="AdminPage__ips--ip">
										<span className="ip__address">
											{ip.ip}
										</span>
										<span class="ip__time">
											<Moment  timezone="Europe/Ljubljana" locale="si" fromNow>{ip.created_at}</Moment>
										</span>
									</div>
								</Link>
							)
						})}
					</div>
				</Route>
		        <Route exact path={`${path}/ip/:ip`}>
		          <AdminPageIp />
		        </Route>
			</Switch>
		</div>
	);
}