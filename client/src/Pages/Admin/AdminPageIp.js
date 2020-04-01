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
  useParams
} from "react-router-dom";

const AdminPageIp = (props) => {
	let { ip } = useParams();
	const [dataRequst, setDataRequst] = useState({
		data: {}
	});
	const newData = [];

	useEffect(() => {
		axios.get("https://corona.vidakovic.si/api/ip/" + ip)
			.then(res => {
				const oldData = res.data;
				Object.keys(oldData).forEach(key => newData.push({name: key, value: oldData[key]}))
				setDataRequst(newData);
			})
			.catch(err => {
				console.log(err)
			})
			.then(() => {

			});
	}, [])

	const data = dataRequst;

	console.log(data)
	return (
		<div>
			<h2>IP: {ip}</h2>
			<div>
			{data[0]["name"]}
			</div>
		</div>
	);
}

export default AdminPageIp;